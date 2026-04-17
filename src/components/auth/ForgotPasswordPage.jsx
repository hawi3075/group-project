import { useState } from "react"

export default function ForgotPasswordPage({ onSwitchToLogin }) {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!email) {
      setMessage("Please enter your email address.")
      return
    }

    setMessage("If that email exists, a reset link has been sent.")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f1419] p-4 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-950/90 p-8 shadow-2xl shadow-black/40">
        <h2 className="mb-6 text-3xl font-semibold">Forgot Password</h2>
        <p className="mb-6 text-sm text-zinc-400">Enter your email to receive password reset instructions.</p>

        {message && (
          <div className="mb-4 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">{message}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm text-zinc-300">
            <span className="mb-2 block">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
              placeholder="you@example.com"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Send reset link
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-zinc-400">
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-medium text-white hover:text-blue-400"
          >
            Back to sign in
          </button>
        </div>
      </div>
    </div>
  )
}
