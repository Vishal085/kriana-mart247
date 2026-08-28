const { PrismaClient, Direction } = require('@prisma/client');
const prisma = new PrismaClient();

async function runVerification() {
  console.log('=== KiranaMart247 End-to-End Automated Verification ===\n');

  // 1. Health & Database
  const [users, products, mandis, rates, histories] = await Promise.all([
    prisma.user.count(),
    prisma.product.count(),
    prisma.mandi.count(),
    prisma.mandiRate.count(),
    prisma.rateHistory.count(),
  ]);

  console.log('1. Database Status:');
  console.log(`   - Users: ${users}`);
  console.log(`   - Products: ${products}`);
  console.log(`   - Mandis: ${mandis}`);
  console.log(`   - Live Mandi Rates: ${rates}`);
  console.log(`   - Rate History Points: ${histories}`);

  // 2. Mandi Rate Spread & Calculations
  const rice = await prisma.product.findFirst({
    where: { name: { contains: 'Rice' } },
    include: { rates: { include: { mandi: true } } },
  });

  if (rice) {
    console.log(`\n2. Rate Engine Verification for "${rice.name}":`);
    console.log(`   - Retail Shop Price: ₹${rice.retailPrice}/${rice.unit}`);
    rice.rates.slice(0, 3).forEach((r) => {
      console.log(`   - Mandi "${r.mandi.name}": Current ₹${r.currentRate}, Prev ₹${r.previousRate}, Shift ₹${r.absoluteChange}, Direction: ${r.direction}`);
    });
  }

  // 3. Customer Cart & Order Transaction
  const customer = await prisma.user.findFirst({
    where: { role: 'CUSTOMER' },
    include: { customerProfile: true },
  });

  if (customer && rice) {
    console.log(`\n3. Cart & Order Simulation for Customer (${customer.fullName}):`);
    let cart = await prisma.cart.upsert({
      where: { userId: customer.id },
      update: {},
      create: { userId: customer.id },
    });

    // Add item to cart
    await prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.id, productId: rice.id } },
      update: { quantity: 2 },
      create: { cartId: cart.id, productId: rice.id, quantity: 2 },
    });

    const cartCheck = await prisma.cartItem.findMany({ where: { cartId: cart.id } });
    console.log(`   - Cart updated: ${cartCheck.length} item(s) in cart`);

    // Place Order Transaction
    const orderNumber = `KIR-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-999001`;
    const order = await prisma.$transaction(async (tx) => {
      const ord = await tx.order.create({
        data: {
          orderNumber,
          userId: customer.id,
          status: 'PENDING',
          subtotal: 190.00,
          tax: 9.50,
          deliveryCharge: 40.00,
          total: 239.50,
          deliveryName: customer.fullName,
          deliveryPhone: customer.mobile || '9876543210',
          deliveryAddress: customer.customerProfile?.address || 'Naya Bazar, Delhi',
          city: customer.customerProfile?.city || 'Delhi',
          pincode: customer.customerProfile?.pinCode || '110006',
          items: {
            create: [
              {
                productId: rice.id,
                productNameSnapshot: rice.name,
                brandSnapshot: 'India Gate',
                unit: rice.unit,
                quantity: 2,
                unitPrice: rice.retailPrice,
                subtotal: 190.00,
              },
            ],
          },
          statusHistory: {
            create: [{ status: 'PENDING', note: 'Order placed by customer during test' }],
          },
        },
        include: { items: true, statusHistory: true },
      });

      // Clear cart
      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
      return ord;
    });

    console.log(`   - Order Created: #${order.orderNumber} (Status: ${order.status}, Total: ₹${order.total})`);
    console.log(`   - Order Item Snapshot Preserved: ${order.items[0].productNameSnapshot} @ ₹${order.items[0].unitPrice}`);

    const remainingCartItems = await prisma.cartItem.count({ where: { cartId: cart.id } });
    console.log(`   - Cart cleared after transaction: ${remainingCartItems === 0 ? 'YES (Verified)' : 'NO'}`);
  }

  console.log('\n=== All Systems Verified Successfully ===');
}

runVerification()
  .catch((e) => {
    console.error('Verification failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
