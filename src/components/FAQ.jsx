import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const items = [
  {
    q: 'How long does it take to set up?',
    a: 'Most shops are up and running within 24 hours. Upload your catalog, configure your preferences, and your AI sommelier is ready to assist customers.',
  },
  {
    q: 'Does it work with my current POS?',
    a: 'BottleBrain is designed to work alongside your existing systems. We handle onboarding personally for every new retailer to make sure the setup fits your workflow.',
  },
  {
    q: 'What happens if a bottle sells out?',
    a: 'BottleBrain automatically suggests alternatives with similar flavor profiles when items go out of stock. Your catalog stays current through automatic sync with modern POS systems, so recommendations are always accurate.',
  },
  {
    q: 'Can I customize the AI personality?',
    a: "Absolutely. You can adjust the tone, language style, and recommendation priorities to match your shop's unique personality and the way your team talks about wine.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="faq" className="py-28 px-5 lg:py-32">
      <div className="mx-auto max-w-[720px]">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-ink-900 mb-14"
          style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
          }}
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="space-y-4">
          {items.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
                >
                  <span className="font-semibold text-ink-900 pr-4">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 text-ink-500"
                  >
                    <ChevronDown size={20} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <p className="px-6 pb-5 text-ink-500 leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
