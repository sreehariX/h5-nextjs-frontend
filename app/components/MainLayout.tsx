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

            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.3728456198946!2d72.90710667626473!3d19.135149982081685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b807e5f3ef61%3A0x937e3ffa2e86855b!2sHostel%205%2C%20IIT%20Bombay!5e0!3m2!1sen!2sin!4v1736517599428!5m2!1sen!2sin" 
                width="400" 
                height="300" 
                style={{ border: 0, borderRadius: '12px' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

            <ul className="footer-links">
              <li> Hostel 5 IIT Bombay, Students' Residential Zone,<br /> Powai, Mumbai, Maharashtra 400076</li>
              <li>+91 02225722545</li>
              
             
            </ul>
          </div>


          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/home" className="footer-link">Home</a></li>
              <li><a href="/gallery" className="footer-link">Gallery</a></li>
              <li><a href="/contact" className="footer-link">Contact</a></li>
              <li><a href="/messmenu" className="footer-link">Mess Menu</a></li>
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

