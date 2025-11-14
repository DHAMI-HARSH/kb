"use client"

import { useState } from "react"
import { useAuth } from "@/app/providers"
import "@/app/styles/article-modal.css"

interface Article {
  id: string
  title: string
  excerpt: string
  tags: string[]
  metadata?: {
    title: string
    description: string
    author: string
    date: string
  }
}

interface ArticleModalProps {
  article: Article
  onClose: () => void
}

export default function ArticleModal({ article, onClose }: ArticleModalProps) {
  const { user, getIdToken } = useAuth()
  const [downloading, setDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState("")

  const handleDownload = async () => {
    if (!user) return

    try {
      setDownloading(true)
      setDownloadError("")

      const token = await getIdToken()

      const response = await fetch(`/api/docs/download/${article.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Download failed")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${article.title}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      setDownloadError("Failed to download document")
      console.error("Download error:", error)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="modal-header">
          <h2>{article.title}</h2>
          <p className="modal-meta">
            {article.metadata?.author && <span>{article.metadata.author}</span>}
            {article.metadata?.date && <span>{article.metadata.date}</span>}
          </p>
        </div>

        <div className="modal-body">
          <p className="modal-excerpt">{article.excerpt}</p>

          <div className="modal-tags">
            {article.tags.map((tag) => (
              <span key={tag} className="modal-tag">
                {tag}
              </span>
            ))}
          </div>

          <p className="modal-description">{article.metadata?.description || "No additional description available."}</p>
        </div>

        <div className="modal-footer">
          {downloadError && <p className="error-message">{downloadError}</p>}
          <button className="download-button" onClick={handleDownload} disabled={downloading}>
            {downloading ? "Downloading..." : "Download PDF"}
          </button>
        </div>
      </div>
    </div>
  )
}
