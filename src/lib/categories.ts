import type { Category } from '@/types'

const CATEGORIES: Category[] = [
  'storage',
  'organization',
  'cleaning',
  'air-fryers',
  'home-improvement',
]

export function getCategories(): Category[] {
  return CATEGORIES
}
