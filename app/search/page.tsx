'use client'

import { useState } from 'react'
import { FiChevronRight, FiSearch } from 'react-icons/fi'
import Link from 'next/link'
import ProductGrid from '@/components/products/ProductGrid'

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  
  const categories = ['All', 'Yoga', 'Ayurveda', 'Meditation']
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  const filterSections = [
    { id: 'category', label: 'Category' },
    { id: 'price', label: 'Price' },
    { id: 'rating', label: 'Rating' },
    { id: 'brand', label: 'Brand' },
    { id: 'size', label: 'Size' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 bg-white z-40 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
        <Link href="/" className="text-gray-600">
          <FiChevronRight className="rotate-180" size={24} />
        </Link>
        <h1 className="text-xl font-medium">Wellness</h1>
      </div>

      <div className="p-4">
        <div className="relative mb-4">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-sage-500"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-sage-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg">
          <div className="divide-y divide-gray-200">
            {filterSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setShowFilters(true)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="text-gray-700">{section.label}</span>
                <FiChevronRight size={20} className="text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {showFilters && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium">Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-500"
              >
                Close
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {/* Filter content would go here */}
            </div>
            
            <div className="p-4 border-t border-gray-200 flex gap-3">
              <button 
                className="flex-1 py-3 px-6 rounded-lg bg-gray-100 text-gray-700 font-medium"
                onClick={() => setShowFilters(false)}
              >
                Clear
              </button>
              <button 
                className="flex-1 py-3 px-6 rounded-lg bg-sage-600 text-white font-medium"
                onClick={() => setShowFilters(false)}
              >
                Apply
              </button>
            </div>
          </div>
        )}

        <div className="mt-6">
          <ProductGrid />
        </div>
      </div>
    </div>
  )
}