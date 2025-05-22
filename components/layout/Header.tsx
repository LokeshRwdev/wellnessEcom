'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useCart } from '@/lib/context/cartContext'
import { FiSearch, FiUser, FiHeart, FiShoppingBag, FiMenu, FiX } from 'react-icons/fi'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { itemCount } = useCart()
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 80)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  useEffect(() => {
    // Close mobile menu when navigating
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button 
              className="mr-4 lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-serif font-medium text-sage-800">Serenity</span>
            </Link>
          </div>
          
          <nav className="hidden lg:flex items-center space-x-8">
            <NavLink href="/" label="Home" />
            <NavLink href="/products" label="Shop All" />
            <NavLink href="/categories/yoga" label="Yoga" />
            <NavLink href="/categories/ayurveda" label="Ayurveda" />
            <NavLink href="/about" label="About" />
            <NavLink href="/contact" label="Contact" />
          </nav>
          
          <div className="flex items-center space-x-4">
            <button aria-label="Search" className="p-2 hover:text-sage-600 transition-colors">
              <FiSearch size={20} />
            </button>
            
            <Link href="/account" className="p-2 hover:text-sage-600 transition-colors">
              <FiUser size={20} />
            </Link>
            
            <Link href="/wishlist" className="p-2 hover:text-sage-600 transition-colors">
              <FiHeart size={20} />
            </Link>
            
            <Link href="/cart" className="p-2 hover:text-sage-600 transition-colors relative">
              <FiShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-terracotta-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <nav className="container-custom py-4 flex flex-col space-y-3">
              <MobileNavLink href="/" label="Home" />
              <MobileNavLink href="/products" label="Shop All" />
              <MobileNavLink href="/categories/yoga" label="Yoga" />
              <MobileNavLink href="/categories/ayurveda" label="Ayurveda" />
              <MobileNavLink href="/about" label="About" />
              <MobileNavLink href="/contact" label="Contact" />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== '/' && pathname?.startsWith(href))
  
  return (
    <Link 
      href={href} 
      className={`relative text-base font-medium transition-colors duration-200 hover:text-sage-600 ${
        isActive ? 'text-sage-700' : 'text-gray-700'
      }`}
    >
      {label}
      {isActive && (
        <motion.div
          layoutId="underline"
          className="absolute bottom-0 left-0 w-full h-0.5 bg-sage-500 mt-1"
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  )
}

function MobileNavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== '/' && pathname?.startsWith(href))
  
  return (
    <Link 
      href={href} 
      className={`text-lg font-medium py-2 transition-colors ${
        isActive ? 'text-sage-700' : 'text-gray-700'
      }`}
    >
      {label}
    </Link>
  )
}