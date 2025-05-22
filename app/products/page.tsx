import { Suspense } from 'react'
import ProductFilters from '@/components/products/ProductFilters'
import ProductGrid from '@/components/products/ProductGrid'
import SortDropdown from '@/components/products/SortDropdown'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Loading from '@/components/ui/Loading'

export default function ProductsPage() {
  return (
    <div className="container-custom py-8">
      <Breadcrumbs 
        items={[
          { label: 'Home', href: '/' },
          { label: 'All Products', href: '/products' },
        ]} 
      />
      
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <div className="md:w-1/4 lg:w-1/5">
          <ProductFilters />
        </div>
        
        <div className="md:w-3/4 lg:w-4/5">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-serif">All Products</h1>
            <SortDropdown />
          </div>
          
          <Suspense fallback={<Loading />}>
            <ProductGrid />
          </Suspense>
        </div>
      </div>
    </div>
  )
}