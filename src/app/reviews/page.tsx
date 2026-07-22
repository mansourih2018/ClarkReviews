import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllReviews } from '@/lib/reviews'
import { getCategories } from '@/lib/categories'
import { StarRating } from '@/components/shared/StarRating'
import { ReviewButton } from '@/components/shared/ReviewButton'
import type { Category } from '@/types'
import { CATEGORY_LABELS } from '@/lib/constants'

export const metadata: Metadata = {
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

export default async function ReviewsPage(props: {
  searchParams: Promise<{ category?: string }>
}) {
  const searchParams = await props.searchParams
  const activeCategory = searchParams.category || null
  const allReviews = await getAllReviews()
  const categories = getCategories()

  const reviews = activeCategory
    ? allReviews.filter((r) => r.category === activeCategory)
    : allReviews

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-text-primary mb-6">
        All Reviews
      </h1>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/reviews"
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
            !activeCategory
              ? 'bg-accent text-white'
              : 'bg-surface border border-border text-text-muted hover:text-accent'
          }`}
        >
          All
        </Link>

        {categories.map((category) => (
          <Link
            key={category}
            href={`/reviews?category=${category}`}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
              activeCategory === category
                ? 'bg-accent text-white'
                : 'bg-surface border border-border text-text-muted hover:text-accent'
            }`}
          >
            {CATEGORY_LABELS[category]}
          </Link>
        ))}
      </div>

      {/* Review cards grid */}
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review) => (
            <div
              key={review.slug}
              className="bg-surface border border-border rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <Image
                src={review.product.image}
                alt={`${review.product.name} — Clark Reviews`}
                width={600}
                height={600}
                className="w-full aspect-square object-cover"
              />

              <div className="p-4">
                <h2 className="font-semibold text-text-primary text-base mb-2">
                  {review.product.name}
                </h2>

                <div className="mb-2">
                  <StarRating rating={review.rating.overall} />
                </div>

                <p className="text-sm text-text-muted line-clamp-2 mb-3">
                  {review.excerpt}
                </p>

                <ReviewButton slug={review.slug} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-text-muted py-12">
          No reviews published yet — check back soon.
        </p>
      )}
    </div>
  )
}
