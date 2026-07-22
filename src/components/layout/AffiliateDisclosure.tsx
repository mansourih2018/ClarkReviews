import Link from 'next/link'

export function AffiliateDisclosure() {
  return (
    <aside className="bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text-muted">
      <p>
        As an Amazon Associate and CJ Affiliate partner, I earn from
        qualifying purchases. This means I may receive a small commission if
        you click my links and buy something — at no extra cost to you. I
        only recommend products I&apos;ve genuinely researched and believe in.{' '}
        <Link
          href="/affiliate-disclosure"
          className="underline decoration-border underline-offset-2 hover:text-accent hover:decoration-accent transition-colors duration-200"
        >
          Full disclosure
        </Link>
      </p>
    </aside>
  )
}
