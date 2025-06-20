import { Suspense } from 'react'
import Hero from '@/components/home/Hero'
import FeaturedVideos from '@/components/home/FeaturedVideos'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import ShopByCategory from '@/components/home/ShopByCategory'
import BenefitsSection from '@/components/home/BenefitsSection'
import Loading from '@/components/ui/Loading'

export default function Home() {
  return (
    <div className="space-y-16 md:space-y-24">
      <Hero />
      
      <section className="container-custom">
        <Suspense fallback={<Loading />}>
          <FeaturedVideos />
        </Suspense>
      </section>
      
      <section className="container-custom">
        <h2 className="text-center mb-8 text-sage-800">Featured Products</h2>
        <Suspense fallback={<Loading />}>
          <FeaturedProducts />
        </Suspense>
      </section>
      
      <ShopByCategory />
      
      <BenefitsSection />
    </div>
  )
}