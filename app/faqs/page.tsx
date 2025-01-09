'use client'
import MainLayout from '../components/MainLayout'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '700']
});

interface FAQItem {
  question: string
  answer: string[]
  category: string
}

const faqData: FAQItem[] = [
  {
    category: "History",
    question: "When was Hostel 5 built?",
    answer: [
      "The name of hostel 5 is given from a sex magazine named Penthouse.",
      "It was built in 1958 and is one of the oldest hostels of IITB.",
      "Back then it had single sharing rooms."
    ]
  },
  {
    category: "History",
    question: "When was Hostel 5 renovated?",
    answer: [
      "The renovation was completed in 2022 and inaugurated on 22nd July 2022.",
      "Since its establishment, it has physically expanded its infrastructure manifold.",
      "The project is a joint initiative between the Institute and IIT Bombay Alumni Association.",
      "It has been made possible by a robust fund-raising exercise by the H-5 alumni across batches, from Class of 1964 to 2019.",
      "The groundbreaking was done on June 21 by Director Prof. Subhasis Chaudhuri and several H5 alumni including Mr. Dhananjay Saheba, Mr. Suhas Mehta, Mr. Ajit Jawle, Mr. Nandkumar Nemade, Mr. Nitin Doshi, Mr. Raja Deshpande and IITB Alumni Association Chairman Mr. Girish Nayak.",
      "The project is led by Dhananjay Saheba, a 1977 alumnus from Electrical Engineering Department."
    ]
  },
  {
    category: "Access & Rules",
    question: "What are the female entry rules in hostel?",
    answer: [
      "Female entry is allowed from 7am to 10pm inside the hostel.",
      "Student (boy) has to give his ID card to security and register the name of the person in the female register book for entry.",
      "Female can visit common room, sports room, music room, mess and canteen 24/7."
    ]
  },
  {
    category: "Facilities",
    question: "How to access Tech room of hostel 5?",
    answer: [
      "Tech room is room no. 1, 2 in A wing ground floor.",
      "Only hostel 5 students can access tech room via fingerprint registered by them.",
      "Student can use all the equipments present in tech room but they are not allowed to take them out of tech room. If found they'll be fined.",
      "Student can use power tools under mechanical section after taking permission of technical secretaries, with valid reason.",
      "Students can take microcontroller from electrical section after taking permission from technical secretaries."
    ]
  },
  {
    category: "Facilities",
    question: "How to access music room and sports room?",
    answer: [
      "Both rooms are located inside the mess area and can be accessed by registered fingerprint of hostel 5 student only.",
      "Non H5 students can also play in these rooms.",
      "Sports equipments can be accessed by security guard after registering student name and giving ID card to the guard."
    ]
  },
  {
    category: "Maintenance",
    question: "Where to make maintenance related complaints?",
    answer: [
      "For complaints related to carpentry work, electric repairment, LAN issues and issues related to individual rooms, submit your complaints on support.lith.ac.in",
      "For PHO concerns (uncleanliness), promptly inform a nearby PHO worker for immediate attention."
    ]
  },
  {
    category: "Emergency",
    question: "What are the emergency contact numbers?",
    answer: [
      "Electrical issues:",
      "• 2182 - For complaints between 11pm to 7am",
      "• 7977 - For complaints between 7am to 11am",
      "Hospital: 7051",
      "Quick Response Team: +91 98333 38989"
    ]
  },
  {
    category: "Facilities",
    question: "What are the laundry options for students?",
    answer: [
      "Washing machines and dryers are available in washrooms of every alternate wing (free of cost).",
      "A laundry house is situated behind the kitchen area, charging ₹20 for 10 clothes or equivalent.",
      "The laundry house is open during weekdays (timing may vary)."
    ]
  },
  {
    category: "Mess",
    question: "How does the Mess rebate process work?",
    answer: [
      "Eligibility and Limits:",
      "• Minimum 3 consecutive days required for rebate",
      "• Maximum 15 days per semester allowed",
      "Application Process:",
      "• Visit billing counter and inform Mess Supervisor",
      "• Notify before 2 PM on the day preceding your planned rebate period",
      "• Per day mess charges (₹155) multiplied by rebate days will be credited to your account after semester ends"
    ]
  },
  {
    category: "Mess",
    question: "How to opt-out from mess?",
    answer: [
      "Write a mail to mess councilor 3 days before mess starts or a week before new semester begins.",
      "A list of opt-out students will be made by mess councilor for hall manager and mess manager.",
      "30% of monthly mess bill will be deducted from SMA (semester mess advance) for infrastructural cost.",
      "Remaining amount will be credited to your bank account after semester ends."
    ]
  },
  {
    category: "Mess",
    question: "Where to make mess related complaints?",
    answer: [
      "1. Register Your Complaint in the complaint/suggestions register at billing counter (include name, roll number, date, time, and detailed description).",
      "2. Document Evidence: Take clear photo/video with proof of date and time.",
      "3. Submit Video Proof to mess councilor.",
      "This procedure helps address concerns effectively and provide evidence for implementing fines."
    ]
  }
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const categories = [...new Set(faqData.map(item => item.category))]

  return (
    <MainLayout>
      <section className="py-10 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={inter.className}
              style={{
                fontWeight: 700,
                fontSize: '48px',
                letterSpacing: '-0.02em',
                marginBottom: '32px'
              }}
            >
              Frequently Asked Questions
            </motion.h1>
          </div>

          <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
            <AnimatePresence>
              {faqData.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="transition-all duration-200 bg-[#2b303c] border border-[#45a29e] shadow-lg cursor-pointer hover:bg-[#353e4d]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
                  >
                    <span className="flex text-lg font-semibold text-[#66fcf1]">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiChevronDown className="w-6 h-6 text-[#66fcf1]" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-4 pb-5 sm:px-6 sm:pb-6"
                      >
                        {faq.answer.map((paragraph, i) => (
                          <p key={i} className="text-[#c5c6c7] mb-2">
                            {paragraph}
                          </p>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <p className="text-center text-[#c5c6c7] text-base mt-9">
            Still have questions?{" "}
            <Link href="/contact" className="cursor-pointer font-medium text-[#66fcf1] transition-all duration-200 hover:text-[#45a29e] hover:underline">
  Contact our Team
</Link>
          </p>
        </div>
      </section>
    </MainLayout>
  )
}

export default FAQPage