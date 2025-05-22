'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Product } from '@/lib/types'

interface ProductTabsProps {
  product: Product
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('description')
  
  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'details', label: 'Details' },
    { id: 'ingredients', label: 'Ingredients' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'shipping', label: 'Shipping' },
  ]
  
  return (
    <div className="mt-12">
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto space-x-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 text-sm font-medium relative whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-sage-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-sage-500"
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
      
      <div className="py-6">
        {activeTab === 'description' && (
          <div className="prose max-w-none">
            <h4>Product Description</h4>
            <p>{product.description || 'No description available.'}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
            </p>
            <p>
              Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue.
            </p>
          </div>
        )}
        
        {activeTab === 'details' && (
          <div className="space-y-4">
            <h4 className="text-lg font-medium">Product Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-md p-4">
                <p className="text-sm font-medium mb-2">Dimensions</p>
                <p className="text-gray-600">W: 68cm x H: 180cm x D: 0.5cm</p>
              </div>
              <div className="bg-gray-50 rounded-md p-4">
                <p className="text-sm font-medium mb-2">Weight</p>
                <p className="text-gray-600">1.8 kg</p>
              </div>
              <div className="bg-gray-50 rounded-md p-4">
                <p className="text-sm font-medium mb-2">Material</p>
                <p className="text-gray-600">Natural Rubber, Microfiber</p>
              </div>
              <div className="bg-gray-50 rounded-md p-4">
                <p className="text-sm font-medium mb-2">Care Instructions</p>
                <p className="text-gray-600">Wipe clean with damp cloth</p>
              </div>
              <div className="bg-gray-50 rounded-md p-4">
                <p className="text-sm font-medium mb-2">Origin</p>
                <p className="text-gray-600">Ethically made in India</p>
              </div>
              <div className="bg-gray-50 rounded-md p-4">
                <p className="text-sm font-medium mb-2">Certifications</p>
                <p className="text-gray-600">Eco-friendly, Non-toxic</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'ingredients' && (
          <div className="space-y-4">
            <h4 className="text-lg font-medium">Ingredients</h4>
            <p className="text-gray-600">
              All our ingredients are sustainably sourced and ethically harvested. We use only natural ingredients without artificial additives or harmful chemicals.
            </p>
            <div className="mt-4">
              <h5 className="font-medium mb-2">Key Ingredients:</h5>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>100% Natural Rubber Base</li>
                <li>Eco-friendly Microfiber Top Layer</li>
                <li>Water-based Non-toxic Dyes</li>
                <li>Plant-derived Grip-enhancing Coating</li>
              </ul>
            </div>
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-medium">Customer Reviews</h4>
              <button className="text-sage-600 font-medium hover:text-sage-700 transition-colors">
                Write a Review
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-400">
                {'★★★★★'.split('').map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              <span className="text-gray-600">4.8 out of 5</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">42 reviews</span>
            </div>
            
            <div className="space-y-6 mt-6">
              <div className="border-b border-gray-200 pb-6">
                <div className="flex justify-between mb-2">
                  <div>
                    <h5 className="font-medium">Sarah M.</h5>
                    <div className="flex text-yellow-400 text-sm">
                      {'★★★★★'.split('').map((star, i) => (
                        <span key={i}>{star}</span>
                      ))}
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">2 weeks ago</span>
                </div>
                <p className="text-gray-600 mt-2">
                  This yoga mat has completely transformed my practice. The grip is amazing even during hot yoga sessions, and it's just the right thickness for joint support without losing stability.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <div className="flex justify-between mb-2">
                  <div>
                    <h5 className="font-medium">Michael T.</h5>
                    <div className="flex text-yellow-400 text-sm">
                      {'★★★★☆'.split('').map((star, i) => (
                        <span key={i}>{star}</span>
                      ))}
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">1 month ago</span>
                </div>
                <p className="text-gray-600 mt-2">
                  Great quality and beautiful design. The only reason I'm giving 4 stars is because it took a few uses for the initial rubber smell to dissipate. Other than that, it's perfect!
                </p>
              </div>
              
              <button className="text-sage-600 font-medium hover:text-sage-700 transition-colors">
                View All 42 Reviews
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'shipping' && (
          <div className="space-y-4">
            <h4 className="text-lg font-medium">Shipping & Returns</h4>
            
            <div className="space-y-4">
              <div>
                <h5 className="font-medium mb-2">Shipping Information</h5>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Free standard shipping on all orders over $75</li>
                  <li>Standard shipping (5-7 business days): $5.99</li>
                  <li>Express shipping (2-3 business days): $12.99</li>
                  <li>Orders ship within 1-2 business days</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium mb-2">Return Policy</h5>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>30-day easy returns for unused items in original packaging</li>
                  <li>Return shipping is free for exchanges</li>
                  <li>For returns, customer is responsible for return shipping</li>
                  <li>Refunds processed within 7-10 business days after receiving return</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}