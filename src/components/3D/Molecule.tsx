'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Molecule() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    })
    renderer.setSize(container.offsetWidth, container.offsetHeight)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      container.offsetWidth / container.offsetHeight,
      0.1,
      1000
    )
    camera.position.z = 5
    cameraRef.current = camera

    // Create molecule
    createMolecule(scene)

    // Animation loop
    function animate() {
      requestAnimationFrame(animate)

      // Rotate molecule
      if (scene.children.length > 0) {
        scene.children.forEach(child => {
          child.rotation.x += 0.005
          child.rotation.y += 0.01
        })
      }

      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (camera && renderer && container) {
        camera.aspect = container.offsetWidth / container.offsetHeight
        camera.updateProjectionMatrix()
        renderer.setSize(container.offsetWidth, container.offsetHeight)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (renderer && container) {
        container.removeChild(renderer.domElement)
        renderer.dispose()
      }
    }
  }, [])

  function createMolecule(scene: THREE.Scene) {
    // Create central atom
    const centralGeometry = new THREE.SphereGeometry(0.3, 32, 32)
    const centralMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x2298d2,
      transparent: true,
      opacity: 0.8
    })
    const centralAtom = new THREE.Mesh(centralGeometry, centralMaterial)
    scene.add(centralAtom)

    // Create surrounding atoms
    const atomCount = 6
    for (let i = 0; i < atomCount; i++) {
      const angle = (i / atomCount) * Math.PI * 2
      const radius = 1.5
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius

      const atomGeometry = new THREE.SphereGeometry(0.2, 16, 16)
      const atomMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x455975,
        transparent: true,
        opacity: 0.6
      })
      const atom = new THREE.Mesh(atomGeometry, atomMaterial)
      atom.position.set(x, y, 0)
      scene.add(atom)

      // Create bonds
      const bondGeometry = new THREE.CylinderGeometry(0.02, 0.02, radius, 8)
      const bondMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x1b243f,
        transparent: true,
        opacity: 0.4
      })
      const bond = new THREE.Mesh(bondGeometry, bondMaterial)
      bond.position.set(x/2, y/2, 0)
      bond.rotation.z = Math.atan2(y, x)
      scene.add(bond)
    }

    // Add some additional smaller atoms for complexity
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2 + Math.PI / 4
      const radius = 2.2
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius

      const atomGeometry = new THREE.SphereGeometry(0.15, 12, 12)
      const atomMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x2298d2,
        transparent: true,
        opacity: 0.4
      })
      const atom = new THREE.Mesh(atomGeometry, atomMaterial)
      atom.position.set(x, y, 0)
      scene.add(atom)
    }
  }

  return (
    <div 
      ref={containerRef} 
      className="molecule-container"
      style={{ width: '100%', height: '100%' }}
    />
  )
}
