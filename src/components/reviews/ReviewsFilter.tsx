'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { StarRating } from '@/components/shared/StarRating'
import { ReviewButton } from '@/components/shared/ReviewButton'
import type { ReviewFrontmatter, Category } from '@/types'
import { CATEGORY_LABELS } from '@/lib/constants'

export function ReviewsFilter({
  reviews,
  categories,
}: {
  reviews: ReviewFrontmatter[]
  categories: Category[]
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = activeCategory
    ? reviews.filter((r) => r.category === activeCategory)
    : reviews

  return (
    <>
      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
            !activeCategory
              ? 'bg-accent text-white'
              : 'bg-surface border border-border text-text-muted hover:text-accent'
          }`}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            type="button"
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
              activeCategory === category
                ? 'bg-accent text-white'
                : 'bg-surface border border-border text-text-muted hover:text-accent'
            }`}
          >
            {CATEGORY_LABELS[category]}
          </button>
        ))}
      </div>

      {/* Review cards grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((review) => (
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
    </>
  )
}
