export type Category = 'storage' | 'organization' | 'cleaning' | 'air-fryers' | 'home-improvement'


export interface Product {
  id: string
  name: string
  slug: string
  category: Category
  image: string
  amazonUrl: string
  cjUrl: string
  featured: boolean
  featuredOrder: number
}

export interface Rating {
  valueForMoney: number
  buildQuality: number
  performance: number
  easeOfUse: number
  design: number
  overall: number
}

export interface ReviewFrontmatter {
  title: string
  slug: string
  date: string
  updatedDate: string
  category: Category
  excerpt: string
  targetKeyword: string
  secondaryKeywords: string[]
  ogImage: string
  product: {
    name: string
    image: string
    amazonUrl: string
    cjUrl: string
  }
  rating: Rating
  pros: string[]
  cons: string[]
  bestFor: string[]
  wrongFor: string[]
  compareProducts: { name: string; slug: string }[]
  verdict: 'Buy' | 'Skip' | 'Wait for Sale'
  faq: { question: string; answer: string }[]
  featured: boolean
}
