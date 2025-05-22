import Link from 'next/link'
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube } from 'react-icons/fi'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-sage-800 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-serif mb-4">Serenity</h3>
            <p className="text-sage-100 mb-6">Nurturing wellness through premium yoga merchandise and authentic ayurvedic products.</p>
            <div className="flex space-x-4">
              <SocialLink href="https://instagram.com" icon={<FiInstagram size={20} />} />
              <SocialLink href="https://twitter.com" icon={<FiTwitter size={20} />} />
              <SocialLink href="https://facebook.com" icon={<FiFacebook size={20} />} />
              <SocialLink href="https://youtube.com" icon={<FiYoutube size={20} />} />
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-serif mb-4">Shop</h4>
            <ul className="space-y-2">
              <FooterLink href="/products" label="All Products" />
              <FooterLink href="/categories/yoga-mats" label="Yoga Mats" />
              <FooterLink href="/categories/clothing" label="Yoga Clothing" />
              <FooterLink href="/categories/props" label="Props & Accessories" />
              <FooterLink href="/categories/ayurveda" label="Ayurvedic Products" />
              <FooterLink href="/categories/essential-oils" label="Essential Oils" />
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-serif mb-4">Information</h4>
            <ul className="space-y-2">
              <FooterLink href="/about" label="About Us" />
              <FooterLink href="/sustainability" label="Our Sustainability" />
              <FooterLink href="/blog" label="Wellness Blog" />
              <FooterLink href="/faq" label="FAQs" />
              <FooterLink href="/contact" label="Contact Us" />
              <FooterLink href="/shipping" label="Shipping & Returns" />
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-serif mb-4">Newsletter</h4>
            <p className="text-sage-100 mb-4">Sign up for wellness tips and exclusive offers.</p>
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-2 rounded-md bg-sage-700 border border-sage-600 text-white placeholder-sage-300 focus:outline-none focus:ring-2 focus:ring-sage-300"
                required
              />
              <button 
                type="submit" 
                className="w-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-sage-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sage-200 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Serenity Yoga & Ayurveda. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-sage-200">
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link 
        href={href} 
        className="text-sage-200 hover:text-white transition-colors"
      >
        {label}
      </Link>
    </li>
  )
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer" 
      className="h-10 w-10 rounded-full bg-sage-700 flex items-center justify-center hover:bg-sage-600 transition-colors"
    >
      {icon}
    </a>
  )
}