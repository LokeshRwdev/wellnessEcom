'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiMaximize } from 'react-icons/fi'

interface ProductImageGalleryProps {
  images: string[]
}

export default function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }
  
  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }
  
  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-lg overflow-hidden bg-white">
        <Image 
          src={images[currentImage]} 
          alt="Product image" 
          fill 
          className="object-contain"
        />
        
        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-700 hover:text-sage-600 transition-colors"
          aria-label="View full size image"
        >
          <FiMaximize size={20} />
        </button>
        
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-700 hover:text-sage-600 transition-colors"
          aria-label="Previous image"
        >
          <FiChevronLeft size={24} />
        </button>
        
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-700 hover:text-sage-600 transition-colors"
          aria-label="Next image"
        >
          <FiChevronRight size={24} />
        </button>
      </div>
      
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`relative w-20 h-20 rounded-md overflow-hidden ${
              currentImage === index
                ? 'ring-2 ring-sage-500'
                : 'ring-1 ring-gray-200'
            }`}
          >
            <Image 
              src={image} 
              alt={`Product thumbnail ${index + 1}`} 
              fill 
              className="object-cover"
            />
          </button>
        ))}
      </div>
      
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <div className="relative w-full max-w-4xl h-full max-h-screen p-4 flex items-center justify-center">
              <Image 
                src={images[currentImage]} 
                alt="Product image full size" 
                fill 
                className="object-contain"
              />
              
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
                className="absolute top-1/2 left-4 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                aria-label="Previous image"
              >
                <FiChevronLeft size={28} />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
                className="absolute top-1/2 right-4 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                aria-label="Next image"
              >
                <FiChevronRight size={28} />
              </button>
              
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentImage(index)
                    }}
                    className={`w-3 h-3 rounded-full ${
                      currentImage === index ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}