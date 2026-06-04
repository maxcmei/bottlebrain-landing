import { useState } from 'react'
import emailjs from '@emailjs/browser'

const SERVICE_ID = 'YOUR_EMAILJS_SERVICE_ID'   // replace after EmailJS setup
const TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID' // replace after EmailJS setup
const PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY'   // replace after EmailJS setup

const bullets = [
  'Live recommendations using your real catalog data',
  'POS and inventory workflow compatibility review',
  'Clear ROI model for independent wine retailers',
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
    <section id="demo" className="py-28 px-5 lg:py-32">
      <div className="mx-auto max-w-[1180px] grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2
            className="text-ink-900"
            style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
            }}
          >
            See it in action
          </h2>
          <p className="mt-4 text-ink-500 text-lg max-w-md leading-relaxed">
            A fast guided walkthrough tailored to your current wine inventory
            and sales flow.
          </p>

          <ul className="mt-8 space-y-4">
            {bullets.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 w-2.5 h-2.5 rounded-full bg-wine-800 shrink-0" />
                <span className="text-ink-700 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-black/[0.06] border border-gray-100">
          {status === 'success' ? (
            <p className="text-ink-900 font-semibold text-lg text-center py-8">
              Thanks! We&rsquo;ll be in touch soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-ink-900 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={fullName}
                    onChange={handleFullNameChange}
                    className={`w-full px-4 py-3 rounded-xl border focus:ring-2 outline-none transition-all text-ink-900 placeholder:text-ink-500/50 ${
                      errors.fullName
                        ? 'border-red-400 focus:border-red-400 focus:ring-red-400/10'
                        : 'border-gray-200 focus:border-wine-800 focus:ring-wine-800/10'
                    }`}
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
                    className={`w-full px-4 py-3 rounded-xl border focus:ring-2 outline-none transition-all text-ink-900 placeholder:text-ink-500/50 ${
                      errors.shopName
                        ? 'border-red-400 focus:border-red-400 focus:ring-red-400/10'
                        : 'border-gray-200 focus:border-wine-800 focus:ring-wine-800/10'
                    }`}
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
                    className={`w-full px-4 py-3 rounded-xl border focus:ring-2 outline-none transition-all text-ink-900 placeholder:text-ink-500/50 ${
                      errors.email
                        ? 'border-red-400 focus:border-red-400 focus:ring-red-400/10'
                        : 'border-gray-200 focus:border-wine-800 focus:ring-wine-800/10'
                    }`}
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
                {status === 'loading' ? 'Sending...' : 'Book My Live Demo'}
              </button>

              {status === 'error' && (
                <p className="mt-4 text-sm text-center text-red-600">
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
    </section>
  )
}
