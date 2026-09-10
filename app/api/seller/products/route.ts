import { NextResponse } from 'next/server';
import { requireShopkeeper } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AiService } from '@/services/ai.service';
import { SellerStore } from '@/lib/seller-store';

export async function GET(request: Request) {
  try {
    const user = await requireShopkeeper();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status'); // DRAFT, PENDING_REVIEW, NEEDS_CHANGES, PUBLISHED, REJECTED
    const search = searchParams.get('search')?.toLowerCase();

    // Query seller's products
    let where: any = { sellerId: user.id };
    if (status && status !== 'ALL') {
      where.status = status;
    }

    const allSellerProducts = await prisma.product.findMany({
      where: { sellerId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    // Compute tab counters
    const counts = {
      ALL: allSellerProducts.length,
      DRAFT: allSellerProducts.filter((p: any) => p.status === 'DRAFT').length,
      PENDING_REVIEW: allSellerProducts.filter((p: any) => p.status === 'PENDING_REVIEW').length,
      NEEDS_CHANGES: allSellerProducts.filter((p: any) => p.status === 'NEEDS_CHANGES').length,
      PUBLISHED: allSellerProducts.filter((p: any) => p.status === 'PUBLISHED').length,
      REJECTED: allSellerProducts.filter((p: any) => p.status === 'REJECTED').length,
    };

    let filtered = allSellerProducts;
    if (status && status !== 'ALL') {
      filtered = filtered.filter((p: any) => p.status === status);
    }

    if (search) {
      filtered = filtered.filter(
        (p: any) =>
          p.name.toLowerCase().includes(search) ||
          p.sku.toLowerCase().includes(search) ||
          (p.brand?.name && p.brand.name.toLowerCase().includes(search))
      );
    }

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

    // Default shop information from user's profile if not passed
    const userShopName = shopName || user.fullName;
    const userShopAddress = shopAddress || 'Azadpur Mandi Commercial Hub';

    const status = isSubmit ? 'PENDING_REVIEW' : 'DRAFT';

    const newProduct = await prisma.product.create({
      data: {
        name: name || 'Untitled Product Draft',
        categoryId: categoryId || 'cat-1',
        subCategoryId: subCategoryId || null,
        subCategoryName: subCategoryName || null,
        brandId: brandId || null,
        brand: brand ? { name: brand } : undefined,
        unit: unit || '1 Pack',
        weight: weight || null,
        mrp: mrp ? Number(mrp) : null,
        retailPrice: Number(retailPrice || 0),
        wholesalePrice: wholesalePrice ? Number(wholesalePrice) : null,
        minimumQuantity: minimumQuantity ? Number(minimumQuantity) : 1,
        stockQuantity: stockQuantity ? Number(stockQuantity) : 100,
        sku: sku || `KM-SEL-${Date.now().toString().slice(-6)}`,
        mandi: mandi || null,
        location: location || null,
        shopName: userShopName,
        shopAddress: userShopAddress,
        deliveryAvailability: deliveryAvailability || 'Immediate Dispatch',
        gstPercent: gstPercent ? Number(gstPercent) : null,
        expiryDate: expiryDate || null,
        description: description || '',
        images: images && images.length > 0 ? images : [{ url: '/products/placeholder.svg', altText: name }],
        sellerId: user.id,
        seller: { id: user.id, fullName: user.fullName, email: user.email },
        status,
        aiDescriptionStatus: isSubmit ? 'GENERATING' : 'NOT_GENERATED',
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
          brand: brand || (newProduct.brand?.name),
          category: newProduct.category?.name,
          unit: newProduct.unit,
          retailPrice: Number(newProduct.retailPrice),
          wholesalePrice: Number(newProduct.wholesalePrice || 0),
          shopName: userShopName,
          description: newProduct.description,
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
