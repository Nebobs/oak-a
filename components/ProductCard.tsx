'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  index?: number
}

const placeholderGradients = [
  ['#1a1712', '#0f0e0b'],
  ['#151814', '#0c0f0a'],
  ['#181512', '#100e09'],
  ['#141618', '#0a0c0f'],
]

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const hasImage = product.images && product.images.length > 0
  const [from, to] = placeholderGradients[index % placeholderGradients.length]
  const isCustom = product.category === 'custom'

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/product/${product.id}`}
        className="group block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* ── Image container ──────────────────────────────────────── */}
        <div className="relative overflow-hidden aspect-[3/4] mb-5">

          {hasImage ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          ) : (
            <div
              className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              style={{ background: `linear-gradient(160deg, ${from} 0%, ${to} 100%)` }}
            >
              {/* Subtle radial light */}
              <div
                className="absolute inset-0 transition-opacity duration-700"
                style={{
                  opacity: hovered ? 1 : 0,
                  background: 'radial-gradient(ellipse at 30% 20%, rgba(196,168,130,0.08) 0%, transparent 65%)',
                }}
              />
              {/* Large ghost letter */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="font-cormorant font-light select-none transition-all duration-700"
                  style={{
                    fontSize: 'clamp(6rem,14vw,11rem)',
                    color: 'rgba(196,168,130,0.07)',
                    transform: hovered ? 'translateY(-6px) scale(1.04)' : 'translateY(0) scale(1)',
                  }}
                >
                  {product.name.charAt(0)}
                </span>
              </div>
            </div>
          )}

          {/* Gradient vignette at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

          {/* Slide-up overlay info */}
          <div
            className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between transition-all duration-500 ease-out"
            style={{
              transform: hovered ? 'translateY(0)' : 'translateY(6px)',
              opacity: hovered ? 1 : 0,
            }}
          >
            <span className="font-inter text-[9px] tracking-[0.3em] text-oak-light/80 uppercase">
              View Piece
            </span>
            <motion.span
              animate={hovered ? { x: [0, 4, 0] } : { x: 0 }}
              transition={{ repeat: hovered ? Infinity : 0, duration: 1, ease: 'easeInOut' }}
              className="font-inter text-[10px] text-oak-warm"
            >
              →
            </motion.span>
          </div>

          {/* Category pill — top left */}
          <div className="absolute top-4 left-4">
            <span
              className="font-inter text-[8px] tracking-[0.2em] uppercase px-2.5 py-1 border transition-all duration-300"
              style={{
                color: hovered ? '#C4A882' : 'rgba(138,130,117,0.7)',
                borderColor: hovered ? 'rgba(196,168,130,0.4)' : 'rgba(42,38,32,0.6)',
                backgroundColor: 'rgba(10,9,8,0.6)',
                backdropFilter: 'blur(4px)',
              }}
            >
              {product.category}
            </span>
          </div>

          {/* Sold badge */}
          {!product.available && (
            <div className="absolute top-4 right-4">
              <span className="font-inter text-[8px] tracking-[0.2em] uppercase px-2.5 py-1 bg-oak-950/80 text-oak-muted border border-oak-800/60">
                Sold
              </span>
            </div>
          )}
        </div>

        {/* ── Info row ─────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3
              className="font-cormorant text-xl leading-tight transition-colors duration-300 mb-1"
              style={{ color: hovered ? '#C4A882' : '#F8F5F0' }}
            >
              {product.name}
            </h3>
            {/* Size dots */}
            {!isCustom && product.sizes.length > 0 && (
              <div className="flex gap-1.5 mt-1.5">
                {product.sizes.slice(0, 4).map((s) => (
                  <span
                    key={s}
                    className="font-inter text-[8px] tracking-wide text-oak-muted/60"
                  >
                    {s}
                    {product.sizes.indexOf(s) < Math.min(product.sizes.length, 4) - 1 ? ' ·' : ''}
                  </span>
                ))}
                {product.sizes.length > 4 && (
                  <span className="font-inter text-[8px] text-oak-muted/40">+{product.sizes.length - 4}</span>
                )}
              </div>
            )}
          </div>

          <div className="shrink-0 text-right">
            {isCustom ? (
              <span className="font-inter text-[9px] tracking-wider text-oak-muted/70 block mt-1">
                On request
              </span>
            ) : (
              <span className="font-cormorant text-xl text-oak-light block">
                €{product.price}
              </span>
            )}
          </div>
        </div>

        {/* Animated underline on hover */}
        <div className="mt-4 h-px overflow-hidden">
          <motion.div
            className="h-full bg-oak-warm/30"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: hovered ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </Link>
    </motion.article>
  )
}
