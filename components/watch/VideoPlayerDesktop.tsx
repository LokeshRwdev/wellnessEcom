'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiChevronLeft, FiChevronRight, FiVolume2, FiVolumeX, FiShare, FiHeart, FiShoppingBag } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

interface VideoPlayerDesktopProps {
  initialVideoId: string
}

export default function VideoPlayerDesktop({ initialVideoId }: VideoPlayerDesktopProps) {
  const router = useRouter()
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [showControls, setShowControls] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  const videos = [
    {
      id: '1',
      title: "Kanishka's versatile make-up brushes",
      videoUrl: 'https://d3olzcjcik4n3k.cloudfront.net/672b537589dc54d1f4983829/mp4-672b537589dc54d1f4983829/208201a1a7ea4288aab74dcad3c3c23e.mp4',
      thumbnail: 'https://images.pexels.com/photos/4498185/pexels-photo-4498185.jpeg',
      products: [
        {
          id: 'brush-set-1',
          name: 'Praush 5 Pcs Essentials Face Brush Set',
          price: 1100,
          originalPrice: 2499,
          discount: 50,
          image: 'https://images.pexels.com/photos/4498185/pexels-photo-4498185.jpeg'
        },
        {
          id: 'brush-set-2',
          name: 'Luminous HD Face Brush Set',
          price: 1300,
          originalPrice: 2499,
          discount: 48,
          image: 'https://images.pexels.com/photos/4498194/pexels-photo-4498194.jpeg'
        }
      ]
    },
    {
      id: '2',
      title: 'Ayurvedic Supplement Guide',
      videoUrl: 'https://d3olzcjcik4n3k.cloudfront.net/672b537589dc54d1f4983829/mp4-672b537589dc54d1f4983829/208201a1a7ea4288aab74dcad3c3c23e.mp4',
      thumbnail: 'https://images.pexels.com/photos/6694546/pexels-photo-6694546.jpeg',
      products: [
        {
          id: 'supplement-1',
          name: 'Organic Turmeric Capsules',
          price: 899,
          originalPrice: 1299,
          discount: 31,
          image: 'https://images.pexels.com/photos/6694546/pexels-photo-6694546.jpeg'
        }
      ]
    },
    {
      id: '3',
      title: 'Herbal Tea Benefits',
      videoUrl: 'https://d3olzcjcik4n3k.cloudfront.net/672b537589dc54d1f4983829/mp4-672b537589dc54d1f4983829/208201a1a7ea4288aab74dcad3c3c23e.mp4',
      thumbnail: 'https://images.pexels.com/photos/6693953/pexels-photo-6693953.jpeg',
      products: [
        {
          id: 'tea-1',
          name: 'Wellness Herbal Tea Blend',
          price: 599,
          originalPrice: 899,
          discount: 33,
          image: 'https://images.pexels.com/photos/6693953/pexels-photo-6693953.jpeg'
        }
      ]
    }
  ]

  const currentVideo = videos[currentVideoIndex]

  useEffect(() => {
    const initialIndex = videos.findIndex(v => v.id === initialVideoId)
    if (initialIndex !== -1) {
      setCurrentVideoIndex(initialIndex)
    }
  }, [initialVideoId])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (showControls) {
      timer = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
    return () => clearTimeout(timer)
  }, [showControls])

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length)
  }

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
    }
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex">
      {/* Main Video Area */}
      <div className="flex-1 relative flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentVideoIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full max-w-md mx-auto"
            onMouseMove={() => setShowControls(true)}
          >
            <video
              ref={videoRef}
              src={currentVideo.videoUrl}
              poster={currentVideo.thumbnail}
              className="w-full h-full object-cover rounded-lg"
              autoPlay
              muted={isMuted}
              loop
              playsInline
            />
            
            {/* Video Controls Overlay */}
            <AnimatePresence>
              {showControls && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50"
                >
                  {/* Top Controls */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                    <button
                      onClick={() => router.back()}
                      className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                    >
                      <FiX size={20} />
                    </button>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={toggleMute}
                        className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                      >
                        {isMuted ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
                      </button>
                      <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                        <FiShare size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevVideo}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <FiChevronLeft size={24} />
                  </button>
                  
                  <button
                    onClick={nextVideo}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <FiChevronRight size={24} />
                  </button>

                  {/* Bottom Title */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h1 className="text-white text-lg font-medium">{currentVideo.title}</h1>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* Story Progress Indicators */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-1">
          {videos.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentVideoIndex ? 'bg-white w-8' : 'bg-white/30 w-6'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Product Sidebar */}
      <div className="w-80 bg-gray-900 text-white p-6 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-6">Featured Products</h2>
        
        <div className="space-y-4">
          {currentVideo.products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-800 rounded-lg p-4"
            >
              <div className="flex gap-3">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm leading-tight mb-2">{product.name}</h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-green-400">₹{product.price}</span>
                    <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                      {product.discount}% Off
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium py-2 px-3 rounded transition-colors">
                      Add to cart
                    </button>
                    <button className="w-8 h-8 border border-gray-600 rounded flex items-center justify-center hover:border-pink-500 transition-colors">
                      <FiHeart size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}