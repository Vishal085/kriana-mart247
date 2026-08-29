import { NextResponse } from 'next/server';
import { AiRateUpdaterService } from '@/services/ai-rate-updater.service';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    // Verify secret if configured in production
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized cron request' }, { status: 401 });
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
