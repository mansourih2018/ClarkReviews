import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import jsyaml from 'js-yaml'
import type { ReviewFrontmatter } from '@/types'

const matterEngineOptions = {
  engines: {
    yaml: {
      parse: (str: string) => jsyaml.load(str) as object,
      stringify: (obj: object) => jsyaml.dump(obj),
    },
  },
}
import { compileMDX } from 'next-mdx-remote/rsc'
import type { ReactElement } from 'react'
import { MdxImage } from '@/components/shared/MdxImage'
import { MdxLink } from '@/components/shared/MdxLink'

const REVIEWS_DIR = path.join(process.cwd(), 'content', 'reviews')

const mdxComponents = {
  img: MdxImage,
  a: MdxLink,
}

const VALID_CATEGORIES = new Set(['storage', 'organization', 'cleaning', 'air-fryers', 'home-improvement'])
const VALID_VERDICTS = new Set(['Buy', 'Skip', 'Wait for Sale'])
const RATING_KEYS = ['valueForMoney', 'buildQuality', 'performance', 'easeOfUse', 'design', 'overall']

/**
 * Normalizes gray-matter parsed data so date fields are YYYY-MM-DD strings.
 * gray-matter's default js-yaml engine parses bare YAML dates (e.g. 2026-07-31)
 * as JavaScript Date objects. validateReviewFrontmatter expects strings, matching
 * the shape that compileMDX (via vfile-matter) produces.
 */
function normalizeFrontmatterDates(data: Record<string, unknown>): Record<string, unknown> {
  const dateKeys = ['date', 'updatedDate']
  for (const key of dateKeys) {
    if (data[key] instanceof Date) {
      data[key] = (data[key] as Date).toISOString().split('T')[0]
    }
  }
  return data
}

/**
 * Validates review frontmatter at runtime, matching the ReviewFrontmatter interface.
 * Returns the typed frontmatter if valid, or null with a console warning listing
 * every malformed/missing field.
 */
function validateReviewFrontmatter(
  frontmatter: unknown,
  filename: string
): ReviewFrontmatter | null {
  const errors: string[] = []
  const fm = frontmatter as Record<string, unknown>

  if (!fm || typeof fm !== 'object') {
    console.warn(`[reviews] ${filename} — frontmatter is not an object. Skipping.`)
    return null
  }

  // --- Top-level strings ---
  const requiredStrings = [
    'title', 'slug', 'date', 'updatedDate', 'category',
    'excerpt', 'targetKeyword', 'ogImage',
  ]
  for (const key of requiredStrings) {
    if (typeof fm[key] !== 'string' || (fm[key] as string).length === 0) {
      errors.push(`"${key}" must be a non-empty string`)
    }
  }

  // --- Category value ---
  if (typeof fm.category === 'string' && !VALID_CATEGORIES.has(fm.category)) {
    errors.push(`"category" must be one of ${[...VALID_CATEGORIES].join(', ')}, got "${fm.category}"`)
  }

  // --- secondaryKeywords (array of strings) ---
  if (!Array.isArray(fm.secondaryKeywords)) {
    errors.push('"secondaryKeywords" must be an array')
  }

  // --- product (object with 4 string fields) ---
  if (!fm.product || typeof fm.product !== 'object') {
    errors.push('"product" must be an object')
  } else {
    const prod = fm.product as Record<string, unknown>
    for (const key of ['name', 'image', 'amazonUrl', 'cjUrl']) {
      if (typeof prod[key] !== 'string') {
        errors.push(`"product.${key}" must be a string`)
      }
    }
  }

  // --- rating (object with 6 number fields) ---
  if (!fm.rating || typeof fm.rating !== 'object') {
    errors.push('"rating" must be an object')
  } else {
    const rating = fm.rating as Record<string, unknown>
    for (const key of RATING_KEYS) {
      if (typeof rating[key] !== 'number') {
        errors.push(`"rating.${key}" must be a number`)
      }
    }
  }

  // --- Arrays with minimum lengths (per GEMINI.md Section 8) ---
  const arrayChecks: Array<{ key: string; min: number }> = [
    { key: 'pros', min: 1 },
    { key: 'cons', min: 2 },
    { key: 'bestFor', min: 1 },
    { key: 'wrongFor', min: 1 },
    { key: 'compareProducts', min: 2 },
    { key: 'faq', min: 4 },
  ]
  for (const { key, min } of arrayChecks) {
    if (!Array.isArray(fm[key])) {
      errors.push(`"${key}" must be an array`)
    } else if ((fm[key] as unknown[]).length < min) {
      errors.push(`"${key}" must have at least ${min} entries, got ${(fm[key] as unknown[]).length}`)
    }
  }

  // --- compareProducts structure ---
  if (Array.isArray(fm.compareProducts)) {
    for (let i = 0; i < (fm.compareProducts as unknown[]).length; i++) {
      const cp = (fm.compareProducts as Record<string, unknown>[])[i]
      if (!cp || typeof cp.name !== 'string' || typeof cp.slug !== 'string') {
        errors.push(`"compareProducts[${i}]" must have "name" and "slug" strings`)
      }
    }
  }

  // --- faq structure ---
  if (Array.isArray(fm.faq)) {
    for (let i = 0; i < (fm.faq as unknown[]).length; i++) {
      const item = (fm.faq as Record<string, unknown>[])[i]
      if (!item || typeof item.question !== 'string' || typeof item.answer !== 'string') {
        errors.push(`"faq[${i}]" must have "question" and "answer" strings`)
      }
    }
  }

  // --- verdict ---
  if (typeof fm.verdict !== 'string' || !VALID_VERDICTS.has(fm.verdict)) {
    errors.push(`"verdict" must be one of ${[...VALID_VERDICTS].join(', ')}, got "${String(fm.verdict)}"`)
  }

  // --- featured ---
  if (typeof fm.featured !== 'boolean') {
    errors.push('"featured" must be a boolean')
  }

  if (errors.length > 0) {
    console.warn(
      `[reviews] ${filename} — frontmatter validation failed:\n  • ${errors.join('\n  • ')}`
    )
    return null
  }

  return fm as unknown as ReviewFrontmatter
}

export async function getAllReviews(): Promise<ReviewFrontmatter[]> {
  const files = await fs.readdir(REVIEWS_DIR)

  const mdxFiles = files.filter(
    (file) => file.endsWith('.mdx') && file !== '_template.mdx'
  )

  const results = await Promise.all(
    mdxFiles.map(async (file) => {
      try {
        const filePath = path.join(REVIEWS_DIR, file)
        const source = await fs.readFile(filePath, 'utf-8')

        const { data } = matter(source, matterEngineOptions)
        const normalized = normalizeFrontmatterDates(data)

        return validateReviewFrontmatter(normalized, file)
      } catch (error) {
        console.warn(
          `[reviews] Failed to parse ${file} — skipping. Error: ${error instanceof Error ? error.message : String(error)}`
        )
        return null
      }
    })
  )

  return results
    .filter((review): review is ReviewFrontmatter => review !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getReviewBySlug(
  slug: string
): Promise<{
  frontmatter: ReviewFrontmatter
  content: ReactElement
} | null> {
  try {
    const filePath = path.join(REVIEWS_DIR, `${slug}.mdx`)
    const source = await fs.readFile(filePath, 'utf-8')

    const { frontmatter, content } = await compileMDX<ReviewFrontmatter>({
      source,
      components: mdxComponents,
      options: { parseFrontmatter: true },
    })

    const validated = validateReviewFrontmatter(frontmatter, `${slug}.mdx`)
    if (!validated) {
      return null
    }

    return { frontmatter: validated, content }
  } catch (error) {
    console.warn(
      `[reviews] Failed to load review "${slug}". Error: ${error instanceof Error ? error.message : String(error)}`
    )
    return null
  }
}
