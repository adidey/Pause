import React from "react"
import { Want, UserProfile } from "../types"
import { WantCard } from "./WantCard"

interface WantGridProps {
  wants: Want[]
  profile: UserProfile
  mode: "stack" | "grid"
  setMode: (m: "stack" | "grid") => void
  onSelect: (id: string) => void
}

export function WantGrid({ wants, profile, mode, setMode, onSelect }: WantGridProps) {
  return (
    <div className="w-full pt-8 md:pt-12 pb-16 flex flex-col gap-8">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#111118]/[0.08]">
        <div>
          <div className="eyebrow-tag mb-2 flex items-center gap-2">
            <span className="inline-block w-1.5 h-3 bg-[#111118] rounded-full" />
            II WANTS GRID
          </div>
          <h1 className="editorial-headline">
            All Wants.
          </h1>
        </div>

        {/* Mode Switcher Pill */}
        <div className="flex items-center gap-1 bg-[#111118]/[0.06] p-1 rounded-full w-fit">
          <button
            onClick={() => setMode("stack")}
            className={`pressable px-6 py-2 rounded-full font-mono text-xs font-bold tracking-wider transition-all duration-200 ${
              mode === "stack"
                ? "bg-[#111118] text-white shadow-sm"
                : "text-[#596078] hover:text-[#111118] bg-transparent"
            }`}
          >
            STACK
          </button>
          <button
            onClick={() => setMode("grid")}
            className={`pressable px-6 py-2 rounded-full font-mono text-xs font-bold tracking-wider transition-all duration-200 ${
              mode === "grid"
                ? "bg-[#111118] text-white shadow-sm"
                : "text-[#596078] hover:text-[#111118] bg-transparent"
            }`}
          >
            GRID
          </button>
        </div>
      </div>

      {/* Grid System */}
      <div className="grid-wants-responsive">
        {wants.map((want) => (
          <div key={want.id} className="hoverable">
            <WantCard
              want={want}
              profile={profile}
              onClick={() => onSelect(want.id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
