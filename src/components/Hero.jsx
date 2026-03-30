import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="hero-gradient min-h-screen relative flex items-center">
        <div className="mx-auto max-w-[1180px] w-full px-5 relative z-10 pt-32 pb-24">
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-sm font-semibold tracking-[0.2em] text-white/70 uppercase mb-6"
            >
              AI-Powered Retail
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-white"
              style={{
                fontSize: 'clamp(48px, 5vw, 80px)',
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
              }}
            >
              <span style={{ display: 'block' }}>Your shop</span>
              <span style={{ display: 'block' }}>just got a</span>
              <span style={{ display: 'block' }}>lot smarter.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-6 text-lg text-white/80 max-w-md leading-relaxed font-medium"
            >
              BottleBrain turns your inventory into a 24/7 AI sommelier
              that speaks your customers&rsquo; language, recommends perfect
              bottles, and helps every conversation end with confidence.
            </motion.p>

            <motion.a
              href="#demo"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-white text-wine-900 font-semibold rounded-full hover:bg-white/90 transition-colors cursor-pointer"
            >
              Get a Demo <span aria-hidden="true">&rarr;</span>
            </motion.a>
          </div>
        </div>

        <div
          className="hidden lg:block absolute right-[-6%] xl:right-[-2%] bottom-0"
          style={{ transform: 'rotate(-12deg) translateY(28%)' }}
        >
          <div className="relative">
            <div
              style={{
                position: 'absolute',
                width: 600,
                height: 600,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.13) 0%, transparent 65%)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 0,
              }}
            />
            <img
              src="/assets/bottle.png"
              alt="Wine bottle"
              className="relative z-10 h-[110vh] object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
