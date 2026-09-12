const fs = require('fs');
const path = require('path');

const commodities = [
  {
    file: 'km-wheat-sharbati.svg',
    name: 'MP Sharbati Desi Gehun',
    sub: '50kg Wholesale Mandi Bori (Sortex Cleaned)',
    brand: 'ITC AASHIRVAAD',
    cat: 'Atta, Maida & Suji',
    price: '₹1,550',
    unitBadge: '📦 50kg Bori • ₹31/kg Wholesale',
    badge: 'MANDI WHOLESALE LOT',
    primary: '#B45309',
    secondary: '#F59E0B',
    light: '#FEF3C7',
    iconLetter: '🌾',
    iconShape: 'wheat'
  },
  {
    file: 'km-sugar-50kg.svg',
    name: 'White Crystal Sugar (M-30)',
    sub: '50kg Wholesale Mandi Bori (Double Refined)',
    brand: 'TATA',
    cat: 'Sugar, Salt & Jaggery',
    price: '₹2,150',
    unitBadge: '📦 50kg Bori • ₹43/kg Wholesale',
    badge: 'GRADE M-30 CRYSTAL',
    primary: '#0284C7',
    secondary: '#38BDF8',
    light: '#E0F2FE',
    iconLetter: '🍬',
    iconShape: 'sugar'
  },
  {
    file: 'km-gur-kolhapur.svg',
    name: 'Kolhapur Desi Gur Block',
    sub: '100% Pure Chemical-Free Desi Jaggery 1kg',
    brand: 'TATA',
    cat: 'Sugar, Salt & Jaggery',
    price: '₹65',
    unitBadge: '📦 1kg Block • Traditional Desi Gur',
    badge: 'KOLHAPURI ORGANIC',
    primary: '#92400E',
    secondary: '#D97706',
    light: '#FEF3C7',
    iconLetter: '🍯',
    iconShape: 'gur'
  },
  {
    file: 'km-oil-mustard-15l.svg',
    name: 'Kachi Ghani Mustard Oil',
    sub: '15 Litre Wholesale Commercial Tin (Pipa)',
    brand: 'FORTUNE',
    cat: 'Cooking Oil',
    price: '₹2,280',
    unitBadge: '📦 15L Tin • Approx. ₹152/Litre',
    badge: 'COLD PRESSED RAW MUSTARD',
    primary: '#C2410C',
    secondary: '#F59E0B',
    light: '#FFFBEB',
    iconLetter: '🛢️',
    iconShape: 'oil'
  },
  {
    file: 'km-dal-urad-dhuli.svg',
    name: 'Unpolished Urad Dal Dhuli',
    sub: 'White Split Black Gram 1kg Bag',
    brand: 'TATA SAMPANN',
    cat: 'Dal & Pulses',
    price: '₹148',
    unitBadge: '📦 1kg Bag • Sortex Cleaned',
    badge: 'NATURALLY RICH IN PROTEIN',
    primary: '#334155',
    secondary: '#64748B',
    light: '#F1F5F9',
    iconLetter: '🥣',
    iconShape: 'dal'
  },
  {
    file: 'km-dal-urad-chilka.svg',
    name: 'Unpolished Urad Dal Chilka',
    sub: 'Black Split Gram with Skin 1kg Bag',
    brand: 'TATA SAMPANN',
    cat: 'Dal & Pulses',
    price: '₹138',
    unitBadge: '📦 1kg Bag • High Dietary Fiber',
    badge: 'TRADITIONAL CHILKA SPLIT',
    primary: '#1E293B',
    secondary: '#475569',
    light: '#F8FAFC',
    iconLetter: '🥣',
    iconShape: 'dal'
  },
  {
    file: 'km-dal-masoor.svg',
    name: 'Red Lentils / Lal Masoor Malka',
    sub: 'Machine Cleaned Red Lentils 1kg Bag',
    brand: 'TATA SAMPANN',
    cat: 'Dal & Pulses',
    price: '₹110',
    unitBadge: '📦 1kg Bag • Fast Cooking Desi Malka',
    badge: 'SELECT SORTEX QUALITY',
    primary: '#C2410C',
    secondary: '#FB923C',
    light: '#FFEDD5',
    iconLetter: '🥣',
    iconShape: 'dal'
  },
  {
    file: 'km-chana-kabuli.svg',
    name: 'Super Bold Kabuli Chana',
    sub: '12mm Dollar Chana / Safed Chole 1kg',
    brand: 'TATA SAMPANN',
    cat: 'Dal & Pulses',
    price: '₹165',
    unitBadge: '📦 1kg Bag • 12mm Export Grade',
    badge: 'EXTRA BOLD 12MM COUNT',
    primary: '#A16207',
    secondary: '#EAB308',
    light: '#FEFCE8',
    iconLetter: '🧆',
    iconShape: 'chana'
  },
  {
    file: 'km-chana-kala.svg',
    name: 'Desi Kala Chana',
    sub: 'Small Brown Chickpeas / Desi Chana 1kg',
    brand: 'TATA SAMPANN',
    cat: 'Dal & Pulses',
    price: '₹95',
    unitBadge: '📦 1kg Bag • High Iron & Fiber',
    badge: 'PURE DESI VARIETY',
    primary: '#78350F',
    secondary: '#B45309',
    light: '#FEF3C7',
    iconLetter: '🧆',
    iconShape: 'chana'
  },
  {
    file: 'km-rice-1121.svg',
    name: '1121 XXL Steam Basmati Rice',
    sub: 'Extra Long Grain Basmati Rice 10kg Bag',
    brand: 'TATA',
    cat: 'Rice',
    price: '₹1,180',
    unitBadge: '📦 10kg Bag • 8.4mm+ Grain Length',
    badge: 'AGED 2 YEARS STEAM BASMATI',
    primary: '#1D4ED8',
    secondary: '#60A5FA',
    light: '#EFF6FF',
    iconLetter: '🍚',
    iconShape: 'rice'
  },
  {
    file: 'km-spice-jeera.svg',
    name: 'Sabut Jeera / Cumin Seeds',
    sub: 'Unpolished Machine Cleaned Jeera 500g',
    brand: 'MDH',
    cat: 'Masala & Spices',
    price: '₹240',
    unitBadge: '📦 500g Pouch • High Essential Oils',
    badge: 'RAJASTHAN MANDI CLEANED',
    primary: '#78350F',
    secondary: '#A16207',
    light: '#FEF3C7',
    iconLetter: '🌿',
    iconShape: 'spice'
  },
  {
    file: 'km-spice-dhaniya.svg',
    name: 'Green Sabut Dhaniya Seeds',
    sub: 'Rajasthan Whole Coriander Seeds 500g',
    brand: 'MDH',
    cat: 'Masala & Spices',
    price: '₹110',
    unitBadge: '📦 500g Pouch • Vibrant Aroma',
    badge: 'RAMGANJ MANDI SORTEX',
    primary: '#15803D',
    secondary: '#4ADE80',
    light: '#F0FDF4',
    iconLetter: '🌿',
    iconShape: 'spice'
  },
  {
    file: 'km-spice-kali-mirch.svg',
    name: 'Malabar Bold Sabut Kali Mirch',
    sub: 'Extra Bold Whole Black Peppercorns 200g',
    brand: 'MDH',
    cat: 'Masala & Spices',
    price: '₹185',
    unitBadge: '📦 200g Pouch • High Piperine Kick',
    badge: 'MALABAR BOLD GRADE-1',
    primary: '#0F172A',
    secondary: '#475569',
    light: '#F8FAFC',
    iconLetter: '⚫',
    iconShape: 'spice'
  },
  {
    file: 'km-spice-rai.svg',
    name: 'Chhoti Kali Rai / Mustard Seeds',
    sub: 'Small Black Mustard Seeds 200g Pouch',
    brand: 'MDH',
    cat: 'Masala & Spices',
    price: '₹42',
    unitBadge: '📦 200g Pouch • Pure Tadka Grade',
    badge: 'CLEANED & DUST-FREE',
    primary: '#831843',
    secondary: '#BE185D',
    light: '#FFF1F2',
    iconLetter: '🟤',
    iconShape: 'spice'
  },
  {
    file: 'km-spice-methi.svg',
    name: 'Desi Methi Dana / Fenugreek',
    sub: 'Cleaned Whole Fenugreek Seeds 200g',
    brand: 'MDH',
    cat: 'Masala & Spices',
    price: '₹38',
    unitBadge: '📦 200g Pouch • Herbal Digestive',
    badge: 'SELECTED GOLDEN GRAINS',
    primary: '#B45309',
    secondary: '#D97706',
    light: '#FEF3C7',
    iconLetter: '🌱',
    iconShape: 'spice'
  },
  {
    file: 'km-spice-saunf.svg',
    name: 'Moti Desi Saunf / Fennel Seeds',
    sub: 'Sweet Whole Fennel Seeds 200g Pouch',
    brand: 'MDH',
    cat: 'Masala & Spices',
    price: '₹55',
    unitBadge: '📦 200g Pouch • Natural Sweet Taste',
    badge: 'LUCKNOWI SWEET GREEN',
    primary: '#166534',
    secondary: '#22C55E',
    light: '#DCFCE7',
    iconLetter: '🌿',
    iconShape: 'spice'
  },
  {
    file: 'km-makhana-jumbo.svg',
    name: 'Jumbo 5-Star Phool Makhana',
    sub: 'Super Crisp Foxnuts / Lotus Seeds 250g',
    brand: 'TATA',
    cat: 'Dry Fruits & Nuts',
    price: '₹280',
    unitBadge: '📦 250g Wholesale Bag • 5-Star Jumbo',
    badge: 'BIHAR MITHILA ORIGIN',
    primary: '#6B21A8',
    secondary: '#A855F7',
    light: '#FAF5FF',
    iconLetter: '🤍',
    iconShape: 'nut'
  },
  {
    file: 'km-salt-sendha.svg',
    name: 'Himalayan Sendha Namak',
    sub: 'Natural Rock Salt Powder 1kg Pouch',
    brand: 'TATA',
    cat: 'Sugar, Salt & Jaggery',
    price: '₹65',
    unitBadge: '📦 1kg Pouch • 84 Trace Minerals',
    badge: 'VRAT & FASTING AUTHENTIC',
    primary: '#BE185D',
    secondary: '#F472B6',
    light: '#FDF2F8',
    iconLetter: '🧂',
    iconShape: 'salt'
  }
];

function buildSvg(item) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="55%" stop-color="${item.light}"/>
      <stop offset="100%" stop-color="${item.secondary}" stop-opacity="0.25"/>
    </linearGradient>

    <!-- Header Banner Gradient -->
    <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${item.primary}"/>
      <stop offset="100%" stop-color="${item.secondary}"/>
    </linearGradient>

    <!-- Shadow Filter -->
    <filter id="packShadow" x="-10%" y="-10%" width="125%" height="125%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="${item.primary}" flood-opacity="0.2"/>
    </filter>
  </defs>

  <!-- Background Base Canvas -->
  <rect width="500" height="500" rx="32" fill="url(#bgGrad)"/>
  
  <!-- Subtle Framing Border -->
  <rect x="8" y="8" width="484" height="484" rx="26" fill="none" stroke="${item.primary}" stroke-opacity="0.2" stroke-width="2"/>

  <!-- Main Product Packaging Card Canvas -->
  <g filter="url(#packShadow)">
    <rect x="45" y="45" width="410" height="410" rx="24" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>

    <!-- Brand Header Ribbon -->
    <path d="M 45 69 Q 45 45 69 45 L 431 45 Q 455 45 455 69 L 455 130 L 45 130 Z" fill="url(#primaryGrad)"/>

    <!-- Brand Text -->
    <text x="250" y="90" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="900" text-anchor="middle" fill="#FFFFFF" letter-spacing="1.5">
      ${item.brand}
    </text>
    <text x="250" y="114" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" text-anchor="middle" fill="#FFFFFF" opacity="0.95" letter-spacing="1">
      WHOLESALE MANDI GRADE • ${item.cat.toUpperCase()}
    </text>

    <!-- Price Tag Badge (Top Right) -->
    <g transform="translate(355, 25)">
      <rect width="90" height="44" rx="12" fill="#FF6F00" stroke="#FFFFFF" stroke-width="2"/>
      <text x="45" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="900" text-anchor="middle" fill="#FFFFFF">
        ${item.price}
      </text>
    </g>

    <!-- Badge Ribbon -->
    <g transform="translate(250, 152)">
      <rect x="-110" y="-12" width="220" height="24" rx="12" fill="${item.primary}" opacity="0.95"/>
      <text x="0" y="4" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="900" text-anchor="middle" fill="#FFFFFF" letter-spacing="0.8">
        ★ ${item.badge} ★
      </text>
    </g>

    <!-- Central Commodity Emblem Illustration -->
    <g transform="translate(250, 235)">
      <!-- Outer Dash Ring -->
      <circle r="72" fill="${item.light}" stroke="${item.secondary}" stroke-width="2.5" stroke-dasharray="6 3"/>
      <circle r="60" fill="#FFFFFF"/>
      <circle r="44" fill="${item.primary}" opacity="0.12"/>
      
      <!-- Central Emoji / Symbol -->
      <text x="0" y="14" font-size="44" text-anchor="middle">
        ${item.iconLetter}
      </text>
    </g>

    <!-- Product Title & Name -->
    <text x="250" y="338" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="900" text-anchor="middle" fill="${item.primary}">
      ${item.name}
    </text>

    <!-- Subtitle / Variant Description -->
    <text x="250" y="362" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" text-anchor="middle" fill="#64748B">
      ${item.sub}
    </text>

    <!-- Bottom Highlights Footer Bar -->
    <g transform="translate(65, 388)">
      <rect width="370" height="48" rx="14" fill="${item.light}" stroke="${item.secondary}" stroke-opacity="0.4"/>
      
      <!-- Pack Size Badge -->
      <text x="16" y="29" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" fill="${item.primary}">
        ${item.unitBadge}
      </text>

      <!-- Verified Authenticity Pill -->
      <text x="354" y="29" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800" text-anchor="end" fill="#059669">
        ✔ 100% GENUINE
      </text>
    </g>
  </g>
</svg>`;
}

const targetDir = path.join(process.cwd(), 'public', 'products');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

let generated = 0;
for (const item of commodities) {
  const filePath = path.join(targetDir, item.file);
  fs.writeFileSync(filePath, buildSvg(item), 'utf8');
  generated++;
}

console.log(`Successfully generated ${generated} wholesale commodity SVGs in ${targetDir}`);
