import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Wordmark from './Wordmark'

const links = [
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Analytics', href: '#analytics' },
  { label: 'FAQ', href: '#faq' },
]

/*
 * The pill adapts to what's underneath it: dark glass over the dark
 * sections (hero, analytics, footer — anything tagged [data-nav-dark])
 * and warm cream glass over the light ones. `light` drives every
 * color in the bar, all transitioned together over 300ms.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [overDark, setOverDark] = useState(true)
  const [open, setOpen] = useState(false)
  const barRef = useRef(null)
  // A/B: append ?noglass to the URL to strip backdrop-filter and test
  // whether the flicker is Chrome's backdrop-filter scroll glitch
  const noGlass =
    typeof window !== 'undefined' && window.location.search.includes('noglass')

  useEffect(() => {
    // Single-writer rAF loop instead of scroll-event callbacks: one
    // place computes the mode each frame, so event bursts can never
    // race. The mode may flip at most once per FLIP_COOLDOWN ms —
    // rapid flicker is mechanically impossible, and any transient
    // mis-read self-corrects on a later frame as a calm, single change.
    const FLIP_COOLDOWN = 250
    let targets = []
    let dark = true
    let lastFlip = 0
    let raf

    const loop = () => {
      setScrolled(window.scrollY > 20)
      if (!targets.length) targets = Array.from(document.querySelectorAll('[data-nav-dark]'))
      const rect = barRef.current?.getBoundingClientRect()
      const mid = rect ? rect.top + rect.height / 2 : 51
      // Hysteresis by inflating (dark) / deflating (light) the dark
      // rects — stable for both top and bottom edges, unlike a
      // shifted trigger line.
      const H = dark ? 10 : -10
      const nowDark = targets.some((el) => {
        const r = el.getBoundingClientRect()
        return r.top - H < mid && r.bottom + H > mid
      })
      const now = performance.now()
      if (nowDark !== dark && now - lastFlip >= FLIP_COOLDOWN) {
        dark = nowDark
        lastFlip = now
        setOverDark(nowDark)
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  const light = scrolled && !overDark
  // one inherited color drives the whole wordmark (text + masked glass)
  const brandColor = light ? '#8b1a3a' : '#fdfbf8'

  return (
    <nav className="fixed top-4 left-4 right-4 z-50">
      <div
        ref={barRef}
        // translateZ(0): community-verified mitigation for Chrome's
        // backdrop-filter scroll flicker — keeps the pill on a stable,
        // pre-promoted compositor layer
        style={{ borderRadius: 9999, transform: 'translateZ(0)' }}
        className={`mx-auto max-w-5xl px-7 py-3.5 flex items-center justify-between transition-[background-color,border-color] duration-200 ${
          noGlass
            ? light
              ? 'bg-cream-50 shadow-lg shadow-wine-950/[0.16] border border-white/50'
              : scrolled
                ? 'bg-wine-950 shadow-lg shadow-wine-950/[0.16] border border-white/10'
                : 'bg-wine-950/80 border border-white/[0.08]'
            : light
              ? 'bg-cream-50/70 backdrop-blur-xl shadow-lg shadow-wine-950/[0.16] border border-white/50'
              : scrolled
                ? 'bg-wine-950/45 backdrop-blur-xl shadow-lg shadow-wine-950/[0.16] border border-white/10'
                : 'bg-white/[0.05] backdrop-blur-sm border border-white/[0.08]'
        }`}
      >
        <a
          href="#"
          className="shrink-0"
          style={{ color: brandColor, transition: 'color 0.2s ease' }}
        >
          <Wordmark className="text-xl" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`group relative text-sm font-semibold transition-colors duration-200 ${
                light ? 'text-wine-900' : 'text-white/90'
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-[1.5px] w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                  light ? 'bg-wine-800' : 'bg-white/70'
                }`}
              />
            </a>
          ))}
          {/* 150ms: quick enough that the inversion's low-contrast
              midpoint lasts ~2 frames, slow enough to feel eased */}
          <a
            href="#demo"
            className={`text-sm font-semibold px-5 py-2.5 rounded-full cursor-pointer transition-colors duration-150 ${
              light
                ? 'bg-wine-800 text-white hover:bg-wine-900'
                : 'bg-cream-50 text-wine-900 hover:bg-white'
            }`}
          >
            Get a Demo
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden p-1 transition-colors duration-200 cursor-pointer ${
            light ? 'text-ink-900' : 'text-white'
          }`}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mx-auto max-w-5xl mt-2 rounded-3xl bg-cream-50 shadow-xl p-6 space-y-1"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-semibold text-ink-900 hover:text-wine-800 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#demo"
              onClick={() => setOpen(false)}
              className="block mt-4 text-center bg-wine-800 text-white py-3 rounded-full font-semibold hover:bg-wine-900 transition-colors"
            >
              Get a Demo
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
