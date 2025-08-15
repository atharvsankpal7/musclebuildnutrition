// Configuration file for the application
export const config = {
  // WhatsApp business number for customer inquiries
  // Format: country code + phone number (e.g., 9657866181 for India)
  whatsapp: {
    businessNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '9657866181',
    messageTemplate: 'I am interested in this product : {productUrl}',
    bundleMessageTemplate: 'I am interested in this bundle : {bundleUrl}'
  },

  // Company information
  company: {
    name: 'Muscle Build Nutrition',
    website: process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://musclebuildnutrition.com'
  }
};
