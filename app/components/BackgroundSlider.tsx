'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface BackgroundSliderProps {
  images: string[]
  interval?: number
  children: React.ReactNode
}

export const BackgroundSlider = ({ 
  images, 
  interval = 4000,
  children 
}: BackgroundSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState<boolean[]>([])

  useEffect(() => {
    const loadImages = async () => {
      const loadStates = await Promise.all(
        images.map((src) => {
          return new Promise<boolean>((resolve) => {
            const img = document.createElement('img')
            img.src = src
            img.onload = () => resolve(true)
            img.onerror = () => resolve(false)
          })
        })
      )
      setIsLoaded(loadStates)
    }
    loadImages()
  }, [images])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, interval)
    return () => clearInterval(timer)
  }, [images.length, interval])

  return (
    <div className="relative h-full w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {isLoaded[currentIndex] && (
          <motion.div
            key={currentIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <Image
              src={images[currentIndex]}
              alt="Background"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}