const http = require('http');

async function test(query) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000/shop?search=${encodeURIComponent(query)}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const matches = [...data.matchAll(/<img[^>]+src="([^">]+)"[^>]*alt="([^">]*)"/g)];
        resolve(matches.map(m => ({ src: m[1], alt: m[2] })));
      });
    }).on('error', err => resolve({ error: err.message }));
  });
}

async function run() {
  const terms = ['sugar', 'chaat', 'ghee', 'haldi', 'lifebuoy', 'lux'];
  for (const t of terms) {
    const r = await test(t);
    console.log(`=== QUERY: "${t}" ===`);
    if (Array.isArray(r)) {
      r.filter(x => !x.src.includes('logo')).forEach(x => console.log(`  ${x.alt} -> ${x.src}`));
    }
  }
}

run();
