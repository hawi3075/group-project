import { useState } from "react"

export default function AuthModal({ onLogin, onSwitchToForgotPassword }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!email || !password) {
      setError("Please enter both email and password.")
      return
    }

    setError("")
    onLogin("demo-token")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f1419] p-4 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-950/90 p-8 shadow-2xl shadow-black/40">
        <h2 className="mb-6 text-3xl font-semibold">Sign in</h2>
        <p className="mb-6 text-sm text-zinc-400">Enter your email and password to continue.</p>

        {error && (
          <div className="mb-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>
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

          <label className="block text-sm text-zinc-300">
            <span className="mb-2 block">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
              placeholder="********"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-sm text-zinc-400">
          <button
            type="button"
            onClick={onSwitchToForgotPassword}
            className="font-medium text-white hover:text-blue-400"
          >
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  )
}
