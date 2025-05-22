import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Hero from '@/components/home/Hero'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import CollectionsGrid from '@/components/home/CollectionsGrid'
import BenefitsSection from '@/components/home/BenefitsSection'
import TestimonialsSlider from '@/components/home/TestimonialsSlider'
import Newsletter from '@/components/home/Newsletter'
import Loading from '@/components/ui/Loading'

export default function Home() {
  return (
    <div className="space-y-16 md:space-y-24">
      <Hero />
      
      <section className="container-custom">
        <h2 className="text-center mb-8 text-sage-800">Featured Products</h2>
        <Suspense fallback={<Loading />}>
          <FeaturedProducts />
        </Suspense>
      </section>
      
      <section className="bg-sage-50 py-16">
        <div className="container-custom">
          <h2 className="text-center mb-10 text-sage-800">Shop Our Collections</h2>
          <CollectionsGrid />
        </div>
      </section>
      
      <BenefitsSection />
      
      <section className="container-custom py-12">
        <h2 className="text-center mb-10 text-sage-800">What Our Customers Say</h2>
        <TestimonialsSlider />
      </section>
      
      <section className="bg-lavender-50 py-16">
        <Newsletter />
      </section>
    </div>
  )
}