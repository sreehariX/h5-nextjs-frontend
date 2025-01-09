'use client'

import MainLayout from '../components/MainLayout'
import Image from 'next/image'
import '../styles/gallery.css'

const images = [
  '/images/starterpage/startpage_1.jpeg',
  '/images/starterpage/startpage_2.jpeg',
  '/images/studentandcoolimages/holy.jpg',
  
  '/images/starterpage/startpage_4.jpeg',
  '/images/starterpage/startpage_5.jpeg',
  //panorama
  '/images/studentandcoolimages/old.jpg',
  
  '/images/studentandcoolimages/newyear.jpg',
  '/images/starterpage/startpage_3.jpeg',

  '/images/studentandcoolimages/insync.jpg',
  
  '/images/studentandcoolimages/spphoto.jpg',
  '/images/studentandcoolimages/h5_logo.jpg',
  
 

  
]

export default function Gallery() {
  return (
    <MainLayout>
      <div className="gallery-container">
        {/* Top row */}
        <div className="gallery-row small-squares">
          {images.slice(0, 5).map((src, index) => (
            <div key={index} className="gallery-item small">
              <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                fill
                className="gallery-image"
              />
            </div>
          ))}
        </div>

        
        <div className="gallery-row panorama">
          <div className="gallery-item wide">
            <Image
              src={images[5]}
              alt="Panorama view"
              fill
              className="gallery-image"
            />
          </div>
        </div>

        
        <div className="gallery-grid">
          {images.slice(6).map((src, index) => (
            <div 
              key={index} 
              className={`gallery-item ${index % 3 === 1 ? 'wide' : 'normal'}`}
            >
              <Image
                src={src}
                alt={`Gallery image ${index + 7}`}
                fill
                className="gallery-image"
              />
            </div>
          ))}
        </div>

        
        <div className="gallery-row large-images">
          {images.slice(11).map((src, index) => (
            <div 
              key={index} 
              className="gallery-item large"
            >
              <Image
                src={src}
                alt={`Gallery image ${index + 12}`}
                fill
                className="gallery-image"
              />
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}