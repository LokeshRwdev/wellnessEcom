'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('submitting')
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success')
      
      // Reset form after success
      const form = e.target as HTMLFormElement
      form.reset()
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setFormStatus('idle')
      }, 3000)
    }, 1000)
  }
  
  return (
    <div className="min-h-screen">
      <div className="container-custom py-8">
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Contact Us', href: '/contact' },
          ]} 
        />
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-serif text-center mt-8 mb-6">Contact Us</h1>
          
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Have questions about our products or need assistance with your order? We're here to help! Choose the best way to reach us below.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-soft text-center">
              <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMail className="text-sage-600" size={24} />
              </div>
              <h3 className="font-serif mb-2">Email</h3>
              <p className="text-gray-600">support@serenity.com</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-soft text-center">
              <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiPhone className="text-sage-600" size={24} />
              </div>
              <h3 className="font-serif mb-2">Phone</h3>
              <p className="text-gray-600">1-800-SERENITY</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-soft text-center">
              <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMapPin className="text-sage-600" size={24} />
              </div>
              <h3 className="font-serif mb-2">Location</h3>
              <p className="text-gray-600">123 Wellness Street<br />San Francisco, CA 94103</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-soft p-8">
            <h2 className="text-2xl font-serif mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="input-field w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="input-field w-full"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="input-field w-full"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="input-field w-full"
                ></textarea>
              </div>
              
              <motion.button
                type="submit"
                disabled={formStatus === 'submitting'}
                className={`w-full py-3 px-6 rounded-md font-medium transition-colors ${
                  formStatus === 'submitting'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-sage-600 hover:bg-sage-700 text-white'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
              </motion.button>
              
              {formStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-success-600 bg-success-50 p-4 rounded-md"
                >
                  Thank you! Your message has been sent successfully.
                </motion.div>
              )}
              
              {formStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-error-600 bg-error-50 p-4 rounded-md"
                >
                  Oops! Something went wrong. Please try again later.
                </motion.div>
              )}
            </form>
          </div>
          
          <div className="mt-12 bg-cream-50 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-serif mb-4">Business Hours</h2>
            <div className="max-w-sm mx-auto space-y-2">
              <p className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>9:00 AM - 6:00 PM PST</span>
              </p>
              <p className="flex justify-between">
                <span>Saturday:</span>
                <span>10:00 AM - 4:00 PM PST</span>
              </p>
              <p className="flex justify-between">
                <span>Sunday:</span>
                <span>Closed</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}