import bcrypt from 'bcryptjs';
import connectDB from '../lib/mongodb';
import User from '../models/User';
import Section from '../models/Section';
import Product from '../models/Product';
import ContactSettings from '../models/ContactSettings';

export async function seed() {
  try {
    await connectDB();

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);

    await User.findOneAndUpdate(
      { email: 'admin@musclebuildnutrition.co.in' },
      {
        email: 'admin@musclebuildnutrition.co.in',
        password: hashedPassword,
        isAdmin: true,
      },
      { upsert: true }
    );

    // Create sections
    const sections = [
      { name: 'Protein Supplements', description: 'Whey protein, casein, and plant-based proteins' },
      { name: 'Mass Gainers', description: 'Weight gain supplements for muscle building' },
      { name: 'Pre-Workout', description: 'Energy and performance boosting supplements' },
      { name: 'Post-Workout', description: 'Recovery and muscle repair supplements' },
      { name: 'Fat Burners', description: 'Weight loss and metabolism boosting supplements' },
      { name: 'Vitamins & Minerals', description: 'Essential vitamins and mineral supplements' },
      { name: 'Creatine', description: 'Creatine supplements for strength and power' },
      { name: 'BCAA & Amino Acids', description: 'Branched-chain amino acids and essential amino acids' },
    ];

    const createdSections = [];
    for (const section of sections) {
      const createdSection = await Section.findOneAndUpdate(
        { name: section.name },
        section,
        { upsert: true, new: true }
      );
      createdSections.push(createdSection);
    }

    // Create sample products
    const proteinSection = createdSections.find(s => s.name === 'Protein Supplements');
    const massGainerSection = createdSections.find(s => s.name === 'Mass Gainers');
    const preWorkoutSection = createdSections.find(s => s.name === 'Pre-Workout');
    const fatBurnerSection = createdSections.find(s => s.name === 'Fat Burners');

    if (proteinSection && massGainerSection && preWorkoutSection && fatBurnerSection) {
      const products = [
        {
          title: 'Musclebuild Whey Protein',
          description: 'Premium whey protein isolate for muscle building and recovery. 25g protein per serving.',
          originalPrice: 3599,
          discountPrice: 3419,
          sectionIds: [proteinSection._id],
          displayImage: '/products/Musclebuild whey protein.jpg',
          isFeatured: true,
          isHotDeal: true,
          isActive: true,
        },
        {
          title: 'Musclebuild Mass Gainer',
          description: 'High-calorie mass gainer with protein, carbs, and essential nutrients for weight gain.',
          originalPrice: 2499,
          discountPrice: 1999,
          sectionIds: [massGainerSection._id],
          displayImage: '/products/Musclebuild mass gainer.jpg',
          isFeatured: true,
          isHotDeal: true,
          isActive: true,
        },
        {
          title: 'Musclebuild Pre Workout',
          description: 'Energy-boosting pre-workout formula with caffeine, creatine, and amino acids.',
          originalPrice: 1499,
          discountPrice: 1299,
          sectionIds: [preWorkoutSection._id],
          displayImage: '/products/Musclebuild Pre workout.jpg',
          isFeatured: true,
          isHotDeal: true,
          isActive: true,
        },
        {
          title: 'Musclebuild Fat Burner',
          description: 'Thermogenic fat burner to boost metabolism and support weight loss goals.',
          originalPrice: 1999,
          discountPrice: 1699,
          sectionIds: [fatBurnerSection._id],
          displayImage: '/products/fat-burner.jpg',
          isFeatured: false,
          isHotDeal: false,
          isActive: true,
        },
        {
          title: 'Musclebuild BCAA',
          description: 'Branched-chain amino acids for muscle recovery and endurance during workouts.',
          originalPrice: 1299,
          discountPrice: 999,
          sectionIds: [proteinSection._id],
          displayImage: '/products/bcaa.jpg',
          isFeatured: false,
          isHotDeal: true,
          isActive: true,
        },
      ];

      for (const product of products) {
        await Product.findOneAndUpdate(
          { title: product.title },
          product,
          { upsert: true }
        );
      }
    }

    // Create contact settings
    await ContactSettings.findOneAndUpdate(
      {},
      {
        phone: '+91-9657866181',
        whatsappNumber: '+91-9657866181',
        email: 'admin@musclebuildnutrition.co.in',
        address: 'Peth, Sangli Road, Musclebuild Nutrition Islampur, Opposite Rajarambapu Patil Bank',
        workingHours: {
          monday: '9:00 AM - 8:00 PM',
          tuesday: '9:00 AM - 8:00 PM',
          wednesday: '9:00 AM - 8:00 PM',
          thursday: '9:00 AM - 8:00 PM',
          friday: '9:00 AM - 8:00 PM',
          saturday: '9:00 AM - 6:00 PM',
          sunday: 'Closed'
        },
        socialMedia: {
          facebook: 'https://facebook.com/musclebuildnutrition',
          instagram: 'https://instagram.com/musclebuildnutrition',
          twitter: 'https://twitter.com/musclebuildnutrition',
          youtube: 'https://youtube.com/@musclebuildnutrition'
        },
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.715872126558!2d72.8245093153778!3d19.04346925793646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c96a34dc4401%3A0x3ffc07e83942b13f!2sMusclebuild%20Nutrition!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin'
      },
      { upsert: true }
    );

    console.log('Database seeded successfully!');
  } catch (error: any) {
    console.error('Error seeding database:', error);
  }
}

seed();