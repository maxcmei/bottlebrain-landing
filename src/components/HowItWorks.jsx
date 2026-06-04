import { motion } from 'framer-motion'
import { FileText, MessageCircle, TrendingUp } from 'lucide-react'

const steps = [
  {
    num: '1',
    icon: FileText,
    title: 'Upload your inventory',
    text: 'Sync your current catalog once and keep tasting notes, price tiers, and pairings aligned automatically.',
  },
  {
    num: '2',
    icon: MessageCircle,
    title: 'Customers chat with AI',
    text: 'Shoppers ask for flavor, food pairing, and budget help, while your AI sommelier guides them naturally.',
  },
  {
    num: '3',
    icon: TrendingUp,
    title: 'More bottles sold',
    text: 'Shoppers get confident recommendations they trust, spend more per visit, and come back because someone always knew exactly what they needed.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 px-5 lg:py-32">
      <div className="mx-auto max-w-[1180px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-ink-900"
            style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
            }}
          >
            How it Works
          </h2>
          <p className="mt-4 text-ink-500 text-lg max-w-lg mx-auto">
            Your inventory, your voice, your sommelier &mdash; live in under 24 hours.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative bg-rose-50 rounded-3xl p-8 overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-rose-200/40 transition-shadow duration-300"
            >
              <span className="absolute top-4 right-6 text-[120px] font-black leading-none text-wine-800/[0.06] select-none pointer-events-none">
                {step.num}
              </span>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-wine-800 mb-5">
                  <step.icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-ink-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-ink-500 leading-relaxed">{step.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
