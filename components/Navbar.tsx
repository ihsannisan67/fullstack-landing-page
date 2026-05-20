'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, TreePine } from 'lucide-react'

const navLinks = [
  { href: '#layanan', label: 'Layanan' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#tentang', label: 'Tentang' },
  { href: '#faq', label: 'FAQ' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll
  if (typeof window !== 'undefined' && !scrolled) {
    window.addEventListener('scroll', () => {
      setScrolled(window.scrollY > 50)
    })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-leaf rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
            <TreePine className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl text-forest-dark">
            LangkahHijau
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-forest-dark/80 hover:text-leaf transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="#konsultasi"
            className="bg-leaf hover:bg-forest-mid text-white px-6 py-2.5 rounded-full font-medium transition-colors"
          >
            Konsultasi Gratis
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-forest-dark"
          aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-cream shadow-lg md:hidden"
            >
              <div className="flex flex-col p-4 gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-forest-dark/80 hover:text-leaf transition-colors font-medium py-2"
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href="#konsultasi"
                  onClick={() => setIsOpen(false)}
                  className="bg-leaf hover:bg-forest-mid text-white px-6 py-3 rounded-full font-medium text-center transition-colors"
                >
                  Konsultasi Gratis
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}