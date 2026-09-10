const fs = require('fs');
const content = fs.readFileSync('lib/mock-data.ts', 'utf8');

const regex = /"name":\s*"([^"]+)",[\s\S]*?"images":\s*\[\s*\{\s*"id":\s*"[^"]+",\s*"url":\s*"([^"]+)"/g;
let match;
const allProducts = [];
let externalCount = 0;
let localCount = 0;
let missingFileCount = 0;

while ((match = regex.exec(content)) !== null) {
  const name = match[1];
  const url = match[2];
  allProducts.push({ name, url });
  
  if (url.startsWith('http')) {
    externalCount++;
    console.log(`EXTERNAL URL: ${name} -> ${url}`);
  } else if (url.startsWith('/products/')) {
    localCount++;
    const diskPath = 'public' + url;
    if (!fs.existsSync(diskPath)) {
      missingFileCount++;
      console.log(`MISSING ON DISK: ${name} -> ${diskPath}`);
    }
  } else {
    console.log(`UNKNOWN URL FORMAT: ${name} -> ${url}`);
  }
}

console.log('====================================');
console.log(`Total parsed products: ${allProducts.length}`);
console.log(`Local product images: ${localCount}`);
console.log(`External URLs: ${externalCount}`);
console.log(`Missing files on disk: ${missingFileCount}`);
console.log('====================================');
