import Link from 'next/link'
import { getFeaturedProducts } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import HeroSection from '@/components/HeroSection'
import MarqueeStrip from '@/components/MarqueeStrip'

export default async function HomePage() {
  const featured = await getFeaturedProducts()

  return (
    <>
      <HeroSection />

      {/* ── Marquee strip ──────────────────────────────────────────── */}
      <MarqueeStrip />

      {/* ── Featured Products ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-28">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="font-inter text-[9px] tracking-[0.4em] text-oak-warm uppercase mb-3">
              — Selected Pieces
            </p>
            <h2 className="font-cormorant text-5xl md:text-6xl text-oak-light font-light leading-tight">
              The Collection
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden md:flex font-inter text-[10px] tracking-[0.25em] text-oak-muted hover:text-oak-warm uppercase transition-colors duration-300 items-center gap-3 mb-2"
          >
            View All
            <span className="w-8 h-px bg-current inline-block" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
          {featured.slice(0, 3).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <div className="mt-14 flex justify-center md:hidden">
          <Link
            href="/shop"
            className="font-inter text-[10px] tracking-[0.3em] text-oak-muted hover:text-oak-warm uppercase transition-colors duration-300"
          >
            View All Pieces →
          </Link>
        </div>
      </section>

      {/* ── Brand Statement ───────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-28 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Visual block */}
          <div className="relative aspect-[4/5] overflow-hidden order-last md:order-first">
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(150deg, #1C1A14 0%, #111009 50%, #0A0908 100%)' }}
            />
            {/* Inner border */}
            <div className="absolute inset-6 border border-oak-700/20" />
            {/* Ghost text */}
            <div className="absolute bottom-8 left-8 right-8">
              <p
                className="font-cormorant font-light leading-none select-none text-right"
                style={{ fontSize: 'clamp(5rem, 12vw, 9rem)', color: 'rgba(196,168,130,0.06)' }}
              >
                OAK
              </p>
            </div>
            {/* Subtle texture line */}
            <div className="absolute top-1/2 left-6 right-6 h-px bg-oak-warm/5" />
            {/* Label */}
            <div className="absolute top-8 left-8">
              <span className="font-inter text-[8px] tracking-[0.3em] text-oak-muted/30 uppercase">
                Workshop, 2024
              </span>
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-8">
            <p className="font-inter text-[9px] tracking-[0.4em] text-oak-warm uppercase">
              — The Workshop
            </p>
            <h2 className="font-cormorant text-4xl md:text-5xl text-oak-light font-light leading-[1.2]">
              Everything made<br />
              by hand. One piece<br />
              <em>at a time.</em>
            </h2>
            <div className="w-8 h-px bg-oak-warm/40" />
            <p className="font-inter text-sm text-oak-muted leading-relaxed tracking-wide max-w-[380px]">
              OAK-A exists because most clothes are forgotten the moment they&apos;re bought.
              Everything here is made to outlast that — built with attention,
              worn with intention, kept for a lifetime.
            </p>
            <Link
              href="/about"
              className="font-inter text-[10px] tracking-[0.3em] text-oak-light hover:text-oak-warm uppercase transition-colors duration-300 w-fit flex items-center gap-4 mt-2 group"
            >
              Our Story
              <span className="w-8 h-px bg-current inline-block transition-all duration-500 group-hover:w-14" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Second marquee (reversed) ─────────────────────────────── */}
      <MarqueeStrip reverse />

      {/* ── Custom Work CTA ───────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, #1C1A14 0%, #0A0908 70%)' }}
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-32 text-center">
          <p className="font-inter text-[9px] tracking-[0.45em] text-oak-muted uppercase mb-6">
            — Commission
          </p>
          <h2
            className="font-cormorant text-oak-light font-light mb-4 leading-tight"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            Want something made
          </h2>
          <h2
            className="font-cormorant text-oak-warm font-light italic mb-10 leading-tight"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            exactly for you?
          </h2>
          <p className="font-inter text-sm text-oak-muted mb-12 max-w-[360px] mx-auto leading-relaxed tracking-wide">
            Every commission starts with a conversation. We talk about what you
            want, what you need, and what will last.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="group relative font-inter text-[10px] tracking-[0.35em] uppercase overflow-hidden border border-oak-warm text-oak-warm px-12 py-4 hover:text-oak-950 transition-colors duration-300"
            >
              <span className="relative z-10">Start a Conversation</span>
              <span className="absolute inset-0 bg-oak-warm translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </Link>
            <Link
              href="/shop"
              className="font-inter text-[10px] tracking-[0.3em] text-oak-muted hover:text-oak-light uppercase transition-colors duration-300 py-3 px-2"
            >
              Browse Collection →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Process strip ─────────────────────────────────────────── */}
      <section className="border-t border-oak-800/60">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 md:divide-x md:divide-oak-800/40">
            {[
              { num: '01', title: 'Designed by hand', text: 'Every pattern drafted from scratch. No templates, no shortcuts.' },
              { num: '02', title: 'Cut from the bolt', text: 'Raw fabric sourced from small mills. Cut piece by piece, not by machine.' },
              { num: '03', title: 'Sewn to last', text: 'Hand-felled seams, hand-stitched details. Built to outlast the decade.' },
            ].map((step) => (
              <div key={step.num} className="md:px-8 first:pl-0 last:pr-0 flex flex-col gap-3">
                <span className="font-cormorant text-4xl text-oak-warm/20 font-light">{step.num}</span>
                <h3 className="font-cormorant text-xl text-oak-light font-light">{step.title}</h3>
                <p className="font-inter text-xs text-oak-muted leading-relaxed tracking-wide">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
