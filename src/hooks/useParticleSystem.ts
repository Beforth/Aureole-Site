import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function useParticleSystem() {
  const particleContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!particleContainer.current) return

    const container = particleContainer.current
    const particleCount = 50
    const particles: HTMLDivElement[] = []

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      createParticle(container, particles)
    }

    function createParticle(container: HTMLDivElement, particles: HTMLDivElement[]) {
      const particle = document.createElement('div')
      particle.className = 'particle'
      particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: var(--primary-color);
        border-radius: 50%;
        opacity: 0.3;
        pointer-events: none;
        z-index: 1;
      `

      const x = Math.random() * window.innerWidth
      const y = Math.random() * window.innerHeight
      const duration = 10 + Math.random() * 20
      const delay = Math.random() * 10

      particle.style.left = x + 'px'
      particle.style.top = y + 'px'

      container.appendChild(particle)
      particles.push(particle)

      // Animate particle
      gsap.to(particle, {
        y: -100,
        opacity: 0,
        duration: duration,
        delay: delay,
        ease: 'none',
        repeat: -1,
        yoyo: false,
        onComplete: () => {
          // Reset particle position when animation completes
          particle.style.top = window.innerHeight + 'px'
          particle.style.opacity = '0.3'
        }
      })
    }

    // Handle window resize
    const handleResize = () => {
      particles.forEach(particle => {
        const x = Math.random() * window.innerWidth
        particle.style.left = x + 'px'
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      particles.forEach(particle => {
        gsap.killTweensOf(particle)
        particle.remove()
      })
    }
  }, [])

  return { particleContainer }
}
