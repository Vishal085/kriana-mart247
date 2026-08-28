import { NextResponse } from 'next/server';
import { requireCustomer } from '@/lib/auth';
import { AlertService } from '@/services/alerts.service';
import { priceAlertSchema } from '@/validators';

export async function GET() {
  try {
    const user = await requireCustomer();
    const alerts = await AlertService.getUserAlerts(user.id);
    return NextResponse.json({ alerts });
  } catch (error: any) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireCustomer();
    const body = await request.json();
    const parsed = priceAlertSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid alert settings', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const alert = await AlertService.createAlert(user.id, parsed.data);
    return NextResponse.json({ message: 'Price alert created', alert }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create alert' }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await requireCustomer();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Alert ID is required' }, { status: 400 });
    }

    await AlertService.deleteAlert(user.id, id);
    return NextResponse.json({ message: 'Alert deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete alert' }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await requireCustomer();
    const body = await request.json();
    const { id, active } = body;

    if (!id || typeof active !== 'boolean') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    await AlertService.toggleAlertActive(user.id, id, active);
    return NextResponse.json({ message: 'Alert updated' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update alert' }, { status: 400 });
  }
}
