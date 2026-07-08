import { Reveal } from './ui'

export default function Testimonial() {
  return (
    <section className="pt-40 lg:pt-44 pb-28 lg:pb-32 px-5 bg-cream-50 parchment">
      <div className="mx-auto max-w-[880px] text-center">
        <Reveal>
          <div className="font-display text-wine-800" style={{ fontSize: 64, lineHeight: 0.5 }} aria-hidden="true">
            &ldquo;
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <blockquote
            className="font-display font-medium text-ink-900 text-balance mt-6"
            style={{ fontSize: 'clamp(26px, 3.4vw, 42px)', lineHeight: 1.22, letterSpacing: '-0.01em' }}
          >
            Customers walk in asking for the exact bottle it recommended the
            night before. It&rsquo;s like the shop{' '}
            <span className="italic text-wine-800">stays open after we lock the door.&rdquo;</span>
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
      </div>
    </section>
  )
}
