// app/contact/page.tsx
'use client';

import MainLayout from '../components/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone} from 'react-icons/fa';
import { useState } from 'react';
import '../styles/contact.css';
import { Inter } from 'next/font/google';

interface TeamMember {
  name: string;
  role: string;
  phone?: string;
  image?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'ARYAN SHAH',
    role: 'General Secretary',
    phone: '+91 7083141199',
    image: '/images/contact-images/aryan.png'
  },
  {
    name: 'PANKIT CHAVDA',
    role: 'Warden Nominee',
    phone: '+91 9664994493',
    image: '/images/contact-images/pankit.png'
  },
  {
    name: 'AAYUSH KAKADIYA',
    role: 'Technical Councilor',
    phone: '+91 9316714002',
    image: '/images/contact-images/aayush.png'
  },
  {
    name: 'ASHWIN S.',
    role: 'Mess Councilor',
    phone: '+91 9108447607',
    image: '/images/contact-images/ashwin.png' 
  },
  {
    name: 'ANURAG PACHGADE',
    role: 'Maintenance Councilor',
    phone: '+91 7249710946',
    image: '/images/contact-images/anurag.png'
  },
  {
    name: 'KARTIK SINGH',
    role: 'Cultural Councilor',
    phone: '+91 8219398665',
      image: '/images/contact-images/kartik.png'
  },
  {
    name: 'SHUBHAM RAJ',
    role: 'System Administrator',
    phone: '+91 8878004551',
      image: '/images/contact-images/shubham.png'
  },
  {
    name: 'KSHITIJ KUMAR',
    role: 'Sports Councilor',
    phone: '+91 9852478400',
    image: '/images/contact-images/kshitij.png'
  },
  {
    name: 'SARVESH KUMAR',
    role: 'Sports Nominee',
    phone: '+91 9465819517',
    image: '/images/contact-images/sarvesh.png'
  },
  {
    name: 'ADITYA TADWALKAR',
    role: 'Cultural Nominee',
    phone: '+91 9022565843',
    image: '/images/contact-images/aditya.png'
  }
];

const ContactOverlay = ({ phone }: { phone?: string }) => {
  return (
    <div className="contact-overlay">
      {phone && (
        <div className="contact-icon-wrapper bottom">
          <motion.div 
            className="overlay-icon"
            whileHover={{ scale: 1.1 }}
          >
            <FaPhone />
          </motion.div>
          <motion.div
            className="contact-detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {phone}
          </motion.div>
        </div>
      )}
    </div>
  );
};

const MemberCard = ({ member, variants }: { member: TeamMember, variants: any }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="member-card"
      variants={variants}
    >
      <motion.div 
        className="member-image-container"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.img 
          src={member.image} 
          alt={member.name} 
          className="member-image"
          animate={{ 
            scale: isHovered ? 1.1 : 1 
          }}
          transition={{ duration: 0.3 }}
        />
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ContactOverlay phone={member.phone} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div className="member-info">
        <h3 className="member-name">{member.name}</h3>
        <p className="member-role">{member.role}</p>
      </motion.div>
    </motion.div>
  );
};

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '700']
});

export default function Contact() {
  const rowVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <MainLayout>
      <div className={`contact-page ${inter.className}`}>
        <motion.div 
          className="contact-header"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={rowVariants}
        >
          <h1 style={{
            fontWeight: 700,
            fontSize: '48px',
            letterSpacing: '-0.02em',
            marginBottom: '32px'
          }}>MEET OUR TEAM</h1>
          <p style={{
            fontSize: '18px',
            fontWeight: 400
          }}>We're here to help make your hostel experience better</p>
        </motion.div>

        {/* First row - Top 2 positions */}
        <motion.div 
          className="team-grid top-row"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={rowVariants}
        >
          {teamMembers.slice(0, 2).map((member, index) => (
            <MemberCard key={index} member={member} variants={rowVariants} />
          ))}
        </motion.div>

        <motion.div 
          className="team-grid middle-row"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={rowVariants}
        >
          {teamMembers.slice(2, 5).map((member, index) => (
            <MemberCard key={index} member={member} variants={rowVariants} />
          ))}
        </motion.div>

        <motion.div 
          className="team-grid middle-row"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={rowVariants}
        >
          {teamMembers.slice(5, 8).map((member, index) => (
            <MemberCard key={index} member={member} variants={rowVariants} />
          ))}
        </motion.div>

        <motion.div 
          className="team-grid middle-row"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={rowVariants}
        >
          {teamMembers.slice(8).map((member, index) => (
            <MemberCard key={index} member={member} variants={rowVariants} />
          ))}
        </motion.div>
      </div>
    </MainLayout>
  );
}
