import { useState } from 'react'

const bullets = [
  'Live recommendations using your real catalog data',
  'POS and inventory workflow compatibility review',
  'Clear ROI model for independent wine retailers',
]

export default function DemoForm() {
  const [form, setForm] = useState({ name: '', shop: '', email: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
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

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-8 shadow-xl shadow-black/[0.06] border border-gray-100"
        >
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-ink-900 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-wine-800 focus:ring-2 focus:ring-wine-800/10 outline-none transition-all text-ink-900 placeholder:text-ink-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink-900 mb-2">
                Shop Name
              </label>
              <input
                type="text"
                placeholder="Your shop name"
                value={form.shop}
                onChange={(e) => setForm({ ...form, shop: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-wine-800 focus:ring-2 focus:ring-wine-800/10 outline-none transition-all text-ink-900 placeholder:text-ink-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink-900 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="you@shop.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-wine-800 focus:ring-2 focus:ring-wine-800/10 outline-none transition-all text-ink-900 placeholder:text-ink-500/50"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-4 bg-wine-800 text-white font-semibold rounded-full hover:bg-wine-900 transition-colors cursor-pointer"
          >
            Book My Live Demo
          </button>
        </form>
      </div>
    </section>
  )
}
