const fs = require('fs');

const files = [
  'km-inst-poha-500g.jpg',
  'km-other-goodknight-refill.jpg',
  'km-pooja-cycle-agar-50g.jpg',
  'km-inst-kissan-ketchup-100g.jpg',
  'km-dry-cashew-100g.jpg',
  'km-pooja-camphor-50g.jpg',
  'km-pooja-matchbox-bundle.jpg',
  'km-cln-harpic-200ml.jpg',
  'km-cln-lizol-flor-500ml.jpg',
  'km-det-rin-bar-140g.jpg',
  'km-det-vim-bar-150g.jpg'
];

for (const f of files) {
  const p = 'public/products/' + f;
  if (fs.existsSync(p)) {
    const stat = fs.statSync(p);
    console.log(f, 'EXISTS size:', stat.size, 'mtime:', stat.mtime);
  } else {
    console.log(f, 'DOES NOT EXIST');
  }
}
