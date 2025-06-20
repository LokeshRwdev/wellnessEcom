'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Image from 'next/image'

export default function ShopByCategory() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const categories = [
    {
      id: 'yoga-gear',
      name: 'Yoga Gear',
      image: 'https://images.pexels.com/photos/4498440/pexels-photo-4498440.jpeg',
      href: '/categories/yoga-gear'
    },
    {
      id: 'ayurvedic-supplements',
      name: 'Ayurvedic Supplements',
      image: 'https://images.pexels.com/photos/6694546/pexels-photo-6694546.jpeg',
      href: '/categories/ayurvedic-supplements'
    },
    {
      id: 'herbal-teas',
      name: 'Herbal Teas',
      image: 'https://images.pexels.com/photos/6693953/pexels-photo-6693953.jpeg',
      href: '/categories/herbal-teas'
    },
    {
      id: 'skincare',
      name: 'Skincare',
      image: 'https://images.pexels.com/photos/6694638/pexels-photo-6694638.jpeg',
      href: '/categories/skincare'
    },
    {
      id: 'wellness-kits',
      name: 'Wellness Kits',
      image: 'https://images.pexels.com/photos/4498330/pexels-photo-4498330.jpeg',
      href: '/categories/wellness-kits'
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
    <section className="bg-sage-50 py-16" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-serif text-sage-800 mb-4">Shop by Category</h2>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {categories.map(category => (
            <motion.div key={category.id} variants={itemVariants}>
              <Link href={category.href} className="block group">
                <div className="bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-medium transition-shadow">
                  <div className="relative aspect-square">
                    <Image 
                      src={category.image} 
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-medium text-gray-900 group-hover:text-sage-600 transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}