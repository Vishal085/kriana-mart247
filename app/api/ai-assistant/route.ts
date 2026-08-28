import { NextResponse } from 'next/server';
import { getCurrentSessionUser } from '@/lib/auth';
import { AiService } from '@/services/ai.service';

export async function POST(request: Request) {
  try {
    const user = await getCurrentSessionUser();
    const body = await request.json();
    const message = body.message;
    const history = body.history || [];

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const response = await AiService.processMessage({
      userId: user?.id,
      message,
      history,
    });

    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'AI Assistant processing error' },
      { status: 500 }
    );
  }
}
