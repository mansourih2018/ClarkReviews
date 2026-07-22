import type { MetadataRoute } from 'next'
import { getAllReviews } from '@/lib/reviews'
import { getCategories } from '@/lib/categories'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://clarkreviews.com'

  const reviews = await getAllReviews()
  const categories = getCategories()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteUrl}/reviews`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/affiliate-disclosure`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const categoryPages: MetadataRoute.Sitemap = categories.map(
    (category) => ({
      url: `${siteUrl}/category/${category}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })
  )

  const reviewPages: MetadataRoute.Sitemap = reviews.map((review) => ({
    url: `${siteUrl}/reviews/${review.slug}`,
    lastModified: new Date(review.updatedDate || review.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...categoryPages, ...reviewPages]
}
