import React, { useRef } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { CanvasContainer, useReducedMotion } from "./CanvasContainer"

function OrbitalRingScene() {
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const ring3Ref = useRef<THREE.Mesh>(null)
  const reducedMotion = useReducedMotion()

  useFrame((state) => {
    if (reducedMotion) return
    const t = state.clock.getElapsedTime()
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.15
    if (ring2Ref.current) ring2Ref.current.rotation.z = -t * 0.2
    if (ring3Ref.current) ring3Ref.current.rotation.z = t * 0.1
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 4]} intensity={1.8} color="#FFFFFF" />
      <directionalLight position={[-3, -3, 2]} intensity={0.5} color="#B7B0E8" />

      <group rotation={[1.1, 0.2, 0.4]}>
        {/* Ring 1 (Top/Inner) */}
        <mesh ref={ring1Ref} position={[0, 0, 0.3]}>
          <torusGeometry args={[1.2, 0.08, 24, 64]} />
          <meshPhysicalMaterial
            color="#2A2A36"
            roughness={0.2}
            metalness={0.8}
            clearcoat={0.6}
          />
        </mesh>

        {/* Ring 2 (Middle/Main) */}
        <mesh ref={ring2Ref} position={[0, 0, 0]}>
          <torusGeometry args={[1.6, 0.1, 24, 64]} />
          <meshPhysicalMaterial
            color="#14141E"
            roughness={0.15}
            metalness={0.9}
            clearcoat={0.9}
            reflectivity={0.95}
          />
        </mesh>

        {/* Ring 3 (Bottom/Outer) */}
        <mesh ref={ring3Ref} position={[0, 0, -0.3]}>
          <torusGeometry args={[1.35, 0.07, 24, 64]} />
          <meshPhysicalMaterial
            color="#4A4958"
            roughness={0.3}
            metalness={0.6}
          />
        </mesh>
      </group>
    </>
  )
}

function OrbitalRingFallback() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="w-24 h-24 rounded-full border-4 border-[#14141E] opacity-70 transform rotate-12" />
    </div>
  )
}

export function OrbitalRing() {
  return (
    <div className="w-full h-32 relative">
      <CanvasContainer
        fallback={<OrbitalRingFallback />}
        cameraPosition={[0, 0, 4.8]}
        fov={40}
      >
        <OrbitalRingScene />
      </CanvasContainer>
    </div>
  )
}
