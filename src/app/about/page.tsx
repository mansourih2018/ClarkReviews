import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://clarkreviews.com'

export const metadata: Metadata = {
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  title: 'About Rachel Clark',
  description:
    "I'm Rachel Clark, and Clark Reviews is where I write about home, kitchen, and home-improvement products without the marketing fluff.",
  openGraph: {
    title: 'About Rachel Clark | Clark Reviews',
    description:
      "I'm Rachel Clark, and Clark Reviews is where I write about home, kitchen, and home-improvement products without the marketing fluff.",
    url: '/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Rachel Clark | Clark Reviews',
    description:
      "I'm Rachel Clark, and Clark Reviews is where I write about home, kitchen, and home-improvement products without the marketing fluff.",
  },
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col items-center mb-8">
        <Image
          src="/images/rachel-profile.webp"
          alt="Rachel Clark — Clark Reviews"
          width={160}
          height={160}
          className="rounded-full object-cover"
          priority
        />

        <h1 className="text-3xl font-bold text-text-primary mt-6 text-center">
          Rachel Clark
        </h1>

        <p className="text-base text-text-muted text-center mt-2">
          Product Reviewer &amp; Founder of Clark Reviews
        </p>
      </div>

      <div className="prose prose-lg max-w-none text-text-primary leading-relaxed space-y-4">
        <p>
          I&apos;m Rachel Clark, and Clark Reviews is where I write about
          home, kitchen, and home-improvement products without the marketing
          fluff. Every review here starts with the spec sheet and the
          manufacturer claims, then goes through every verified buyer
          complaint and return reason I can find before I&apos;ll recommend
          it.
        </p>

        <p>
          If a product doesn&apos;t hold up to that, I&apos;ll tell you, and
          I&apos;ll tell you why. I&apos;m not interested in being your
          trusted tech-savvy friend — I&apos;m interested in you not wasting
          money on something that breaks in a month.
        </p>
      </div>

      <div className="mt-10 pt-6 border-t border-border">
        <p className="text-sm text-text-muted">
          Clark Reviews earns from qualifying purchases through affiliate
          partnerships.{' '}
          <Link
            href="/affiliate-disclosure"
            className="text-accent hover:text-accent-hover transition-colors duration-200"
          >
            Read the full affiliate disclosure
          </Link>
        </p>
      </div>
    </div>
  )
}
