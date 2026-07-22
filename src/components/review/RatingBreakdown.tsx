import type { Rating } from '@/types'

const CRITERIA_LABELS: { key: keyof Omit<Rating, 'overall'>; label: string }[] = [
  { key: 'valueForMoney', label: 'Value for Money' },
  { key: 'buildQuality', label: 'Build Quality' },
  { key: 'performance', label: 'Performance' },
  { key: 'easeOfUse', label: 'Ease of Use' },
  { key: 'design', label: 'Design' },
]

export function RatingBreakdown({ rating }: { rating: Rating }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-6 mb-6">
      <h2 className="text-lg font-semibold text-text-primary mb-4">
        Rating Breakdown
      </h2>

      <div className="flex flex-col gap-3">
        {CRITERIA_LABELS.map(({ key, label }) => (
          <div key={key} className="flex items-center gap-3">
            <span className="text-sm text-text-muted w-36 shrink-0">
              {label}
            </span>

            <div
              className="flex-1 h-2.5 bg-border rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={rating[key]}
              aria-valuemin={0}
              aria-valuemax={10}
              aria-label={`${label}: ${rating[key].toFixed(1)} out of 10`}
            >
              <div
                className="h-full bg-accent rounded-full transition-all duration-500"
                style={{ width: `${rating[key] * 10}%` }}
              />
            </div>

            <span className="text-sm font-medium text-text-primary w-10 text-right">
              {rating[key].toFixed(1)}
            </span>
          </div>
        ))}

        <div className="border-t border-border pt-3 mt-1">
          <div className="flex items-center gap-3">
            <span className="text-base font-semibold text-text-primary w-36 shrink-0">
              Overall
            </span>

            <div
              className="flex-1 h-3 bg-border rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={rating.overall}
              aria-valuemin={0}
              aria-valuemax={10}
              aria-label={`Overall: ${rating.overall.toFixed(1)} out of 10`}
            >
              <div
                className="h-full bg-accent rounded-full transition-all duration-500"
                style={{ width: `${rating.overall * 10}%` }}
              />
            </div>

            <span className="text-base font-semibold text-text-primary w-10 text-right">
              {rating.overall.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
