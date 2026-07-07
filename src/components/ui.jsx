import { motion } from 'framer-motion'

/** Pill badge that opens each section, e.g. ⬤ How it works */
export function SectionBadge({ children, dark = false }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase rounded-full px-4 py-2 border ${
        dark
          ? 'text-wine-200 border-wine-200/25 bg-white/[0.04]'
          : 'text-wine-800 border-wine-800/20 bg-wine-50'
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dark ? 'bg-wine-400' : 'bg-wine-600'}`} />
      {children}
    </span>
  )
}

/** Scroll-into-view reveal wrapper */
export function Reveal({ children, delay = 0, y = 28, className = '', ...rest }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.6, 0.35, 1] }}
      className={`relative ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Section heading: badge + serif headline + optional sub */
export function SectionHeading({ badge, title, sub, dark = false, center = true }) {
  return (
    <div className={center ? 'text-center' : ''}>
      <Reveal>
        <SectionBadge dark={dark}>{badge}</SectionBadge>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={`font-display font-medium text-balance mt-5 ${
            dark ? 'text-cream-50' : 'text-ink-900'
          }`}
          style={{
            fontSize: 'clamp(34px, 4.4vw, 56px)',
            lineHeight: 1.08,
            letterSpacing: '-0.015em',
          }}
        >
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p
            className={`mt-5 text-lg leading-relaxed ${center ? 'mx-auto' : ''} max-w-xl ${
              dark ? 'text-cream-50/65' : 'text-ink-500'
            }`}
          >
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  )
}
