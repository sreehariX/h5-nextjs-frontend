'use client'
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const H5ChatButton = ({ onClick }: { onClick: () => void }) => {
  const pathname = usePathname();
  
  
  if (pathname === '/') return null;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        padding: '15px 30px',
        backgroundColor: '#66fcf1',
        color: '#0b0c10',
        border: 'none',
        borderRadius: '25px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        zIndex: 999,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
    >
      Ask H5 AI
    </motion.button>
  );
};

export default H5ChatButton;