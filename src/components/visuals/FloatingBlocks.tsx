import React, { useRef } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { CanvasContainer, useReducedMotion } from "./CanvasContainer"

function FloatingBlocksScene() {
  const groupRef = useRef<THREE.Group>(null)
  const reducedMotion = useReducedMotion()

  useFrame((state) => {
    if (reducedMotion || !groupRef.current) return
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.1
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 4]} intensity={2.0} color="#FFFFFF" />
      <directionalLight position={[-3, -2, -1]} intensity={0.3} color="#B7B0E8" />

      <group ref={groupRef} position={[0, -0.6, 0]} rotation={[0.2, 0.4, 0]}>
        {/* Block 1 (Short Left) */}
        <mesh position={[-0.8, 0.4, 0]}>
          <boxGeometry args={[0.55, 0.8, 0.55]} />
          <meshPhysicalMaterial
            color="#484658"
            roughness={0.35}
            metalness={0.3}
            clearcoat={0.4}
          />
        </mesh>

        {/* Block 2 (Tall Center) */}
        <mesh position={[0, 0.9, 0.2]}>
          <boxGeometry args={[0.6, 1.8, 0.6]} />
          <meshPhysicalMaterial
            color="#12121A"
            roughness={0.25}
            metalness={0.5}
            clearcoat={0.7}
            reflectivity={0.9}
          />
        </mesh>

        {/* Block 3 (Medium Right) */}
        <mesh position={[0.8, 0.65, -0.1]}>
          <boxGeometry args={[0.55, 1.3, 0.55]} />
          <meshPhysicalMaterial
            color="#2A2938"
            roughness={0.3}
            metalness={0.4}
            clearcoat={0.5}
          />
        </mesh>
      </group>
    </>
  )
}

function FloatingBlocksFallback() {
  return (
    <div className="relative w-full h-full flex items-end justify-center gap-2 pb-2">
      <div className="w-6 h-12 rounded-t-md bg-[#484658]" />
      <div className="w-7 h-20 rounded-t-md bg-[#12121A]" />
      <div className="w-6 h-16 rounded-t-md bg-[#2A2938]" />
    </div>
  )
}

export function FloatingBlocks() {
  return (
    <div className="w-full h-32 relative">
      <CanvasContainer
        fallback={<FloatingBlocksFallback />}
        cameraPosition={[0, 0, 4.5]}
        fov={40}
      >
        <FloatingBlocksScene />
      </CanvasContainer>
    </div>
  )
}
