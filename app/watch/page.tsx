'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import VideoPlayerDesktop from '@/components/watch/VideoPlayerDesktop'
import VideoPlayerMobile from '@/components/watch/VideoPlayerMobile'

function WatchPageContent() {
  const [isMobile, setIsMobile] = useState(false)
  const searchParams = useSearchParams()
  const videoId = searchParams.get('id') || '1'

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="min-h-screen bg-black">
      {isMobile ? (
        <VideoPlayerMobile initialVideoId={videoId} />
      ) : (
        <VideoPlayerDesktop initialVideoId={videoId} />
      )}
    </div>
  )
}

export default function WatchPage() {
  return (
    <Suspense>
      <WatchPageContent />
    </Suspense>
  )
}