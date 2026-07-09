import { motion } from 'framer-motion'
import { Check, ArrowUpRight } from 'lucide-react'
import ChatDemo from './ChatDemo'
import { CellarRack, BubbleField, HERO_LANES } from './cellar'
import { PatternFade } from './ui'

const ease = [0.21, 0.6, 0.35, 1]

function FloatCard({ className = '', delay = 0, bob = 10, duration = 5.5, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, ease }}
      className={`absolute ${className}`}
    >
      <div
        className="bb-bob bg-white/[0.98] rounded-2xl shadow-float"
        style={{ '--bob': `${-bob}px`, '--bob-dur': `${duration}s` }}
      >
        {children}
      </div>
    </motion.div>
  )
}

function FunnelRow({ label, value, pct, delay }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-[11px] text-ink-500 w-[74px]">{label}</span>
      <div className="flex-1 h-1.5 rounded-full bg-wine-100 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, delay, ease }}
          className="h-full rounded-full bg-wine-700"
        />
      </div>
      <span className="text-[11px] font-bold text-ink-900 w-7 text-right">{value}</span>
    </div>
  )
}

export default function Hero() {
  // z-[1] on the section: HowItWorks/Testimonial became `relative` for
  // their bubble fields, which made them paint OVER the dark rounded
  // sections they tuck under (-mt-11 / -my-11), flattening the 44px
  // corners into hard cuts. The dark sections sit one z-level up so the
  // rounded edges stay visible; light-section content still clears the
  // overlap via its big top padding.
  return (
    <section id="hero" data-nav-dark className="relative z-[1] overflow-hidden hero-atmosphere grain rounded-b-[44px]">
      {/* light streak sweeping across the atmosphere */}
      <div aria-hidden="true" className="light-streak absolute inset-0 pointer-events-none" />

      {/* cellar-rack lattice + rising bubbles */}
      <CellarRack base="radial-gradient(ellipse 78% 90% at 60% 30%, black 0%, transparent 80%)" />
      <BubbleField dark lanes={HERO_LANES} />

      {/* bottle neck leaning into frame, cropped by the hero edge */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, delay: 0.5, ease }}
        className="hidden md:block absolute pointer-events-none"
        style={{ left: '-5.5%', bottom: '-33%' }}
      >
        <div className="bb-bob" style={{ '--bob': '-14px', '--bob-dur': '11s' }}>
          <div style={{ transform: 'rotate(24deg)', transformOrigin: '50% 100%' }}>
          {/* glow pooling behind the glass */}
          <div
            className="absolute rounded-full"
            style={{
              inset: '-18%',
              background: 'radial-gradient(circle at 45% 35%, rgba(198,58,93,0.22) 0%, transparent 65%)',
              filter: 'blur(46px)',
            }}
          />
          <svg
            viewBox="0 0 190 560"
            fill="none"
            style={{ width: 'min(20vw, 264px)', height: 'auto', display: 'block', opacity: 0.9 }}
          >
            <defs>
              <linearGradient id="hero-neck-glass" x1="8" y1="0" x2="182" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#2a0a14" />
                <stop offset="0.18" stopColor="#6d1530" />
                <stop offset="0.38" stopColor="#c63a5d" />
                <stop offset="0.56" stopColor="#8b1a3a" />
                <stop offset="0.82" stopColor="#3d0e1d" />
                <stop offset="1" stopColor="#1d0510" />
              </linearGradient>
              <linearGradient id="hero-neck-foil" x1="52" y1="0" x2="138" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#4a0d20" />
                <stop offset="0.34" stopColor="#c63a5d" />
                <stop offset="0.62" stopColor="#a92848" />
                <stop offset="1" stopColor="#3d0e1d" />
              </linearGradient>
              <linearGradient id="hero-neck-shine" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
                <stop offset="1" stopColor="#ffffff" stopOpacity="0.08" />
              </linearGradient>
            </defs>

            {/* stocky Bordeaux: short neck, high shoulders, broad body */}
            <path
              d="M66 62 L66 152 C66 186 8 206 8 268 L8 560 L182 560 L182 268 C182 206 124 186 124 152 L124 62 Z"
              fill="url(#hero-neck-glass)"
            />
            {/* foil capsule */}
            <path
              d="M59 18 Q59 8 69 8 L121 8 Q131 8 131 18 L131 54 Q131 62 123 62 L67 62 Q59 62 59 54 Z"
              fill="url(#hero-neck-foil)"
            />
            <rect x="59" y="44" width="72" height="8" rx="4" fill="#e88ba0" opacity="0.5" />
            <rect x="70" y="8" width="10" height="54" rx="5" fill="#ffffff" opacity="0.18" />
            {/* glass speculars */}
            <rect x="78" y="68" width="9" height="76" rx="4.5" fill="url(#hero-neck-shine)" />
            <rect x="28" y="282" width="13" height="278" rx="6" fill="url(#hero-neck-shine)" opacity="0.5" />
            <rect x="112" y="70" width="4" height="60" rx="2" fill="#ffffff" opacity="0.1" />
          </svg>
          </div>
        </div>
      </motion.div>

      {/* warm glow pooling behind the chat */}
      <div
        aria-hidden="true"
        className="bb-pulse hidden lg:block absolute pointer-events-none rounded-full"
        style={{
          right: '4%',
          top: '18%',
          width: 560,
          height: 560,
          background: 'radial-gradient(circle, rgba(198,58,93,0.4) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="mx-auto max-w-[1180px] w-full px-5 relative z-10 pt-36 pb-20 lg:pt-40 lg:pb-24">
        <div className="grid lg:grid-cols-[1.02fr_0.98fr] gap-14 lg:gap-8 items-center">
          {/* ——— Copy ——— */}
          <div className="max-w-xl relative">
            <PatternFade rgb="22, 3, 8" strength={0.45} />
            {/* relative: keeps the copy in the positioned layer, above the
                fade, even after framer strips its entrance transforms */}
            <div className="relative">
            <motion.a
              href="https://www.petitphilippe.com"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur px-4 py-2 text-[13px] font-medium text-white/85 hover:bg-white/10 transition-colors"
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
              </span>
              Live at Petit Philippe &mdash; Charlotte, NC
              <ArrowUpRight size={14} className="opacity-60" />
            </motion.a>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="font-display font-medium text-cream-50 mt-7 text-balance"
              style={{
                fontSize: 'clamp(46px, 5.6vw, 84px)',
                lineHeight: 1.02,
                letterSpacing: '-0.018em',
              }}
            >
              The sommelier your{' '}
              <span className="italic text-wine-300">
                website{' '}
                <motion.span
                  initial={{ backgroundSize: '0% 0.09em' }}
                  animate={{ backgroundSize: '100% 0.09em' }}
                  transition={{ duration: 0.9, delay: 1.25, ease }}
                  style={{
                    backgroundImage: 'linear-gradient(90deg, rgba(212,85,111,0.55), rgba(212,85,111,0.55))',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '0 96%',
                  }}
                >
                  was missing.
                </motion.span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.24, ease }}
              className="mt-6 text-[17px] text-white/70 max-w-md leading-relaxed"
            >
              BottleBrain reads your live inventory and greets every visitor like a
              regular &mdash; asking the right questions, recommending bottles you
              actually stock, and sending serious buyers straight to your inbox.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38, ease }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <a
                href="#demo"
                className="group inline-flex items-center gap-2 px-7 py-4 bg-cream-50 text-wine-900 font-semibold rounded-full hover:bg-white transition-colors"
              >
                Get a Demo{' '}
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>
              <a
                href="https://www.petitphilippe.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 text-white/85 font-semibold rounded-full border border-white/20 hover:bg-white/[0.06] transition-colors"
              >
                See it live <ArrowUpRight size={16} className="opacity-70" />
              </a>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-9 flex flex-wrap gap-x-6 gap-y-2"
            >
              {['Live in about a day', 'Works with your POS', 'No new hardware'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-[13px] text-white/55 font-medium">
                  <Check size={14} className="text-wine-400" /> {item}
                </li>
              ))}
            </motion.ul>
            </div>
          </div>

          {/* ——— Product ——— */}
          <div className="relative flex justify-center lg:justify-end lg:pr-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease }}
              className="relative"
            >
              <ChatDemo />

              {/* Lead email card */}
              <FloatCard className="hidden xl:block -left-[236px] top-3 w-[220px]" delay={0.9} bob={8} duration={6}>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Lead sent to your inbox
                  </div>
                  <div className="mt-2.5 text-[13px] font-bold text-ink-900">Sarah K.</div>
                  <div className="text-[12px] text-ink-500 leading-snug mt-0.5">
                    Wants 6 ros&eacute;s for Saturday &middot; budget $150
                  </div>
                  <div className="mt-2 inline-flex text-[10.5px] font-bold text-wine-800 bg-wine-50 border border-wine-100 rounded-full px-2.5 py-1">
                    In-store pickup
                  </div>
                </div>
              </FloatCard>

              {/* Funnel card */}
              <FloatCard className="hidden xl:block -left-[260px] bottom-14 w-[240px]" delay={1.15} bob={11} duration={7}>
                <div className="p-4">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-[11px] font-semibold text-ink-500 uppercase tracking-wide">This week</span>
                    <span className="text-[11px] font-bold text-emerald-600">&uarr; 18%</span>
                  </div>
                  <div className="space-y-2">
                    <FunnelRow label="Shown" value="214" pct={100} delay={1.4} />
                    <FunnelRow label="Clicked" value="89" pct={42} delay={1.55} />
                    <FunnelRow label="Purchased" value="31" pct={15} delay={1.7} />
                  </div>
                </div>
              </FloatCard>

              {/* Inventory sync card */}
              <FloatCard className="hidden lg:block -right-8 -top-[74px] w-[212px]" delay={1.35} bob={9} duration={6.5}>
                <div className="p-4 flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-wine-50 border border-wine-100 flex items-center justify-center">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#8b1a3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
                    </svg>
                  </span>
                  <div>
                    <div className="text-[12.5px] font-bold text-ink-900">1,412 bottles synced</div>
                    <div className="text-[11px] text-ink-500">from your POS &middot; 6:04 AM</div>
                  </div>
                </div>
              </FloatCard>
            </motion.div>
          </div>
        </div>

        {/* ——— Stats row ——— */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mt-24 lg:mt-28 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-white/10 pt-10"
        >
          {[
            ['24/7', 'On the floor — nights, Sundays, holiday rushes'],
            ['100%', 'Grounded in live inventory. It never invents a bottle.'],
            ['~1 day', 'From catalog sync to first conversation'],
          ].map(([stat, label]) => (
            <div key={stat} className="flex items-center sm:items-baseline sm:block gap-5">
              {/* fixed number column on mobile so all three labels align */}
              <div
                className="font-display font-medium text-cream-50 w-[108px] shrink-0 sm:w-auto"
                style={{ fontSize: 'clamp(30px, 3vw, 42px)' }}
              >
                {stat}
              </div>
              <div className="text-[13px] text-white/50 leading-snug sm:mt-1.5 max-w-[240px]">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
