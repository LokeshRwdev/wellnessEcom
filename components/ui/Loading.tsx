'use client'

import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-16 h-16">
        <motion.div
          className="absolute inset-0 border-4 border-t-sage-500 border-r-sage-300 border-b-sage-100 border-l-sage-300 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  )
}