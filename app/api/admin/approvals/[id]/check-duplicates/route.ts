import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

function normalize(str: string): string {
  return (str || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function calculateSimilarity(s1: string, s2: string): number {
  const norm1 = normalize(s1);
  const norm2 = normalize(s2);
  if (!norm1 || !norm2) return 0;
  if (norm1 === norm2) return 1;

  const words1 = new Set(norm1.split(' '));
  const words2 = new Set(norm2.split(' '));
  let intersection = 0;
  words1.forEach((w) => {
    if (words2.has(w)) intersection++;
  });

  const union = new Set([...words1, ...words2]).size;
  return union > 0 ? intersection / union : 0;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;

    const current = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        brand: true,
        images: true,
      },
    });

    if (!current) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const allProducts = await prisma.product.findMany({
      where: {
        id: { not: id },
      },
      include: {
        category: true,
        brand: true,
        images: true,
      },
    });
    const duplicates: any[] = [];

    const currentBrandName =
      (typeof current.brand === 'object' && current.brand ? current.brand.name : current.brand) || '';
    const currentBrand = String(currentBrandName).toLowerCase().trim();
    const currentUnit = normalize(current.unit || '');
    const currentSku = (current.sku || '').toLowerCase().trim();
    const currentImages = Array.isArray(current.images)
      ? current.images.map((img: any) => (typeof img === 'string' ? img : img.url))
      : [];

    for (const other of allProducts) {
      if (other.id === id) continue;

      const reasons: string[] = [];
      let score = 0;

      // 1. SKU check
      if (currentSku && other.sku && other.sku.toLowerCase().trim() === currentSku) {
        reasons.push(`Exact SKU match (${other.sku})`);
        score += 80;
      }

      // 2. Title similarity
      const titleSim = calculateSimilarity(current.name, other.name);
      if (titleSim > 0.65) {
        reasons.push(`${Math.round(titleSim * 100)}% name match`);
        score += titleSim * 60;
      }

      // 3. Brand + Unit combo
      const otherBrandName =
        (typeof other.brand === 'object' && other.brand ? other.brand.name : other.brand) || '';
      const otherBrand = String(otherBrandName).toLowerCase().trim();
      const otherUnit = normalize(other.unit || '');

      if (
        currentBrand &&
        otherBrand &&
        currentBrand === otherBrand &&
        currentUnit &&
        otherUnit &&
        currentUnit === otherUnit
      ) {
        reasons.push(`Identical brand (${other.brand?.name || other.brand}) and pack size (${other.unit})`);
        score += 40;
      }

      // 4. Image check
      const otherImages = Array.isArray(other.images)
        ? other.images.map((img: any) => (typeof img === 'string' ? img : img.url))
        : [];
      const hasSharedImage = currentImages.some((img) => otherImages.includes(img));
      if (hasSharedImage) {
        reasons.push('Shared packaging image asset detected');
        score += 30;
      }

      if (score >= 40) {
        duplicates.push({
          product: {
            id: other.id,
            name: other.name,
            sku: other.sku,
            brand: other.brand?.name || other.brand,
            category: other.category?.name || other.category,
            unit: other.unit,
            retailPrice: other.retailPrice,
            status: other.status || 'PUBLISHED',
            image: otherImages[0] || null,
          },
          reasons,
          similarityScore: Math.min(100, Math.round(score)),
        });
      }
    }

    duplicates.sort((a, b) => b.similarityScore - a.similarityScore);

    const riskLevel =
      duplicates.some((d) => d.similarityScore >= 80)
        ? 'HIGH'
        : duplicates.length > 0
        ? 'MEDIUM'
        : 'LOW';

    return NextResponse.json({
      duplicates,
      totalMatches: duplicates.length,
      riskLevel,
    });
  } catch (error: any) {
    console.error('Duplicate detection error:', error);
    if (error.message?.includes('Forbidden') || error.message?.includes('Unauthorized')) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return NextResponse.json(
      { error: error.message || 'Failed to check duplicates' },
      { status: 500 }
    );
  }
}
