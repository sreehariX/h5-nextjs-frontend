'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

interface EventCardProps {
  image: string
  title: string
  description: string
}

export default function EventCard({ image, title, description }: EventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div 
      className="max-w-4xl mx-auto mt-8 bg-[#141450] rounded-lg shadow-lg overflow-hidden cursor-pointer"
      whileHover={{ scale: isExpanded ? 1 : 1.02 }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="relative h-96 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        
        <motion.div
          initial={{ height: isExpanded ? 'auto' : '80px' }}
          animate={{ height: isExpanded ? 'auto' : '80px' }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="text-gray-300 whitespace-pre-line">{description}</p>
        </motion.div>
      </div>

      <motion.div 
        className="bg-blue-500 p-4 text-white text-center"
        animate={{ rotate: isExpanded ? 180 : 0 }}
      >
        {isExpanded ? '↑ Click to collapse' : '↓ Click to see more details'}
      </motion.div>
    </motion.div>
  )
}