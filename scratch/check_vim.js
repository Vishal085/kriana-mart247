const fs = require('fs');
const content = fs.readFileSync('lib/mock-data.ts', 'utf8');
const sku = 'KM-DET-VIM-BAR-150G';
const idx = content.indexOf(sku);
console.log('Index:', idx);
console.log(content.substring(idx - 100, idx + 800));
