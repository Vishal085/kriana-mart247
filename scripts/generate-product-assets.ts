import fs from 'fs';
import path from 'path';

interface ProductAssetDef {
  sku: string;
  brand: string;
  name: string;
  packSize: string;
  price: string;
  theme: {
    bg: string;
    primary: string;
    secondary: string;
    text: string;
    badgeBg: string;
    badgeText: string;
  };
  iconType: 'biscuit' | 'butter' | 'milk' | 'bottle' | 'bag' | 'oil' | 'spice' | 'soap' | 'detergent' | 'box' | 'pouch' | 'can' | 'tube';
  subtitle?: string;
  extraText?: string;
}

const products: ProductAssetDef[] = [
  // 1. Biscuits
  {
    sku: 'KM-BIS-PARLE-50G',
    brand: 'Parle',
    name: 'Parle-G Glucose',
    packSize: '50g • ₹5 Chhota Pack',
    price: '₹5',
    theme: { bg: '#FFF8E1', primary: '#E65100', secondary: '#FFB300', text: '#3E2723', badgeBg: '#D32F2F', badgeText: '#FFFFFF' },
    iconType: 'biscuit',
    subtitle: 'Original Glucose Biscuits',
    extraText: 'MILK + WHEAT GLUCOSE'
  },
  {
    sku: 'KM-BIS-PARLE-110G',
    brand: 'Parle',
    name: 'Parle-G Glucose',
    packSize: '110g • ₹10 Daily Pack',
    price: '₹10',
    theme: { bg: '#FFF8E1', primary: '#E65100', secondary: '#FFB300', text: '#3E2723', badgeBg: '#D32F2F', badgeText: '#FFFFFF' },
    iconType: 'biscuit',
    subtitle: 'Original Glucose Biscuits',
    extraText: 'VALUE PACK'
  },
  {
    sku: 'KM-BIS-PARLE-800G',
    brand: 'Parle',
    name: 'Parle-G Mega Pack',
    packSize: '800g Family Pack',
    price: '₹78',
    theme: { bg: '#FFF8E1', primary: '#E65100', secondary: '#FFB300', text: '#3E2723', badgeBg: '#D32F2F', badgeText: '#FFFFFF' },
    iconType: 'biscuit',
    subtitle: 'Glucose Biscuits Mega Saver',
    extraText: '800g MEGA SAVER'
  },
  {
    sku: 'KM-BIS-MARIE-75G',
    brand: 'Britannia',
    name: 'Marie Gold',
    packSize: '75g • ₹10 Pack',
    price: '₹10',
    theme: { bg: '#FFF9C4', primary: '#C62828', secondary: '#F57F17', text: '#212121', badgeBg: '#C62828', badgeText: '#FFFFFF' },
    iconType: 'biscuit',
    subtitle: 'Crispy Tea-Time Biscuits',
    extraText: '0% TRANS FAT'
  },
  {
    sku: 'KM-BIS-MARIE-250G',
    brand: 'Britannia',
    name: 'Marie Gold Regular',
    packSize: '250g Regular Pack',
    price: '₹35',
    theme: { bg: '#FFF9C4', primary: '#C62828', secondary: '#F57F17', text: '#212121', badgeBg: '#C62828', badgeText: '#FFFFFF' },
    iconType: 'biscuit',
    subtitle: 'Crispy Tea-Time Biscuits',
    extraText: 'FAMILY TEA PACK'
  },
  {
    sku: 'KM-BIS-GOODDAY-35G',
    brand: 'Britannia',
    name: 'Good Day Butter',
    packSize: '35g • ₹5 Snack Pack',
    price: '₹5',
    theme: { bg: '#FFF3E0', primary: '#00796B', secondary: '#FFA000', text: '#263238', badgeBg: '#00796B', badgeText: '#FFFFFF' },
    iconType: 'biscuit',
    subtitle: 'Rich Butter Smile Cookies',
    extraText: 'WITH REAL BUTTER'
  },
  {
    sku: 'KM-BIS-GOODDAY-66G',
    brand: 'Britannia',
    name: 'Good Day Cashew',
    packSize: '66g • ₹10 Pack',
    price: '₹10',
    theme: { bg: '#FFF3E0', primary: '#00796B', secondary: '#FFA000', text: '#263238', badgeBg: '#00796B', badgeText: '#FFFFFF' },
    iconType: 'biscuit',
    subtitle: 'Crunchy Kaju Cashew Cookies',
    extraText: 'RICH KAJU CHIPS'
  },
  {
    sku: 'KM-BIS-BOURBON-50G',
    brand: 'Britannia',
    name: 'Bourbon Chocolate',
    packSize: '50g • ₹10 Pack',
    price: '₹10',
    theme: { bg: '#EFEBE9', primary: '#4E342E', secondary: '#8D6E63', text: '#3E2723', badgeBg: '#4E342E', badgeText: '#FFFFFF' },
    iconType: 'biscuit',
    subtitle: 'Rich Chocolate Cream',
    extraText: 'SUGAR SPRINKLED'
  },
  {
    sku: 'KM-BIS-HIDE-SEEK-33G',
    brand: 'Parle',
    name: 'Hide & Seek Choco',
    packSize: '33g • ₹10 Pack',
    price: '₹10',
    theme: { bg: '#ECEFF1', primary: '#37474F', secondary: '#78909C', text: '#263238', badgeBg: '#D81B60', badgeText: '#FFFFFF' },
    iconType: 'biscuit',
    subtitle: 'Real Choco Chip Cookies',
    extraText: 'REAL CHOCOLATE'
  },
  {
    sku: 'KM-BIS-MONACO-50G',
    brand: 'Parle',
    name: 'Monaco Classic',
    packSize: '50g • ₹10 Pack',
    price: '₹10',
    theme: { bg: '#FFFDE7', primary: '#F57F17', secondary: '#FBC02D', text: '#37474F', badgeBg: '#F57F17', badgeText: '#FFFFFF' },
    iconType: 'biscuit',
    subtitle: 'Salted Snack Biscuits',
    extraText: 'LIGHT & SALTY'
  },
  {
    sku: 'KM-BIS-KRACKJACK-60G',
    brand: 'Parle',
    name: 'Krackjack Original',
    packSize: '60g • ₹10 Pack',
    price: '₹10',
    theme: { bg: '#FFF8E1', primary: '#E65100', secondary: '#FFA726', text: '#3E2723', badgeBg: '#E65100', badgeText: '#FFFFFF' },
    iconType: 'biscuit',
    subtitle: 'Sweet & Salty Crackers',
    extraText: 'INDIA\'S FIRST'
  },

  // 2. Milk & Dairy
  {
    sku: 'KM-DAIRY-AMUL-TONED-500ML',
    brand: 'Amul',
    name: 'Amul Taaza Milk',
    packSize: '500ml Fresh Pouch',
    price: '₹28',
    theme: { bg: '#E1F5FE', primary: '#0288D1', secondary: '#4FC3F7', text: '#01579B', badgeBg: '#0288D1', badgeText: '#FFFFFF' },
    iconType: 'milk',
    subtitle: 'Pasteurised Toned Milk',
    extraText: '3.0% FAT • 8.5% SNF'
  },
  {
    sku: 'KM-DAIRY-AMUL-GOLD-500ML',
    brand: 'Amul',
    name: 'Amul Gold Milk',
    packSize: '500ml Fresh Pouch',
    price: '₹34',
    theme: { bg: '#FFF8E1', primary: '#C2185B', secondary: '#FFD54F', text: '#880E4F', badgeBg: '#C2185B', badgeText: '#FFFFFF' },
    iconType: 'milk',
    subtitle: 'Full Cream Fresh Milk',
    extraText: '6.0% FAT • 9.0% SNF'
  },
  {
    sku: 'KM-DAIRY-MD-TONED-500ML',
    brand: 'Mother Dairy',
    name: 'Toned Milk Pouch',
    packSize: '500ml Pouch',
    price: '₹28',
    theme: { bg: '#E0F2F1', primary: '#00796B', secondary: '#4DB6AC', text: '#004D40', badgeBg: '#00796B', badgeText: '#FFFFFF' },
    iconType: 'milk',
    subtitle: 'Enriched With Vit A & D',
    extraText: 'DAILY FRESH'
  },
  {
    sku: 'KM-DAIRY-AMUL-BUTTER-20G',
    brand: 'Amul',
    name: 'Amul Butter',
    packSize: '20g • ₹10 Single Tub',
    price: '₹10',
    theme: { bg: '#FFF9C4', primary: '#F57F17', secondary: '#FFF176', text: '#E65100', badgeBg: '#D32F2F', badgeText: '#FFFFFF' },
    iconType: 'butter',
    subtitle: 'Pasteurised Salted Butter',
    extraText: 'UTTERLY BUTTERLY'
  },
  {
    sku: 'KM-DAIRY-AMUL-BUTTER-100G',
    brand: 'Amul',
    name: 'Amul Butter Block',
    packSize: '100g Classic Block',
    price: '₹58',
    theme: { bg: '#FFF9C4', primary: '#F57F17', secondary: '#FFF176', text: '#E65100', badgeBg: '#D32F2F', badgeText: '#FFFFFF' },
    iconType: 'butter',
    subtitle: 'Taste of India Salted Butter',
    extraText: 'PURE MILK FAT'
  },
  {
    sku: 'KM-DAIRY-AMUL-PANEER-200G',
    brand: 'Amul',
    name: 'Amul Malai Paneer',
    packSize: '200g Vacuum Pack',
    price: '₹92',
    theme: { bg: '#F1F8E9', primary: '#33691E', secondary: '#8BC34A', text: '#1B5E20', badgeBg: '#33691E', badgeText: '#FFFFFF' },
    iconType: 'box',
    subtitle: 'Fresh & Soft Malai Paneer',
    extraText: 'PROTEIN RICH'
  },
  {
    sku: 'KM-DAIRY-AMUL-DAHI-200G',
    brand: 'Amul',
    name: 'Amul Masti Dahi',
    packSize: '200g • ₹15 Pouch',
    price: '₹15',
    theme: { bg: '#E0F7FA', primary: '#00838F', secondary: '#80DEEA', text: '#006064', badgeBg: '#00838F', badgeText: '#FFFFFF' },
    iconType: 'pouch',
    subtitle: 'Pasteurised Homestyle Curd',
    extraText: 'THICK & CREAMY'
  },

  // 3. Cold Drinks & Beverages
  {
    sku: 'KM-BEV-STING-250ML',
    brand: 'Sting',
    name: 'Sting Energy Drink',
    packSize: '250ml • ₹20 Bottle',
    price: '₹20',
    theme: { bg: '#FFEBEE', primary: '#D50000', secondary: '#FF5252', text: '#B71C1C', badgeBg: '#D50000', badgeText: '#FFFFFF' },
    iconType: 'bottle',
    subtitle: 'Electrifying Red Energy',
    extraText: 'ENERGY WITH GINSENG'
  },
  {
    sku: 'KM-BEV-COCACOLA-250ML',
    brand: 'Coca-Cola',
    name: 'Coca-Cola Classic',
    packSize: '250ml • ₹20 Bottle',
    price: '₹20',
    theme: { bg: '#FFEBEE', primary: '#D32F2F', secondary: '#EF5350', text: '#B71C1C', badgeBg: '#D32F2F', badgeText: '#FFFFFF' },
    iconType: 'bottle',
    subtitle: 'Real Refreshing Taste',
    extraText: 'SERVE CHILLED'
  },
  {
    sku: 'KM-BEV-THUMSUP-250ML',
    brand: 'Thums Up',
    name: 'Thums Up Charged',
    packSize: '250ml • ₹20 Bottle',
    price: '₹20',
    theme: { bg: '#E8EAF6', primary: '#1A237E', secondary: '#3F51B5', text: '#0D47A1', badgeBg: '#C2185B', badgeText: '#FFFFFF' },
    iconType: 'bottle',
    subtitle: 'Strong Fizzy Cola',
    extraText: 'TASTE THE THUNDER'
  },
  {
    sku: 'KM-BEV-SPRITE-250ML',
    brand: 'Sprite',
    name: 'Sprite Lemon-Lime',
    packSize: '250ml • ₹20 Bottle',
    price: '₹20',
    theme: { bg: '#E8F5E9', primary: '#2E7D32', secondary: '#66BB6A', text: '#1B5E20', badgeBg: '#FDD835', badgeText: '#1B5E20' },
    iconType: 'bottle',
    subtitle: 'Clear Lime Refreshment',
    extraText: '100% CLEAR TASTE'
  },
  {
    sku: 'KM-BEV-FROOTI-125ML',
    brand: 'Parle',
    name: 'Frooti Mango Drink',
    packSize: '125ml • ₹10 Tetra',
    price: '₹10',
    theme: { bg: '#FFF8E1', primary: '#F57F17', secondary: '#FFCA28', text: '#E65100', badgeBg: '#2E7D32', badgeText: '#FFFFFF' },
    iconType: 'box',
    subtitle: 'Real Alphonso Mango Pulp',
    extraText: 'MANGO FROOTI FRESH'
  },
  {
    sku: 'KM-BEV-BISLERI-500ML',
    brand: 'Bisleri',
    name: 'Bisleri Mineral Water',
    packSize: '500ml • ₹10 Bottle',
    price: '₹10',
    theme: { bg: '#E0F2F1', primary: '#00695C', secondary: '#26A69A', text: '#004D40', badgeBg: '#00695C', badgeText: '#FFFFFF' },
    iconType: 'bottle',
    subtitle: 'With Added Minerals',
    extraText: '114 QUALITY CHECKS'
  },
  {
    sku: 'KM-BEV-BISLERI-1L',
    brand: 'Bisleri',
    name: 'Bisleri Mineral Water',
    packSize: '1 Litre Bottle',
    price: '₹20',
    theme: { bg: '#E0F2F1', primary: '#00695C', secondary: '#26A69A', text: '#004D40', badgeBg: '#00695C', badgeText: '#FFFFFF' },
    iconType: 'bottle',
    subtitle: '1L Pure Drinking Water',
    extraText: '100% HYGIENIC'
  },

  // 4. Atta, Maida & Suji
  {
    sku: 'KM-RATION-AASH-ATTA-1KG',
    brand: 'ITC Aashirvaad',
    name: 'Shudh Chakki Atta',
    packSize: '1kg Pouch',
    price: '₹48',
    theme: { bg: '#FFF3E0', primary: '#E65100', secondary: '#FFB74D', text: '#BF360C', badgeBg: '#E65100', badgeText: '#FFFFFF' },
    iconType: 'bag',
    subtitle: '100% Whole Wheat MP Grains',
    extraText: 'SUPER SOFT ROTIS'
  },
  {
    sku: 'KM-RATION-AASH-ATTA-5KG',
    brand: 'ITC Aashirvaad',
    name: 'Shudh Chakki Atta',
    packSize: '5kg Family Bag',
    price: '₹235',
    theme: { bg: '#FFF3E0', primary: '#E65100', secondary: '#FFB74D', text: '#BF360C', badgeBg: '#E65100', badgeText: '#FFFFFF' },
    iconType: 'bag',
    subtitle: 'Chakki Fresh Wheat Flour',
    extraText: '5KG VALUE BAG'
  },
  {
    sku: 'KM-RATION-AASH-ATTA-10KG',
    brand: 'ITC Aashirvaad',
    name: 'Shudh Chakki Atta',
    packSize: '10kg Wholesale Bag',
    price: '₹460',
    theme: { bg: '#FFF3E0', primary: '#E65100', secondary: '#FFB74D', text: '#BF360C', badgeBg: '#E65100', badgeText: '#FFFFFF' },
    iconType: 'bag',
    subtitle: 'Wholesale Monthly Ration',
    extraText: '10KG JUMBO PACK'
  },
  {
    sku: 'KM-RATION-MAIDA-500G',
    brand: 'Tata',
    name: 'Superfine Maida',
    packSize: '500g Pouch',
    price: '₹28',
    theme: { bg: '#ECEFF1', primary: '#0D47A1', secondary: '#90CAF9', text: '#1A237E', badgeBg: '#0D47A1', badgeText: '#FFFFFF' },
    iconType: 'pouch',
    subtitle: 'Refined All-Purpose Flour',
    extraText: 'FOR SAMOSA & BHATURE'
  },
  {
    sku: 'KM-RATION-SUJI-500G',
    brand: 'Tata',
    name: 'Roasted Sooji / Rawa',
    packSize: '500g Pouch',
    price: '₹32',
    theme: { bg: '#FFF8E1', primary: '#F57F17', secondary: '#FFE082', text: '#E65100', badgeBg: '#F57F17', badgeText: '#FFFFFF' },
    iconType: 'pouch',
    subtitle: 'Granular Premium Semolina',
    extraText: 'CRISPY HALWA & UPMA'
  },
  {
    sku: 'KM-RATION-BESAN-500G',
    brand: 'Tata',
    name: 'Tata Sampann Besan',
    packSize: '500g Pouch',
    price: '₹58',
    theme: { bg: '#FFFDE7', primary: '#F57F17', secondary: '#FFF59D', text: '#BF360C', badgeBg: '#0D47A1', badgeText: '#FFFFFF' },
    iconType: 'pouch',
    subtitle: '100% Pure Chana Dal Besan',
    extraText: 'FINE GRAM FLOUR'
  },

  // 5. Dal & Pulses
  {
    sku: 'KM-DAL-TOOR-500G',
    brand: 'Tata',
    name: 'Desi Toor / Arhar Dal',
    packSize: '500g Pouch',
    price: '₹84',
    theme: { bg: '#FFF9C4', primary: '#F57F17', secondary: '#FFF59D', text: '#E65100', badgeBg: '#F57F17', badgeText: '#FFFFFF' },
    iconType: 'pouch',
    subtitle: 'Unpolished Yellow Toor Dal',
    extraText: 'PROTEIN RICH'
  },
  {
    sku: 'KM-DAL-TOOR-1KG',
    brand: 'Tata',
    name: 'Desi Toor / Arhar Dal',
    packSize: '1kg Bag',
    price: '₹165',
    theme: { bg: '#FFF9C4', primary: '#F57F17', secondary: '#FFF59D', text: '#E65100', badgeBg: '#F57F17', badgeText: '#FFFFFF' },
    iconType: 'bag',
    subtitle: '1kg Unpolished Arhar Dal',
    extraText: 'WHOLESALE GRAIN'
  },
  {
    sku: 'KM-DAL-MOONG-DHULI-500G',
    brand: 'Tata',
    name: 'Moong Dal Dhuli',
    packSize: '500g Pouch',
    price: '₹62',
    theme: { bg: '#FFFDE7', primary: '#FBC02D', secondary: '#FFF9C4', text: '#F57F17', badgeBg: '#FBC02D', badgeText: '#212121' },
    iconType: 'pouch',
    subtitle: 'Yellow Split Moong Dal',
    extraText: 'LIGHT & EASY DIGEST'
  },
  {
    sku: 'KM-DAL-CHANA-500G',
    brand: 'Tata',
    name: 'Desi Chana Dal',
    packSize: '500g Pouch',
    price: '₹49',
    theme: { bg: '#FFF8E1', primary: '#FFA000', secondary: '#FFE082', text: '#E65100', badgeBg: '#FFA000', badgeText: '#FFFFFF' },
    iconType: 'pouch',
    subtitle: 'Crispy Bengal Gram Dal',
    extraText: 'NATURALLY SOURCED'
  },
  {
    sku: 'KM-DAL-RAJMA-CHITRA-500G',
    brand: 'Tata',
    name: 'Kashmiri Chitra Rajma',
    packSize: '500g Pouch',
    price: '₹78',
    theme: { bg: '#FFEBEE', primary: '#C2185B', secondary: '#EF9A9A', text: '#880E4F', badgeBg: '#C2185B', badgeText: '#FFFFFF' },
    iconType: 'pouch',
    subtitle: 'Authentic Speckled Rajma',
    extraText: 'SOFT BOILING'
  },

  // 6. Rice
  {
    sku: 'KM-RICE-BASMATI-FEAST-1KG',
    brand: 'India Gate',
    name: 'Feast Rozzana Basmati',
    packSize: '1kg Bag',
    price: '₹95',
    theme: { bg: '#E8EAF6', primary: '#1A237E', secondary: '#7986CB', text: '#0D47A1', badgeBg: '#1A237E', badgeText: '#FFFFFF' },
    iconType: 'bag',
    subtitle: 'Aromatic Daily Basmati Rice',
    extraText: 'LONG GRAIN'
  },
  {
    sku: 'KM-RICE-BASMATI-CLASSIC-5KG',
    brand: 'India Gate',
    name: 'Classic Royal Basmati',
    packSize: '5kg Bag',
    price: '₹590',
    theme: { bg: '#E8EAF6', primary: '#1A237E', secondary: '#C5CAE9', text: '#0D47A1', badgeBg: '#D4AF37', badgeText: '#000000' },
    iconType: 'bag',
    subtitle: 'Aged Extra Long Biryani Grain',
    extraText: '5KG ROYAL EDITION'
  },
  {
    sku: 'KM-RICE-SONA-MASOORI-1KG',
    brand: 'Tata',
    name: 'Sona Masoori Raw Rice',
    packSize: '1kg Pouch',
    price: '₹58',
    theme: { bg: '#F9FBE7', primary: '#689F38', secondary: '#DCEDC8', text: '#33691E', badgeBg: '#689F38', badgeText: '#FFFFFF' },
    iconType: 'bag',
    subtitle: 'Lightweight Fragrant Rice',
    extraText: 'DAILY SOUTH RICE'
  },

  // 7. Cooking Oil & Refined Oil
  {
    sku: 'KM-OIL-FORTUNE-MUSTARD-500ML',
    brand: 'Fortune',
    name: 'Kachi Ghani Mustard Oil',
    packSize: '500ml Bottle',
    price: '₹88',
    theme: { bg: '#FFFDE7', primary: '#E65100', secondary: '#FFD54F', text: '#BF360C', badgeBg: '#E65100', badgeText: '#FFFFFF' },
    iconType: 'oil',
    subtitle: 'Cold-Pressed Sarson Ka Tel',
    extraText: 'STRONG AROMA'
  },
  {
    sku: 'KM-OIL-FORTUNE-MUSTARD-1L',
    brand: 'Fortune',
    name: 'Kachi Ghani Mustard Oil',
    packSize: '1 Litre Pouch',
    price: '₹158',
    theme: { bg: '#FFFDE7', primary: '#E65100', secondary: '#FFD54F', text: '#BF360C', badgeBg: '#E65100', badgeText: '#FFFFFF' },
    iconType: 'oil',
    subtitle: 'Pure Mustard Cooking Oil',
    extraText: '1 LITRE POUCH'
  },
  {
    sku: 'KM-OIL-FORTUNE-SUNLITE-1L',
    brand: 'Fortune Sunlite',
    name: 'Refined Sunflower Oil',
    packSize: '1 Litre Pouch',
    price: '₹142',
    theme: { bg: '#FFF8E1', primary: '#F57F17', secondary: '#FFE082', text: '#E65100', badgeBg: '#F57F17', badgeText: '#FFFFFF' },
    iconType: 'oil',
    subtitle: 'Light & Healthy Cooking',
    extraText: 'RICH IN VITAMIN E'
  },
  {
    sku: 'KM-OIL-FORTUNE-SOYA-1L',
    brand: 'Fortune',
    name: 'Soya Health Soybean Oil',
    packSize: '1 Litre Pouch',
    price: '₹128',
    theme: { bg: '#F1F8E9', primary: '#558B2F', secondary: '#C5E1A5', text: '#33691E', badgeBg: '#558B2F', badgeText: '#FFFFFF' },
    iconType: 'oil',
    subtitle: 'Refined Soybean Cooking Oil',
    extraText: 'WITH OMEGA-3'
  },

  // 8. Ghee & Butter
  {
    sku: 'KM-GHEE-AMUL-PURE-200ML',
    brand: 'Amul',
    name: 'Amul Desi Ghee',
    packSize: '200ml • ₹130 Pouch',
    price: '₹130',
    theme: { bg: '#FFF9C4', primary: '#C2185B', secondary: '#FFF59D', text: '#880E4F', badgeBg: '#C2185B', badgeText: '#FFFFFF' },
    iconType: 'pouch',
    subtitle: 'Pure Milk Danedaar Ghee',
    extraText: '200ML POUCH'
  },
  {
    sku: 'KM-GHEE-AMUL-PURE-1L',
    brand: 'Amul',
    name: 'Amul Desi Ghee 1L',
    packSize: '1 Litre Ceka Pack',
    price: '₹590',
    theme: { bg: '#FFF9C4', primary: '#C2185B', secondary: '#FFF59D', text: '#880E4F', badgeBg: '#C2185B', badgeText: '#FFFFFF' },
    iconType: 'box',
    subtitle: 'Pure Cow Milk Fat Ghee',
    extraText: '1 LITRE PACK'
  },

  // 9. Spices & ₹10 Sachets
  {
    sku: 'KM-SPC-MDH-HALDI-10RS',
    brand: 'MDH',
    name: 'MDH Haldi Turmeric',
    packSize: '25g • ₹10 Sachet',
    price: '₹10',
    theme: { bg: '#FFF9C4', primary: '#D32F2F', secondary: '#FBC02D', text: '#3E2723', badgeBg: '#D32F2F', badgeText: '#FFFFFF' },
    iconType: 'spice',
    subtitle: 'Agmark Pure Turmeric Powder',
    extraText: 'HIGH CURCUMIN'
  },
  {
    sku: 'KM-SPC-MDH-MIRCH-10RS',
    brand: 'MDH',
    name: 'MDH Deggi Mirch',
    packSize: '20g • ₹10 Sachet',
    price: '₹10',
    theme: { bg: '#FFEBEE', primary: '#D32F2F', secondary: '#FF8A80', text: '#B71C1C', badgeBg: '#D32F2F', badgeText: '#FFFFFF' },
    iconType: 'spice',
    subtitle: 'Vibrant Natural Red Chili',
    extraText: 'MILD SPICY COLOR'
  },
  {
    sku: 'KM-SPC-EV-GARAM-10RS',
    brand: 'Everest',
    name: 'Everest Garam Masala',
    packSize: '15g • ₹10 Box',
    price: '₹10',
    theme: { bg: '#FFF3E0', primary: '#C62828', secondary: '#FFA726', text: '#3E2723', badgeBg: '#C62828', badgeText: '#FFFFFF' },
    iconType: 'spice',
    subtitle: 'Blend of 13 Whole Spices',
    extraText: '15G BOX'
  },
  {
    sku: 'KM-SPC-CATCH-CHAAT-10RS',
    brand: 'Catch',
    name: 'Catch Chaat Masala',
    packSize: '15g • ₹10 Pack',
    price: '₹10',
    theme: { bg: '#E8F5E9', primary: '#2E7D32', secondary: '#A5D6A7', text: '#1B5E20', badgeBg: '#2E7D32', badgeText: '#FFFFFF' },
    iconType: 'spice',
    subtitle: 'Chatpata Table Sprinkler',
    extraText: 'TANGY & ZESTY'
  },
  {
    sku: 'KM-SPC-MDH-CHANA-100G',
    brand: 'MDH',
    name: 'MDH Chana Masala',
    packSize: '100g Box',
    price: '₹78',
    theme: { bg: '#FFF8E1', primary: '#D32F2F', secondary: '#FFCA28', text: '#3E2723', badgeBg: '#D32F2F', badgeText: '#FFFFFF' },
    iconType: 'box',
    subtitle: 'Authentic Amritsari Chhole Blend',
    extraText: '100G CARTON'
  },

  // 10. Sugar & Salt
  {
    sku: 'KM-SALT-TATA-LITE-500G',
    brand: 'Tata',
    name: 'Tata Salt Vacuum',
    packSize: '500g • ₹14 Pouch',
    price: '₹14',
    theme: { bg: '#E3F2FD', primary: '#0D47A1', secondary: '#64B5F6', text: '#0D47A1', badgeBg: '#D32F2F', badgeText: '#FFFFFF' },
    iconType: 'pouch',
    subtitle: 'Desh Ka Namak Iodized',
    extraText: '500G PACK'
  },
  {
    sku: 'KM-SALT-TATA-1KG',
    brand: 'Tata',
    name: 'Tata Salt Iodized',
    packSize: '1kg Pouch',
    price: '₹28',
    theme: { bg: '#E3F2FD', primary: '#0D47A1', secondary: '#64B5F6', text: '#0D47A1', badgeBg: '#D32F2F', badgeText: '#FFFFFF' },
    iconType: 'pouch',
    subtitle: 'Vacuum Evaporated Pure Salt',
    extraText: '1KG ORIGINAL'
  },
  {
    sku: 'KM-SUGAR-REFINED-1KG',
    brand: 'Tata',
    name: 'Crystal White Sugar',
    packSize: '1kg Bag',
    price: '₹48',
    theme: { bg: '#ECEFF1', primary: '#37474F', secondary: '#B0BEC5', text: '#263238', badgeBg: '#0288D1', badgeText: '#FFFFFF' },
    iconType: 'bag',
    subtitle: 'Sulphur-Free Sparkling Sugar',
    extraText: '100% PURE CHINI'
  },

  // 11. Tea & Coffee
  {
    sku: 'KM-TEA-TATA-PREM-100G',
    brand: 'Tata',
    name: 'Tata Tea Premium',
    packSize: '100g • ₹35 Pack',
    price: '₹35',
    theme: { bg: '#E8F5E9', primary: '#2E7D32', secondary: '#81C784', text: '#1B5E20', badgeBg: '#2E7D32', badgeText: '#FFFFFF' },
    iconType: 'pouch',
    subtitle: 'Desh Ki Chai Badi-Chhoti Patti',
    extraText: '100G PACK'
  },
  {
    sku: 'KM-TEA-TATA-PREM-250G',
    brand: 'Tata',
    name: 'Tata Tea Premium 250g',
    packSize: '250g Carton',
    price: '₹110',
    theme: { bg: '#E8F5E9', primary: '#2E7D32', secondary: '#81C784', text: '#1B5E20', badgeBg: '#2E7D32', badgeText: '#FFFFFF' },
    iconType: 'box',
    subtitle: 'Kadak Morning Black Tea',
    extraText: '250G CARTON'
  },
  {
    sku: 'KM-COFFEE-NESCAFE-SACHET',
    brand: 'Nestle',
    name: 'Nescafe Classic Sachet',
    packSize: '7.5g • ₹10 Sachet',
    price: '₹10',
    theme: { bg: '#EFEBE9', primary: '#D32F2F', secondary: '#4E342E', text: '#3E2723', badgeBg: '#D32F2F', badgeText: '#FFFFFF' },
    iconType: 'pouch',
    subtitle: '100% Pure Instant Coffee',
    extraText: 'FROTHY CHAI-TIME'
  },

  // 12. Noodles & Pasta
  {
    sku: 'KM-NOOD-MAGGI-35G',
    brand: 'Maggi',
    name: 'Maggi 2-Min Noodles',
    packSize: '35g • ₹7 Chhota Pack',
    price: '₹7',
    theme: { bg: '#FFF9C4', primary: '#D50000', secondary: '#FFD600', text: '#B71C1C', badgeBg: '#D50000', badgeText: '#FFFFFF' },
    iconType: 'pouch',
    subtitle: 'Authentic Masala Tastemaker',
    extraText: '₹7 CHHOTA PACK'
  },
  {
    sku: 'KM-NOOD-MAGGI-70G',
    brand: 'Maggi',
    name: 'Maggi 2-Min Noodles',
    packSize: '70g • ₹14 Single Pack',
    price: '₹14',
    theme: { bg: '#FFF9C4', primary: '#D50000', secondary: '#FFD600', text: '#B71C1C', badgeBg: '#D50000', badgeText: '#FFFFFF' },
    iconType: 'pouch',
    subtitle: 'Original Masala Instant Noodles',
    extraText: '₹14 SINGLE SERVE'
  },
  {
    sku: 'KM-NOOD-MAGGI-4PACK',
    brand: 'Maggi',
    name: 'Maggi 4-in-1 Value Pack',
    packSize: '280g (4 x 70g)',
    price: '₹56',
    theme: { bg: '#FFF9C4', primary: '#D50000', secondary: '#FFD600', text: '#B71C1C', badgeBg: '#D50000', badgeText: '#FFFFFF' },
    iconType: 'box',
    subtitle: 'Family Snacking 4-Pack',
    extraText: '4-IN-1 SAVER'
  },

  // 13. Namkeen & Chips
  {
    sku: 'KM-SNK-HALDIRAM-BHUJIA-35G',
    brand: 'Haldiram\'s',
    name: 'Aloo Bhujia Namkeen',
    packSize: '35g • ₹10 Pouch',
    price: '₹10',
    theme: { bg: '#FFF8E1', primary: '#C2185B', secondary: '#FFB300', text: '#880E4F', badgeBg: '#C2185B', badgeText: '#FFFFFF' },
    iconType: 'pouch',
    subtitle: 'Spicy Mint Potato Sev',
    extraText: 'CRISPY NAMKEEN'
  },
  {
    sku: 'KM-SNK-HALDIRAM-BHUJIA-200G',
    brand: 'Haldiram\'s',
    name: 'Aloo Bhujia 200g',
    packSize: '200g Family Pack',
    price: '₹55',
    theme: { bg: '#FFF8E1', primary: '#C2185B', secondary: '#FFB300', text: '#880E4F', badgeBg: '#C2185B', badgeText: '#FFFFFF' },
    iconType: 'pouch',
    subtitle: 'Classic Haldiram\'s Sev',
    extraText: '200G PACK'
  },
  {
    sku: 'KM-CHP-LAYS-MAGIC-28G',
    brand: 'Lay\'s',
    name: 'Magic Masala Chips',
    packSize: '28g • ₹10 Pack',
    price: '₹10',
    theme: { bg: '#E1F5FE', primary: '#0277BD', secondary: '#FFD600', text: '#01579B', badgeBg: '#D50000', badgeText: '#FFFFFF' },
    iconType: 'pouch',
    subtitle: 'India\'s Magic Masala Potato Chips',
    extraText: 'BLUE LAYS'
  },
  {
    sku: 'KM-CHP-KURKURE-MASALA-38G',
    brand: 'Kurkure',
    name: 'Kurkure Masala Munch',
    packSize: '38g • ₹10 Pack',
    price: '₹10',
    theme: { bg: '#FFF3E0', primary: '#E65100', secondary: '#FF9800', text: '#BF360C', badgeBg: '#E65100', badgeText: '#FFFFFF' },
    iconType: 'pouch',
    subtitle: 'Tedha Hai Par Mera Hai',
    extraText: 'SPICY CRUNCH'
  },

  // 14. Chocolates
  {
    sku: 'KM-CHOC-DAIRYMILK-13G',
    brand: 'Cadbury Dairy Milk',
    name: 'Dairy Milk Chocolate',
    packSize: '13.2g • ₹10 Bar',
    price: '₹10',
    theme: { bg: '#EDE7F6', primary: '#4A148C', secondary: '#9575CD', text: '#311B92', badgeBg: '#D4AF37', badgeText: '#000000' },
    iconType: 'box',
    subtitle: 'Smooth Milk Chocolate',
    extraText: 'POCKET ₹10 BAR'
  },
  {
    sku: 'KM-CHOC-KITKAT-12G',
    brand: 'KitKat',
    name: 'KitKat 2-Finger Bar',
    packSize: '12.8g • ₹10 Bar',
    price: '₹10',
    theme: { bg: '#FFEBEE', primary: '#D32F2F', secondary: '#FF8A80', text: '#B71C1C', badgeBg: '#D32F2F', badgeText: '#FFFFFF' },
    iconType: 'box',
    subtitle: 'Crispy Milk Choco Wafer',
    extraText: 'HAVE A BREAK'
  },

  // 15. Soaps & Hair Care
  {
    sku: 'KM-SOAP-DETTOL-ORIG-45G',
    brand: 'Dettol',
    name: 'Dettol Original Soap',
    packSize: '45g • ₹10 Bar',
    price: '₹10',
    theme: { bg: '#E8F5E9', primary: '#2E7D32', secondary: '#81C784', text: '#1B5E20', badgeBg: '#2E7D32', badgeText: '#FFFFFF' },
    iconType: 'soap',
    subtitle: '100% Germ Protection Soap',
    extraText: 'BE 100% SURE'
  },
  {
    sku: 'KM-SOAP-LIFEBUOY-TOTAL-50G',
    brand: 'Lifebuoy',
    name: 'Lifebuoy Total 10',
    packSize: '50g • ₹10 Bar',
    price: '₹10',
    theme: { bg: '#FFEBEE', primary: '#C62828', secondary: '#EF9A9A', text: '#B71C1C', badgeBg: '#C62828', badgeText: '#FFFFFF' },
    iconType: 'soap',
    subtitle: 'Active Silver Germ Defence',
    extraText: '₹10 RED SABUN'
  },
  {
    sku: 'KM-SOAP-LUX-ROSE-50G',
    brand: 'Lux',
    name: 'Lux Soft Rose Glow',
    packSize: '50g • ₹10 Bar',
    price: '₹10',
    theme: { bg: '#FCE4EC', primary: '#AD1457', secondary: '#F48FB1', text: '#880E4F', badgeBg: '#AD1457', badgeText: '#FFFFFF' },
    iconType: 'soap',
    subtitle: 'French Rose & Almond Oil',
    extraText: 'GLOWING SKIN'
  },
  {
    sku: 'KM-SHMP-CLINIC-PLUS-6ML',
    brand: 'Clinic Plus',
    name: 'Clinic Plus Strong & Long',
    packSize: '6ml Sachet (Set of 3)',
    price: '₹6',
    theme: { bg: '#E1F5FE', primary: '#0288D1', secondary: '#81D4FA', text: '#01579B', badgeBg: '#0288D1', badgeText: '#FFFFFF' },
    iconType: 'pouch',
    subtitle: 'Milk Protein Formula',
    extraText: '₹2 SACHET'
  },
  {
    sku: 'KM-SHMP-HNS-COOL-6ML',
    brand: 'Head & Shoulders',
    name: 'Cool Menthol Anti-Dandruff',
    packSize: '6ml • ₹4 Sachet',
    price: '₹4',
    theme: { bg: '#E0F7FA', primary: '#00838F', secondary: '#80DEEA', text: '#006064', badgeBg: '#00838F', badgeText: '#FFFFFF' },
    iconType: 'pouch',
    subtitle: '100% Dandruff Free Cooling',
    extraText: 'ICY MENTHOL'
  },

  // 16. Oral Care
  {
    sku: 'KM-TOOTH-COLGATE-STRONG-20G',
    brand: 'Colgate',
    name: 'Colgate Strong Teeth',
    packSize: '20g • ₹10 Tube',
    price: '₹10',
    theme: { bg: '#FFEBEE', primary: '#D32F2F', secondary: '#FF8A80', text: '#B71C1C', badgeBg: '#D32F2F', badgeText: '#FFFFFF' },
    iconType: 'tube',
    subtitle: 'Calcium Boost Cavity Guard',
    extraText: '₹10 TRAVEL TUBE'
  },
  {
    sku: 'KM-TOOTH-COLGATE-STRONG-100G',
    brand: 'Colgate',
    name: 'Colgate Strong Teeth 100g',
    packSize: '100g Regular Tube',
    price: '₹58',
    theme: { bg: '#FFEBEE', primary: '#D32F2F', secondary: '#FF8A80', text: '#B71C1C', badgeBg: '#D32F2F', badgeText: '#FFFFFF' },
    iconType: 'tube',
    subtitle: 'Daily Cavity Protection Toothpaste',
    extraText: '100G REGULAR'
  },

  // 17. Detergents & Cleaning
  {
    sku: 'KM-DET-SURF-EXCEL-80G',
    brand: 'Surf Excel',
    name: 'Surf Excel Easy Wash',
    packSize: '80g • ₹10 Sachet',
    price: '₹10',
    theme: { bg: '#E1F5FE', primary: '#01579B', secondary: '#FF6D00', text: '#0D47A1', badgeBg: '#FF6D00', badgeText: '#FFFFFF' },
    iconType: 'pouch',
    subtitle: 'Super Tough Stain Removal',
    extraText: '₹10 TRIAL PACK'
  },
  {
    sku: 'KM-DET-SURF-EXCEL-1KG',
    brand: 'Surf Excel',
    name: 'Surf Excel Easy Wash 1kg',
    packSize: '1kg Poly Bag',
    price: '₹140',
    theme: { bg: '#E1F5FE', primary: '#01579B', secondary: '#FF6D00', text: '#0D47A1', badgeBg: '#FF6D00', badgeText: '#FFFFFF' },
    iconType: 'bag',
    subtitle: 'Bucket & Machine Wash Powder',
    extraText: '1KG SAVER BAG'
  },
  {
    sku: 'KM-DET-RIN-BAR-140G',
    brand: 'Rin',
    name: 'Rin Detergent Bar',
    packSize: '140g • ₹10 Bar',
    price: '₹10',
    theme: { bg: '#E8EAF6', primary: '#283593', secondary: '#5C6BC0', text: '#1A237E', badgeBg: '#283593', badgeText: '#FFFFFF' },
    iconType: 'soap',
    subtitle: 'Dazzling Whites Sabun',
    extraText: '₹10 RIN BAR'
  },
  {
    sku: 'KM-DET-VIM-BAR-150G',
    brand: 'Vim',
    name: 'Vim Dishwash Bar',
    packSize: '150g • ₹10 Bar',
    price: '₹10',
    theme: { bg: '#F1F8E9', primary: '#33691E', secondary: '#FFD600', text: '#1B5E20', badgeBg: '#33691E', badgeText: '#FFFFFF' },
    iconType: 'soap',
    subtitle: 'Power of 100 Lemons Degrease',
    extraText: '₹10 BARTAN SABUN'
  },
  {
    sku: 'KM-CLN-HARPIC-200ML',
    brand: 'Harpic',
    name: 'Harpic Power Plus',
    packSize: '200ml Bottle',
    price: '₹42',
    theme: { bg: '#E3F2FD', primary: '#0D47A1', secondary: '#1976D2', text: '#0D47A1', badgeBg: '#D50000', badgeText: '#FFFFFF' },
    iconType: 'bottle',
    subtitle: '10x Better Toilet Cleaner',
    extraText: 'KILLS 99.9% GERMS'
  },
  {
    sku: 'KM-CLN-LIZOL-FLOR-500ML',
    brand: 'Lizol',
    name: 'Lizol Citrus Floor Cleaner',
    packSize: '500ml Bottle',
    price: '₹99',
    theme: { bg: '#FFF8E1', primary: '#F57F17', secondary: '#FFCA28', text: '#E65100', badgeBg: '#F57F17', badgeText: '#FFFFFF' },
    iconType: 'bottle',
    subtitle: 'Disinfectant Surface Cleaner',
    extraText: 'CITRUS FRAGRANCE'
  },

  // 18. Daily Essentials, Pooja, Baby Care, Ketchup
  {
    sku: 'KM-POOJA-MATCHBOX-BUNDLE',
    brand: 'Tata',
    name: 'Safety Matchboxes Bundle',
    packSize: 'Bundle of 10 Boxes',
    price: '₹15',
    theme: { bg: '#FFF3E0', primary: '#BF360C', secondary: '#FF7043', text: '#3E2723', badgeBg: '#BF360C', badgeText: '#FFFFFF' },
    iconType: 'box',
    subtitle: 'Damp-Proof Safety Matches',
    extraText: 'PACK OF 10 BOXES'
  },
  {
    sku: 'KM-POOJA-CYCLE-AGAR-50G',
    brand: 'Cycle',
    name: 'Cycle 3-in-1 Agarbatti',
    packSize: '50g • ₹15 Box',
    price: '₹15',
    theme: { bg: '#EFEBE9', primary: '#4E342E', secondary: '#8D6E63', text: '#3E2723', badgeBg: '#4E342E', badgeText: '#FFFFFF' },
    iconType: 'box',
    subtitle: 'Floral Incense Sticks for Pooja',
    extraText: 'PURE FRAGRANCE'
  },
  {
    sku: 'KM-POOJA-CAMPHOR-50G',
    brand: 'Mangaldeep',
    name: 'Bhimseni Pure Kapoor',
    packSize: '50g Box',
    price: '₹45',
    theme: { bg: '#ECEFF1', primary: '#455A64', secondary: '#90A4AE', text: '#263238', badgeBg: '#455A64', badgeText: '#FFFFFF' },
    iconType: 'box',
    subtitle: '100% Pure Camphor Tablets',
    extraText: 'RESIDUE-FREE BURNING'
  },
  {
    sku: 'KM-OTHER-GOODKNIGHT-REFILL',
    brand: 'Good Knight',
    name: 'Gold Flash Mosquito Refill',
    packSize: '45ml Liquid Refill',
    price: '₹85',
    theme: { bg: '#FFEBEE', primary: '#C62828', secondary: '#EF5350', text: '#B71C1C', badgeBg: '#D4AF37', badgeText: '#000000' },
    iconType: 'bottle',
    subtitle: 'Dual Mode Mosquito Vaporizer',
    extraText: 'GOLD FLASH POWER'
  },
  {
    sku: 'KM-BABY-PAMPERS-S-1PC',
    brand: 'Pampers',
    name: 'Pampers Baby Diaper Pants',
    packSize: 'Size M • 1 Diaper Pant',
    price: '₹12',
    theme: { bg: '#E0F2F1', primary: '#00796B', secondary: '#4DB6AC', text: '#004D40', badgeBg: '#FF6F00', badgeText: '#FFFFFF' },
    iconType: 'pouch',
    subtitle: 'All-Round Magic Gel Protection',
    extraText: 'SIZE M • TRIAL PACK'
  },
  {
    sku: 'KM-DRY-ALMOND-100G',
    brand: 'Tata',
    name: 'California Almonds Badam',
    packSize: '100g Pouch',
    price: '₹95',
    theme: { bg: '#EFEBE9', primary: '#5D4037', secondary: '#A1887F', text: '#3E2723', badgeBg: '#5D4037', badgeText: '#FFFFFF' },
    iconType: 'pouch',
    subtitle: 'Rich in Vitamin E & Protein',
    extraText: '100G CRUNCHY BADAM'
  },
  {
    sku: 'KM-DRY-CASHEW-100G',
    brand: 'Tata',
    name: 'Goa Whole Cashews Kaju',
    packSize: '100g W320 Pouch',
    price: '₹110',
    theme: { bg: '#FFF8E1', primary: '#E65100', secondary: '#FFE082', text: '#BF360C', badgeBg: '#E65100', badgeText: '#FFFFFF' },
    iconType: 'pouch',
    subtitle: 'W320 Premium Whole Kaju',
    extraText: 'WHOLE WHITE NUTS'
  },
  {
    sku: 'KM-INST-POHA-500G',
    brand: 'Tata',
    name: 'Thick Poha Flattened Rice',
    packSize: '500g Pouch',
    price: '₹34',
    theme: { bg: '#F1F8E9', primary: '#558B2F', secondary: '#AED581', text: '#33691E', badgeBg: '#558B2F', badgeText: '#FFFFFF' },
    iconType: 'pouch',
    subtitle: 'Clean White Breakfast Poha',
    extraText: '500G POUCH'
  },
  {
    sku: 'KM-INST-KISSAN-KETCHUP-100G',
    brand: 'Kissan',
    name: 'Fresh Tomato Ketchup',
    packSize: '100g • ₹15 Squeezy',
    price: '₹15',
    theme: { bg: '#FFEBEE', primary: '#D32F2F', secondary: '#EF5350', text: '#B71C1C', badgeBg: '#2E7D32', badgeText: '#FFFFFF' },
    iconType: 'pouch',
    subtitle: '100% Real Ripe Tomatoes',
    extraText: '₹15 SQUEEZY SPOUT'
  }
];

function generateSvg(p: ProductAssetDef): string {
  const { sku, brand, name, packSize, price, theme, subtitle, extraText } = p;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="60%" stop-color="${theme.bg}"/>
      <stop offset="100%" stop-color="${theme.secondary}" stop-opacity="0.25"/>
    </linearGradient>

    <!-- Header Banner Gradient -->
    <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${theme.primary}"/>
      <stop offset="100%" stop-color="${theme.secondary}"/>
    </linearGradient>

    <!-- Card Shadow -->
    <filter id="packShadow" x="-10%" y="-10%" width="125%" height="125%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#073B6F" flood-opacity="0.15"/>
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="500" height="500" rx="32" fill="url(#bgGrad)"/>
  
  <!-- Subtle Border Frame -->
  <rect x="8" y="8" width="484" height="484" rx="26" fill="none" stroke="${theme.primary}" stroke-opacity="0.15" stroke-width="2"/>

  <!-- Product Packaging Box Canvas -->
  <g filter="url(#packShadow)">
    <rect x="45" y="45" width="410" height="410" rx="24" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>

    <!-- Brand Header Ribbon -->
    <path d="M 45 69 Q 45 45 69 45 L 431 45 Q 455 45 455 69 L 455 130 L 45 130 Z" fill="url(#primaryGrad)"/>

    <!-- Brand Name Text -->
    <text x="250" y="92" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="900" text-anchor="middle" fill="#FFFFFF" letter-spacing="1">
      ${brand.toUpperCase()}
    </text>
    <text x="250" y="116" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" text-anchor="middle" fill="#FFFFFF" opacity="0.9" letter-spacing="0.5">
      KIRANAMART AUTHENTIC FMCG PACK
    </text>

    <!-- Price Tag Badge (Top Right) -->
    <g transform="translate(365, 25)">
      <rect width="80" height="42" rx="12" fill="${theme.badgeBg}" stroke="#FFFFFF" stroke-width="2"/>
      <text x="40" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="900" text-anchor="middle" fill="${theme.badgeText}">
        ${price}
      </text>
    </g>

    <!-- Central Product Graphic Illustration -->
    <g transform="translate(250, 235)">
      <!-- Outer Accent Ring -->
      <circle r="75" fill="${theme.bg}" stroke="${theme.secondary}" stroke-width="2.5" stroke-dasharray="6 3"/>
      <circle r="65" fill="#FFFFFF"/>
      
      <!-- Realistic Category Product Art -->
      <path d="M -30 -35 Q 0 -50 30 -35 Q 45 0 30 35 Q 0 50 -30 35 Q -45 0 -30 -35 Z" fill="${theme.primary}" opacity="0.12"/>
      <circle r="40" fill="${theme.primary}" opacity="0.9"/>
      
      <!-- Stylized FMCG Pack Emblem -->
      <text x="0" y="8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="900" text-anchor="middle" fill="#FFFFFF">
        ${brand.slice(0, 1).toUpperCase()}
      </text>
    </g>

    <!-- Product Title & Name -->
    <text x="250" y="340" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="900" text-anchor="middle" fill="${theme.text}">
      ${name}
    </text>

    <!-- Subtitle / Variant Description -->
    <text x="250" y="365" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" text-anchor="middle" fill="#64748B">
      ${subtitle || 'Original Indian Kirana Product'}
    </text>

    <!-- Bottom Highlights Footer Bar -->
    <g transform="translate(65, 388)">
      <rect width="370" height="48" rx="14" fill="${theme.bg}" stroke="${theme.secondary}" stroke-opacity="0.3"/>
      
      <!-- Pack Size Badge -->
      <text x="20" y="30" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800" fill="${theme.primary}">
        📦 ${packSize}
      </text>

      <!-- Verified Authenticity Pill -->
      <text x="350" y="30" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800" text-anchor="end" fill="#059669">
        ✔ 100% GENUINE
      </text>
    </g>

    <!-- Extra Text Banner if present -->
    ${extraText ? `
    <g transform="translate(250, 155)">
      <rect x="-90" y="-12" width="180" height="24" rx="12" fill="${theme.badgeBg}" opacity="0.95"/>
      <text x="0" y="4" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="900" text-anchor="middle" fill="${theme.badgeText}" letter-spacing="0.5">
        ${extraText}
      </text>
    </g>
    ` : ''}
  </g>
</svg>`;
}

async function main() {
  const targetDir = path.join(process.cwd(), 'public', 'products');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Create neutral fallback placeholder
  const placeholderSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <rect width="500" height="500" rx="32" fill="#F8FAFC"/>
  <rect x="12" y="12" width="476" height="476" rx="24" fill="none" stroke="#E2E8F0" stroke-width="2" stroke-dasharray="8 6"/>
  <g transform="translate(250, 220)">
    <circle r="60" fill="#E2E8F0"/>
    <path d="M -25 -10 L 25 -10 L 20 25 L -20 25 Z" fill="#94A3B8"/>
    <circle cx="0" cy="-20" r="10" fill="#94A3B8"/>
  </g>
  <text x="250" y="320" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800" text-anchor="middle" fill="#475569">
    Product Image In Verification
  </text>
  <text x="250" y="345" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" text-anchor="middle" fill="#94A3B8">
    Authentic KiranaMart247 Product
  </text>
</svg>`;
  fs.writeFileSync(path.join(targetDir, 'placeholder.svg'), placeholderSvg);

  console.log(`Generating ${products.length} high-fidelity authentic packaging SVG assets...`);
  let count = 0;
  for (const p of products) {
    const filename = `${p.sku.toLowerCase()}.svg`;
    const filepath = path.join(targetDir, filename);
    const svg = generateSvg(p);
    fs.writeFileSync(filepath, svg);
    count++;
  }

  console.log(`✅ Successfully generated ${count} product packaging assets in ${targetDir}`);
}

main().catch(console.error);
