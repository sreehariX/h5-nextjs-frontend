'use client'

import { motion } from 'framer-motion'
import MainLayout from '../components/MainLayout'
import EventCard from '../components/EventCard'

const technicalEvents = [
  
  {
    image: '/images/gcs/tech/rubegoldberg.jpeg',
    title: '🛠️ Rube Goldberg Machine GC',
    description: `🛠️🏆 *Attention Hostellers!* 🏆🛠️  

Fill out the form if you are interested in participating in the *Rube Goldberg Machine General Championships*! 🎉 Show off your creativity and engineering skills by building the most imaginative and complex contraptions to complete a simple task. 🌀⚙️  

Link:https://forms.gle/7QBKVWjRLgzY7d8b8

To kick things off, we'll be having an *ideation and open discussion* on *18th October at 9:30 PM* in the *Tech Room, Hostel 5*. Join us to brainstorm, share ideas, and get inspired! 💡🔧  

For any queries, contact:  
Aditya Agarwal (9065130206)  
Adnan Shaikh (7776992436)  

Let’s make things unnecessarily complicated, just for fun! 😄`
  },
  {
    image: '/images/gcs/tech/energyclub.jpeg',
    title: '🌍 Energy Club GC Alert! 🌍',
    description: `Tackle climate change by designing a carbon capture solution for a real industrial setup! 🏭🌱 Strategize on energy-efficient, renewable tech and craft a cost-saving solution that puts our hostel at the top! 🚀💪

📝 Problem Statement: Create a multi-tech carbon capture plan. Justify your tech choices, calculate costs, and use renewable energy sources.

https://docs.google.com/document/d/1gWxTOjVFXp81Y9hFosrJAWOJDMjfO-bK0NaiLYhDLlo/edit?usp=sharing

🗓️ Registration Deadline: Oct 31st, 11:59 PM
🗓️ Submission Deadline: Nov 5th, 11:59 PM

📲 DM me your roll number and full name to register your team!
Let’s lead the charge and show everyone what our hostel is made of! 🏆`
  }
]

export default function TechnicalsPage() {
  return (
    <MainLayout>
      <div className="page-container px-4 py-32">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold text-white text-transparent">
            Technical Activities
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="space-y-12 mb-24">
          {technicalEvents.map((event, index) => (
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