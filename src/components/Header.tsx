import React from "react"
import { IconWants, IconContexts, IconInsights, IconProfile } from "./NavIcons"

export type Screen = "onboarding" | "home" | "add" | "why" | "reflection" |
  "urgency" | "card-detail" | "contexts" | "insights" | "profile"

interface HeaderProps {
  screen: Screen
  navigate: (s: Screen) => void
  onAdd: () => void
}

export function Header({ screen, navigate, onAdd }: HeaderProps) {
  const tabs = [
    { id: "home", label: "WANTS", Icon: IconWants },
    { id: "contexts", label: "CONTEXTS", Icon: IconContexts },
    { id: "insights", label: "INSIGHTS", Icon: IconInsights },
    { id: "profile", label: "PROFILE", Icon: IconProfile },
  ] as const

  return (
    <header className="floating-header">
      {/* Wordmark */}
      <div
        className="flex items-center gap-2 cursor-pointer select-none"
        onClick={() => navigate("home")}
      >
        <span className="font-extrabold text-xl tracking-tight text-[#111118]">
          PAUSE.
        </span>
      </div>

      {/* Navigation Bar */}
      <nav className="flex items-center gap-1 bg-[#111118]/[0.04] p-1 rounded-full">
        {tabs.map(({ id, label, Icon }) => {
          const active = screen === id || (screen === "home" && id === "home")
          return (
            <button
              key={id}
              onClick={() => navigate(id as Screen)}
              className={`pressable flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[11px] font-semibold tracking-wider transition-all duration-200 ${
                active
                  ? "bg-[#111118] text-white shadow-sm"
                  : "text-[#596078] hover:text-[#111118] bg-transparent"
              }`}
            >
              <Icon active={active} />
              <span>{label}</span>
            </button>
          )
        })}
      </nav>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={onAdd}
          className="pressable inline-flex items-center gap-1.5 bg-[#111118] text-white px-5 py-2.5 rounded-full font-sans text-xs font-bold tracking-tight shadow-md hover:bg-black"
        >
          <span className="text-base leading-none font-normal">+</span> Add a want
        </button>

        <div className="w-9 h-9 rounded-full bg-[#E6E5EC] flex items-center justify-center font-bold text-xs text-[#111118] shadow-inner select-none cursor-pointer hover:bg-[#DCDCE6] transition-colors">
          J
        </div>
      </div>
    </header>
  )
}
