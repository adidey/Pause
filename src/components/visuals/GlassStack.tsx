import React, { useRef } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { CanvasContainer, useReducedMotion } from "./CanvasContainer"

function GlassStackScene() {
  const groupRef = useRef<THREE.Group>(null)
  const reducedMotion = useReducedMotion()

  useFrame((state) => {
    if (reducedMotion || !groupRef.current) return
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.08
    groupRef.current.rotation.x = Math.cos(t * 0.3) * 0.05
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 5]} intensity={1.8} color="#FFFFFF" />
      <directionalLight position={[-3, -3, 2]} intensity={0.4} color="#B7B0E8" />

      <group ref={groupRef} position={[0, -0.1, 0]}>
        {/* Back Slate */}
        <mesh position={[-0.4, 0.3, -0.5]} rotation={[-0.2, 0.2, -0.1]}>
          <boxGeometry args={[2.2, 1.4, 0.08]} />
          <meshPhysicalMaterial
            color="#EAEAEA"
            roughness={0.25}
            transmission={0.55}
            thickness={0.4}
            ior={1.4}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Middle Slate */}
        <mesh position={[-0.1, 0, 0]} rotation={[-0.15, 0.1, -0.05]}>
          <boxGeometry args={[2.2, 1.4, 0.08]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            roughness={0.2}
            transmission={0.65}
            thickness={0.5}
            ior={1.45}
            clearcoat={0.5}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Front Slate */}
        <mesh position={[0.3, -0.3, 0.5]} rotation={[-0.1, 0, 0.05]}>
          <boxGeometry args={[2.2, 1.4, 0.08]} />
          <meshPhysicalMaterial
            color="#F5F4F8"
            roughness={0.15}
            transmission={0.75}
            thickness={0.6}
            ior={1.5}
            clearcoat={0.8}
            reflectivity={0.9}
            transparent
            opacity={0.95}
          />
        </mesh>
      </group>
    </>
  )
}

function GlassStackFallback() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="w-28 h-20 rounded-xl bg-white/70 backdrop-blur-md border border-white shadow-lg transform -rotate-3" />
    </div>
  )
}

export function GlassStack() {
  return (
    <div className="w-full h-32 relative">
      <CanvasContainer
        fallback={<GlassStackFallback />}
        cameraPosition={[0, 0, 4.2]}
        fov={40}
      >
        <GlassStackScene />
      </CanvasContainer>
    </div>
  )
}
