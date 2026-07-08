import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { Check } from 'lucide-react'
import { Reveal, PatternFade } from './ui'
import { CellarRack } from './cellar'

const SERVICE_ID = 'service_mwfwa1j'
const TEMPLATE_ID = 'template_0i3svqi'
const PUBLIC_KEY = 'VHggPRybpobmYwyWZ'

const bullets = [
  'Live demo using your actual wine catalog',
  'POS and inventory workflow compatibility review',
  'Walk away knowing exactly how to get started',
]

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(fullName, shopName, email) {
  const errors = {}
  if (!fullName.trim() || fullName.trim().length < 2)
    errors.fullName = 'Please enter your full name (at least 2 characters).'
  if (!shopName.trim() || shopName.trim().length < 2)
    errors.shopName = 'Please enter your shop name (at least 2 characters).'
  if (!email.trim() || !EMAIL_REGEX.test(email.trim()))
    errors.email = 'Please enter a valid email address.'
  return errors
}

const inputClass = (hasError) =>
  `w-full px-4 py-3.5 rounded-xl border bg-white focus:ring-2 outline-none transition-all text-ink-900 placeholder:text-ink-500/40 text-[15px] ${
    hasError
      ? 'border-red-400 focus:border-red-400 focus:ring-red-400/10'
      : 'border-ink-900/10 focus:border-wine-800 focus:ring-wine-800/10'
  }`

export default function DemoForm() {
  const [fullName, setFullName] = useState('')
  const [shopName, setShopName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitted(true)

    const fieldErrors = validate(fullName, shopName, email)
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    setStatus('loading')

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: fullName,
          shop_name: shopName,
          from_email: email,
          to_email: 'team@bottlebrain.io',
        },
        PUBLIC_KEY,
      )
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const handleFullNameChange = (e) => {
    setFullName(e.target.value)
    if (submitted) setErrors((prev) => ({ ...prev, fullName: undefined }))
  }

  const handleShopNameChange = (e) => {
    setShopName(e.target.value)
    if (submitted) setErrors((prev) => ({ ...prev, shopName: undefined }))
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    if (submitted) setErrors((prev) => ({ ...prev, email: undefined }))
  }

  return (
    <section id="demo" className="pt-28 lg:pt-32 pb-40 lg:pb-44 px-5 bg-cream-100 parchment">
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <div data-nav-dark className="relative overflow-hidden rounded-[40px] hero-atmosphere grain">
            <CellarRack base="radial-gradient(ellipse 60% 85% at 28% 45%, black 0%, transparent 76%)" spotlight={300} />
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center p-8 sm:p-12 lg:p-16">
              <div className="relative">
                <PatternFade rgb="22, 3, 8" strength={0.5} />
                {/* relative: lift the text into the positioned layer so the
                    fade above paints UNDER it, not over it */}
                <div className="relative">
                <h2
                  className="font-display font-medium text-cream-50 text-balance"
                  style={{ fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.08, letterSpacing: '-0.015em' }}
                >
                  Meet your AI sommelier &mdash; on{' '}
                  <span className="italic text-wine-300">your own catalog.</span>
                </h2>
                <p className="mt-5 text-cream-50/65 text-lg max-w-md leading-relaxed">
                  A fast, guided walkthrough tailored to your current wine
                  inventory and sales flow. No slideware — your bottles, live.
                </p>

                <ul className="mt-8 space-y-4">
                  {bullets.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-wine-800/60 border border-wine-400/30 flex items-center justify-center shrink-0">
                        <Check size={11} className="text-wine-300" strokeWidth={3} />
                      </span>
                      <span className="text-cream-50/80 leading-relaxed text-[15px]">{item}</span>
                    </li>
                  ))}
                </ul>
                </div>
              </div>

              <div className="bg-cream-50 rounded-3xl p-7 sm:p-8 shadow-chat">
                {status === 'success' ? (
                  <div className="text-center py-10">
                    <span className="mx-auto w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                      <Check size={22} className="text-emerald-600" strokeWidth={3} />
                    </span>
                    <p className="text-ink-900 font-display font-medium text-2xl mt-5">
                      You&rsquo;re on the list.
                    </p>
                    <p className="text-ink-500 mt-2 text-[15px]">
                      We&rsquo;ll be in touch within a day to set up your walkthrough.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-ink-900 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="Your full name"
                          value={fullName}
                          onChange={handleFullNameChange}
                          className={inputClass(errors.fullName)}
                        />
                        {errors.fullName && (
                          <p className="mt-1.5 text-xs text-red-600">{errors.fullName}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-ink-900 mb-2">
                          Shop Name
                        </label>
                        <input
                          type="text"
                          placeholder="Your shop name"
                          value={shopName}
                          onChange={handleShopNameChange}
                          className={inputClass(errors.shopName)}
                        />
                        {errors.shopName && (
                          <p className="mt-1.5 text-xs text-red-600">{errors.shopName}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-ink-900 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          placeholder="you@shop.com"
                          value={email}
                          onChange={handleEmailChange}
                          className={inputClass(errors.email)}
                        />
                        {errors.email && (
                          <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full mt-6 py-4 bg-wine-800 text-white font-semibold rounded-full hover:bg-wine-900 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? 'Sending…' : 'Book My Live Demo'}
                    </button>

                    <p className="mt-4 text-[12px] text-center text-ink-400">
                      No commitment. We&rsquo;ll never share your info.
                    </p>

                    {status === 'error' && (
                      <p className="mt-3 text-sm text-center text-red-600">
                        Something went wrong. Please email us directly at{' '}
                        <a
                          href="mailto:team@bottlebrain.io"
                          className="underline hover:text-red-700"
                        >
                          team@bottlebrain.io
                        </a>
                      </p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
