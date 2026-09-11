import React from "react"

/**
 * 1. IridescentSphereVisual
 * Translucent 3D iridescent floating spheres with soft ambient lavender & peach lighting.
 */
export function IridescentSphereVisual() {
  return (
    <div className="relative w-full h-32 flex items-center justify-center overflow-hidden rounded-2xl">
      {/* Background ambient light blur */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(216, 207, 255, 0.45) 0%, rgba(248, 212, 190, 0.25) 50%, transparent 80%)",
          filter: "blur(24px)",
        }}
      />

      {/* Main Iridescent Sphere */}
      <div
        className="relative w-24 h-24 rounded-full shadow-2xl transition-transform duration-700 hover:scale-105"
        style={{
          background: `
            radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.95) 0%, rgba(220, 212, 255, 0.85) 30%, rgba(175, 160, 235, 0.65) 60%, rgba(60, 50, 95, 0.85) 100%)
          `,
          boxShadow:
            "inset -6px -6px 20px rgba(40, 30, 80, 0.4), inset 4px 4px 14px rgba(255, 255, 255, 0.9), 0 12px 32px rgba(130, 115, 200, 0.35)",
        }}
      >
        {/* Subtle highlight ring overlay */}
        <div
          className="absolute inset-1 rounded-full opacity-60 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.8) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Smaller secondary floating orb */}
      <div
        className="absolute bottom-2 left-6 w-12 h-12 rounded-full shadow-lg"
        style={{
          background: `
            radial-gradient(circle at 35% 30%, rgba(255, 240, 230, 0.9) 0%, rgba(245, 195, 170, 0.8) 40%, rgba(130, 90, 80, 0.7) 100%)
          `,
          boxShadow:
            "inset -3px -3px 10px rgba(60, 30, 20, 0.3), inset 2px 2px 8px rgba(255, 255, 255, 0.8), 0 8px 20px rgba(235, 160, 130, 0.3)",
        }}
      />
    </div>
  )
}

/**
 * 2. StackedGlassVisual
 * 3D translucent frosted glass slates with depth and subtle drop shadow.
 */
export function StackedGlassVisual() {
  return (
    <div className="relative w-full h-32 flex items-center justify-center overflow-hidden">
      {/* Back slate */}
      <div
        className="absolute w-28 h-20 rounded-xl"
        style={{
          background: "linear-gradient(135deg, rgba(200, 205, 220, 0.5) 0%, rgba(160, 165, 185, 0.25) 100%)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          transform: "translate(-20px, 12px) rotate(-8deg)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
        }}
      />

      {/* Middle slate */}
      <div
        className="absolute w-28 h-20 rounded-xl"
        style={{
          background: "linear-gradient(135deg, rgba(220, 225, 240, 0.65) 0%, rgba(180, 185, 210, 0.35) 100%)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.7)",
          transform: "translate(-4px, 0px) rotate(-2deg)",
          boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
        }}
      />

      {/* Front slate */}
      <div
        className="absolute w-28 h-20 rounded-xl"
        style={{
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(225, 230, 245, 0.55) 100%)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.9)",
          transform: "translate(16px, -10px) rotate(4deg)",
          boxShadow: "0 14px 32px rgba(12, 12, 20, 0.12), inset 0 1px 0 rgba(255,255,255,0.8)",
        }}
      />
    </div>
  )
}

/**
 * 3. OrbitalRingVisual
 * Stacked 3D glass discs/rings.
 */
export function OrbitalRingVisual() {
  return (
    <div className="relative w-full h-32 flex items-center justify-center">
      <div className="relative w-28 h-28 flex flex-col items-center justify-center gap-1">
        {/* Ring 1 */}
        <div
          className="w-24 h-5 rounded-full"
          style={{
            background: "linear-gradient(90deg, rgba(40,40,50,0.85) 0%, rgba(80,80,95,0.7) 50%, rgba(25,25,35,0.9) 100%)",
            border: "1px solid rgba(255,255,255,0.15)",
            boxShadow: "0 4px 10px rgba(0,0,0,0.18)",
            transform: "rotateX(60deg) scale(0.9)",
          }}
        />
        {/* Ring 2 */}
        <div
          className="w-28 h-6 rounded-full -mt-2"
          style={{
            background: "linear-gradient(90deg, rgba(70,70,85,0.9) 0%, rgba(120,120,140,0.8) 50%, rgba(40,40,55,0.95) 100%)",
            border: "1px solid rgba(255,255,255,0.25)",
            boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
            transform: "rotateX(60deg) scale(1)",
          }}
        />
        {/* Ring 3 */}
        <div
          className="w-24 h-5 rounded-full -mt-2"
          style={{
            background: "linear-gradient(90deg, rgba(20,20,28,0.95) 0%, rgba(50,50,65,0.8) 50%, rgba(15,15,22,1) 100%)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
            transform: "rotateX(60deg) scale(0.92)",
          }}
        />
      </div>
    </div>
  )
}

/**
 * 4. ColumnObjectVisual
 * 3 vertical 3D gradient cylinder blocks with glossy lighting.
 */
export function ColumnObjectVisual() {
  return (
    <div className="relative w-full h-32 flex items-end justify-center gap-3 pb-2">
      {/* Column 1 (Shortest) */}
      <div
        className="w-7 rounded-full"
        style={{
          height: "45px",
          background: "linear-gradient(180deg, #6B6880 0%, #353344 60%, #1A1924 100%)",
          boxShadow: "inset 2px 2px 4px rgba(255,255,255,0.25), inset -2px -2px 4px rgba(0,0,0,0.5), 0 8px 16px rgba(0,0,0,0.15)",
        }}
      />
      {/* Column 2 (Tallest) */}
      <div
        className="w-7 rounded-full"
        style={{
          height: "80px",
          background: "linear-gradient(180deg, #2D2C38 0%, #15141D 60%, #09090E 100%)",
          boxShadow: "inset 2px 2px 4px rgba(255,255,255,0.3), inset -2px -2px 4px rgba(0,0,0,0.6), 0 10px 20px rgba(0,0,0,0.25)",
        }}
      />
      {/* Column 3 (Medium) */}
      <div
        className="w-7 rounded-full"
        style={{
          height: "60px",
          background: "linear-gradient(180deg, #524F66 0%, #2A2837 60%, #12111A 100%)",
          boxShadow: "inset 2px 2px 4px rgba(255,255,255,0.2), inset -2px -2px 4px rgba(0,0,0,0.5), 0 8px 16px rgba(0,0,0,0.18)",
        }}
      />
    </div>
  )
}

/**
 * 5. TrendLineVisual
 * Gold/amber flowing SVG line curve for Decision Rate card.
 */
export function TrendLineVisual() {
  return (
    <div className="w-full h-16 relative flex items-center justify-center">
      <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60" fill="none">
        <defs>
          <linearGradient id="trendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E6B18D" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#F2C6AA" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#B7B0E8" stopOpacity="1" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient glow line */}
        <path
          d="M 10 42 Q 50 10, 90 35 T 185 15"
          stroke="url(#trendGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.3"
          filter="url(#glow)"
        />

        {/* Crisp foreground line */}
        <path
          d="M 10 42 Q 50 10, 90 35 T 185 15"
          stroke="url(#trendGradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Endpoint indicator dot */}
        <circle cx="185" cy="15" r="4" fill="#B7B0E8" />
        <circle cx="185" cy="15" r="7" stroke="#B7B0E8" strokeWidth="1.5" fill="none" opacity="0.6" />
      </svg>
    </div>
  )
}

/**
 * 6. DarkGroundingVisual
 * Dark glossy organic 3D grounding wave shapes across the bottom of Wants section.
 */
export function DarkGroundingVisual() {
  return (
    <div className="relative w-full h-44 md:h-56 mt-[-40px] pointer-events-none overflow-hidden z-0">
      <svg
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] min-w-[900px] h-full"
        viewBox="0 0 1200 240"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <radialGradient id="darkWaveGrad" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#2A2A34" />
            <stop offset="45%" stopColor="#14141A" />
            <stop offset="100%" stopColor="#0B0B0F" />
          </radialGradient>

          <radialGradient id="waveHighlight" cx="35%" cy="20%" r="45%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.15)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </radialGradient>
        </defs>

        {/* Back Wave */}
        <path
          d="M 0 160 Q 300 90, 600 130 T 1200 100 L 1200 240 L 0 240 Z"
          fill="url(#darkWaveGrad)"
          opacity="0.8"
        />

        {/* Front Wave with highlight */}
        <path
          d="M 0 130 Q 350 200, 700 120 T 1200 140 L 1200 240 L 0 240 Z"
          fill="url(#darkWaveGrad)"
        />

        {/* Atmospheric highlight contour */}
        <path
          d="M 0 130 Q 350 200, 700 120 T 1200 140"
          stroke="url(#waveHighlight)"
          strokeWidth="2.5"
          fill="none"
        />
      </svg>
    </div>
  )
}
