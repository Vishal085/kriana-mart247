const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'products');
const files = fs.readdirSync(dir);
const svgs = files.filter(f => f.endsWith('.svg') && f.startsWith('km-'));
console.log(`Found ${svgs.length} km-*.svg files in public/products.`);

const mockContent = fs.readFileSync('lib/mock-data.ts', 'utf8');
const skuRegex = /"sku":\s*"([^"]+)"/g;
const skus = new Set();
let match;
while ((match = skuRegex.exec(mockContent)) !== null) {
  skus.add(match[1]);
}
console.log(`Found ${skus.size} unique SKUs in lib/mock-data.ts.`);

let missingSvgs = [];
for (const sku of skus) {
  const expectedSvg = `${sku.toLowerCase()}.svg`;
  if (!fs.existsSync(path.join(dir, expectedSvg))) {
    missingSvgs.push(expectedSvg);
  }
}

console.log(`Missing SVGs count: ${missingSvgs.length}`);
if (missingSvgs.length > 0) {
  console.log('Missing files:', missingSvgs);
}
