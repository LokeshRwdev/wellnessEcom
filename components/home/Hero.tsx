'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.pexels.com/photos/4498215/pexels-photo-4498215.jpeg"
          alt="Woman practicing yoga in a serene setting" 
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/10" />
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          className="max-w-xl text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-6xl font-serif font-medium mb-4">
            Begin Your Wellness Journey
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Premium yoga merchandise and authentic ayurvedic products for balanced living and mindful well-being.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/products" 
              className="btn bg-sage-600 hover:bg-sage-700 text-white"
            >
              Shop Collection
            </Link>
            <Link 
              href="/about" 
              className="btn bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/40"
            >
              Our Philosophy
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}