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
  WebkitMaskImage: 'url(/assets/glass.png)',
  maskImage: 'url(/assets/glass.png)',
  WebkitMaskSize: 'contain',
  maskSize: 'contain',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center bottom',
  maskPosition: 'center bottom',
}

export default function Wordmark({ className = '' }) {
  return (
    <span className={`font-extrabold tracking-tight ${className}`}>
      BottleBra
      <span aria-hidden="true" style={glassMask} />
      n
    </span>
  )
}
