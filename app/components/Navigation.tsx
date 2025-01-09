'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import '../styles/navigation.css'
import { IoMenu, IoClose } from 'react-icons/io5'

export default function Navigation() {
  const pathname = usePathname()
  const [isGCsOpen, setIsGCsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileGCsOpen, setIsMobileGCsOpen] = useState(false)

  const navItems = [
    { name: 'Home', href: '/home' },
    { name: 'GCs', href: '#', isDropdown: true },
    { name: 'Gallery', href: '/gallery' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Mess Menu', href: '/messmenu' },
    { name: 'Contact', href: '/contact' },
  ]

  const gcItems = [
    { name: 'Sports', href: '/sports' },
    { name: 'Culturals', href: '/culturals' },
    { name: 'Technical', href: '/technicals' },
  ]

  return (
    <nav className={`nav-container ${isMobileMenuOpen ? 'menu-open' : ''}`}>
      <div className="nav-content">
        <Link href="/home" className="logo-container">
          <Image
            src="/images/common/H5_logo_white.png"
            alt="H5 Logo"
            width={192}
            height={122}
            className="nav-logo"
            priority
          />
        </Link>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.name} className="nav-item">
              {item.isDropdown ? (
                <button 
                  className={`nav-link ${isGCsOpen ? 'active' : ''}`}
                  onClick={() => setIsGCsOpen(!isGCsOpen)}
                >
                  {item.name}
                  {(pathname === '/sports' || pathname === '/culturals' || pathname === '/technicals') && (
                    <motion.div
                      className="nav-underline"
                      layoutId="underline"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              ) : (
                <Link href={item.href} className="nav-link">
                  {item.name}
                  {pathname === item.href && (
                    <motion.div
                      className="nav-underline"
                      layoutId="underline"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              )}

              {item.isDropdown && (
                <AnimatePresence>
                  {isGCsOpen && (
                    <motion.div
                      className="dropdown-menu"
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      exit={{ opacity: 0, scaleY: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ transformOrigin: 'top' }}
                    >
                      {gcItems.map((gcItem) => (
                        <Link
                          key={gcItem.name}
                          href={gcItem.href}
                          className="dropdown-item"
                          onClick={() => setIsGCsOpen(false)}
                        >
                          {gcItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </li>
          ))}
        </ul>

        <button 
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <IoMenu />
        </button>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div 
                className="mobile-menu-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <motion.div 
                className="mobile-menu"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
              >
                <div className="mobile-menu-header">
                  <button 
                    className="mobile-menu-close"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <IoClose />
                  </button>
                </div>
                
                <div className="mobile-menu-links">
                  {navItems.map((item) => (
                    <div key={item.name} className="mobile-menu-item">
                      {item.isDropdown ? (
                        <>
                          <button 
                            className={`mobile-menu-link ${isMobileGCsOpen ? 'active' : ''}`}
                            onClick={() => setIsMobileGCsOpen(!isMobileGCsOpen)}
                          >
                            {item.name}
                            <motion.span
                              className="mobile-dropdown-arrow"
                              animate={{ rotate: isMobileGCsOpen ? 180 : 0 }}
                            >
                              ▼
                            </motion.span>
                          </button>
                          <AnimatePresence>
                            {isMobileGCsOpen && (
                              <motion.div
                                className="mobile-dropdown-menu"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                {gcItems.map((gcItem) => (
                                  <Link
                                    key={gcItem.name}
                                    href={gcItem.href}
                                    className="mobile-dropdown-item"
                                    onClick={() => {
                                      setIsMobileGCsOpen(false)
                                      setIsMobileMenuOpen(false)
                                    }}
                                  >
                                    {gcItem.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className="mobile-menu-link"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

