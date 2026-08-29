import fs from 'fs';
import path from 'path';

interface ProductTarget {
  sku: string;
  query: string;
}

const targets: ProductTarget[] = [
  // Biscuits
  { sku: 'KM-BIS-PARLE-50G', query: 'Parle G Glucose biscuits' },
  { sku: 'KM-BIS-PARLE-110G', query: 'Parle G biscuit' },
  { sku: 'KM-BIS-PARLE-800G', query: 'Parle G 800g' },
  { sku: 'KM-BIS-MARIE-75G', query: 'Britannia Marie Gold' },
  { sku: 'KM-BIS-MARIE-250G', query: 'Marie Gold biscuits' },
  { sku: 'KM-BIS-GOODDAY-35G', query: 'Britannia Good Day Butter' },
  { sku: 'KM-BIS-GOODDAY-66G', query: 'Britannia Good Day Cashew' },
  { sku: 'KM-BIS-BOURBON-50G', query: 'Britannia Bourbon' },
  { sku: 'KM-BIS-HIDE-SEEK-33G', query: 'Parle Hide Seek' },
  { sku: 'KM-BIS-MONACO-50G', query: 'Parle Monaco' },
  { sku: 'KM-BIS-KRACKJACK-60G', query: 'Parle Krackjack' },

  // Dairy & Bev
  { sku: 'KM-DAIRY-AMUL-TONED-500ML', query: 'Amul Taaza Toned Milk' },
  { sku: 'KM-DAIRY-AMUL-GOLD-500ML', query: 'Amul Gold Milk' },
  { sku: 'KM-DAIRY-MD-TONED-500ML', query: 'Mother Dairy Milk' },
  { sku: 'KM-DAIRY-AMUL-BUTTER-20G', query: 'Amul Pasteurized Butter' },
  { sku: 'KM-DAIRY-AMUL-BUTTER-100G', query: 'Amul Butter 100g' },
  { sku: 'KM-DAIRY-AMUL-PANEER-200G', query: 'Amul Paneer' },
  { sku: 'KM-DAIRY-AMUL-DAHI-200G', query: 'Amul Masti Dahi' },
  { sku: 'KM-BEV-STING-250ML', query: 'Sting Energy' },
  { sku: 'KM-BEV-COCACOLA-250ML', query: 'Coca-Cola' },
  { sku: 'KM-BEV-THUMSUP-250ML', query: 'Thums Up' },
  { sku: 'KM-BEV-SPRITE-250ML', query: 'Sprite bottle' },
  { sku: 'KM-BEV-FROOTI-125ML', query: 'Frooti Mango' },
  { sku: 'KM-BEV-BISLERI-500ML', query: 'Bisleri Mineral Water' },
  { sku: 'KM-BEV-BISLERI-1L', query: 'Bisleri Water 1L' },

  // Ration & Atta
  { sku: 'KM-RATION-AASH-ATTA-1KG', query: 'Aashirvaad Whole Wheat Atta' },
  { sku: 'KM-RATION-AASH-ATTA-5KG', query: 'Aashirvaad Superior MP Atta' },
  { sku: 'KM-RATION-AASH-ATTA-10KG', query: 'Aashirvaad Atta 10kg' },
  { sku: 'KM-RATION-MAIDA-500G', query: 'Tata Maida' },
  { sku: 'KM-RATION-SUJI-500G', query: 'Tata Sooji' },
  { sku: 'KM-RATION-BESAN-500G', query: 'Tata Sampann Besan' },

  // Dals
  { sku: 'KM-DAL-TOOR-500G', query: 'Tata Sampann Toor Dal' },
  { sku: 'KM-DAL-TOOR-1KG', query: 'Toor Dal Unpolished' },
  { sku: 'KM-DAL-MOONG-DHULI-500G', query: 'Moong Dal Yellow' },
  { sku: 'KM-DAL-CHANA-500G', query: 'Tata Sampann Chana Dal' },
  { sku: 'KM-DAL-RAJMA-CHITRA-500G', query: 'Kashmiri Rajma' },

  // Rice & Oil
  { sku: 'KM-RICE-BASMATI-FEAST-1KG', query: 'India Gate Feast Basmati' },
  { sku: 'KM-RICE-BASMATI-CLASSIC-5KG', query: 'India Gate Classic Basmati' },
  { sku: 'KM-RICE-SONA-MASOORI-1KG', query: 'Sona Masoori Raw Rice' },
  { sku: 'KM-OIL-FORTUNE-MUSTARD-500ML', query: 'Fortune Premium Kachi Ghani' },
  { sku: 'KM-OIL-FORTUNE-MUSTARD-1L', query: 'Fortune Mustard Oil' },
  { sku: 'KM-OIL-FORTUNE-SUNLITE-1L', query: 'Fortune Sunlite Sunflower' },
  { sku: 'KM-OIL-FORTUNE-SOYA-1L', query: 'Fortune Soya Health' },
  { sku: 'KM-GHEE-AMUL-PURE-200ML', query: 'Amul Pure Ghee' },
  { sku: 'KM-GHEE-AMUL-PURE-1L', query: 'Amul Ghee 1L' },

  // Spices & Salts
  { sku: 'KM-SPC-MDH-HALDI-10RS', query: 'MDH Haldi Turmeric' },
  { sku: 'KM-SPC-MDH-MIRCH-10RS', query: 'MDH Deggi Mirch' },
  { sku: 'KM-SPC-EV-GARAM-10RS', query: 'Everest Garam Masala' },
  { sku: 'KM-SPC-CATCH-CHAAT-10RS', query: 'Catch Chaat Masala' },
  { sku: 'KM-SPC-MDH-CHANA-100G', query: 'MDH Chana Masala' },
  { sku: 'KM-SALT-TATA-LITE-500G', query: 'Tata Salt Vacuum' },
  { sku: 'KM-SALT-TATA-1KG', query: 'Tata Salt' },
  { sku: 'KM-SUGAR-REFINED-1KG', query: 'White Sugar 1kg' },

  // Tea, Coffee, Noodles, Snacks
  { sku: 'KM-TEA-TATA-PREM-100G', query: 'Tata Tea Premium' },
  { sku: 'KM-TEA-TATA-PREM-250G', query: 'Tata Tea Premium 250g' },
  { sku: 'KM-COFFEE-NESCAFE-SACHET', query: 'Nescafe Classic Instant Coffee' },
  { sku: 'KM-NOOD-MAGGI-35G', query: 'Maggi noodles masala' },
  { sku: 'KM-NOOD-MAGGI-70G', query: 'Maggi 2-Minute Noodles' },
  { sku: 'KM-NOOD-MAGGI-4PACK', query: 'Maggi 4 pack' },
  { sku: 'KM-SNK-HALDIRAM-BHUJIA-35G', query: 'Haldiram Aloo Bhujia' },
  { sku: 'KM-SNK-HALDIRAM-BHUJIA-200G', query: 'Haldirams Aloo Bhujia' },
  { sku: 'KM-CHP-LAYS-MAGIC-28G', query: 'Lays India Magic Masala' },
  { sku: 'KM-CHP-KURKURE-MASALA-38G', query: 'Kurkure Masala Munch' },
  { sku: 'KM-CHOC-DAIRYMILK-13G', query: 'Cadbury Dairy Milk' },
  { sku: 'KM-CHOC-KITKAT-12G', query: 'Nestle KitKat' },

  // Personal Care, Cleaning, Essentials
  { sku: 'KM-SOAP-DETTOL-ORIG-45G', query: 'Dettol Original bath soap' },
  { sku: 'KM-SOAP-LIFEBUOY-TOTAL-50G', query: 'Lifebuoy Total 10 soap' },
  { sku: 'KM-SOAP-LUX-ROSE-50G', query: 'Lux Soft Rose soap' },
  { sku: 'KM-SHMP-CLINIC-PLUS-6ML', query: 'Clinic Plus Strong and Long Shampoo' },
  { sku: 'KM-SHMP-HNS-COOL-6ML', query: 'Head and Shoulders Cool Menthol' },
  { sku: 'KM-TOOTH-COLGATE-STRONG-20G', query: 'Colgate Strong Teeth' },
  { sku: 'KM-TOOTH-COLGATE-STRONG-100G', query: 'Colgate Strong Teeth Toothpaste' },
  { sku: 'KM-DET-SURF-EXCEL-80G', query: 'Surf Excel Easy Wash' },
  { sku: 'KM-DET-SURF-EXCEL-1KG', query: 'Surf Excel Quick Wash' },
  { sku: 'KM-DET-RIN-BAR-140G', query: 'Rin Detergent Bar' },
  { sku: 'KM-DET-VIM-BAR-150G', query: 'Vim Dishwash Bar' },
  { sku: 'KM-CLN-HARPIC-200ML', query: 'Harpic Power Plus' },
  { sku: 'KM-CLN-LIZOL-FLOR-500ML', query: 'Lizol Disinfectant Floor Cleaner' },
  { sku: 'KM-POOJA-MATCHBOX-BUNDLE', query: 'Safety Matchboxes' },
  { sku: 'KM-POOJA-CYCLE-AGAR-50G', query: 'Cycle 3 in 1 Agarbatti' },
  { sku: 'KM-POOJA-CAMPHOR-50G', query: 'Camphor Pooja' },
  { sku: 'KM-OTHER-GOODKNIGHT-REFILL', query: 'Good Knight Gold Flash Refill' },
  { sku: 'KM-BABY-PAMPERS-S-1PC', query: 'Pampers Diaper Pants' },
  { sku: 'KM-DRY-ALMOND-100G', query: 'Almonds Badam 100g' },
  { sku: 'KM-DRY-CASHEW-100G', query: 'Cashews Kaju 100g' },
  { sku: 'KM-INST-POHA-500G', query: 'Thick Poha Flattened Rice' },
  { sku: 'KM-INST-KISSAN-KETCHUP-100G', query: 'Kissan Fresh Tomato Ketchup' },
];

async function searchAndDownload(target: ProductTarget): Promise<boolean> {
  const dir = path.join(process.cwd(), 'public', 'products');
  const filename = `${target.sku.toLowerCase()}.jpg`;
  const dest = path.join(dir, filename);

  // If we already have a custom photo > 10KB (like our custom Good Knight / Cycle / Kissan photos), keep it!
  if (fs.existsSync(dest)) {
    const stat = fs.statSync(dest);
    if (stat.size > 50000) {
      console.log(`✨ Keeping high-res photo for ${target.sku}`);
      return true;
    }
  }

  const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
    target.query
  )}&search_simple=1&action=process&json=1&page_size=5`;

  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'KiranaMart-App/2.0 (contact@kiranamart247.com)' } });
    const data = await res.json();
    if (data.products && data.products.length > 0) {
      for (const p of data.products) {
        const imgUrl = p.image_front_url || p.image_url;
        if (imgUrl && imgUrl.startsWith('http')) {
          const imgRes = await fetch(imgUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
          if (imgRes.ok) {
            const buf = await imgRes.arrayBuffer();
            if (buf.byteLength > 2000) {
              fs.writeFileSync(dest, Buffer.from(buf));
              console.log(`✅ [REAL PHOTO] ${target.sku} <- ${p.product_name} (${buf.byteLength} B)`);
              return true;
            }
          }
        }
      }
    }
  } catch (e: any) {
    // ignore
  }

  console.log(`⚠️ No direct photo found for ${target.sku} (${target.query})`);
  return false;
}

async function main() {
  console.log(`🚀 Searching and downloading real product package photos for ${targets.length} FMCG products...`);
  let found = 0;
  for (const t of targets) {
    const ok = await searchAndDownload(t);
    if (ok) found++;
    // Small polite delay between requests
    await new Promise((r) => setTimeout(r, 400));
  }
  console.log(`🎉 Completed: ${found}/${targets.length} real product photos verified and ready!`);
}

main().catch(console.error);
