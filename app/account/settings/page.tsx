'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiChevronLeft } from 'react-icons/fi'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    orders: true,
    promotions: false,
    newsletter: true
  })

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-4">
          <div className="flex items-center gap-4">
            <Link href="/account" className="text-gray-600">
              <FiChevronLeft size={24} />
            </Link>
            <h1 className="text-xl font-medium">Settings</h1>
          </div>
        </div>
      </div>

      <div className="container-custom py-6">
        <div className="bg-white rounded-lg shadow-soft overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-medium">Account Settings</h2>
          </div>

          <div className="divide-y divide-gray-100">
            <div className="p-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value="sarah.mitchell@example.com"
                className="input-field w-full"
                disabled
              />
            </div>

            <div className="p-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <button className="text-sage-600 font-medium">
                Change Password
              </button>
            </div>
          </div>

          <div className="p-4 border-t border-gray-100 mt-4">
            <h2 className="font-medium mb-4">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Order Updates</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.orders}
                    onChange={() => setNotifications(prev => ({
                      ...prev,
                      orders: !prev.orders
                    }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sage-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sage-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <span>Promotional Emails</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.promotions}
                    onChange={() => setNotifications(prev => ({
                      ...prev,
                      promotions: !prev.promotions
                    }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sage-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sage-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <span>Newsletter</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.newsletter}
                    onChange={() => setNotifications(prev => ({
                      ...prev,
                      newsletter: !prev.newsletter
                    }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sage-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sage-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <button className="mt-6 w-full p-4 text-error-600 font-medium rounded-lg border-2 border-error-100 hover:bg-error-50 transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  )
}