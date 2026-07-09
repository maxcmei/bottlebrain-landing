import { Mail, MessageCircle, MapPin, ExternalLink } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DemoForm from '../components/DemoForm'
import { SectionBadge, Reveal, PatternFade } from '../components/ui'
import { CellarRack, BubbleField, makeLanes } from '../components/cellar'

const HERO_LANES = makeLanes(9, 163, { maxSize: 8, peak: [0.6, 0.85], gold: 0.3 })
const CARD_LANES = makeLanes(12, 173, { minSize: 3.5, maxSize: 8, peak: [0.66, 0.9] })

const channels = [
  {
    icon: Mail,
    title: 'Email us',
    body: 'Goes straight to Max and Marco — no ticket queue on the other end. Same-day replies, usually.',
    link: { href: 'mailto:team@bottlebrain.io', label: 'team@bottlebrain.io' },
  },
  {
    icon: MessageCircle,
    title: 'See it working right now',
    body: "The best demo already exists. Philippe is answering customers at Petit Philippe in Charlotte as you read this — open the shop and ask him something hard.",
    link: {
      href: 'https://www.petitphilippe.com',
      label: 'Chat with Philippe live',
      external: true,
    },
  },
  {
    icon: MapPin,
    title: 'In the Carolinas?',
    body: "We're based between Chapel Hill and Charlotte. If your shop is drivable, we'll come to you — laptop, demo, and all.",
    link: null,
  },
]

export default function Contact() {
  return (
    <div className="relative min-h-screen bg-cream-50">
      <Navbar />

      {/* ——— Hero ——— */}
      <section
        data-nav-dark
        className="relative overflow-hidden bg-wine-950 hero-atmosphere grain pt-40 lg:pt-48 pb-24 lg:pb-28 px-5"
      >
        <CellarRack base="radial-gradient(ellipse 70% 80% at 50% 0%, black 0%, transparent 74%)" />
        <BubbleField dark lanes={HERO_LANES} />
        <div className="relative z-10 mx-auto max-w-[880px] text-center">
          <PatternFade rgb="22, 3, 8" strength={0.5} />
          <Reveal>
            <SectionBadge dark>Contact</SectionBadge>
          </Reveal>
          <Reveal delay={0.08}>
            <h1
              className="font-display font-medium text-cream-50 text-balance mt-6"
              style={{ fontSize: 'clamp(40px, 5.6vw, 72px)', lineHeight: 1.06, letterSpacing: '-0.015em' }}
            >
              Talk to a <span className="italic text-wine-300">human.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 text-cream-50/65 text-lg leading-relaxed max-w-xl mx-auto">
              BottleBrain is two founders and one very opinionated wine
              merchant. However you reach out, a real person answers.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ——— Channels ——— */}
      <section className="relative overflow-hidden bg-cream-50 parchment py-20 lg:py-24 px-5">
        <BubbleField lanes={CARD_LANES} />
        <div className="relative mx-auto max-w-[980px] grid sm:grid-cols-3 gap-5">
          {channels.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className="rounded-3xl border border-ink-900/[0.06] bg-white shadow-card p-7 h-full flex flex-col">
                <span className="w-11 h-11 rounded-2xl bg-wine-50 border border-wine-800/15 flex items-center justify-center text-wine-800">
                  <c.icon size={19} />
                </span>
                <div className="mt-5 font-bold text-ink-900 text-[16px]">{c.title}</div>
                <p className="mt-2.5 text-ink-500 text-[14.5px] leading-relaxed flex-1">{c.body}</p>
                {c.link && (
                  <a
                    href={c.link.href}
                    {...(c.link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-wine-800 hover:text-wine-900 transition-colors"
                  >
                    {c.link.label}
                    {c.link.external && <ExternalLink size={14} />}
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Reused verbatim — live EmailJS wiring lives inside */}
      <DemoForm />

      <Footer />
    </div>
  )
}
