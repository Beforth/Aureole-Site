'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    // Debug: Log that preloader is starting
    console.log('Preloader starting on page:', window.location.pathname)
    console.log('Preloader isVisible:', isVisible)
    console.log('Preloader isMounted:', isMounted)
    
    // Always show preloader on every page load/refresh
    // Hide body scroll and add class when preloader is visible
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden'
      document.body.classList.add('preloader-active')
      console.log('Preloader: Body overflow hidden, class added')
    }
    
    const timer = setTimeout(() => {
      console.log('Preloader finishing on page:', window.location.pathname)
      setIsVisible(false)
      // Restore body scroll and remove class when preloader is hidden
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'unset'
        document.body.classList.remove('preloader-active')
        console.log('Preloader: Body overflow restored, class removed')
      }
    }, 2500) // Increased to 2.5 seconds for better visibility

    return () => {
      clearTimeout(timer)
      // Cleanup: restore body scroll and remove class
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'unset'
        document.body.classList.remove('preloader-active')
      }
    }
  }, [])

  if (!isMounted) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="preloader-logo">
            <svg width="120" height="120" viewBox="0 0 120 120">
              <motion.circle
                cx="60"
                cy="60"
                r="50"
                className="logo-circle"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <motion.path
                className="logo-molecule"
                d="M30 60 L90 60 M60 30 L60 90 M45 45 L75 75 M45 75 L75 45"
                stroke="#ffffff"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
              />
            </svg>
          </div>
          <motion.div
            className="loading-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Loading Excellence...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
