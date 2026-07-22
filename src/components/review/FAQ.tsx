'use client'

import { useState, useId } from 'react'

export function FAQ({
  items,
}: {
  items: { question: string; answer: string }[]
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const panelBaseId = useId()

  function toggleItem(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-text-primary mb-4">
        Frequently Asked Questions
      </h2>

      <div
        className="bg-surface border border-border rounded-xl overflow-hidden"
        role="region"
        aria-label="Frequently Asked Questions"
      >
        {items.map((item, index) => {
          const isOpen = openIndex === index
          const isLast = index === items.length - 1
          const panelId = `${panelBaseId}-panel-${index}`

          return (
            <div key={item.question}>
              <button
                type="button"
                onClick={() => toggleItem(index)}
                className={`w-full flex justify-between items-center text-left text-base font-semibold text-text-primary px-5 py-4 hover:bg-bg transition-colors duration-200 ${
                  !isLast || isOpen ? 'border-b border-border' : ''
                }`}
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span>{item.question}</span>

                <svg
                  className={`w-5 h-5 shrink-0 text-text-muted transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  className={`px-5 py-3 text-sm text-text-primary leading-relaxed ${
                    !isLast ? 'border-b border-border' : ''
                  }`}
                >
                  {item.answer}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
