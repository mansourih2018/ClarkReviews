import Link from 'next/link'

export function ComparisonTable({
  current,
  alternatives,
}: {
  current: { name: string; slug: string }
  alternatives: { name: string; slug: string }[]
}) {
  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden mb-6">
      <h3 className="text-lg font-semibold text-text-primary px-4 pt-5 pb-3">
        How It Compares
      </h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="bg-surface border-b border-border">
            <th className="font-semibold text-text-muted text-left px-4 py-2">
              Product Name
            </th>
            <th className="font-semibold text-text-muted text-left px-4 py-2">
              Our Review
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className="bg-accent/5 border-l-2 border-accent">
            <td className="px-4 py-3 border-b border-border font-medium text-text-primary">
              {current.name}{' '}
              <span className="text-text-muted text-xs">(This Review)</span>
            </td>
            <td className="px-4 py-3 border-b border-border text-text-muted">
              You&apos;re reading it
            </td>
          </tr>

          {alternatives.map((alt) => (
            <tr key={alt.slug || alt.name}>
              <td className="px-4 py-3 border-b border-border text-text-primary">
                {alt.name}
              </td>
              <td className="px-4 py-3 border-b border-border">
                {alt.slug ? (
                  <Link
                    href={`/reviews/${alt.slug}`}
                    className="text-accent hover:text-accent-hover transition-colors duration-200"
                  >
                    Read Review
                  </Link>
                ) : (
                  <span className="text-text-muted">Coming Soon</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
