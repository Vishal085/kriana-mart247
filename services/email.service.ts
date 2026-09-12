import nodemailer, { type Transporter } from 'nodemailer';

export class EmailService {
  private static transporter: Transporter | null = null;

  private static getTransporter(): Transporter | null {
    if (this.transporter) return this.transporter;

    const gmailUser = process.env.GMAIL_USER || process.env.SMTP_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;

    if (!gmailUser || !gmailPass) {
      return null;
    }

    this.transporter = nodemailer.createTransport({
      service: process.env.SMTP_HOST ? undefined : 'gmail',
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    return this.transporter;
  }

  static async sendOtpEmail(
    toEmail: string,
    otp: string,
    recipientName: string = 'User'
  ): Promise<{ success: boolean; error?: string; devMode?: boolean }> {
    const transporter = this.getTransporter();

    const subject = `Your KiranaMart247 Registration OTP: ${otp}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #073B6F; margin: 0; font-size: 24px;">KiranaMart<span style="color: #39A9E8;">247</span></h2>
          <p style="color: #64748b; font-size: 13px; margin-top: 4px;">Direct Mandi Wholesale & Retail Grocery Platform</p>
        </div>
        <div style="background-color: #F8FAFC; border-radius: 12px; padding: 20px; text-align: center; margin: 20px 0;">
          <p style="color: #334155; font-size: 14px; margin-top: 0;">Hello <strong>${recipientName}</strong>,</p>
          <p style="color: #475569; font-size: 13px; margin: 8px 0 16px;">Use the 6-digit verification code below to complete your registration:</p>
          <div style="display: inline-block; font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #073B6F; background: #ffffff; padding: 12px 24px; border-radius: 10px; border: 2px dashed #0B5FA5;">
            ${otp}
          </div>
          <p style="color: #64748b; font-size: 11px; margin-top: 14px; margin-bottom: 0;">This OTP is valid for 10 minutes. Do not share this code with anyone.</p>
        </div>
        <div style="border-top: 1px solid #f1f5f9; padding-top: 16px; text-align: center; color: #94a3b8; font-size: 11px;">
          © ${new Date().getFullYear()} KiranaMart247. All rights reserved.
        </div>
      </div>
    `;

    if (!transporter) {
      console.log(`\n========================================`);
      console.log(`[DEV OTP - EMAIL] To: ${toEmail}`);
      console.log(`[DEV OTP - EMAIL] OTP Code: ${otp}`);
      console.log(`(Configure GMAIL_USER and GMAIL_APP_PASSWORD in .env for live email delivery)`);
      console.log(`========================================\n`);
      return { success: true, devMode: true };
    }

    try {
      const from = process.env.SMTP_FROM || `"KiranaMart247" <${process.env.GMAIL_USER || process.env.SMTP_USER}>`;
      await transporter.sendMail({
        from,
        to: toEmail,
        subject,
        html,
        text: `Your KiranaMart247 registration verification code is: ${otp}. Valid for 10 minutes.`,
      });
      console.log(`[EMAIL SENT] OTP ${otp} dispatched to ${toEmail}`);
      return { success: true };
    } catch (err: any) {
      console.error(`[EMAIL ERROR] Failed to send OTP to ${toEmail}:`, err.message);
      return { success: false, error: err.message };
    }
  }
}
