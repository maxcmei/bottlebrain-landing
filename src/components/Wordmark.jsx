export default function Wordmark({ className = "", scrolled = false }) {
  return (
    <span className={`font-extrabold tracking-tight ${className}`}>
      BottleBra
      <span
        style={{
          display: 'inline-block',
          verticalAlign: 'baseline',
          overflow: 'hidden',
          height: '0.7em',
        }}
      >
        <img
          src={scrolled ? '/assets/glass1.png' : '/assets/glass.png'}
          alt=""
          aria-hidden="true"
          style={{
            display: 'block',
            height: '100%',
            width: 'auto',
            opacity: 1,
            transition: 'filter 0.15s ease, opacity 0.15s ease',
            filter: scrolled ? 'brightness(0)' : 'none',
          }}
        />
      </span>
      n
    </span>
  )
}
