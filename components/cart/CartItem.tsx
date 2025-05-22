'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiTrash2 } from 'react-icons/fi'
import QuantitySelector from '@/components/products/QuantitySelector'
import { CartItem as CartItemType } from '@/lib/types'

interface CartItemProps {
  item: CartItemType
  onRemove: () => void
  onQuantityChange: (quantity: number) => void
}

export default function CartItem({ item, onRemove, onQuantityChange }: CartItemProps) {
  const [isRemoving, setIsRemoving] = useState(false)
  
  const handleRemove = () => {
    setIsRemoving(true)
    
    // Simulate API call
    setTimeout(() => {
      onRemove()
    }, 300)
  }
  
  if (isRemoving) {
    return (
      <motion.div
        initial={{ opacity: 1, height: 'auto' }}
        animate={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      />
    )
  }
  
  return (
    <motion.div 
      layout
      className="flex flex-col sm:flex-row items-start gap-4 p-4 bg-white rounded-lg shadow-soft"
    >
      <div className="relative w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
        <Image 
          src={item.image} 
          alt={item.name} 
          fill 
          className="object-cover"
        />
      </div>
      
      <div className="flex-grow">
        <Link href={`/products/${item.id}`} className="text-lg font-medium hover:text-sage-600 transition-colors">
          {item.name}
        </Link>
        
        <div className="mt-1 text-sm text-gray-500">
          {item.variant && <p>Variant: {item.variant}</p>}
        </div>
        
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <QuantitySelector
            initialValue={item.quantity}
            onChange={onQuantityChange}
            min={1}
            max={10}
          />
          
          <div className="flex items-center justify-between sm:justify-end gap-4">
            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
            <button
              onClick={handleRemove}
              className="text-gray-400 hover:text-error-500 transition-colors"
              aria-label="Remove item"
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}