const fs = require('fs');
const path = require('path');

// 1. Delete all km-*.jpg files in public/products
const dir = path.join(process.cwd(), 'public', 'products');
const files = fs.readdirSync(dir);
let deletedCount = 0;
files.forEach(f => {
  if (f.startsWith('km-') && (f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png'))) {
    fs.unlinkSync(path.join(dir, f));
    deletedCount++;
  }
});
console.log(`Deleted ${deletedCount} unverified raster images from public/products.`);

// 2. Update lib/mock-data.ts to use .svg for all products
let mockContent = fs.readFileSync('lib/mock-data.ts', 'utf8');
// Replace any remaining .jpg or other extensions in /products/km-* with .svg
const beforeJpg = (mockContent.match(/\/products\/km-[^"]+\.jpg/g) || []).length;
mockContent = mockContent.replace(/\/products\/(km-[^"]+)\.jpg/g, '/products/$1.svg');
fs.writeFileSync('lib/mock-data.ts', mockContent, 'utf8');
console.log(`Replaced ${beforeJpg} .jpg references with .svg in lib/mock-data.ts.`);

// 3. Verify that all 87 products now strictly have .svg
const mockLines = fs.readFileSync('lib/mock-data.ts', 'utf8');
const svgMatches = mockLines.match(/"url":\s*"\/products\/km-[^"]+\.svg"/g) || [];
console.log(`Total verified .svg image properties in lib/mock-data.ts: ${svgMatches.length}`);

// 4. Update prisma/seed.ts to always default to .svg
let seedContent = fs.readFileSync('prisma/seed.ts', 'utf8');
seedContent = seedContent.replace(/fs\.existsSync\(path\.join\(process\.cwd\(\),\s*'public',\s*'products',\s*`\$\{item\.sku\.toLowerCase\(\)\}\.jpg`\)\)\s*\?\s*`\/products\/\$\{item\.sku\.toLowerCase\(\)\}\.jpg`\s*:/g, '');
fs.writeFileSync('prisma/seed.ts', seedContent, 'utf8');
console.log('Updated prisma/seed.ts to always prefer .svg');
