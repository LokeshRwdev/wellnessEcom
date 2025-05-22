'use client'

import Link from 'next/link'
import CartItemList from '@/components/cart/CartItemList'
import CartSummary from '@/components/cart/CartSummary'
import EmptyCart from '@/components/cart/EmptyCart'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { useCart } from '@/lib/context/cartContext'

export default function CartPage() {
  return (
    <div className="container-custom py-8">
      <Breadcrumbs 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Shopping Cart', href: '/cart' },
        ]} 
      />
      
      <h1 className="text-3xl font-serif mt-6 mb-8">Shopping Cart</h1>
      
      <div className="client-only">
        <ClientCart />
      </div>
    </div>
  )
}

// Client component to handle cart data
function ClientCart() {
  const { items, isEmpty } = useCart()
  
  if (isEmpty) {
    return <EmptyCart />
  }
  
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <CartItemList />
      </div>
      
      <div className="lg:col-span-1">
        <CartSummary />
        
        <div className="mt-6">
          <Link 
            href="/checkout" 
            className="btn btn-primary w-full"
          >
            Proceed to Checkout
          </Link>
          
          <Link 
            href="/products" 
            className="btn btn-outline w-full mt-4"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}