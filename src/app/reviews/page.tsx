import type { Metadata } from 'next'
import { getAllReviews } from '@/lib/reviews'
import { getCategories } from '@/lib/categories'
import { ReviewsFilter } from '@/components/reviews/ReviewsFilter'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://clarkreviews.com'

export const metadata: Metadata = {
  alternates: {
    canonical: `${siteUrl}/reviews`,
  },
  title: 'All Reviews',
  description:
    'Every product Rachel Clark has researched and reviewed without the marketing fluff.',
  openGraph: {
    title: 'All Reviews | Clark Reviews',
    description:
      'Every product Rachel Clark has researched and reviewed without the marketing fluff.',
    url: '/reviews',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Reviews | Clark Reviews',
    description:
      'Every product Rachel Clark has researched and reviewed without the marketing fluff.',
  },
}

export const revalidate = 3600

export default async function ReviewsPage() {
  const allReviews = await getAllReviews()
  const categories = getCategories()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-text-primary mb-6">
        All Reviews
      </h1>

      <ReviewsFilter reviews={allReviews} categories={categories} />
    </div>
  )
}
