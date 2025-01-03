'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import '../styles/navigation.css'

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { name: 'Home', href: '/home' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
    { name: 'Mess Menu', href: '/messmenu' },
  ]

  return (
    <nav className="nav-container">
      <div className="nav-content">
        <Link href="/home" className="logo-container">
          <Image
            src="/images/common/H5_logo_white.png"
            alt="H5 Logo"
            width={192}
            height={122}
            className="nav-logo"
            priority
          />
        </Link>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.name} className="nav-item">
              <Link href={item.href} className="nav-link">
                {item.name}
                {pathname === item.href && (
                  <motion.div
                    className="nav-underline"
                    layoutId="underline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

