'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export default function TestimonialsSlider() {
  const testimonials = [
    {
      id: 1,
      name: 'Sophia Martinez',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      role: 'Yoga Instructor',
      content: 'The quality of the yoga mats from Serenity is exceptional. My students have noticed the difference, and I\'ve seen a marked improvement in their practice. The eco-friendly materials align perfectly with my values.',
    },
    {
      id: 2,
      name: 'James Wilson',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      role: 'Wellness Coach',
      content: 'I\'ve incorporated Serenity\'s ayurvedic products into my daily routine, and I\'ve experienced noticeable improvements in my overall wellbeing. Their commitment to authentic, high-quality ingredients is evident in every product.',
    },
    {
      id: 3,
      name: 'Emma Chen',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      role: 'Regular Customer',
      content: 'The yoga clothing from Serenity is both comfortable and stylish. I wear their pieces from studio to street, and always receive compliments. Plus, their customer service is absolutely top-notch!',
    },
  ]
  
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  
  const nextSlide = () => {
    setDirection(1)
    setCurrent(current === testimonials.length - 1 ? 0 : current + 1)
  }
  
  const prevSlide = () => {
    setDirection(-1)
    setCurrent(current === 0 ? testimonials.length - 1 : current - 1)
  }
  
  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide()
    }, 6000)
    
    return () => clearTimeout(timer)
  }, [current])
  
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  }
  
  return (
    <div className="relative max-w-4xl mx-auto px-4 py-6">
      <div className="relative h-full overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-lg shadow-soft"
          >
            <div className="md:w-1/3 flex flex-col items-center">
              <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
                <Image 
                  src={testimonials[current].avatar} 
                  alt={testimonials[current].name}
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="text-xl font-serif">{testimonials[current].name}</h4>
              <p className="text-gray-600">{testimonials[current].role}</p>
            </div>
            
            <div className="md:w-2/3">
              <blockquote className="text-lg italic text-gray-700">
                "{testimonials[current].content}"
              </blockquote>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="flex justify-center mt-8 space-x-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > current ? 1 : -1)
              setCurrent(index)
            }}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === current ? 'bg-sage-600' : 'bg-gray-300'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
      
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:text-sage-600 transition-colors"
        aria-label="Previous testimonial"
      >
        <FiChevronLeft size={24} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:text-sage-600 transition-colors"
        aria-label="Next testimonial"
      >
        <FiChevronRight size={24} />
      </button>
    </div>
  )
}