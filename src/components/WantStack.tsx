import React, { useState } from "react"
import { Want, UserProfile } from "../types"
import { WantCard } from "./WantCard"
import { DarkGroundingVisual } from "./InsightVisuals"

interface WantStackProps {
  wants: Want[]
  profile: UserProfile
  mode: "stack" | "grid"
  setMode: (m: "stack" | "grid") => void
  onSelect: (id: string) => void
}

export function WantStack({ wants, profile, mode, setMode, onSelect }: WantStackProps) {
  const [idx, setIdx] = useState(0)

  const activeWants = wants.length > 0 ? wants : []
  const safeIdx = activeWants.length > 0 ? Math.min(idx, activeWants.length - 1) : 0
  const currentWant = activeWants[safeIdx]

  const handlePrev = () => {
    if (activeWants.length === 0) return
    setIdx((prev) => (prev > 0 ? prev - 1 : activeWants.length - 1))
  }

  const handleNext = () => {
    if (activeWants.length === 0) return
    setIdx((prev) => (prev < activeWants.length - 1 ? prev + 1 : 0))
  }

  const prevWant1 = activeWants[(safeIdx - 1 + activeWants.length) % activeWants.length]
  const prevWant2 = activeWants[(safeIdx - 2 + activeWants.length) % activeWants.length]
  const nextWant1 = activeWants[(safeIdx + 1) % activeWants.length]
  const nextWant2 = activeWants[(safeIdx + 2) % activeWants.length]

  // Stats
  const activeCount = wants.filter((w) => w.state !== "bought" && w.state !== "skipped").length
  const skippedCount = wants.filter((w) => w.state === "skipped").length
  const savedTotal = wants
    .filter((w) => w.state === "skipped")
    .reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="relative w-full min-h-[calc(100vh-100px)] flex flex-col justify-between overflow-hidden">
      {/* Upper Grid Layout: Left Editorial Column + Right Card Fan Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 md:pt-12 pb-6 z-10">
        
        {/* Left Column (Span 5): Eyebrow, Headline, Stats, Stack/Grid Toggle */}
        <div className="lg:col-span-5 flex flex-col justify-center gap-6">
          <div>
            <div className="eyebrow-tag mb-3 flex items-center gap-2">
              <span className="inline-block w-1.5 h-3 bg-[#111118] rounded-full" />
              II WANTS
            </div>
            <h1 className="editorial-headline mb-4">
              Think before you spend.
            </h1>
            <p className="font-sans text-base md:text-lg text-[#596078] max-w-md leading-relaxed">
              Keep the things you want in view, and give yourself time to decide.
            </p>
          </div>

          {/* Statistics Summary */}
          <div className="flex items-center gap-6 py-4 border-y border-[#111118]/[0.08]">
            <div>
              <div className="font-sans text-3xl md:text-4xl font-black text-[#111118] tracking-tight">
                {activeCount}
              </div>
              <div className="font-sans text-xs text-[#596078] font-medium mt-0.5">
                on your mind
              </div>
            </div>

            <div className="w-px h-10 bg-[#111118]/[0.1]" />

            <div>
              <div className="font-sans text-3xl md:text-4xl font-black text-[#111118] tracking-tight">
                {skippedCount}
              </div>
              <div className="font-sans text-xs text-[#596078] font-medium mt-0.5">
                skipped
              </div>
            </div>

            <div className="w-px h-10 bg-[#111118]/[0.1]" />

            <div>
              <div className="font-sans text-3xl md:text-4xl font-black text-[#111118] tracking-tight">
                ${savedTotal > 0 ? savedTotal.toLocaleString() : "180"}
              </div>
              <div className="font-sans text-xs text-[#596078] font-medium mt-0.5">
                potentially avoided
              </div>
            </div>
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

        {/* Right Column (Span 7): Card Fan Stack Visual */}
        <div className="lg:col-span-7 relative min-h-[460px] flex flex-col items-center justify-center">
          
          {/* Ambient Glows */}
          <div
            className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none z-0"
            style={{
              background: "radial-gradient(circle, rgba(216, 207, 255, 0.55) 0%, rgba(216, 207, 255, 0) 70%)",
              filter: "blur(48px)",
            }}
          />
          <div
            className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none z-0"
            style={{
              background: "radial-gradient(circle, rgba(208, 234, 223, 0.55) 0%, rgba(208, 234, 223, 0) 70%)",
              filter: "blur(48px)",
            }}
          />

          {currentWant ? (
            <div className="relative w-full max-w-[420px] min-h-[440px] flex items-center justify-center">
              
              {/* Background Card Peeking Left (Far) */}
              {activeWants.length > 2 && (
                <div
                  className="absolute w-[260px] z-0 pointer-events-none transition-all duration-500 ease-out hidden sm:block"
                  style={{
                    transform: "translateX(-210px) translateY(18px) rotate(-16deg) scale(0.84)",
                    opacity: 0.45,
                    filter: "blur(1px)",
                  }}
                >
                  <WantCard want={prevWant2} profile={profile} compact />
                </div>
              )}

              {/* Background Card Peeking Left (Mid) */}
              {activeWants.length > 1 && (
                <div
                  onClick={handlePrev}
                  className="absolute w-[290px] z-10 cursor-pointer transition-all duration-500 ease-out hidden sm:block"
                  style={{
                    transform: "translateX(-115px) translateY(8px) rotate(-8deg) scale(0.92)",
                    opacity: 0.82,
                  }}
                >
                  <WantCard want={prevWant1} profile={profile} compact />
                </div>
              )}

              {/* Background Card Peeking Right (Far) */}
              {activeWants.length > 2 && (
                <div
                  className="absolute w-[260px] z-0 pointer-events-none transition-all duration-500 ease-out hidden sm:block"
                  style={{
                    transform: "translateX(210px) translateY(18px) rotate(16deg) scale(0.84)",
                    opacity: 0.45,
                    filter: "blur(1px)",
                  }}
                >
                  <WantCard want={nextWant2} profile={profile} compact />
                </div>
              )}

              {/* Background Card Peeking Right (Mid) */}
              {activeWants.length > 1 && (
                <div
                  onClick={handleNext}
                  className="absolute w-[290px] z-10 cursor-pointer transition-all duration-500 ease-out hidden sm:block"
                  style={{
                    transform: "translateX(115px) translateY(8px) rotate(8deg) scale(0.92)",
                    opacity: 0.82,
                  }}
                >
                  <WantCard want={nextWant1} profile={profile} compact />
                </div>
              )}

              {/* Hero Front Card */}
              <div className="relative z-20 w-full max-w-[360px] hero-card-front">
                <WantCard
                  want={currentWant}
                  profile={profile}
                  onClick={() => onSelect(currentWant.id)}
                />
              </div>

              {/* Left Navigation Chevron */}
              <button
                onClick={handlePrev}
                className="pressable absolute left-[-16px] sm:left-[-24px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-[#111118] border border-[#111118]/[0.08] shadow-lg flex items-center justify-center text-lg font-bold z-30 hover:bg-[#F8F7F4]"
              >
                ‹
              </button>

              {/* Right Navigation Chevron */}
              <button
                onClick={handleNext}
                className="pressable absolute right-[-16px] sm:right-[-24px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-[#111118] border border-[#111118]/[0.08] shadow-lg flex items-center justify-center text-lg font-bold z-30 hover:bg-[#F8F7F4]"
              >
                ›
              </button>
            </div>
          ) : (
            <div className="text-center p-12 bg-white rounded-3xl border border-[#111118]/[0.08]">
              <div className="text-4xl mb-3">✨</div>
              <div className="font-bold text-lg text-[#111118]">No wants listed</div>
              <div className="text-sm text-[#596078] mt-1">Add a want to start your pause journey.</div>
            </div>
          )}

          {/* Pagination Counter */}
          {activeWants.length > 0 && (
            <div className="text-center mt-6 z-20">
              <div className="font-mono text-xs font-bold tracking-widest text-[#111118]">
                {String(safeIdx + 1).padStart(2, "0")} / {String(activeWants.length).padStart(2, "0")}
              </div>
              <div className="font-sans text-xs text-[#596078] mt-1 font-medium">
                Last viewed 4 hours ago
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Grounding 3D Dark Wave Object at bottom */}
      <DarkGroundingVisual />
    </div>
  )
}
