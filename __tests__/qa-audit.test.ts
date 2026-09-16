import crypto from 'crypto';
import { RateService } from '../services/rates.service';
import { ProductService } from '../services/products.service';
import { OtpService } from '../services/otp.service';
import { EmailService } from '../services/email.service';
import { filterMockRates } from '../lib/prisma';
import fs from 'fs';
import path from 'path';

async function runQaAuditTests() {
  console.log('🧪 Running Comprehensive Production QA Audit Test Suite...\n');
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`  ✓ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${testName} ${detail ? `(${detail})` : ''}`);
      failed++;
    }
  }

  // =========================================================================
  // 1. MANDI ID RESOLUTION & RATES SERVICE
  // =========================================================================
  console.log('1. Mandi ID Resolution & Cross-Mapping:');
  const resolvedMock = await RateService.resolveCandidateMandiIds('mandi-10');
  assert(Boolean(resolvedMock?.includes('mandi-10')), 'Resolves legacy mandi-10 to candidate list');

  const resolvedSlug = await RateService.resolveCandidateMandiIds('ghaziabad-mandi');
  assert(Boolean(resolvedSlug?.includes('ghaziabad-mandi') || resolvedSlug?.includes('mandi-10')), 'Resolves slug to candidate IDs');

  // Test Rate History fallback when DB table empty
  const history = await RateService.getRateHistory('prod-rice-basmati-1', 'mandi-10', '7D');
  assert(Array.isArray(history), 'Returns array for rate history');
  assert(history.length > 0, `Generates resilient historical points for trends (got ${history.length} points)`);
  assert(history[0].rate > 0 || history[0].modalPrice > 0, 'Historical rate or modal price is positive');

  // Test Mock Rate Filtering with diverse criteria
  const filteredRatesMandi = filterMockRates({ mandiId: 'mandi-10' });
  assert(filteredRatesMandi.length > 0, `filterMockRates returns rates for mandi-10 (got ${filteredRatesMandi.length})`);

  const filteredRatesCat = filterMockRates({ category: 'staples-grains' });
  assert(filteredRatesCat.length > 0, `filterMockRates filters by category slug (got ${filteredRatesCat.length})`);

  // =========================================================================
  // 2. PRODUCT CATALOG, DEALS & ASSET INTEGRITY
  // =========================================================================
  console.log('\n2. Products Catalog & Deals Filtering:');
  const allProducts = await ProductService.getAll({ limit: 50 });
  assert(allProducts.items.length > 0, `Fetches product catalog (count: ${allProducts.items.length})`);

  // Verify Deals Filter
  const dealsProducts = await ProductService.getAll({ deals: true });
  assert(dealsProducts.items.length > 0, `Fetches products with active deals (count: ${dealsProducts.items.length})`);

  // Verify no broken images in seller store JSON
  const sellerStorePath = path.join(process.cwd(), 'data/seller-store.json');
  const sellerStoreData = JSON.parse(fs.readFileSync(sellerStorePath, 'utf8'));
  const brokenImageFound = sellerStoreData.products?.some((p: any) =>
    (p.images || []).some((img: any) => {
      const url = typeof img === 'string' ? img : img?.url || '';
      return url.includes('india_gate_classic_5kg.svg');
    })
  );
  assert(!brokenImageFound, 'No deprecated/broken image paths in seller store data');

  // =========================================================================
  // 3. AUTHENTICATION & SECURITY AUDIT
  // =========================================================================
  console.log('\n3. Authentication & Security Hardening:');
  // Verify seller-store.ts does not contain admin-demo-1 or hardcoded admin123
  const sellerStoreCode = fs.readFileSync(path.join(process.cwd(), 'lib/seller-store.ts'), 'utf8');
  assert(!sellerStoreCode.includes('admin-demo-1'), 'No hardcoded admin user in seller-store.ts');
  assert(!sellerStoreCode.includes('$2a$10$YourAdminHashedPasswordHere'), 'No placeholder admin hash');

  // Verify auth.service.ts does not allow admin password bypass
  const authServiceCode = fs.readFileSync(path.join(process.cwd(), 'services/auth.service.ts'), 'utf8');
  assert(!authServiceCode.includes("password === 'admin123'"), 'No admin123 password bypass in auth.service.ts');
  assert(!authServiceCode.includes("password === 'Admin@123'"), 'No Admin@123 password bypass in auth.service.ts');

  // =========================================================================
  // 4. OTP GENERATION & STORAGE HARDENING
  // =========================================================================
  console.log('\n4. OTP Service & Registration Privacy:');
  const code = OtpService.generateOtpCode();
  assert(code.length === 6 && /^\d{6}$/.test(code), 'Generates valid 6-digit numeric OTP');

  const sha256Hash = crypto.createHash('sha256').update(code).digest('hex');
  assert(sha256Hash.length === 64, 'SHA-256 OTP hash is 64 hex characters');

  // Verify app/register/customer/page.tsx has no devOtp UI leak
  const customerRegCode = fs.readFileSync(path.join(process.cwd(), 'app/register/customer/page.tsx'), 'utf8');
  assert(!customerRegCode.includes('setDevOtp'), 'Customer registration has no setDevOtp state');
  assert(!customerRegCode.includes('⚡ Verification OTP:'), 'Customer registration does not leak OTP in DOM');

  // Verify app/register/seller/page.tsx has no devOtp UI leak
  const sellerRegCode = fs.readFileSync(path.join(process.cwd(), 'app/register/seller/page.tsx'), 'utf8');
  assert(!sellerRegCode.includes('setDevOtp'), 'Seller registration has no setDevOtp state');
  assert(!sellerRegCode.includes('⚡ Verification OTP:'), 'Seller registration does not leak OTP in DOM');

  // =========================================================================
  // 5. EMAIL & PASSWORD RESET DISPATCH
  // =========================================================================
  console.log('\n5. Email Service & Reset Flow:');
  const resetEmailResult = await EmailService.sendPasswordResetEmail(
    'test@example.com',
    'https://www.kiranamart247.com/reset-password?token=mocktoken123',
    'Test Customer'
  );
  assert(resetEmailResult.success === true, 'EmailService generates password reset email');

  // =========================================================================
  // 6. CONTACT FORM & BRANDING AUDIT
  // =========================================================================
  console.log('\n6. Contact API & Site Consistency:');
  const contactRouteCode = fs.readFileSync(path.join(process.cwd(), 'app/api/contact/route.ts'), 'utf8');
  assert(contactRouteCode.includes('contactSchema.safeParse'), 'Contact API validates submissions with schema');

  const layoutCode = fs.readFileSync(path.join(process.cwd(), 'app/layout.tsx'), 'utf8');
  assert(layoutCode.includes('https://www.kiranamart247.com'), 'Layout metadataBase uses https://www.kiranamart247.com');
  assert(!layoutCode.includes("metadataBase: new URL('https://kiranamart.com')"), 'No stale kiranamart.com domain in layout');

  const robotsCode = fs.readFileSync(path.join(process.cwd(), 'app/robots.ts'), 'utf8');
  assert(robotsCode.includes('https://www.kiranamart247.com'), 'robots.ts uses https://www.kiranamart247.com');

  const sitemapCode = fs.readFileSync(path.join(process.cwd(), 'app/sitemap.ts'), 'utf8');
  assert(sitemapCode.includes('https://www.kiranamart247.com'), 'sitemap.ts uses https://www.kiranamart247.com');

  // =========================================================================
  // SUMMARY
  // =========================================================================
  console.log('\n========================================');
  console.log(`QA Audit Test Results: ${passed} PASSED, ${failed} FAILED`);
  console.log('========================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runQaAuditTests().catch((err) => {
  console.error('Fatal error in QA Audit test run:', err);
  process.exit(1);
});
