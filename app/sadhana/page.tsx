'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiSettings, FiClock, FiBell, FiSkipForward, FiSkipBack, FiPlus } from 'react-icons/fi'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import ExploreProducts from '@/components/sadhana/ExploreProducts'

interface Practice {
  id: string
  title: string
  description: string
  audioUrl: string
  defaultDuration: number // in minutes
  isAdjustable: boolean
  icon: React.ReactNode
  color: string
  category: 'meditation' | 'yoga' | 'chanting'
}

export default function SadhanaPage() {
  const [currentPracticeIndex, setCurrentPracticeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playlistStarted, setPlaylistStarted] = useState(false)
  
  // Practice durations (adjustable)
  const [practiceDurations, setPracticeDurations] = useState({
    breathing: 2,
    bell: 15,
    samveda: 30
  })
  
  const audioRef = useRef<HTMLAudioElement>(null)
  const bellTimerRef = useRef<NodeJS.Timeout | null>(null)

  const sanyamaPractices: Practice[] = [
    {
      id: 'padmasadhana',
      title: 'Padmasadhana',
      description: 'Traditional lotus meditation practice for inner awakening',
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      defaultDuration: 45,
      isAdjustable: false,
      icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9H21ZM19 21H5V3H13V9H19V21Z"/></svg>,
      color: 'from-sage-400 to-sage-600',
      category: 'meditation'
    },
    {
      id: 'breathing',
      title: 'Breath Awareness',
      description: 'Guided breathing meditation for mindfulness',
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      defaultDuration: practiceDurations.breathing,
      isAdjustable: true,
      icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/></svg>,
      color: 'from-terracotta-400 to-terracotta-600',
      category: 'meditation'
    },
    {
      id: 'bell',
      title: 'Meditation Bell',
      description: 'Periodic awareness bells during silent meditation',
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      defaultDuration: practiceDurations.bell,
      isAdjustable: true,
      icon: <FiBell className="w-6 h-6" />,
      color: 'from-lavender-400 to-lavender-600',
      category: 'meditation'
    },
    {
      id: 'samveda',
      title: 'Samveda Chanting',
      description: 'Sacred Vedic chants for spiritual elevation',
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      defaultDuration: practiceDurations.samveda,
      isAdjustable: true,
      icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12,3V12.26C11.5,12.09 11,12 10.5,12C8.01,12 6,14.01 6,16.5C6,18.99 8.01,21 10.5,21C12.99,21 15,18.99 15,16.5V7H19V3H12Z"/></svg>,
      color: 'from-cream-400 to-cream-600',
      category: 'chanting'
    }
  ]

  // Future practices that can be added
  const futurePractices = [
    { category: 'yoga', title: 'Surya Namaskara', description: 'Sun salutation sequence' },
    { category: 'yoga', title: 'Pranayama', description: 'Advanced breathing techniques' },
    { category: 'meditation', title: 'Vipassana', description: 'Insight meditation practice' },
    { category: 'chanting', title: 'Om Chanting', description: 'Sacred sound meditation' },
    { category: 'meditation', title: 'Trataka', description: 'Candle gazing meditation' }
  ]

  const currentPractice = sanyamaPractices[currentPracticeIndex]
  const totalDuration = sanyamaPractices.reduce((total, practice) => {
    if (practice.id === 'breathing') return total + practiceDurations.breathing
    if (practice.id === 'bell') return total + practiceDurations.bell
    if (practice.id === 'samveda') return total + practiceDurations.samveda
    return total + practice.defaultDuration
  }, 0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handlePracticeEnd)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handlePracticeEnd)
    }
  }, [currentPracticeIndex])

  const handlePracticeEnd = () => {
    if (currentPracticeIndex < sanyamaPractices.length - 1) {
      // Move to next practice
      setCurrentPracticeIndex(prev => prev + 1)
      setCurrentTime(0)
    } else {
      // Playlist completed
      setIsPlaying(false)
      setPlaylistStarted(false)
      setCurrentPracticeIndex(0)
      setCurrentTime(0)
    }
  }

  const startPlaylist = () => {
    setPlaylistStarted(true)
    setCurrentPracticeIndex(0)
    setIsPlaying(true)
  }

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const nextPractice = () => {
    if (currentPracticeIndex < sanyamaPractices.length - 1) {
      setCurrentPracticeIndex(prev => prev + 1)
      setCurrentTime(0)
    }
  }

  const prevPractice = () => {
    if (currentPracticeIndex > 0) {
      setCurrentPracticeIndex(prev => prev - 1)
      setCurrentTime(0)
    }
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    audio.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const updateDuration = (practiceId: string, newDuration: number) => {
    setPracticeDurations(prev => ({
      ...prev,
      [practiceId]: newDuration
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-cream-50 to-lavender-50">
      <div className="container-custom py-8">
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Sadhana', href: '/sadhana' },
          ]} 
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-8 mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-sage-800 mb-4">Sanyama Sadhana</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-2">
            Complete spiritual practice combining meditation, breathing, and sacred chants
          </p>
          <p className="text-sage-600 font-medium">Total Duration: {totalDuration} minutes</p>
        </motion.div>

        {/* Playlist Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif text-sage-800">Practice Sequence</h2>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="w-12 h-12 bg-sage-100 hover:bg-sage-200 rounded-full flex items-center justify-center transition-colors"
            >
              <FiSettings className="w-6 h-6 text-sage-600" />
            </button>
          </div>

          {/* Practice List */}
          <div className="space-y-4 mb-8">
            {sanyamaPractices.map((practice, index) => (
              <motion.div
                key={practice.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center p-4 rounded-xl border-2 transition-all ${
                  currentPracticeIndex === index && playlistStarted
                    ? 'border-sage-300 bg-sage-50'
                    : 'border-gray-200 hover:border-sage-200'
                }`}
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${practice.color} flex items-center justify-center text-white mr-4`}>
                  {practice.icon}
                </div>
                
                <div className="flex-grow">
                  <h3 className="font-medium text-gray-900">{practice.title}</h3>
                  <p className="text-sm text-gray-600">{practice.description}</p>
                </div>
                
                <div className="text-right">
                  <span className="text-sm font-medium text-sage-600">
                    {practice.id === 'breathing' ? practiceDurations.breathing :
                     practice.id === 'bell' ? practiceDurations.bell :
                     practice.id === 'samveda' ? practiceDurations.samveda :
                     practice.defaultDuration} min
                  </span>
                  {practice.isAdjustable && (
                    <p className="text-xs text-gray-500">Adjustable</p>
                  )}
                </div>
                
                {currentPracticeIndex === index && playlistStarted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-3 h-3 bg-sage-500 rounded-full ml-4"
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Main Controls */}
          {!playlistStarted ? (
            <div className="text-center">
              <motion.button
                onClick={startPlaylist}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                <FiPlay className="w-6 h-6" />
                Begin Sanyama Sadhana
              </motion.button>
            </div>
          ) : (
            <div>
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>{currentPractice.title}</span>
                  <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className={`bg-gradient-to-r ${currentPractice.color} h-2 rounded-full`}
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={prevPractice}
                  disabled={currentPracticeIndex === 0}
                  className="w-12 h-12 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors"
                >
                  <FiSkipBack className="w-6 h-6" />
                </button>
                
                <button
                  onClick={toggleMute}
                  className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                >
                  {isMuted ? <FiVolumeX className="w-6 h-6" /> : <FiVolume2 className="w-6 h-6" />}
                </button>
                
                <motion.button
                  onClick={togglePlayPause}
                  whileTap={{ scale: 0.95 }}
                  className={`w-16 h-16 bg-gradient-to-r ${currentPractice.color} text-white rounded-full flex items-center justify-center shadow-lg transition-all`}
                >
                  {isPlaying ? <FiPause className="w-8 h-8" /> : <FiPlay className="w-8 h-8 ml-1" />}
                </motion.button>
                
                <button
                  onClick={nextPractice}
                  disabled={currentPracticeIndex === sanyamaPractices.length - 1}
                  className="w-12 h-12 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors"
                >
                  <FiSkipForward className="w-6 h-6" />
                </button>
                
                <button className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
                  <FiClock className="w-6 h-6" />
                </button>
              </div>
            </div>
          )}

          {/* Settings Panel */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 pt-8 border-t border-gray-200"
              >
                <h3 className="text-lg font-medium mb-6">Adjust Practice Durations</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Breath Awareness (minutes)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="15"
                      value={practiceDurations.breathing}
                      onChange={(e) => updateDuration('breathing', Number(e.target.value))}
                      className="w-full"
                    />
                    <span className="text-sm text-gray-500">{practiceDurations.breathing} minutes</span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bell Interval (minutes)
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="60"
                      step="5"
                      value={practiceDurations.bell}
                      onChange={(e) => updateDuration('bell', Number(e.target.value))}
                      className="w-full"
                    />
                    <span className="text-sm text-gray-500">{practiceDurations.bell} minutes</span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Samveda Chanting (minutes)
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="60"
                      step="5"
                      value={practiceDurations.samveda}
                      onChange={(e) => updateDuration('samveda', Number(e.target.value))}
                      className="w-full"
                    />
                    <span className="text-sm text-gray-500">{practiceDurations.samveda} minutes</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <audio
            ref={audioRef}
            src={currentPractice?.audioUrl}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={handlePracticeEnd}
          />
        </motion.div>

        {/* Future Practices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-soft p-8 mb-12"
        >
          <h2 className="text-2xl font-serif text-sage-800 mb-6">Expand Your Practice</h2>
          <p className="text-gray-600 mb-6">More practices coming soon to enhance your spiritual journey</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {futurePractices.map((practice, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border-2 border-dashed border-gray-300 rounded-xl text-center hover:border-sage-300 transition-colors"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FiPlus className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="font-medium text-gray-700 mb-1">{practice.title}</h3>
                <p className="text-sm text-gray-500">{practice.description}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  {practice.category}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Meditation Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-soft p-8 mb-12"
        >
          <h2 className="text-2xl font-serif text-sage-800 mb-6 text-center">Sanyama Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-sage-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9H21ZM19 21H5V3H13V9H19V21Z"/>
                </svg>
              </div>
              <h3 className="font-medium mb-2">Prepare Your Space</h3>
              <p className="text-gray-600 text-sm">Create a sacred space free from distractions for your complete practice</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-terracotta-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiClock className="w-8 h-8 text-terracotta-600" />
              </div>
              <h3 className="font-medium mb-2">Follow the Sequence</h3>
              <p className="text-gray-600 text-sm">Each practice builds upon the previous one for maximum benefit</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-lavender-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-lavender-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
                </svg>
              </div>
              <h3 className="font-medium mb-2">Stay Present</h3>
              <p className="text-gray-600 text-sm">Maintain awareness throughout the entire sequence without rushing</p>
            </div>
          </div>
        </motion.div>
      </div>

      <ExploreProducts />
    </div>
  )
}