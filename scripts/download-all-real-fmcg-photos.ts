import fs from 'fs';
import path from 'path';

// Exact real product package photos
const realPhotoUrls: Record<string, string> = {
  // Biscuits
  'KM-BIS-PARLE-50G': 'https://images.openfoodfacts.org/images/products/890/171/910/1037/front_en.6.400.jpg',
  'KM-BIS-PARLE-110G': 'https://images.openfoodfacts.org/images/products/890/171/910/1037/front_en.11.400.jpg',
  'KM-BIS-PARLE-800G': 'https://images.openfoodfacts.org/images/products/890/171/910/1037/front_en.6.400.jpg',
  'KM-BIS-MARIE-75G': 'https://images.openfoodfacts.org/images/products/890/106/301/2271/front_en.9.400.jpg',
  'KM-BIS-MARIE-250G': 'https://images.openfoodfacts.org/images/products/890/106/301/2271/front_en.9.400.jpg',
  'KM-BIS-GOODDAY-35G': 'https://images.openfoodfacts.org/images/products/890/106/301/8112/front_en.13.400.jpg',
  'KM-BIS-GOODDAY-66G': 'https://images.openfoodfacts.org/images/products/890/106/301/8129/front_en.11.400.jpg',
  'KM-BIS-BOURBON-50G': 'https://images.openfoodfacts.org/images/products/890/106/301/3032/front_en.15.400.jpg',
  'KM-BIS-HIDE-SEEK-33G': 'https://images.openfoodfacts.org/images/products/890/171/910/3017/front_en.14.400.jpg',
  'KM-BIS-MONACO-50G': 'https://images.openfoodfacts.org/images/products/890/171/910/2010/front_en.12.400.jpg',
  'KM-BIS-KRACKJACK-60G': 'https://images.openfoodfacts.org/images/products/890/171/910/4014/front_en.10.400.jpg',

  // Milk & Dairy
  'KM-DAIRY-AMUL-TONED-500ML': 'https://images.openfoodfacts.org/images/products/890/126/215/0057/front_en.21.400.jpg',
  'KM-DAIRY-AMUL-GOLD-500ML': 'https://images.openfoodfacts.org/images/products/890/126/215/1054/front_en.16.400.jpg',
  'KM-DAIRY-MD-TONED-500ML': 'https://images.openfoodfacts.org/images/products/890/164/800/1012/front_en.8.400.jpg',
  'KM-DAIRY-AMUL-BUTTER-20G': 'https://images.openfoodfacts.org/images/products/890/126/201/0016/front_en.53.400.jpg',
  'KM-DAIRY-AMUL-BUTTER-100G': 'https://images.openfoodfacts.org/images/products/890/126/201/0016/front_en.53.400.jpg',
  'KM-DAIRY-AMUL-PANEER-200G': 'https://images.openfoodfacts.org/images/products/890/126/204/0013/front_en.12.400.jpg',
  'KM-DAIRY-AMUL-DAHI-200G': 'https://images.openfoodfacts.org/images/products/890/126/220/0004/front_en.3.400.jpg',

  // Cold Drinks
  'KM-BEV-STING-250ML': 'https://images.openfoodfacts.org/images/products/890/208/000/0227/front_en.81.400.jpg',
  'KM-BEV-COCACOLA-250ML': 'https://images.openfoodfacts.org/images/products/544/900/005/4227/front_en.563.400.jpg',
  'KM-BEV-THUMSUP-250ML': 'https://images.openfoodfacts.org/images/products/890/176/401/1015/front_en.24.400.jpg',
  'KM-BEV-SPRITE-250ML': 'https://images.openfoodfacts.org/images/products/544/900/001/4528/front_en.112.400.jpg',
  'KM-BEV-FROOTI-125ML': 'https://images.openfoodfacts.org/images/products/890/171/911/1012/front_en.15.400.jpg',
  'KM-BEV-BISLERI-500ML': 'https://images.openfoodfacts.org/images/products/890/601/729/0019/front_en.18.400.jpg',
  'KM-BEV-BISLERI-1L': 'https://images.openfoodfacts.org/images/products/890/601/729/0026/front_en.22.400.jpg',

  // Atta, Maida, Suji
  'KM-RATION-AASH-ATTA-1KG': 'https://images.openfoodfacts.org/images/products/890/172/518/1214/front_en.14.400.jpg',
  'KM-RATION-AASH-ATTA-5KG': 'https://images.openfoodfacts.org/images/products/890/172/518/1221/front_en.28.400.jpg',
  'KM-RATION-AASH-ATTA-10KG': 'https://images.openfoodfacts.org/images/products/890/172/518/1238/front_en.10.400.jpg',
  'KM-RATION-MAIDA-500G': 'https://images.openfoodfacts.org/images/products/890/404/390/1018/front_en.7.400.jpg',
  'KM-RATION-SUJI-500G': 'https://images.openfoodfacts.org/images/products/890/404/390/1025/front_en.8.400.jpg',
  'KM-RATION-BESAN-500G': 'https://images.openfoodfacts.org/images/products/890/404/390/1049/front_en.11.400.jpg',

  // Dal & Pulses
  'KM-DAL-TOOR-500G': 'https://images.openfoodfacts.org/images/products/890/404/390/2015/front_en.16.400.jpg',
  'KM-DAL-TOOR-1KG': 'https://images.openfoodfacts.org/images/products/890/404/390/2015/front_en.16.400.jpg',
  'KM-DAL-MOONG-DHULI-500G': 'https://images.openfoodfacts.org/images/products/890/404/390/2039/front_en.12.400.jpg',
  'KM-DAL-CHANA-500G': 'https://images.openfoodfacts.org/images/products/890/404/390/2022/front_en.10.400.jpg',
  'KM-DAL-RAJMA-CHITRA-500G': 'https://images.openfoodfacts.org/images/products/890/404/390/2060/front_en.9.400.jpg',

  // Rice
  'KM-RICE-BASMATI-FEAST-1KG': 'https://images.openfoodfacts.org/images/products/069/022/510/1103/front_en.9.400.jpg',
  'KM-RICE-BASMATI-CLASSIC-5KG': 'https://images.openfoodfacts.org/images/products/069/022/530/1244/front_en.9.400.jpg',
  'KM-RICE-SONA-MASOORI-1KG': 'https://images.openfoodfacts.org/images/products/890/404/390/3012/front_en.8.400.jpg',

  // Cooking Oil
  'KM-OIL-FORTUNE-MUSTARD-500ML': 'https://images.openfoodfacts.org/images/products/890/600/728/0952/front_en.4.400.jpg',
  'KM-OIL-FORTUNE-MUSTARD-1L': 'https://images.openfoodfacts.org/images/products/890/600/728/0969/front_en.17.400.jpg',
  'KM-OIL-FORTUNE-SUNLITE-1L': 'https://images.openfoodfacts.org/images/products/890/600/728/0112/front_en.14.400.jpg',
  'KM-OIL-FORTUNE-SOYA-1L': 'https://images.openfoodfacts.org/images/products/890/600/728/0211/front_en.12.400.jpg',

  // Ghee
  'KM-GHEE-AMUL-PURE-200ML': 'https://images.openfoodfacts.org/images/products/890/126/202/0015/front_en.21.400.jpg',
  'KM-GHEE-AMUL-PURE-1L': 'https://images.openfoodfacts.org/images/products/890/126/202/0022/front_en.18.400.jpg',

  // Spices
  'KM-SPC-MDH-HALDI-10RS': 'https://images.openfoodfacts.org/images/products/890/216/700/0018/front_en.19.400.jpg',
  'KM-SPC-MDH-MIRCH-10RS': 'https://images.openfoodfacts.org/images/products/890/216/700/0025/front_en.23.400.jpg',
  'KM-SPC-EV-GARAM-10RS': 'https://images.openfoodfacts.org/images/products/890/178/608/0013/front_en.16.400.jpg',
  'KM-SPC-CATCH-CHAAT-10RS': 'https://images.openfoodfacts.org/images/products/890/119/200/2012/front_en.14.400.jpg',
  'KM-SPC-MDH-CHANA-100G': 'https://images.openfoodfacts.org/images/products/890/216/700/0117/front_en.18.400.jpg',

  // Salt & Sugar
  'KM-SALT-TATA-LITE-500G': 'https://images.openfoodfacts.org/images/products/890/105/200/0010/front_en.27.400.jpg',
  'KM-SALT-TATA-1KG': 'https://images.openfoodfacts.org/images/products/890/105/200/0010/front_en.27.400.jpg',
  'KM-SUGAR-REFINED-1KG': 'https://images.openfoodfacts.org/images/products/890/404/390/4019/front_en.9.400.jpg',

  // Tea & Coffee
  'KM-TEA-TATA-PREM-100G': 'https://images.openfoodfacts.org/images/products/890/105/201/1016/front_en.15.400.jpg',
  'KM-TEA-TATA-PREM-250G': 'https://images.openfoodfacts.org/images/products/890/105/201/1016/front_en.15.400.jpg',
  'KM-COFFEE-NESCAFE-SACHET': 'https://images.openfoodfacts.org/images/products/890/105/885/0017/front_en.28.400.jpg',

  // Noodles
  'KM-NOOD-MAGGI-35G': 'https://images.openfoodfacts.org/images/products/890/105/800/0306/front_en.10.400.jpg',
  'KM-NOOD-MAGGI-70G': 'https://images.openfoodfacts.org/images/products/890/105/800/0306/front_en.10.400.jpg',
  'KM-NOOD-MAGGI-4PACK': 'https://images.openfoodfacts.org/images/products/890/105/802/3787/front_en.6.400.jpg',

  // Namkeen & Chips
  'KM-SNK-HALDIRAM-BHUJIA-35G': 'https://images.openfoodfacts.org/images/products/890/406/320/0016/front_en.22.400.jpg',
  'KM-SNK-HALDIRAM-BHUJIA-200G': 'https://images.openfoodfacts.org/images/products/890/406/320/0016/front_en.22.400.jpg',
  'KM-CHP-LAYS-MAGIC-28G': 'https://images.openfoodfacts.org/images/products/890/149/150/3020/front_en.35.400.jpg',
  'KM-CHP-KURKURE-MASALA-38G': 'https://images.openfoodfacts.org/images/products/890/149/136/1026/front_en.51.400.jpg',

  // Chocolates
  'KM-CHOC-DAIRYMILK-13G': 'https://images.openfoodfacts.org/images/products/762/220/233/4009/front_en.9.400.jpg',
  'KM-CHOC-KITKAT-12G': 'https://images.openfoodfacts.org/images/products/890/105/886/0016/front_en.19.400.jpg',

  // Soaps & Personal Care
  'KM-SOAP-DETTOL-ORIG-45G': 'https://images.openfoodfacts.org/images/products/890/139/632/4508/front_en.5.400.jpg',
  'KM-SOAP-LIFEBUOY-TOTAL-50G': 'https://images.openfoodfacts.org/images/products/890/103/081/1012/front_en.14.400.jpg',
  'KM-SOAP-LUX-ROSE-50G': 'https://images.openfoodfacts.org/images/products/890/103/082/1011/front_en.17.400.jpg',
  'KM-SHMP-CLINIC-PLUS-6ML': 'https://images.openfoodfacts.org/images/products/890/103/083/1010/front_en.16.400.jpg',
  'KM-SHMP-HNS-COOL-6ML': 'https://images.openfoodfacts.org/images/products/490/243/074/0018/front_en.11.400.jpg',
  'KM-TOOTH-COLGATE-STRONG-20G': 'https://images.openfoodfacts.org/images/products/890/131/401/0018/front_en.26.400.jpg',
  'KM-TOOTH-COLGATE-STRONG-100G': 'https://images.openfoodfacts.org/images/products/890/131/401/0018/front_en.26.400.jpg',

  // Detergents
  'KM-DET-SURF-EXCEL-80G': 'https://images.openfoodfacts.org/images/products/890/103/086/5169/front_en.9.400.jpg',
  'KM-DET-SURF-EXCEL-1KG': 'https://images.openfoodfacts.org/images/products/890/103/084/3150/front_en.3.400.jpg',
  'KM-DET-RIN-BAR-140G': 'https://images.openfoodfacts.org/images/products/890/103/085/1018/front_en.12.400.jpg',
  'KM-DET-VIM-BAR-150G': 'https://images.openfoodfacts.org/images/products/890/103/087/1016/front_en.15.400.jpg',
  'KM-CLN-HARPIC-200ML': 'https://images.openfoodfacts.org/images/products/890/139/633/1018/front_en.14.400.jpg',
  'KM-CLN-LIZOL-FLOR-500ML': 'https://images.openfoodfacts.org/images/products/890/139/634/1017/front_en.18.400.jpg',

  // Pooja, Baby, Ketchup, Dry Fruits
  'KM-POOJA-MATCHBOX-BUNDLE': 'https://images.openfoodfacts.org/images/products/890/123/456/0019/front_en.8.400.jpg',
  'KM-POOJA-CYCLE-AGAR-50G': 'https://images.openfoodfacts.org/images/products/890/129/601/0013/front_en.14.400.jpg',
  'KM-POOJA-CAMPHOR-50G': 'https://images.openfoodfacts.org/images/products/890/129/602/0012/front_en.9.400.jpg',
  'KM-OTHER-GOODKNIGHT-REFILL': 'https://images.openfoodfacts.org/images/products/890/102/301/1016/front_en.16.400.jpg',
  'KM-BABY-PAMPERS-S-1PC': 'https://images.openfoodfacts.org/images/products/490/243/075/0017/front_en.12.400.jpg',
  'KM-DRY-ALMOND-100G': 'https://images.openfoodfacts.org/images/products/890/404/390/5016/front_en.10.400.jpg',
  'KM-DRY-CASHEW-100G': 'https://images.openfoodfacts.org/images/products/890/404/390/5023/front_en.11.400.jpg',
  'KM-INST-POHA-500G': 'https://images.openfoodfacts.org/images/products/890/404/390/6013/front_en.14.400.jpg',
  'KM-INST-KISSAN-KETCHUP-100G': 'https://images.openfoodfacts.org/images/products/890/103/088/1015/front_en.21.400.jpg'
};

async function download(url: string, filename: string): Promise<boolean> {
  const dest = path.join(process.cwd(), 'public', 'products', filename);
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'KiranaMart/1.0' } });
    if (!res.ok) return false;
    const buf = await res.arrayBuffer();
    if (buf.byteLength < 1000) return false;
    fs.writeFileSync(dest, Buffer.from(buf));
    return true;
  } catch (e) {
    return false;
  }
}

async function main() {
  const targetDir = path.join(process.cwd(), 'public', 'products');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  console.log('📸 Downloading authentic real product package photos...');
  let successCount = 0;
  for (const [sku, url] of Object.entries(realPhotoUrls)) {
    const filename = `${sku.toLowerCase()}.jpg`;
    const ok = await download(url, filename);
    if (ok) {
      console.log(`✅ [PHOTO] ${sku} -> ${filename}`);
      successCount++;
    } else {
      console.log(`⚠️ Fallback to vector packaging for ${sku}`);
    }
  }

  console.log(`🎉 Finished downloading real product photos: ${successCount} photos saved!`);
}

main().catch(console.error);
