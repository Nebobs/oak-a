import type { Metadata } from 'next'
import Link from 'next/link'
import PageWrapper from '@/components/PageWrapper'

export const metadata: Metadata = {
  title: 'About',
  description:
    'OAK-A is an independent clothing label — every piece designed and made by hand in a private workshop. The story of craft, intention, and raw material.',
}

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="pt-32 pb-32">

        {/* ─── Header ───────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 mb-24">
          <p className="font-inter text-[9px] tracking-[0.4em] text-oak-muted uppercase mb-4">
            The Label
          </p>
          <h1 className="font-cormorant text-6xl md:text-8xl text-oak-light font-light leading-none">
            About<br />
            <em className="text-oak-warm">OAK-A</em>
          </h1>
        </div>

        {/* ─── Opening statement ────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 mb-24">
          <div className="max-w-3xl">
            <p className="font-cormorant text-2xl md:text-3xl text-oak-light font-light leading-relaxed">
              OAK-A is a single-person clothing label. No factory. No production line.
              Every garment is designed and made entirely by hand, in a private workshop,
              one piece at a time.
            </p>
          </div>
        </div>

        <hr className="max-w-7xl mx-auto px-6 md:px-10 rule mb-24" />

        {/* ─── The workshop story ───────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          {/* Text */}
          <div className="flex flex-col gap-8 justify-center">
            <p className="font-inter text-[9px] tracking-[0.35em] text-oak-warm uppercase">
              The Beginning
            </p>
            <h2 className="font-cormorant text-4xl text-oak-light font-light leading-tight">
              It started because nothing<br />fit the way I wanted it to.
            </h2>
            <div className="flex flex-col gap-5 font-inter text-sm text-oak-muted leading-relaxed tracking-wide">
              <p>
                I started making clothes because I could not find anything that felt right.
                Everything in the shops was either too fast, too cheap, or made without any
                real thought behind it. I wanted clothes that had weight to them — not just
                physical weight, but the kind that comes from knowing why something was made
                the way it was.
              </p>
              <p>
                So I taught myself to sew. Then to cut. Then to draft patterns. Then to source
                fabric worth sourcing. It took years, and it is still not finished — but that
                is the point.
              </p>
            </div>
          </div>

          {/* Visual block */}
          <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[480px] bg-gradient-to-br from-oak-800 via-oak-900 to-oak-950 product-placeholder overflow-hidden">
            <div className="absolute inset-8 border border-oak-700/20" />
            <div className="absolute bottom-8 left-8">
              <span className="font-inter text-[9px] tracking-[0.3em] text-oak-muted/40 uppercase">
                The Workshop
              </span>
            </div>
          </div>
        </div>

        {/* ─── The Process ──────────────────────────────────────────────── */}
        <div className="bg-oak-900/30 border-t border-b border-oak-800/60 py-24 mb-24">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <p className="font-inter text-[9px] tracking-[0.35em] text-oak-muted uppercase mb-16">
              The Process
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              {[
                {
                  step: '01',
                  title: 'The Idea',
                  text: 'Every piece starts as a sketch or a feeling — a silhouette spotted, a fabric that wants to become something specific. Nothing is designed to be trendy.',
                },
                {
                  step: '02',
                  title: 'The Material',
                  text: 'Fabric is sourced carefully — Japanese denim mills, Belgian linen weavers, natural wool from small producers. The material shapes the garment as much as the pattern does.',
                },
                {
                  step: '03',
                  title: 'The Making',
                  text: 'Each piece is cut and sewn by hand. Seams are felled by hand. Buttons are attached by hand. It takes time. That is the whole point.',
                },
              ].map((item) => (
                <div key={item.step} className="flex flex-col gap-4">
                  <span className="font-cormorant text-5xl text-oak-warm/20 font-light">
                    {item.step}
                  </span>
                  <h3 className="font-cormorant text-2xl text-oak-light font-light">
                    {item.title}
                  </h3>
                  <p className="font-inter text-sm text-oak-muted leading-relaxed tracking-wide">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Brand values ─────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 mb-24">
          <div className="max-w-2xl">
            <p className="font-inter text-[9px] tracking-[0.35em] text-oak-muted uppercase mb-6">
              What OAK-A Is
            </p>
            <p className="font-cormorant text-3xl text-oak-light font-light leading-relaxed mb-8">
              Not fast. Not cheap. Not designed to be discarded.
            </p>
            <div className="flex flex-col gap-5 font-inter text-sm text-oak-muted leading-relaxed tracking-wide">
              <p>
                The name OAK-A came from thinking about material that endures. Oak is not
                the most beautiful wood. It is not the rarest. But it is honest, it is strong,
                and it lasts for generations if you treat it right. That is what I want
                every piece here to be.
              </p>
              <p>
                The hyphen is intentional. OAK is the material. The A is the maker.
                Together, they make something.
              </p>
            </div>
          </div>
        </div>

        <hr className="max-w-7xl mx-auto px-6 md:px-10 rule mb-16" />

        {/* ─── CTA ──────────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="font-cormorant text-3xl text-oak-light font-light mb-2">
              Want to wear something made this way?
            </p>
            <p className="font-inter text-sm text-oak-muted tracking-wide">
              Browse the collection, or start a commission.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              href="/shop"
              className="font-inter text-[10px] tracking-[0.3em] uppercase bg-oak-warm text-oak-950 hover:bg-oak-light px-8 py-4 transition-colors duration-300"
            >
              Shop
            </Link>
            <Link
              href="/contact"
              className="font-inter text-[10px] tracking-[0.3em] uppercase border border-oak-800 text-oak-muted hover:border-oak-warm hover:text-oak-warm px-8 py-4 transition-colors duration-300"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
