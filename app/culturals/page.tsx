'use client'

import { motion } from 'framer-motion'
import MainLayout from '../components/MainLayout'
import EventCard from '../components/EventCard'

const culturalEvents = [
  {
    image: '/images/gcs/cult/halloween.jpeg',
    title: 'HalloweenGC',
    description: `🧛 Hostel 5 , it's Showtime! 🧛‍♀️
🎃Come cheer for our stars at the tonight!🎃

📅 Time: 9:00 pm
🏛️ Venue: OAT (old sac) 

 Our performace will be starting soon. 
Let’s bring the energy and show our H5 spirit! 

#H5Pride #HalloweenGC
`
  },
  {
    image: '/images/gcs/cult/rang.jpeg',
    title: '🎨 2D Fine Arts GC Alert! 🎨',
    description: `Hola!! We are excited to  announce the opportunity for all to participate in the  Inter-Hostel 2D Fine Arts  General Championship  GC ! We're looking for passionate individuals who love creating art , whether it’s through dry media (pencil, pen, color pencil, charcoal, soft pastel, and oil pastel) or wet media (watercolor, poster color, oil paint, and acrylic paint) and proudly represent our Hostel 5 . 
If you're an artist at heart or simply want to explore your creativity, this is your chance to join our vibrant art community. Plus, all necessary equipment will be provided by the hostel !
 To join , simply click on the link below to be a part of the WhatsApp group and get ready to represent Hostel 5 with pride!
https://chat.whatsapp.com/FgktVLbW4QgA8eD6NfO6q3`
  }
]

export default function CulturalsPage() {
  return (
    <MainLayout>
      <div className="page-container px-4 py-32">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
            Culturals at Hostel 5
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-purple-600 mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="space-y-12 mb-24">
          {culturalEvents.map((event, index) => (
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