import { Reveal, PatternFade } from './ui'

export default function Testimonial() {
  return (
    <section className="pt-40 lg:pt-44 pb-28 lg:pb-32 px-5 bg-cream-50 parchment">
      {/* Corner quote marks (PowerPoint-classic layout): a large opening mark
          hangs top-left of the quote, a slightly smaller closing mark sits
          bottom-right beside the attribution. The marks ARE the punctuation —
          the quote text carries none. */}
      <div className="relative mx-auto max-w-[880px] text-center px-8 sm:px-12">
        <PatternFade rgb="253, 251, 248" strength={0.9} />
        <Reveal>
          <div
            aria-hidden="true"
            className="absolute -top-9 sm:-top-12 left-0 font-display font-semibold text-wine-800 select-none"
            style={{ fontSize: 'clamp(64px, 9vw, 104px)', lineHeight: 1, transform: 'translateY(-0.18em)' }}
          >
            &ldquo;
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <blockquote
            className="font-display font-medium text-ink-900 text-balance"
            style={{ fontSize: 'clamp(26px, 3.4vw, 42px)', lineHeight: 1.22, letterSpacing: '-0.01em' }}
          >
            Customers walk in asking for the exact bottle it recommended the
            night before. It&rsquo;s like the shop{' '}
            <span className="italic text-wine-800">stays open after we lock the door.</span>
          </blockquote>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-9 flex items-center justify-center gap-4">
            <span className="w-12 h-12 rounded-full bg-wine-800 text-cream-50 font-display font-medium text-lg flex items-center justify-center">
              M
            </span>
            <div className="text-left">
              <div className="font-bold text-ink-900 text-[15px]">Mark</div>
              <div className="text-ink-500 text-[13px]">Owner &middot; Petit Philippe, Charlotte NC</div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.25}>
          <div
            aria-hidden="true"
            className="absolute bottom-0 right-0 font-display font-semibold text-wine-800 select-none"
            style={{ fontSize: 'clamp(48px, 6.5vw, 76px)', lineHeight: 1, transform: 'translateY(0.28em)' }}
          >
            &rdquo;
          </div>
        </Reveal>
      </div>
    </section>
  )
}
