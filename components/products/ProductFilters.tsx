'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

export default function ProductFilters() {
  return (
    <div className="bg-white rounded-lg shadow-soft p-6">
      <h2 className="text-xl font-medium mb-6">Filters</h2>
      
      <FilterSection title="Categories" defaultOpen={true}>
        <div className="space-y-2">
          <FilterCheckbox label="Yoga Mats" />
          <FilterCheckbox label="Yoga Blocks" />
          <FilterCheckbox label="Yoga Straps" />
          <FilterCheckbox label="Meditation Cushions" />
          <FilterCheckbox label="Yoga Clothing" />
          <FilterCheckbox label="Ayurvedic Oils" />
          <FilterCheckbox label="Ayurvedic Supplements" />
          <FilterCheckbox label="Essential Oils" />
        </div>
      </FilterSection>
      
      <FilterSection title="Price Range">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">$0</span>
            <span className="text-sm">$200</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="200" 
            className="w-full"
          />
        </div>
      </FilterSection>
      
      <FilterSection title="Materials">
        <div className="space-y-2">
          <FilterCheckbox label="Organic Cotton" />
          <FilterCheckbox label="Natural Rubber" />
          <FilterCheckbox label="Cork" />
          <FilterCheckbox label="Jute" />
          <FilterCheckbox label="Recycled Materials" />
        </div>
      </FilterSection>
      
      <FilterSection title="Ratings">
        <div className="space-y-2">
          <FilterCheckbox label="★★★★★ (5 stars)" />
          <FilterCheckbox label="★★★★☆ (4 stars & up)" />
          <FilterCheckbox label="★★★☆☆ (3 stars & up)" />
          <FilterCheckbox label="★★☆☆☆ (2 stars & up)" />
        </div>
      </FilterSection>
      
      <div className="mt-8">
        <button className="btn btn-outline w-full">
          Clear All Filters
        </button>
      </div>
    </div>
  )
}

interface FilterSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

function FilterSection({ title, children, defaultOpen = false }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  
  return (
    <div className="py-4 border-b border-gray-200 last:border-b-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="text-base font-medium">{title}</h3>
        {isOpen ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface FilterCheckboxProps {
  label: string
}

function FilterCheckbox({ label }: FilterCheckboxProps) {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input type="checkbox" className="rounded text-sage-600 focus:ring-sage-500" />
      <span className="text-sm">{label}</span>
    </label>
  )
}