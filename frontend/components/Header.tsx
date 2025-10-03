'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Download, Info, Home } from 'lucide-react'
import Link from 'next/link'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="font-bold text-gray-900">Weather Parade</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1">
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link href="/features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </Link>
            <Link href="/docs" className="text-gray-600 hover:text-gray-900 transition-colors">
              Docs
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/docs" className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Info className="w-4 h-4" />
              <span>Documentation</span>
            </Link>
            <Link href="/" className="btn-primary flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span>Get Started</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-gray-200 py-4"
          >
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2">
                <Home className="w-4 h-4" />
                Home
              </Link>
              <Link href="/features" className="text-gray-600 hover:text-gray-900 transition-colors">
                Features
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </Link>
              <Link href="/docs" className="text-gray-600 hover:text-gray-900 transition-colors">
                Documentation
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                Contact
              </Link>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <Link href="/docs" className="flex items-center gap-2 w-full text-left px-2 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <Info className="w-4 h-4" />
                  <span>Documentation</span>
                </Link>
                <Link href="/" className="btn-primary w-full flex items-center justify-center gap-2 mt-2">
                  <Download className="w-4 h-4" />
                  <span>Get Started</span>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  )
}
