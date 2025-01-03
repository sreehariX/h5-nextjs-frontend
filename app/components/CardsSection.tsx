'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronRight } from 'react-icons/fi'
import Image from 'next/image'
import Link from 'next/link'

const cards = [
  {
    title: "SPORTS",
    image: "/images/homepage/sports-home.png",
    text: "In the arena of sports, Hostel 5 reigns supreme. With state-of-the-art facilities and a passion for excellence, we celebrate teamwork, determination, and sporting prowess.",
    link: "/sports"
  },
  {
    title: "CULTURALS",
    image: "/images/homepage/sports-home.png",
    text: "From vibrant cultural festivals to spirited talent nights, Hostel 5 is a melting pot of creativity, where diverse talents shine and traditions come alive.",
    link: "/culturals"
  },
  {
    title: "TECHNICALS",
    image: "/images/homepage/sports-home.png",
    text: "At Hostel 5, innovation knows no bounds. From hackathons to technical symposiums, we're a hub of ideas where minds converge to shape the future.",
    link: "/technicals"
  }
]

export default function CardsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % cards.length)
  }

  return (
    <section className="cards-section">
      <div className="cards-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={cards[activeIndex].title}
            className="card"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
          >
            <div className="card-inner">
              <div className="card-image">
                <Image
                  src={cards[activeIndex].image}
                  alt={cards[activeIndex].title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="card-content">
                <h2 className="card-title">{cards[activeIndex].title}</h2>
                <p className="card-text">{cards[activeIndex].text}</p>
                <Link href={cards[activeIndex].link} className="card-button">
                  Go to {cards[activeIndex].title} page
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button 
        className="nav-button"
        onClick={nextCard}
        aria-label="Next card"
      >
        <FiChevronRight size={32} />
      </button>
    </section>
  )
}