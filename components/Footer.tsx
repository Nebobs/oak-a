import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-oak-800/60 mt-16">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

          {/* Brand — takes more space */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <Link href="/" className="group w-fit">
              <span className="font-cormorant text-3xl tracking-[0.3em] text-oak-light group-hover:text-oak-warm transition-colors duration-400 uppercase block">
                OAK—A
              </span>
            </Link>
            <p className="font-cormorant text-xl text-oak-muted/70 font-light italic leading-relaxed max-w-[280px]">
              &ldquo;Built with attention, worn with intention, kept for a lifetime.&rdquo;
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 font-inter text-[9px] tracking-[0.3em] text-oak-muted hover:text-oak-warm uppercase transition-colors duration-300 w-fit mt-2"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              @oak.a.label
            </a>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 flex flex-col gap-5">
            <span className="font-inter text-[9px] tracking-[0.35em] text-oak-muted/50 uppercase">
              Navigate
            </span>
            <nav className="flex flex-col gap-3">
              {[
                { href: '/shop', label: 'The Collection' },
                { href: '/about', label: 'About the Label' },
                { href: '/contact', label: 'Get in Touch' },
                { href: '/admin', label: 'Admin' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-inter text-xs text-oak-muted hover:text-oak-light transition-colors duration-300 tracking-wider w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Info */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <span className="font-inter text-[9px] tracking-[0.35em] text-oak-muted/50 uppercase">
              The Label
            </span>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Made in', value: 'A home workshop' },
                { label: 'Production', value: 'One piece at a time' },
                { label: 'Commission', value: 'Always open' },
              ].map((item) => (
                <div key={item.label} className="flex items-baseline justify-between gap-4 border-b border-oak-800/30 pb-3">
                  <span className="font-inter text-[9px] tracking-wider text-oak-muted/50 uppercase shrink-0">
                    {item.label}
                  </span>
                  <span className="font-cormorant text-base text-oak-muted text-right">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-oak-800/40">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <span className="font-inter text-[9px] text-oak-800 tracking-widest uppercase">
            © {year} OAK-A. All rights reserved.
          </span>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-oak-warm/30 block" />
            <span className="font-inter text-[9px] text-oak-800 tracking-wider">
              Made by hand. Every time.
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
