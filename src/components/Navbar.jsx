import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Wordmark from './Wordmark'

const links = [
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Demo', href: '#demo' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const img1 = new Image(); img1.src = '/assets/glass.png'
    const img2 = new Image(); img2.src = '/assets/glass1.png'
  }, [])

  return (
    <nav className="fixed top-4 left-4 right-4 z-50">
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ borderRadius: 9999 }}
        className={`mx-auto max-w-5xl px-8 py-3.5 flex items-center justify-between transition-all duration-200 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-black/[0.06]'
            : 'bg-white/[0.08] backdrop-blur-sm'
        }`}
      >
        <a href="#" className="shrink-0" style={{ color: scrolled ? undefined : 'white' }}>
          <Wordmark className="text-xl" scrolled={scrolled} />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors duration-300 hover:opacity-80 ${
                scrolled ? 'text-wine-900' : 'text-white/90'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#demo"
            className={`text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              scrolled
                ? 'bg-wine-800 text-white hover:bg-wine-900'
                : 'bg-white text-wine-900 hover:bg-white/90'
            }`}
          >
            Get a Demo
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden p-1 transition-colors cursor-pointer ${
            scrolled ? 'text-wine-900' : 'text-white'
          }`}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mx-auto max-w-5xl mt-2 rounded-3xl bg-white/95 backdrop-blur-md shadow-xl p-6 space-y-1"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-semibold text-wine-900 hover:text-wine-700 transition-colors"
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
