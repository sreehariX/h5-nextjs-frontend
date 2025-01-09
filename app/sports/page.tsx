'use client'

import { motion } from 'framer-motion'
import MainLayout from '../components/MainLayout'
import EventCard from '../components/EventCard'

const sportsEvents = [
  {
    image: '/images/gcs/sports/sports_kho_kho.jpeg',
    title: 'KHO KHO GC FINALS: H5vs H3 ',
    description: `KHO KHO GC FINALS: H5vs H3 
Join us at the Kho Kho Finals as H5 takes on H3 in an electrifying match!

Date: 29th October
Time: 7:00 pm
Venue: Kho-Kho Court

 H5 is just one step away from securing their 2ND GOLD of the year!

COME ONE, COME ALL!
Cheer on H5 as they battle for the championship title! Your energy and support can make all the difference. Let's fill the stands with H5 spirit!

 Let's bring home the GOLD! 

Don't miss this thrilling finale! Free up your evening, gather your friends, and get ready to cheer H5 to victory!

See you there!

Add this in sports page`
  },
  
]

export default function SportsPage() {
  return (
    <MainLayout>
      <div className="page-container px-4 py-32">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Sports at Hostel 5
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="space-y-12 mb-24">
          {sportsEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                delay: 0.3 + index * 0.2
              }}
            >
              <EventCard {...event} />
            </motion.div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}