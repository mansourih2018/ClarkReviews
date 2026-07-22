'use client'

import { useState } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Reviews', href: '/reviews' },
  { label: 'Storage', href: '/category/storage' },
  { label: 'Organization', href: '/category/organization' },
  { label: 'Cleaning', href: '/category/cleaning' },
  { label: 'Air Fryers', href: '/category/air-fryers' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-surface border-b border-border sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="font-bold text-text-primary text-xl tracking-tight"
          >
            Clark Reviews
          </Link>

          {/* Desktop nav — unchanged */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-muted hover:text-accent transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Hamburger button — mobile only */}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="flex md:hidden items-center justify-center w-10 h-10 rounded-lg text-text-primary hover:bg-bg transition-colors duration-200"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown panel */}
      {open && (
        <nav className="md:hidden bg-surface border-b border-border">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block w-full text-text-primary py-3 px-4 hover:bg-bg transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
