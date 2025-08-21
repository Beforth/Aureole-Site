'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!heroRef.current) return

    // Simple scroll indicator animation
    const scrollIndicator = heroRef.current.querySelector('.scroll-indicator')
    if (scrollIndicator) {
      scrollIndicator.classList.add('animate-bounce')
    }
  }, [])

  return (
    <section ref={heroRef} className="hero-section bg-white">
      {/* Background Elements */}
      <div className="hero-background">
        <div className="gradient-overlay"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-text-container">
          <h1 className="hero-title">
            <span className="title-line">Engineering</span>
            <span className="title-line">Precision in</span>
            <span className="title-line">Pharmaceutical</span>
            <span className="title-line">Technology</span>
          </h1>
          <p className="hero-subtitle">
            Where excellence is not just a goal, it's our guiding light. Leading manufacturer of high-quality pharmaceutical equipment for global markets.
          </p>
        </div>
        
        <div className="hero-visual">
          <div className="molecule-container">
            <div className="molecule-rings">
              <div className="ring ring-1"></div>
              <div className="ring ring-2"></div>
              <div className="ring ring-3"></div>
            </div>
            <div className="molecule-center">
              <div className="molecule-stats">
                <div className="molecule-stat-number">28</div>
                <div className="molecule-stat-label">years of experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="scroll-line"></div>
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}
