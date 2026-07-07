import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { SectionHeading } from './ui'

const items = [
  {
    q: 'How long does it take to set up?',
    a: 'Most shops are up and running within 24 hours. We sync your catalog, tune the voice to your shop, and your AI sommelier is ready to pour recommendations.',
  },
  {
    q: 'Does it work with my current POS?',
    a: 'BottleBrain is designed to work alongside your existing systems — inventory syncs automatically every day. We handle onboarding personally for every new retailer to make sure the setup fits your workflow.',
  },
  {
    q: 'Will it ever recommend a wine I don’t carry?',
    a: 'No. Every recommendation is grounded in your live inventory — it never invents a bottle. If something sells out, it says so honestly and turns the request into a special-order lead instead.',
  },
  {
    q: 'Can I customize the AI personality?',
    a: 'Absolutely. You can adjust the tone, language style, and recommendation priorities to match your shop’s unique personality and the way your team talks about wine.',
  },
  {
    q: 'What does it cost?',
    a: 'A straightforward monthly subscription sized to your shop — no setup fees, no long-term contracts. We’ll give you an exact number on the demo call.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="faq" className="py-28 lg:py-32 px-5 bg-cream-100 parchment-alt">
      <div className="mx-auto max-w-[760px]">
        <SectionHeading
          badge="Questions"
          title="Asked and answered."
        />

        <div className="space-y-3.5 mt-14">
          {items.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`relative rounded-2xl border bg-white overflow-hidden transition-colors duration-300 ${
                  isOpen ? 'border-wine-800/25 shadow-card' : 'border-ink-900/[0.06]'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
                >
                  <span className="font-semibold text-ink-900 pr-4 text-[15.5px]">{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`shrink-0 ${isOpen ? 'text-wine-800' : 'text-ink-400'}`}
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
                      <p className="px-6 pb-5 text-ink-500 leading-relaxed text-[14.5px]">{item.a}</p>
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
