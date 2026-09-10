import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const directImageMap: Record<string, string> = {
  // Biscuits
  'KM-BIS-PARLE-50G': '/products/km-bis-parle-50g.jpg',
  'KM-BIS-PARLE-110G': '/products/km-bis-parle-110g.jpg',
  'KM-BIS-PARLE-800G': 'https://images.openfoodfacts.org/images/products/890/171/910/1037/front_en.6.400.jpg',
  'KM-BIS-MARIE-75G': '/products/km-bis-marie-75g.jpg',
  'KM-BIS-MARIE-250G': '/products/km-bis-marie-250g.jpg',
  'KM-BIS-GOODDAY-35G': 'https://images.openfoodfacts.org/images/products/890/106/301/8112/front_en.13.400.jpg',
  'KM-BIS-GOODDAY-66G': 'https://images.openfoodfacts.org/images/products/890/106/301/8129/front_en.11.400.jpg',
  'KM-BIS-BOURBON-50G': '/products/km-bis-bourbon-50g.jpg',
  'KM-BIS-HIDE-SEEK-33G': '/products/km-bis-hide-seek-33g.jpg',
  'KM-BIS-MONACO-50G': 'https://images.openfoodfacts.org/images/products/890/171/910/2010/front_en.12.400.jpg',
  'KM-BIS-KRACKJACK-60G': 'https://images.openfoodfacts.org/images/products/890/171/910/4014/front_en.10.400.jpg',

  // Milk & Dairy
  'KM-DAIRY-AMUL-TONED-500ML': 'https://images.openfoodfacts.org/images/products/890/126/215/0057/front_en.21.400.jpg',
  'KM-DAIRY-AMUL-GOLD-500ML': '/products/km-dairy-amul-gold-500ml.jpg',
  'KM-DAIRY-MD-TONED-500ML': 'https://images.openfoodfacts.org/images/products/890/164/800/1012/front_en.8.400.jpg',
  'KM-DAIRY-AMUL-BUTTER-20G': '/products/km-dairy-amul-butter-20g.jpg',
  'KM-DAIRY-AMUL-BUTTER-100G': '/products/km-dairy-amul-butter-100g.jpg',
  'KM-DAIRY-AMUL-PANEER-200G': '/products/km-dairy-amul-paneer-200g.jpg',
  'KM-DAIRY-AMUL-DAHI-200G': '/products/km-dairy-amul-dahi-200g.jpg',

  // Cold Drinks & Beverages
  'KM-BEV-STING-250ML': '/products/km-bev-sting-250ml.jpg',
  'KM-BEV-COCACOLA-250ML': '/products/km-bev-cocacola-250ml.jpg',
  'KM-BEV-THUMSUP-250ML': '/products/km-bev-thumsup-250ml.jpg',
  'KM-BEV-SPRITE-250ML': '/products/km-bev-sprite-250ml.jpg',
  'KM-BEV-FROOTI-125ML': 'https://images.openfoodfacts.org/images/products/890/171/911/1012/front_en.15.400.jpg',
  'KM-BEV-BISLERI-500ML': 'https://images.openfoodfacts.org/images/products/890/601/729/0019/front_en.18.400.jpg',
  'KM-BEV-BISLERI-1L': 'https://images.openfoodfacts.org/images/products/890/601/729/0026/front_en.22.400.jpg',

  // Atta, Maida & Suji
  'KM-RATION-AASH-ATTA-1KG': 'https://images.openfoodfacts.org/images/products/890/172/518/1214/front_en.14.400.jpg',
  'KM-RATION-AASH-ATTA-5KG': '/products/km-ration-aash-atta-5kg.jpg',
  'KM-RATION-AASH-ATTA-10KG': 'https://images.openfoodfacts.org/images/products/890/172/518/1238/front_en.10.400.jpg',
  'KM-RATION-MAIDA-500G': 'https://images.openfoodfacts.org/images/products/890/404/390/1018/front_en.7.400.jpg',
  'KM-RATION-SUJI-500G': 'https://images.openfoodfacts.org/images/products/890/404/390/1025/front_en.8.400.jpg',
  'KM-RATION-BESAN-500G': 'https://images.openfoodfacts.org/images/products/890/404/390/1049/front_en.11.400.jpg',

  // Dal & Pulses
  'KM-DAL-TOOR-500G': '/products/km-dal-toor-500g.jpg',
  'KM-DAL-TOOR-1KG': '/products/km-dal-toor-1kg.jpg',
  'KM-DAL-MOONG-DHULI-500G': 'https://images.openfoodfacts.org/images/products/890/404/390/2039/front_en.12.400.jpg',
  'KM-DAL-CHANA-500G': '/products/km-dal-chana-500g.jpg',
  'KM-DAL-RAJMA-CHITRA-500G': 'https://images.openfoodfacts.org/images/products/890/404/390/2060/front_en.9.400.jpg',

  // Rice
  'KM-RICE-BASMATI-FEAST-1KG': '/products/km-rice-basmati-feast-1kg.jpg',
  'KM-RICE-BASMATI-CLASSIC-5KG': '/products/km-rice-basmati-classic-5kg.jpg',
  'KM-RICE-SONA-MASOORI-1KG': 'https://images.openfoodfacts.org/images/products/890/404/390/3012/front_en.8.400.jpg',

  // Cooking Oil
  'KM-OIL-FORTUNE-MUSTARD-500ML': '/products/km-oil-fortune-mustard-500ml.jpg',
  'KM-OIL-FORTUNE-MUSTARD-1L': '/products/km-oil-fortune-mustard-1l.jpg',
  'KM-OIL-FORTUNE-SUNLITE-1L': 'https://images.openfoodfacts.org/images/products/890/600/728/0112/front_en.14.400.jpg',
  'KM-OIL-FORTUNE-SOYA-1L': '/products/km-oil-fortune-soya-1l.jpg',

  // Ghee
  'KM-GHEE-AMUL-PURE-200ML': 'https://images.openfoodfacts.org/images/products/890/126/202/0015/front_en.21.400.jpg',
  'KM-GHEE-AMUL-PURE-1L': 'https://images.openfoodfacts.org/images/products/890/126/202/0022/front_en.18.400.jpg',

  // Spices & Masala
  'KM-SPC-MDH-HALDI-10RS': 'https://images.openfoodfacts.org/images/products/890/216/700/0018/front_en.19.400.jpg',
  'KM-SPC-MDH-MIRCH-10RS': 'https://images.openfoodfacts.org/images/products/890/216/700/0025/front_en.23.400.jpg',
  'KM-SPC-EV-GARAM-10RS': 'https://images.openfoodfacts.org/images/products/890/178/608/0013/front_en.16.400.jpg',
  'KM-SPC-CATCH-CHAAT-10RS': 'https://images.openfoodfacts.org/images/products/890/119/200/2012/front_en.14.400.jpg',
  'KM-SPC-MDH-CHANA-100G': '/products/km-spc-mdh-chana-100g.jpg',

  // Salt & Sugar
  'KM-SALT-TATA-LITE-500G': 'https://images.openfoodfacts.org/images/products/890/105/200/0010/front_en.27.400.jpg',
  'KM-SALT-TATA-1KG': '/products/km-salt-tata-1kg.jpg',
  'KM-SUGAR-REFINED-1KG': '/products/km-sugar-refined-1kg.jpg',

  // Tea & Coffee
  'KM-TEA-TATA-PREM-100G': 'https://images.openfoodfacts.org/images/products/890/105/201/1016/front_en.15.400.jpg',
  'KM-TEA-TATA-PREM-250G': 'https://images.openfoodfacts.org/images/products/890/105/201/1016/front_en.15.400.jpg',
  'KM-COFFEE-NESCAFE-SACHET': 'https://images.openfoodfacts.org/images/products/890/105/885/0017/front_en.28.400.jpg',

  // Noodles
  'KM-NOOD-MAGGI-35G': '/products/km-nood-maggi-35g.jpg',
  'KM-NOOD-MAGGI-70G': '/products/km-nood-maggi-70g.jpg',
  'KM-NOOD-MAGGI-4PACK': '/products/km-nood-maggi-4pack.jpg',

  // Snacks & Chips
  'KM-SNK-HALDIRAM-BHUJIA-35G': 'https://images.openfoodfacts.org/images/products/890/406/320/0016/front_en.22.400.jpg',
  'KM-SNK-HALDIRAM-BHUJIA-200G': 'https://images.openfoodfacts.org/images/products/890/406/320/0016/front_en.22.400.jpg',
  'KM-CHP-LAYS-MAGIC-28G': '/products/km-chp-lays-magic-28g.jpg',
  'KM-CHP-KURKURE-MASALA-38G': '/products/km-chp-kurkure-masala-38g.jpg',

  // Chocolates
  'KM-CHOC-DAIRYMILK-13G': '/products/km-choc-dairymilk-13g.jpg',
  'KM-CHOC-KITKAT-12G': '/products/km-choc-kitkat-12g.jpg',

  // Soaps & Personal Care
  'KM-SOAP-DETTOL-ORIG-45G': '/products/km-soap-dettol-orig-45g.jpg',
  'KM-SOAP-LIFEBUOY-TOTAL-50G': 'https://images.openfoodfacts.org/images/products/890/103/081/1012/front_en.14.400.jpg',
  'KM-SOAP-LUX-ROSE-50G': 'https://images.openfoodfacts.org/images/products/890/103/082/1011/front_en.17.400.jpg',
  'KM-SHMP-CLINIC-PLUS-6ML': 'https://images.openfoodfacts.org/images/products/890/103/083/1010/front_en.16.400.jpg',
  'KM-SHMP-HNS-COOL-6ML': 'https://images.openfoodfacts.org/images/products/490/243/074/0018/front_en.11.400.jpg',
  'KM-TOOTH-COLGATE-STRONG-20G': 'https://images.openfoodfacts.org/images/products/890/131/401/0018/front_en.26.400.jpg',
  'KM-TOOTH-COLGATE-STRONG-100G': 'https://images.openfoodfacts.org/images/products/890/131/401/0018/front_en.26.400.jpg',

  // Detergents & Dishwash
  'KM-DET-SURF-EXCEL-80G': '/products/km-det-surf-excel-80g.jpg',
  'KM-DET-SURF-EXCEL-1KG': '/products/km-det-surf-excel-1kg.jpg',
  'KM-DET-RIN-BAR-140G': 'https://images.openfoodfacts.org/images/products/890/103/085/1018/front_en.12.400.jpg',
  'KM-DET-VIM-BAR-150G': 'https://images.openfoodfacts.org/images/products/890/103/087/1016/front_en.15.400.jpg',

  // Cleaning
  'KM-CLN-HARPIC-200ML': 'https://images.openfoodfacts.org/images/products/890/139/633/1018/front_en.14.400.jpg',
  'KM-CLN-LIZOL-FLOR-500ML': 'https://images.openfoodfacts.org/images/products/890/139/634/1017/front_en.18.400.jpg',

  // Pooja, Essentials, Baby Care
  'KM-POOJA-MATCHBOX-BUNDLE': 'https://images.unsplash.com/photo-1508873696983-2df5293cb325?w=500&auto=format&fit=crop&q=80',
  'KM-POOJA-CYCLE-AGAR-50G': '/products/km-pooja-cycle-agar-50g.svg',
  'KM-POOJA-CAMPHOR-50G': 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop&q=80',
  'KM-OTHER-GOODKNIGHT-REFILL': '/products/km-other-goodknight-refill.svg',
  'KM-BABY-PAMPERS-S-1PC': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&auto=format&fit=crop&q=80',
  'KM-DRY-ALMOND-100G': 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=500&auto=format&fit=crop&q=80',
  'KM-DRY-CASHEW-100G': 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=500&auto=format&fit=crop&q=80',
  'KM-INST-POHA-500G': '/products/km-inst-poha-500g.svg',
  'KM-INST-KISSAN-KETCHUP-100G': '/products/km-inst-kissan-ketchup-100g.svg'
};

async function main() {
  console.log('🔄 Updating all database products with real high-resolution product image URLs...');
  const products = await prisma.product.findMany({
    include: { images: true }
  });

  let updatedCount = 0;
  for (const product of products) {
    const sku = product.sku;
    let targetUrl = directImageMap[sku];

    // Check if local .jpg exists first
    const localJpg = `/products/${sku.toLowerCase()}.jpg`;
    const localPath = path.join(process.cwd(), 'public', 'products', `${sku.toLowerCase()}.jpg`);
    if (fs.existsSync(localPath)) {
      targetUrl = localJpg;
    }

    if (!targetUrl) {
      targetUrl = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80';
    }

    // Upsert or update product image
    if (product.images && product.images.length > 0) {
      await prisma.productImage.update({
        where: { id: product.images[0].id },
        data: {
          url: targetUrl,
          altText: product.name,
          active: true
        }
      });
    } else {
      await prisma.productImage.create({
        data: {
          productId: product.id,
          url: targetUrl,
          altText: product.name,
          sortOrder: 0,
          active: true
        }
      });
    }
    updatedCount++;
    console.log(`✅ [${sku}] -> ${targetUrl}`);
  }

  console.log(`🎉 Successfully updated ${updatedCount} product images in database!`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
