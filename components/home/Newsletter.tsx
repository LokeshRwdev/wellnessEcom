'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your API
    setIsSubmitted(true)
    setEmail('')
  }
  
  return (
    <div className="container-custom" ref={ref}>
      <motion.div 
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-serif mb-4 text-sage-800">Join Our Wellness Community</h2>
        <p className="text-gray-700 mb-8">
          Subscribe to our newsletter for exclusive offers, wellness tips, and new product announcements.
        </p>
        
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-success-50 border border-success-100 rounded-lg p-6 text-success-700"
          >
            <h3 className="text-xl font-medium mb-2">Thank You for Subscribing!</h3>
            <p>You've been added to our newsletter. Get ready for wellness inspiration in your inbox.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-md border-gray-300 focus:border-sage-500 focus:ring-sage-500"
              required
            />
            <button
              type="submit"
              className="bg-terracotta-500 hover:bg-terracotta-600 text-white font-medium px-6 py-3 rounded-md transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}
      </motion.div>
    </div>
  )
}