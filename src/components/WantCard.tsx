import React from "react"
import { Want, UserProfile, getChips, CTX_BLOB } from "../types"

interface WantCardProps {
  want: Want
  profile: UserProfile
  compact?: boolean
  onClick?: () => void
  style?: React.CSSProperties
}

export function WantCard({ want, profile, compact = false, onClick, style }: WantCardProps) {
  const faded = want.state === "skipped" || want.state === "bought"
  const blob = CTX_BLOB[want.context] || { fill: "#C8C4C0", emoji: "✦" }
  const tickNum = `#${want.id.padStart(4, "0")}`
  const customImgUrl = want.note || undefined
  const chips = getChips(want.price, profile)

  // Status tag styling
  const stateStyles: Record<string, { label: string; bg: string; fg: string }> = {
    new: { label: "NEW WANT", bg: "#111118", fg: "#FFFFFF" },
    thinking: { label: "THINKING", bg: "#F2C6AA", fg: "#7A2800" },
    waiting: { label: "WAITING", bg: "#DCD6F7", fg: "#3A1660" },
    bought: { label: "PURCHASED", bg: "#E2E2EC", fg: "#52546A" },
    skipped: { label: "SKIPPED ✨", bg: "#D0EADF", fg: "#0A4A28" },
  }
  const status = stateStyles[want.state] || stateStyles.waiting

  // Category pill colors
  const categoryColors: Record<string, { bg: string; fg: string }> = {
    Work: { bg: "#D0EADF", fg: "#0A4A28" },
    Hobbies: { bg: "#F8D4BE", fg: "#7A2800" },
    Fitness: { bg: "#D0EADF", fg: "#1A6A3A" },
    Travel: { bg: "#D4ECFD", fg: "#003A70" },
    Home: { bg: "#FEF0CC", fg: "#5A3A00" },
    Personal: { bg: "#E4F7D8", fg: "#205000" },
  }
  const catStyle = categoryColors[want.context] || { bg: "#E5E5EA", fg: "#111118" }

  return (
    <div
      onClick={onClick}
      className={`ticket-wrapper ${onClick ? "pressable" : ""}`}
      style={{
        position: "relative",
        opacity: faded ? 0.6 : 1,
        cursor: onClick ? "pointer" : "default",
        background: "#FFFFFF",
        borderRadius: compact ? 22 : 28,
        overflow: "hidden",
        boxShadow: compact
          ? "0 4px 20px rgba(17, 17, 24, 0.06)"
          : "0 20px 50px rgba(17, 17, 24, 0.12), 0 2px 8px rgba(17, 17, 24, 0.04)",
        ...style,
      }}
    >
      {/* Physical Cutouts */}
      {!compact && (
        <>
          <div className="ticket-cutout-left" />
          <div className="ticket-cutout-right" />
        </>
      )}

      {/* Top Image Render Container */}
      <div
        style={{
          height: compact ? 130 : 210,
          background: "linear-gradient(180deg, #F8F8FA 0%, #EFEFF4 100%)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        {/* Top-Left Category Tag */}
        <div style={{ position: "absolute", top: 14, left: 14, zIndex: 2 }}>
          <span
            style={{
              background: catStyle.bg,
              color: catStyle.fg,
              borderRadius: 99,
              padding: "4px 12px",
              fontFamily: "'DM Mono', monospace",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.10em",
            }}
          >
            {want.context.toUpperCase()}
          </span>
        </div>

        {/* Top-Right ID Tag */}
        <div style={{ position: "absolute", top: 14, right: 14, zIndex: 2 }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#9EA3B5", letterSpacing: "0.10em" }}>
            {tickNum}
          </span>
        </div>

        {/* 3D Product Image / Render */}
        {customImgUrl ? (
          <img
            src={customImgUrl}
            alt={want.name}
            style={{
              maxHeight: compact ? 95 : 155,
              maxWidth: "85%",
              objectFit: "contain",
              filter: "drop-shadow(0 12px 24px rgba(17,17,24,0.14))",
            }}
            onError={(e) => {
              // Hide image if broken and display fallback emoji
              ;(e.target as HTMLElement).style.display = "none"
            }}
          />
        ) : (
          <span style={{ fontSize: compact ? 44 : 76, opacity: 0.8 }}>{blob.emoji}</span>
        )}
      </div>

      {/* Perforated Divider Line */}
      {!compact && (
        <div style={{ position: "relative", height: 1, background: "rgba(17, 17, 24, 0.07)", zIndex: 1 }} />
      )}

      {/* Body Section */}
      <div style={{ padding: compact ? "12px 16px" : "20px 24px 22px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <div style={{ fontFamily: "'Satoshi', sans-serif", fontSize: compact ? 13 : 15, fontWeight: 650, color: "#111118" }}>
            {want.name}
          </div>
          <span
            style={{
              background: status.bg,
              color: status.fg,
              borderRadius: 99,
              padding: "3px 10px",
              fontFamily: "'DM Mono', monospace",
              fontSize: 8.5,
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            {status.label}
          </span>
        </div>

        {/* Large Price */}
        <div
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: compact ? 26 : 46,
            fontWeight: 850,
            color: "#111118",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            marginBottom: compact ? 0 : 18,
          }}
        >
          ${want.price.toLocaleString()}
        </div>

        {/* Stat Chips Row */}
        {chips && chips.length > 0 && !compact && (
          <div
            style={{
              display: "flex",
              gap: 10,
              paddingTop: 14,
              borderTop: "1px solid rgba(17, 17, 24, 0.06)",
              justifyContent: "space-between",
            }}
          >
            {chips.slice(0, 3).map((c, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "#F5F4F8",
                  padding: "6px 12px",
                  borderRadius: 12,
                  flex: 1,
                }}
              >
                <span style={{ fontSize: 14 }}>{c.emoji}</span>
                <div>
                  <div style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 13, fontWeight: 800, color: "#111118", lineHeight: 1 }}>
                    {c.value}
                  </div>
                  <div style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 8.5, color: "#596078", lineHeight: 1.1 }}>
                    {c.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
