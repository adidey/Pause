import { useEffect, useRef } from "react"
import * as THREE from "three"

interface Props {
  step: number
}

export function Onboarding3DCanvas({ step }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const meshRef = useRef<THREE.Mesh | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.z = 4.5

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Geometry & Material
    const geometry = new THREE.TorusKnotGeometry(0.8, 0.28, 128, 32)
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#0C0C14"),
      roughness: 0.2,
      metalness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    })

    const mesh = new THREE.Mesh(geometry, material)
    meshRef.current = mesh
    scene.add(mesh)

    // Lights
    const ambientLight = new THREE.AmbientLight("#FFFFFF", 1.2)
    scene.add(ambientLight)

    const light1 = new THREE.PointLight("#8B5CF6", 4, 10)
    light1.position.set(2, 3, 4)
    scene.add(light1)

    const light2 = new THREE.PointLight("#06B6D4", 3, 10)
    light2.position.set(-2, -2, 3)
    scene.add(light2)

    let animId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      if (meshRef.current) {
        meshRef.current.rotation.x = t * 0.4
        meshRef.current.rotation.y = t * 0.6
      }
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  // Transition color/rotation on step change
  useEffect(() => {
    if (!meshRef.current) return
    const mat = meshRef.current.material as THREE.MeshPhysicalMaterial
    if (step === 0) {
      mat.color.set("#0C0C14")
    } else if (step === 1) {
      mat.color.set("#1E1B4B")
    } else {
      mat.color.set("#064E3B")
    }
  }, [step])

  return <div ref={containerRef} className="w-full h-48 flex items-center justify-center" />
}
