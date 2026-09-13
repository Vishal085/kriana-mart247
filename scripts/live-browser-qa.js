const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const BASE_URL = 'https://kiranamart247.com';
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const SCREENSHOT_DIR = '/Users/vishalgupta/.gemini/antigravity-ide/brain/9883fd47-f21e-472c-8e1e-68edbe396f4b/qa_screenshots';

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const DESKTOP_VIEWPORTS = [
  { name: 'desktop-1920x1080', width: 1920, height: 1080, isMobile: false },
  { name: 'desktop-1440x900', width: 1440, height: 900, isMobile: false },
  { name: 'desktop-1366x768', width: 1366, height: 768, isMobile: false },
  { name: 'desktop-1280x800', width: 1280, height: 800, isMobile: false },
];

const MOBILE_VIEWPORTS = [
  { name: 'mobile-375x812', width: 375, height: 812, isMobile: true, hasTouch: true },
  { name: 'mobile-390x844', width: 390, height: 844, isMobile: true, hasTouch: true },
  { name: 'mobile-412x915', width: 412, height: 915, isMobile: true, hasTouch: true },
  { name: 'mobile-360x800', width: 360, height: 800, isMobile: true, hasTouch: true },
];

const PAGES_TO_TEST = [
  { path: '/', label: 'homepage' },
  { path: '/shop', label: 'shop' },
  { path: '/mandi-rates', label: 'mandi-rates' },
  { path: '/mandis', label: 'mandis' },
  { path: '/login', label: 'login' },
];

async function runQA() {
  console.log('🚀 Starting Real Browser QA Test on', BASE_URL);
  console.log('Using Chrome:', CHROME_PATH);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
  });

  const report = {
    testedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    viewports: {},
    summary: { totalChecks: 0, passed: 0, failed: 0, errors: [] },
  };

  const allViewports = [...DESKTOP_VIEWPORTS, ...MOBILE_VIEWPORTS];

  for (const vp of allViewports) {
    console.log(`\n========================================`);
    console.log(`📱 Testing Viewport: ${vp.name} (${vp.width}x${vp.height})`);
    console.log(`========================================`);

    report.viewports[vp.name] = {
      viewport: vp,
      pages: {},
    };

    const page = await browser.newPage();
    await page.setViewport({
      width: vp.width,
      height: vp.height,
      isMobile: vp.isMobile,
      hasTouch: vp.hasTouch || false,
      deviceScaleFactor: vp.isMobile ? 2 : 1,
    });

    const consoleLogs = [];
    const pageErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleLogs.push(msg.text());
      }
    });
    page.on('pageerror', (err) => {
      pageErrors.push(err.toString());
    });

    for (const p of PAGES_TO_TEST) {
      const url = `${BASE_URL}${p.path}`;
      const pageKey = p.label;
      console.log(`  Checking [${vp.name}] -> ${url}`);

      const pageResult = {
        url,
        status: null,
        horizontalOverflow: false,
        scrollWidth: 0,
        clientWidth: 0,
        brokenImagesCount: 0,
        brokenImages: [],
        consoleErrors: [],
        screenshot: '',
      };

      try {
        const response = await page.goto(url, {
          waitUntil: 'networkidle2',
          timeout: 25000,
        });

        pageResult.status = response ? response.status() : null;

        // Wait a small moment for React hydration / client render
        await new Promise((r) => setTimeout(r, 1200));

        // 1. Check Horizontal Overflow
        const overflowCheck = await page.evaluate(() => {
          const docEl = document.documentElement;
          const body = document.body;
          const scrollW = Math.max(docEl.scrollWidth, body.scrollWidth);
          const clientW = docEl.clientWidth;
          const hasOverflow = scrollW > clientW + 1; // 1px grace for rounding
          
          let culprit = null;
          if (hasOverflow) {
            const allElements = document.querySelectorAll('*');
            for (const el of allElements) {
              const rect = el.getBoundingClientRect();
              if (rect.right > clientW + 2) {
                culprit = `${el.tagName}.${el.className || ''} (right: ${rect.right}px > ${clientW}px)`;
                break;
              }
            }
          }
          return { hasOverflow, scrollW, clientW, culprit };
        });

        pageResult.horizontalOverflow = overflowCheck.hasOverflow;
        pageResult.scrollWidth = overflowCheck.scrollW;
        pageResult.clientWidth = overflowCheck.clientW;
        pageResult.overflowCulprit = overflowCheck.culprit;

        // 2. Check Broken Images
        const brokenImgs = await page.evaluate(() => {
          const imgs = Array.from(document.querySelectorAll('img'));
          return imgs
            .filter((img) => img.complete && img.naturalWidth === 0 && img.src && !img.src.startsWith('data:'))
            .map((img) => ({ src: img.src, alt: img.alt || '' }));
        });

        pageResult.brokenImagesCount = brokenImgs.length;
        pageResult.brokenImages = brokenImgs;

        // 3. Take Screenshot
        const screenshotFileName = `${vp.name}_${pageKey}.png`;
        const screenshotPath = path.join(SCREENSHOT_DIR, screenshotFileName);
        await page.screenshot({ path: screenshotPath, fullPage: false });
        pageResult.screenshot = screenshotFileName;

        // Record pass/fail
        report.summary.totalChecks++;
        if (!overflowCheck.hasOverflow && brokenImgs.length === 0) {
          report.summary.passed++;
          console.log(`    ✅ PASS - No overflow (${overflowCheck.scrollW}px <= ${overflowCheck.clientW}px), ${brokenImgs.length} broken imgs`);
        } else {
          report.summary.failed++;
          const errs = [];
          if (overflowCheck.hasOverflow) {
            errs.push(`Horizontal overflow (${overflowCheck.scrollW}px > ${overflowCheck.clientW}px, culprit: ${overflowCheck.culprit})`);
          }
          if (brokenImgs.length > 0) {
            errs.push(`${brokenImgs.length} broken images (${brokenImgs.map((i) => i.src).join(', ')})`);
          }
          console.log(`    ⚠️ ISSUES: ${errs.join('; ')}`);
          report.summary.errors.push({ viewport: vp.name, page: pageKey, issues: errs });
        }
      } catch (err) {
        console.log(`    ❌ ERROR loading page: ${err.message}`);
        pageResult.error = err.message;
        report.summary.failed++;
        report.summary.errors.push({ viewport: vp.name, page: pageKey, issues: [err.message] });
      }

      pageResult.consoleErrors = [...consoleLogs, ...pageErrors];
      consoleLogs.length = 0;
      pageErrors.length = 0;

      report.viewports[vp.name].pages[pageKey] = pageResult;
    }

    await page.close();
  }

  // Also test Interactive Flows on 390x844 (Mobile) and 1440x900 (Desktop)
  console.log('\n========================================');
  console.log('🧪 Testing Interactive Flows');
  console.log('========================================');

  const testInteractions = async (vp) => {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile });
    console.log(`Interactions test on ${vp.name}...`);
    
    // 1. Mandi Selector Modal
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });
    await new Promise((r) => setTimeout(r, 1000));
    
    // Try clicking Mandi Selector button
    const mandiBtn = await page.$('button:has-text("Mandi"), [aria-label*="Mandi"], button:has-text("Ghaziabad Mandi")');
    if (mandiBtn) {
      await mandiBtn.click().catch(() => {});
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${vp.name}_flow_mandi_modal.png`) });
      console.log(`  ✅ Mandi modal opened & captured`);
    }

    // 2. Open Cart Drawer
    const cartBtn = await page.$('button:has-text("Cart"), [aria-label*="Cart"], button svg.lucide-shopping-cart, button svg.lucide-shopping-bag');
    if (cartBtn) {
      await cartBtn.click().catch(() => {});
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${vp.name}_flow_cart_drawer.png`) });
      console.log(`  ✅ Cart drawer opened & captured`);
    }

    // 3. Shop Filters interaction
    await page.goto(`${BASE_URL}/shop`, { waitUntil: 'networkidle2' });
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${vp.name}_flow_shop_products.png`) });
    console.log(`  ✅ Shop view captured`);

    await page.close();
  };

  await testInteractions(DESKTOP_VIEWPORTS[1]); // 1440x900
  await testInteractions(MOBILE_VIEWPORTS[1]);  // 390x844

  await browser.close();

  const jsonReportPath = path.join(SCREENSHOT_DIR, 'qa_browser_report.json');
  fs.writeFileSync(jsonReportPath, JSON.stringify(report, null, 2));
  console.log(`\n🎉 Real Browser QA Complete! Report saved to: ${jsonReportPath}`);
  console.log(`Summary: Total Checks: ${report.summary.totalChecks} | Passed: ${report.summary.passed} | Failed: ${report.summary.failed}`);
}

runQA().catch((err) => {
  console.error('Fatal error in QA script:', err);
  process.exit(1);
});
