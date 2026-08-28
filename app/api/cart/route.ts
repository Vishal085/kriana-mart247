import { NextResponse } from 'next/server';
import { requireCustomer } from '@/lib/auth';
import { CartService } from '@/services/cart.service';

export async function GET() {
  try {
    const user = await requireCustomer();
    const cart = await CartService.getCart(user.id);
    return NextResponse.json({ cart });
  } catch (error: any) {
    if (error.message.includes('Forbidden') || error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Please login as customer to view your cart' }, { status: 401 });
    }
    return NextResponse.json({ error: error.message || 'Failed to fetch cart' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const user = await requireCustomer();
    await CartService.clearCart(user.id);
    return NextResponse.json({ message: 'Cart cleared successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to clear cart' }, { status: 401 });
  }
}
