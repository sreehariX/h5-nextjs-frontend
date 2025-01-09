'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import '../styles/cards.css'

const cards = [
  {
    headline: "SPORTS",
    description: [
      "In the arena of sports, Hostel 5 reigns supreme. With state-of-the-art facilities and a passion for excellence, we celebrate teamwork, determination, and sporting prowess."
    ],
    image: "/images/gcs/sports/sports_kho_kho.jpeg",
    link: "/sports"
  },
  {
    headline: "CULTURALS",
    description: [
      "From vibrant cultural festivals to spirited talent nights, Hostel 5 is a melting pot of creativity, where diverse talents shine."
    ],
    image: "/images/studentandcoolimages/insync.jpg",
    link: "/culturals"
  },
  {
    headline: "TECHNICALS",
    description: [
      "At Hostel 5, innovation knows no bounds. From hackathons to technical symposiums, we're a hub of ideas where minds converge to shape the future."
    ],
    image: "/images/gcs/tech/rubegoldberg.jpeg",
    link: "/technicals"
  }
]

export default function CardsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const cardHeight = 400

  return (
    <div className="cards-wrapper">
      <section ref={containerRef} className="cards-section">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className={`card card-${index + 1}`}
            style={{
              position: 'sticky',
              top: '120px',
              zIndex: index + 1,
              scale: useTransform(
                scrollYProgress,
                [index / cards.length, (index + 0.3) / cards.length],
                [1, index === 2 ? 1 : 0.9]
              ),
              translateY: useTransform(
                scrollYProgress,
                [
                  index / cards.length,
                  (index + 0.15) / cards.length,
                  (index + 0.3) / cards.length,
                  (index + 0.8) / cards.length
                ],
                [
                  cardHeight * (index + 1),
                  cardHeight * index,
                  index === 0 ? 0 : (index === 1 ? 50 : cardHeight),
                  index === 0 ? 0 : (index === 1 ? 50 : 0)
                ]
              )
            }}
          >
            <Link href={card.link} className="card-inner">
              <div className="card-txt-div">
                <motion.div 
                  className="animated-txt-div"
                  style={{
                    opacity: useTransform(
                      scrollYProgress,
                      [index / cards.length, (index + 0.5) / cards.length],
                      [0, 1]
                    ),
                    width: '100%',
                    padding: '0 1rem'
                  }}
                >
                  <div className="global-headline-xl faq-question" style={{ 
                    wordBreak: 'break-word',
                    hyphens: 'auto',
                    maxWidth: '100%'
                  }}>
                    {card.headline}
                  </div>
                </motion.div>

                <div className="global-subline">
                  {card.description.map((line, i) => (
                    <motion.div 
                      key={i} 
                      className="animated-txt-div"
                      style={{
                        opacity: useTransform(
                          scrollYProgress,
                          [index / cards.length, (index + 0.5) / cards.length],
                          [0, 1]
                        )
                      }}
                    >
                      <p className="global-headline-l faq-answer">{line}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  className="go-to-page-button faq-answer"
                  style={{
                    opacity: useTransform(
                      scrollYProgress,
                      [index / cards.length, (index + 0.5) / cards.length],
                      [0, 1]
                    )
                  }}
                >
                  Go to {card.headline.toLowerCase()} page
                </motion.div>
              </div>

              <div className="card-image-div">
                <div className="card-gradient"></div>
                <Image
                  src={card.image}
                  alt={card.headline}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>

              {index !== cards.length - 1 && (
                <motion.div 
                  className="scroll-more-indicator"
                  style={{
                    opacity: useTransform(
                      scrollYProgress,
                      [
                        index / cards.length,
                        (index + 0.3) / cards.length,
                        (index + 0.7) / cards.length,
                        (index + 1) / cards.length
                      ],
                      [1, 1, 1, 0]
                    )
                  }}
                >
                  
                  <div className="scroll-arrow"></div>
                </motion.div>
              )}
            </Link>
          </motion.div>
        ))}
      </section>
    </div>
  )
}