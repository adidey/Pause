import React, { useRef } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { CanvasContainer, useReducedMotion } from "./CanvasContainer"

interface IridescentOrbProps {
  mode: "insight" | "profile"
}

// Insight Mode: 2 soft translucent resin spheres floating slowly
function InsightOrbsScene() {
  const orb1Ref = useRef<THREE.Mesh>(null)
  const orb2Ref = useRef<THREE.Mesh>(null)
  const reducedMotion = useReducedMotion()

  useFrame((state) => {
    if (reducedMotion) return
    const t = state.clock.getElapsedTime()
    if (orb1Ref.current) {
      orb1Ref.current.position.y = Math.sin(t * 0.8) * 0.12
      orb1Ref.current.position.x = Math.cos(t * 0.5) * 0.08
    }
    if (orb2Ref.current) {
      orb2Ref.current.position.y = -Math.sin(t * 0.7 + 1) * 0.1
      orb2Ref.current.position.x = -Math.cos(t * 0.6 + 1) * 0.06
    }
  })

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.5} color="#DCD6F7" />
      <directionalLight position={[-3, -2, 2]} intensity={0.8} color="#F8D4BE" />

      {/* Main Larger Translucent Glass Sphere */}
      <mesh ref={orb1Ref} position={[0.2, 0, 0]}>
        <sphereGeometry args={[1.1, 48, 48]} />
        <meshPhysicalMaterial
          color="#B7B0E8"
          roughness={0.15}
          transmission={0.65}
          thickness={1.2}
          ior={1.45}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
        />
      </mesh>

      {/* Secondary Peach Accent Orb */}
      <mesh ref={orb2Ref} position={[-1.2, -0.6, -0.4]}>
        <sphereGeometry args={[0.65, 36, 36]} />
        <meshPhysicalMaterial
          color="#F2C6AA"
          roughness={0.2}
          transmission={0.7}
          thickness={0.8}
          ior={1.4}
          clearcoat={0.9}
        />
      </mesh>
    </>
  )
}

// Profile Mode: 1 large dark charcoal sphere with Fresnel edge highlights
function ProfileOrbScene() {
  const orbRef = useRef<THREE.Mesh>(null)
  const reducedMotion = useReducedMotion()

  useFrame((state) => {
    if (reducedMotion || !orbRef.current) return
    orbRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
    orbRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1
  })

  return (
    <>
      <ambientLight intensity={0.3} />
      {/* Crisp Rim Light for Fresnel edge highlight */}
      <directionalLight position={[5, 4, 3]} intensity={2.2} color="#FFFFFF" />
      <directionalLight position={[-4, -3, -2]} intensity={0.4} color="#B7B0E8" />

      <mesh ref={orbRef} position={[0.6, -0.2, 0]}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshPhysicalMaterial
          color="#161620"
          roughness={0.35}
          metalness={0.4}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          reflectivity={0.8}
        />
      </mesh>
    </>
  )
}

// Fallback CSS rendering
function InsightOrbFallback() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className="w-24 h-24 rounded-full"
        style={{
          background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9) 0%, rgba(183,176,232,0.8) 40%, rgba(90,80,140,0.7) 100%)",
          boxShadow: "0 12px 32px rgba(183,176,232,0.35)",
        }}
      />
    </div>
  )
}

function ProfileOrbFallback() {
  return (
    <div
      className="absolute -right-8 -top-8 w-56 h-56 rounded-full"
      style={{
        background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.4) 0%, rgba(183,176,232,0.2) 35%, rgba(17,17,24,0.95) 75%)",
        boxShadow: "inset 0 0 40px rgba(0,0,0,0.8)",
      }}
    />
  )
}

export function IridescentOrb({ mode }: IridescentOrbProps) {
  if (mode === "insight") {
    return (
      <div className="w-full h-32 relative">
        <CanvasContainer
          fallback={<InsightOrbFallback />}
          cameraPosition={[0, 0, 4.5]}
          fov={40}
        >
          <InsightOrbsScene />
        </CanvasContainer>
      </div>
    )
  }

  return (
    <div className="absolute -right-12 -top-12 w-64 h-64 pointer-events-none z-0">
      <CanvasContainer
        fallback={<ProfileOrbFallback />}
        cameraPosition={[0, 0, 4.5]}
        fov={45}
      >
        <ProfileOrbScene />
      </CanvasContainer>
    </div>
  )
}
