import { CheckPriceButton } from '@/components/shared/CheckPriceButton'

export function Verdict({
  verdict,
  summary,
  amazonUrl,
}: {
  verdict: 'Buy' | 'Skip' | 'Wait for Sale'
  summary: string
  amazonUrl: string
}) {
  const verdictStyles: Record<string, string> = {
    Buy: 'bg-pro text-white',
    Skip: 'bg-con text-white',
    'Wait for Sale': 'bg-rating text-white',
  }

  return (
    <div className="bg-surface border border-border rounded-xl p-6 mb-6">
      <h2 className="text-2xl font-semibold text-text-primary mb-3">
        My Verdict
      </h2>

      <span
        className={`inline-block rounded-full px-4 py-1 font-semibold text-sm mb-3 ${verdictStyles[verdict]}`}
      >
        {verdict}
      </span>

      <p className="text-base text-text-primary leading-relaxed mb-4">
        {summary}
      </p>

      <CheckPriceButton amazonUrl={amazonUrl} mobileLabel="Check Price on Amazon" className="sm:w-auto sm:inline-block" />
    </div>
  )
}
