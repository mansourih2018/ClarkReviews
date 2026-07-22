import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Clark Reviews — Honest Home & Kitchen Product Reviews',
    template: '%s | Clark Reviews',
  },
  description:
    'Honest home & kitchen reviews — no fluff, no hype.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://clarkreviews.com'
  ),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://clarkreviews.com',
    siteName: 'Clark Reviews',
    title: 'Clark Reviews — Honest Home & Kitchen Product Reviews',
    description: 'Honest home & kitchen reviews — no fluff, no hype.',
    // NOTE: Site-wide OG image is missing from public/images/. Once Rachel creates it, add it here:
    // images: [{ url: '/images/default-og.webp', width: 1200, height: 630, alt: 'Clark Reviews' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clark Reviews — Honest Home & Kitchen Product Reviews',
    description: 'Honest home & kitchen reviews — no fluff, no hype.',
    // images: ['/images/default-og.webp']
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA4_ID

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-text-primary font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  )
}

