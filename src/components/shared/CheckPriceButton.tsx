export function CheckPriceButton({
  amazonUrl,
  className = '',
  mobileLabel = 'Check Price',
}: {
  amazonUrl: string
  className?: string
  mobileLabel?: string
}) {
  return (
    <a
      href={amazonUrl}
      target="_blank"
      rel="nofollow noopener sponsored"
      className={`block w-full text-center bg-accent text-white rounded-full px-3 py-2 text-sm sm:px-6 sm:py-3 sm:text-base font-semibold hover:bg-accent-hover transition-colors duration-200 ${className}`}
    >
      <span className="sm:hidden">{mobileLabel}</span>
      <span className="hidden sm:inline">Check Price on Amazon</span>
    </a>
  )
}
