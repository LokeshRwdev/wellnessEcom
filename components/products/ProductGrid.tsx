'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import Loading from '@/components/ui/Loading'
import { Product } from '@/lib/types'
import { getAllProducts } from '@/lib/data/products'

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setProducts(getAllProducts())
      setLoading(false)
    }, 500)
  }, [])
  
  if (loading) {
    return <Loading />
  }
  
  if (products.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-lg text-gray-600">No products found.</p>
      </div>
    )
  }
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }
  
  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {products.map(product => (
        <motion.div key={product.id} variants={itemVariants}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  )
}