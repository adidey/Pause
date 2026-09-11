import React, { useRef, useMemo } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { CanvasContainer, useReducedMotion } from "./CanvasContainer"

function WaveMesh() {
  const meshRef = useRef<THREE.Mesh>(null)
  const reducedMotion = useReducedMotion()

  // Create plane geometry with vertex subdivisions for wave displacement
  const { geometry, originalPositions } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(16, 8, 48, 24)
    const pos = geo.attributes.position
    const orig = new Float32Array(pos.array.length)
    orig.set(pos.array)
    return { geometry: geo, originalPositions: orig }
  }, [])

  useFrame((state) => {
    if (!meshRef.current || reducedMotion) return
    const t = state.clock.getElapsedTime() * 0.4 // Slow, organic motion
    const pos = meshRef.current.geometry.attributes.position

    for (let i = 0; i < pos.count; i++) {
      const u = originalPositions[i * 3]
      const v = originalPositions[i * 3 + 1]

      // Subtle organic wave deformation equation
      const waveX = Math.sin(u * 0.5 + t) * 0.25
      const waveY = Math.cos(v * 0.6 + t * 0.8) * 0.2
      const waveDiag = Math.sin((u + v) * 0.4 + t * 0.5) * 0.15

      pos.setZ(i, originalPositions[i * 3 + 2] + waveX + waveY + waveDiag)
    }

    pos.needsUpdate = true
  })

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[-Math.PI / 3.2, 0, 0.15]}
      position={[0, -2.4, -1]}
    >
      <meshPhysicalMaterial
        color="#121217"
        roughness={0.78}
        metalness={0.15}
        clearcoat={0.12}
        clearcoatRoughness={0.4}
        reflectivity={0.2}
      />
    </mesh>
  )
}

function DarkWaveScene() {
  return (
    <>
      {/* Soft Top Key Light */}
      <directionalLight position={[2, 6, 4]} intensity={1.4} color="#F8F7F4" />
      {/* Dim fill light for dark underside */}
      <directionalLight position={[-4, -4, -2]} intensity={0.2} color="#454555" />
      {/* Ambient background light */}
      <ambientLight intensity={0.25} />

      <WaveMesh />
    </>
  )
}

// Fallback SVG graphic for non-WebGL devices
function DarkWaveFallback() {
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] min-w-[900px] h-48 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 1200 240" fill="none" preserveAspectRatio="none">
        <path
          d="M 0 130 Q 350 200, 700 120 T 1200 140 L 1200 240 L 0 240 Z"
          fill="#121217"
        />
      </svg>
    </div>
  )
}

export function DarkWave() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-64 md:h-80 pointer-events-none overflow-hidden z-0">
      <CanvasContainer
        fallback={<DarkWaveFallback />}
        cameraPosition={[0, 0, 5]}
        fov={45}
      >
        <DarkWaveScene />
      </CanvasContainer>
    </div>
  )
}
