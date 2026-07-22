import type { Product, Category } from '@/types'
import productsData from '../../data/products.json'

const VALID_CATEGORIES: ReadonlySet<string> = new Set<Category>([
  'storage',
  'organization',
  'cleaning',
  'air-fryers',
])

/**
 * Validates a single product entry from products.json at runtime.
 * Returns the product if valid, or null with a console warning if malformed.
 */
function validateProduct(
  entry: Record<string, unknown>,
  index: number
): Product | null {
  const required: Array<{ key: string; type: string }> = [
    { key: 'id', type: 'string' },
    { key: 'name', type: 'string' },
    { key: 'slug', type: 'string' },
    { key: 'category', type: 'string' },
    { key: 'image', type: 'string' },
    { key: 'amazonUrl', type: 'string' },
    { key: 'featured', type: 'boolean' },
    { key: 'featuredOrder', type: 'number' },
  ]

  const errors: string[] = []

  for (const { key, type } of required) {
    if (!(key in entry)) {
      errors.push(`missing "${key}"`)
    } else if (typeof entry[key] !== type) {
      errors.push(
        `"${key}" should be ${type}, got ${typeof entry[key]}`
      )
    }
  }

  if ('category' in entry && !VALID_CATEGORIES.has(entry.category as string)) {
    errors.push(
      `"category" must be one of ${[...VALID_CATEGORIES].join(', ')}, got "${String(entry.category)}"`
    )
  }

  if (errors.length > 0) {
    const label =
      typeof entry.name === 'string'
        ? `"${entry.name}"`
        : `index ${index}`
    console.warn(
      `[products] Malformed product entry ${label} — ${errors.join('; ')}. Skipping.`
    )
    return null
  }

  return entry as unknown as Product
}

const products: Product[] = (
  productsData.products as Record<string, unknown>[]
)
  .map((entry, index) => validateProduct(entry, index))
  .filter((product): product is Product => product !== null)

export function getProducts(): Product[] {
  return products
}

export function getFeaturedProducts(): Product[] {
  return products
    .filter((product) => product.featured)
    .sort((a, b) => a.featuredOrder - b.featuredOrder)
}
