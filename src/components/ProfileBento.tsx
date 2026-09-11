import React, { useState } from "react"
import { UserProfile, Period, COMPS, CompKey } from "../types"

interface ProfileBentoProps {
  profile: UserProfile
  setProfile: (p: UserProfile) => void
}

export function ProfileBento({ profile, setProfile }: ProfileBentoProps) {
  const [editingAmount, setEditingAmount] = useState(false)
  const [editingRate, setEditingRate] = useState(false)
  const [editingQuote, setEditingQuote] = useState(false)
  const [showAddCompModal, setShowAddCompModal] = useState(false)

  // Temp form states
  const [amountInput, setAmountInput] = useState(profile.amount.toString())
  const [rateInput, setRateInput] = useState((profile.hourlyRate || 25).toString())
  const [quoteInput, setQuoteInput] = useState(
    profile.aboutMe || "Before I buy something, I pause and see what it means in my world."
  )

  const [newCompLabel, setNewCompLabel] = useState("")
  const [newCompEmoji, setNewCompEmoji] = useState("✨")
  const [newCompPrice, setNewCompPrice] = useState("30")

  function handleSaveAmount() {
    const val = parseFloat(amountInput)
    if (!isNaN(val) && val >= 0) {
      setProfile({ ...profile, amount: val })
    }
    setEditingAmount(false)
  }

  function handleSaveRate() {
    const val = parseFloat(rateInput)
    if (!isNaN(val) && val >= 0) {
      setProfile({ ...profile, hourlyRate: val })
    }
    setEditingRate(false)
  }

  function handleSaveQuote() {
    setProfile({ ...profile, aboutMe: quoteInput })
    setEditingQuote(false)
  }

  function handleTogglePref(key: "showComparisons" | "remindPause" | "weeklySummary") {
    setProfile({ ...profile, [key]: !profile[key] })
  }

  function handleRemoveComparison(k: CompKey) {
    setProfile({
      ...profile,
      comparisons: profile.comparisons.filter((c) => c !== k),
    })
  }

  function handleAddCustomComp() {
    if (!newCompLabel.trim() || !newCompPrice) return
    const price = parseFloat(newCompPrice) || 20
    const newComp = {
      id: "custom-" + Date.now(),
      label: newCompLabel.trim(),
      emoji: newCompEmoji || "✦",
      price,
    }
    setProfile({
      ...profile,
      customComps: [...(profile.customComps || []), newComp],
    })
    setNewCompLabel("")
    setNewCompPrice("30")
    setShowAddCompModal(false)
  }

  function handleRemoveCustomComp(id: string) {
    setProfile({
      ...profile,
      customComps: (profile.customComps || []).filter((c) => c.id !== id),
    })
  }

  return (
    <div className="w-full pt-8 md:pt-12 pb-20 screen-in">
      {/* Header & Top Banner Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-8">
        
        {/* Left Column: Headline & Subtext (Span 7) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="eyebrow-tag mb-3 flex items-center gap-2">
            <span className="inline-block w-1.5 h-3 bg-[#111118] rounded-full" />
            II PROFILE
          </div>
          <h1 className="editorial-headline mb-3">
            Your money,<br />your rules.
          </h1>
          <p className="font-sans text-base md:text-lg text-[#596078] font-medium max-w-md">
            Set your context. We'll help you keep it in mind.
          </p>
        </div>

        {/* Right Top Card: Dark 3D Orb Highlight Banner (Span 5) */}
        <div className="lg:col-span-5 rounded-[28px] bg-[#0D0D14] text-white p-8 relative overflow-hidden flex flex-col justify-between shadow-2xl min-h-[200px]">
          {/* 3D Glossy Ambient Sphere Graphic */}
          <div
            className="absolute -right-12 -top-12 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.4) 0%, rgba(183, 176, 232, 0.3) 35%, rgba(17, 17, 24, 0.95) 75%)
              `,
              boxShadow: "inset 0 0 40px rgba(0,0,0,0.8), 0 0 60px rgba(183, 176, 232, 0.2)",
            }}
          />

          <div className="font-mono text-xs font-bold tracking-widest text-white/50 uppercase z-10">
            PHILOSOPHY
          </div>

          <div className="z-10 mt-6">
            <div className="font-sans text-2xl md:text-3xl font-black tracking-tight leading-snug">
              A calmer relationship<br />with money.
            </div>
            <div className="font-mono text-xs text-[#B7B0E8] font-bold tracking-widest mt-2">
              PAUSE.
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid layout */}
      <div className="bento-grid-12">
        
        {/* Card 1: AVAILABLE SPENDING (Span 4) */}
        <div className="bento-span-4 bento-card bento-card-light p-7 flex flex-col justify-between min-h-[170px]">
          <div className="flex justify-between items-start">
            <div className="eyebrow-tag">AVAILABLE SPENDING</div>
            <button
              onClick={() => setEditingAmount(!editingAmount)}
              className="w-8 h-8 rounded-full bg-[#111118]/[0.05] flex items-center justify-center text-xs text-[#111118] hover:bg-[#111118]/[0.1] transition-colors"
            >
              ✏️
            </button>
          </div>

          {editingAmount ? (
            <div className="flex items-center gap-2 mt-4">
              <span className="font-sans text-2xl font-bold">$</span>
              <input
                type="number"
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value)}
                className="w-full bg-[#F5F4F8] border border-[#111118]/[0.15] rounded-xl px-3 py-2 font-sans text-xl font-bold text-[#111118]"
                autoFocus
              />
              <button
                onClick={handleSaveAmount}
                className="bg-[#111118] text-white px-4 py-2 rounded-xl font-sans text-xs font-bold"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="mt-4">
              <div className="font-sans text-4xl font-black text-[#111118] tracking-tight">
                ${profile.amount.toLocaleString()}
              </div>
              <div className="font-sans text-xs text-[#596078] font-semibold mt-1">
                / {profile.period}
              </div>
            </div>
          )}
        </div>

        {/* Card 2: HOURLY RATE (Span 4) */}
        <div className="bento-span-4 bento-card bento-card-light p-7 flex flex-col justify-between min-h-[170px]">
          <div className="flex justify-between items-start">
            <div className="eyebrow-tag">HOURLY RATE</div>
            <button
              onClick={() => setEditingRate(!editingRate)}
              className="w-8 h-8 rounded-full bg-[#111118]/[0.05] flex items-center justify-center text-xs text-[#111118] hover:bg-[#111118]/[0.1] transition-colors"
            >
              ✏️
            </button>
          </div>

          {editingRate ? (
            <div className="flex items-center gap-2 mt-4">
              <span className="font-sans text-2xl font-bold">$</span>
              <input
                type="number"
                value={rateInput}
                onChange={(e) => setRateInput(e.target.value)}
                className="w-full bg-[#F5F4F8] border border-[#111118]/[0.15] rounded-xl px-3 py-2 font-sans text-xl font-bold text-[#111118]"
                autoFocus
              />
              <button
                onClick={handleSaveRate}
                className="bg-[#111118] text-white px-4 py-2 rounded-xl font-sans text-xs font-bold"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="mt-4">
              <div className="font-sans text-4xl font-black text-[#111118] tracking-tight">
                ${profile.hourlyRate || 25}
              </div>
              <div className="font-sans text-xs text-[#596078] font-semibold mt-1">
                / hr
              </div>
            </div>
          )}
        </div>

        {/* Card 3: CURRENCY & PAY FREQUENCY (Span 4) */}
        <div className="bento-span-4 bento-card bento-card-light p-7 flex flex-col justify-between min-h-[170px]">
          <div className="space-y-4">
            <div>
              <div className="eyebrow-tag mb-1.5">CURRENCY</div>
              <select
                value={profile.currency || "AUD ($)"}
                onChange={(e) => setProfile({ ...profile, currency: e.target.value })}
                className="w-full bg-[#F5F4F8] border border-[#111118]/[0.08] rounded-xl px-3 py-2 font-sans text-sm font-bold text-[#111118]"
              >
                <option value="AUD ($)">AUD ($)</option>
                <option value="USD ($)">USD ($)</option>
                <option value="EUR (€)">EUR (€)</option>
                <option value="GBP (£)">GBP (£)</option>
              </select>
            </div>

            <div>
              <div className="eyebrow-tag mb-1.5">PAY FREQUENCY</div>
              <select
                value={profile.period}
                onChange={(e) => setProfile({ ...profile, period: e.target.value as Period })}
                className="w-full bg-[#F5F4F8] border border-[#111118]/[0.08] rounded-xl px-3 py-2 font-sans text-sm font-bold text-[#111118]"
              >
                <option value="weekly">Weekly</option>
                <option value="fortnightly">Fortnightly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
        </div>

        {/* Card 4: MY COMPARISONS (Span 8) */}
        <div className="bento-span-8 bento-card bento-card-light p-7">
          <div className="flex justify-between items-center mb-4">
            <div className="eyebrow-tag">MY COMPARISONS</div>
            <button
              onClick={() => setShowAddCompModal(true)}
              className="pressable px-3 py-1.5 rounded-full bg-[#111118]/[0.05] text-[#111118] font-mono text-[10px] font-bold tracking-wider hover:bg-[#111118]/[0.1] transition-colors"
            >
              + Add comparison
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {profile.comparisons.map((k) => {
              const c = COMPS[k]
              if (!c) return null
              return (
                <div
                  key={k}
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#F5F4F8] border border-[#111118]/[0.05]"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{c.emoji}</span>
                    <div>
                      <div className="font-sans text-xs font-bold text-[#111118] capitalize">
                        {c.label}
                      </div>
                      <div className="font-sans text-[10px] text-[#596078] font-medium">
                        ${c.price}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemoveComparison(k)}
                    className="text-[#596078] hover:text-red-500 font-bold text-sm px-1.5"
                  >
                    ×
                  </button>
                </div>
              )
            })}

            {(profile.customComps || []).map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-[#F5F4F8] border border-[#111118]/[0.05]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{c.emoji}</span>
                  <div>
                    <div className="font-sans text-xs font-bold text-[#111118] capitalize">
                      {c.label}
                    </div>
                    <div className="font-sans text-[10px] text-[#596078] font-medium">
                      ${c.price}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleRemoveCustomComp(c.id)}
                  className="text-[#596078] hover:text-red-500 font-bold text-sm px-1.5"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Card 5: PREFERENCES (Span 4) */}
        <div className="bento-span-4 bento-card bento-card-light p-7">
          <div className="eyebrow-tag mb-4">PREFERENCES</div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-sans text-xs font-bold text-[#111118]">
                Show comparisons on wants
              </span>
              <button
                onClick={() => handleTogglePref("showComparisons")}
                className={`w-11 h-6 rounded-full transition-colors p-1 flex items-center ${
                  profile.showComparisons ? "bg-[#111118]" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    profile.showComparisons ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-sans text-xs font-bold text-[#111118]">
                Remind me to pause
              </span>
              <button
                onClick={() => handleTogglePref("remindPause")}
                className={`w-11 h-6 rounded-full transition-colors p-1 flex items-center ${
                  profile.remindPause ? "bg-[#111118]" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    profile.remindPause ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-sans text-xs font-bold text-[#111118]">
                Weekly summary email
              </span>
              <button
                onClick={() => handleTogglePref("weeklySummary")}
                className={`w-11 h-6 rounded-full transition-colors p-1 flex items-center ${
                  profile.weeklySummary ? "bg-[#111118]" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    profile.weeklySummary ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Card 6: ABOUT ME (Span 12, Editable Quote) */}
        <div className="bento-span-12 bento-card bento-card-light p-7">
          <div className="flex justify-between items-center mb-3">
            <div className="eyebrow-tag">ABOUT ME</div>
            <button
              onClick={() => setEditingQuote(!editingQuote)}
              className="w-8 h-8 rounded-full bg-[#111118]/[0.05] flex items-center justify-center text-xs text-[#111118] hover:bg-[#111118]/[0.1] transition-colors"
            >
              ✏️
            </button>
          </div>

          {editingQuote ? (
            <div className="flex flex-col gap-3">
              <textarea
                value={quoteInput}
                onChange={(e) => setQuoteInput(e.target.value)}
                rows={2}
                className="w-full bg-[#F5F4F8] border border-[#111118]/[0.15] rounded-xl p-3 font-sans text-base font-semibold text-[#111118]"
              />
              <button
                onClick={handleSaveQuote}
                className="self-end bg-[#111118] text-white px-5 py-2 rounded-xl font-sans text-xs font-bold"
              >
                Save Statement
              </button>
            </div>
          ) : (
            <p className="font-sans text-lg md:text-xl font-semibold italic text-[#111118]">
              "{profile.aboutMe || "Before I buy something, I pause and see what it means in my world."}"
            </p>
          )}
        </div>

      </div>

      {/* Add Custom Comparison Modal */}
      {showAddCompModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm border border-[#111118]/[0.1] shadow-2xl space-y-4">
            <div className="font-sans text-lg font-bold text-[#111118]">
              Add Comparison Anchor
            </div>

            <div>
              <label className="eyebrow-tag block mb-1">LABEL</label>
              <input
                value={newCompLabel}
                onChange={(e) => setNewCompLabel(e.target.value)}
                placeholder="e.g. Cinema Ticket"
                className="w-full bg-[#F5F4F8] border border-[#111118]/[0.1] rounded-xl px-3 py-2 font-sans text-sm font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="eyebrow-tag block mb-1">EMOJI</label>
                <input
                  value={newCompEmoji}
                  onChange={(e) => setNewCompEmoji(e.target.value)}
                  placeholder="🎬"
                  className="w-full bg-[#F5F4F8] border border-[#111118]/[0.1] rounded-xl px-3 py-2 font-sans text-sm font-bold text-center"
                />
              </div>
              <div>
                <label className="eyebrow-tag block mb-1">PRICE ($)</label>
                <input
                  type="number"
                  value={newCompPrice}
                  onChange={(e) => setNewCompPrice(e.target.value)}
                  placeholder="22"
                  className="w-full bg-[#F5F4F8] border border-[#111118]/[0.1] rounded-xl px-3 py-2 font-sans text-sm font-bold"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowAddCompModal(false)}
                className="flex-1 bg-[#F5F4F8] text-[#596078] py-2.5 rounded-xl font-sans text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCustomComp}
                className="flex-1 bg-[#111118] text-white py-2.5 rounded-xl font-sans text-xs font-bold"
              >
                Add Anchor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
