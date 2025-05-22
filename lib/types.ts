export interface Product {
  id: string
  name: string
  price: number
  discountedPrice?: number
  images: string[]
  category: string
  shortDescription: string
  description?: string
  isNew?: boolean
  isFeatured?: boolean
  stock: number
  rating?: number
}

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  variant?: string
}