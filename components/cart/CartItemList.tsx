'use client'

import { useCart } from '@/lib/context/cartContext'
import CartItem from './CartItem'

export default function CartItemList() {
  const { items, removeItem, updateItemQuantity } = useCart()
  
  return (
    <div className="space-y-6">
      {items.map(item => (
        <CartItem 
          key={item.id} 
          item={item} 
          onRemove={() => removeItem(item.id)}
          onQuantityChange={(quantity) => updateItemQuantity(item.id, quantity)}
        />
      ))}
    </div>
  )
}