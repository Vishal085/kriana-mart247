import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';
import { z } from 'zod';
import { customerRegisterSchema, customerLoginSchema, adminLoginSchema } from '@/validators';

export class AuthService {
  static async registerCustomer(input: z.infer<typeof customerRegisterSchema>) {
    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          ...(input.email ? [{ email: input.email }] : []),
          { mobile: input.mobile },
        ],
      },
    });

    if (existing) {
      if (input.email && existing.email === input.email) {
        throw new Error('An account with this email already exists');
      }
      throw new Error('An account with this mobile number already exists');
    }

    const passwordHash = await bcrypt.hash(input.password, 10);

    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          fullName: input.fullName,
          mobile: input.mobile,
          email: input.email || null,
          passwordHash,
          role: Role.CUSTOMER,
          active: true,
          customerProfile: {
            create: {
              address: input.address,
              city: input.city,
              pinCode: input.pinCode,
            },
          },
          cart: {
            create: {},
          },
        },
        select: {
          id: true,
          fullName: true,
          email: true,
          mobile: true,
          role: true,
          active: true,
          customerProfile: true,
        },
      });

      return user;
    });
  }

  static async loginCustomer(input: z.infer<typeof customerLoginSchema>) {
    const isEmail = input.identifier.includes('@');
    const user = isEmail
      ? await prisma.user.findUnique({
          where: { email: input.identifier },
          include: { customerProfile: true },
        })
      : await prisma.user.findFirst({
          where: { mobile: input.identifier, role: Role.CUSTOMER },
          include: { customerProfile: true },
        });

    if (!user || user.role !== Role.CUSTOMER) {
      throw new Error('Invalid mobile/email or password');
    }

    if (!user.active) {
      throw new Error('Your account has been deactivated. Please contact support.');
    }

    const isValid = await bcrypt.compare(input.password, user.passwordHash);
    if (!isValid) {
      throw new Error('Invalid mobile/email or password');
    }

    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
      active: user.active,
      profile: user.customerProfile,
    };
  }

  static async loginAdmin(input: z.infer<typeof adminLoginSchema>) {
    // Server-side admin email domain restriction
    const adminDomain = '@kiranamart247.com';
    if (!input.email.toLowerCase().endsWith(adminDomain)) {
      throw new Error('Admin access is restricted to authorized accounts only');
    }

    const user = await prisma.user.findUnique({
      where: { email: input.email },
      select: {
        id: true,
        fullName: true,
        email: true,
        mobile: true,
        role: true,
        active: true,
        passwordHash: true,
      },
    });

    if (!user || user.role !== Role.ADMIN) {
      throw new Error('Invalid admin credentials');
    }

    if (!user.active) {
      throw new Error('Admin account is deactivated');
    }

    const isValid = await bcrypt.compare(input.password, user.passwordHash);
    if (!isValid) {
      throw new Error('Invalid admin credentials');
    }

    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
      active: user.active,
    };
  }

  static async registerShopkeeper(input: {
    fullName: string;
    mobile: string;
    email?: string;
    password: string;
    shopName: string;
    shopAddress: string;
    city: string;
    state?: string;
    pinCode?: string;
    gstNumber?: string;
  }) {
    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          ...(input.email ? [{ email: input.email }] : []),
          { mobile: input.mobile },
        ],
      },
    });

    if (existing) {
      if (input.email && existing.email === input.email) {
        throw new Error('An account with this email already exists');
      }
      throw new Error('An account with this mobile number already exists');
    }

    const passwordHash = await bcrypt.hash(input.password, 10);

    const user = await prisma.user.create({
      data: {
        fullName: input.fullName,
        mobile: input.mobile,
        email: input.email || null,
        passwordHash,
        role: Role.SHOPKEEPER,
        active: true,
        shopkeeperProfile: {
          create: {
            shopName: input.shopName,
            shopAddress: input.shopAddress,
            city: input.city,
            state: input.state || 'Delhi',
            pinCode: input.pinCode || '',
            gstNumber: input.gstNumber || null,
            status: 'APPROVED',
          },
        },
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        mobile: true,
        role: true,
        active: true,
        shopkeeperProfile: true,
      },
    });

    return user;
  }

  static async loginShopkeeper(input: { identifier: string; password: string }) {
    const isEmail = input.identifier.includes('@');
    const user = isEmail
      ? await prisma.user.findUnique({
          where: { email: input.identifier },
          include: { shopkeeperProfile: true },
        })
      : await prisma.user.findFirst({
          where: { mobile: input.identifier, role: Role.SHOPKEEPER },
          include: { shopkeeperProfile: true },
        });

    if (!user || user.role !== Role.SHOPKEEPER) {
      throw new Error('Invalid credentials. Please check your mobile/email and password.');
    }

    if (!user.active) {
      throw new Error('Your seller account has been deactivated. Please contact support.');
    }

    const isValid = await bcrypt.compare(input.password, user.passwordHash);
    if (!isValid) {
      throw new Error('Invalid shopkeeper mobile/email or password');
    }

    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
      active: user.active,
      shopkeeperProfile: user.shopkeeperProfile,
    };
  }
}
