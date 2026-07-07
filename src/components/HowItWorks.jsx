import { Reveal, SectionHeading } from './ui'

/* Mini visual: POS sync */
function SyncVisual() {
  return (
    <div className="h-full flex flex-col justify-center gap-2 px-6">
      {[
        ['Ridge Lytton Springs 2021', 'In stock · 14'],
        ['Sancerre “Les Baronnes” 2023', 'In stock · 6'],
        ['Barolo Ravera 2019', 'Restocked ✓'],
      ].map(([name, status], i) => (
        <div
          key={name}
          className="flex items-center justify-between bg-white rounded-xl border border-ink-900/[0.06] px-3.5 py-2.5 shadow-sm"
          style={{ transform: `translateX(${i * 6 - 6}px)` }}
        >
          <span className="text-[12px] font-semibold text-ink-900 truncate pr-3">{name}</span>
          <span className={`text-[10.5px] font-bold whitespace-nowrap ${i === 2 ? 'text-emerald-600' : 'text-ink-400'}`}>
            {status}
          </span>
        </div>
      ))}
      <div className="flex items-center gap-1.5 mt-1 pl-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        <span className="text-[10.5px] font-semibold text-ink-400">Synced nightly from your POS</span>
      </div>
    </div>
  )
}

/* Mini visual: enrichment tags */
function LearnVisual() {
  return (
    <div className="h-full flex flex-col justify-center px-6">
      <div className="bg-white rounded-2xl border border-ink-900/[0.06] shadow-sm p-4">
        <div className="text-[12.5px] font-bold text-ink-900">Ch&acirc;teauneuf-du-Pape &lsquo;T&eacute;l&eacute;gramme&rsquo;</div>
        <div className="text-[11px] text-ink-400 mt-0.5">Rh&ocirc;ne, France &middot; $58</div>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {['Grenache blend', 'Bold & structured', 'Ribeye, lamb, game', 'Drink 2025–2035'].map((tag) => (
            <span key={tag} className="text-[10.5px] font-semibold text-wine-800 bg-wine-50 border border-wine-100 rounded-full px-2.5 py-1">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="text-[10.5px] font-semibold text-ink-400 mt-2.5 pl-1">
        Every bottle gets a voice — style, story, table
      </div>
    </div>
  )
}

/* Mini visual: guided conversation → lead */
function GuideVisual() {
  return (
    <div className="h-full flex flex-col justify-center gap-2 px-6">
      <div className="self-start max-w-[85%] bg-white rounded-2xl rounded-bl-md border border-ink-900/[0.06] shadow-sm px-3.5 py-2.5">
        <span className="text-[12px] text-ink-700">Anniversary dinner &mdash; she loves Burgundy.</span>
      </div>
      <div className="self-end max-w-[85%] bg-wine-800 rounded-2xl rounded-br-md px-3.5 py-2.5 shadow-sm">
        <span className="text-[12px] text-white">A Premier Cru she&rsquo;ll remember &mdash; may I set it aside for you?</span>
      </div>
      <div className="flex items-center gap-2 mt-1 bg-emerald-50 border border-emerald-100 rounded-xl px-3.5 py-2.5">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="m22 6-10 7L2 6" />
        </svg>
        <span className="text-[11px] font-bold text-emerald-700">Hold request &rarr; your inbox, with the full story</span>
      </div>
    </div>
  )
}

const steps = [
  {
    n: '01',
    title: 'Connect your shop',
    body: 'Point BottleBrain at your POS. Your full cellar syncs automatically every morning — stock, prices, new arrivals — no spreadsheets, no upkeep.',
    Visual: SyncVisual,
  },
  {
    n: '02',
    title: 'It learns every bottle',
    body: 'Each wine is enriched with style, region, tasting notes, and food pairings — so the recommendation sounds like you, not a search engine.',
    Visual: LearnVisual,
  },
  {
    n: '03',
    title: 'Customers get guided',
    body: 'Visitors get a real conversation that ends in the right bottle. Serious buyers — holds, special orders, big nights — land in your inbox with context.',
    Visual: GuideVisual,
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="-mt-11 pt-40 lg:pt-44 pb-28 lg:pb-32 px-5 bg-cream-50 parchment">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeading
          badge="How it works"
          title={<>Uncorked in three steps.</>}
          sub="No engineers on staff required. If you can export your catalog, you can put a sommelier on your website this week."
        />

        <div className="grid md:grid-cols-3 gap-5 mt-16">
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.12} className="group">
              <div className="bg-cream-100 rounded-4xl border border-ink-900/[0.05] overflow-hidden h-full flex flex-col transition-[box-shadow,transform] duration-300 hover:shadow-card-hover hover:-translate-y-1">
                <div className="h-[230px] dot-texture pt-6 pb-2">
                  <step.Visual />
                </div>
                <div className="p-7 pt-5 bg-white flex-1 rounded-t-3xl border-t border-ink-900/[0.04]">
                  <div className="text-[12px] font-bold text-wine-500 tracking-[0.15em]">{step.n}</div>
                  <h3 className="font-display font-medium text-[24px] text-ink-900 mt-2">{step.title}</h3>
                  <p className="text-[15px] text-ink-500 leading-relaxed mt-2.5">{step.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
