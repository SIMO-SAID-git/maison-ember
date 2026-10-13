import Link from 'next/link'
import './globals.css'

// Fallback for URLs that never reach the [locale] segment.
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <main className="dark-surface flex min-h-screen flex-col items-center justify-center bg-deep px-6 text-center text-chalk">
          <h1 className="font-display text-5xl font-light">Page not found</h1>
          <p className="mt-4 text-chalk/75">The page you are looking for does not exist.</p>
          <Link
            href="/en"
            className="mt-8 rounded-[3px] bg-saffron px-6 py-3.5 font-medium text-deep"
          >
            Back to home
          </Link>
        </main>
      </body>
    </html>
  )
}