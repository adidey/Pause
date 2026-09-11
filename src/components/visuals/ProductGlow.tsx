import React from "react"

interface ProductGlowProps {
  context?: string
}

export function ProductGlow({ context = "Work" }: ProductGlowProps) {
  // Dominant contextual illumination color
  const glowColors: Record<string, { main: string; secondary: string }> = {
    Work: { main: "rgba(183, 176, 232, 0.45)", secondary: "rgba(216, 207, 255, 0.2)" },
    Hobbies: { main: "rgba(242, 198, 170, 0.45)", secondary: "rgba(248, 212, 190, 0.2)" },
    Fitness: { main: "rgba(169, 217, 200, 0.45)", secondary: "rgba(208, 234, 223, 0.2)" },
    Travel: { main: "rgba(184, 215, 242, 0.45)", secondary: "rgba(212, 236, 253, 0.2)" },
    Home: { main: "rgba(246, 239, 230, 0.6)", secondary: "rgba(254, 240, 204, 0.3)" },
    Personal: { main: "rgba(228, 247, 216, 0.5)", secondary: "rgba(200, 235, 190, 0.2)" },
  }

  const color = glowColors[context] || glowColors.Work

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-[32px]">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full transition-all duration-700"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color.main} 0%, ${color.secondary} 45%, transparent 75%)`,
          filter: "blur(50px)",
        }}
      />
    </div>
  )
}
