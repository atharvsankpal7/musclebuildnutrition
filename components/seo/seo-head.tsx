import { seoConfig } from '@/lib/seo-config';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  noIndex?: boolean;
}

export function SEOHead({
  title = seoConfig.defaultTitle,
  description = seoConfig.defaultDescription,
  keywords = 'musclebuild nutrition, fitness supplements, nutrition products, muscle building, weight management, health supplements, protein supplements, fitness nutrition',
  image = seoConfig.defaultImage,
  url,
  type = 'website',
  noIndex = false
}: SEOHeadProps) {
  const fullUrl = url ? `${seoConfig.siteUrl}${url}` : seoConfig.siteUrl;
  const fullImageUrl = image.startsWith('http') ? image : `${seoConfig.siteUrl}${image}`;

  return (
    <>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Musclebuild Nutrition" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content="@musclebuildnutrition" />
      
      {/* Additional Meta Tags */}
      <meta name="author" content="Musclebuild Nutrition" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#dc2626" />
      
      {/* Favicon */}
      <link rel="icon" href="/logos/favicon.ico" />
      <link rel="apple-touch-icon" href="/logos/header-logo.png" />
    </>
  );
}