const fs = require('fs');
const content = fs.readFileSync('lib/mock-data.ts', 'utf8');

const matches = content.match(/https?:\/\/[^"'\s]+/g) || [];
console.log('Total external URLs in lib/mock-data.ts:', matches.length);
matches.forEach(m => console.log(' ', m));
