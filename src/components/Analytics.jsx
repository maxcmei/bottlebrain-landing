import { motion } from 'framer-motion'
import { Reveal, SectionBadge } from './ui'
import { CellarRack, BubbleField, DARK_LANES } from './cellar'

const ease = [0.21, 0.6, 0.35, 1]

function Kpi({ label, value, note }) {
  return (
    <div className="bg-white rounded-2xl border border-ink-900/[0.06] p-4">
      <div className="text-[11px] font-semibold text-ink-400 uppercase tracking-wide">{label}</div>
      <div className="text-[22px] font-extrabold text-ink-900 mt-1 leading-none">{value}</div>
      {note && <div className="text-[11px] font-bold text-emerald-600 mt-1.5">{note}</div>}
    </div>
  )
}

function Funnel() {
  const rows = [
    ['Bottles shown', 1208, 100],
    ['Cards clicked', 486, 40],
    ['Purchased', 173, 14],
  ]
  return (
    <div className="bg-white rounded-2xl border border-ink-900/[0.06] p-5">
      <div className="text-[12px] font-bold text-ink-900 mb-4">Recommendation funnel</div>
      <div className="space-y-3.5">
        {rows.map(([label, value, pct], i) => (
          <div key={label}>
            <div className="flex justify-between text-[11.5px] mb-1.5">
              <span className="font-semibold text-ink-500">{label}</span>
              <span className="font-bold text-ink-900">{value.toLocaleString()}</span>
            </div>
            <div className="h-2 rounded-full bg-cream-200/70 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 + i * 0.15, ease }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, #c63a5d, #8b1a3a)` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Gaps() {
  const gaps = [
    ['Sancerre under $30', '14 asks'],
    ['Grower Champagne', '9 asks'],
    ['Orange wine', '7 asks'],
  ]
  return (
    <div className="bg-white rounded-2xl border border-ink-900/[0.06] p-5">
      <div className="flex items-center justify-between mb-3.5">
        <span className="text-[12px] font-bold text-ink-900">Catalog gaps</span>
        <span className="text-[10.5px] font-bold text-wine-800 bg-wine-50 border border-wine-100 rounded-full px-2.5 py-0.5">
          Buying signal
        </span>
      </div>
      <div className="space-y-2.5">
        {gaps.map(([wine, asks]) => (
          <div key={wine} className="flex items-center justify-between">
            <span className="text-[12.5px] font-semibold text-ink-700">{wine}</span>
            <span className="text-[11px] font-bold text-ink-400">{asks}</span>
          </div>
        ))}
      </div>
      <div className="text-[11px] text-ink-400 mt-3.5 pt-3 border-t border-ink-900/[0.05]">
        What customers wanted that you don&rsquo;t stock &mdash; straight from real conversations.
      </div>
    </div>
  )
}

const bullets = [
  {
    title: 'Every recommendation, tracked to the register',
    body: 'Shown, clicked, purchased — each bottle Philippe suggests is followed through your online orders, so you know the chat is paying rent.',
  },
  {
    title: 'Hear what your shelves can’t answer',
    body: 'When fourteen people ask for a Sancerre under $30 you don’t carry, that’s not a missed chat — it’s next week’s purchase order.',
  },
  {
    title: 'Read any conversation, verbatim',
    body: 'Every session is a transcript. See exactly how customers talk about wine when nobody’s hovering — and what language closes.',
  },
]

export default function Analytics() {
  return (
    <section id="analytics" data-nav-dark className="relative overflow-hidden dark-atmosphere grain py-28 lg:py-32 px-5 rounded-[44px] -my-11">
      <div aria-hidden="true" className="light-streak absolute inset-0 pointer-events-none" />
      <CellarRack base="radial-gradient(ellipse 65% 80% at 22% 42%, black 0%, transparent 78%)" />
      <BubbleField dark lanes={DARK_LANES} />
      <div className="mx-auto max-w-[1180px] relative z-10">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 lg:gap-16 items-center">
          <div>
            <Reveal>
              <SectionBadge dark>The dashboard</SectionBadge>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                className="font-display font-medium text-cream-50 mt-5 text-balance"
                style={{ fontSize: 'clamp(34px, 4.2vw, 54px)', lineHeight: 1.08, letterSpacing: '-0.015em' }}
              >
                Your website finally <span className="italic text-wine-300">talks back.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 text-lg text-cream-50/65 leading-relaxed max-w-md">
                Every conversation becomes retail intelligence: what sold, what
                stalled, and what people begged for that you didn&rsquo;t have.
              </p>
            </Reveal>

            <div className="mt-9 space-y-6">
              {bullets.map((item, i) => (
                <Reveal key={item.title} delay={0.2 + i * 0.1}>
                  <div className="flex gap-4">
                    <span className="mt-1 w-6 h-6 rounded-full bg-wine-800/60 border border-wine-400/30 flex items-center justify-center shrink-0">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#e88ba0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                    <div>
                      <div className="text-cream-50 font-bold text-[15.5px]">{item.title}</div>
                      <div className="text-cream-50/55 text-[14px] leading-relaxed mt-1">{item.body}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Dashboard mockup */}
          <Reveal delay={0.15} y={40}>
            <div className="bg-cream-100 rounded-4xl p-5 sm:p-6 shadow-chat border border-white/[0.06]">
              <div className="flex items-center justify-between mb-5 px-1">
                <div>
                  <div className="text-[15px] font-extrabold text-ink-900">Petit Philippe</div>
                  <div className="text-[11.5px] text-ink-400 font-medium">BottleBrain Analytics &middot; This month</div>
                </div>
                <span className="text-[10.5px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1.5">
                  &#9679; Live
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Kpi label="Conversations" value="312" note="↑ 22%" />
                <Kpi label="Leads captured" value="47" note="↑ 31%" />
                <Kpi label="Attributed rev." value="$4.8k" note="↑ 18%" />
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mt-3">
                <Funnel />
                <Gaps />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
