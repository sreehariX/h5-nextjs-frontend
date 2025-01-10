'use client'

import MainLayout from '../components/MainLayout'
import Gallery from 'react-photo-gallery'
import { motion } from 'framer-motion'
import '../styles/gallery.css'
import { useState, useEffect } from 'react'
import Modal from 'react-modal'

const images = [
  { src: '/images/studentandcoolimages/newyear.jpg', width: 6, height: 3 },
  { src: '/images/studentandcoolimages/holy.jpg', width: 4, height: 3 },
  { src: '/images/starterpage/startpage_2.jpeg', width: 4, height: 3 },
  { src: '/images/starterpage/startpage_4.jpeg', width: 5, height: 3 },
  { src: '/images/studentandcoolimages/old.jpg', width: 16, height: 9 },
  { src: '/images/starterpage/startpage_5.jpeg', width: 6, height: 3 },
  { src: '/images/starterpage/startpage_3.jpeg', width: 4, height: 3 },
  { src: '/images/studentandcoolimages/insync.jpg', width: 4, height: 3 },
  { src: '/images/starterpage/startpage_1.jpeg', width: 5, height: 3 },
  { src: '/images/studentandcoolimages/spphoto.jpg', width: 8, height: 3 },
  { src: '/images/studentandcoolimages/h5_logo.jpg', width: 6, height: 3 },
  { src: '/images/studentandcoolimages/cool_1.jpg', width: 4, height: 3 },
  { src: '/images/studentandcoolimages/cool_2.jpg', width: 4, height: 3 },
  { src: '/images/studentandcoolimages/cool_3.jpg', width: 4, height: 3 },
  { src: '/images/studentandcoolimages/cool_4.jpg', width: 6, height: 3 },
  { src: '/images/studentandcoolimages/cool_5.jpg', width: 6, height: 3 },
  { src: '/images/studentandcoolimages/cool_6.jpg', width: 4, height: 3 },
  { src: '/images/studentandcoolimages/cool_7.jpg', width: 4, height: 3 },
  { src: '/images/studentandcoolimages/cool_8.jpg', width: 5, height: 3 },
  { src: '/images/studentandcoolimages/cool_9.jpg', width: 4, height: 3 },
  { src: '/images/studentandcoolimages/cool_10.jpg', width: 7, height: 3 },
]

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeIn"
    }
  }
}

export default function GalleryPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null)

  const openModal = (event, { photo, index }) => {
    setSelectedImageIndex(index)
  }

  const closeModal = () => {
    setSelectedImageIndex(null)
  }

  const handleKeyDown = (event) => {
    if (selectedImageIndex !== null) {
      if (event.key === 'ArrowRight') {
        setSelectedImageIndex((prevIndex) => 
          prevIndex < images.length - 1 ? prevIndex + 1 : 0
        )
      } else if (event.key === 'ArrowLeft') {
        setSelectedImageIndex((prevIndex) => 
          prevIndex > 0 ? prevIndex - 1 : images.length - 1
        )
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedImageIndex])

  return (
    <MainLayout>
      <motion.div 
        className="gallery-container"
        initial="hidden"
        animate="show"
        variants={rowVariants}
      >
        <Gallery photos={images} onClick={openModal} />
      </motion.div>

      <Modal
        isOpen={selectedImageIndex !== null}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="modal"
        overlayClassName="overlay"
      >
        {selectedImageIndex !== null && (
          <motion.img 
            src={images[selectedImageIndex].src} 
            alt="Selected" 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </Modal>
    </MainLayout>
  )
}
