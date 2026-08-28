import { NextResponse } from 'next/server';
import { requireCustomer } from '@/lib/auth';
import { CartService } from '@/services/cart.service';
import { cartItemUpdateSchema } from '@/validators';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireCustomer();
    const { id } = await params;
    const body = await request.json();
    const parsed = cartItemUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid quantity' }, { status: 400 });
    }

    const cart = await CartService.updateItemQuantity(user.id, id, parsed.data.quantity);
    return NextResponse.json({ message: 'Cart updated', cart });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update item' }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireCustomer();
    const { id } = await params;

    const cart = await CartService.removeItem(user.id, id);
    return NextResponse.json({ message: 'Item removed from cart', cart });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to remove item' }, { status: 400 });
  }
}
