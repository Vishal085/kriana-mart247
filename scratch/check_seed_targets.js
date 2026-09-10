const fs = require('fs');
const content = fs.readFileSync('prisma/seed.ts', 'utf8');

const targetNames = [
  'Sugar',
  'Catch Chatpata',
  'Desi Ghee',
  'Haldi Turmeric',
  'Lifebuoy',
  'Lux Soft Rose'
];

for (const name of targetNames) {
  const idx = content.indexOf(name);
  if (idx !== -1) {
    const chunk = content.substring(idx - 100, idx + 400);
    console.log(`=== ${name} in seed.ts ===`);
    console.log(chunk);
  } else {
    console.log(`=== ${name} NOT FOUND in seed.ts ===`);
  }
}
