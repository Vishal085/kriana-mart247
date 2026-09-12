import { NextResponse } from 'next/server';
import { AiRateUpdaterService } from '@/services/ai-rate-updater.service';
import { getCurrentSessionUser } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    const isAuthorizedSecret = Boolean(cronSecret && authHeader === `Bearer ${cronSecret}`);
    if (!isAuthorizedSecret) {
      const admin = await getCurrentSessionUser();
      if (!admin || admin.role !== 'ADMIN') {
        return NextResponse.json(
          { error: 'Unauthorized: Valid CRON_SECRET authorization or Admin session required' },
          { status: 401 }
        );
      }
    }

    const result = await AiRateUpdaterService.runAiRateUpdate('Automated 10:30 AM Daily Scheduler');
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Daily Cron execution failed' },
      { status: 500 }
    );
  }
}
