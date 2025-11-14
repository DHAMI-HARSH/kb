"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/app/providers";
import SignInModal from "@/app/components/modals/signin-modal";
import "@/app/styles/chatbot-panel.css";

// ✅ Correct import
import { sendChatMessage } from "../lib/chat/sendChat";

interface ChatMessage {
  id: string;
  type: "user" | "ai";
  content: string;
  sources?: string[];
}

interface ChatbotPanelProps {
  isOpen: boolean;
  onClose: () => void;
  docId: string; // document-specific
}

export default function ChatbotPanel({ isOpen, onClose, docId }: ChatbotPanelProps) {
  const { user, getIdToken } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setShowSignIn(true);
      return;
    }

    if (!input.trim() || loading) return;

    const query = input.trim();

    // User message
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      type: "user",
      content: query,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // 🔥 Call backend + save to firestore
      // get id token from auth context and pass to backend for authenticated requests
      const tokenToSend = getIdToken ? await getIdToken() : undefined;

      const { reply, sources } = await sendChatMessage({
        user_id: user.email!,
        doc_id: docId,
        query,
        idToken: tokenToSend ?? undefined,
      });

      const aiMessage: ChatMessage = {
        id: crypto.randomUUID(),
        type: "ai",
        content: reply,
        sources,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSourceClick = (source: string) => {
    console.log("Opening source:", source);
  };

  return (
    <>
      <div className={`chatbot-overlay ${isOpen ? "active" : ""}`} onClick={onClose} />

      <div className={`chatbot-panel ${isOpen ? "open" : ""}`}>
        <div className="chatbot-header">
          <h2>AI Assistant</h2>
          <button className="chatbot-close" onClick={onClose}>×</button>
        </div>

        <div className="chatbot-messages">
          {messages.length === 0 ? (
            <div className="chatbot-empty">
              <div className="empty-icon">🤖</div>
              <h3>Start a Conversation</h3>
              <p>Ask anything based on this document</p>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div key={message.id} className={`chat-message ${message.type}`}>
                  <div className="message-bubble">
                    <p>{message.content}</p>

                    {message.sources && (
                      <div className="message-sources">
                        <div className="sources-label">Sources:</div>
                        <div className="sources-list">
                          {message.sources.map((source) => (
                            <button key={source} className="source-link" onClick={() => handleSourceClick(source)}>
                              📄 {source}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        <div className="chatbot-input-area">
          {!user && (
            <div className="signin-prompt">
              <p>Sign in to use the AI assistant</p>
              <button className="signin-prompt-button" onClick={() => setShowSignIn(true)}>Sign In</button>
            </div>
          )}

          <form onSubmit={handleSendMessage} className="chat-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={user ? "Ask me anything..." : "Sign in to chat"}
              disabled={!user || loading}
              className="chat-input"
            />
            <button type="submit" disabled={!user || loading || !input.trim()} className="chat-send">
              {loading ? "⏳" : "→"}
            </button>
          </form>
        </div>
      </div>

      {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}
    </>
  );
}
