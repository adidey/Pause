import React from "react"
import { Want } from "../types"
import {
  IridescentSphereVisual,
  StackedGlassVisual,
  OrbitalRingVisual,
  ColumnObjectVisual,
  TrendLineVisual,
} from "./InsightVisuals"

interface InsightsProps {
  wants: Want[]
}

export function InsightsBento({ wants }: InsightsProps) {
  const activeWants = wants.filter((w) => w.state !== "bought" && w.state !== "skipped")
  const skippedWants = wants.filter((w) => w.state === "skipped")
  const skippedTotal = skippedWants.reduce((sum, w) => sum + w.price, 0)
  const totalValue = wants.reduce((sum, w) => sum + w.price, 0)

  // Context breakdowns
  const contextSums: Record<string, number> = {
    Work: 0,
    Hobbies: 0,
    Fitness: 0,
    Home: 0,
    Travel: 0,
    Other: 0,
  }

  wants.forEach((w) => {
    if (contextSums[w.context] !== undefined) {
      contextSums[w.context] += w.price
    } else {
      contextSums["Other"] += w.price
    }
  })

  // Find biggest area of desire
  let topContext = "Work"
  let maxVal = 0
  Object.entries(contextSums).forEach(([ctx, val]) => {
    if (val > maxVal) {
      maxVal = val
      topContext = ctx
    }
  })

  return (
    <div className="w-full pt-8 md:pt-12 pb-20 screen-in">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="eyebrow-tag mb-2 flex items-center gap-2">
            <span className="inline-block w-1.5 h-3 bg-[#111118] rounded-full" />
            II INSIGHTS
          </div>
          <h1 className="editorial-headline mb-1">
            Your spending, lately.
          </h1>
          <p className="font-sans text-sm md:text-base text-[#596078] font-medium">
            A clearer view, not a lecture.
          </p>
        </div>

        {/* Date Filter Selector Pill */}
        <div className="flex items-center gap-2 bg-white border border-[#111118]/[0.08] px-4 py-2 rounded-full shadow-sm text-xs font-mono font-semibold text-[#111118] cursor-pointer hover:bg-[#F8F7F4] transition-colors w-fit">
          <span>Last 30 days</span>
          <span className="text-[#596078]">📅</span>
        </div>
      </div>

      {/* 12-Column Asymmetric Bento Grid */}
      <div className="bento-grid-12">
        
        {/* Card 1: DECISION RATE (Span 4, Dark Charcoal) */}
        <div className="bento-span-4 bento-card bento-card-dark p-7 flex flex-col justify-between min-h-[260px]">
          <div>
            <div className="eyebrow-tag text-white/50 mb-3">
              DECISION RATE
            </div>
            <div className="font-sans text-5xl font-black tracking-tight text-white mb-1">
              78%
            </div>
            <div className="font-sans text-sm text-white/70 font-medium">
              of wants are paused
            </div>
          </div>

          <TrendLineVisual />

          <div className="flex items-center justify-between text-xs font-mono text-emerald-400 pt-3 border-t border-white/10">
            <span>↑ 12%</span>
            <span className="text-white/40">vs. previous 30 days</span>
          </div>
        </div>

        {/* Card 2: TOTAL CONSIDERED (Span 4, Stacked Glass Visual) */}
        <div className="bento-span-4 bento-card bento-card-light p-7 flex flex-col justify-between min-h-[260px]">
          <div>
            <div className="eyebrow-tag mb-3">
              TOTAL CONSIDERED
            </div>
            <div className="font-sans text-5xl font-black tracking-tight text-[#111118] mb-1">
              {wants.length}
            </div>
            <div className="font-sans text-sm text-[#596078] font-medium">
              wants on your radar
            </div>
          </div>

          <StackedGlassVisual />
        </div>

        {/* Card 3: AVERAGE DECISION TIME (Span 4, Orbital Rings Visual) */}
        <div className="bento-span-4 bento-card bento-card-light p-7 flex flex-col justify-between min-h-[260px]">
          <div>
            <div className="eyebrow-tag mb-3">
              AVERAGE DECISION TIME
            </div>
            <div className="font-sans text-5xl font-black tracking-tight text-[#111118] mb-1">
              20 <span className="text-2xl font-bold text-[#596078]">days</span>
            </div>
            <div className="font-sans text-sm text-[#596078] font-medium">
              You're taking more time to decide.
            </div>
          </div>

          <OrbitalRingVisual />
        </div>

        {/* Card 4: POTENTIAL SPENDING AVOIDED (Span 7, Iridescent Spheres) */}
        <div className="bento-span-7 bento-card bento-card-light p-7 flex flex-col justify-between min-h-[260px]">
          <div className="flex justify-between items-start">
            <div>
              <div className="eyebrow-tag mb-3">
                POTENTIAL SPENDING AVOIDED
              </div>
              <div className="font-sans text-5xl font-black tracking-tight text-[#111118] mb-1">
                ${skippedTotal > 0 ? skippedTotal.toLocaleString() : "180"}
              </div>
              <div className="font-sans text-sm text-[#596078] font-medium">
                1 purchase skipped. That's 7.2 hours of work.
              </div>
            </div>

            <div className="w-9 h-9 rounded-full bg-[#111118]/[0.05] flex items-center justify-center text-sm font-bold text-[#111118] cursor-pointer hover:bg-[#111118]/[0.1] transition-colors">
              →
            </div>
          </div>

          <IridescentSphereVisual />
        </div>

        {/* Card 5: BIGGEST AREA OF DESIRE (Span 5, 3D Columns) */}
        <div className="bento-span-5 bento-card bento-card-light p-7 flex flex-col justify-between min-h-[260px]">
          <div>
            <div className="eyebrow-tag mb-3">
              BIGGEST AREA OF DESIRE
            </div>
            <div className="font-sans text-3xl md:text-4xl font-black tracking-tight text-[#111118]">
              {topContext}
            </div>
            <div className="font-sans text-2xl font-bold text-[#B7B0E8] mt-1">
              ${maxVal.toLocaleString()}
            </div>
            <div className="font-sans text-xs text-[#596078] mt-1 font-medium">
              across {wants.filter((w) => w.context === topContext).length} wants
            </div>
          </div>

          <ColumnObjectVisual />
        </div>

        {/* Card 6: WANTS BY CONTEXT (Span 12, Progress Breakdown) */}
        <div className="bento-span-12 bento-card bento-card-light p-7">
          <div className="eyebrow-tag mb-5">
            WANTS BY CONTEXT
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(contextSums).map(([ctx, val]) => {
              const pct = totalValue > 0 ? Math.round((val / totalValue) * 100) : 0
              return (
                <div key={ctx} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-[#111118]">
                    <span>{ctx}</span>
                    <span className="font-mono text-xs font-bold">${val.toLocaleString()}</span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-[#111118]/[0.06] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.max(pct, val > 0 ? 8 : 0)}%`,
                        background:
                          ctx === "Work"
                            ? "#B7B0E8"
                            : ctx === "Hobbies"
                            ? "#F2C6AA"
                            : ctx === "Fitness"
                            ? "#A9D9C8"
                            : "#111118",
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}
