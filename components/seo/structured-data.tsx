import { seoConfig } from '@/lib/seo-config'

interface StructuredDataProps {
  type?: 'organization' | 'website' | 'product' | 'faq' | 'person'
  data?: any
}

export function StructuredData({ type = 'organization', data }: StructuredDataProps) {
  let schema

  switch (type) {
    case 'organization':
      schema = {
        "@context": "https://schema.org",
        ...seoConfig.organization
      }
      break
    case 'website':
      schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Musclebuild Nutrition",
        "url": seoConfig.siteUrl,
        "description": seoConfig.defaultDescription,
        "publisher": {
          "@type": "Organization",
          "name": "Musclebuild Nutrition"
        }
      }
      break
    case 'product':
      schema = data || seoConfig.product
      break
    case 'person':
      schema = {
        "@context": "https://schema.org",
        ...seoConfig.person
      }
      break
    case 'faq':
      schema = data
      break
    default:
      schema = {
        "@context": "https://schema.org",
        ...seoConfig.organization
      }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  )
}

// Breadcrumb structured data
export function BreadcrumbStructuredData({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  )
}