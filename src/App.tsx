import React, { useState, useCallback } from "react"
import { Want, UserProfile, Period, CONTEXTS, REASONS, DEADLINES, COMPS } from "./types"
import { Header, Screen } from "./components/Header"
import { WantStack } from "./components/WantStack"
import { WantGrid } from "./components/WantGrid"
import { ContextCard } from "./components/ContextCard"
import { InsightsBento } from "./components/InsightCard"
import { ProfileBento } from "./components/ProfileBento"
import { fetchProductMetadata } from "./utils/metadataExtractor"

import sonyHeadphonesImg from "./assets/sony_headphones.jpg"
import controllerImg from "./assets/controller_3d.jpg"
import sneakerImg from "./assets/sneaker_3d.jpg"
import briefcaseImg from "./assets/briefcase_3d.jpg"
import lampImg from "./assets/lamp_3d.jpg"
import airplaneImg from "./assets/airplane_3d.jpg"

const INIT_WANTS: Want[] = [
  {
    id: "3",
    name: "Sony WH-1000XM5",
    price: 499,
    context: "Work",
    state: "waiting",
    addedAt: new Date(Date.now() - 6 * 86400000),
    desire: 4,
    urgency: 3,
    note: sonyHeadphonesImg,
  },
  {
    id: "1",
    name: "DualSense Edge Controller",
    price: 220,
    context: "Hobbies",
    state: "thinking",
    addedAt: new Date(Date.now() - 2 * 86400000),
    desire: 4,
    urgency: 2,
    note: controllerImg,
  },
  {
    id: "2",
    name: "Nike Air Max 90",
    price: 160,
    context: "Fitness",
    state: "waiting",
    addedAt: new Date(Date.now() - 12 * 86400000),
    desire: 5,
    urgency: 1,
    note: sneakerImg,
  },
  {
    id: "4",
    name: "Keychron K2 Pro",
    price: 180,
    context: "Work",
    state: "skipped",
    addedAt: new Date(Date.now() - 20 * 86400000),
    note: briefcaseImg,
  },
]

const DEFAULT_PROFILE: UserProfile = {
  moneyType: "salary",
  period: "fortnightly",
  amount: 400,
  hourlyRate: 25,
  currency: "AUD ($)",
  comparisons: ["burger", "coffee", "flight", "movie"],
  customComps: [],
  customContexts: [],
  showComparisons: true,
  remindPause: true,
  weeklySummary: false,
  aboutMe: "Before I buy something, I pause and see what it means in my world.",
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home")
  const [wants, setWants] = useState<Want[]>(INIT_WANTS)
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE)
  const [viewMode, setViewMode] = useState<"stack" | "grid">("stack")
  
  const [newWant, setNewWant] = useState<Partial<Want>>({})
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [urlInput, setUrlInput] = useState("")
  const [loadingUrl, setLoadingUrl] = useState(false)

  const navigate = useCallback((s: Screen) => setScreen(s), [])

  const selectedWant = wants.find((w) => w.id === selectedId)

  async function handleFetchUrl() {
    if (!urlInput.trim()) return
    setLoadingUrl(true)
    try {
      const meta = await fetchProductMetadata(urlInput)
      setNewWant({
        ...newWant,
        name: meta.title || newWant.name || "Imported Item",
        price: meta.price || newWant.price || 0,
        note: meta.image || urlInput,
      })
    } catch {
      setNewWant({ ...newWant, note: urlInput })
    } finally {
      setLoadingUrl(false)
    }
  }

  function addWantComplete() {
    if (!newWant.name || !newWant.price) return
    const created: Want = {
      id: String(wants.length + 1),
      name: newWant.name,
      price: newWant.price,
      context: newWant.context || "Personal",
      state: "new",
      addedAt: new Date(),
      ...newWant,
    }
    setWants([created, ...wants])
    setNewWant({})
    setUrlInput("")
    setScreen("home")
  }

  function handleStateChange(id: string, newState: Want["state"]) {
    setWants(wants.map((w) => (w.id === id ? { ...w, state: newState } : w)))
  }

  // CONTEXTS Page calculation
  const totalValue = wants.reduce((sum, item) => sum + item.price, 0)
  const contextAssets: Record<string, { softBg: string; textColor: string; img?: string; emoji: string }> = {
    Work: { softBg: "#DCD6F7", textColor: "#3A1660", img: briefcaseImg, emoji: "💼" },
    Hobbies: { softBg: "#F8D4BE", textColor: "#7A2800", img: controllerImg, emoji: "🎮" },
    Fitness: { softBg: "#D0EADF", textColor: "#0A4A28", img: sneakerImg, emoji: "👟" },
    Travel: { softBg: "#D4ECFD", textColor: "#003A70", img: airplaneImg, emoji: "✈️" },
    Home: { softBg: "#F6EFE6", textColor: "#5A3A00", img: lampImg, emoji: "🏠" },
    Personal: { softBg: "#E4F7D8", textColor: "#205000", emoji: "🌿" },
  }

  return (
    <div className="app-shell-root">
      <div className="app-shell-container">
        
        {/* Floating Header */}
        <Header screen={screen} navigate={navigate} onAdd={() => setScreen("add")} />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col w-full">
          
          {/* 1. WANTS HERO SCREEN (STACK OR GRID MODE) */}
          {screen === "home" && (
            viewMode === "stack" ? (
              <WantStack
                wants={wants}
                profile={profile}
                mode={viewMode}
                setMode={setViewMode}
                onSelect={(id) => {
                  setSelectedId(id)
                  setScreen("card-detail")
                }}
              />
            ) : (
              <WantGrid
                wants={wants}
                profile={profile}
                mode={viewMode}
                setMode={setViewMode}
                onSelect={(id) => {
                  setSelectedId(id)
                  setScreen("card-detail")
                }}
              />
            )
          )}

          {/* 2. CONTEXTS SCREEN */}
          {screen === "contexts" && (
            <div className="w-full pt-8 md:pt-12 pb-20 screen-in">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <div className="eyebrow-tag mb-2 flex items-center gap-2">
                    <span className="inline-block w-1.5 h-3 bg-[#111118] rounded-full" />
                    II CONTEXTS
                  </div>
                  <h1 className="editorial-headline mb-2">
                    Where your money wants to go.
                  </h1>
                  <p className="font-sans text-base text-[#596078] font-medium">
                    Different parts of your life, same you.
                  </p>
                </div>

                <div className="flex items-center gap-6 bg-white border border-[#111118]/[0.08] px-6 py-3 rounded-2xl shadow-sm">
                  <div>
                    <div className="font-mono text-[10px] font-bold text-[#596078] tracking-widest uppercase">
                      TOTAL WANTS
                    </div>
                    <div className="font-sans text-xl font-black text-[#111118]">
                      {wants.length}
                    </div>
                  </div>

                  <div className="w-px h-8 bg-[#111118]/[0.08]" />

                  <div>
                    <div className="font-mono text-[10px] font-bold text-[#596078] tracking-widest uppercase">
                      TOTAL VALUE
                    </div>
                    <div className="font-sans text-xl font-black text-[#111118]">
                      ${totalValue.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Context Cards Grid */}
              <div className="contexts-grid">
                {CONTEXTS.map((ctxName) => {
                  const asset = contextAssets[ctxName] || {
                    softBg: "#F5F4F8",
                    textColor: "#111118",
                    emoji: "🏷️",
                  }
                  return (
                    <ContextCard
                      key={ctxName}
                      name={ctxName}
                      wants={wants}
                      accentColor="#111118"
                      softBgColor={asset.softBg}
                      darkTextColor={asset.textColor}
                      imageUrl={asset.img}
                      emojiFallback={asset.emoji}
                      onSelect={() => setViewMode("grid")}
                    />
                  )
                })}
              </div>
            </div>
          )}

          {/* 3. INSIGHTS SCREEN */}
          {screen === "insights" && <InsightsBento wants={wants} />}

          {/* 4. PROFILE SCREEN */}
          {screen === "profile" && <ProfileBento profile={profile} setProfile={setProfile} />}

          {/* 5. ADD WANT MULTI-STEP FLOW */}
          {screen === "add" && (
            <div className="max-w-xl mx-auto w-full pt-10 pb-20 screen-in">
              <button
                onClick={() => setScreen("home")}
                className="font-mono text-xs font-bold text-[#596078] mb-6 hover:text-[#111118]"
              >
                ← BACK
              </button>

              <div className="eyebrow-tag mb-2">STEP 1 OF 3</div>
              <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-[#111118] mb-2 tracking-tight">
                What do you want?
              </h2>
              <p className="font-sans text-sm text-[#596078] mb-8 font-medium">
                Enter an item title, price, or paste a store link to autofill.
              </p>

              <div className="space-y-6">
                {/* Store URL Autofill */}
                <div className="flex gap-2">
                  <input
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="Paste product store URL..."
                    className="flex-1 bg-white border border-[#111118]/[0.1] rounded-2xl px-4 py-3 font-sans text-sm outline-none"
                  />
                  <button
                    onClick={handleFetchUrl}
                    disabled={loadingUrl}
                    className="bg-[#111118] text-white px-5 rounded-2xl font-sans text-xs font-bold"
                  >
                    {loadingUrl ? "Extracting..." : "Autofill"}
                  </button>
                </div>

                <div>
                  <label className="eyebrow-tag block mb-2">ITEM NAME</label>
                  <input
                    value={newWant.name || ""}
                    onChange={(e) => setNewWant({ ...newWant, name: e.target.value })}
                    placeholder="e.g. Sony WH-1000XM5"
                    className="w-full bg-white border border-[#111118]/[0.1] rounded-2xl p-4 font-sans text-lg font-bold text-[#111118]"
                  />
                </div>

                <div>
                  <label className="eyebrow-tag block mb-2">PRICE ($)</label>
                  <input
                    type="number"
                    value={newWant.price || ""}
                    onChange={(e) => setNewWant({ ...newWant, price: parseFloat(e.target.value) || 0 })}
                    placeholder="499"
                    className="w-full bg-white border border-[#111118]/[0.1] rounded-2xl p-4 font-sans text-2xl font-black text-[#111118]"
                  />
                </div>

                <div>
                  <label className="eyebrow-tag block mb-2">CONTEXT</label>
                  <div className="flex flex-wrap gap-2">
                    {CONTEXTS.map((c) => {
                      const sel = newWant.context === c
                      return (
                        <button
                          key={c}
                          onClick={() => setNewWant({ ...newWant, context: c })}
                          className={`px-4 py-2 rounded-full font-sans text-xs font-bold transition-colors ${
                            sel ? "bg-[#111118] text-white" : "bg-white border border-[#111118]/[0.1] text-[#596078]"
                          }`}
                        >
                          {c}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <button
                  onClick={() => setScreen("why")}
                  disabled={!newWant.name || !newWant.price}
                  className="w-full bg-[#111118] disabled:bg-gray-300 text-white p-4 rounded-2xl font-sans text-sm font-bold shadow-lg mt-4"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {screen === "why" && (
            <div className="max-w-xl mx-auto w-full pt-10 pb-20 screen-in">
              <button
                onClick={() => setScreen("add")}
                className="font-mono text-xs font-bold text-[#596078] mb-6 hover:text-[#111118]"
              >
                ← BACK
              </button>

              <div className="eyebrow-tag mb-2">STEP 2 OF 3</div>
              <h2 className="font-sans text-3xl font-extrabold text-[#111118] mb-2 tracking-tight">
                Why do you want it?
              </h2>
              <p className="font-sans text-sm text-[#596078] mb-8 font-medium">
                Select your primary motivations.
              </p>

              <div className="flex flex-wrap gap-2.5 mb-8">
                {REASONS.map((r) => {
                  const selected = (newWant.reasons || []).includes(r)
                  return (
                    <button
                      key={r}
                      onClick={() => {
                        const cur = newWant.reasons || []
                        setNewWant({
                          ...newWant,
                          reasons: selected ? cur.filter((x) => x !== r) : [...cur, r],
                        })
                      }}
                      className={`px-4 py-2.5 rounded-full font-sans text-xs font-semibold transition-colors ${
                        selected ? "bg-[#111118] text-white" : "bg-white border border-[#111118]/[0.1] text-[#596078]"
                      }`}
                    >
                      {r}
                    </button>
                  )
                })}
              </div>

              <button
                onClick={() => setScreen("reflection")}
                className="w-full bg-[#111118] text-white p-4 rounded-2xl font-sans text-sm font-bold shadow-lg"
              >
                Reflect →
              </button>
            </div>
          )}

          {screen === "reflection" && (
            <div className="max-w-xl mx-auto w-full pt-10 pb-20 screen-in">
              <button
                onClick={() => setScreen("why")}
                className="font-mono text-xs font-bold text-[#596078] mb-6 hover:text-[#111118]"
              >
                ← BACK
              </button>

              <div className="eyebrow-tag mb-2">STEP 3 OF 3</div>
              <h2 className="font-sans text-3xl font-extrabold text-[#111118] mb-6 tracking-tight">
                Reflection & Timeline
              </h2>

              <div className="space-y-6 mb-8">
                <div>
                  <label className="eyebrow-tag block mb-2">DO YOU HAVE AN ALTERNATIVE?</label>
                  <div className="flex gap-2">
                    {(["yes", "kind-of", "no"] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setNewWant({ ...newWant, hasAlternative: opt })}
                        className={`flex-1 p-3 rounded-2xl font-sans text-xs font-bold uppercase transition-colors ${
                          newWant.hasAlternative === opt
                            ? "bg-[#111118] text-white"
                            : "bg-white border border-[#111118]/[0.1] text-[#596078]"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="eyebrow-tag block mb-2">EXPECTED USE FREQUENCY</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["daily", "weekly", "sometimes", "rarely"] as const).map((freq) => (
                      <button
                        key={freq}
                        onClick={() => setNewWant({ ...newWant, useFrequency: freq })}
                        className={`p-3 rounded-2xl font-sans text-xs font-bold uppercase transition-colors ${
                          newWant.useFrequency === freq
                            ? "bg-[#111118] text-white"
                            : "bg-white border border-[#111118]/[0.1] text-[#596078]"
                        }`}
                      >
                        {freq}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="eyebrow-tag block mb-2">DEADLINE</label>
                  <div className="flex flex-wrap gap-2">
                    {DEADLINES.map((d) => (
                      <button
                        key={d}
                        onClick={() => setNewWant({ ...newWant, deadline: d })}
                        className={`px-4 py-2 rounded-full font-sans text-xs font-semibold ${
                          newWant.deadline === d
                            ? "bg-[#111118] text-white"
                            : "bg-white border border-[#111118]/[0.1] text-[#596078]"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={addWantComplete}
                className="w-full bg-[#111118] text-white p-4 rounded-2xl font-sans text-sm font-bold shadow-lg"
              >
                Save Want ✨
              </button>
            </div>
          )}

          {/* 6. WANT DETAIL MODAL */}
          {screen === "card-detail" && selectedWant && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-[#111118]/[0.1] shadow-2xl space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#596078]">
                      #{selectedWant.id.padStart(4, "0")}
                    </span>
                    <h3 className="font-sans text-2xl font-black text-[#111118] mt-1">
                      {selectedWant.name}
                    </h3>
                  </div>

                  <button
                    onClick={() => setScreen("home")}
                    className="w-8 h-8 rounded-full bg-[#111118]/[0.05] flex items-center justify-center font-bold text-sm"
                  >
                    ✕
                  </button>
                </div>

                <div className="font-sans text-4xl font-black text-[#111118]">
                  ${selectedWant.price.toLocaleString()}
                </div>

                {selectedWant.note && (
                  <div className="h-40 rounded-2xl bg-[#F5F4F8] p-4 flex items-center justify-center overflow-hidden">
                    <img
                      src={selectedWant.note}
                      alt={selectedWant.name}
                      className="max-h-full object-contain drop-shadow-md"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <div className="eyebrow-tag">CHANGE STATUS</div>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => {
                        handleStateChange(selectedWant.id, "waiting")
                        setScreen("home")
                      }}
                      className="p-2.5 rounded-xl bg-[#DCD6F7] text-[#3A1660] font-sans text-xs font-bold"
                    >
                      WAITING
                    </button>
                    <button
                      onClick={() => {
                        handleStateChange(selectedWant.id, "skipped")
                        setScreen("home")
                      }}
                      className="p-2.5 rounded-xl bg-[#D0EADF] text-[#0A4A28] font-sans text-xs font-bold"
                    >
                      SKIPPED
                    </button>
                    <button
                      onClick={() => {
                        handleStateChange(selectedWant.id, "bought")
                        setScreen("home")
                      }}
                      className="p-2.5 rounded-xl bg-[#E2E2EC] text-[#52546A] font-sans text-xs font-bold"
                    >
                      BOUGHT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}
