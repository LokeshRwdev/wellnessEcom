'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Image from 'next/image'

export default function ExploreProducts() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const products = [
    {
      id: 'meditation-cushion',
      name: 'Meditation Cushion',
      price: 42.50,
      image: 'https://images.pexels.com/photos/4498330/pexels-photo-4498330.jpeg',
      description: 'Comfortable support for your practice'
    },
    {
      id: 'singing-bowl',
      name: 'Tibetan Singing Bowl',
      price: 89.99,
      image: 'https://images.pexels.com/photos/6694512/pexels-photo-6694512.jpeg',
      description: 'Sacred sound for meditation'
    },
    {
      id: 'incense-set',
      name: 'Ayurvedic Incense Set',
      price: 24.99,
      image: 'https://images.pexels.com/photos/6694638/pexels-photo-6694638.jpeg',
      description: 'Natural fragrances for ambiance'
    },
    {
      id: 'mala-beads',
      name: 'Sandalwood Mala Beads',
      price: 34.99,
      image: 'https://images.pexels.com/photos/4498183/pexels-photo-4498183.jpeg',
      description: 'Traditional counting beads'
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
    <section className="bg-gradient-to-r from-sage-800 to-sage-900 py-16" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
            Enhance Your Practice
          </h2>
          <p className="text-sage-100 text-lg max-w-2xl mx-auto">
            Discover our curated collection of meditation essentials and spiritual tools
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group"
            >
              <Link href={`/products/${product.id}`}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-sage-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-sage-600">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-sage-600 font-medium group-hover:text-sage-700 transition-colors">
                        Shop Now →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-sage-800 font-medium rounded-full hover:bg-sage-50 transition-colors shadow-lg hover:shadow-xl"
          >
            Explore All Products
          </Link>
        </motion.div>
      </div>
    </section>
  )
}