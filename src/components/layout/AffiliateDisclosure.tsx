import Link from 'next/link'

export function AffiliateDisclosure() {
  return (
    <aside className="bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text-muted">
      <p>
        As an Amazon Associate, I earn from qualifying purchases at no extra cost to you.{' '}
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
