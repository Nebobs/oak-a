'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getProductById } from '@/lib/products'
import type { Product } from '@/types'

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    if (!id) return
    getProductById(id).then((p) => {
      if (!p) router.push('/shop')
      setProduct(p)
      setLoading(false)
    })
  }, [id, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="font-inter text-[10px] tracking-[0.3em] text-oak-muted uppercase animate-pulse">
          Loading
        </div>
      </div>
    )
  }

  if (!product) return null

  const hasImages = product.images && product.images.length > 0
  const isCustom = product.category === 'custom'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pt-20 min-h-screen"
    >
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-10 pb-6">
        <nav className="flex items-center gap-3">
          <Link
            href="/shop"
            className="font-inter text-[9px] tracking-[0.25em] text-oak-muted hover:text-oak-light uppercase transition-colors"
          >
            Collection
          </Link>
          <span className="font-inter text-[9px] text-oak-800">—</span>
          <span className="font-inter text-[9px] tracking-[0.25em] text-oak-muted/60 uppercase truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* ─── Image Gallery ──────────────────────────────────────────── */}
          <div className="flex flex-col gap-4">
            {/* Main image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="relative aspect-[3/4] overflow-hidden product-placeholder bg-gradient-to-br from-oak-800 via-oak-900 to-oak-950"
            >
              {hasImages ? (
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="font-cormorant text-8xl text-oak-warm/10 block leading-none">
                      {product.name.charAt(0)}
                    </span>
                    <span className="font-inter text-[9px] tracking-[0.4em] text-oak-muted/30 uppercase mt-4 block">
                      Image coming soon
                    </span>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Thumbnails */}
            {hasImages && product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 aspect-[3/4] overflow-hidden transition-all duration-200 ${
                      selectedImage === i
                        ? 'ring-1 ring-oak-warm'
                        : 'opacity-50 hover:opacity-80'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ─── Product Info ────────────────────────────────────────────── */}
          <div className="flex flex-col justify-start pt-2 lg:pt-8">
            {/* Category */}
            <p className="font-inter text-[9px] tracking-[0.35em] text-oak-warm uppercase mb-4">
              {product.category}
            </p>

            {/* Name */}
            <h1 className="font-cormorant text-4xl md:text-5xl text-oak-light font-light leading-tight mb-6">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mb-8">
              {isCustom ? (
                <p className="font-inter text-sm text-oak-muted tracking-wider">
                  Price on request
                </p>
              ) : (
                <p className="font-cormorant text-3xl text-oak-light">
                  €{product.price}
                </p>
              )}
            </div>

            <hr className="rule mb-8" />

            {/* Description */}
            <div className="mb-8">
              <p className="font-inter text-sm text-oak-muted leading-relaxed tracking-wide">
                {product.description}
              </p>
            </div>

            {/* Sizes */}
            <div className="mb-10">
              <p className="font-inter text-[9px] tracking-[0.3em] text-oak-muted uppercase mb-3">
                {isCustom ? 'Made to measure' : 'Available Sizes'}
              </p>
              {isCustom ? (
                <p className="font-inter text-xs text-oak-muted/70 tracking-wide">
                  Every custom piece is built around your exact measurements. Contact us to begin.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="font-inter text-[10px] tracking-[0.15em] text-oak-muted border border-oak-800 px-3 py-2 uppercase"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* CTA */}
            <Link
              href={`/contact?product=${encodeURIComponent(product.name)}`}
              className="inline-flex items-center justify-center font-inter text-[10px] tracking-[0.35em] uppercase bg-oak-warm text-oak-950 hover:bg-oak-light transition-colors duration-300 px-10 py-5 mb-4"
            >
              {isCustom ? 'Start a Commission' : 'Contact to Purchase'}
            </Link>

            <p className="font-inter text-[9px] text-oak-muted/60 tracking-wider text-center">
              We respond within 24 hours.
            </p>

            <hr className="rule my-10" />

            {/* The story */}
            <div>
              <p className="font-inter text-[9px] tracking-[0.3em] text-oak-muted uppercase mb-4">
                The Story
              </p>
              <p className="font-cormorant text-xl text-oak-muted/80 leading-relaxed italic font-light">
                &ldquo;{product.story}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
