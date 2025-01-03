'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function LoadingBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    })
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    // glow dots
    const createGlowingDots = () => {
      const geometry = new THREE.BufferGeometry()
      const positions = []
      const colors = []
      const sizes = []

      const color1 = new THREE.Color(0x66FCF1)
      const color2 = new THREE.Color(0xFF69B4)

      
      for (let i = 0; i < 200; i++) {
        let x, y
        const isCorner = Math.random() < 0.3

        if (isCorner) {
          // Corner clusters
          x = (Math.random() < 0.5 ? -1 : 1) * (3.5 + Math.random())
          y = (Math.random() < 0.5 ? -1 : 1) * (2 + Math.random())
        } else {
         
          if (Math.random() < 0.5) {
            x = (Math.random() * 8 - 4)
            y = (Math.random() < 0.5 ? -2 : 2) * (0.8 + Math.random() * 0.4)
          } else {
            x = (Math.random() < 0.5 ? -4 : 4) * (0.8 + Math.random() * 0.4)
            y = (Math.random() * 4 - 2)
          }
        }

        
        const distanceFromCenter = Math.sqrt(x * x + y * y)
        if (distanceFromCenter < 2) {
          continue
        }

        positions.push(x, y, 0)

        
        const gradientFactor = (x + 4) / 8 
        const mixedColor = color1.clone().lerp(color2, gradientFactor)
        colors.push(mixedColor.r, mixedColor.g, mixedColor.b)

        // Varying sizes with some larger dots
        sizes.push(Math.random() < 0.2 ? Math.random() * 0.15 + 0.05 : Math.random() * 0.05 + 0.02)
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
      geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1))

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
        },
        vertexShader: `
          attribute float size;
          varying vec3 vColor;
          uniform float time;
          void main() {
            vColor = color;
            vec3 pos = position;
            // Subtle floating movement
            pos.x += sin(time * 0.2 + position.y) * 0.02;
            pos.y += cos(time * 0.2 + position.x) * 0.02;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            float r = distance(gl_PointCoord, vec2(0.5));
            if (r > 0.5) discard;
            float strength = 1.0 - (r * 2.0);
            gl_FragColor = vec4(vColor, strength * 0.8);
          }
        `,
        transparent: true,
        vertexColors: true,
      })

      return new THREE.Points(geometry, material)
    }

    // Create connecting lines
    const createConnectingLines = (points: THREE.Points) => {
      const positions = points.geometry.attributes.position.array
      const linePositions = []
      const lineColors = []
      const color = new THREE.Color(0x66FCF1)

      for (let i = 0; i < positions.length; i += 3) {
        for (let j = i + 3; j < positions.length; j += 3) {
          const x1 = positions[i], y1 = positions[i + 1]
          const x2 = positions[j], y2 = positions[j + 1]
          
          const midX = (x1 + x2) / 2
          const midY = (y1 + y2) / 2
          const distanceFromCenter = Math.sqrt(midX * midX + midY * midY)
          
          const distance = Math.sqrt(
            Math.pow(x2 - x1, 2) +
            Math.pow(y2 - y1, 2)
          )
          
          // Only connect nearby points and avoid center
          if (distance < 1 && distanceFromCenter > 2) {
            linePositions.push(x1, y1, 0, x2, y2, 0)
            
            const opacity = 1 - (distance / 1)
            lineColors.push(
              color.r, color.g, color.b, opacity,
              color.r, color.g, color.b, opacity
            )
          }
        }
      }

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 4))

      const material = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.15,
      })

      return new THREE.LineSegments(geometry, material)
    }

    const dots = createGlowingDots()
    const lines = createConnectingLines(dots)
    
    scene.add(dots)
    scene.add(lines)

    camera.position.z = 5

    //  mouse interaction
    const mouse = new THREE.Vector2()
    const targetRotation = new THREE.Vector2()
    
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      
      targetRotation.x = mouse.y * 0.01
      targetRotation.y = mouse.x * 0.01
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Animation
    let frame: number
    const animate = () => {
      frame = requestAnimationFrame(animate)
      dots.material.uniforms.time.value = performance.now() / 1000
      
      scene.rotation.x += (targetRotation.x - scene.rotation.x) * 0.01
      scene.rotation.y += (targetRotation.y - scene.rotation.y) * 0.01

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(frame)
      mountRef.current?.removeChild(renderer.domElement)
      scene.clear()
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0" style={{ zIndex: 1 }} />
}