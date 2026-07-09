import Wordmark from './Wordmark'
import { CellarRack, BubbleField, DARK_LANES } from './cellar'

const links = [
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Analytics', href: '#analytics' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Get a Demo', href: '#demo' },
]

export default function Footer() {
  return (
    <footer data-nav-dark className="relative overflow-hidden bg-wine-950 grain rounded-t-[44px] -mt-11">
      <CellarRack base="radial-gradient(ellipse 70% 65% at 50% 100%, black 0%, transparent 78%)" />
      <BubbleField dark lanes={DARK_LANES} />
      <div className="mx-auto max-w-[1180px] px-5 pt-16 pb-10 relative z-10">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
          <div>
            <span className="text-cream-50">
              <Wordmark className="text-2xl" />
            </span>
            <p className="mt-4 text-white/50 text-sm max-w-xs leading-relaxed">
              The AI sommelier for independent wine shops. Your cellar, fluent
              in customer.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-10 sm:gap-16">
            <div>
              <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-white/50 mb-4">
                Explore
              </div>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-white/50 mb-4">
                Contact
              </div>
              <a
                href="mailto:team@bottlebrain.io"
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                team@bottlebrain.io
              </a>
              <p className="mt-2.5 text-sm text-white/50">Charlotte, NC</p>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-xs">
            &copy; {new Date().getFullYear()} BottleBrain. All rights reserved.
          </p>
          <p className="text-white/50 text-xs">
            Pairs well with independent wine shops.
          </p>
        </div>
      </div>

      {/* Giant watermark */}
      <div
        aria-hidden="true"
        className="relative z-0 select-none pointer-events-none overflow-hidden"
        style={{ height: 'clamp(90px, 14vw, 190px)' }}
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 font-extrabold tracking-tight whitespace-nowrap"
          style={{
            fontSize: 'clamp(120px, 17vw, 250px)',
            lineHeight: 0.78,
            bottom: '-0.16em',
            background: 'linear-gradient(180deg, rgba(198,58,93,0.22) 0%, rgba(198,58,93,0.04) 90%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          BottleBrain
        </div>
      </div>
    </footer>
  )
}
