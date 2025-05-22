import { Product } from '@/lib/types'

// Mock products data
const products: Product[] = [
  {
    id: 'yoga-mat-1',
    name: 'Premium Eco-Friendly Yoga Mat',
    price: 68.99,
    images: [
      'https://images.pexels.com/photos/4498185/pexels-photo-4498185.jpeg',
      'https://images.pexels.com/photos/4498148/pexels-photo-4498148.jpeg',
      'https://images.pexels.com/photos/4498429/pexels-photo-4498429.jpeg'
    ],
    category: 'Yoga Mats',
    shortDescription: 'Our premium eco-friendly yoga mat provides exceptional grip and comfort for your practice.',
    description: 'Made from natural rubber and recycled materials, this mat offers superior grip even during the most intense hot yoga sessions. The perfect thickness provides joint support without sacrificing stability.',
    isNew: true,
    isFeatured: true,
    stock: 25,
    rating: 4.8
  },
  {
    id: 'yoga-block-1',
    name: 'Cork Yoga Block Set',
    price: 24.99,
    images: [
      'https://images.pexels.com/photos/4498194/pexels-photo-4498194.jpeg',
      'https://images.pexels.com/photos/4498443/pexels-photo-4498443.jpeg'
    ],
    category: 'Yoga Props',
    shortDescription: 'Sustainable cork yoga blocks for enhanced stability and support in your practice.',
    isFeatured: true,
    stock: 40,
    rating: 4.6
  },
  {
    id: 'meditation-cushion-1',
    name: 'Organic Cotton Meditation Cushion',
    price: 42.50,
    images: [
      'https://images.pexels.com/photos/4498330/pexels-photo-4498330.jpeg',
      'https://images.pexels.com/photos/4498605/pexels-photo-4498605.jpeg'
    ],
    category: 'Meditation',
    shortDescription: 'Elevate your meditation practice with our comfortable and supportive organic cotton cushion.',
    isFeatured: true,
    stock: 15,
    rating: 4.9
  },
  {
    id: 'ayurvedic-oil-1',
    name: 'Calming Ayurvedic Massage Oil',
    price: 36.99,
    discountedPrice: 29.99,
    images: [
      'https://images.pexels.com/photos/6694546/pexels-photo-6694546.jpeg',
      'https://images.pexels.com/photos/6694548/pexels-photo-6694548.jpeg'
    ],
    category: 'Ayurveda',
    shortDescription: 'Traditional ayurvedic massage oil blend with calming herbs and essential oils.',
    isNew: false,
    isFeatured: true,
    stock: 30,
    rating: 4.7
  },
  {
    id: 'yoga-strap-1',
    name: 'Organic Cotton Yoga Strap',
    price: 18.99,
    images: [
      'https://images.pexels.com/photos/4498512/pexels-photo-4498512.jpeg',
      'https://images.pexels.com/photos/4498502/pexels-photo-4498502.jpeg'
    ],
    category: 'Yoga Props',
    shortDescription: 'Extend your reach and deepen your stretches with our durable organic cotton yoga strap.',
    stock: 50,
    rating: 4.5
  },
  {
    id: 'yoga-clothing-1',
    name: 'High-Waisted Yoga Leggings',
    price: 58.00,
    images: [
      'https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg',
      'https://images.pexels.com/photos/6787207/pexels-photo-6787207.jpeg'
    ],
    category: 'Yoga Clothing',
    shortDescription: 'Comfortable, breathable high-waisted leggings perfect for yoga and everyday wear.',
    stock: 35,
    rating: 4.8
  },
  {
    id: 'essential-oil-1',
    name: 'Lavender Essential Oil',
    price: 22.50,
    images: [
      'https://images.pexels.com/photos/6694638/pexels-photo-6694638.jpeg',
      'https://images.pexels.com/photos/6694626/pexels-photo-6694626.jpeg'
    ],
    category: 'Essential Oils',
    shortDescription: 'Pure lavender essential oil to promote relaxation and better sleep.',
    stock: 45,
    rating: 4.9
  },
  {
    id: 'ayurvedic-tea-1',
    name: 'Organic Ayurvedic Tea Blend',
    price: 19.99,
    images: [
      'https://images.pexels.com/photos/6693953/pexels-photo-6693953.jpeg',
      'https://images.pexels.com/photos/6693954/pexels-photo-6693954.jpeg'
    ],
    category: 'Ayurveda',
    shortDescription: 'A soothing blend of traditional ayurvedic herbs to balance your doshas.',
    isNew: true,
    stock: 60,
    rating: 4.6
  }
]

export function getAllProducts(): Product[] {
  return products
}

export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.isFeatured)
}

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id)
}

export function getRelatedProducts(category: string, currentProductId: string): Product[] {
  return products
    .filter(product => product.category === category && product.id !== currentProductId)
    .slice(0, 4)
}