// app/contact/page.tsx
'use client';

import MainLayout from '../components/MainLayout';
import { motion } from 'framer-motion';
import '../styles/contact.css';

export default function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  return (
    <MainLayout>
      <motion.div 
        className="contact-wrapper"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        
        
        <motion.h2 variants={itemVariants} className="team-title">
          Our Team
        </motion.h2>

        <motion.p variants={itemVariants} className="contact-text">
          Contact us for any queries or questions.
        </motion.p>

        <div className="team-container">
          <motion.div variants={itemVariants} className="top-row">
            <motion.div variants={itemVariants} className="member-box">
              <h3>ARYAN SHAH</h3>
              <p>General Secretary</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="member-box">
              <div className="contact-icons">
                <motion.span whileHover={{ scale: 1.1 }} className="icon">📞</motion.span>
                <motion.span whileHover={{ scale: 1.1 }} className="icon">✉️</motion.span>
              </div>
              <h3>PANKIT CHAVDA</h3>
              <p>Warden Nominee</p>
            </motion.div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="bottom-row">
            {[...Array(3)].map((_, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="member-box"
              >
                <h3>ARYAN SHAH</h3>
                <p>General Secretary</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </MainLayout>
  );
}
