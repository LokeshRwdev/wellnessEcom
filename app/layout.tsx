import './globals.css'
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileNav from '@/components/layout/MobileNav'
import { CartProvider } from '@/lib/context/cartContext'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Serenity - Yoga & Ayurveda',
  description: 'Premium yoga merchandise and ayurvedic products for your wellness journey',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col bg-cream-50">
        <CartProvider>
          <Header />
          <main className="flex-grow pb-16 lg:pb-0">{children}</main>
          <MobileNav />
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}