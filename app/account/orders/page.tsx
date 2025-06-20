'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FiChevronLeft } from 'react-icons/fi'

export default function OrdersPage() {
  const orders = [
    {
      id: 'ORD-2023-001',
      date: 'Dec 15, 2023',
      status: 'In Transit',
      total: 128.99,
      items: [
        {
          name: 'Premium Eco-Friendly Yoga Mat',
          image: 'https://images.pexels.com/photos/4498185/pexels-photo-4498185.jpeg',
          quantity: 1,
          price: 68.99
        },
        {
          name: 'Organic Cotton Meditation Cushion',
          image: 'https://images.pexels.com/photos/4498330/pexels-photo-4498330.jpeg',
          quantity: 1,
          price: 42.50
        }
      ]
    },
    {
      id: 'ORD-2023-002',
      date: 'Dec 10, 2023',
      status: 'Delivered',
      total: 36.99,
      items: [
        {
          name: 'Calming Ayurvedic Massage Oil',
          image: 'https://images.pexels.com/photos/6694546/pexels-photo-6694546.jpeg',
          quantity: 1,
          price: 36.99
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-4">
          <div className="flex items-center gap-4">
            <Link href="/account" className="text-gray-600">
              <FiChevronLeft size={24} />
            </Link>
            <h1 className="text-xl font-medium">My Orders</h1>
          </div>
        </div>
      </div>

      <div className="container-custom py-6">
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-soft overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.date}</p>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-sage-100 text-sage-700 text-sm">
                    {order.status}
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {order.items.map((item, index) => (
                  <div key={index} className="p-4 flex gap-4">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-sage-600 font-medium">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-gray-50 flex justify-between items-center">
                <span className="text-sm text-gray-600">Total</span>
                <span className="font-medium">${order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}