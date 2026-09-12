import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AiService } from '@/services/ai.service';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdmin();
    const { id } = await params;
    const body = await request.json();

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        brand: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const { tone, length, language, customInstructions } = body;

    // Trigger AI generation
    const aiResult = await AiService.generateProductDescription({
      name: product.name,
      brand: product.brand?.name || (typeof product.brand === 'string' ? product.brand : undefined),
      category: product.category?.name,
      unit: product.unit,
      retailPrice: Number(product.retailPrice),
      wholesalePrice: product.wholesalePrice ? Number(product.wholesalePrice) : undefined,
      shopName: product.shopName || undefined,
      description: customInstructions
        ? `${product.description || ''}\nAdmin Instruction: ${customInstructions}`
        : product.description || undefined,
      tone,
      length,
      language,
    });

    // Update product
    const updated = await prisma.product.update({
      where: { id },
      data: {
        aiDescription: aiResult.detailedDescription,
        shortDescription: aiResult.shortDescription,
        finalDescription: aiResult.detailedDescription,
        highlights: aiResult.highlights,
        productTags: aiResult.productTags,
        aiDescriptionStatus: 'GENERATED',
      },
    });

    // Record audit log
    await prisma.productAuditLog.create({
      data: {
        productId: id,
        actorId: admin.id,
        actorRole: 'ADMIN',
        actorName: admin.fullName,
        action: 'AI_REGENERATED',
        notes: `Regenerated description (Tone: ${tone || 'commercial'}, Lang: ${language || 'english'}, Length: ${length || 'medium'})`,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'AI description regenerated successfully',
      aiResult,
      product: updated,
    });
  } catch (error: any) {
    console.error('Admin AI regeneration error:', error);
    if (error.message?.includes('Forbidden') || error.message?.includes('Unauthorized')) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return NextResponse.json(
      { error: error.message || 'Failed to regenerate AI description' },
      { status: 500 }
    );
  }
}
