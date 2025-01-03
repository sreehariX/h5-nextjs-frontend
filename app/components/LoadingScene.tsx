'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import LoadingBackground from './LoadingBackground'
import '../styles/loading-scene.css'

export default function LoadingScene() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let progress = 0
    const updateProgress = () => {
      if (progress < 100) {
        progress += Math.random() * 30
        if (progress > 100) progress = 100
        if (progressRef.current) {
          progressRef.current.style.width = `${progress}%`
        }
        if (progress < 100) {
          setTimeout(updateProgress, 500)
        } else {
          setIsLoaded(true)
        }
      }
    }

    updateProgress()
  }, [])

  const handleEnter = () => {
    router.push('/home')
  }

  return (
    <div className="loading-container">
      <Image
        src="/images/starterpage/starterimage.png"
        alt="Background"
        fill
        className="object-cover"
        priority
      />
      
      <LoadingBackground />
      
      <div className="loading-overlay" />
      
      <div className="loading-content-wrapper" style={{ zIndex: 2 }}>
        <div className="loading-content">
          <Image
            src="/images/common/H5_logo_white.png"
            alt="H5 Logo"
            width={100}
            height={100}
            className="logo"
          />
          
          <h1 className="welcome-title">
            WELCOME
          </h1>

          <h2 className="welcome-subtitle">
            To Our PentHouse
          </h2>

          <div className="welcome-message">
            <p className="mb-4">
              Welcome to the beating heart of student life at IIT Bombay where camaraderie meets academic excellence, and every corridor echoes with the spirit of innovation.
            </p>
            <p>
              Welcome to Hostel 5, your home away from home.
            </p>
          </div>
          
          {!isLoaded ? (
            <div className="loading-bar-container">
              <div className="loading-bar">
                <div
                  ref={progressRef}
                  className="loading-progress"
                />
              </div>
              <p className="loading-text">
                LOADING ...
              </p>
            </div>
          ) : (
            <button
              onClick={handleEnter}
              className="enter-button"
              style={{ position: 'relative', zIndex: 20 }}
            >
              ENTER
            </button>
          )}
        </div>
      </div>
    </div>
  )
}