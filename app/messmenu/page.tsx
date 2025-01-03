'use client'

import MainLayout from '../components/MainLayout'
import { motion } from 'framer-motion'
import '../styles/mess-menu.css'

export default function MessMenu() {
  return (
    <MainLayout>
       <div className="page-container">
        <motion.h1 
          className="page-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          mess menu . page design and content not ready yet
        </motion.h1>
        {}
      </div>
    </MainLayout>
  )
}