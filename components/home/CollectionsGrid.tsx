'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Image from 'next/image'

export default function CollectionsGrid() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const collections = [
    {
      id: 'yoga-mats',
      name: 'Yoga Mats',
      image: 'https://images.pexels.com/photos/4498440/pexels-photo-4498440.jpeg',
      description: 'Premium eco-friendly mats for your practice',
    },
    {
      id: 'clothing',
      name: 'Yoga Clothing',
      image: 'https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg',
      description: 'Comfortable, sustainable activewear',
    },
    {
      id: 'props',
      name: 'Props & Accessories',
      image: 'https://images.pexels.com/photos/4498183/pexels-photo-4498183.jpeg',
      description: 'Tools to enhance your yoga practice',
    },
    {
      id: 'ayurveda',
      name: 'Ayurvedic Products',
      image: 'https://images.pexels.com/photos/6694512/pexels-photo-6694512.jpeg',
      description: 'Traditional herbal remedies and supplements',
    }
  ]
  
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
    <div ref={ref}>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {collections.map(collection => (
          <motion.div key={collection.id} variants={itemVariants}>
            <Link href={`/categories/${collection.id}`} className="block group">
              <div className="relative h-80 overflow-hidden rounded-lg">
                <Image 
                  src={collection.image} 
                  alt={collection.name}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-2xl text-white font-serif mb-2">{collection.name}</h3>
                  <p className="text-white/80 mb-4">{collection.description}</p>
                  <span className="inline-block text-white font-medium border-b border-white pb-1 group-hover:border-terracotta-300 transition-colors">
                    Shop Collection
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}