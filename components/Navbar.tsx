'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isHome = pathname === '/'

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isHome
            ? 'border-b border-oak-800/50'
            : ''
        }`}
        style={{
          backgroundColor: scrolled || !isHome
            ? 'rgba(10,9,8,0.92)'
            : 'transparent',
          backdropFilter: scrolled || !isHome ? 'blur(12px) saturate(180%)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="group relative">
            <span className="font-cormorant text-xl tracking-[0.3em] text-oak-light group-hover:text-oak-warm transition-colors duration-400 uppercase">
              OAK—A
            </span>
            <motion.span
              className="absolute -bottom-0.5 left-0 h-px bg-oak-warm"
              initial={{ scaleX: 0, originX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: '100%' }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative group font-inter text-[10px] tracking-[0.25em] uppercase transition-colors duration-300"
                style={{ color: pathname === link.href ? '#C4A882' : '#8A8275' }}
              >
                <span className="group-hover:text-oak-light transition-colors duration-300">
                  {link.label}
                </span>
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-oak-warm"
                    transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right side: Instagram + hamburger */}
          <div className="flex items-center gap-5">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex font-inter text-[9px] tracking-[0.25em] text-oak-muted hover:text-oak-warm uppercase transition-colors duration-300 items-center gap-2"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              @oak.a
            </a>

            {/* Hamburger */}
            <button
              className="flex flex-col gap-[5px] w-11 h-11 justify-center items-end cursor-pointer md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7, width: 24 } : { rotate: 0, y: 0, width: 24 }}
                className="block h-px bg-oak-light origin-center"
                transition={{ duration: 0.3 }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }}
                className="block h-px bg-oak-light w-4"
                transition={{ duration: 0.2 }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7, width: 24 } : { rotate: 0, y: 0, width: 20 }}
                className="block h-px bg-oak-light origin-center"
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile full-screen menu ──────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            key="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-oak-950 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Top bar replica */}
            <div className="h-16 flex items-center px-6 border-b border-oak-800/40">
              <span className="font-cormorant text-xl tracking-[0.3em] text-oak-light uppercase">OAK—A</span>
            </div>

            {/* Nav links */}
            <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 + 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    className="group flex items-center gap-5 py-4 border-b border-oak-800/40"
                  >
                    <span className="font-inter text-[9px] tracking-[0.25em] text-oak-muted/50 w-5">
                      0{i + 1}
                    </span>
                    <span className="font-cormorant text-5xl text-oak-light group-hover:text-oak-warm transition-colors duration-300">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="px-8 py-8 flex items-center justify-between"
            >
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-[9px] tracking-[0.3em] text-oak-muted hover:text-oak-warm uppercase transition-colors"
              >
                @oak.a.label
              </a>
              <span className="font-inter text-[9px] tracking-wider text-oak-muted/40">
                Handcrafted. Always.
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
