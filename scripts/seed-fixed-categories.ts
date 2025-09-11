import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';

interface FixedCategory {
  title: string;
  slug: string;
  description: string;
  image: string; // path under public/
}

const FIXED_CATEGORIES: FixedCategory[] = [
  {
    title: 'Build Muscle',
    slug: 'build-muscle',
    description: 'Gain strength and muscle mass',
    image: '/fitness-goals/Build Muscle.png',
  },
  {
    title: 'Overall Fitness',
    slug: 'overall-fitness',
    description: 'Improve general health and wellness',
    image: '/fitness-goals/Overall Fitness.png',
  },
  {
    title: 'Energy & Endurance',
    slug: 'energy-endurance',
    description: 'Boost stamina and performance',
    image: '/fitness-goals/Energy & Endurance.png',
  },
  {
    title: 'Weight Loss',
    slug: 'weight-loss',
    description: 'Achieve healthy weight goals',
    image: '/fitness-goals/Reduce Weight.png',
  },
  {
    title: 'Weight Gain',
    slug: 'weight-gain',
    description: 'Healthy weight gain solutions',
    image: '/fitness-goals/Weight Gain.png',
  },
  {
    title: 'Immunity Boost',
    slug: 'immunity-boost',
    description: 'Strengthen your immune system',
    image: '/fitness-goals/Immunity Boost.png',
  },
  // Placeholder 7
  {
    title: 'Category 7',
    slug: 'category-7',
    description: 'Placeholder category - replace title and image',
    image: '/logos/psd.png',
  },
  // Placeholder 8
  {
    title: 'Category 8',
    slug: 'category-8',
    description: 'Placeholder category - replace title and image',
    image: '/logos/psd.png',
  },
];

async function seedFixedCategories() {
  try {
    console.log('Seeding fixed categories...');
    await connectDB();

    let upserted = 0;

    for (const cat of FIXED_CATEGORIES) {
      const existing = await Category.findOne({ slug: cat.slug });

      if (existing) {
        existing.title = cat.title;
        existing.slug = cat.slug;
        existing.description = cat.description;
        existing.displayImage = cat.image;
        existing.isActive = true;
        await existing.save();
        console.log(`Updated: ${cat.title}`);
      } else {
        await Category.create({
          title: cat.title,
          slug: cat.slug,
          description: cat.description,
          originalPrice: 0,
          discountPrice: undefined,
          categoryIds: [],
          displayImage: cat.image,
          categoryFiles: [],
          isFeatured: false,
          isActive: true,
        });
        upserted += 1;
        console.log(`Created: ${cat.title}`);
      }
    }

    // Optionally deactivate any other categories not in the fixed list
    const fixedSlugs = FIXED_CATEGORIES.map(c => c.slug);
    const { modifiedCount } = await Category.updateMany(
      { slug: { $nin: fixedSlugs } },
      { $set: { isActive: false } }
    );

    console.log(`Done. Created ${upserted}. Deactivated ${modifiedCount} non-fixed categories.`);
  } catch (err) {
    console.error('Failed to seed fixed categories:', err);
  } finally {
    process.exit(0);
  }
}

if (require.main === module) {
  seedFixedCategories();
}

export default seedFixedCategories;
