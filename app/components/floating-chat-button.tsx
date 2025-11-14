"use client"

import { useState } from "react"
import { useAuth } from "@/app/providers"
import ChatbotPanel from "@/app/components/chatbot-panel"
import SignInModal from "@/app/components/modals/signin-modal"
import "@/app/styles/floating-chat-button.css"

export default function FloatingChatButton() {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)

  const handleButtonClick = () => {
    if (!user) {
      setShowSignIn(true)
      return
    }
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button
        className="floating-chat-button"
        onClick={handleButtonClick}
        aria-label="Open AI Assistant"
        title={user ? "Ask AI Assistant" : "Sign in to use AI Assistant"}
      >
        <span className="chat-icon">💬</span>
        <span className="chat-pulse" />
      </button>

      {user && <ChatbotPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />}

      {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}
    </>
  )
}
