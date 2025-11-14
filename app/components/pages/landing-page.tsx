"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import Starfield from "@/app/components/starfield"
import PlanetModel from "@/app/components/planet-model"
import "@/app/styles/landing-page.css"

export default function LandingPage() {
  const [parallaxOffset, setParallaxOffset] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setParallaxOffset(window.scrollY * 0.5)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="landing-page" ref={containerRef}>
      <Starfield />

      {/* Hero Section */}
      <div className="hero-section">
        <div className="parallax-bg" style={{ transform: `translateY(${parallaxOffset}px)` }} />

        <div className="hero-content">
          <div className="hero-3d-model">
            <PlanetModel />
          </div>

          <h1 className="hero-title">
            Explore Knowledge
            <br />
            <span className="gradient-text">From Across The Universe</span>
          </h1>

          <p className="hero-subtitle">Dive into a cosmic library of knowledge powered by AI-driven insights</p>

          <div className="hero-buttons">
            <Link href="/articles" className="btn btn-primary">
              Explore Articles
            </Link>
            <Link href="/signin" className="btn btn-secondary">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Powerful Features</h2>
          <p>Everything you need to explore and learn</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Rich Knowledge Base</h3>
            <p>Access thousands of curated articles and documents from diverse domains</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI Chatbot</h3>
            <p>Talk with an intelligent assistant powered by cutting-edge AI technology</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Instant Answers</h3>
            <p>Get quick insights with referenced sources and detailed explanations</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Advanced Search</h3>
            <p>Find exactly what you need with powerful filtering and tag-based search</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌐</div>
            <h3>Global Access</h3>
            <p>Connect from anywhere and access your knowledge library on any device</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📥</div>
            <h3>Download & Share</h3>
            <p>Download articles and share knowledge with your team and community</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Explore?</h2>
          <p>Join thousands of users discovering knowledge at the speed of thought</p>
          <div className="cta-buttons">
            <Link href="/articles" className="btn btn-primary btn-large">
              Start Exploring
            </Link>
            <Link href="/signup" className="btn btn-secondary btn-large">
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Knowledge Bank</h3>
            <p>Your cosmic library of knowledge powered by AI</p>
            <div className="footer-social">
              <a href="#" aria-label="Twitter">
                𝕏
              </a>
              <a href="#" aria-label="GitHub">
                ⚙️
              </a>
              <a href="#" aria-label="LinkedIn">
                💼
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Navigation</h4>
            <ul>
              <li>
                <Link href="/articles">Articles</Link>
              </li>
              <li>
                <Link href="/signin">Sign In</Link>
              </li>
              <li>
                <Link href="/signup">Sign Up</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li>
                <Link href="#">Documentation</Link>
              </li>
              <li>
                <Link href="#">API Reference</Link>
              </li>
              <li>
                <Link href="#">Support</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li>
                <Link href="#">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#">Terms of Service</Link>
              </li>
              <li>
                <Link href="#">Contact</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Knowledge Bank Engine. All rights reserved.</p>
          <p>Powered by AI | Built with Next.js</p>
        </div>
      </footer>
    </div>
  )
}
