import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://clarkreviews.com'

export const metadata: Metadata = {
  alternates: {
    canonical: `${siteUrl}/affiliate-disclosure`,
  },
  title: 'Affiliate Disclosure',
  description:
    "How Clark Reviews earns money and why it doesn't affect our recommendations.",
  openGraph: {
    title: 'Affiliate Disclosure | Clark Reviews',
    description:
      "How Clark Reviews earns money and why it doesn't affect our recommendations.",
    url: '/affiliate-disclosure',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Affiliate Disclosure | Clark Reviews',
    description:
      "How Clark Reviews earns money and why it doesn't affect our recommendations.",
  },
}

export default function AffiliateDisclosurePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-text-primary mb-6">
        Affiliate Disclosure
      </h1>

      <div className="text-base text-text-primary leading-relaxed space-y-4">
        <p>
          Clark Reviews is a participant in the Amazon Services LLC
          Associates Program, an affiliate advertising program designed to
          provide a means for sites to earn advertising fees by advertising
          and linking to Amazon.com. Clark Reviews is also a member of the CJ
          Affiliate network.
        </p>

        <p>
          As an Amazon Associate and CJ Affiliate partner, I earn from
          qualifying purchases. This means I may receive a small commission
          if you click my links and buy something — at no extra cost to you.
          The price you pay is exactly the same whether you use my link or go
          directly to the retailer. Affiliate partnerships never influence
          which products I recommend, how I rate them, or what I write in my
          reviews.
        </p>

        <p>
          I only recommend products I&apos;ve genuinely researched and
          believe in. Every review on this site is based on manufacturer
          specs, verified buyer data, and independent research — not on
          which products pay the highest commissions. If a product
          doesn&apos;t hold up to scrutiny, I&apos;ll tell you, regardless
          of any affiliate relationship. Your trust matters more than any
          commission.
        </p>
      </div>
    </div>
  )
}
