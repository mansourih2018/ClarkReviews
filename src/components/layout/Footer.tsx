import Link from 'next/link'

const FOOTER_LINKS = [
  { label: 'Reviews', href: '/reviews' },
  { label: 'About', href: '/about' },
  { label: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
]

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border text-sm text-text-muted py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-semibold text-text-primary">
            Clark Reviews
          </span>

          <nav className="flex items-center gap-4">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  link.href === '/affiliate-disclosure'
                    ? 'text-accent hover:text-accent-hover transition-colors duration-200'
                    : 'hover:text-accent transition-colors duration-200'
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-6 text-center text-text-muted">
          &copy; {new Date().getFullYear()} Clark Reviews. All rights
          reserved.
        </div>
      </div>
    </footer>
  )
}
