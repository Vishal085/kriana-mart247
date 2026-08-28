import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const start = performance.now();
  try {
    const result = await prisma.$queryRaw`SELECT 1 as connected`;
    const responseTime = `${(performance.now() - start).toFixed(2)}ms`;

    return NextResponse.json({
      status: 'healthy',
      database: 'PostgreSQL',
      connected: true,
      responseTime,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    const responseTime = `${(performance.now() - start).toFixed(2)}ms`;
    return NextResponse.json(
      {
        status: 'unhealthy',
        database: 'PostgreSQL',
        connected: false,
        error: error.message || 'Database connection error',
        responseTime,
      },
      { status: 503 }
    );
  }
}
