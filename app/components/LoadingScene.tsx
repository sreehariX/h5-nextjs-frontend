'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { BackgroundSlider } from './BackgroundSlider'
import { Space_Grotesk, Syne } from 'next/font/google'
import '../styles/loading-scene.css'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
})

const syne = Syne({ 
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
})

const backgroundImages = [
  '/images/starterpage/startpage_6.jpeg',
  '/images/studentandcoolimages/group.jpg',
  '/images/studentandcoolimages/old.jpg',
  '/images/starterpage/startpage_3.jpeg',
  '/images/starterpage/startpage_4.jpeg',
  '/images/studentandcoolimages/insync.jpg',
  '/images/starterpage/startpage_2.jpeg',
]

export default function LoadingScene() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const lastScrollY = useRef(0)
  const lastScrollTime = useRef(Date.now())

  const sections = [
    { 
      title: "    HOSTEL 5", 
      subtitle: "Your Home Away From Home", 
      titleClass: `text-7xl font-bold ${spaceGrotesk.className}` 
    },
    { 
      title: "WHERE MEMORIES", 
      subtitle: "Begin", 
      titleClass: `text-8xl font-bold ${spaceGrotesk.className}` 
    },
    { 
      title: "WELCOME TO", 
      subtitle: "Penthouse", 
      titleClass: `text-9xl font-bold ${spaceGrotesk.className}` 
    },
    
  ]

  useEffect(() => {
    let accumulatedDelta = 0
    const SCROLL_THRESHOLD = 20 
    const MIN_SCROLL_INTERVAL = 300 

    const handleScroll = (e: WheelEvent) => {
      e.preventDefault()
      
      if (isAnimating || isRedirecting) return

      const now = Date.now()
      const timeSinceLastScroll = now - lastScrollTime.current
      
      if (timeSinceLastScroll > MIN_SCROLL_INTERVAL) {
        accumulatedDelta = 0
      }
      
      accumulatedDelta += Math.abs(e.deltaY)

      if (accumulatedDelta > SCROLL_THRESHOLD) {
        if (timeSinceLastScroll > MIN_SCROLL_INTERVAL) {
          setIsAnimating(true)
          lastScrollTime.current = now
          
          if (e.deltaY > 0 && currentSection < sections.length - 1) {
            setCurrentSection(prev => prev + 1)
          } else if (e.deltaY < 0 && currentSection > 0) {
            setCurrentSection(prev => prev - 1)
          }
          
          accumulatedDelta = 0
          
          setTimeout(() => {
            setIsAnimating(false)
          }, 400) 
        }
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      lastScrollY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isAnimating || isRedirecting) return

      const currentY = e.touches[0].clientY
      const deltaY = lastScrollY.current - currentY
      const now = Date.now()
      const timeSinceLastScroll = now - lastScrollTime.current

      if (Math.abs(deltaY) > SCROLL_THRESHOLD && timeSinceLastScroll > MIN_SCROLL_INTERVAL) {
        setIsAnimating(true)
        lastScrollTime.current = now
        
        if (deltaY > 0 && currentSection < sections.length - 1) {
          setCurrentSection(prev => prev + 1)
        } else if (deltaY < 0 && currentSection > 0) {
          setCurrentSection(prev => prev - 1)
        }
        
        lastScrollY.current = currentY
        
        setTimeout(() => {
          setIsAnimating(false)
        }, 400)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleScroll, { passive: false })
      container.addEventListener('touchstart', handleTouchStart, { passive: false })
      container.addEventListener('touchmove', handleTouchMove, { passive: false })
    }

    if (currentSection === sections.length - 1) {
      const animationDelay = setTimeout(() => {
        setIsRedirecting(true)
        const redirectTimer = setTimeout(() => {
          router.push('/home')
        }, 2000)
        return () => clearTimeout(redirectTimer)
      }, 1000)

      return () => clearTimeout(animationDelay)
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleScroll)
        container.removeEventListener('touchstart', handleTouchStart)
        container.removeEventListener('touchmove', handleTouchMove)
      }
    }
  }, [currentSection, router, isAnimating, isRedirecting, sections.length])

  const currentContent = sections[currentSection]

  const handleSkip = () => {
    setIsRedirecting(true)
    setTimeout(() => {
      router.push('/home')
    }, 1000)
  }

  return (
    <BackgroundSlider images={backgroundImages}>
      <div className="scene-container" ref={containerRef}>
        <button
          onClick={handleSkip}
          className="skip-button"
        >
          Skip Animation →
        </button>

        <div className="content-wrapper">
          <AnimatePresence mode="wait">
            {isRedirecting ? (
              <motion.div
                className="redirect-message"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="loading-spinner" />
                <p>Taking you to Hostel 5...</p>
              </motion.div>
            ) : (
              <motion.div
                key={currentSection}
                className="section-content"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeOut"
                }}
                onAnimationComplete={() => setIsAnimating(false)}
              >
                <h1 className={`title ${currentContent.titleClass}`}>
                  {currentContent.title}
                </h1>
                <h2 className="subtitle">
                  {currentContent.subtitle}
                </h2>
              </motion.div>
            )}
          </AnimatePresence>

          {!isRedirecting && currentSection < sections.length - 1 && (
            <motion.div 
              className="scroll-indicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <span>Scroll to explore</span>
              <motion.div 
                className="scroll-arrow"
                animate={{ y: [0, 10, 0] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ↓
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </BackgroundSlider>
  )
}