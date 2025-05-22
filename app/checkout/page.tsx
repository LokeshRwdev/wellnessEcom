import Link from 'next/link'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import CheckoutForm from '@/components/checkout/CheckoutForm'
import OrderSummary from '@/components/checkout/OrderSummary'

export default function CheckoutPage() {
  return (
    <div className="container-custom py-8">
      <Breadcrumbs 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Cart', href: '/cart' },
          { label: 'Checkout', href: '/checkout' },
        ]} 
      />
      
      <h1 className="text-3xl font-serif mt-6 mb-8">Checkout</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CheckoutForm />
        </div>
        
        <div className="lg:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}