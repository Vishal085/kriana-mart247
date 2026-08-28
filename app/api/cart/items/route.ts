import { NextResponse } from 'next/server';
import { requireCustomer } from '@/lib/auth';
import { CartService } from '@/services/cart.service';
import { cartItemAddSchema } from '@/validators';

export async function POST(request: Request) {
  try {
    const user = await requireCustomer();
    const body = await request.json();
    const parsed = cartItemAddSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid item data' }, { status: 400 });
    }

    const cart = await CartService.addItem(user.id, parsed.data.productId, parsed.data.quantity);
    return NextResponse.json({ message: 'Item added to cart', cart }, { status: 200 });
  } catch (error: any) {
    if (error.message.includes('Forbidden') || error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Please login to add items to cart' }, { status: 401 });
    }
    return NextResponse.json({ error: error.message || 'Failed to add item to cart' }, { status: 400 });
  }
}
