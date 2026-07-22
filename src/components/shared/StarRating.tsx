'use client'

import { useId } from 'react'

export function StarRating({
  rating,
  max = 10,
}: {
  rating: number
  max?: number
}) {
  const gradientId = useId()
  const starCount = 5
  const normalizedRating = (rating / max) * starCount
  const fullStars = Math.floor(normalizedRating)
  const fractionalPart = normalizedRating - fullStars
  const hasHalfStar = fractionalPart >= 0.25 && fractionalPart < 0.75
  const adjustedFullStars =
    fractionalPart >= 0.75 ? fullStars + 1 : fullStars
  const emptyStars =
    starCount - adjustedFullStars - (hasHalfStar ? 1 : 0)

  return (
    <div
      className="flex items-center gap-2"
      role="img"
      aria-label={`Rated ${rating.toFixed(1)} out of ${max}`}
    >
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: adjustedFullStars }, (_, i) => (
          <svg
            key={`full-${i}`}
            className="w-5 h-5 text-rating"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}

        {hasHalfStar && (
          <svg
            key="half"
            className="w-5 h-5"
            viewBox="0 0 20 20"
          >
            <defs>
              <linearGradient id={gradientId}>
                <stop offset="50%" className="text-rating" stopColor="currentColor" />
                <stop offset="50%" className="text-border" stopColor="currentColor" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#${gradientId})`}
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        )}

        {Array.from({ length: emptyStars }, (_, i) => (
          <svg
            key={`empty-${i}`}
            className="w-5 h-5 text-border"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      <span className="text-sm font-semibold text-text-primary">
        {rating.toFixed(1)} / {max}
      </span>
    </div>
  )
}
