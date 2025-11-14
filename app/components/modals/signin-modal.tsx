"use client"

import Link from "next/link"

interface SignInModalProps {
  onClose: () => void
}

export default function SignInModal({ onClose }: SignInModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="modal-header">
          <h2>Sign In Required</h2>
        </div>

        <div className="modal-body">
          <p>You need to sign in to access this feature.</p>
        </div>

        <div className="modal-footer">
          <Link href="/signin" className="download-button" onClick={onClose}>
            Sign In
          </Link>
          <Link href="/signup" className="download-button" onClick={onClose}>
            Create Account
          </Link>
        </div>
      </div>
    </div>
  )
}
