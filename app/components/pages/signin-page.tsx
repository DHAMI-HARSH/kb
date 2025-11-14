"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAuth } from "@/app/providers"
import "@/app/styles/auth-pages.css"

export default function SignInPage() {
  const router = useRouter()
  const { signIn, signInWithGoogle } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await signIn(email, password)
      router.push("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError("")
    setLoading(true)

    try {
      await signInWithGoogle()
      router.push("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in with Google")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Welcome Back</h1>
        <p>Sign in to access your Knowledge Bank</p>

        <form onSubmit={handleSignIn} className="auth-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="submit-button">
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="divider">OR</div>

        <button onClick={handleGoogleSignIn} disabled={loading} className="google-button">
          Sign in with Google
        </button>

        <div className="auth-links">
          <Link href="/forgot-password">Forgot password?</Link>
          <span>•</span>
          <Link href="/signup">Create account</Link>
        </div>
      </div>
    </div>
  )
}
