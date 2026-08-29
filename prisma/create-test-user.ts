import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Test@123', 10);
  
  // Upsert the test customer
  const user = await prisma.user.upsert({
    where: { email: 'test@kiranamart247.com' },
    update: {
      fullName: 'Test Customer',
      mobile: '9876500001',
      passwordHash,
      role: Role.CUSTOMER,
      active: true,
    },
    create: {
      fullName: 'Test Customer',
      email: 'test@kiranamart247.com',
      mobile: '9876500001',
      passwordHash,
      role: Role.CUSTOMER,
      active: true,
      customerProfile: {
        create: {
          address: 'Shop No. 12, Test Market Complex',
          city: 'Delhi',
          pinCode: '110006',
        },
      },
    },
  });

  // Ensure cart exists
  await prisma.cart.upsert({
    where: { userId: user.id },
    update: {},
    create: { userId: user.id },
  });

  console.log('✅ Test Customer created successfully:');
  console.log('Email:', user.email);
  console.log('Mobile:', user.mobile);
  console.log('Password:', 'Test@123');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
