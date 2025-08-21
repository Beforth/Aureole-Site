import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface MousePosition {
  x: number
  y: number
}

export function useCustomCursor() {
  const cursorDot = useRef<HTMLDivElement>(null)
  const cursorRing = useRef<HTMLDivElement>(null)
  const mouse = useRef<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY

      // Animate cursor dot
      if (cursorDot.current) {
        gsap.to(cursorDot.current, {
          x: mouse.current.x - 4,
          y: mouse.current.y - 4,
          duration: 0.1,
          ease: 'power2.out'
        })
      }

      // Animate cursor ring
      if (cursorRing.current) {
        gsap.to(cursorRing.current, {
          x: mouse.current.x - 16,
          y: mouse.current.y - 16,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
    }

    const handleMouseEnter = () => {
      if (cursorDot.current && cursorRing.current) {
        gsap.to([cursorDot.current, cursorRing.current], {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
    }

    const handleMouseLeave = () => {
      if (cursorDot.current && cursorRing.current) {
        gsap.to([cursorDot.current, cursorRing.current], {
          opacity: 0,
          scale: 0,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
    }

    // Magnetic effect for interactive elements
    const magneticElements = document.querySelectorAll('[data-magnetic]')
    
    magneticElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        if (cursorRing.current) {
          gsap.to(cursorRing.current, {
            scale: 2,
            duration: 0.3,
            ease: 'power2.out'
          })
        }
      })
      
      element.addEventListener('mouseleave', () => {
        if (cursorRing.current) {
          gsap.to(cursorRing.current, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          })
        }
      })
      
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        
        gsap.to(element, {
          x: x * 0.1,
          y: y * 0.1,
          duration: 0.3,
          ease: 'power2.out'
        })
      })
      
      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        })
      })
    })

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return { cursorDot, cursorRing }
}
