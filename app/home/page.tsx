'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import MainLayout from '../components/MainLayout'
import '../styles/home.css'
import Link from 'next/link'
import CardsSection from '../components/CardsSection'

const titles = ["HOSTEL 5", "PENTHOUSE", "INSTI\u00A0KA\u00A0BAAP"]

export default function HomePage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })
  const [titleIndex, setTitleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [text, setText] = useState('')
  const [delta, setDelta] = useState(200) 

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentTitle = titles[titleIndex]
      
      if (isDeleting) {
        setText(prev => prev.slice(0, -1))
        setDelta(100) 
      } else {
        setText(currentTitle.slice(0, text.length + 1))
        setDelta(200) 
      }

      if (!isDeleting && text === currentTitle) {
        setTimeout(() => setIsDeleting(true), 2000) 
      }

      
      if (isDeleting && text === '') {
        setIsDeleting(false)
        setTitleIndex((prev) => (prev + 1) % titles.length)
        setDelta(500) 
      }
    }, delta)

    return () => clearTimeout(timer)
  }, [text, delta, isDeleting, titleIndex])

  return (
    <MainLayout>
      <div className="home-container">
        <div className="hero">
          <div className="hero-wrapper">
            <motion.div 
              className="hero-image"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Image
                  src="/images/common/H5_Logo_Transparent.png"
                  alt="Hostel 5"
                  fill
                  style={{ 
                    objectFit: 'contain'
                  }}
                  priority
                />
              </div>
            </motion.div>

            <motion.div 
              className="hero-content"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <h1 className="hero-title">{text}</h1>
              <p className="hero-text">
                Welcome to the beating heart of student life at IIT Bombay where camaraderie meets academic excellence, and every corridor echoes with the spirit of innovation.
              </p>
              <p className="hero-text">
                Welcome to Hostel 5, your home away from home.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <section className="about-section">
        <motion.div 
          className="about-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="about-content">
            <h2 className="about-title">ABOUT US</h2>
            <p className="about-text">
              Located within the vibrant campus of the prestigious Indian Institute of
              Technology Bombay, Hostel 5 stands as more than just a residence; it's a
              community, a home away from home for students from diverse
              backgrounds and disciplines. With a rich history spanning decades,
              Hostel 5 has been a cornerstone of student life, fostering academic
              excellence, camaraderie, and personal growth.
            </p>
          </div>
          <div className="about-image">
            <div className="image-wrapper">
              <Image
                src="/images/homepage/about-us-home.png"
                alt="Hostel 5 at night"
                fill
                style={{ 
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="mission-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="mission-content">
            <h2 className="mission-title">OUR MISSION</h2>
            <p className="mission-text">
              At Hostel 5, our mission is simple yet profound: to provide an inclusive
              and nurturing environment where every resident can thrive academically,
              socially, and personally. We strive to cultivate a culture of respect,
              collaboration, and innovation, empowering our residents to pursue their
              passions, excel in their studies, and make meaningful contributions to
              society.
            </p>
          </div>
          <div className="mission-image">
            <div className="image-wrapper">
              <Image
                src="/images/homepage/our-mission-home.png"
                alt="Hostel 5 with lights"
                fill
                style={{ 
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      <div className="cards-section-wrapper" ref={containerRef}>
        <CardsSection />
      </div>
    </MainLayout>
  )
}