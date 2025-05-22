'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiShoppingBag } from 'react-icons/fi'

export default function EmptyCart() {
  return (
    <motion.div 
      className="py-16 flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-20 h-20 rounded-full bg-sage-100 flex items-center justify-center text-sage-500 mb-6">
        <FiShoppingBag size={32} />
      </div>
      
      <h2 className="text-2xl font-serif mb-3">Your cart is empty</h2>
      <p className="text-gray-600 max-w-md mb-8">
        Looks like you haven't added any products to your cart yet. 
        Browse our collection to find something perfect for your wellness journey.
      </p>
      
      <Link 
        href="/products" 
        className="btn btn-primary"
      >
        Continue Shopping
      </Link>
    </motion.div>
  )
}