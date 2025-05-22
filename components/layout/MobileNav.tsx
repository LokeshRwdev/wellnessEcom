'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiHome, FiSearch, FiShoppingBag, FiUser, FiGrid } from 'react-icons/fi'

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 lg:hidden">
      <div className="grid grid-cols-5 h-16">
        <NavItem 
          href="/" 
          icon={<FiHome size={24} />} 
          label="Home" 
          isActive={pathname === '/'} 
        />
        <NavItem 
          href="/products" 
          icon={<FiGrid size={24} />} 
          label="Shop" 
          isActive={pathname === '/products'} 
        />
        <NavItem 
          href="/search" 
          icon={<FiSearch size={24} />} 
          label="Search" 
          isActive={pathname === '/search'} 
        />
        <NavItem 
          href="/cart" 
          icon={<FiShoppingBag size={24} />} 
          label="Cart" 
          isActive={pathname === '/cart'} 
        />
        <NavItem 
          href="/account" 
          icon={<FiUser size={24} />} 
          label="Account" 
          isActive={pathname === '/account'} 
        />
      </div>
    </nav>
  )
}

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  isActive: boolean
}

function NavItem({ href, icon, label, isActive }: NavItemProps) {
  return (
    <Link 
      href={href} 
      className={`flex flex-col items-center justify-center space-y-1 ${
        isActive ? 'text-sage-600' : 'text-gray-600'
      }`}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </Link>
  )
}