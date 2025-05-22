'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiHeart } from 'react-icons/fi'

interface WishlistButtonProps {
  productId: string
}

export default function WishlistButton({ productId }: WishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(false)
  
  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist)
    // In a real app, you would call an API here
  }
  
  return (
    <motion.button
      onClick={toggleWishlist}
      whileTap={{ scale: 0.9 }}
      className={`flex items-center justify-center gap-2 py-3 px-5 rounded-md border font-medium transition-all ${
        isInWishlist
          ? 'bg-lavender-50 border-lavender-300 text-lavender-600'
          : 'bg-white border-gray-300 text-gray-700 hover:border-sage-300'
      }`}
    >
      <motion.div
        animate={isInWishlist ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <FiHeart
          size={18}
          className={isInWishlist ? 'fill-lavender-500 text-lavender-500' : ''}
        />
      </motion.div>
      <span>{isInWishlist ? 'Saved' : 'Save'}</span>
    </motion.button>
  )
}