'use client'

import MainLayout from '../components/MainLayout'
import Gallery from 'react-photo-gallery'
import { motion } from 'framer-motion'
import '../styles/gallery.css'

const images = [
  { src: '/images/starterpage/startpage_1.jpeg', width: 5, height: 3 },
  { src: '/images/starterpage/startpage_2.jpeg', width: 4, height: 3 },
  { src: '/images/studentandcoolimages/holy.jpg', width: 4, height: 3 },
  { src: '/images/starterpage/startpage_4.jpeg', width: 5, height: 3 },
  { src: '/images/starterpage/startpage_5.jpeg', width: 6, height: 3 },
  { src: '/images/studentandcoolimages/old.jpg', width: 16, height: 9 },
  { src: '/images/studentandcoolimages/newyear.jpg', width: 4, height: 3 },
  { src: '/images/starterpage/startpage_3.jpeg', width: 4, height: 3 },
  { src: '/images/studentandcoolimages/insync.jpg', width: 4, height: 3 },
  { src: '/images/studentandcoolimages/spphoto.jpg', width: 4, height: 3 },
  { src: '/images/studentandcoolimages/h5_logo.jpg', width: 4, height: 3 },
  { src: '/images/studentandcoolimages/cool_1.jpg', width: 4, height: 3 },
  { src: '/images/studentandcoolimages/cool_2.jpg', width: 4, height: 3 },
  { src: '/images/studentandcoolimages/cool_3.jpg', width: 4, height: 3 },
  { src: '/images/studentandcoolimages/cool_4.jpg', width: 4, height: 3 },
  { src: '/images/studentandcoolimages/cool_5.jpg', width: 4, height: 3 },
  { src: '/images/studentandcoolimages/cool_6.jpg', width: 4, height: 3 },
  { src: '/images/studentandcoolimages/cool_7.jpg', width: 4, height: 3 },
  { src: '/images/studentandcoolimages/cool_8.jpg', width: 4, height: 3 },
  { src: '/images/studentandcoolimages/cool_9.jpg', width: 4, height: 3 },
  { src: '/images/studentandcoolimages/cool_10.jpg', width: 4, height: 3 },
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
  return (
    <MainLayout>
      <motion.div 
        className="gallery-container"
        initial="hidden"
        animate="show"
        variants={rowVariants}
      >
        <Gallery photos={images} />
      </motion.div>
    </MainLayout>
  )
}