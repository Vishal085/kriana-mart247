import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Direction, Role } from '@prisma/client';

export async function GET() {
  try {
    await requireAdmin();

    const [
      customersCount,
      productsCount,
      categoriesCount,
      brandsCount,
      mandisCount,
      ratesCount,
      rateDirections,
      ordersTotal,
      ordersPending,
      ordersDelivered,
      recentOrders,
    ] = await Promise.all([
      prisma.user.count({ where: { role: Role.CUSTOMER } }),
      prisma.product.count(),
      prisma.category.count(),
      prisma.brand.count(),
      prisma.mandi.count(),
      prisma.mandiRate.count({ where: { active: true } }),
      prisma.mandiRate.groupBy({
        by: ['direction'],
        where: { active: true },
        _count: { direction: true },
      }),
      prisma.order.count(),
      prisma.order.count({ where: { status: 'PENDING' } }),
      prisma.order.count({ where: { status: 'DELIVERED' } }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { fullName: true, mobile: true } } },
      }),
    ]);

    const rising = rateDirections.find((r) => r.direction === Direction.RISING)?._count.direction ?? 0;
    const falling = rateDirections.find((r) => r.direction === Direction.FALLING)?._count.direction ?? 0;
    const stable = rateDirections.find((r) => r.direction === Direction.STABLE)?._count.direction ?? 0;

    return NextResponse.json({
      metrics: {
        customers: customersCount,
        products: productsCount,
        categories: categoriesCount,
        brands: brandsCount,
        mandis: mandisCount,
        rates: ratesCount,
        market: { rising, falling, stable },
        orders: {
          total: ordersTotal,
          pending: ordersPending,
          delivered: ordersDelivered,
        },
      },
      recentOrders,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Unauthorized admin access' }, { status: 403 });
  }
}
