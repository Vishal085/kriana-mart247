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

    return await prisma.$transaction(async (tx: any) => {
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

  static async loginUnified(input: { identifier: string; password: string; redirect?: string }) {
    const rawId = input.identifier.trim();
    const isEmail = rawId.includes('@');
    const cleanId = isEmail ? rawId.toLowerCase() : rawId;

    // Use clean, direct queries for stable user lookup across both local and production databases
    let user = isEmail
      ? await prisma.user.findUnique({
          where: { email: cleanId },
          select: {
            id: true,
            fullName: true,
            email: true,
            mobile: true,
            role: true,
            active: true,
            passwordHash: true,
            avatarUrl: true,
            customerProfile: true,
            adminProfile: true,
          },
        })
      : await prisma.user.findFirst({
          where: { mobile: cleanId },
          select: {
            id: true,
            fullName: true,
            email: true,
            mobile: true,
            role: true,
            active: true,
            passwordHash: true,
            avatarUrl: true,
            customerProfile: true,
            adminProfile: true,
          },
        });

    // Fallback: Case-insensitive search if exact email lookup didn't match
    if (!user && isEmail) {
      user = await prisma.user.findFirst({
        where: { email: { equals: cleanId, mode: 'insensitive' } },
        select: {
          id: true,
          fullName: true,
          email: true,
          mobile: true,
          role: true,
          active: true,
          passwordHash: true,
          avatarUrl: true,
          customerProfile: true,
          adminProfile: true,
        },
      });
    }

    if (!user) {
      throw new Error('Invalid mobile/email or password');
    }

    if (!user.active) {
      throw new Error('Your account has been deactivated. Please contact support.');
    }

    const isValid = await bcrypt.compare(input.password, user.passwordHash);
    if (!isValid) {
      throw new Error('Invalid mobile/email or password');
    }

    // Safely load shopkeeperProfile only if needed without breaking authentication if table/relation is missing
    let shopkeeperProfile = null;
    if (user.role === Role.SHOPKEEPER) {
      try {
        shopkeeperProfile = await prisma.shopkeeperProfile.findUnique({
          where: { userId: user.id },
        });
      } catch {
        shopkeeperProfile = null;
      }
    }

    // Role-based destination determination
    let defaultRedirect = '/shop';
    if (user.role === Role.ADMIN) {
      defaultRedirect = '/dashboard/admin';
    } else if (user.role === Role.SHOPKEEPER) {
      defaultRedirect = '/dashboard/seller';
    } else {
      defaultRedirect = '/shop';
    }

    let redirectTo = defaultRedirect;
    if (input.redirect && input.redirect.startsWith('/')) {
      const target = input.redirect;
      if (user.role === Role.ADMIN) {
        // Admin can access any requested route
        redirectTo = target;
      } else if (user.role === Role.SHOPKEEPER) {
        // Shopkeeper cannot access admin routes
        if (target.startsWith('/dashboard/admin')) {
          redirectTo = defaultRedirect;
        } else {
          redirectTo = target;
        }
      } else {
        // Customer cannot access admin or seller dashboards
        if (target.startsWith('/dashboard/admin') || target.startsWith('/dashboard/seller')) {
          redirectTo = defaultRedirect;
        } else {
          redirectTo = target;
        }
      }
    }

    return {
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        active: user.active,
        avatarUrl: user.avatarUrl,
        customerProfile: user.customerProfile,
        shopkeeperProfile,
        adminProfile: user.adminProfile,
      },
      redirectTo,
    };
  }
}
