'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'

const aureoleLetters = [
  { letter: 'A', meaning: 'ADHERENCE - We adhere to the highest standards of quality and compliance' },
  { letter: 'U', meaning: 'UBIQUITOUS - Our solutions are present everywhere, serving all industries' },
  { letter: 'R', meaning: 'RECOGNITION - We are recognized for our expertise and innovation' },
  { letter: 'E', meaning: 'EXPERTISE - Deep knowledge and specialized skills in pharmaceutical technology' },
  { letter: 'O', meaning: 'OPTIMAL - We deliver optimal solutions for maximum efficiency' },
  { letter: 'L', meaning: 'LONGEVITY - Building lasting relationships and sustainable solutions' },
  { letter: 'E2', meaning: 'ENTHUSIASTIC - Passionate about delivering exceptional results' },
]

export default function Values() {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0)
  const [animationPhase, setAnimationPhase] = useState('start') // 'start', 'colored', 'glow', 'final'
  const [showFinalMessage, setShowFinalMessage] = useState(false)
  const lettersRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Start with white letters
    setAnimationPhase('start')
    
    // After 1 second, make them colored
    const colorTimer = setTimeout(() => {
      setAnimationPhase('colored')
    }, 1000)

    // After 2 seconds, start the cycling animation
    const animationTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentLetterIndex((prev) => {
          if (prev >= aureoleLetters.length - 1) {
            // When we reach the end, make all letters glow immediately
            setAnimationPhase('glow')
            
            // After a shorter glow effect, show final message
            setTimeout(() => {
              setAnimationPhase('final')
              setShowFinalMessage(true)
            }, 2000) // Reduced from 3s to 2s
            
            clearInterval(interval)
            return prev // Keep on last letter
          }
          return prev + 1
        })
      }, 1200) // Reduced from 1.5s to 1.2s for faster cycling

      return () => clearInterval(interval)
    }, 2000)

    return () => {
      clearTimeout(colorTimer)
      clearTimeout(animationTimer)
    }
  }, [])

  const currentLetter = aureoleLetters[currentLetterIndex]
  const finalMessage = "Where excellence is not just a goal, it's our guiding light. Leading manufacturer of high-quality pharmaceutical equipment for global markets."

  return (
    <section className="values-section bg-white">
      {/* Background Elements */}
      <div className="values-background">
        <div className="values-grid" />
        <div className="values-particles">
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
        </div>
      </div>

      <div className="values-content">
        {/* Header */}
        <motion.div
          className="values-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <h2 className="values-title">OUR VALUES</h2>
          <p className="values-subtitle">
            When you choose Aureole Pharma Tech, you're choosing a partner dedicated to the pursuit of excellence. Our name reflects our promise to deliver pharmaceutical technology and services that are nothing short of exceptional. With us, you'll find the brilliance of innovation and the radiance of excellence in every aspect of our work.
          </p>
        </motion.div>

        {/* AUREOLE Animation */}
        <div className="aureole-container">
          {/* Horizontal AUREOLE Text */}
          <motion.div
            ref={lettersRef}
            className={`aureole-letters ${animationPhase}`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            {aureoleLetters.map((item, index) => (
              <motion.span
                key={item.letter}
                className={`aureole-letter ${index === currentLetterIndex ? 'active' : ''}`}
                whileHover={{ 
                  scale: 1.2, 
                  rotate: 5,
                  textShadow: '0 0 30px rgba(34, 152, 210, 0.8)'
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                viewport={{ once: true }}
              >
                {item.letter === 'E2' ? 'E' : item.letter}
              </motion.span>
            ))}
          </motion.div>

          {/* Message Display */}
          <AnimatePresence mode="wait">
            {!showFinalMessage ? (
              <motion.div
                key="letter-meaning"
                className="letter-meaning-simple"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <p className="meaning-text-simple">
                  {currentLetter.meaning}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="final-message"
                className="final-message"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <p className="final-message-text">
                  {finalMessage}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
