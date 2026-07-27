import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { HeroBio } from '@/components/home/HeroBio'
import { ProductCard } from '@/components/home/ProductCard'
import { getFeaturedProducts } from '@/lib/products'
import { getAllReviews } from '@/lib/reviews'
import { getCategories } from '@/lib/categories'
import { CATEGORY_LABELS } from '@/lib/constants'
import { StarRating } from '@/components/shared/StarRating'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://clarkreviews.com'

export const metadata: Metadata = {
  alternates: {
    canonical: siteUrl,
  },
}

export const revalidate = 3600

export default async function HomePage() {
  const featuredProducts = getFeaturedProducts()
  const reviews = await getAllReviews()
  const categories = getCategories()
  const latestReviews = reviews.slice(0, 3)

  // Build a slug → overall rating map so ProductCard can show rating badges
  const ratingBySlug = new Map<string, number>()
  for (const review of reviews) {
    ratingBySlug.set(review.slug, review.rating.overall)
  }

  return (
    <div>
      {/* Zone 1 — Above the fold (link-in-bio) */}
      <HeroBio />

      <section className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 pb-12">
        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} priority={index < 2} rating={ratingBySlug.get(product.slug)} />
            ))}
          </div>
        ) : (
          <p className="text-center text-text-muted py-12">
            Reviews coming soon
          </p>
        )}
      </section>

      {/* Zone 2 — Below the fold (SEO) */}
      <div className="py-12">

        {/* Latest Reviews */}
        {latestReviews.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="w-12 h-1 bg-accent rounded-full mb-3" />
            <h2 className="text-2xl font-bold text-text-primary mb-6">
              Latest Reviews
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {latestReviews.map((review) => (
                <Link
                  key={review.slug}
                  href={`/reviews/${review.slug}`}
                  className="bg-surface border border-border rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Image
                    src={review.ogImage}
                    alt={`${review.product.name} — Clark Reviews`}
                    width={1200}
                    height={630}
                    className="w-full aspect-[1200/630] object-cover rounded-t-xl"
                  />
                  <div className="p-5">
                    <StarRating rating={review.rating.overall} />
                    <h3 className="font-semibold text-text-primary text-base mt-2 mb-1 line-clamp-2">
                      {review.product.name}
                    </h3>
                    <p className="text-sm text-text-muted line-clamp-2">
                      {review.excerpt}
                    </p>
                    <span className="inline-block mt-3 bg-accent text-white rounded-full px-4 py-2 text-sm font-semibold hover:bg-accent-hover transition-colors duration-200">
                      Read review &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Browse by Category */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="w-12 h-1 bg-accent rounded-full mb-3" />
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Browse by Category
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/category/${category}`}
                className="bg-surface border border-border rounded-xl p-5 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <span className="font-semibold text-text-primary text-base">
                  {CATEGORY_LABELS[category]}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* See all reviews */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 text-center">
          <Link
            href="/reviews"
            className="inline-block bg-accent text-white rounded-full px-6 py-3 text-base font-semibold hover:bg-accent-hover transition-colors duration-200"
          >
            See all reviews &rarr;
          </Link>
        </div>

      </div>
    </div>
  )
}
