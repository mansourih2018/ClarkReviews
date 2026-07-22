import Image from 'next/image'
import type { Product } from '@/types'
import { ReviewButton } from '@/components/shared/ReviewButton'
import { CheckPriceButton } from '@/components/shared/CheckPriceButton'
import { CATEGORY_LABELS } from '@/lib/constants'

export function ProductCard({ product, priority = false, rating }: { product: Product; priority?: boolean; rating?: number }) {
  return (
    <div className="group bg-surface rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="relative">
        <Image
          src={product.image}
          alt={`${product.name} — Clark Reviews`}
          width={600}
          height={600}
          className="w-full aspect-square object-cover rounded-t-xl"
          priority={priority}
        />
        {rating !== undefined && (
          <span className="absolute top-2 right-2 bg-surface/90 backdrop-blur-sm text-rating font-bold text-sm rounded-full px-2 py-1">
            {rating.toFixed(1)}/10
          </span>
        )}
      </div>


      <span className="bg-bg text-text-muted text-xs font-medium px-2 py-0.5 rounded-full inline-block mx-2 mt-2 sm:mx-4 sm:mt-3 mb-1">
        {CATEGORY_LABELS[product.category]}
      </span>

      <p
        className="font-semibold text-sm sm:text-base text-text-primary px-2 sm:px-4 pb-2 leading-5 sm:leading-6 min-h-[2.3rem] sm:min-h-[4.3rem] max-h-[2.3rem] sm:max-h-[4.3rem] overflow-hidden box-content"
        title={product.name}
      >
        {product.name}
      </p>

      <div className="px-2 sm:px-4 flex flex-col gap-2 pb-4">
        <ReviewButton slug={product.slug} />
        <CheckPriceButton amazonUrl={product.amazonUrl} />
      </div>
    </div>
  )
}
