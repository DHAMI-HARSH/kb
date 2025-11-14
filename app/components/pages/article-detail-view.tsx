"use client"

import Link from "next/link"
import { useState } from "react"
import "@/app/styles/article-detail-view.css"

interface Article {
  id: string
  title: string
  tags: string[]
  author: string
  date: string
  readTime: string
  excerpt: string
  fullContent: string
  downloadLink?: string
}

interface ArticleDetailViewProps {
  article: Article
  onBack: () => void
}

export default function ArticleDetailView({ article, onBack }: ArticleDetailViewProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <article className="article-detail">
      <button className="back-button" onClick={onBack}>
        ← Back to Articles
      </button>

      <div className="article-header">
        <h1>{article.title}</h1>
        <div className="article-meta">
          <span className="author">By {article.author}</span>
          <span className="separator">•</span>
          <span className="date">{new Date(article.date).toLocaleDateString()}</span>
          <span className="separator">•</span>
          <span className="read-time">{article.readTime}</span>
        </div>
      </div>

      <div className="article-tags">
        {article.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="article-content">
        {article.fullContent.split("\n").map((paragraph, idx) => {
          if (paragraph.trim() === "") {
            return <div key={idx} className="content-spacer" />
          }
          if (paragraph.includes(":")) {
            return (
              <h3 key={idx} className="content-subheading">
                {paragraph}
              </h3>
            )
          }
          return (
            <p key={idx} className="content-paragraph">
              {paragraph}
            </p>
          )
        })}
      </div>

      <div className="article-actions">

        {/* ⬇⬇ NEW DOWNLOAD BUTTON ⬇⬇ */}
        {article.downloadLink && (
          <a
            href={article.downloadLink}
            target="_blank"
            rel="noopener noreferrer"
            className="action-button download-button"
            style={{ textDecoration: "none" }}
          >
            Download Article
          </a>
        )}

        <button className="action-button share-button" onClick={handleCopyLink}>
          {copied ? "✓ Link Copied" : "Share Article"}
        </button>

        <Link href="/articles" className="action-button back-link">
          Browse More Articles
        </Link>
      </div>
    </article>
  )
}
