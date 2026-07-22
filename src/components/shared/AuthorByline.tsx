import Link from 'next/link'
import { generatePersonSchema } from '@/lib/schema'

export function AuthorByline() {
  const personSchema = generatePersonSchema()

  return (
    <div className="text-sm text-text-muted">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />

      <span>
        By{' '}
        <Link
          href="/about"
          className="underline decoration-border underline-offset-2 hover:text-accent hover:decoration-accent transition-colors duration-200"
        >
          Rachel Clark
        </Link>
      </span>
    </div>
  )
}
