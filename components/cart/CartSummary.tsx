'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'
import { useCart } from '@/lib/context/cartContext'

export default function CartSummary() {
  const [promoOpen, setPromoOpen] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const { subtotal, itemCount } = useCart()
  
  const shipping = subtotal > 75 ? 0 : 5.99
  const discount = promoApplied ? subtotal * 0.1 : 0
  const total = subtotal + shipping - discount
  
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    if (promoCode.trim()) {
      // Simulate API call
      setPromoApplied(true)
    }
  }
  
  return (
    <div className="bg-white rounded-lg shadow-soft p-6">
      <h2 className="text-xl font-medium mb-6">Order Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({itemCount} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
        
        {promoApplied && (
          <div className="flex justify-between text-success-700">
            <span>Discount (10%)</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="pt-3 mt-3 border-t border-gray-200">
          <div className="flex justify-between font-medium text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Tax calculated at checkout
          </p>
        </div>
      </div>
      
      <div className="mt-6">
        <button
          onClick={() => setPromoOpen(!promoOpen)}
          className="flex items-center gap-2 text-sage-600 font-medium"
        >
          <span>Add promo code</span>
          <FiChevronDown
            size={16}
            className={`transition-transform ${promoOpen ? 'rotate-180' : ''}`}
          />
        </button>
        
        <AnimatePresence>
          {promoOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <form onSubmit={handleApplyPromo} className="flex gap-2 mt-3">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  className="flex-grow rounded-md border-gray-300 focus:border-sage-500 focus:ring-sage-500 text-sm"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-sage-600 hover:bg-sage-700 text-white rounded-md text-sm font-medium transition-colors"
                >
                  Apply
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}