export function ProsCons({
  pros,
  cons,
}: {
  pros: string[]
  cons: string[]
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      <div className="bg-surface border border-border rounded-xl p-5">
        <h3 className="text-pro font-semibold mb-3">What I Like</h3>

        <ul className="flex flex-col gap-2">
          {pros.map((pro) => (
            <li key={pro} className="flex items-start gap-2 text-sm text-text-primary">
              <span className="text-pro shrink-0 mt-0.5" aria-hidden="true">
                ✓
              </span>
              {pro}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-surface border border-border rounded-xl p-5">
        <h3 className="text-con font-semibold mb-3">What I Don&apos;t Like</h3>

        <ul className="flex flex-col gap-2">
          {cons.map((con) => (
            <li key={con} className="flex items-start gap-2 text-sm text-text-primary">
              <span className="text-con shrink-0 mt-0.5" aria-hidden="true">
                ✗
              </span>
              {con}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
