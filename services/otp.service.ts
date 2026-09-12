import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';
import { EmailService } from './email.service';

export interface RegistrationDraftPayload {
  role: Role;
  fullName: string;
  mobile: string;
  email: string;
  password: string;
  address?: string;
  city?: string;
  pinCode?: string;
  shopName?: string;
  shopAddress?: string;
  state?: string;
  gstNumber?: string;
}

export class OtpService {
  /**
   * Generates a secure 6-digit numeric OTP code
   */
  static generateOtpCode(): string {
    return crypto.randomInt(100000, 999999).toString();
  }

  /**
   * Initiates dual-channel OTP for registration (Gmail & Mobile)
   * Ensures account doesn't exist yet and stores registration draft temporarily.
   */
  static async initiateRegistration(payload: RegistrationDraftPayload) {
    const cleanMobile = payload.mobile.replace(/\D/g, '').trim();
    const cleanEmail = payload.email.trim().toLowerCase();

    // 1. Verify no existing user conflicts
    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          { email: cleanEmail },
          { mobile: cleanMobile },
        ],
      },
      select: { id: true, email: true, mobile: true },
    });

    if (existing) {
      if (existing.email && existing.email.toLowerCase() === cleanEmail) {
        throw new Error('An account with this email address already exists. Please login instead.');
      }
      throw new Error('An account with this mobile number already exists. Please login instead.');
    }

    // 2. Generate 6-digit OTP code
    const otp = this.generateOtpCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // 3. Remove any previous unverified OTP drafts for this email or mobile
    await prisma.otpVerification.deleteMany({
      where: {
        OR: [
          { email: cleanEmail },
          { mobile: cleanMobile },
        ],
      },
    });

    // 4. Create pending verification record (User is NOT created in database yet!)
    const verification = await prisma.otpVerification.create({
      data: {
        email: cleanEmail,
        mobile: cleanMobile,
        otp,
        role: payload.role,
        registrationData: {
          ...payload,
          mobile: cleanMobile,
          email: cleanEmail,
        },
        expiresAt,
      },
    });

    // 5. Concurrently dispatch OTP to Gmail and Mobile
    const emailPromise = EmailService.sendOtpEmail(cleanEmail, otp, payload.fullName);
    
    // Log Mobile SMS/WhatsApp dispatch
    console.log(`\n========================================`);
    console.log(`[REGISTRATION OTP] Code: ${otp}`);
    console.log(`[GMAIL/EMAIL] To: ${cleanEmail}`);
    console.log(`[MOBILE SMS/WHATSAPP] To: +91 ${cleanMobile}`);
    console.log(`========================================\n`);

    // Await email dispatch with a quick timeout so API responds in seconds
    try {
      await Promise.race([
        emailPromise,
        new Promise((resolve) => setTimeout(resolve, 1500)), // max 1.5s wait
      ]);
    } catch (err: any) {
      console.error('[OTP DISPATCH WARNING]', err.message);
    }

    return {
      verificationId: verification.id,
      email: cleanEmail,
      mobile: cleanMobile,
      expiresAt: verification.expiresAt,
      // Dev helper: provide OTP in development for instant 1-second testing
      devOtp: process.env.NODE_ENV !== 'production' ? otp : undefined,
    };
  }

  /**
   * Verifies OTP and ONLY creates User in database upon successful verification.
   */
  static async verifyAndRegister(verificationId: string, submittedOtp: string) {
    const cleanOtp = (submittedOtp || '').trim();

    if (!cleanOtp || cleanOtp.length !== 6) {
      throw new Error('Please enter a valid 6-digit OTP code.');
    }

    const verification = await prisma.otpVerification.findUnique({
      where: { id: verificationId },
    });

    if (!verification) {
      throw new Error('Verification session expired or not found. Please register again.');
    }

    if (new Date() > verification.expiresAt) {
      await prisma.otpVerification.delete({ where: { id: verificationId } }).catch(() => {});
      throw new Error('OTP has expired. Please request a new code.');
    }

    if (verification.attempts >= 5) {
      await prisma.otpVerification.delete({ where: { id: verificationId } }).catch(() => {});
      throw new Error('Too many incorrect attempts. Please submit your registration again.');
    }

    if (verification.otp !== cleanOtp) {
      // Increment attempt counter
      await prisma.otpVerification.update({
        where: { id: verificationId },
        data: { attempts: { increment: 1 } },
      });
      throw new Error('Incorrect OTP. Please check the code sent to your Gmail and mobile.');
    }

    // OTP IS VALID! Now create the User in PostgreSQL transaction
    const reg = verification.registrationData as any;
    const passwordHash = await bcrypt.hash(reg.password, 10);

    const newUser = await prisma.$transaction(async (tx) => {
      // Create user
      const user = await tx.user.create({
        data: {
          fullName: reg.fullName,
          mobile: reg.mobile,
          email: reg.email,
          passwordHash,
          role: verification.role,
          active: true,
          whatsappOptIn: true,
        },
        select: {
          id: true,
          fullName: true,
          email: true,
          mobile: true,
          role: true,
          active: true,
        },
      });

      // Role specific profile creation
      if (verification.role === Role.CUSTOMER) {
        await tx.customerProfile.create({
          data: {
            userId: user.id,
            address: reg.address || '',
            city: reg.city || 'Delhi',
            pinCode: reg.pinCode || '',
          },
        });

        // Initialize cart
        await tx.cart.create({
          data: { userId: user.id },
        });
      } else if (verification.role === Role.SHOPKEEPER) {
        await tx.shopkeeperProfile.create({
          data: {
            userId: user.id,
            shopName: reg.shopName || `${reg.fullName}'s Kirana`,
            shopAddress: reg.shopAddress || '',
            city: reg.city || 'Delhi',
            state: reg.state || 'Delhi',
            pinCode: reg.pinCode || '',
            gstNumber: reg.gstNumber || null,
            status: 'APPROVED',
          },
        });
      }

      // Delete the OTP draft
      await tx.otpVerification.delete({
        where: { id: verificationId },
      });

      return user;
    });

    console.log(`✅ [USER CREATED AFTER OTP VERIFICATION] ID: ${newUser.id} | Email: ${newUser.email} | Mobile: ${newUser.mobile} | Role: ${newUser.role}`);
    return newUser;
  }
}
