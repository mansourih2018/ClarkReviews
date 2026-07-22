import Image from 'next/image'
import Link from 'next/link'

export function HeroBio() {
  return (
    <section className="flex flex-col items-center py-10 px-4">
      <Image
        src="/images/rachel-profile.webp"
        alt="Rachel Clark — Clark Reviews"
        width={160}
        height={160}
        className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover mx-auto ring-[3px] ring-accent ring-offset-2 ring-offset-bg"
        priority
        fetchPriority="high"
        sizes="(max-width: 640px) 128px, 160px"
      />

      <h1 className="text-2xl font-bold text-text-primary mt-4 text-center">
        Rachel Clark
      </h1>

      <p className="text-base text-text-muted text-center mt-1">
        Honest home &amp; kitchen reviews — no fluff, no hype.
      </p>

      <p className="text-xs text-text-muted text-center mt-1">
        I earn from qualifying purchases via{' '}
        <Link
          href="/affiliate-disclosure"
          className="text-accent hover:text-accent-hover transition-colors duration-200"
        >
          Amazon Associates and CJ Affiliate
        </Link>
        .
      </p>
    </section>
  )
}
