'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const TAGLINE_WORDS = ['Handcrafted', 'Intentional', 'Raw']

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[700px] overflow-hidden bg-oak-950 flex items-center justify-center"
    >
      {/* ── Deep background layers ─────────────────────────────────── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,#1C1A14_0%,#0A0908_70%)]" />

      {/* Diagonal accent line */}
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        animate={loaded ? { scaleX: 1 } : {}}
        transition={{ duration: 1.6, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-[38%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-oak-warm/20 to-transparent"
      />
      <motion.div
        initial={{ scaleX: 0, originX: 1 }}
        animate={loaded ? { scaleX: 1 } : {}}
        transition={{ duration: 1.6, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-[62%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-oak-warm/10 to-transparent"
      />

      {/* ── Vertical side labels ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4"
      >
        <span
          className="font-inter text-[8px] tracking-[0.4em] text-oak-muted uppercase"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Est. 2024
        </span>
        <span className="w-px h-16 bg-gradient-to-b from-oak-muted/40 to-transparent block" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4"
      >
        <span className="w-px h-16 bg-gradient-to-b from-transparent to-oak-muted/40 block" />
        <span
          className="font-inter text-[8px] tracking-[0.4em] text-oak-muted uppercase"
          style={{ writingMode: 'vertical-rl' }}
        >
          Workshop Label
        </span>
      </motion.div>

      {/* ── Main content ──────────────────────────────────────────── */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-7xl mx-auto"
      >
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="flex items-center gap-4 mb-10"
        >
          <span className="w-8 h-px bg-oak-warm/50" />
          <span className="font-inter text-[9px] tracking-[0.45em] text-oak-muted uppercase">
            Independent Label · Since 2024
          </span>
          <span className="w-8 h-px bg-oak-warm/50" />
        </motion.div>

        {/* Brand name — letter by letter reveal */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: '110%' }}
            animate={loaded ? { y: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-cormorant font-light text-oak-light leading-[0.9] tracking-[0.08em]"
            style={{ fontSize: 'clamp(6rem, 22vw, 20rem)' }}
          >
            OAK
          </motion.h1>
        </div>

        {/* Em dash separator + A */}
        <div className="flex items-center gap-6 md:gap-10 mb-12">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={loaded ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="h-px bg-oak-warm origin-left"
            style={{ width: 'clamp(3rem, 8vw, 8rem)' }}
          />
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: '110%' }}
              animate={loaded ? { y: 0 } : {}}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-cormorant font-light text-oak-warm leading-none inline-block"
              style={{ fontSize: 'clamp(5rem, 16vw, 16rem)' }}
            >
              A
            </motion.span>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={loaded ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="h-px bg-oak-warm origin-right"
            style={{ width: 'clamp(3rem, 8vw, 8rem)' }}
          />
        </div>

        {/* Tagline — word by word */}
        <div className="flex items-center gap-4 md:gap-8 mb-14">
          {TAGLINE_WORDS.map((word, i) => (
            <motion.div
              key={word}
              initial={{ opacity: 0, y: 8 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 1.1 + i * 0.12 }}
              className="flex items-center gap-4 md:gap-8"
            >
              <span className="font-inter text-[9px] md:text-[10px] tracking-[0.4em] text-oak-muted uppercase">
                {word}
              </span>
              {i < TAGLINE_WORDS.length - 1 && (
                <span className="w-1 h-1 rounded-full bg-oak-warm/40 block" />
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <Link
            href="/shop"
            className="group relative font-inter text-[10px] tracking-[0.35em] uppercase overflow-hidden bg-oak-warm text-oak-950 px-12 py-4 hover:text-oak-950 transition-colors duration-300"
          >
            <span className="relative z-10">View Collection</span>
            <span className="absolute inset-0 bg-oak-light translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          </Link>
          <Link
            href="/about"
            className="font-inter text-[10px] tracking-[0.35em] uppercase text-oak-muted hover:text-oak-warm transition-colors duration-300 flex items-center gap-3"
          >
            Our Story
            <motion.span
              className="inline-block w-6 h-px bg-current"
              whileHover={{ scaleX: 2, originX: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        </motion.div>
      </motion.div>

      {/* ── Collection counter – bottom right ─────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-12 right-8 md:right-12 text-right"
      >
        <p className="font-cormorant text-5xl text-oak-warm/20 font-light leading-none">06</p>
        <p className="font-inter text-[8px] tracking-[0.3em] text-oak-muted/50 uppercase mt-1">Pieces</p>
      </motion.div>

      {/* ── Scroll indicator ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-inter text-[7px] tracking-[0.5em] text-oak-800 uppercase">Scroll</span>
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none" className="text-oak-800">
            <rect x="0.5" y="0.5" width="11" height="19" rx="5.5" stroke="currentColor" strokeOpacity="0.3"/>
            <motion.rect
              x="4.5" y="3" width="3" height="5" rx="1.5" fill="currentColor" fillOpacity="0.5"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
