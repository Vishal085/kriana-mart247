import crypto from 'node:crypto';
import { normalizePhoneNumber, isValidPhoneNumber, maskPhoneNumber } from '../lib/phone';
import { WhatsAppTemplateBuilder } from '../lib/whatsapp/templates';
import { WhatsAppClient } from '../lib/whatsapp/client';

async function runTests() {
  console.log('🧪 Starting WhatsApp Integration Test Suite...\n');
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`  ✓ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${testName}`);
      failed++;
    }
  }

  // --- 1. Phone Normalization Tests ---
  console.log('1. Phone Number Normalization & Validation:');
  const indian10 = normalizePhoneNumber('9876543210');
  assert(indian10.isValid && indian10.e164 === '+919876543210' && indian10.digits === '919876543210', 'Normalizes 10-digit Indian mobile');

  const indianWithPlus91 = normalizePhoneNumber('+91 98765 43210');
  assert(indianWithPlus91.isValid && indianWithPlus91.digits === '919876543210', 'Handles +91 prefix with spaces');

  const indianWithZero = normalizePhoneNumber('09876543210');
  assert(indianWithZero.isValid && indianWithZero.digits === '919876543210', 'Handles leading zero');

  const invalidNum = normalizePhoneNumber('12345');
  assert(!invalidNum.isValid, 'Flags invalid short number');

  const masked = maskPhoneNumber('9876543210');
  assert(masked.includes('***'), 'Masks phone number for secure logging');

  // --- 2. Template Payload Builder Tests ---
  console.log('\n2. WhatsApp Template Builder:');
  const sampleOrder = {
    customerName: 'Vishal Gupta',
    orderNumber: 'KIR-20260829-998877',
    total: 1450.5,
    address: 'Shop 14, Main Market',
    city: 'Delhi',
    pincode: '110006',
    itemCount: 4,
  };

  const confirmation = WhatsAppTemplateBuilder.buildOrderConfirmation(sampleOrder);
  assert(confirmation.templateName === 'kiranamart_order_confirmation', 'Builds Order Confirmation template name');
  assert(confirmation.components[0].parameters.length === 4, 'Generates 4 body parameters for Confirmation template');
  assert(confirmation.fallbackText.includes('KIR-20260829-998877'), 'Generates rich fallback plain text');

  const packed = WhatsAppTemplateBuilder.buildOrderPacked(sampleOrder);
  assert(packed.templateName === 'kiranamart_order_packed', 'Builds Order Packed template');

  const shipped = WhatsAppTemplateBuilder.buildOrderShipped(sampleOrder);
  assert(shipped.templateName === 'kiranamart_order_shipped', 'Builds Order Shipped template');

  const delivered = WhatsAppTemplateBuilder.buildOrderDelivered(sampleOrder);
  assert(delivered.templateName === 'kiranamart_order_delivered', 'Builds Order Delivered template');

  const cancelled = WhatsAppTemplateBuilder.buildOrderCancelled(sampleOrder);
  assert(cancelled.templateName === 'kiranamart_order_cancelled', 'Builds Order Cancelled template');

  // --- 3. Webhook Verification Tests ---
  console.log('\n3. Webhook Verification & Security:');
  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || 'kiranamart_whatsapp_verify_token_2026';

  const validVerification = WhatsAppClient.verifyWebhook('subscribe', verifyToken, 'CHALLENGE_12345');
  assert(validVerification.isValid && validVerification.challenge === 'CHALLENGE_12345', 'Validates hub challenge with matching token');

  const invalidVerification = WhatsAppClient.verifyWebhook('subscribe', 'WRONG_TOKEN', 'CHALLENGE_12345');
  assert(!invalidVerification.isValid, 'Rejects invalid verify token');

  // HMAC Signature Verification Test
  const testSecret = 'secret_test_key_123';
  const testBody = JSON.stringify({ object: 'whatsapp_business_account' });
  const validSignature = 'sha256=' + crypto.createHmac('sha256', testSecret).update(testBody, 'utf8').digest('hex');
  const invalidSignature = 'sha256=invalid_hash_value';

  process.env.WHATSAPP_APP_SECRET = testSecret;
  const sigPass = WhatsAppClient.verifyWebhookSignature(testBody, validSignature);
  const sigFail = WhatsAppClient.verifyWebhookSignature(testBody, invalidSignature);
  assert(sigPass, 'HMAC signature verification succeeds for valid payload');
  assert(!sigFail, 'HMAC signature verification rejects tampered payload');

  // --- 4. Simulation Dispatch Mode Test ---
  console.log('\n4. WhatsApp Client Simulation Mode:');
  delete process.env.WHATSAPP_ACCESS_TOKEN;
  delete process.env.WHATSAPP_API_TOKEN;
  const dispatchRes = await WhatsAppClient.sendTemplate('9876543210', 'kiranamart_order_confirmation', []);
  assert(dispatchRes.success && dispatchRes.simulated === true, 'Dispatches in safe simulation mode when keys not configured');

  console.log(`\n========================================`);
  console.log(`Test Results: ${passed} PASSED, ${failed} FAILED`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
