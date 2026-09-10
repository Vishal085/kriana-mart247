import crypto from 'node:crypto';

// Inlined logic from lib/razorpay.ts to verify direct node runtime behavior
function verifyRazorpayPaymentSignature({ razorpayOrderId, razorpayPaymentId, razorpaySignature }, keySecret) {
  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) return false;
  const payload = `${razorpayOrderId}|${razorpayPaymentId}`;
  const expectedSignature = crypto.createHmac('sha256', keySecret).update(payload).digest('hex');
  try {
    const signatureBuffer = Buffer.from(razorpaySignature, 'hex');
    const expectedBuffer = Buffer.from(expectedSignature, 'hex');
    if (signatureBuffer.length !== expectedBuffer.length) return false;
    return crypto.timingSafeEqual(signatureBuffer, expectedBuffer);
  } catch {
    return expectedSignature === razorpaySignature;
  }
}

function verifyRazorpayWebhookSignature({ rawBody, signatureHeader }, webhookSecret) {
  if (!signatureHeader || !rawBody) return false;
  const expectedSignature = crypto.createHmac('sha256', webhookSecret).update(rawBody).digest('hex');
  try {
    const headerBuffer = Buffer.from(signatureHeader, 'hex');
    const expectedBuffer = Buffer.from(expectedSignature, 'hex');
    if (headerBuffer.length !== expectedBuffer.length) return false;
    return crypto.timingSafeEqual(headerBuffer, expectedBuffer);
  } catch {
    return expectedSignature === signatureHeader;
  }
}

async function runPaymentGatewayTests() {
  console.log('--- Starting Razorpay Payment Gateway Integration Tests ---\n');

  const testSecret = 'km247_test_secret_key_prod_safe';
  const testWebhookSecret = 'km247_webhook_secret_verification_key';

  const mockOrderId = 'order_test_123456';
  const mockPaymentId = 'pay_test_789012';

  // Test 1: Valid Checkout Payment Signature Verification
  const validSignature = crypto
    .createHmac('sha256', testSecret)
    .update(`${mockOrderId}|${mockPaymentId}`)
    .digest('hex');

  const isPaymentValid = verifyRazorpayPaymentSignature({
    razorpayOrderId: mockOrderId,
    razorpayPaymentId: mockPaymentId,
    razorpaySignature: validSignature,
  }, testSecret);

  console.log(`Test 1 [Valid Payment Signature]: ${isPaymentValid ? 'PASSED ✅' : 'FAILED ❌'}`);
  if (!isPaymentValid) throw new Error('Valid signature was rejected');

  // Test 2: Tampered / Invalid Payment Signature Rejection
  const tamperedSignature = validSignature.slice(0, -4) + 'abcd';
  const isTamperedValid = verifyRazorpayPaymentSignature({
    razorpayOrderId: mockOrderId,
    razorpayPaymentId: mockPaymentId,
    razorpaySignature: tamperedSignature,
  }, testSecret);

  console.log(`Test 2 [Tampered Signature Rejection]: ${!isTamperedValid ? 'PASSED ✅' : 'FAILED ❌'}`);
  if (isTamperedValid) throw new Error('Tampered signature was improperly accepted');

  // Test 3: Valid Webhook Signature Verification
  const mockWebhookBody = JSON.stringify({
    event: 'payment.captured',
    payload: {
      payment: {
        entity: {
          id: mockPaymentId,
          order_id: mockOrderId,
          amount: 55000,
          currency: 'INR',
          status: 'captured',
          method: 'upi',
        },
      },
    },
  });

  const validWebhookSignature = crypto
    .createHmac('sha256', testWebhookSecret)
    .update(mockWebhookBody)
    .digest('hex');

  const isWebhookValid = verifyRazorpayWebhookSignature({
    rawBody: mockWebhookBody,
    signatureHeader: validWebhookSignature,
  }, testWebhookSecret);

  console.log(`Test 3 [Valid Webhook Signature]: ${isWebhookValid ? 'PASSED ✅' : 'FAILED ❌'}`);
  if (!isWebhookValid) throw new Error('Valid webhook signature was rejected');

  // Test 4: Invalid Webhook Signature Rejection
  const isInvalidWebhookValid = verifyRazorpayWebhookSignature({
    rawBody: mockWebhookBody,
    signatureHeader: 'invalid_signature_header_value',
  }, testWebhookSecret);

  console.log(`Test 4 [Invalid Webhook Rejection]: ${!isInvalidWebhookValid ? 'PASSED ✅' : 'FAILED ❌'}`);
  if (isInvalidWebhookValid) throw new Error('Invalid webhook signature was improperly accepted');

  console.log('\n--- All Razorpay Gateway Security Tests Passed Successfully! ---');
}

runPaymentGatewayTests().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
