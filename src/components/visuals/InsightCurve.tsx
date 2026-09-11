import React, { useRef, useMemo } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { CanvasContainer, useReducedMotion } from "./CanvasContainer"

function InsightCurveScene() {
  const meshRef = useRef<THREE.Mesh>(null)
  const reducedMotion = useReducedMotion()

  const geometry = useMemo(() => {
    const points = [
      new THREE.Vector3(-2.2, -0.6, 0),
      new THREE.Vector3(-1.2, 0.4, 0.3),
      new THREE.Vector3(-0.2, -0.3, -0.2),
      new THREE.Vector3(0.8, 0.6, 0.4),
      new THREE.Vector3(1.8, 0.2, 0),
      new THREE.Vector3(2.3, 0.8, 0.2),
    ]
    const curve = new THREE.CatmullRomCurve3(points)
    return new THREE.TubeGeometry(curve, 64, 0.08, 16, false)
  }, [])

  useFrame((state) => {
    if (reducedMotion || !meshRef.current) return
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.y = Math.sin(t * 0.3) * 0.08
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 4]} intensity={2.0} color="#F2C6AA" />
      <directionalLight position={[-3, -2, 2]} intensity={1.0} color="#B7B0E8" />

      <mesh ref={meshRef} geometry={geometry} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color="#F2C6AA"
          roughness={0.2}
          metalness={0.3}
          emissive="#E6B18D"
          emissiveIntensity={0.25}
          clearcoat={0.8}
        />
      </mesh>
    </>
  )
}

function InsightCurveFallback() {
  return (
    <div className="w-full h-16 relative flex items-center justify-center">
      <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60" fill="none">
        <path
          d="M 10 42 Q 50 10, 90 35 T 185 15"
          stroke="#F2C6AA"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

export function InsightCurve() {
  return (
    <div className="w-full h-24 relative">
      <CanvasContainer
        fallback={<InsightCurveFallback />}
        cameraPosition={[0, 0, 4.5]}
        fov={40}
      >
        <InsightCurveScene />
      </CanvasContainer>
    </div>
  )
}
