"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/app/providers"
import "@/app/styles/navbar.css"

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const auth = useAuth()
  const user = auth?.user
  const handleSignOut = auth?.signOut
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          <div className="logo-glow">KB</div>
          <span>Knowledge Bank</span>
        </Link>

        <ul className="navbar-menu">
          <li>
            <Link href="/" className={pathname === "/" ? "active" : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/articles" className={pathname === "/articles" ? "active" : ""}>
              Articles
            </Link>
          </li>
        </ul>

        <div className="navbar-auth">
          {user ? (
            <div className="profile-section">
              <div className="profile-button" onClick={() => setShowDropdown(!showDropdown)}>
                <div className="profile-avatar">{user.email?.[0].toUpperCase()}</div>
              </div>
              {showDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-email">{user.email}</div>
                  <button
                    className="dropdown-logout"
                    onClick={async () => {
                      try {
                        if (handleSignOut && typeof handleSignOut === 'function') {
                          await handleSignOut()
                        }
                        setShowDropdown(false)
                        router.push("/")
                      } catch (error) {
                        console.error('Sign out error:', error)
                      }
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/signin" className="signin-button">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
