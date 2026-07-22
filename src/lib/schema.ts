import type { Rating, ReviewFrontmatter } from '@/types'

/**
 * Generates Product JSON-LD structured data.
 * Never includes price, priceCurrency, or offers.
 */
export function generateProductSchema(
  product: { name: string; image: string },
  url: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    url,
  }
}

/**
 * Generates Review JSON-LD structured data with a direct reviewRating.
 * Uses bestRating: "10", worstRating: "1" scale.
 * No AggregateRating — this site publishes a single editorial review per product.
 * Never includes price, priceCurrency, or offers.
 */
export function generateReviewSchema(
  review: ReviewFrontmatter,
  rating: Rating,
  url: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: review.title,
    url,
    datePublished: review.date,
    dateModified: review.updatedDate,
    description: review.excerpt,
    author: {
      '@type': 'Person',
      name: 'Rachel Clark',
      url: 'https://clarkreviews.com/about',
    },
    itemReviewed: {
      '@type': 'Product',
      name: review.product.name,
      image: review.product.image,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: String(rating.overall),
      bestRating: '10',
      worstRating: '1',
    },
  }
}

/**
 * Generates Person JSON-LD for Rachel Clark.
 */
export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Rachel Clark',
    url: 'https://clarkreviews.com/about',
    jobTitle: 'Product Reviewer',
    sameAs: ['https://clarkreviews.com'],
  }
}

/**
 * Generates FAQPage JSON-LD structured data.
 * Moved from the FAQ client component so schema is rendered server-side.
 */
export function generateFAQSchema(
  items: { question: string; answer: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

/**
 * Generates BreadcrumbList JSON-LD structured data.
 * Moved from the Breadcrumbs component so schema is rendered in the parent server component.
 */
export function generateBreadcrumbSchema(
  items: { label: string; href?: string }[],
  siteUrl: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href
        ? { item: `${siteUrl}${item.href}` }
        : {}),
    })),
  }
}
