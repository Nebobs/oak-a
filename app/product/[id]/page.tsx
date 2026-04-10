'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
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
      transition={{ duration: 0.7 }}
      className="pt-16 min-h-screen"
    >
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-10 pb-8">
        <nav className="flex items-center gap-3">
          <Link
            href="/shop"
            className="font-inter text-[9px] tracking-[0.25em] text-oak-muted hover:text-oak-light uppercase transition-colors"
          >
            Collection
          </Link>
          <span className="font-inter text-[9px] text-oak-800">—</span>
          <span className="font-inter text-[9px] tracking-[0.25em] text-oak-muted/50 uppercase truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">

          {/* ─── Image Gallery ──────────────────────────────────────────── */}
          <div className="flex gap-4">
            {/* Thumbnail strip — vertical on desktop */}
            {hasImages && product.images.length > 1 && (
              <div className="hidden md:flex flex-col gap-3 shrink-0">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    aria-label={`View image ${i + 1} of ${product.images.length}`}
                    aria-pressed={selectedImage === i}
                    className={`relative w-16 aspect-[3/4] overflow-hidden transition-all duration-200 ${
                      selectedImage === i
                        ? 'ring-1 ring-oak-warm opacity-100'
                        : 'opacity-40 hover:opacity-70'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            )}

            {/* Main image */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="relative aspect-[3/4] overflow-hidden bg-[#111009]">
                <AnimatePresence mode="wait">
                  {hasImages ? (
                    <motion.div
                      key={selectedImage}
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={product.images[selectedImage]}
                        alt={product.name}
                        fill
                        className="object-cover object-top"
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </motion.div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-cormorant text-8xl text-oak-warm/10 font-light">
                        {product.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </AnimatePresence>

                {/* Image counter */}
                {hasImages && product.images.length > 1 && (
                  <div className="absolute bottom-4 right-4 font-inter text-[9px] tracking-wider text-oak-light/60 bg-oak-950/60 px-2 py-1 backdrop-blur-sm">
                    {selectedImage + 1} / {product.images.length}
                  </div>
                )}
              </div>

              {/* Mobile thumbnails — horizontal */}
              {hasImages && product.images.length > 1 && (
                <div className="flex md:hidden gap-2">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      aria-label={`View image ${i + 1} of ${product.images.length}`}
                      aria-pressed={selectedImage === i}
                      className={`relative w-16 aspect-[3/4] overflow-hidden shrink-0 transition-all duration-200 ${
                        selectedImage === i
                          ? 'ring-1 ring-oak-warm opacity-100'
                          : 'opacity-40 hover:opacity-70'
                      }`}
                    >
                      <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ─── Product Info ────────────────────────────────────────────── */}
          <div className="flex flex-col justify-start pt-0 lg:pt-4">

            {/* Category */}
            <p className="font-inter text-[9px] tracking-[0.4em] text-oak-warm uppercase mb-4">
              — {product.category}
            </p>

            {/* Name */}
            <h1 className="font-cormorant text-5xl md:text-6xl text-oak-light font-light leading-[1.05] mb-6">
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
            <p className="font-inter text-sm text-oak-muted leading-relaxed tracking-wide mb-8">
              {product.description}
            </p>

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: 'Made', value: 'By hand' },
                { label: 'Material', value: product.category === 'jeans' ? 'Denim canvas' : 'Natural fabric' },
                { label: 'Finish', value: 'Raw edges' },
                { label: 'Hardware', value: 'Custom' },
              ].map((d) => (
                <div key={d.label} className="border-b border-oak-800/40 pb-3">
                  <p className="font-inter text-[8px] tracking-[0.3em] text-oak-muted/50 uppercase mb-1">{d.label}</p>
                  <p className="font-cormorant text-base text-oak-muted">{d.value}</p>
                </div>
              ))}
            </div>

            {/* Sizes */}
            <div className="mb-10">
              <p className="font-inter text-[9px] tracking-[0.3em] text-oak-muted uppercase mb-3">
                {isCustom ? 'Made to measure' : 'Available Sizes'}
              </p>
              {isCustom ? (
                <p className="font-inter text-xs text-oak-muted/70 tracking-wide">
                  Every custom piece is built around your exact measurements.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="font-inter text-[10px] tracking-[0.15em] text-oak-muted border border-oak-800 hover:border-oak-warm hover:text-oak-warm px-4 py-2.5 uppercase transition-colors duration-200 cursor-default"
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
              className="group relative overflow-hidden inline-flex items-center justify-center font-inter text-[10px] tracking-[0.35em] uppercase bg-oak-warm text-oak-950 hover:text-oak-950 px-10 py-5 mb-3 transition-colors duration-300 min-h-[52px]"
            >
              <span className="relative z-10">
                {isCustom ? 'Start a Commission' : 'Contact to Purchase'}
              </span>
              <span className="absolute inset-0 bg-oak-light translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </Link>

            <p className="font-inter text-[9px] text-oak-muted/50 tracking-wider text-center mb-10">
              We respond within 24 hours.
            </p>

            <hr className="rule mb-8" />

            {/* The story */}
            <div>
              <p className="font-inter text-[9px] tracking-[0.3em] text-oak-muted uppercase mb-4">
                — The Story
              </p>
              <p className="font-cormorant text-xl text-oak-muted/70 leading-relaxed italic font-light">
                &ldquo;{product.story}&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* ── More from the collection ───────────────────────────────── */}
        <div className="mt-28">
          <hr className="rule mb-12" />
          <div className="flex items-center justify-between">
            <p className="font-inter text-[9px] tracking-[0.35em] text-oak-muted uppercase">
              Continue Browsing
            </p>
            <Link
              href="/shop"
              className="font-inter text-[9px] tracking-[0.25em] text-oak-muted hover:text-oak-warm uppercase transition-colors duration-300"
            >
              Full Collection →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
