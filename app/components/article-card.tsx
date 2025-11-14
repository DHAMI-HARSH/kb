"use client"

import Link from "next/link"

interface Article {
  id: string
  title: string
  excerpt: string
  tags: string[]
}

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/articles/${article.id}`}>
      <div className="article-card" role="button" tabIndex={0}>
        <h3>{article.title}</h3>

        <p className="article-excerpt">
          {article.excerpt}
        </p>

        <div className="article-tags">
          {article.tags.map((tag) => (
            <span key={tag} className="article-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
