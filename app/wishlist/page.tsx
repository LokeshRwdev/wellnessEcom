'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiChevronLeft, FiTrash2, FiShoppingBag, FiHeart } from 'react-icons/fi'
import { useCart } from '@/lib/context/cartContext'
import { Product } from '@/lib/types'

export default function WishlistPage() {
  const { addItem } = useCart()
  
  // Mock wishlist data
  const wishlistItems: Product[] = [
    {
      id: 'yoga-mat-1',
      name: 'Premium Eco-Friendly Yoga Mat',
      price: 68.99,
      images: ['https://images.pexels.com/photos/4498185/pexels-photo-4498185.jpeg'],
      category: 'Yoga Mats',
      shortDescription: 'Our premium eco-friendly yoga mat provides exceptional grip and comfort for your practice.',
      stock: 25,
      rating: 4.8
    },
    {
      id: 'meditation-cushion-1',
      name: 'Organic Cotton Meditation Cushion',
      price: 42.50,
      images: ['https://images.pexels.com/photos/4498330/pexels-photo-4498330.jpeg'],
      category: 'Meditation',
      shortDescription: 'Elevate your meditation practice with our comfortable and supportive organic cotton cushion.',
      stock: 15,
      rating: 4.9
    }
  ]

  const handleRemoveFromWishlist = (productId: string) => {
    // Implementation would go here
    console.log('Remove from wishlist:', productId)
  }

  const handleMoveToCart = (product: Product) => {
    addItem(product, 1)
    handleRemoveFromWishlist(product.id)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-4">
          <div className="flex items-center gap-4">
            <Link href="/account" className="text-gray-600">
              <FiChevronLeft size={24} />
            </Link>
            <h1 className="text-xl font-medium">My Wishlist</h1>
          </div>
        </div>
      </div>

      <div className="container-custom py-6">
        {wishlistItems.length > 0 ? (
          <div className="space-y-4">
            {wishlistItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-lg shadow-soft overflow-hidden"
              >
                <div className="p-4 flex gap-4">
                  <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <Link 
                      href={`/products/${item.id}`}
                      className="font-medium hover:text-sage-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-600 mt-1">{item.category}</p>
                    <p className="text-sage-600 font-medium mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                    
                    <div className="flex gap-3 mt-3">
                      <button
                        onClick={() => handleMoveToCart(item)}
                        className="flex items-center gap-2 px-4 py-2 bg-sage-600 text-white rounded-md text-sm font-medium hover:bg-sage-700 transition-colors"
                      >
                        <FiShoppingBag size={16} />
                        Add to Cart
                      </button>
                      
                      <button
                        onClick={() => handleRemoveFromWishlist(item.id)}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                      >
                        <FiTrash2 size={16} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <FiHeart size={24} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">
              Start saving your favorite items for later!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 bg-sage-600 text-white rounded-md font-medium hover:bg-sage-700 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}