// SEO Configuration for SSCreation
export const seoConfig = {
  defaultTitle: 'Musclebuild Nutrition - Premium Fitness & Nutrition Products',
  defaultDescription: 'Musclebuild Nutrition offers premium fitness and nutrition products for muscle building, weight management, and overall health. Quality supplements and nutrition solutions.',
  defaultKeywords: [
    'musclebuild nutrition',
    'fitness supplements',
    'nutrition products',
    'muscle building',
    'weight management',
    'health supplements',
    'protein supplements',
    'fitness nutrition'
  ],
  defaultImage: '/logos/header-logo.png',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://musclebuildnutrition.com',
  
  // Organization Schema
  organization: {
    '@type': 'Organization',
    name: 'Musclebuild Nutrition',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://musclebuildnutrition.com',
    logo: {
      '@type': 'ImageObject',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://musclebuildnutrition.com'}/logos/header-logo.png`,
      width: 512,
      height: 512
    },
    description: 'Premium fitness and nutrition products for health and wellness',
    legalName: 'Musclebuild Nutrition Private Limited',
    foundingDate: '2024',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9657866181',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi', 'Marathi']
    },
    sameAs: [
      'https://facebook.com/musclebuildnutrition',
      'https://instagram.com/musclebuildnutrition',
      'https://twitter.com/musclebuildnutrition'
    ]
  },

  // Person Schema (for team members)
  person: {
    '@type': 'Person',
    name: 'Musclebuild Nutrition Team',
    jobTitle: 'Fitness & Nutrition Specialists',
    worksFor: {
      '@type': 'Organization',
      name: 'Musclebuild Nutrition'
    },
    description: 'Expert team dedicated to providing quality fitness and nutrition solutions',
    sameAs: [
      'https://linkedin.com/company/musclebuildnutrition'
    ]
  },

  // Product Schema
  product: {
    '@type': 'Product',
    name: 'Musclebuild Nutrition Products',
    description: 'Premium fitness and nutrition products for muscle building, weight management, and overall health',
    brand: {
      '@type': 'Brand',
      name: 'Musclebuild Nutrition',
      alternateName: 'Musclebuild Nutrition',
      description: 'Premium fitness and nutrition brand'
    },
    category: 'Health & Fitness'
  }
};

// Generate meta keywords for specific pages
export const generateKeywords = (pageKeywords: string[]) => {
  return [...seoConfig.defaultKeywords, ...pageKeywords].join(', ')
}

// Generate structured data for products
export const generateProductSchema = (product: any) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.title,
  description: product.description,
  image: product.displayImage,
  brand: {
    '@type': 'Brand',
    name: 'Musclebuild Nutrition'
  },
  offers: {
    '@type': 'Offer',
    price: product.discountPrice || product.originalPrice,
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: 'Musclebuild Nutrition'
    }
  },
  category: 'Fitness & Nutrition Products',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '150'
  }
})

// Generate FAQ schema
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Musclebuild Nutrition?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Musclebuild Nutrition is a premium fitness and nutrition brand offering high-quality supplements for muscle building, weight management, and overall health.'
      }
    },
    {
      '@type': 'Question',
      name: 'Are your products safe and certified?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, all Musclebuild Nutrition products are manufactured in certified facilities and meet strict quality standards for safety and efficacy.'
      }
    },
    {
      '@type': 'Question',
      name: 'What types of supplements do you offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer a wide range of supplements including protein powders, mass gainers, pre-workout formulas, and specialized nutrition products for different fitness goals.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do I place an order?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can place orders through our website, WhatsApp, or by calling our customer service. We offer convenient payment options and fast delivery.'
      }
    }
  ]
}