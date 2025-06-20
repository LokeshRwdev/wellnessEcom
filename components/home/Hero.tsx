'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/4498215/pexels-photo-4498215.jpeg',
      title: 'Begin Your Wellness Journey',
      subtitle: 'Premium yoga merchandise and authentic ayurvedic products for balanced living and mindful well-being.',
      primaryCTA: 'Shop Collection',
      secondaryCTA: 'Our Philosophy'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/4498152/pexels-photo-4498152.jpeg',
      title: 'Discover Inner Peace',
      subtitle: 'Transform your practice with our carefully curated collection of yoga essentials and ayurvedic treasures.',
      primaryCTA: 'Explore Products',
      secondaryCTA: 'Learn More'
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/4498330/pexels-photo-4498330.jpeg',
      title: 'Mindful Living Essentials',
      subtitle: 'Elevate your wellness routine with sustainable, high-quality products designed for your journey.',
      primaryCTA: 'Shop Now',
      secondaryCTA: 'About Us'
    }
  ]
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }
  
  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)
    
    return () => clearInterval(timer)
  }, [])
  
  return (
    <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image 
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/10" />
        </motion.div>
      </AnimatePresence>
      
      <div className="container-custom relative z-10 text-center">
        <motion.div 
          key={`content-${currentSlide}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto text-white"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            {slides[currentSlide].subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products" 
              className="btn bg-sage-600 hover:bg-sage-700 text-white"
            >
              {slides[currentSlide].primaryCTA}
            </Link>
            {/* <Link 
              href="/about" 
              className="btn bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/40"
            >
              {slides[currentSlide].secondaryCTA}
            </Link> */}
          </div>
        </motion.div>
      </div>
      
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        aria-label="Previous slide"
      >
        <FiChevronLeft size={24} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        aria-label="Next slide"
      >
        <FiChevronRight size={24} />
      </button>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}