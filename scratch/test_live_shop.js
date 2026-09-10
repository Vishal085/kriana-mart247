const http = require('http');

async function testSearch(term) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000/shop?search=${encodeURIComponent(term)}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const imgMatches = [...data.matchAll(/<img[^>]+src="([^">]+)"[^>]*alt="([^">]*)"/g)];
        resolve(imgMatches.map(m => ({ src: m[1], alt: m[2] })));
      });
    }).on('error', (err) => {
      resolve({ error: err.message });
    });
  });
}

async function run() {
  const terms = ['vim', 'rin', 'harpic', 'lizol', 'matchbox', 'camphor', 'cashew', 'poha', 'kissan', 'agarbatti', 'good knight'];
  for (const term of terms) {
    const results = await testSearch(term);
    console.log(`=== SEARCH: "${term}" ===`);
    if (Array.isArray(results)) {
      results.filter(r => !r.src.includes('logo')).forEach(r => console.log(`  ${r.alt} -> ${r.src}`));
    } else {
      console.log('  Error:', results.error);
    }
  }
}

run();
