import { StarRating } from '@/components/shared/StarRating'
import { CheckPriceButton } from '@/components/shared/CheckPriceButton'

export function QuickVerdict({
  rating,
  verdict,
  amazonUrl,
}: {
  rating: number
  verdict: 'Buy' | 'Skip' | 'Wait for Sale'
  amazonUrl: string
}) {
  const verdictStyles: Record<string, string> = {
    Buy: 'bg-pro text-white',
    Skip: 'bg-con text-white',
    'Wait for Sale': 'bg-rating text-white',
  }

  return (
    <div className="bg-surface border border-border rounded-xl p-6 mb-6 flex flex-col sm:flex-row items-center gap-4">
      <div className="flex flex-col items-center sm:items-start gap-2">
        <StarRating rating={rating} />

        <span
          className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${verdictStyles[verdict]}`}
        >
          {verdict}
        </span>
      </div>

      <div className="sm:ml-auto w-full sm:w-auto sm:min-w-48">
        <CheckPriceButton amazonUrl={amazonUrl} mobileLabel="Check Price on Amazon" />
      </div>
    </div>
  )
}
