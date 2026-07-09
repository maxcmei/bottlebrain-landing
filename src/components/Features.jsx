import { Reveal, SectionHeading } from './ui'
import { BubbleField, FEATURES_LANES } from './cellar'

function Card({ children, className = '', delay = 0 }) {
  return (
    <Reveal delay={delay} className={className}>
      <div className="bg-white rounded-4xl border border-ink-900/[0.06] shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-[box-shadow,transform] duration-300 h-full overflow-hidden flex flex-col">
        {children}
      </div>
    </Reveal>
  )
}

function CardText({ title, body }) {
  return (
    <div className="p-7 pt-0">
      <h3 className="font-display font-medium text-[22px] text-ink-900">{title}</h3>
      <p className="text-[14.5px] text-ink-500 leading-relaxed mt-2">{body}</p>
    </div>
  )
}

/* ——— Budget intelligence visual ——— */
function BudgetVisual() {
  return (
    <div className="px-7 pt-7 pb-6">
      <div className="bg-cream-100 rounded-2xl p-5">
        <div className="flex items-center justify-between text-[12px] font-semibold text-ink-500 mb-1">
          <span>&ldquo;Around $60&rdquo;</span>
          <span className="text-wine-800 font-bold">targets $42&ndash;$66</span>
        </div>
        {/* Static band (no whileInView — it silently failed to render on some
            loads). $0–$80 scale: $42 = 52.5%, $60 = 75%, $66 = 82.5%. The tail
            past the $60 tick fades — the stretch zone above the stated budget. */}
        <div className="relative h-2.5 rounded-full bg-ink-900/[0.07] mt-3">
          <div
            className="absolute left-[52.5%] right-[17.5%] top-0 bottom-0 rounded-full"
            style={{ background: 'linear-gradient(90deg, #bc2f52 0%, #8b1a3a 70%, rgba(139,26,58,0.35) 100%)' }}
          />
          <div className="absolute -top-1 left-[75%] w-[2px] h-[18px] bg-ink-900/30 rounded" />
        </div>
        <div className="flex justify-between text-[10.5px] text-ink-400 font-medium mt-2">
          <span>$0</span><span>$40</span><span className="text-ink-900 font-bold">$60</span><span>$80</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-4">
          <span className="text-[10.5px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-1">$52 ✓</span>
          <span className="text-[10.5px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-1">$58 ✓</span>
          <span className="text-[10.5px] font-bold text-wine-800 bg-wine-50 border border-wine-100 rounded-full px-2.5 py-1">$64 · worth the stretch</span>
          <span className="text-[10.5px] font-semibold text-ink-400 bg-ink-900/[0.04] rounded-full px-2.5 py-1 line-through">$25</span>
        </div>
      </div>
    </div>
  )
}

/* ——— Page consciousness visual ——— */
function PageVisual() {
  return (
    <div className="px-7 pt-7 pb-6">
      <div className="bg-cream-100 rounded-2xl p-4">
        <div className="flex items-center gap-1.5 bg-white rounded-lg px-3 py-1.5 border border-ink-900/[0.06]">
          <span className="w-2 h-2 rounded-full bg-ink-900/10" />
          <span className="w-2 h-2 rounded-full bg-ink-900/10" />
          <span className="text-[10px] text-ink-400 font-medium truncate ml-1.5">petitphilippe.com/barolo-ravera-2019</span>
        </div>
        <div className="mt-3 self-start bg-white rounded-xl rounded-bl-md border border-ink-900/[0.06] px-3 py-2 w-fit">
          <span className="text-[11.5px] text-ink-700">&ldquo;Is this good with osso buco?&rdquo;</span>
        </div>
        <div className="mt-2 bg-wine-800 rounded-xl rounded-br-md px-3 py-2 w-fit ml-auto">
          <span className="text-[11.5px] text-white">This Barolo? Textbook. Nebbiolo was born for it.</span>
        </div>
      </div>
    </div>
  )
}

/* ——— Lead capture visual (email) ——— */
function LeadVisual() {
  return (
    <div className="px-7 pt-7 pb-6">
      <div className="bg-cream-100 rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-wine-800">New lead &middot; BottleBrain</span>
          <span className="text-[10.5px] text-ink-400">just now</span>
        </div>
        <div className="mt-3.5 grid grid-cols-[86px_1fr] gap-y-2 text-[12.5px]">
          <span className="text-ink-400 font-medium">Name</span>
          <span className="text-ink-900 font-semibold">James R.</span>
          <span className="text-ink-400 font-medium">Contact</span>
          <span className="text-ink-900 font-semibold">(704) 555-0132</span>
          <span className="text-ink-400 font-medium">Looking for</span>
          <span className="text-ink-900 font-semibold">Big Barolo or Brunello for a client dinner Thursday</span>
          <span className="text-ink-400 font-medium">Fulfillment</span>
          <span className="text-wine-800 font-bold">Hold request &mdash; coming in this weekend</span>
        </div>
        <div className="mt-4 inline-flex items-center gap-1.5 text-[11.5px] font-bold text-white bg-wine-800 rounded-full px-4 py-2">
          View the full conversation &rarr;
        </div>
      </div>
    </div>
  )
}

/* ——— Small-card visuals ——— */
function OosVisual() {
  return (
    <div className="px-7 pt-7 pb-2">
      <div className="bg-cream-100 rounded-2xl px-4 py-3.5 flex items-center justify-between gap-3">
        <div>
          <div className="text-[12px] font-bold text-ink-900">Ch. Rayas Ch&acirc;teauneuf 2012</div>
          <div className="text-[10.5px] font-bold text-amber-600 mt-0.5">Out of stock</div>
        </div>
        <span className="text-[10.5px] font-bold text-wine-800 bg-wine-50 border border-wine-100 rounded-full px-2.5 py-1 whitespace-nowrap">
          Special order &rarr;
        </span>
      </div>
    </div>
  )
}

function FaqVisual() {
  return (
    <div className="px-7 pt-7 pb-2">
      <div className="flex flex-wrap gap-1.5">
        {['Do you ship to Virginia? ✓', 'Open Sunday? 1–7 ✓', 'Wine club tiers ✓'].map((chip) => (
          <span key={chip} className="text-[11px] font-semibold text-ink-700 bg-cream-100 border border-ink-900/[0.05] rounded-full px-3 py-1.5">
            {chip}
          </span>
        ))}
      </div>
    </div>
  )
}

function CaseVisual() {
  return (
    <div className="px-7 pt-7 pb-2">
      <div className="bg-cream-100 rounded-2xl px-4 py-3.5 flex items-center justify-between">
        <span className="text-[12px] font-semibold text-ink-700">&ldquo;Half case of whites, $600&rdquo;</span>
        <span className="text-[12px] font-bold text-wine-800 whitespace-nowrap">&rarr; &asymp;$100/bottle</span>
      </div>
    </div>
  )
}

function VoiceVisual() {
  return (
    <div className="px-7 pt-7 pb-2">
      <div className="bg-cream-100 rounded-2xl px-4 py-3.5">
        <span className="text-[12px] text-ink-700 italic font-display">
          &ldquo;One question at a time, never a hard sell — and it always knows when to hand you the customer.&rdquo;
        </span>
      </div>
    </div>
  )
}

export default function Features() {
  return (
    <section id="features" className="relative overflow-hidden pt-28 lg:pt-32 pb-40 lg:pb-44 px-5 bg-cream-100 parchment-alt">
      {/* behind the tiles: the cards occlude the field, so it peeks through the gutters */}
      <BubbleField lanes={FEATURES_LANES} />
      <div className="relative mx-auto max-w-[1180px]">
        <SectionHeading
          badge="What it does"
          title={<>Everything a great floor somm does.<br className="hidden md:block" /> On every page, all at once.</>}
          sub="Not a chatbot bolted onto your site — a salesperson trained on your cellar, your policies, and the way wine actually gets hand-sold."
          fadeRgb="248, 243, 236"
        />

        <div className="grid md:grid-cols-3 gap-5 mt-16">
          <Card className="md:col-span-2">
            <BudgetVisual />
            <CardText
              title="Respects the budget — upward"
              body="Say “around $60” and it pulls from $42–66 — never the bargain bin, and a touch over when the bottle earns it. Customers spend with confidence instead of trading down."
            />
          </Card>

          <Card delay={0.1}>
            <PageVisual />
            <CardText
              title="Knows the page they're on"
              body="On a product page, “is this good with steak?” means that bottle. No re-explaining, no “what are you looking for?”"
            />
          </Card>

          <Card>
            <FaqVisual />
            <CardText
              title="Shop questions, answered straight"
              body="Hours, shipping states, returns, wine club, tastings — answered from your real policies, with a link to the page."
            />
          </Card>

          <Card className="md:col-span-2" delay={0.1}>
            <LeadVisual />
            <CardText
              title="Serious buyers land in your inbox"
              body="Holds, special orders, shipping inquiries, trophy-bottle hunters — name, contact, what they want, and how they want it handled. You just close."
            />
          </Card>

          <Card>
            <OosVisual />
            <CardText
              title="Sold out isn't a dead end"
              body="Out-of-stock favorites become special-order leads instead of lost sales — always disclosed, never passed off as on the shelf."
            />
          </Card>

          <Card delay={0.08}>
            <CaseVisual />
            <CardText
              title="Case math, handled"
              body="A half case for $600 means about $100 a bottle — it does the arithmetic and shops the right shelf, not the impossible one."
            />
          </Card>

          <Card delay={0.16}>
            <VoiceVisual />
            <CardText
              title="Your voice, not a script"
              body="Tone, pace, and pushiness are tuned to your shop. It sells the way you'd sell — warm, brief, and one question at a time."
            />
          </Card>
        </div>
      </div>
    </section>
  )
}
