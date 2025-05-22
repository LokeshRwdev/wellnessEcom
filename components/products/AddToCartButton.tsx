'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiShoppingBag } from 'react-icons/fi'
import { useCart } from '@/lib/context/cartContext'
import { Product } from '@/lib/types'

interface AddToCartButtonProps {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const { addItem } = useCart()
  
  const handleAddToCart = () => {
    setIsAdding(true)
    
    // Simulate API request
    setTimeout(() => {
      addItem(product, 1)
      setIsAdding(false)
      setIsAdded(true)
      
      setTimeout(() => {
        setIsAdded(false)
      }, 2000)
    }, 500)
  }
  
  return (
    <motion.button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`relative flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-md font-medium transition-colors ${
        isAdded
          ? 'bg-success-500 text-white'
          : 'bg-sage-600 hover:bg-sage-700 text-white'
      }`}
      whileTap={{ scale: 0.95 }}
    >
      {isAdding ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Adding...
        </span>
      ) : isAdded ? (
        <span className="flex items-center gap-2">
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Added to Cart
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <FiShoppingBag size={18} />
          Add to Cart
        </span>
      )}
    </motion.button>
  )
}