import React, { Component, ErrorInfo, ReactNode, useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"

interface Props {
  children: ReactNode
  fallback?: ReactNode
  className?: string
  style?: React.CSSProperties
  cameraPosition?: [number, number, number]
  fov?: number
}

// 1. WebGL Support Detector
export function checkWebGLSupport(): boolean {
  try {
    const canvas = document.createElement("canvas")
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    )
  } catch {
    return false
  }
}

// 2. Hook for Reduced Motion Preference
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mediaQuery.matches)
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches)
    mediaQuery.addEventListener("change", listener)
    return () => mediaQuery.removeEventListener("change", listener)
  }, [])
  return reduced
}

// 3. React Error Boundary for WebGL Crashes
interface ErrorBoundaryState {
  hasError: boolean
}

class WebGLErrorBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn("R3F Canvas Error Boundary caught an exception:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ? <>{this.props.fallback}</> : null
    }
    return this.props.children
  }
}

// 4. Main CanvasContainer Component
export function CanvasContainer({
  children,
  fallback,
  className = "",
  style,
  cameraPosition = [0, 0, 6],
  fov = 35,
}: Props) {
  const [webGLAvailable, setWebGLAvailable] = useState<boolean | null>(null)

  useEffect(() => {
    setWebGLAvailable(checkWebGLSupport())
  }, [])

  // Show fallback if WebGL is unavailable or during SSR
  if (webGLAvailable === false) {
    return fallback ? <div className={className} style={style}>{fallback}</div> : null
  }

  if (webGLAvailable === null) {
    return <div className={className} style={style} />
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      style={{ position: "relative", width: "100%", height: "100%", ...style }}
    >
      <WebGLErrorBoundary fallback={fallback}>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: cameraPosition, fov }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          style={{ pointerEvents: "none" }}
        >
          {children}
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  )
}
