import Link from 'next/link'
import type { Metadata } from 'next'
import { getCategories } from '@/lib/categories'
import { CATEGORY_LABELS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description:
    "The page you're looking for doesn't exist. Browse our home & kitchen reviews instead.",
}

export default function NotFound() {
  const categories = getCategories()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      {/* Visual marker */}
      <p className="text-6xl font-bold text-accent">404</p>

      {/* Heading */}
      <h1 className="text-2xl font-bold text-text-primary mt-4">
        Page Not Found
      </h1>

      {/* Rachel-voice subtext */}
      <p className="text-base text-text-muted mt-2">
        That page doesn&apos;t exist, or it&apos;s moved.
      </p>

      {/* Navigation buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <Link
          href="/"
          className="inline-block text-center bg-accent text-white rounded-full px-6 py-3 text-base font-semibold hover:bg-accent-hover transition-colors duration-200"
        >
          Back to Homepage
        </Link>
        <Link
          href="/reviews"
          className="inline-block text-center bg-transparent border-2 border-accent text-accent rounded-full px-6 py-3 text-base font-semibold hover:bg-accent hover:text-white transition-colors duration-200"
        >
          Browse All Reviews
        </Link>
      </div>

      {/* Browse by Category */}
      <div className="mt-12">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/category/${category}`}
              className="bg-bg border border-border rounded-xl p-5 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <span className="font-semibold text-text-primary text-base">
                {CATEGORY_LABELS[category]}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
