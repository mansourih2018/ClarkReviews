'use client'

import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h1 className="text-2xl font-bold text-text-primary">
        Something Went Wrong
      </h1>

      <p className="text-base text-text-muted mt-2">
        Something broke on our end. Try again, or head back home.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-block text-center bg-accent text-white rounded-full px-6 py-3 text-base font-semibold hover:bg-accent-hover transition-colors duration-200"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="inline-block text-center bg-transparent border-2 border-accent text-accent rounded-full px-6 py-3 text-base font-semibold hover:bg-accent hover:text-white transition-colors duration-200"
        >
          Back to Homepage
        </Link>
      </div>

      {process.env.NODE_ENV === 'development' && (
        <pre className="mt-8 text-left text-xs font-mono text-con bg-surface border border-border rounded-lg p-4 overflow-x-auto">
          {error.message}
        </pre>
      )}
    </div>
  )
}
