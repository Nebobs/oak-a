'use client'

import { motion } from 'framer-motion'

const items = [
  'Handcrafted',
  'One at a Time',
  'Raw Material',
  'Intentional Design',
  'Workshop Made',
  'Built to Last',
  'OAK—A',
  'Independent Label',
]

interface MarqueeStripProps {
  reverse?: boolean
  className?: string
}

export default function MarqueeStrip({ reverse = false, className = '' }: MarqueeStripProps) {
  const duplicated = [...items, ...items, ...items]

  return (
    <div className={`overflow-hidden border-t border-b border-oak-800/60 py-4 bg-oak-900/20 ${className}`}>
      <motion.div
        className="flex whitespace-nowrap gap-0"
        animate={{ x: reverse ? ['0%', '33.33%'] : ['0%', '-33.33%'] }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
      >
        {duplicated.map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="font-inter text-[9px] tracking-[0.35em] text-oak-muted uppercase px-6">
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-oak-warm/30 shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}
