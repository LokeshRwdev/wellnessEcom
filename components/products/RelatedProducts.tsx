'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import { Product } from '@/lib/types'
import { getRelatedProducts } from '@/lib/data/products'

interface RelatedProductsProps {
  categoryId: string
  currentProductId: string
}

export default function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  
  useEffect(() => {
    // Simulate API call
    setProducts(getRelatedProducts(categoryId, currentProductId))
  }, [categoryId, currentProductId])
  
  if (!products.length) return null
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }
  
  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {products.slice(0, 4).map(product => (
        <motion.div key={product.id} variants={itemVariants}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  )
}