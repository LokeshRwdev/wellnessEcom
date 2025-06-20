import Image from 'next/image'
import Link from 'next/link'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="container-custom py-8">
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'About Us', href: '/about' },
          ]} 
        />
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-serif text-center mt-8 mb-6">Our Story</h1>
          
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-12">
            <Image
              src="https://images.pexels.com/photos/4498152/pexels-photo-4498152.jpeg"
              alt="Yoga practice in a serene setting"
              fill
              className="object-cover"
            />
          </div>
          
          <div className="prose max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              At Serenity, we believe in the transformative power of holistic wellness, combining ancient wisdom with modern convenience to help you live your best life.
            </p>
            
            <h2 className="text-2xl font-serif mb-4">Our Mission</h2>
            <p className="mb-8">
              We're dedicated to making premium yoga merchandise and authentic ayurvedic products accessible to everyone on their wellness journey. Our carefully curated collection supports both physical practice and spiritual growth.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 my-12">
              <div className="bg-sage-50 p-6 rounded-lg">
                <h3 className="text-xl font-serif mb-3">Sustainability</h3>
                <p>
                  Every product in our collection is thoughtfully sourced and produced with environmental consciousness. We partner with suppliers who share our commitment to sustainable practices.
                </p>
              </div>
              
              <div className="bg-sage-50 p-6 rounded-lg">
                <h3 className="text-xl font-serif mb-3">Quality</h3>
                <p>
                  We maintain the highest standards of quality in every item we offer. From our yoga mats to our ayurvedic products, each piece is carefully selected and tested.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-serif mb-4">Our Values</h2>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 rounded-full bg-sage-500 mr-3"></span>
                <p><strong>Authenticity:</strong> We honor traditional practices while embracing modern innovation.</p>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 rounded-full bg-sage-500 mr-3"></span>
                <p><strong>Community:</strong> We foster a supportive environment for wellness enthusiasts.</p>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 rounded-full bg-sage-500 mr-3"></span>
                <p><strong>Sustainability:</strong> We're committed to eco-friendly practices and materials.</p>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 rounded-full bg-sage-500 mr-3"></span>
                <p><strong>Education:</strong> We share knowledge to empower your wellness journey.</p>
              </li>
            </ul>
            
            <div className="bg-cream-50 p-8 rounded-lg my-12">
              <h2 className="text-2xl font-serif mb-4">Join Our Community</h2>
              <p className="mb-6">
                Connect with like-minded individuals and stay updated on our latest products, wellness tips, and community events.
              </p>
              <Link 
                href="/contact" 
                className="inline-block bg-sage-600 text-white px-6 py-3 rounded-md hover:bg-sage-700 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}