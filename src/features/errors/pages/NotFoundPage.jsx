import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg-main px-4 py-10 font-jakarta text-white">
      <div className="pointer-events-none absolute -left-10 top-8 h-48 w-48 rounded-full bg-primary-brand/45 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -right-8 h-56 w-56 rounded-full bg-accent-soft/35 blur-3xl" />

      <section className="w-full max-w-lg rounded-2xl border border-white/20 bg-[#0a0f1f]/85 p-8 text-center shadow-2xl backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.2em] text-white/55">Error 404</p>
        <h1 className="mt-2 text-3xl font-semibold">Page not found</h1>
        <p className="mt-3 text-sm text-white/70">
          The URL you entered does not exist in this app.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            to="/workspace"
            className="rounded-md bg-highlight/95 px-4 py-2 text-sm font-semibold text-[#111827] hover:bg-highlight"
          >
            Go to Workspace
          </Link>
          <Link
            to="/signin"
            className="rounded-md border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            Go to Sign In
          </Link>
        </div>
      </section>
    </main>
  )
}

export default NotFoundPage
