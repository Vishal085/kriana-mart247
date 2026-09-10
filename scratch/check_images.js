const fs = require('fs');
const content = fs.readFileSync('lib/mock-data.ts', 'utf8');

const targetSkus = [
  'KM-DET-VIM-BAR-150G',
  'KM-DET-RIN-BAR-140G',
  'KM-POOJA-CAMPHOR-50G',
  'KM-OTHER-GOODKNIGHT-REFILL',
  'KM-CLN-HARPIC-200ML',
  'KM-CLN-LIZOL-FLOR-500ML',
  'KM-POOJA-MATCHBOX-BUNDLE',
  'KM-POOJA-CYCLE-AGAR-50G',
  'KM-DRY-CASHEW-100G',
  'KM-INST-POHA-500G',
  'KM-INST-KISSAN-KETCHUP-100G'
];

for (const sku of targetSkus) {
  const idx = content.indexOf(sku);
  if (idx !== -1) {
    const chunk = content.substring(idx - 50, idx + 1000);
    const urlMatch = chunk.match(/"url":\s*"([^"]+)"/);
    console.log(sku, '==>', urlMatch ? urlMatch[1] : 'no url found');
  } else {
    console.log(sku, 'NOT FOUND');
  }
}
