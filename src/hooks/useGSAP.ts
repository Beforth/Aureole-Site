import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function useGSAP() {
  const scope = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Performance optimizations
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.globalTimeline.timeScale(0.5)
    }

    // Pause animations when tab is not visible
    const handleVisibilityChange = () => {
      if (document.hidden) {
        gsap.globalTimeline.pause()
      } else {
        gsap.globalTimeline.resume()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Handle window resize
    const handleResize = () => {
      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('resize', handleResize)
      ScrollTrigger.killAll()
    }
  }, [])

  return { scope }
}

// GSAP Animation Utilities
export const gsapUtils = {
  // Fade in animation
  fadeIn: (element: string | Element, delay = 0) => {
    return gsap.fromTo(element, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay, ease: 'power2.out' }
    )
  },

  // Slide in from left
  slideInLeft: (element: string | Element, delay = 0) => {
    return gsap.fromTo(element,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 0.8, delay, ease: 'power2.out' }
    )
  },

  // Slide in from right
  slideInRight: (element: string | Element, delay = 0) => {
    return gsap.fromTo(element,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 0.8, delay, ease: 'power2.out' }
    )
  },

  // Scale in animation
  scaleIn: (element: string | Element, delay = 0) => {
    return gsap.fromTo(element,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, delay, ease: 'back.out(1.7)' }
    )
  },

  // Stagger animation for multiple elements
  stagger: (elements: string | Element[], stagger = 0.1, delay = 0) => {
    return gsap.fromTo(elements,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay, stagger, ease: 'power2.out' }
    )
  },

  // Scroll-triggered animation
  scrollTrigger: (element: string | Element, animation: any, trigger: string, start = 'top 80%') => {
    return gsap.fromTo(element, animation.from, {
      ...animation.to,
      scrollTrigger: {
        trigger,
        start,
        end: 'bottom 20%',
        scrub: 1,
        toggleActions: 'play none none reverse'
      }
    })
  },

  // Parallax effect
  parallax: (element: string | Element, trigger: string, y = -100) => {
    return gsap.to(element, {
      y,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    })
  }
}
