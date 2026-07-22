import type { Category } from '@/types'

const CATEGORIES: Category[] = [
  'storage',
  'organization',
  'cleaning',
  'air-fryers',
]

export function getCategories(): Category[] {
  return CATEGORIES
}
