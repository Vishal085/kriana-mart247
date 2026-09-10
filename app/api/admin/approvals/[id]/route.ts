import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { SellerStore } from '@/lib/seller-store';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        brand: true,
        images: true,
        seller: {
          include: {
            shopkeeperProfile: true,
          },
        },
        auditLogs: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Also get audit logs directly from store if needed
    const auditLogs = SellerStore.getAuditLogsByProductId(id);

    return NextResponse.json({
      product: {
        ...product,
        auditLogs: auditLogs.length > 0 ? auditLogs : product.auditLogs || [],
      },
    });
  } catch (error: any) {
    console.error('Admin approval product GET error:', error);
    if (error.message?.includes('Forbidden') || error.message?.includes('Unauthorized')) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return NextResponse.json(
      { error: error.message || 'Failed to fetch product for review' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdmin();
    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.product.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const { action, reason, notes, edits } = body;

    if (!action) {
      return NextResponse.json(
        { error: 'Missing decision action (APPROVE, REQUEST_CHANGES, REJECT, SAVE_EDITS)' },
        { status: 400 }
      );
    }

    if ((action === 'REQUEST_CHANGES' || action === 'REJECT') && !reason?.trim()) {
      return NextResponse.json(
        { error: `A specific reason is mandatory when performing ${action}` },
        { status: 400 }
      );
    }

    let updateData: any = {};
    let auditAction = action;
    let auditNotes = notes || '';

    if (action === 'APPROVE') {
      updateData = {
        status: 'PUBLISHED',
        active: true,
        approvedAt: new Date(),
        approvedBy: admin.id,
        adminNotes: notes || 'Approved by administrator',
        rejectionReason: null,
      };
      // If admin also provided inline field edits while approving
      if (edits) {
        if (edits.name) updateData.name = edits.name;
        if (edits.unit) updateData.unit = edits.unit;
        if (edits.retailPrice) updateData.retailPrice = Number(edits.retailPrice);
        if (edits.wholesalePrice !== undefined) {
          updateData.wholesalePrice = edits.wholesalePrice ? Number(edits.wholesalePrice) : null;
        }
        if (edits.mrp !== undefined) {
          updateData.mrp = edits.mrp ? Number(edits.mrp) : null;
        }
        if (edits.finalDescription) {
          updateData.finalDescription = edits.finalDescription;
          updateData.aiDescriptionStatus = 'ADMIN_EDITED';
        }
        if (edits.highlights) updateData.highlights = edits.highlights;
        if (edits.productTags) updateData.productTags = edits.productTags;
      }
      auditNotes = notes || 'Product approved and published to public store catalog';
    } else if (action === 'REQUEST_CHANGES') {
      updateData = {
        status: 'NEEDS_CHANGES',
        rejectionReason: reason.trim(),
        adminNotes: notes || reason.trim(),
      };
      auditNotes = `Changes requested: ${reason.trim()}`;
    } else if (action === 'REJECT') {
      updateData = {
        status: 'REJECTED',
        active: false,
        rejectionReason: reason.trim(),
        adminNotes: notes || reason.trim(),
      };
      auditNotes = `Product rejected: ${reason.trim()}`;
    } else if (action === 'SAVE_EDITS') {
      auditAction = 'ADMIN_EDITED';
      updateData = {};
      if (edits) {
        if (edits.name !== undefined) updateData.name = edits.name;
        if (edits.categoryId !== undefined) updateData.categoryId = edits.categoryId;
        if (edits.subCategoryName !== undefined) updateData.subCategoryName = edits.subCategoryName;
        if (edits.brand !== undefined) updateData.brand = edits.brand;
        if (edits.unit !== undefined) updateData.unit = edits.unit;
        if (edits.weight !== undefined) updateData.weight = edits.weight;
        if (edits.retailPrice !== undefined) updateData.retailPrice = Number(edits.retailPrice);
        if (edits.wholesalePrice !== undefined) {
          updateData.wholesalePrice = edits.wholesalePrice ? Number(edits.wholesalePrice) : null;
        }
        if (edits.mrp !== undefined) {
          updateData.mrp = edits.mrp ? Number(edits.mrp) : null;
        }
        if (edits.minimumQuantity !== undefined) updateData.minimumQuantity = Number(edits.minimumQuantity);
        if (edits.stockQuantity !== undefined) updateData.stockQuantity = Number(edits.stockQuantity);
        if (edits.finalDescription !== undefined) {
          updateData.finalDescription = edits.finalDescription;
          updateData.aiDescriptionStatus = 'ADMIN_EDITED';
        }
        if (edits.highlights !== undefined) updateData.highlights = edits.highlights;
        if (edits.productTags !== undefined) updateData.productTags = edits.productTags;
      }
      auditNotes = notes || 'Product details updated by administrator';
    }

    const updated = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    // Record audit log
    await prisma.productAuditLog.create({
      data: {
        productId: id,
        actorId: admin.id,
        actorRole: 'ADMIN',
        actorName: admin.fullName,
        action: auditAction,
        changes: edits || undefined,
        notes: auditNotes,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Action ${action} completed successfully`,
      product: updated,
    });
  } catch (error: any) {
    console.error('Admin approval POST decision error:', error);
    if (error.message?.includes('Forbidden') || error.message?.includes('Unauthorized')) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return NextResponse.json(
      { error: error.message || 'Failed to process admin approval decision' },
      { status: 500 }
    );
  }
}
