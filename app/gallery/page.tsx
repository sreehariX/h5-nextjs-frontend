'use client'

import MainLayout from '../components/MainLayout'
import Image from 'next/image'
import '../styles/gallery.css'

const images = [
  '/images/gallerypage/gallery_1.png',
  '/images/gallerypage/gallery_2.png',
  '/images/gallerypage/gallery_3.png',
  '/images/gallerypage/gallery_4.png',
]

export default function Gallery() {
  return (
    <MainLayout>
      <div className="banner">
        <div className="slider" style={{ '--quantity': images.length } as React.CSSProperties}>
          {images.map((src, index) => (
            <div 
              key={src}
              className="item"
              style={{ '--position': index + 1 } as React.CSSProperties}
            >
              <div className="image-wrapper">
                <Image
                  src={src}
                  alt={`Hostel 5 moment ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="content">
          <h1>MEMORIES</h1>
        </div>
      </div>
    </MainLayout>
  )
}