"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/app/providers";
import ArticleCard from "@/app/components/article-card";
import ArticleModal from "@/app/components/modals/article-modal";
import SignInModal from "@/app/components/modals/signin-modal";
import "@/app/styles/articles-page.css";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  metadata?: {
    title: string;
    description: string;
    author: string;
    date: string;
  };
}

export default function ArticlesPage() {
  const { user } = useAuth();

  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [allTags, setAllTags] = useState<string[]>([]);
  const observerTarget = useRef<HTMLDivElement>(null);

  /* 🔥 REAL UPDATED ARTICLES BASED ON PDFs */
  const pdfArticles: Article[] = [
    {
      id: "1",
      title: "Human Physiology: Core Principles & Body Functions",
      excerpt:
        "Explore how human organ systems maintain life, regulate the body, and perform essential biological functions.",
      tags: ["human-physiology", "biology", "body-systems"],
    },
    {
      id: "2",
      title: "Microbes in Space: NASA & JAXA Research Insights",
      excerpt:
        "How microorganisms behave in microgravity and what space agencies have discovered through ISS experiments.",
      tags: ["microbiology", "space", "NASA", "JAXA"],
    },
    {
      id: "3",
      title: "Plant Water Management in Microgravity",
      excerpt:
        "Learn how NASA grows plants in space using passive watering technology and capillary fluidics onboard the ISS.",
      tags: ["plants", "microgravity", "space", "fluidics"],
    },
    {
      id: "4",
      title: "Advanced Human Physiology: Systems & Regulation",
      excerpt:
        "A deeper exploration of how body systems interact, regulate themselves, and maintain internal balance.",
      tags: ["physiology", "anatomy", "health"],
    },
  ];

  /* Load tags + articles once */
  useEffect(() => {
    const tags = Array.from(new Set(pdfArticles.flatMap((a) => a.tags)));
    setAllTags(tags);
    setArticles(pdfArticles);
  }, []);

  /* Filtering articles */
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => article.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="articles-page">
      <div className="articles-header">
        <div className="header-content">
          <h1>Knowledge Repository</h1>
          <p>Browse through our collection of curated scientific documents</p>
        </div>
      </div>

      <div className="articles-container">
        {/* Search + Tags */}
        <div className="articles-controls">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button
                className="search-clear"
                onClick={() => setSearchTerm("")}
              >
                ✕
              </button>
            )}
          </div>

          <div className="tags-container">
            <div className="tags-label">Filter by Tags:</div>
            <div className="tags-filter">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={`tag-pill ${
                    selectedTags.includes(tag) ? "active" : ""
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                  {selectedTags.includes(tag) && (
                    <span className="tag-remove">×</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="results-header">
          <h2>
            {filteredArticles.length} Article
            {filteredArticles.length !== 1 ? "s" : ""} Found
          </h2>
          {selectedTags.length > 0 && (
            <button
              className="clear-filters"
              onClick={() => setSelectedTags([])}
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="articles-grid">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">📭</div>
            <h3>No articles found</h3>
            <p>Try adjusting your search or filters</p>
            {selectedTags.length > 0 && (
              <button
                className="clear-filters-large"
                onClick={() => setSelectedTags([])}
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      <div ref={observerTarget} className="infinite-scroll-target" />

      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}

      {showSignInModal && (
        <SignInModal onClose={() => setShowSignInModal(false)} />
      )}
    </div>
  );
}
