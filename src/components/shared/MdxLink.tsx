import Link from 'next/link'

export function MdxLink({
  href,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (!href) {
    return <span {...props}>{children}</span>
  }

  // Internal links: render with Next.js <Link>, same tab
  if (href.startsWith('/')) {
    return (
      <Link
        href={href}
        className="text-accent hover:text-accent-hover transition-colors duration-200"
      >
        {children}
      </Link>
    )
  }

  // External links: plain <a> with target="_blank" rel="noopener"
  // per on-page-seo.md Section 8 (no nofollow on editorial links)
  if (href.startsWith('http')) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener"
        className="text-accent hover:text-accent-hover transition-colors duration-200"
        {...props}
      >
        {children}
      </a>
    )
  }

  // Fallback: anchor links (#id) or other hrefs
  return (
    <a href={href} {...props}>
      {children}
    </a>
  )
}
