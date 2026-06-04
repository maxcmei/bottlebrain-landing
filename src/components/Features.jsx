import { motion } from 'framer-motion'
import { Sparkles, Search, User, Wallet, Smartphone } from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'Instant tasting notes',
    text: 'Generate polished, customer-friendly tasting summaries in seconds from your own inventory context.',
    span: 'col-span-12 md:col-span-7',
    dark: false,
  },
  {
    icon: Search,
    title: 'Natural language search',
    text: 'Ask for a bold red under $40 for a steak dinner and get the right bottles instantly, with alternatives if your first pick is out of stock.',
    span: 'col-span-12 md:col-span-5',
    dark: true,
  },
  {
    icon: User,
    title: 'Personalized',
    text: 'Translates anything, a mood, a meal, a vague feeling, into a wine recommendation your customer will actually love.',
    span: 'col-span-12 sm:col-span-6 md:col-span-4',
    dark: false,
  },
  {
    icon: Wallet,
    title: 'Budget-aware',
    text: 'Keeps recommendations inside target spend ranges while protecting quality and confidence.',
    span: 'col-span-12 sm:col-span-6 md:col-span-4',
    dark: false,
  },
  {
    icon: Smartphone,
    title: 'Anytime, Anywhere',
    text: 'Whether a customer is browsing your website at home or a staff member is helping someone on the shop floor, BottleBrain works beautifully on any device.',
    span: 'col-span-12 sm:col-span-12 md:col-span-4',
    dark: false,
  },
]

export default function Features() {
  return (
    <section id="features" className="py-28 px-5 lg:py-32">
      <div className="mx-auto max-w-[1180px]">
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
          Powerful Features
        </motion.h2>

        <div className="grid grid-cols-12 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`rounded-3xl p-8 cursor-pointer transition-shadow duration-300 ${f.span} ${
                f.dark
                  ? 'bg-wine-800 text-white hover:shadow-xl hover:shadow-wine-800/20'
                  : 'bg-rose-50 hover:shadow-lg hover:shadow-rose-200/40'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${
                  f.dark ? 'bg-white/20 text-white' : 'bg-rose-100 text-wine-800'
                }`}
              >
                <f.icon size={22} />
              </div>
              <h3
                className={`text-lg font-bold mb-2 ${
                  f.dark ? 'text-white' : 'text-ink-900'
                }`}
              >
                {f.title}
              </h3>
              <p
                className={`leading-relaxed ${
                  f.dark ? 'text-white/80' : 'text-ink-500'
                }`}
              >
                {f.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
