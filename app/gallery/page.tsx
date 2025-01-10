'use client'

import MainLayout from '../components/MainLayout'
import Gallery from 'react-photo-gallery'
import { motion } from 'framer-motion'
import '../styles/gallery.css'
import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'

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

function GalleryContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedImage = searchParams.get('image')

  const openModal = (
    event: React.MouseEvent<Element, MouseEvent>, 
    { photo }: { photo: { src: string } }
  ) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('image', photo.src)
    router.push(`?${params.toString()}`)
  }

  const closeModal = () => {
    router.back()
  }

  return (
    <>
      <motion.div 
        className="gallery-container"
        initial="hidden"
        animate="show"
        variants={rowVariants}
      >
        <Gallery photos={images} onClick={openModal} />
      </motion.div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 mt-20"
             onClick={closeModal}>
          <motion.img 
            src={selectedImage} 
            alt="Selected" 
            className="max-h-[calc(100vh-120px)] max-w-[90vw] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}
    </>
  )
}

export default function GalleryPage() {
  return (
    <MainLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <GalleryContent />
      </Suspense>
    </MainLayout>
  )
}
