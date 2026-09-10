const fs = require('fs');
const content = fs.readFileSync('lib/mock-data.ts', 'utf8');

const targetNames = [
  'Sugar',
  'Catch Chatpata',
  'Desi Ghee',
  'Haldi Turmeric',
  'Lifebuoy',
  'Lux Soft Rose'
];

targetNames.forEach(t => {
  const regex = new RegExp('"name":\\s*"([^"]*' + t + '[^"]*)"[\\s\\S]*?"url":\\s*"([^"]+)"', 'g');
  let m;
  while ((m = regex.exec(content)) !== null) {
    console.log(m[1], '-->', m[2]);
  }
});
