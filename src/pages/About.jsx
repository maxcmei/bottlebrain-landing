import { Linkedin } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Reveal } from '../components/ui'
import { CellarRack, BubbleField, makeLanes } from '../components/cellar'

/* Sparse fizz — the letter is the whole show, the cellar just holds it */
const CELLAR_LANES = makeLanes(12, 131, { maxSize: 8, peak: [0.6, 0.85], gold: 0.3 })

/* The page is one letter, written the way Max & Marco would actually
   write it. Copy approved by Max before ship — don't "polish" it into
   marketing language, and don't add structure (heroes, stats, chapter
   numbers). The plainness is the point. */
const paragraphs = [
  `BottleBrain didn't start as a startup. It started as a favor.`,

  `Max's dad, Mark, runs a fine-wine shop in Charlotte called Petit
  Philippe. If you've ever been in a good wine shop, you've probably met
  someone like Mark. You mention dinner plans, he asks a couple
  questions, and somehow you leave with exactly the right bottle. People
  drive across town for that.`,

  `His website couldn't do any of it. Same bottles, technically. But
  online, the shop that could talk you into the perfect $40 Barolo was
  reduced to a grid of labels and a search bar. None of what made the
  shop special translated online.`,

  `Between classes at UNC, we built Philippe: an AI sommelier that
  reads the shop's live inventory and talks to customers the way Mark
  does. It asks what you're cooking. It sticks to your budget. If a
  bottle just sold out, it says so and offers to have Mark order one for
  you.`,

  `The first versions were bad in ways only a wine merchant could
  explain, and Mark explained them, loudly. That's how it got better.
  Every week Mark found something new that was wrong, and every week we
  fixed it. Today Philippe helps customers every day, and Petit Philippe
  keeps selling wine long after the lights go off.`,

  `We think every independent wine shop deserves this. Not a chatbot
  with a wine sticker on it — a sommelier that's fluent in your shelves
  and your voice. Independent shops already have the expertise. We just
  think their websites should too.`,
]

const founders = [
  { name: 'Max Meissner', linkedin: 'https://www.linkedin.com/in/maxmeissner/' },
  { name: 'Marco Volpe', linkedin: 'https://www.linkedin.com/in/marconvolpe/' },
]

export default function About() {
  return (
    <div className="relative min-h-screen bg-wine-950">
      <Navbar />

      {/* One dark room, one letter on the table. data-nav-dark keeps the
          navbar in its dark treatment for the whole page. */}
      <section
        data-nav-dark
        className="relative overflow-hidden bg-wine-950 hero-atmosphere grain pt-36 lg:pt-44 pb-28 lg:pb-36 px-5"
      >
        <CellarRack base="radial-gradient(ellipse 75% 70% at 50% 30%, black 0%, transparent 76%)" />
        <BubbleField dark lanes={CELLAR_LANES} />

        <Reveal className="relative z-10 mx-auto max-w-[720px]">
          {/* plain cream on purpose — parchment's lattice/washes read as
              texture ON the paper; the cellar grid stays behind the sheet */}
          <div className="bg-cream-50 rounded-3xl shadow-chat px-7 py-12 sm:px-14 sm:py-16">
            <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-wine-800">
              A note from the founders
            </div>

            <p className="mt-8 font-display font-medium text-ink-900 text-[26px] leading-snug">
              Hi &mdash; we&rsquo;re Max and Marco.
            </p>

            <div className="mt-6 space-y-6">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-ink-700 text-[16.5px] leading-[1.8]">
                  {p}
                </p>
              ))}
              <p className="text-ink-700 text-[16.5px] leading-[1.8]">
                If you run a shop and want to see it on your own bottles, email
                us at{' '}
                <a
                  href="mailto:team@bottlebrain.io"
                  className="font-semibold text-wine-800 hover:text-wine-900 underline decoration-wine-800/30 underline-offset-2 transition-colors"
                >
                  team@bottlebrain.io
                </a>
                . It&rsquo;ll be one of us who answers. Usually within a day.
              </p>
              <p className="text-ink-700 text-[16.5px] leading-[1.8]">Thanks for reading,</p>
            </div>

            <p className="mt-6 font-display italic text-wine-800 text-[30px] leading-none">
              Max &amp; Marco
            </p>

            <div className="mt-8 pt-7 border-t border-ink-900/[0.08] flex flex-wrap items-center gap-x-8 gap-y-3">
              {founders.map((f) => (
                <a
                  key={f.name}
                  href={f.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-ink-500 hover:text-wine-800 transition-colors"
                >
                  <Linkedin size={15} />
                  {f.name}
                </a>
              ))}
            </div>

            <p className="mt-8 text-ink-500 text-[14px] leading-relaxed italic">
              P.S. Philippe is on the floor at{' '}
              <a
                href="https://www.petitphilippe.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold not-italic text-wine-800 hover:text-wine-900 underline decoration-wine-800/30 underline-offset-2 transition-colors"
              >
                petitphilippe.com
              </a>{' '}
              right now &mdash; go say hi and ask him something hard.
            </p>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  )
}
