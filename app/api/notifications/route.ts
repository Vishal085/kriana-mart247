import { NextResponse } from 'next/server';
import { requireCustomer } from '@/lib/auth';
import { NotificationService } from '@/services/notifications.service';

export async function GET() {
  try {
    const user = await requireCustomer();
    const notifications = await NotificationService.getUserNotifications(user.id);
    return NextResponse.json({ notifications });
  } catch (error: any) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await requireCustomer();
    const body = await request.json();
    const { notificationId, markAll } = body;

    if (markAll) {
      await NotificationService.markAllAsRead(user.id);
      return NextResponse.json({ message: 'All marked as read' });
    }

    if (notificationId) {
      await NotificationService.markAsRead(user.id, notificationId);
      return NextResponse.json({ message: 'Marked as read' });
    }

    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update' }, { status: 400 });
  }
}
