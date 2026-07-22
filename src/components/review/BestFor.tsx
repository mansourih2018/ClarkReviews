export function BestFor({
  bestFor,
  wrongFor,
}: {
  bestFor: string[]
  wrongFor: string[]
}) {
  return (
    <div className="bg-surface border border-border rounded-xl p-5 mb-6">
      <h3 className="text-pro font-semibold mb-2">Best For</h3>

      <ul className="flex flex-col gap-1.5">
        {bestFor.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm text-text-primary"
          >
            <span className="text-pro shrink-0 mt-0.5" aria-hidden="true">
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>

      <h3 className="text-con font-semibold mb-2 mt-4">Not Ideal For</h3>

      <ul className="flex flex-col gap-1.5">
        {wrongFor.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm text-text-primary"
          >
            <span className="text-con shrink-0 mt-0.5" aria-hidden="true">
              ✗
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
