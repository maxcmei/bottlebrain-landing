import { motion } from 'framer-motion'

/*
 * Faithful recreation of the production BottleBrain widget UI
 * (colors and geometry mirror widget.js: burgundy header, #f4f4f5 bot
 * bubbles, burgundy user bubble, #fdf6f8 wine cards, pill chips).
 */

const BRAND = '#8b1a3a'

// The BottleBrain solo mark: the wordmark glass with the "thrown swirl" cut
// (assets/glass-swirl.png as a color mask) — the same mark as the favicons
// and the live widget. The width matches the glass's real 244:502 aspect so
// there's no phantom horizontal padding throwing off spacing. Brand
// consistency is deliberate; don't reintroduce a hand-drawn variant.
function GlassIcon({ size = 22, color = '#fff' }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        height: size,
        width: Math.round(size * (244 / 502)),
        backgroundColor: color,
        WebkitMaskImage: 'url(/assets/glass-swirl.png)',
        maskImage: 'url(/assets/glass-swirl.png)',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
    />
  )
}

const spring = { type: 'spring', stiffness: 220, damping: 26 }

function Msg({ children, delay = 0, from = 'bot', className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ ...spring, delay }}
      className={`max-w-[85%] ${from === 'user' ? 'self-end' : 'self-start'} ${className}`}
    >
      {children}
    </motion.div>
  )
}

function WineCard({ name, price, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ ...spring, delay }}
      className="flex items-center justify-between gap-2 mt-2 px-3.5 py-2.5 rounded-xl border cursor-default transition-colors duration-200 hover:bg-[#f9eaee]"
      style={{ background: '#fdf6f8', borderColor: '#f0d0d8' }}
    >
      <div className="min-w-0">
        <div className="text-[13px] font-semibold text-ink-900 truncate">{name}</div>
        <div className="text-xs font-bold mt-0.5" style={{ color: BRAND }}>{price}</div>
      </div>
      <span className="text-xs font-semibold shrink-0" style={{ color: BRAND }}>
        View &rarr;
      </span>
    </motion.div>
  )
}

export default function ChatDemo() {
  return (
    <div
      className="w-full max-w-[380px] bg-white rounded-[20px] shadow-chat overflow-hidden flex flex-col"
      role="img"
      aria-label="Example BottleBrain chat: a customer asks for a wine pairing and receives recommendations from the shop's live inventory"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5" style={{ background: BRAND }}>
        <div className="flex items-center gap-2.5">
          <GlassIcon />
          <div>
            <div className="text-white text-sm font-bold leading-tight">Philippe</div>
            <div className="text-white/70 text-[11px] leading-tight">Wine Guide &middot; Petit Philippe</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-white/85 bg-white/10 rounded-full px-2 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Online
          </span>
          <span className="text-white/80 text-xl leading-none pl-1">&times;</span>
        </div>
      </div>

      {/* Conversation */}
      <div className="flex flex-col gap-2.5 p-4 bg-white">
        <Msg delay={0.1}>
          <div className="px-4 py-2.5 text-[13.5px] leading-relaxed text-ink-900 rounded-[18px] rounded-bl-[4px]" style={{ background: '#f4f4f5' }}>
            Welcome in! What are you looking for today &mdash; a bottle for tonight, a gift, something to cellar?
          </div>
        </Msg>

        <Msg delay={0.35} from="user">
          <div className="px-4 py-2.5 text-[13.5px] leading-relaxed text-white rounded-[18px] rounded-br-[4px]" style={{ background: BRAND }}>
            Grilled ribeye with friends tonight &mdash; around $60?
          </div>
        </Msg>

        <Msg delay={0.65}>
          <div className="px-4 py-2.5 text-[13.5px] leading-relaxed text-ink-900 rounded-[18px] rounded-bl-[4px]" style={{ background: '#f4f4f5' }}>
            Perfect excuse for a structured red. Off our shelves right now, I&rsquo;d pull these two:
          </div>
        </Msg>

        <Msg delay={0.9} className="w-full max-w-[95%]">
          <WineCard name="Ridge Lytton Springs Zinfandel 2021" price="$52" delay={0.95} />
          <WineCard name="Ch&acirc;teauneuf-du-Pape &lsquo;T&eacute;l&eacute;gramme&rsquo; 2020" price="$58" delay={1.1} />
        </Msg>

        {/* Reply chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ ...spring, delay: 1.3 }}
          className="flex flex-wrap gap-1.5 mt-1"
        >
          {['Tell me more', 'Something bolder', 'Can you hold one?'].map((chip) => (
            <span
              key={chip}
              className="text-xs font-medium rounded-full px-3 py-1.5 border bg-white cursor-default"
              style={{ color: BRAND, borderColor: '#e7c3cd' }}
            >
              {chip}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Input bar */}
      <div className="px-4 pb-4 bg-white">
        <div className="flex items-center gap-2 rounded-full border border-ink-900/10 px-4 py-2.5">
          <span className="text-[13px] text-ink-400 flex-1">Ask Philippe anything&hellip;</span>
          <span className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: BRAND }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}
