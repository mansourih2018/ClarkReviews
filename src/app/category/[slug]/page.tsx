import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCategories } from '@/lib/categories'
import { getAllReviews } from '@/lib/reviews'
import { StarRating } from '@/components/shared/StarRating'
import { ReviewButton } from '@/components/shared/ReviewButton'
import type { Category } from '@/types'
import { CATEGORY_LABELS } from '@/lib/constants'

const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  storage:
    'Finding the right storage solution means matching capacity, material durability, and dimensions to your specific space. These reviews break down verified specs and buyer feedback for containers, bins, and shelving systems.',
  organization:
    'Effective organization products need to balance function with the reality of daily use. These reviews examine build quality, real-world capacity, and buyer satisfaction data for organizers, drawer systems, and sorting solutions.',
  cleaning:
    'A good cleaning product should perform as well as the manufacturer claims. These reviews compare stated cleaning power against verified buyer results for vacuums, mops, and cleaning tools.',
  'air-fryers':
    'Air fryer performance varies significantly by wattage, basket size, and cooking element design. These reviews analyze manufacturer specs against verified buyer cooking results, durability data, and ease-of-maintenance reports.',
}

export const revalidate = 3600

export async function generateStaticParams() {
  const categories = getCategories()
  return categories.map((slug) => ({ slug }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await props.params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://clarkreviews.com'
  const categories = getCategories()

  if (!categories.includes(slug as Category)) {
    return { title: 'Category Not Found' }
  }

  const category = slug as Category
  const label = CATEGORY_LABELS[category] || slug
  const title = `${label} Reviews`
  const description =
    CATEGORY_DESCRIPTIONS[category] ||
    `Research-based ${label.toLowerCase()} product reviews by Rachel Clark.`

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/category/${slug}`,
    },
    openGraph: {
      title: `${title} | Clark Reviews`,
      description,
      url: `/category/${slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Clark Reviews`,
      description,
    },
  }
}

export default async function CategoryPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const categories = getCategories()

  if (!categories.includes(slug as Category)) {
    notFound()
  }

  const category = slug as Category
  const label = CATEGORY_LABELS[category] || slug
  const description = CATEGORY_DESCRIPTIONS[category]

  const allReviews = await getAllReviews()
  const categoryReviews = allReviews.filter(
    (review) => review.category === category
  )

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-text-primary mb-3">
        {label} Reviews
      </h1>

      {description && (
        <p className="text-base text-text-muted leading-relaxed mb-8 max-w-3xl">
          {description}
        </p>
      )}

      {categoryReviews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryReviews.map((review) => (
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
        <div className="text-center py-12">
          <p className="text-text-muted mb-4">
            No {label.toLowerCase()} reviews published yet — check back
            soon.
          </p>
          <Link
            href="/reviews"
            className="text-accent hover:text-accent-hover font-semibold transition-colors duration-200"
          >
            Browse all reviews &rarr;
          </Link>
        </div>
      )}
    </div>
  )
}
