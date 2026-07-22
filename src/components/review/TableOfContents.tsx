import Link from 'next/link'

export function TableOfContents({
  headings,
}: {
  headings: { id: string; title: string }[]
}) {
  if (headings.length === 0) return null

  return (
    <nav className="bg-surface border border-border rounded-lg p-4 mb-6">
      <p className="text-sm font-semibold text-text-primary mb-2">
        In This Review
      </p>

      <ul className="flex flex-col">
        {headings.map((heading) => (
          <li key={heading.id}>
            <Link
              href={`#${heading.id}`}
              className="text-sm text-accent hover:text-accent-hover block py-0.5 transition-colors duration-200"
            >
              {heading.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
