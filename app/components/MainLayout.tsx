'use client'
import { ReactNode, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navigation from './Navigation'
import H5ChatDialog from './H5ChatDialog'
import H5ChatButton from './H5ChatButton'
import '../styles/layout.css'

export default function MainLayout({ children }: { children: ReactNode }) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="layout">
      <Navigation />
      <main className="main-content">{children}</main>
      
      <H5ChatButton onClick={() => setIsChatOpen(true)} />
      <AnimatePresence>
        {isChatOpen && <H5ChatDialog onClose={() => setIsChatOpen(false)} />}
      </AnimatePresence>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Penthouse Hostel-5</h3>
            <p className="footer-text">Your urban oasis in the heart of the campus.</p>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/home" className="footer-link">home</a></li>
              <li><a href="/gallery" className="footer-link">Gallery</a></li>
              <li><a href="/contact" className="footer-link">Contact</a></li>
              <li><a href="/mess-menu" className="footer-link">Mess Menu</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Connect</h3>
            <p className="footer-text">Follow us on social media for updates and events.</p>
            <div className="social-links">
              <a href="https://www.instagram.com/penthouse_h5_iitb/" className="social-link">Instagram</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Penthouse Hostel-5. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

