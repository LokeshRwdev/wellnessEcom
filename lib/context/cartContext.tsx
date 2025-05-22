'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { CartItem, Product } from '@/lib/types'

interface CartContextType {
  items: CartItem[]
  itemCount: number
  subtotal: number
  isEmpty: boolean
  addItem: (product: Product, quantity: number) => void
  removeItem: (id: string) => void
  updateItemQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType>({
  items: [],
  itemCount: 0,
  subtotal: 0,
  isEmpty: true,
  addItem: () => {},
  removeItem: () => {},
  updateItemQuantity: () => {},
  clearCart: () => {},
})

export const useCart = () => useContext(CartContext)

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([])
  
  // Load cart from localStorage on client side
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        setItems(JSON.parse(savedCart))
      }
    } catch (err) {
      console.error('Error loading cart from localStorage:', err)
    }
  }, [])
  
  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items))
    } catch (err) {
      console.error('Error saving cart to localStorage:', err)
    }
  }, [items])
  
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
  
  const isEmpty = items.length === 0
  
  const addItem = (product: Product, quantity: number) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id)
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const newItems = [...prevItems]
        newItems[existingItemIndex].quantity += quantity
        return newItems
      } else {
        // Item doesn't exist, add new item
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity,
          },
        ]
      }
    })
  }
  
  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id))
  }
  
  const updateItemQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }
  
  const clearCart = () => {
    setItems([])
  }
  
  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        isEmpty,
        addItem,
        removeItem,
        updateItemQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}