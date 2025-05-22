import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import ProductImageGallery from '@/components/products/ProductImageGallery'
import AddToCartButton from '@/components/products/AddToCartButton'
import WishlistButton from '@/components/products/WishlistButton'
import QuantitySelector from '@/components/products/QuantitySelector'
import ProductTabs from '@/components/products/ProductTabs'
import RelatedProducts from '@/components/products/RelatedProducts'
import Loading from '@/components/ui/Loading'
import { getProductById } from '@/lib/data/products'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)
  
  if (!product) {
    return <div className="container-custom py-16 text-center">Product not found</div>
  }

  return (
    <div className="container-custom py-8">
      <Breadcrumbs 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: product.category, href: `/categories/${product.category.toLowerCase()}` },
          { label: product.name, href: `/products/${product.id}` },
        ]} 
      />
      
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mt-8">
        <div>
          <ProductImageGallery images={product.images} />
        </div>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-serif">{product.name}</h1>
            <p className="text-xl font-medium mt-2 text-terracotta-600">${product.price.toFixed(2)}</p>
            {product.discountedPrice && (
              <p className="text-sm line-through text-gray-500">${product.discountedPrice.toFixed(2)}</p>
            )}
          </div>
          
          <p className="text-gray-700">{product.shortDescription}</p>
          
          <div className="space-y-4 pt-4">
            <QuantitySelector />
            
            <div className="flex space-x-4">
              <AddToCartButton product={product} />
              <WishlistButton productId={product.id} />
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-success-500"></div>
              <p className="text-sm text-success-700">In Stock</p>
            </div>
            
            <div className="mt-4 text-sm space-y-2">
              <p>Free shipping on orders over $75</p>
              <p>30-day easy returns</p>
              <p>Sustainably sourced and crafted</p>
            </div>
          </div>
        </div>
      </div>
      
      <ProductTabs product={product} />
      
      <section className="mt-16">
        <h2 className="text-2xl font-serif mb-8">You May Also Like</h2>
        <Suspense fallback={<Loading />}>
          <RelatedProducts categoryId={product.category} currentProductId={product.id} />
        </Suspense>
      </section>
    </div>
  )
}