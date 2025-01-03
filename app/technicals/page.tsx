'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import MainLayout from '../components/MainLayout'

export default function TechnicalsPage() {
  return (
    <MainLayout>
      <div className="page-container">
        <motion.h1 
          className="page-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Technical Activities . page designs not ready yet
        </motion.h1>
        {/* Add technicals content here */}
      </div>
    </MainLayout>
  )
}