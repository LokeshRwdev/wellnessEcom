'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiHeart, FiShoppingBag } from 'react-icons/fi'
import { useCart } from '@/lib/context/cartContext'
import { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { addItem } = useCart()
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 1)
  }
  
  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Wishlist functionality would be added here
  }
  
  return (
    <motion.div 
      className="card group h-full flex flex-col"
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`} className="block h-full">
        <div className="relative aspect-square overflow-hidden">
          <Image 
            src={product.images[0]} 
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {product.isNew && (
            <div className="absolute top-3 left-3 bg-lavender-500 text-white text-xs font-medium px-2 py-1 rounded">
              New
            </div>
          )}
          
          {product.discountedPrice && (
            <div className="absolute top-3 right-3 bg-terracotta-500 text-white text-xs font-medium px-2 py-1 rounded">
              Sale
            </div>
          )}
          
          <div className={`absolute bottom-0 left-0 right-0 p-3 bg-white/90 backdrop-blur-sm transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}>
            <div className="flex justify-between gap-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-sage-600 hover:bg-sage-700 text-white text-sm font-medium py-2 rounded transition-colors"
              >
                <FiShoppingBag size={16} />
                Add to Cart
              </button>
              <button
                onClick={handleAddToWishlist}
                className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 hover:border-sage-500 text-gray-700 hover:text-sage-600 rounded transition-colors"
              >
                <FiHeart size={18} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-4 flex-grow flex flex-col">
          <span className="text-sm text-gray-500 mb-1">{product.category}</span>
          <h3 className="text-lg font-medium mb-2 group-hover:text-sage-600 transition-colors">{product.name}</h3>
          <div className="mt-auto flex items-center">
            <span className="font-medium text-gray-900">${product.price.toFixed(2)}</span>
            {product.discountedPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">${product.discountedPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}