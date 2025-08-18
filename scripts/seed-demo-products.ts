import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';

async function seedDemoProducts() {
  try {
    console.log('Seeding demo products...');
    await connectDB();

    // Ensure categories exist
    const categoryBySlug: Record<string, any> = {};
    const neededSlugs = ['build-muscle', 'energy-endurance', 'overall-fitness', 'weight-gain'];
    const cats = await Category.find({ slug: { $in: neededSlugs } });
    for (const c of cats) categoryBySlug[c.slug] = c;

    const getCatId = (slug: string) => categoryBySlug[slug]?._id;

    const products = [
      {
        title: 'Musclebuild mass gainer',
        description: 'High-quality mass gainer to support weight gain and muscle growth.',
        originalPrice: 2499,
        discountPrice: 1999,
        categoryIds: [getCatId('weight-gain') || getCatId('build-muscle')].filter(Boolean),
        displayImage: '/products/Musclebuild mass gainer.jpg',
        productFiles: [],
        isFeatured: true,
        isActive: true,
        isHotDeal: true,
      },
      {
        title: 'Musclebuild Pre workout',
        description: 'Pre-workout formula to enhance energy and endurance for your training.',
        originalPrice: 1499,
        discountPrice: 1299,
        categoryIds: [getCatId('energy-endurance') || getCatId('overall-fitness')].filter(Boolean),
        displayImage: '/products/Musclebuild Pre workout.jpg',
        productFiles: [],
        isFeatured: true,
        isActive: true,
        isHotDeal: true,
      },
      {
        title: 'Musclebuild whey protein',
        description: 'Premium whey protein to support muscle recovery and growth.',
        originalPrice: 2999,
        discountPrice: 2599,
        categoryIds: [getCatId('build-muscle') || getCatId('overall-fitness')].filter(Boolean),
        displayImage: '/products/Musclebuild whey protein.jpg',
        productFiles: [],
        isFeatured: true,
        isActive: true,
        isHotDeal: false,
      },
      {
        title: 'Musclebuild BCAA',
        description: 'Branched-chain amino acids for muscle recovery and endurance.',
        originalPrice: 1799,
        discountPrice: 1499,
        categoryIds: [getCatId('build-muscle') || getCatId('overall-fitness')].filter(Boolean),
        displayImage: '/products/Musclebuild whey protein.jpg',
        productFiles: [],
        isFeatured: false,
        isActive: true,
        isHotDeal: true,
      },
      {
        title: 'Musclebuild Creatine',
        description: 'Pure creatine monohydrate for strength and power enhancement.',
        originalPrice: 1299,
        discountPrice: 999,
        categoryIds: [getCatId('build-muscle') || getCatId('overall-fitness')].filter(Boolean),
        displayImage: '/products/Musclebuild whey protein.jpg',
        productFiles: [],
        isFeatured: false,
        isActive: true,
        isHotDeal: true,
      },
      {
        title: 'Musclebuild Multivitamin',
        description: 'Complete multivitamin complex for overall health and wellness.',
        originalPrice: 899,
        discountPrice: 699,
        categoryIds: [getCatId('overall-fitness')].filter(Boolean),
        displayImage: '/products/Musclebuild whey protein.jpg',
        productFiles: [],
        isFeatured: false,
        isActive: true,
        isHotDeal: true,
      },
      {
        title: 'Musclebuild Fat Burner',
        description: 'Thermogenic fat burner to support weight management goals.',
        originalPrice: 1999,
        discountPrice: 1699,
        categoryIds: [getCatId('overall-fitness')].filter(Boolean),
        displayImage: '/products/Musclebuild whey protein.jpg',
        productFiles: [],
        isFeatured: false,
        isActive: true,
        isHotDeal: false,
      },
      {
        title: 'Musclebuild Glutamine',
        description: 'L-Glutamine for muscle recovery and immune system support.',
        originalPrice: 1599,
        discountPrice: 1299,
        categoryIds: [getCatId('build-muscle')].filter(Boolean),
        displayImage: '/products/Musclebuild whey protein.jpg',
        productFiles: [],
        isFeatured: false,
        isActive: true,
        isHotDeal: false,
      },
    ];

    for (const data of products) {
      const existing = await Product.findOne({ title: data.title });
      if (existing) {
        existing.set(data);
        await existing.save();
        console.log(`Updated: ${data.title}`);
      } else {
        if (!data.categoryIds || data.categoryIds.length === 0) {
          console.warn(`Skipping ${data.title} because required categories are missing. Seed categories first.`);
          continue;
        }
        await Product.create(data);
        console.log(`Created: ${data.title}`);
      }
    }

    console.log('Done seeding demo products.');
  } catch (err) {
    console.error('Failed to seed products:', err);
  } finally {
    process.exit(0);
  }
}

if (require.main === module) {
  seedDemoProducts();
}

export default seedDemoProducts;
