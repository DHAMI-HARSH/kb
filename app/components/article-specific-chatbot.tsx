"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/app/providers";
import SignInModal from "@/app/components/modals/signin-modal";
import "@/app/styles/article-specific-chatbot.css";

// ✅ correct import
import { sendChatMessage } from "../../app/lib/chat/sendChat";

interface ChatMessage {
  id: string;
  type: "user" | "ai";
  content: string;
  sources?: string[];
}

interface Article {
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  fullContent: string;
}

interface ArticleSpecificChatbotProps {
  article: Article;
}

export default function ArticleSpecificChatbot({ article }: ArticleSpecificChatbotProps) {
  const { user } = useAuth();

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "welcome",
      type: "ai",
      content: `Welcome! I'm your AI assistant for "${article.title}". Ask anything related to this article.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Note: initial welcome message set in useState to avoid hydration mismatch

  // SEND MESSAGE
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setShowSignIn(true);
      return;
    }

    if (!input.trim() || loading) return;

    const query = input.trim();

    // Add user message
    const newUserMessage: ChatMessage = {
      id: crypto.randomUUID(),
      type: "user",
      content: query,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setLoading(true);

    try {
      // ✅ REAL BACKEND CALL
      const { reply, sources } = await sendChatMessage({
        user_id: user.email!,
        doc_id: article.id,
        query,
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

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: "ai",
          content: "⚠️ AI service is unavailable.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="article-chatbot-container">
      <div className="article-chatbot-header">
        <h3>Article AI Assistant</h3>
        <p className="chatbot-article-title">{article.title}</p>
      </div>

      <div className="article-chatbot-messages">
        {messages.map((m) => (
          <div key={m.id} className={`chat-message ${m.type}`}>
            <div className="message-bubble">
              <p>{m.content}</p>

              {m.sources && m.sources.length > 0 && (
                <div className="message-sources">
                  <div className="sources-label">Sources:</div>
                  <div className="sources-list">
                    {m.sources.map((s) => (
                      <span key={s} className="source-badge">
                        📄 {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      <div className="article-chatbot-input-area">
        {!user && (
          <div className="signin-prompt">
            <p>Sign in to ask questions</p>
            <button onClick={() => setShowSignIn(true)} className="signin-prompt-button">
              Sign In
            </button>
          </div>
        )}

        <form onSubmit={handleSendMessage} className="chat-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={user ? "Ask about this article…" : "Sign in to chat"}
            disabled={!user || loading}
            className="chat-input"
          />

          <button type="submit" disabled={!user || loading || !input.trim()} className="chat-send">
            {loading ? "⏳" : "→"}
          </button>
        </form>
      </div>

      {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}
    </div>
  );
}
