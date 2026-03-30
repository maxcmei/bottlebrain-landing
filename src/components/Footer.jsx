import Wordmark from './Wordmark'

export default function Footer() {
  return (
    <footer className="py-16 px-5 border-t border-gray-100">
      <div className="mx-auto max-w-[1180px] text-center">
        <Wordmark className="text-2xl inline-block" scrolled={true} />
        <p className="mt-4 text-ink-500 text-sm">
          AI-powered recommendations for independent wine retailers.
        </p>
        <p className="mt-6 text-ink-500/60 text-xs">
          &copy; {new Date().getFullYear()} BottleBrain. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
