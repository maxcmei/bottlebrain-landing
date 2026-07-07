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

/* left%, size px, duration s, delay s, x-drift px, peak opacity, tone */
const LANES = [
  ['4%', 7, 22, 0, 16, 0.7, 'wine'],
  ['9%', 6, 28, 9, -12, 0.5, 'gold'],
  ['16%', 10, 19, 4, 20, 0.65, 'wine'],
  ['22%', 6, 26, 14, -14, 0.55, 'wine'],
  ['29%', 5, 31, 2, 10, 0.45, 'wine'],
  ['36%', 8, 21, 11, -18, 0.7, 'wine'],
  ['43%', 6, 27, 6, 12, 0.5, 'wine'],
  ['51%', 11, 18, 16, 22, 0.6, 'gold'],
  ['58%', 5, 30, 1, -10, 0.45, 'wine'],
  ['64%', 7, 23, 8, 16, 0.6, 'wine'],
  ['71%', 6, 29, 13, -16, 0.55, 'wine'],
  ['78%', 9, 20, 3, 18, 0.7, 'wine'],
  ['85%', 5, 32, 10, -12, 0.45, 'wine'],
  ['91%', 7, 24, 17, 14, 0.6, 'gold'],
  ['96%', 6, 27, 5, -14, 0.5, 'wine'],
  /* edge lanes — the side margins are never covered by cards */
  ['1.5%', 8, 23, 12, 12, 0.7, 'wine'],
  ['98%', 7, 25, 7, -12, 0.65, 'wine'],
]

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
      boxShadow: `0 0 6px rgba(${glow},0.45)`,
    }
  }
  const rim = tone === 'gold' ? '200,155,90' : '139,26,58'
  const rimA = tone === 'gold' ? 0.45 : 0.62
  return {
    width: size,
    height: size,
    background: `radial-gradient(circle at 33% 28%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.2) 24%, rgba(${rim},${rimA * 0.16}) 42%, rgba(${rim},${rimA * 0.45}) 56%, rgba(${rim},${rimA}) 70%, transparent 77%)`,
  }
}

export function BubbleField({ dark = false, page = false, lanes = LANES }) {
  // page mode spreads staggered copies of the lanes down the
  // document, so every viewport-full of page holds a few bubbles
  const copies = page ? [0, 1, 2, 3] : [0]
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

/* sparser lanes for dark sections, so they accent rather than crowd;
   every third bubble goes champagne-gold against the dark */
export const DARK_LANES = LANES.filter((_, i) => i % 2 === 0).map(
  ([l, s, d, delay, drift, peak], i) => [
    l, s, d, delay, drift, Math.min(peak + 0.2, 0.7), i % 3 === 1 ? 'gold' : 'wine',
  ],
)
