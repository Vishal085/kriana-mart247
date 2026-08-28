import { prisma } from '@/lib/prisma';

export class CartService {
  static async getCart(userId: string) {
    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                brand: true,
                category: true,
                images: { where: { active: true }, take: 1 },
              },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: {
          items: {
            include: {
              product: {
                include: {
                  brand: true,
                  category: true,
                  images: { where: { active: true }, take: 1 },
                },
              },
            },
            orderBy: { createdAt: 'asc' },
          },
        },
      });
    }

    let subtotal = 0;
    const formattedItems = cart.items.map((item) => {
      const price = Number(item.product.retailPrice);
      const itemSubtotal = price * item.quantity;
      subtotal += itemSubtotal;

      return {
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        product: {
          id: item.product.id,
          name: item.product.name,
          slug: item.product.slug,
          unit: item.product.unit,
          retailPrice: price,
          minimumQuantity: item.product.minimumQuantity,
          maximumQuantity: item.product.maximumQuantity,
          brand: item.product.brand?.name || 'Generic',
          category: item.product.category?.name || 'Grocery',
          image: item.product.images[0]?.url || '/brand/logo.svg',
          active: item.product.active,
        },
        unitPrice: price,
        subtotal: itemSubtotal,
      };
    });

    const tax = subtotal * 0.05;
    const deliveryCharge = subtotal === 0 ? 0 : (subtotal >= 1000 ? 0 : 40);
    const grandTotal = subtotal + tax + deliveryCharge;

    return {
      id: cart.id,
      items: formattedItems,
      totalItems: cart.items.reduce((acc, curr) => acc + curr.quantity, 0),
      subtotal,
      tax,
      deliveryCharge,
      grandTotal,
    };
  }

  static async addItem(userId: string, productId: string, quantity = 1) {
    const product = await prisma.product.findUnique({
      where: { id: productId, active: true },
    });

    if (!product) {
      throw new Error('Product not found or unavailable');
    }

    const minQty = product.minimumQuantity || 1;
    const maxQty = product.maximumQuantity;

    let targetQuantity = Math.max(quantity, minQty);
    if (maxQty && targetQuantity > maxQty) {
      targetQuantity = maxQty;
    }

    let cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId } });
    }

    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    if (existingItem) {
      let nextQty = existingItem.quantity + quantity;
      if (maxQty && nextQty > maxQty) {
        nextQty = maxQty;
      }

      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: nextQty },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity: targetQuantity,
        },
      });
    }

    return this.getCart(userId);
  }

  static async updateItemQuantity(userId: string, itemId: string, quantity: number) {
    const item = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { cart: true, product: true },
    });

    if (!item || item.cart.userId !== userId) {
      throw new Error('Cart item not found');
    }

    if (quantity <= 0) {
      await prisma.cartItem.delete({ where: { id: itemId } });
    } else {
      const minQty = item.product.minimumQuantity || 1;
      const maxQty = item.product.maximumQuantity;

      let validQty = Math.max(quantity, minQty);
      if (maxQty && validQty > maxQty) {
        validQty = maxQty;
      }

      await prisma.cartItem.update({
        where: { id: itemId },
        data: { quantity: validQty },
      });
    }

    return this.getCart(userId);
  }

  static async removeItem(userId: string, itemId: string) {
    const item = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { cart: true },
    });

    if (!item || item.cart.userId !== userId) {
      throw new Error('Cart item not found');
    }

    await prisma.cartItem.delete({ where: { id: itemId } });
    return this.getCart(userId);
  }

  static async clearCart(userId: string) {
    const cart = await prisma.cart.findUnique({ where: { userId } });
    if (cart) {
      await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    }
  }
}
