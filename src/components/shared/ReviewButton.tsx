import Link from 'next/link'

export function ReviewButton({
  slug,
  className = '',
}: {
  slug: string
  className?: string
}) {
  return (
    <Link
      href={`/reviews/${slug}`}
      className={`block w-full text-center bg-transparent border-2 border-accent text-accent rounded-full px-3 py-2 text-sm sm:px-6 sm:py-3 sm:text-base font-semibold hover:bg-accent hover:text-white transition-colors duration-200 ${className}`}
    >
      <span className="sm:hidden">Full Review</span>
      <span className="hidden sm:inline">Read My Full Review</span>
    </Link>
  )
}
