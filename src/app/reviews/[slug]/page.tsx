import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getReviewBySlug, getAllReviews } from '@/lib/reviews'
import {
  generateProductSchema,
  generateReviewSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from '@/lib/schema'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { AuthorByline } from '@/components/shared/AuthorByline'
import { AffiliateDisclosure } from '@/components/layout/AffiliateDisclosure'
import { TableOfContents } from '@/components/review/TableOfContents'
import { QuickVerdict } from '@/components/review/QuickVerdict'
import { RatingBreakdown } from '@/components/review/RatingBreakdown'
import { ProsCons } from '@/components/review/ProsCons'
import { BestFor } from '@/components/review/BestFor'
import { ComparisonTable } from '@/components/review/ComparisonTable'
import { Verdict } from '@/components/review/Verdict'
import { FAQ } from '@/components/review/FAQ'
import { CATEGORY_LABELS } from '@/lib/constants'


/** Fixed section anchors matching the page layout order */
const REVIEW_SECTIONS = [
  { id: 'quick-verdict', title: 'Quick Verdict' },
  { id: 'rating-breakdown', title: 'Rating Breakdown' },
  { id: 'introduction', title: 'Introduction' },
  { id: 'pros-cons', title: 'Pros & Cons' },
  { id: 'best-for', title: 'Best For' },
  { id: 'comparison', title: 'How It Compares' },
  { id: 'verdict', title: 'Final Verdict' },
  { id: 'faq', title: 'Frequently Asked Questions' },
]

export const revalidate = 3600

export async function generateStaticParams() {
  const reviews = await getAllReviews()
  return reviews.map((review) => ({ slug: review.slug }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await props.params
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://clarkreviews.com'

  const review = await getReviewBySlug(slug)

  if (!review) {
    return { title: 'Review Not Found' }
  }

  const { frontmatter } = review

  return {
    title: frontmatter.title,
    description: frontmatter.excerpt,
    alternates: {
      canonical: `${siteUrl}/reviews/${frontmatter.slug}`,
    },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.excerpt,
      url: `${siteUrl}/reviews/${frontmatter.slug}`,
      type: 'article',
      images: [
        {
          url: frontmatter.ogImage,
          width: 1200,
          height: 630,
          alt: frontmatter.product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.excerpt,
      images: [frontmatter.ogImage],
    },
  }
}

export default async function ReviewPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://clarkreviews.com'

  const review = await getReviewBySlug(slug)

  if (!review) {
    notFound()
  }

  const { frontmatter, content } = review

  const categoryLabel =
    CATEGORY_LABELS[frontmatter.category] || frontmatter.category
  const reviewUrl = `${siteUrl}/reviews/${frontmatter.slug}`

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: categoryLabel, href: `/category/${frontmatter.category}` },
    { label: frontmatter.product.name },
  ]

  const productSchema = generateProductSchema(
    { name: frontmatter.product.name, image: frontmatter.product.image },
    reviewUrl
  )
  const reviewSchema = generateReviewSchema(
    frontmatter,
    frontmatter.rating,
    reviewUrl
  )
  const faqSchema = generateFAQSchema(frontmatter.faq)
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems, siteUrl)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(reviewSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* 1. Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* 2. Affiliate Disclosure */}
      <div className="mt-4">
        <AffiliateDisclosure />
      </div>

      {/* 3. H1 */}
      <h1 className="text-3xl font-bold text-text-primary mt-6 mb-2">
        {frontmatter.title}
      </h1>

      {/* 4. Hero Image */}
      <Image
        src={frontmatter.ogImage}
        width={1200}
        height={630}
        alt={`${frontmatter.product.name} — Clark Reviews`}
        className="w-full h-auto rounded-xl my-6 object-cover"
        priority
      />

      {/* 5. Author Byline */}
      <div className="mb-6">
        <AuthorByline />
      </div>

      {/* 6. Table of Contents */}
      <TableOfContents headings={REVIEW_SECTIONS} />

      {/* 7. Quick Verdict */}
      <div id="quick-verdict">
        <QuickVerdict
          rating={frontmatter.rating.overall}
          verdict={frontmatter.verdict}
          amazonUrl={frontmatter.product.amazonUrl}
        />
      </div>

      {/* 8. Rating Breakdown */}
      <div id="rating-breakdown">
        <RatingBreakdown rating={frontmatter.rating} />
      </div>

      {/* 9. MDX Content (Introduction + prose) */}
      <article
        id="introduction"
        className="prose prose-lg max-w-none text-text-primary mb-6 [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-text-primary [&>h2]:mt-8 [&>h2]:mb-4 [&>p]:leading-relaxed [&>p]:mb-4"
      >
        {content}
      </article>

      {/* 10. Pros & Cons */}
      <div id="pros-cons">
        <ProsCons pros={frontmatter.pros} cons={frontmatter.cons} />
      </div>

      {/* 11. Best For */}
      <div id="best-for">
        <BestFor
          bestFor={frontmatter.bestFor}
          wrongFor={frontmatter.wrongFor}
        />
      </div>

      {/* 12. Comparison Table */}
      <div id="comparison">
        <ComparisonTable
          current={{
            name: frontmatter.product.name,
            slug: frontmatter.slug,
          }}
          alternatives={frontmatter.compareProducts}
        />
      </div>

      {/* 13. Verdict */}
      <div id="verdict">
        <Verdict
          verdict={frontmatter.verdict}
          summary={frontmatter.excerpt}
          amazonUrl={frontmatter.product.amazonUrl}
        />
      </div>

      {/* 14. FAQ */}
      <div id="faq">
        <FAQ items={frontmatter.faq} />
      </div>
    </div>
  )
}
