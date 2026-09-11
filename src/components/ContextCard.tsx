import React from "react"
import { Want } from "../types"

interface ContextCardProps {
  name: string
  wants: Want[]
  accentColor: string
  softBgColor: string
  darkTextColor: string
  imageUrl?: string
  emojiFallback: string
  onSelect?: () => void
}

export function ContextCard({
  name,
  wants,
  softBgColor,
  darkTextColor,
  imageUrl,
  emojiFallback,
  onSelect,
}: ContextCardProps) {
  const contextWants = wants.filter((w) => w.context.toLowerCase() === name.toLowerCase())
  const count = contextWants.length
  const totalValue = contextWants.reduce((sum, item) => sum + item.price, 0)

  // Use product image from context wants if available, or provided fallback
  const displayImage = contextWants.find((w) => w.note)?.note || imageUrl

  return (
    <div
      onClick={onSelect}
      className="pressable relative rounded-[28px] p-7 flex flex-col justify-between min-h-[220px] overflow-hidden shadow-sm hover:shadow-md border border-[#111118]/[0.05]"
      style={{ background: softBgColor }}
    >
      {/* Top Meta Info */}
      <div className="flex justify-between items-start z-10">
        <div>
          <span
            className="font-mono text-[10px] font-extrabold tracking-widest uppercase opacity-60"
            style={{ color: darkTextColor }}
          >
            {name}
          </span>
          <div
            className="font-sans text-xs font-semibold mt-0.5 opacity-70"
            style={{ color: darkTextColor }}
          >
            {count} {count === 1 ? "want" : "wants"}
          </div>
        </div>

        {/* Circular Arrow Button */}
        <div
          className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-sm font-bold shadow-sm transition-transform duration-200 group-hover:scale-105"
          style={{ color: darkTextColor }}
        >
          →
        </div>
      </div>

      {/* Large Total Value */}
      <div className="z-10 mt-6">
        <div
          className="font-sans text-4xl md:text-5xl font-black tracking-tight leading-none"
          style={{ color: darkTextColor }}
        >
          ${totalValue.toLocaleString()}
        </div>
      </div>

      {/* Object Image Preview / 3D Fallback Artwork */}
      <div className="absolute right-3 bottom-2 w-32 h-32 flex items-end justify-end pointer-events-none opacity-90">
        {displayImage ? (
          <img
            src={displayImage}
            alt={name}
            className="max-h-28 max-w-28 object-contain drop-shadow-xl"
            onError={(e) => {
              ;(e.target as HTMLElement).style.display = "none"
            }}
          />
        ) : (
          <span className="text-6xl select-none opacity-80">{emojiFallback}</span>
        )}
      </div>
    </div>
  )
}
