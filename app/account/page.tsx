'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiUser, FiPackage, FiHeart, FiSettings, FiLogOut, FiChevronRight } from 'react-icons/fi'

export default function AccountPage() {
  const [user] = useState({
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@example.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
  })

  const menuItems = [
    {
      icon: <FiPackage size={20} />,
      label: 'My Orders',
      href: '/account/orders',
      info: '2 active'
    },
    {
      icon: <FiHeart size={20} />,
      label: 'Wishlist',
      href: '/account/wishlist',
      info: '12 items'
    },
    {
      icon: <FiSettings size={20} />,
      label: 'Settings',
      href: '/account/settings'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="bg-white">
        <div className="container-custom py-8">
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-full overflow-hidden">
              <Image
                src={user.avatar}
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-medium">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-6">
        <div className="bg-white rounded-lg shadow-soft overflow-hidden">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div className="text-gray-600">{item.icon}</div>
                <span className="font-medium">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.info && (
                  <span className="text-sm text-gray-600">{item.info}</span>
                )}
                <FiChevronRight className="text-gray-400" size={20} />
              </div>
            </Link>
          ))}
        </div>

        <button
          className="mt-6 w-full flex items-center justify-center gap-2 p-4 text-error-600 font-medium rounded-lg border-2 border-error-100 hover:bg-error-50 transition-colors"
        >
          <FiLogOut size={20} />
          Sign Out
        </button>

        <p className="text-center text-sm text-gray-500 mt-8">
          App Version 1.0.0
        </p>
      </div>
    </div>
  )
}