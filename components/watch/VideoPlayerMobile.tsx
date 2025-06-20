'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { FiX, FiHeart, FiShare, FiShoppingBag, FiVolume2, FiVolumeX } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface VideoPlayerMobileProps {
  initialVideoId: string
}

export default function VideoPlayerMobile({ initialVideoId }: VideoPlayerMobileProps) {
  const router = useRouter()
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [showProductOverlay, setShowProductOverlay] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  
  const videos = [
    {
      id: '1',
      title: "Kanishka's versatile make-up brushes",
      videoUrl: 'https://d3olzcjcik4n3k.cloudfront.net/672b537589dc54d1f4983829/mp4-672b537589dc54d1f4983829/208201a1a7ea4288aab74dcad3c3c23e.mp4',
      thumbnail: 'https://images.pexels.com/photos/4498185/pexels-photo-4498185.jpeg',
      likes: '2.1K',
      products: [
        {
          id: 'brush-set-1',
          name: 'Praush 5 Pcs Essentials Face Brush Set',
          price: 1100,
          originalPrice: 2499,
          discount: 50,
          image: 'https://images.pexels.com/photos/4498185/pexels-photo-4498185.jpeg'
        }
      ]
    },
    {
      id: '2',
      title: 'Ayurvedic Supplement Guide',
      videoUrl: 'https://d3olzcjcik4n3k.cloudfront.net/672b537589dc54d1f4983829/mp4-672b537589dc54d1f4983829/208201a1a7ea4288aab74dcad3c3c23e.mp4',
      thumbnail: 'https://images.pexels.com/photos/6694546/pexels-photo-6694546.jpeg',
      likes: '1.8K',
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
      likes: '3.2K',
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

  useEffect(() => {
    const initialIndex = videos.findIndex(v => v.id === initialVideoId)
    if (initialIndex !== -1) {
      setCurrentVideoIndex(initialIndex)
    }
  }, [initialVideoId])

  const handleSwipe = useCallback((direction: 'up' | 'down') => {
    if (direction === 'up') {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length)
    } else {
      setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length)
    }
  }, [videos.length])

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 50
    if (info.offset.y < -threshold) {
      handleSwipe('up')
    } else if (info.offset.y > threshold) {
      handleSwipe('down')
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    videoRefs.current.forEach(video => {
      if (video) {
        video.muted = !isMuted
      }
    })
  }

  const currentVideo = videos[currentVideoIndex]

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-hidden">
      <motion.div
        className="h-full"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        onDragEnd={handleDragEnd}
        dragElastic={0.1}
      >
        <div className="relative h-full">
          {/* Video */}
          <video
            ref={(el) => {
              videoRefs.current[currentVideoIndex] = el
            }}
            key={currentVideoIndex}
            src={currentVideo.videoUrl}
            poster={currentVideo.thumbnail}
            className="w-full h-full object-cover"
            autoPlay
            muted={isMuted}
            loop
            playsInline
          />

          {/* Top Controls */}
          <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent z-10">
            <div className="flex justify-between items-center">
              <button
                onClick={() => router.back()}
                className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white"
              >
                <FiX size={20} />
              </button>
              
              <button
                onClick={toggleMute}
                className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white"
              >
                {isMuted ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
              </button>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="absolute right-4 bottom-20 flex flex-col items-center gap-6 z-10">
            <button className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white">
              <FiHeart size={24} />
            </button>
            <span className="text-white text-sm font-medium">{currentVideo.likes}</span>
            
            <button className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white">
              <FiShare size={24} />
            </button>
            
            <button
              onClick={() => setShowProductOverlay(true)}
              className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white"
            >
              <FiShoppingBag size={24} />
            </button>
          </div>

          {/* Bottom Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent z-10">
            <div className="mb-4">
              <h1 className="text-white text-lg font-semibold mb-2">{currentVideo.title}</h1>
              
              {/* Featured Product Preview */}
              {currentVideo.products[0] && (
                <div className="flex items-center gap-3 bg-black/40 backdrop-blur-sm rounded-lg p-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                    <Image
                      src={currentVideo.products[0].image}
                      alt={currentVideo.products[0].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{currentVideo.products[0].name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400 font-bold">₹{currentVideo.products[0].price}</span>
                      <span className="text-gray-400 text-sm line-through">₹{currentVideo.products[0].originalPrice}</span>
                      <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                        {currentVideo.products[0].discount}% Off
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowProductOverlay(true)}
                    className="bg-pink-600 text-white text-sm font-medium px-4 py-2 rounded"
                  >
                    Shop Now
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Scroll Indicators */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
            {videos.map((_, index) => (
              <div
                key={index}
                className={`w-1 h-8 rounded-full transition-all duration-300 ${
                  index === currentVideoIndex ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Product Overlay */}
      <AnimatePresence>
        {showProductOverlay && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-x-0 bottom-0 bg-white rounded-t-2xl p-6 z-20"
            style={{ maxHeight: '70vh' }}
          >
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
            
            <h2 className="text-xl font-semibold mb-4">Featured Products</h2>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {currentVideo.products.map((product) => (
                <div key={product.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium mb-2">{product.name}</h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-green-600">₹{product.price}</span>
                      <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        {product.discount}% Off
                      </span>
                    </div>
                    
                    <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => setShowProductOverlay(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <FiX size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}