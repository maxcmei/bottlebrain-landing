/*
 * Wordmark. The glass "i" uses the original PNG as a CSS mask filled
 * with currentColor, so the whole mark — text and glass — is colored
 * by ONE inherited value and transitions as ONE color animation.
 * No filters, no image swaps: nothing that can flicker.
 *
 * The parent (e.g. the navbar link) sets `color` and its transition;
 * everything here simply inherits it.
 */
const glassMask = {
  display: 'inline-block',
  height: '0.7em',
  aspectRatio: '244 / 502',
  backgroundColor: 'currentColor',
  // The thrown-swirl mark (2026-07-09): same glass silhouette, with the
  // swirl cut (BOLD optical variant: at text sizes the standard thin cut turns to mush, so the wordmark uses a thicker cut — same move as type optical sizes) — keeps the wordmark's "i" in lockstep with the solo mark.
  WebkitMaskImage: 'url(/assets/glass-swirl-bold.png)',
  maskImage: 'url(/assets/glass-swirl-bold.png)',
  WebkitMaskSize: 'contain',
  maskSize: 'contain',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center bottom',
  maskPosition: 'center bottom',
}

export default function Wordmark({ className = '' }) {
  // role="img" + aria-label: the glass "i" is a masked span between the text
  // nodes "BottleBra" and "n", so without this the accessible name of every
  // wordmark (nav brand link, footer) was literally "BottleBran". Treating
  // the composite as one labeled unit gives AT the real brand name.
  return (
    <span
      role="img"
      aria-label="BottleBrain"
      className={`font-extrabold tracking-tight ${className}`}
    >
      BottleBra
      <span aria-hidden="true" style={glassMask} />
      n
    </span>
  )
}
