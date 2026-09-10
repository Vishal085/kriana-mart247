import { NextResponse } from 'next/server';
import { requireShopkeeper } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AiService } from '@/services/ai.service';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireShopkeeper();
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        brand: true,
        images: true,
        auditLogs: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Authorization check: ensure this product belongs to the seller
    if (product.sellerId !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden: You can only view and manage your own listings' },
        { status: 403 }
      );
    }

    return NextResponse.json({ product });
  } catch (error: any) {
    console.error('Seller product GET ID error:', error);
    if (error.message?.includes('Forbidden') || error.message?.includes('Unauthorized')) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return NextResponse.json({ error: error.message || 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireShopkeeper();
    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.product.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    if (existing.sellerId !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden: You can only modify your own listings' },
        { status: 403 }
      );
    }

    // Prevent modifications if already locked in pending review
    if (existing.status === 'PENDING_REVIEW' && body.actionType !== 'CANCEL_REVIEW') {
      return NextResponse.json(
        { error: 'This product is currently under administrative review and cannot be edited. Wait for admin decision or contact support.' },
        { status: 400 }
      );
    }

    const isSubmit = body.actionType === 'SUBMIT';
    let newStatus = existing.status;

    if (isSubmit) {
      newStatus = 'PENDING_REVIEW';
    } else if (body.actionType === 'SAVE_DRAFT') {
      newStatus = 'DRAFT';
    } else if (existing.status === 'PUBLISHED') {
      // Versioning rule: seller modifying a published product moves it back to PENDING_REVIEW
      newStatus = 'PENDING_REVIEW';
    }

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name: body.name !== undefined ? body.name : existing.name,
        categoryId: body.categoryId !== undefined ? body.categoryId : existing.categoryId,
        subCategoryId: body.subCategoryId !== undefined ? body.subCategoryId : existing.subCategoryId,
        subCategoryName: body.subCategoryName !== undefined ? body.subCategoryName : existing.subCategoryName,
        brandId: body.brandId !== undefined ? body.brandId : existing.brandId,
        unit: body.unit !== undefined ? body.unit : existing.unit,
        weight: body.weight !== undefined ? body.weight : existing.weight,
        mrp: body.mrp !== undefined ? (body.mrp ? Number(body.mrp) : null) : existing.mrp,
        retailPrice: body.retailPrice !== undefined ? Number(body.retailPrice) : existing.retailPrice,
        wholesalePrice: body.wholesalePrice !== undefined ? (body.wholesalePrice ? Number(body.wholesalePrice) : null) : existing.wholesalePrice,
        minimumQuantity: body.minimumQuantity !== undefined ? Number(body.minimumQuantity) : existing.minimumQuantity,
        stockQuantity: body.stockQuantity !== undefined ? Number(body.stockQuantity) : existing.stockQuantity,
        mandi: body.mandi !== undefined ? body.mandi : existing.mandi,
        location: body.location !== undefined ? body.location : existing.location,
        deliveryAvailability: body.deliveryAvailability !== undefined ? body.deliveryAvailability : existing.deliveryAvailability,
        description: body.description !== undefined ? body.description : existing.description,
        images: body.images !== undefined ? body.images : existing.images,
        status: newStatus,
        publishedVersionId: existing.status === 'PUBLISHED' ? existing.id : existing.publishedVersionId,
        aiDescriptionStatus: isSubmit ? 'GENERATING' : existing.aiDescriptionStatus,
      },
    });

    // Audit log entry
    await prisma.productAuditLog.create({
      data: {
        productId: id,
        actorId: user.id,
        actorRole: 'SHOPKEEPER',
        actorName: user.fullName,
        action: isSubmit ? 'SUBMITTED' : 'EDITED_BY_SELLER',
        notes: isSubmit
          ? 'Resubmitted for Admin review after seller updates'
          : 'Updated product details',
      },
    });

    if (isSubmit) {
      try {
        const aiOutput = await AiService.generateProductDescription({
          name: updated.name,
          brand: updated.brand?.name,
          category: updated.category?.name,
          unit: updated.unit,
          retailPrice: Number(updated.retailPrice),
          wholesalePrice: Number(updated.wholesalePrice || 0),
          shopName: updated.shopName || user.fullName,
          description: updated.description,
        });

        await prisma.product.update({
          where: { id },
          data: {
            aiDescription: aiOutput.detailedDescription,
            shortDescription: aiOutput.shortDescription,
            finalDescription: aiOutput.detailedDescription,
            highlights: aiOutput.highlights,
            productTags: aiOutput.productTags,
            aiDescriptionStatus: 'GENERATED',
          },
        });
      } catch (err) {
        console.error('AI update error:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: isSubmit ? 'Product updated and submitted for review' : 'Product saved successfully',
      product: updated,
    });
  } catch (error: any) {
    console.error('Seller product PUT error:', error);
    if (error.message?.includes('Forbidden') || error.message?.includes('Unauthorized')) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return NextResponse.json({ error: error.message || 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireShopkeeper();
    const { id } = await params;

    const existing = await prisma.product.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    if (existing.sellerId !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden: You can only delete your own listings' },
        { status: 403 }
      );
    }

    if (existing.status === 'PUBLISHED') {
      return NextResponse.json(
        { error: 'Live published products cannot be deleted directly. Contact admin or set stock to 0.' },
        { status: 400 }
      );
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Product listing removed' });
  } catch (error: any) {
    console.error('Seller product DELETE error:', error);
    if (error.message?.includes('Forbidden') || error.message?.includes('Unauthorized')) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return NextResponse.json({ error: error.message || 'Failed to delete product' }, { status: 500 });
  }
}
