import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ThreeBlobBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight

    // Scene
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, -0.5, 5)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    container.appendChild(renderer.domElement)

    // Geometry: Organic undulating wave blob landscape
    const geometry = new THREE.PlaneGeometry(14, 7, 64, 64)

    // Store original positions for noise displacement
    const posAttribute = geometry.attributes.position
    const originalPositions = new Float32Array(posAttribute.array.length)
    originalPositions.set(posAttribute.array)

    // Material: Dark charcoal velvet / matte metallic
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#0A0B10"),
      roughness: 0.35,
      metalness: 0.6,
      flatShading: false,
    })

    const mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.x = -Math.PI * 0.38
    mesh.position.set(0, -1.2, 0)
    scene.add(mesh)

    // Lighting
    const ambientLight = new THREE.AmbientLight("#121420", 1.8)
    scene.add(ambientLight)

    // Key directional light for glossy 3D ridge highlights
    const dirLight = new THREE.DirectionalLight("#A4B3D6", 2.2)
    dirLight.position.set(2, 6, 4)
    scene.add(dirLight)

    // Left purple glow light matching the HOBBIES card
    const purpleLight = new THREE.PointLight("#8B5CF6", 4.5, 8)
    purpleLight.position.set(-2.5, 0.5, 1)
    scene.add(purpleLight)

    // Right cyan glow light matching the FITNESS card
    const cyanLight = new THREE.PointLight("#06B6D4", 4.0, 8)
    cyanLight.position.set(2.5, 0.5, 1)
    scene.add(cyanLight)

    // Animation loop: Simulating wave ripple movement
    let animationFrameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      const positions = geometry.attributes.position.array as Float32Array

      for (let i = 0; i < positions.length; i += 3) {
        const u = originalPositions[i]
        const v = originalPositions[i + 1]

        // Compound sine wave displacement for 3D organic blob ridges
        const z =
          Math.sin(u * 1.2 + elapsedTime * 0.8) * 0.4 +
          Math.cos(v * 1.5 + elapsedTime * 0.6) * 0.35 +
          Math.sin((u + v) * 0.8 + elapsedTime * 0.4) * 0.25

        positions[i + 2] = z
      }

      geometry.attributes.position.needsUpdate = true
      geometry.computeVertexNormals()

      // Gently sway point lights
      purpleLight.position.x = -2.5 + Math.sin(elapsedTime * 0.5) * 0.3
      cyanLight.position.x = 2.5 + Math.cos(elapsedTime * 0.5) * 0.3

      renderer.render(scene, camera)
    }

    animate()

    // Handle Resize
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute bottom-0 left-0 right-0 w-full h-[620px] pointer-events-none overflow-hidden z-0"
      style={{
        maskImage: "linear-gradient(to bottom, transparent 0%, black 25%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 25%)",
      }}
    />
  )
}
