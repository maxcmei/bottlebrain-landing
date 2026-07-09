/*
 * The cellar system — ambient life for the whole page.
 *
 * CellarRack: the wine-rack diamond lattice for dark sections,
 * revealed by a static light mask. Purely decorative, zero JS work.
 *
 * BubbleField: slow-rising wine bubbles. Rendered as plain spans
 * animated by the shared `bb-rise` CSS keyframes (see index.css) with
 * per-bubble variation passed through custom properties — the whole
 * field runs on the GPU compositor thread, so scrolling never pays
 * for it. Page mode anchors bubbles to the document; section mode
 * rises from the section's own floor.
 */

export function CellarRack({ base }) {
  return (
    <div
      aria-hidden="true"
      className="cellar-rack absolute inset-0 pointer-events-none"
      style={{ WebkitMaskImage: base, maskImage: base }}
    />
  )
}

/* ——— Champagne lane generation ———
   Real champagne fizz: LOTS of small bubbles with the occasional larger
   one (sizes are weighted small, r² distribution), larger bubbles rising
   faster than tiny ones, loose trains rather than a uniform grid.
   Delays are NEGATIVE so every lane is already mid-rise at page load —
   the glass is never flat. Deterministic PRNG keeps lanes stable across
   renders (no hydration/looks-different-every-reload weirdness).

   Density is tuned PER SECTION, inversely to how busy the section is:
   sparse areas (testimonial, FAQ, footer) fizz the most; busy areas
   (hero, features) stay quiet so nothing feels crowded. */
function mulberry32(seed) {
  let a = seed >>> 0
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/* returns [left%, size px, duration s, delay s, x-drift px, peak, tone] */
export function makeLanes(
  count,
  seed,
  { minSize = 2.5, maxSize = 9, minDur = 12, maxDur = 26, peak = [0.35, 0.65], gold = 0.22 } = {},
) {
  const rnd = mulberry32(seed)
  return Array.from({ length: count }, (_, i) => {
    // even horizontal spread with jitter — loose trains, no grid
    const left = `${(((i + 0.15 + rnd() * 0.7) / count) * 96 + 1.5).toFixed(1)}%`
    const size = Math.round((minSize + rnd() ** 2 * (maxSize - minSize)) * 2) / 2
    const sizeT = (size - minSize) / (maxSize - minSize)
    // champagne physics: bigger bubbles rise faster; tiny ones drift up slowly
    const duration = Math.round(maxDur - sizeT * (maxDur - minDur) + (rnd() - 0.5) * 5)
    const delay = -Math.round(rnd() * duration) // mid-cycle at load
    const drift = Math.round((rnd() - 0.5) * 34)
    // tiny bubbles are fainter — they'd be pinpricks of light, not beacons
    const peakO = Math.round((peak[0] + sizeT * (peak[1] - peak[0]) + rnd() * 0.06) * 100) / 100
    return [left, size, duration, delay, drift, peakO, rnd() < gold ? 'gold' : 'wine']
  })
}

/* the page-wide connective field (light glassy rings, subtle) */
const LANES = makeLanes(22, 7, { minSize: 3, maxSize: 8, peak: [0.55, 0.8] })

/* champagne physics, wine-cellar palette.
   Light sections: glassy rings — transparent centers with a thin
   burgundy (or faint champagne) rim and a white glint, no shadows,
   so they read as bubbles IN the page rather than dots ON it.
   Dark sections: white-cored champagne bubbles with gold/rosé glow. */
function bubbleStyle(size, dark, tone) {
  if (dark) {
    const glow = tone === 'gold' ? '217,176,112' : '232,139,160'
    return {
      width: size,
      height: size,
      background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9), rgba(${glow},0.4))`,
      // glow scales with the bubble — a fixed 6px halo made 3px bubbles
      // read as blurry dots instead of tiny bright points
      boxShadow: `0 0 ${Math.max(3, size * 0.8)}px rgba(${glow},0.45)`,
    }
  }
  const rim = tone === 'gold' ? '200,155,90' : '139,26,58'
  const rimA = tone === 'gold' ? 0.6 : 0.8
  return {
    width: size,
    height: size,
    background: `radial-gradient(circle at 33% 28%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.2) 24%, rgba(${rim},${rimA * 0.16}) 42%, rgba(${rim},${rimA * 0.45}) 56%, rgba(${rim},${rimA}) 70%, transparent 77%)`,
  }
}

export function BubbleField({ dark = false, page = false, lanes = LANES }) {
  // page mode spreads staggered copies of the lanes down the
  // document, so every viewport-full of page holds a few bubbles
  const copies = page ? [0, 1, 2] : [0]
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
      {copies.flatMap((c) =>
        lanes.map(([left, size, duration, delay, drift, peak, tone], i) => (
          <span
            key={`${c}-${i}`}
            className="bb-bubble"
            style={{
              left: page ? `${(parseFloat(left) + c * 2.7) % 97}%` : left,
              ...(page ? { top: `${((i * 137 + c * 31) % 92) + 4}%` } : { bottom: -14 }),
              ...bubbleStyle(size, dark, tone),
              '--dur': `${duration}s`,
              '--delay': `${delay + c * 7.3}s`,
              '--rise': page ? '-58vh' : '-108vh',
              '--dx1': `${drift}px`,
              '--dx2': `${-drift * 0.6}px`,
              '--dx3': `${drift * 0.4}px`,
              '--peak': peak,
            }}
          />
        )),
      )}
    </div>
  )
}

/* ——— Per-section lane sets ———
   Density inversely tracks visual busyness (Max's rule: fizz the most
   where the page is calm, least where it's already working hard).   */

/* hero: headline + chat demo + stat cards = the busiest screen → quiet */
export const HERO_LANES = makeLanes(8, 11, { maxSize: 7, peak: [0.55, 0.8], gold: 0.3 })

/* analytics: dashboard mock carries the section → moderate accent */
export const ANALYTICS_LANES = makeLanes(11, 23, { maxSize: 8, peak: [0.55, 0.82], gold: 0.28 })

/* footer: dark, roomy, mostly margins → the fullest glass on the page */
export const FOOTER_LANES = makeLanes(17, 41, { maxSize: 9.5, peak: [0.6, 0.88], gold: 0.3 })

/* testimonial: one quote in open space → dense, keeps the moment alive */
export const TESTIMONIAL_LANES = makeLanes(18, 57, { minSize: 3.5, maxSize: 9, peak: [0.7, 0.94] })

/* FAQ: a calm list → gently lively */
export const FAQ_LANES = makeLanes(14, 71, { minSize: 3.5, maxSize: 8, peak: [0.65, 0.9] })
