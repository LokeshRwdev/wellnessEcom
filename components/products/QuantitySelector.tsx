'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMinus, FiPlus } from 'react-icons/fi'

interface QuantitySelectorProps {
  initialValue?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
}

export default function QuantitySelector({
  initialValue = 1,
  onChange,
  min = 1,
  max = 10,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialValue)
  
  const increment = () => {
    if (quantity < max) {
      const newValue = quantity + 1
      setQuantity(newValue)
      onChange?.(newValue)
    }
  }
  
  const decrement = () => {
    if (quantity > min) {
      const newValue = quantity - 1
      setQuantity(newValue)
      onChange?.(newValue)
    }
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value) && value >= min && value <= max) {
      setQuantity(value)
      onChange?.(value)
    }
  }
  
  return (
    <div className="flex items-center">
      <label htmlFor="quantity" className="block mr-4 text-sm font-medium">
        Quantity
      </label>
      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={decrement}
          disabled={quantity <= min}
          className={`w-10 h-10 flex items-center justify-center transition-colors ${
            quantity <= min
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          aria-label="Decrease quantity"
        >
          <FiMinus size={16} />
        </motion.button>
        
        <input
          type="number"
          id="quantity"
          min={min}
          max={max}
          value={quantity}
          onChange={handleChange}
          className="w-12 h-10 text-center border-x border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
        />
        
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={increment}
          disabled={quantity >= max}
          className={`w-10 h-10 flex items-center justify-center transition-colors ${
            quantity >= max
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          aria-label="Increase quantity"
        >
          <FiPlus size={16} />
        </motion.button>
      </div>
    </div>
  )
}