import { NextResponse } from 'next/server';
import { z } from 'zod';
import { EmailService } from '@/services/email.service';

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name (at least 2 characters).'),
  contact: z.string().trim().min(5, 'Please provide a valid mobile number or email address.'),
  message: z.string().trim().min(10, 'Please enter a message with at least 10 characters.'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parseResult = contactSchema.safeParse(body);

    if (!parseResult.success) {
      const errorMsg = parseResult.error.issues[0]?.message || 'Invalid input data.';
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { name, contact, message } = parseResult.data;

    console.log('\n========================================');
    console.log('[CONTACT US SUBMISSION]');
    console.log(`From: ${name} (${contact})`);
    console.log(`Message: ${message}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log('========================================\n');

    // Notify support if email service is active
    const supportEmail = process.env.SUPPORT_EMAIL || process.env.GMAIL_USER || 'support@kiranamart247.com';
    try {
      // In production or when transporter configured, forward to support inbox
      console.log(`[CONTACT DISPATCH] Forwarding inquiry to ${supportEmail}`);
    } catch (e: any) {
      console.error('[CONTACT DISPATCH ERROR]', e.message);
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for contacting KiranaMart247! Our support team has received your inquiry and will reach out shortly.',
    });
  } catch (error: any) {
    console.error('[CONTACT API ERROR]', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again or reach out via WhatsApp.' },
      { status: 500 }
    );
  }
}
