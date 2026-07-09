import { readFileSync } from 'fs'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Multi-page build: each subpage ships its own static HTML head
// (title/meta/JSON-LD) so crawlers never depend on JS execution.
// Vercel's cleanUrls serves dist/about.html at /about.

// Mirror Vercel's cleanUrls locally so /about and /contact work in
// `npm run dev` and `vite preview` too — without this, clicking a nav
// link on localhost 404s and the pages are only reachable as *.html.
const cleanUrls = () => {
  const rewrite = (req, _res, next) => {
    // mpa mode also drops the automatic / -> /index.html resolution
    if (/^\/(\?.*)?$/.test(req.url)) {
      req.url = '/index.html' + (req.url.slice(1) || '')
    } else if (/^\/(about|contact)\/?(\?.*)?$/.test(req.url)) {
      req.url = req.url.replace(/^\/(about|contact)\/?/, '/$1.html')
    }
    next()
  }
  // Anything no earlier middleware claimed gets the real 404 page,
  // same as Vercel serving dist/404.html in production.
  const notFound = (file) => (_req, res) => {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/html')
    res.end(readFileSync(file))
  }
  return {
    name: 'local-clean-urls',
    // NB: the rewrite installs via plain statements (returning the
    // connect app makes Vite call it as a post-hook and crash), while
    // the 404 handler is RETURNED so it lands after Vite's internal
    // middlewares — i.e. only when no page/asset matched.
    configureServer: (server) => {
      server.middlewares.use(rewrite)
      return () => server.middlewares.use(notFound(resolve(__dirname, 'public/404.html')))
    },
    configurePreviewServer: (server) => {
      server.middlewares.use(rewrite)
      return () => server.middlewares.use(notFound(resolve(__dirname, 'dist/404.html')))
    },
  }
}

export default defineConfig({
  // mpa: unknown URLs fall through to the 404 middleware instead of
  // being silently answered with index.html (the SPA fallback)
  appType: 'mpa',
  plugins: [react(), cleanUrls()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
})
