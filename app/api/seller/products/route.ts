import { NextResponse } from 'next/server';
import { requireShopkeeper } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AiService } from '@/services/ai.service';
import { ProductStatus } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const user = await requireShopkeeper();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status'); // DRAFT, PENDING_REVIEW, NEEDS_CHANGES, PUBLISHED, REJECTED
    const search = searchParams.get('search')?.toLowerCase().trim();

    // Query seller's products
    const where: any = { sellerId: user.id };
    if (status && status !== 'ALL' && Object.values(ProductStatus).includes(status as ProductStatus)) {
      where.status = status as ProductStatus;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
        { brand: { name: { contains: search, mode: 'insensitive' } } },
      ];
    }

    const [allSellerProducts, filtered] = await Promise.all([
      prisma.product.findMany({
        where: { sellerId: user.id },
        select: { id: true, status: true },
      }),
      prisma.product.findMany({
        where,
        include: {
          category: true,
          brand: true,
          images: {
            orderBy: { sortOrder: 'asc' },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    // Compute tab counters
    const counts = {
      ALL: allSellerProducts.length,
      DRAFT: allSellerProducts.filter((p) => p.status === 'DRAFT').length,
      PENDING_REVIEW: allSellerProducts.filter((p) => p.status === 'PENDING_REVIEW').length,
      NEEDS_CHANGES: allSellerProducts.filter((p) => p.status === 'NEEDS_CHANGES').length,
      PUBLISHED: allSellerProducts.filter((p) => p.status === 'PUBLISHED').length,
      REJECTED: allSellerProducts.filter((p) => p.status === 'REJECTED').length,
    };

    return NextResponse.json({
      products: filtered,
      counts,
    });
  } catch (error: any) {
    console.error('Seller products GET error:', error);
    if (error.message?.includes('Forbidden') || error.message?.includes('Unauthorized')) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return NextResponse.json({ error: error.message || 'Failed to fetch seller products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireShopkeeper();
    const body = await request.json();

    const {
      name,
      categoryId,
      subCategoryId,
      subCategoryName,
      brand,
      brandId,
      unit,
      weight,
      mrp,
      retailPrice,
      wholesalePrice,
      minimumQuantity,
      stockQuantity,
      sku,
      mandi,
      location,
      shopName,
      shopAddress,
      deliveryAvailability,
      gstPercent,
      expiryDate,
      description,
      images,
      actionType, // 'DRAFT' or 'SUBMIT'
    } = body;

    // If submitting for approval, enforce mandatory fields
    const isSubmit = actionType === 'SUBMIT';
    if (isSubmit) {
      if (!name || !categoryId || !unit || retailPrice === undefined || retailPrice === null) {
        return NextResponse.json(
          { error: 'Product Name, Category, Unit / Pack Size, and Selling Price are required.' },
          { status: 400 }
        );
      }
      if (!images || !Array.isArray(images) || images.length === 0) {
        return NextResponse.json(
          { error: 'At least one product packaging image is required before submitting.' },
          { status: 400 }
        );
      }
    }

    // Resolve Category
    let resolvedCategoryId = categoryId;
    if (resolvedCategoryId) {
      const cat = await prisma.category.findFirst({
        where: { OR: [{ id: resolvedCategoryId }, { slug: resolvedCategoryId }] },
      });
      if (cat) {
        resolvedCategoryId = cat.id;
      } else {
        const defaultCat = await prisma.category.findFirst({ where: { active: true } });
        resolvedCategoryId = defaultCat?.id;
      }
    } else {
      const defaultCat = await prisma.category.findFirst({ where: { active: true } });
      resolvedCategoryId = defaultCat?.id;
    }

    if (!resolvedCategoryId) {
      return NextResponse.json({ error: 'A valid category is required to create a listing.' }, { status: 400 });
    }

    // Resolve Brand
    let resolvedBrandId = brandId || null;
    if (!resolvedBrandId && brand && typeof brand === 'string' && brand.trim()) {
      const trimmed = brand.trim();
      const slug = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const brandRecord = await prisma.brand.upsert({
        where: { slug },
        update: {},
        create: { name: trimmed, slug },
      });
      resolvedBrandId = brandRecord.id;
    }

    // Resolve Shop Information
    const userShopName = shopName || user.fullName;
    const userShopAddress = shopAddress || 'Azadpur Mandi Commercial Hub';

    const status: ProductStatus = isSubmit ? 'PENDING_REVIEW' : 'DRAFT';
    const productSku = sku || `KM-SEL-${Date.now().toString().slice(-6)}`;
    const productSlug = `${name ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'product'}-${Date.now().toString().slice(-4)}`;

    // Prepare image records
    const imageRecords = Array.isArray(images) && images.length > 0
      ? images.map((img: any, idx: number) => ({
          url: typeof img === 'string' ? img : (img.url || '/products/placeholder.svg'),
          altText: typeof img === 'object' && img.altText ? img.altText : (name || 'Product'),
          sortOrder: idx,
        }))
      : [{ url: '/products/placeholder.svg', altText: name || 'Product', sortOrder: 0 }];

    const newProduct = await prisma.product.create({
      data: {
        name: name || 'Untitled Product Draft',
        slug: productSlug,
        categoryId: resolvedCategoryId,
        subCategoryId: subCategoryId || null,
        brandId: resolvedBrandId,
        unit: unit || '1 Pack',
        weight: weight || null,
        mrp: mrp ? Number(mrp) : null,
        retailPrice: Number(retailPrice || 0),
        wholesalePrice: wholesalePrice ? Number(wholesalePrice) : null,
        minimumQuantity: minimumQuantity ? Number(minimumQuantity) : 1,
        stockQuantity: stockQuantity ? Number(stockQuantity) : 100,
        sku: productSku,
        mandi: mandi || null,
        location: location || null,
        shopName: userShopName,
        shopAddress: userShopAddress,
        deliveryAvailability: deliveryAvailability || 'Immediate Dispatch',
        gstPercent: gstPercent ? Number(gstPercent) : null,
        expiryDate: expiryDate || null,
        description: description || '',
        sellerId: user.id,
        status,
        aiDescriptionStatus: isSubmit ? 'GENERATING' : 'NOT_GENERATED',
        images: {
          create: imageRecords,
        },
      },
      include: {
        category: true,
        brand: true,
        images: true,
      },
    });

    // Log audit trail
    await prisma.productAuditLog.create({
      data: {
        productId: newProduct.id,
        actorId: user.id,
        actorRole: 'SHOPKEEPER',
        actorName: user.fullName,
        action: isSubmit ? 'SUBMITTED' : 'SAVED_DRAFT',
        notes: isSubmit ? 'Submitted for Admin review' : 'Saved as initial draft',
      },
    });

    // If submitted, automatically generate AI description in background
    if (isSubmit) {
      try {
        const aiOutput = await AiService.generateProductDescription({
          name: newProduct.name,
          brand: newProduct.brand?.name || undefined,
          category: newProduct.category?.name,
          unit: newProduct.unit,
          retailPrice: Number(newProduct.retailPrice),
          wholesalePrice: Number(newProduct.wholesalePrice || 0),
          shopName: userShopName,
          description: newProduct.description || undefined,
        });

        await prisma.product.update({
          where: { id: newProduct.id },
          data: {
            aiDescription: aiOutput.detailedDescription,
            shortDescription: aiOutput.shortDescription,
            finalDescription: aiOutput.detailedDescription,
            highlights: aiOutput.highlights,
            productTags: aiOutput.productTags,
            aiDescriptionStatus: 'GENERATED',
          },
        });

        await prisma.productAuditLog.create({
          data: {
            productId: newProduct.id,
            actorId: 'system-ai',
            actorRole: 'AI_ASSISTANT',
            actorName: 'Xyon AI Engine',
            action: 'AI_GENERATED',
            notes: 'Generated initial factual description, highlights, and tags',
          },
        });
      } catch (aiErr) {
        console.error('Initial AI generation error:', aiErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: isSubmit
        ? 'Your product has been submitted for admin review.'
        : 'Product draft saved successfully.',
      product: newProduct,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Seller product creation error:', error);
    if (error.message?.includes('Forbidden') || error.message?.includes('Unauthorized')) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return NextResponse.json({ error: error.message || 'Failed to process product' }, { status: 500 });
  }
}
