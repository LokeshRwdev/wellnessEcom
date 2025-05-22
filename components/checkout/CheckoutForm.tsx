'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiCreditCard, FiLock } from 'react-icons/fi'

export default function CheckoutForm() {
  const [step, setStep] = useState(1)
  
  const goToNext = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(step + 1)
  }
  
  const goBack = () => {
    setStep(step - 1)
  }
  
  return (
    <div className="bg-white rounded-lg shadow-soft p-6">
      <div className="mb-8">
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            step >= 1 ? 'bg-sage-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            1
          </div>
          <div className={`flex-grow h-1 mx-2 ${
            step >= 2 ? 'bg-sage-600' : 'bg-gray-200'
          }`}></div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            step >= 2 ? 'bg-sage-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            2
          </div>
          <div className={`flex-grow h-1 mx-2 ${
            step >= 3 ? 'bg-sage-600' : 'bg-gray-200'
          }`}></div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            step >= 3 ? 'bg-sage-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            3
          </div>
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className={step >= 1 ? 'text-sage-600 font-medium' : 'text-gray-500'}>Shipping</span>
          <span className={step >= 2 ? 'text-sage-600 font-medium' : 'text-gray-500'}>Payment</span>
          <span className={step >= 3 ? 'text-sage-600 font-medium' : 'text-gray-500'}>Review</span>
        </div>
      </div>
      
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-medium mb-6">Shipping Information</h2>
          <form onSubmit={goToNext} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="input-field w-full"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="input-field w-full"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="input-field w-full"
                required
              />
            </div>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Street Address
              </label>
              <input
                type="text"
                id="address"
                className="input-field w-full"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  className="input-field w-full"
                  required
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State/Province
                </label>
                <input
                  type="text"
                  id="state"
                  className="input-field w-full"
                  required
                />
              </div>
              <div>
                <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP/Postal Code
                </label>
                <input
                  type="text"
                  id="zip"
                  className="input-field w-full"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                id="country"
                className="input-field w-full"
                required
              >
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="AU">Australia</option>
                {/* More countries would be added here */}
              </select>
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className="input-field w-full"
                required
              />
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className="btn btn-primary w-full"
              >
                Continue to Payment
              </button>
            </div>
          </form>
        </motion.div>
      )}
      
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-medium mb-6">Payment Method</h2>
          <form onSubmit={goToNext} className="space-y-4">
            <div className="flex items-center mb-6">
              <FiLock size={16} className="text-gray-500 mr-2" />
              <span className="text-sm text-gray-500">Your payment information is secured with SSL encryption</span>
            </div>
            
            <div className="border border-gray-200 rounded-md p-4 flex items-center mb-4">
              <input
                type="radio"
                id="creditCard"
                name="paymentMethod"
                className="h-4 w-4 text-sage-600 focus:ring-sage-500"
                defaultChecked
              />
              <label htmlFor="creditCard" className="ml-2 flex items-center">
                <FiCreditCard size={20} className="text-gray-700 mr-2" />
                <span>Credit / Debit Card</span>
              </label>
            </div>
            
            <div>
              <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                Name on Card
              </label>
              <input
                type="text"
                id="cardName"
                className="input-field w-full"
                required
              />
            </div>
            
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                className="input-field w-full"
                placeholder="0000 0000 0000 0000"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Expiration Date
                </label>
                <input
                  type="text"
                  id="expDate"
                  className="input-field w-full"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  className="input-field w-full"
                  placeholder="123"
                  required
                />
              </div>
            </div>
            
            <div className="pt-4 space-y-3">
              <button
                type="submit"
                className="btn btn-primary w-full"
              >
                Continue to Review
              </button>
              <button
                type="button"
                onClick={goBack}
                className="btn btn-outline w-full"
              >
                Back to Shipping
              </button>
            </div>
          </form>
        </motion.div>
      )}
      
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-medium mb-6">Review Your Order</h2>
          
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium mb-2">Shipping Information</h3>
              <p className="text-gray-700">
                John Doe<br />
                123 Wellness Street<br />
                San Francisco, CA 94103<br />
                United States<br />
                (555) 123-4567
              </p>
              <button className="text-sage-600 hover:text-sage-700 text-sm font-medium mt-2" onClick={() => setStep(1)}>
                Edit
              </button>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium mb-2">Payment Method</h3>
              <p className="text-gray-700 flex items-center">
                <FiCreditCard size={18} className="mr-2" />
                Visa ending in 4242
              </p>
              <button className="text-sage-600 hover:text-sage-700 text-sm font-medium mt-2" onClick={() => setStep(2)}>
                Edit
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="termsAgree" 
                  className="h-4 w-4 text-sage-600 focus:ring-sage-500" 
                  required 
                />
                <label htmlFor="termsAgree" className="ml-2 text-sm text-gray-700">
                  I agree to the <a href="/terms" className="text-sage-600 hover:text-sage-700">Terms of Service</a> and <a href="/privacy" className="text-sage-600 hover:text-sage-700">Privacy Policy</a>
                </label>
              </div>
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="newsletterSignup" 
                  className="h-4 w-4 text-sage-600 focus:ring-sage-500" 
                />
                <label htmlFor="newsletterSignup" className="ml-2 text-sm text-gray-700">
                  Sign up for our newsletter to receive updates and exclusive offers
                </label>
              </div>
            </div>
            
            <div className="pt-4 space-y-3">
              <button
                type="button"
                className="btn btn-primary w-full"
              >
                Place Order
              </button>
              <button
                type="button"
                onClick={goBack}
                className="btn btn-outline w-full"
              >
                Back to Payment
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}