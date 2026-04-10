export type ProductCategory = 'jeans' | 'tops' | 'custom' | 'outerwear' | 'accessories'

export interface Product {
  id?: string
  name: string
  price: number
  category: ProductCategory
  description: string
  story: string
  images: string[]
  sizes: string[]
  featured: boolean
  available: boolean
  slug?: string
  createdAt?: Date | { toDate: () => Date } | null
}

export interface ContactFormData {
  name: string
  email: string
  message: string
  productInterest?: string
  instagram?: string
}
