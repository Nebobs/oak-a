'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from '@/components/ProductCard'
import PageWrapper from '@/components/PageWrapper'
import { getProducts } from '@/lib/products'
import type { Product, ProductCategory } from '@/types'

type FilterOption = 'all' | ProductCategory

const filters: { value: FilterOption; label: string }[] = [
  { value: 'all', label: 'All Pieces' },
  { value: 'jeans', label: 'Denim' },
  { value: 'tops', label: 'Tops' },
  { value: 'outerwear', label: 'Outerwear' },
  { value: 'custom', label: 'Custom' },
  { value: 'accessories', label: 'Accessories' },
]

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filter, setFilter] = useState<FilterOption>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data)
      setLoading(false)
    })
  }, [])

  const filtered =
    filter === 'all' ? products : products.filter((p) => p.category === filter)

  // Only show filter tabs that have products
  const availableFilters = filters.filter(
    (f) =>
      f.value === 'all' || products.some((p) => p.category === f.value)
  )

  return (
    <PageWrapper>
      <div className="pt-32 pb-10 max-w-7xl mx-auto px-6 md:px-10">
        {/* Page header */}
        <div className="mb-16">
          <p className="font-inter text-[9px] tracking-[0.4em] text-oak-muted uppercase mb-4">
            OAK-A
          </p>
          <h1 className="font-cormorant text-5xl md:text-7xl text-oak-light font-light">
            The Collection
          </h1>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-1 mb-16 border-b border-oak-800/60 pb-0">
          {availableFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`font-inter text-[10px] tracking-[0.25em] uppercase px-5 py-4 transition-all duration-200 border-b-[1.5px] -mb-px ${
                filter === f.value
                  ? 'text-oak-light border-oak-warm'
                  : 'text-oak-muted border-transparent hover:text-oak-light hover:border-oak-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Product count */}
        <div className="mb-10 flex items-center justify-between">
          <p className="font-inter text-[10px] tracking-wider text-oak-muted">
            {loading ? '...' : `${filtered.length} piece${filtered.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-oak-900/60 mb-4" />
                <div className="h-3 bg-oak-900/60 w-2/3 mb-2" />
                <div className="h-2 bg-oak-900/40 w-1/3" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-32 text-center">
            <p className="font-cormorant text-3xl text-oak-muted font-light">
              Nothing here yet.
            </p>
            <p className="font-inter text-xs text-oak-muted/60 mt-3 tracking-wider">
              Check back soon or explore another category.
            </p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14"
            >
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Custom work banner */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-24 mb-16">
        <hr className="rule mb-16" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-cormorant text-2xl text-oak-light font-light mb-2">
              Don&apos;t see what you&apos;re looking for?
            </p>
            <p className="font-inter text-xs text-oak-muted tracking-wide">
              Every piece can be commissioned. Every detail can be yours.
            </p>
          </div>
          <a
            href="/contact"
            className="shrink-0 font-inter text-[10px] tracking-[0.3em] uppercase border border-oak-warm text-oak-warm hover:bg-oak-warm hover:text-oak-950 px-8 py-3 transition-all duration-300"
          >
            Commission a Piece
          </a>
        </div>
      </div>
    </PageWrapper>
  )
}
