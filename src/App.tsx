import { useState, useRef, useEffect } from "react"
import { fetchProductMetadata, ProductMetadata } from "./utils/metadataExtractor"

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────────────────────
const F    = "'Inter', system-ui, sans-serif"
const MONO = "'DM Mono', monospace"

// Colors
const T1   = "#0C0C14"          // primary text
const T2   = "#52546A"          // secondary text
const T3   = "#9EA3B5"          // muted / labels
const ACC  = "#0C0C14"          // accent (buttons)

// Card surfaces
const CARD: React.CSSProperties = {
  background: "rgba(255,255,255,0.88)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.92)",
}
const CARD_SOFT: React.CSSProperties = {
  background: "rgba(255,255,255,0.60)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.80)",
}

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
type Period    = "weekly" | "fortnightly" | "monthly"
type WantState = "new" | "thinking" | "waiting" | "bought" | "skipped"
type CompKey   = "burger"|"coffee"|"groceries"|"movie"|"game"|"petrol"|"clothes"|
                 "flight"|"gym"|"concert"|"rideshare"|"haircut"|"restaurant"|
                 "streaming"|"transit"|"hostel"
type CustomComp  = { id: string; label: string; emoji: string; price: number }
type UserProfile = { moneyType: string; period: Period; amount: number; hourlyRate?: number; comparisons: CompKey[]; customComps: CustomComp[]; customContexts: string[] }
type Want = {
  id: string; name: string; price: number; context: string; state: WantState
  addedAt: Date; desire?: number; urgency?: number; reasons?: string[]
  hasAlternative?: "yes"|"kind-of"|"no"; useFrequency?: "daily"|"weekly"|"sometimes"|"rarely"
  stillWant?: "definitely"|"maybe"|"probably-not"; deadline?: string; note?: string
}
type Screen = "onboarding"|"home"|"add"|"your-price"|"why"|"reflection"|
              "urgency"|"desire-urgency"|"decision"|"card-detail"|"contexts"|"insights"|"profile"

// ─────────────────────────────────────────────────────────────────────────────
// REFERENCE DATA
// ─────────────────────────────────────────────────────────────────────────────
const COMPS: Record<CompKey, { label: string; sublabel: string; emoji: string; price: number; category: string; color: string }> = {
  burger:     { label: "burgers",          sublabel: "fav place",           emoji: "🍔", price: 15,  category: "Everyday",      color: "#E8824A" },
  coffee:     { label: "coffees",          sublabel: "specialty latte",     emoji: "☕", price: 6,   category: "Everyday",      color: "#7B4A22" },
  groceries:  { label: "grocery runs",     sublabel: "weekly shop",         emoji: "🛒", price: 120, category: "Everyday",      color: "#4CAF50" },
  movie:      { label: "cinema tickets",   sublabel: "incl. snacks",        emoji: "🎬", price: 22,  category: "Everyday",      color: "#7B52D4" },
  haircut:    { label: "haircuts",         sublabel: "incl. tip",           emoji: "💇", price: 45,  category: "Lifestyle",     color: "#E05090" },
  clothes:    { label: "outfits",          sublabel: "mid-range",           emoji: "👕", price: 60,  category: "Lifestyle",     color: "#2196F3" },
  gym:        { label: "gym sessions",     sublabel: "per session",         emoji: "🏋️", price: 20,  category: "Lifestyle",     color: "#00BCD4" },
  restaurant: { label: "dinners out",      sublabel: "sit-down meal",       emoji: "🍽️", price: 55,  category: "Lifestyle",     color: "#E85030" },
  game:       { label: "games",            sublabel: "new release",         emoji: "🎮", price: 79,  category: "Entertainment", color: "#6A3AB0" },
  concert:    { label: "concerts",         sublabel: "floor ticket",        emoji: "🎵", price: 120, category: "Entertainment", color: "#C0185A" },
  streaming:  { label: "streaming months", sublabel: "premium plan",        emoji: "📺", price: 17,  category: "Entertainment", color: "#3F51B5" },
  petrol:     { label: "tank fills",       sublabel: "full tank",           emoji: "⛽", price: 80,  category: "Transport",     color: "#607D8B" },
  transit:    { label: "weekly transit",   sublabel: "public transport",    emoji: "🚆", price: 45,  category: "Transport",     color: "#00ACC1" },
  rideshare:  { label: "rideshares",       sublabel: "avg trip",            emoji: "🚕", price: 25,  category: "Transport",     color: "#E0A000" },
  flight:     { label: "short flights",    sublabel: "domestic return",     emoji: "✈️", price: 300, category: "Travel",        color: "#1565C0" },
  hostel:     { label: "hostel nights",    sublabel: "private room",        emoji: "🎒", price: 50,  category: "Travel",        color: "#2E7D32" },
}
const COMP_CATS = ["Everyday","Lifestyle","Entertainment","Transport","Travel"]
const ALL_KEYS  = Object.keys(COMPS) as CompKey[]
const CONTEXTS  = ["Hobbies","Home","Fitness","Travel","Study","Work","Personal"]

const CTX_BLOB: Record<string, { fill: string; label: string; emoji: string }> = {
  Hobbies:  { fill: "#F0A070", label: "#7A2800", emoji: "🎨" },
  Home:     { fill: "#E8C840", label: "#5A3A00", emoji: "🏠" },
  Fitness:  { fill: "#70C890", label: "#0A4A1A", emoji: "💪" },
  Travel:   { fill: "#60B0F0", label: "#003A70", emoji: "✈️" },
  Study:    { fill: "#B090F0", label: "#3A0070", emoji: "📚" },
  Work:     { fill: "#F070A0", label: "#70003A", emoji: "💼" },
  Personal: { fill: "#A0D080", label: "#205000", emoji: "🌿" },
}
const CTX_IMG: Record<string, { from: string; to: string }> = {
  Hobbies:  { from: "#FDE8D8", to: "#F5C4A8" },
  Home:     { from: "#FEF4CC", to: "#FCE488" },
  Fitness:  { from: "#D6F5E3", to: "#9FE3BA" },
  Travel:   { from: "#D4ECFD", to: "#98D2FB" },
  Study:    { from: "#EAE0FD", to: "#C7B2FA" },
  Work:     { from: "#FDDCE8", to: "#F9A8C7" },
  Personal: { derivedFrom: "Hobbies", from: "#E4F7D8", to: "#BCE9A4" },
}

const INIT_WANTS: Want[] = [
  { id:"1", name:"Fujifilm X-A20",   price:375, context:"Hobbies", state:"new",      addedAt:new Date(Date.now()-2*86400000), desire:4, urgency:2 },
  { id:"2", name:"Sony WH-1000XM5", price:499, context:"Work",    state:"thinking", addedAt:new Date(Date.now()-6*86400000), desire:4, urgency:3 },
  { id:"3", name:"Nike Air Max 90",  price:160, context:"Fitness", state:"waiting",  addedAt:new Date(Date.now()-12*86400000), desire:5, urgency:1 },
  { id:"4", name:"Keychron K2 Pro",  price:180, context:"Work",    state:"skipped",  addedAt:new Date(Date.now()-20*86400000) },
]
const DEFAULT_PROFILE: UserProfile = {
  moneyType:"salary", period:"fortnightly", amount:400, hourlyRate:25,
  comparisons:["burger","coffee","flight","movie"], customComps:[], customContexts:[],
}

// ─────────────────────────────────────────────────────────────────────────────
// BRAND MARK
// ─────────────────────────────────────────────────────────────────────────────
function BrandMark({ size = 22, color = T1 }: { size?: number; color?: string }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
      <span style={{ fontFamily:F, fontSize:size, fontWeight:900, color, letterSpacing:"-0.05em" }}>PAUSE.</span>
      <span style={{ fontFamily:MONO, fontSize:size * 0.42, letterSpacing:"0.12em", color:T3, fontWeight:500 }}>|| WORTH IT?</span>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// NAVIGATION ICONS
// ─────────────────────────────────────────────────────────────────────────────
function IconWants({ active }: { active: boolean }) {
  const s = active ? 2.0 : 1.5
  return (
    <svg width={22} height={22} viewBox="0 0 22 22" fill="none">
      <rect x={2} y={4} width={18} height={14} rx={3} stroke={active ? "#FFF" : T1} strokeWidth={s} />
      <line x1={2} y1={9} x2={20} y2={9} stroke={active ? "#FFF" : T1} strokeWidth={s} />
      <circle cx={11} cy={9} r={2} fill={active ? "#FFF" : "none"} stroke={active ? "#FFF" : T1} strokeWidth={active ? 0 : s} />
    </svg>
  )
}
function IconContexts({ active }: { active: boolean }) {
  const s = active ? 2.0 : 1.5
  return (
    <svg width={22} height={22} viewBox="0 0 22 22" fill="none">
      <circle cx={7.5} cy={7.5} r={3} stroke={active ? "#FFF" : T1} strokeWidth={s} fill={active ? "#FFF" : "none"} />
      <circle cx={14.5} cy={7.5} r={2.5} stroke={active ? "#FFF" : T1} strokeWidth={s} fill="none" />
      <circle cx={7.5} cy={15} r={2.5} stroke={active ? "#FFF" : T1} strokeWidth={s} fill="none" />
      <circle cx={15} cy={14.5} r={3} stroke={active ? "#FFF" : T1} strokeWidth={s} fill="none" />
    </svg>
  )
}
function IconInsights({ active }: { active: boolean }) {
  const s = active ? 2.0 : 1.5
  return (
    <svg width={22} height={22} viewBox="0 0 22 22" fill="none">
      <rect x={3} y={13} width={4} height={7} rx={1} fill={active ? "#FFF" : "none"} stroke={active ? "#FFF" : T1} strokeWidth={s} />
      <rect x={9} y={8}  width={4} height={12} rx={1} fill={active ? "#FFF" : "none"} stroke={active ? "#FFF" : T1} strokeWidth={s} />
      <rect x={15} y={4} width={4} height={16} rx={1} fill={active ? "#FFF" : "none"} stroke={active ? "#FFF" : T1} strokeWidth={s} />
    </svg>
  )
}
function IconProfile({ active }: { active: boolean }) {
  const s = active ? 2.0 : 1.5
  return (
    <svg width={22} height={22} viewBox="0 0 22 22" fill="none">
      <circle cx={11} cy={7.5} r={3.5} stroke={active ? "#FFF" : T1} strokeWidth={s} fill={active ? "#FFF" : "none"} />
      <path d="M3.5 19c0-4.14 3.36-7.5 7.5-7.5s7.5 3.36 7.5 7.5" stroke={active ? "#FFF" : T1} strokeWidth={s} strokeLinecap="round" />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ATOMS & HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function Tag({ label, bg, fg }: { label: string; bg: string; fg: string }) {
  return (
    <span style={{ background:bg, color:fg, borderRadius:99, padding:"3px 10px", fontFamily:MONO, fontSize:8.5, fontWeight:500, letterSpacing:"0.08em", whiteSpace:"nowrap", display:"inline-block" }}>
      {label}
    </span>
  )
}
function StateTag({ state }: { state: WantState }) {
  const map: Record<WantState, { label: string; bg: string; fg: string }> = {
    new:      { label:"NEW WANT",   bg:"#0C0C14", fg:"#FFF" },
    thinking: { label:"THINKING",   bg:"#E8DCFA", fg:"#5A2A9A" },
    waiting:  { label:"COOLING OFF",bg:"#D8EAFA", fg:"#1A4A8A" },
    bought:   { label:"PURCHASED", bg:"#E2E2EC", fg:"#52546A" },
    skipped:  { label:"SKIPPED ✨", bg:"#D8F2E2", fg:"#1A6A3A" },
  }
  const t = map[state] || map.new
  return <Tag label={t.label} bg={t.bg} fg={t.fg} />
}
function CtxTag({ ctx }: { ctx: string }) {
  const b = CTX_BLOB[ctx] || { fill:"#E2E2EC", label:T2, emoji:"🏷️" }
  return <Tag label={`${b.emoji} ${ctx.toUpperCase()}`} bg="rgba(0,0,0,0.06)" fg={T1} />
}
function HDivider() {
  return <div style={{ height:1, background:"rgba(0,0,0,0.06)", margin:"12px 0" }} />
}
function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="pressable" style={{ background:"none", border:"none", cursor:"pointer", fontFamily:MONO, fontSize:9, letterSpacing:"0.12em", color:T2, padding:0, display:"inline-flex", alignItems:"center", gap:4 }}>
      <span>←</span> BACK
    </button>
  )
}
function PrimaryBtn({ label, onClick, disabled }: { label: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled} className="pressable" style={{
      width:"100%", background:disabled?"#E2E2EC":ACC, color:disabled?T3:"#FFF",
      border:"none", borderRadius:99, padding:"16px 24px", fontFamily:F, fontSize:15,
      fontWeight:700, cursor:disabled?"default":"pointer", letterSpacing:"-0.01em",
      boxShadow:disabled?"none":"0 4px 20px rgba(12,12,20,0.18)", transition:"all 0.18s",
    }}>
      {label}
    </button>
  )
}
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontFamily:MONO, fontSize:8.5, letterSpacing:"0.12em", color:T3, marginBottom:8 }}>{children}</div>
}
function daysSince(d: Date): number {
  return Math.max(0, Math.floor((Date.now() - new Date(d).getTime()) / (1000 * 60 * 60 * 24)))
}

function getComps(price: number, profile: UserProfile) {
  const keys = profile.comparisons.length > 0 ? profile.comparisons : (["burger","coffee","flight","movie"] as CompKey[])
  const list = keys.map(k => {
    const c = COMPS[k]
    if (!c) return null
    const qty = +(price / c.price).toFixed(1)
    return { ...c, qty, key: k }
  }).filter(Boolean) as (typeof COMPS[CompKey] & { qty: number; key: string })[]

  const custom = (profile.customComps ?? []).map(c => ({
    label: c.label, sublabel: "custom", emoji: c.emoji, price: c.price, category: "Custom", color: "#666",
    qty: +(price / c.price).toFixed(1), key: c.id,
  }))

  return [...list, ...custom]
}

function getChips(price: number, profile: UserProfile) {
  const chips: { emoji: string; value: string; label: string }[] = []
  if (profile.hourlyRate && profile.hourlyRate > 0) {
    const hrs = (price / profile.hourlyRate).toFixed(1)
    chips.push({ emoji: "⏳", value: `${hrs} hrs`, label: "Work equivalent" })
  }
  const comps = getComps(price, profile)
  if (comps[0]) chips.push({ emoji: comps[0].emoji, value: `${comps[0].qty}x`, label: comps[0].label })
  if (comps[1]) chips.push({ emoji: comps[1].emoji, value: `${comps[1].qty}x`, label: comps[1].label })
  if (profile.amount > 0) {
    const pct = Math.round((price / profile.amount) * 100)
    chips.push({ emoji: "📊", value: `${pct}%`, label: `Of ${profile.period} budget` })
  }
  return chips
}

// ─────────────────────────────────────────────────────────────────────────────
// TICKET CARD WITH PHYSICAL INWARD CUTOUTS
// ─────────────────────────────────────────────────────────────────────────────
function TicketCard({ want, chips, compact, onClick, style }: {
  want: Want; chips?: ReturnType<typeof getChips>; compact?: boolean; onClick?: () => void; style?: React.CSSProperties
}) {
  const days  = daysSince(want.addedAt)
  const faded = want.state === "skipped" || want.state === "bought"
  const img   = CTX_IMG[want.context]  || { from:"#F0EBE3", to:"#E8E0D4" }
  const blob  = CTX_BLOB[want.context] || { fill:"#C8C4C0", emoji:"✦" }
  const tickNum = `#${want.id.padStart(4,"0")}`
  const customImgUrl = want.note?.startsWith("http") ? want.note : undefined

  return (
    <div onClick={onClick} className={`ticket-wrapper ${onClick ? "pressable" : ""}`} style={{
      position:"relative", opacity:faded ? 0.50 : 1, cursor:onClick ? "pointer" : "default",
      ...style,
    }}>
      {/* Physical Inward Semicircular Ticket Cutouts */}
      {!compact && (
        <>
          <div className="ticket-cutout-left" />
          <div className="ticket-cutout-right" />
        </>
      )}

      {!compact && (
        <>
          {/* Image area */}
          <div style={{ height:180, background:customImgUrl ? "#0B0B10" : `linear-gradient(140deg, ${img.from}, ${img.to})`, borderRadius:"24px 24px 0 0", overflow:"hidden", position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
            {customImgUrl ? (
              <img src={customImgUrl} alt={want.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={(e)=>{ (e.target as HTMLElement).style.display="none" }} />
            ) : (
              <span style={{ fontSize:96, opacity:0.18, userSelect:"none", marginTop:10 }}>{blob.emoji}</span>
            )}
            <div style={{ position:"absolute", right:18, bottom:-10, fontFamily:F, fontSize:84, fontWeight:900, color:"rgba(0,0,0,0.045)", letterSpacing:"-0.05em", lineHeight:1, userSelect:"none" }}>
              {want.name.charAt(0)}
            </div>
            <div style={{ position:"absolute", top:14, right:16, display:"flex", gap:10 }}>
              {days > 0 && <span style={{ fontFamily:MONO, fontSize:8, color:customImgUrl ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.32)", letterSpacing:"0.08em" }}>DAY {String(days).padStart(2,"0")}</span>}
              <span style={{ fontFamily:MONO, fontSize:8, color:customImgUrl ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.32)", letterSpacing:"0.08em" }}>{tickNum}</span>
            </div>
          </div>

          {/* Perforated divider line */}
          <div style={{ position:"relative", height:18, display:"flex", alignItems:"center", zIndex:1 }}>
            <div style={{ flex:1, height:0, borderTop:"1.5px dashed rgba(0,0,0,0.12)", background:"rgba(255,255,255,0.88)" }} />
          </div>
        </>
      )}

      {/* Body */}
      <div style={{ padding:compact ? "14px 16px" : "18px 24px 20px", borderRadius:compact ? 24 : "0 0 24px 24px", ...CARD }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:compact ? 8 : 10 }}>
          <CtxTag ctx={want.context} />
          <StateTag state={want.state} />
        </div>
        <div style={{ fontFamily:F, fontSize:compact ? 12 : 14, fontWeight:500, color:T2, marginBottom:2, lineHeight:1.3 }}>{want.name}</div>
        <div style={{ fontFamily:F, fontSize:compact ? 28 : 52, fontWeight:900, color:T1, lineHeight:1, letterSpacing:"-0.05em", marginBottom:chips && chips.length && !compact ? 14 : 0 }}>
          ${want.price.toLocaleString()}
        </div>

        {chips && chips.length > 0 && !compact && (
          <>
            <HDivider />
            <div style={{ display:"flex", gap:14, marginTop:12, flexWrap:"wrap" }}>
              {chips.slice(0,4).map((c,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:5 }}>
                  <span style={{ fontSize:12 }}>{c.emoji}</span>
                  <div>
                    <div style={{ fontFamily:F, fontSize:13, fontWeight:700, color:T1, lineHeight:1, letterSpacing:"-0.02em" }}>{c.value}</div>
                    <div style={{ fontFamily:MONO, fontSize:7.5, color:T3, lineHeight:1.2, letterSpacing:"0.04em" }}>{c.label.toUpperCase()}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {!compact && (
          <div style={{ display:"flex", justifyContent:"flex-end", marginTop:10 }}>
            <span style={{ fontFamily:MONO, fontSize:7.5, color:T3, letterSpacing:"0.08em" }}>{tickNum}</span>
          </div>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// STACK VIEW — KEYBOARD & HORIZONTAL DESKTOP CAROUSEL
// ─────────────────────────────────────────────────────────────────────────────
function CardStack({ wants, profile, onSelect }: {
  wants: Want[]; profile: UserProfile; onSelect: (id: string) => void
}) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        setIdx((prev) => Math.max(0, prev - 1))
      } else if (e.key === "ArrowRight") {
        setIdx((prev) => Math.min(wants.length - 1, prev + 1))
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [wants.length])

  if (wants.length === 0) return (
    <div style={{ ...CARD, borderRadius:24, padding:"60px 24px", textAlign:"center" }}>
      <div style={{ fontFamily:F, color:T3, fontSize:15, lineHeight:1.6 }}>Nothing on your mind yet.<br/><span style={{ fontSize:13 }}>Add a want to get started.</span></div>
    </div>
  )

  const safeIdx = Math.min(idx, wants.length - 1)
  const front   = wants[safeIdx]
  const prevWant = safeIdx > 0 ? wants[safeIdx - 1] : null
  const nextWant = safeIdx < wants.length - 1 ? wants[safeIdx + 1] : null
  const chips   = getChips(front.price, profile)

  return (
    <div style={{ width: "100%" }}>
      <div className="desktop-stack-container">
        {/* Previous peek card */}
        {prevWant && (
          <div className="stack-peek-card desktop-only-nav" onClick={() => setIdx(safeIdx - 1)}>
            <TicketCard want={prevWant} compact />
          </div>
        )}

        {/* Primary active ticket */}
        <div className="stack-primary-card crossfade-in" key={front.id}>
          <TicketCard want={front} chips={chips} onClick={() => onSelect(front.id)} />
        </div>

        {/* Next peek card */}
        {nextWant && (
          <div className="stack-peek-card desktop-only-nav" onClick={() => setIdx(safeIdx + 1)}>
            <TicketCard want={nextWant} compact />
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      {wants.length > 1 && (
        <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:16, marginTop:20 }}>
          <button onClick={() => setIdx(Math.max(0, safeIdx - 1))} disabled={safeIdx===0} className="pressable"
            style={{ background:ACC, color:"#FFF", border:"none", borderRadius:99, width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center", cursor:safeIdx===0?"default":"pointer", opacity:safeIdx===0?0.25:1, fontSize:16 }}>{"←"}</button>
          <span style={{ fontFamily:MONO, fontSize:11, letterSpacing:"0.14em", color:T2, minWidth:60, textAlign:"center" }}>
            {String(safeIdx + 1).padStart(2,"0")} / {String(wants.length).padStart(2,"0")}
          </span>
          <button onClick={() => setIdx(Math.min(wants.length - 1, safeIdx + 1))} disabled={safeIdx>=wants.length-1} className="pressable"
            style={{ background:ACC, color:"#FFF", border:"none", borderRadius:99, width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center", cursor:safeIdx>=wants.length-1?"default":"pointer", opacity:safeIdx>=wants.length-1?0.25:1, fontSize:16 }}>{"→"}</button>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// GRID VIEW — MODULAR CARDS INTELLIGENT FILLING
// ─────────────────────────────────────────────────────────────────────────────
function GridView({ wants, onSelect }: { wants: Want[]; onSelect: (id: string) => void }) {
  if (wants.length === 0) return null
  return (
    <div className="grid-wants-responsive">
      {wants.map(w => {
        const img  = CTX_IMG[w.context]  || { from:"#F0EBE3", to:"#E8E0D4" }
        const blob = CTX_BLOB[w.context] || { fill:"#C8C4C0", emoji:"✦" }
        const faded = w.state==="skipped"||w.state==="bought"
        const customImgUrl = w.note?.startsWith("http") ? w.note : undefined

        return (
          <div key={w.id} onClick={() => onSelect(w.id)} className="pressable ticket-wrapper" style={{
            ...CARD, borderRadius:20, overflow:"hidden", cursor:"pointer",
            opacity:faded?0.50:1,
          }}>
            {/* Image */}
            <div style={{ height:120, background:customImgUrl ? "#0B0B10" : `linear-gradient(140deg, ${img.from}, ${img.to})`, position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
              {customImgUrl ? (
                <img src={customImgUrl} alt={w.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={(e)=>{ (e.target as HTMLElement).style.display="none" }} />
              ) : (
                <span style={{ fontSize:52, opacity:0.20, userSelect:"none" }}>{blob.emoji}</span>
              )}
              <div style={{ position:"absolute", top:8, right:8 }}><StateTag state={w.state} /></div>
            </div>
            {/* Info */}
            <div style={{ padding:"14px 16px" }}>
              <div style={{ marginBottom:6 }}><CtxTag ctx={w.context} /></div>
              <div style={{ fontFamily:F, fontSize:13, fontWeight:500, color:T2, marginBottom:4, lineHeight:1.3, overflow:"hidden", textOverflow:"ellipsis", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" as const }}>{w.name}</div>
              <div style={{ fontFamily:F, fontSize:24, fontWeight:900, color:T1, letterSpacing:"-0.04em", lineHeight:1 }}>${w.price.toLocaleString()}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// DESKTOP & MOBILE NAVIGATION
// ─────────────────────────────────────────────────────────────────────────────
function DesktopHeader({ screen, navigate, onAdd }: { screen: Screen; navigate: (s: Screen) => void; onAdd: () => void }) {
  const tabs = [
    { id:"home",     label:"WANTS" },
    { id:"contexts", label:"CONTEXTS" },
    { id:"insights", label:"INSIGHTS" },
    { id:"profile",  label:"PROFILE" },
  ] as const

  return (
    <header className="desktop-only-nav responsive-padding" style={{ width:"100%", padding:"20px 0", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100, backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)", background:"rgba(244,243,247,0.85)", borderBottom:"1px solid rgba(12,10,20,0.06)", marginBottom:28 }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, cursor:"pointer" }} onClick={() => navigate("home")}>
        <BrandMark size={22} color={T1} />
      </div>

      <nav style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(12,10,20,0.05)", padding:"4px", borderRadius:99 }}>
        {tabs.map(({ id, label }) => (
          <button key={id} onClick={() => navigate(id as Screen)} className="pressable" style={{ background:screen===id ? T1 : "transparent", color:screen===id ? "#FFF" : T2, border:"none", borderRadius:99, padding:"8px 20px", fontFamily:MONO, fontSize:10, fontWeight:screen===id ? 600 : 500, letterSpacing:"0.10em", cursor:"pointer", transition:"all 0.18s ease" }}>
            {label}
          </button>
        ))}
      </nav>

      <button onClick={onAdd} className="pressable" style={{ display:"inline-flex", alignItems:"center", gap:8, background:ACC, color:"#FFF", border:"none", borderRadius:99, padding:"11px 24px", fontFamily:F, fontSize:14, fontWeight:600, cursor:"pointer", letterSpacing:"-0.01em", boxShadow:"0 2px 14px rgba(12,12,20,0.18)" }}>
        <span style={{ fontSize:16, lineHeight:1 }}>+</span> Add a want
      </button>
    </header>
  )
}

function BottomNav({ screen, navigate, onAdd }: { screen: Screen; navigate: (s: Screen) => void; onAdd: () => void }) {
  const tabs = [
    { id:"home",     label:"WANTS",    Icon:IconWants    },
    { id:"contexts", label:"CONTEXTS", Icon:IconContexts },
  ] as const
  const tabs2 = [
    { id:"insights", label:"INSIGHTS", Icon:IconInsights },
    { id:"profile",  label:"PROFILE",  Icon:IconProfile  },
  ] as const

  return (
    <div className="mobile-only-nav" style={{ flexShrink:0, position:"fixed", bottom:0, left:0, right:0, zIndex:90, padding:`8px 16px max(env(safe-area-inset-bottom, 0px) + 8px, 20px)` }}>
      <div style={{ maxWidth:430, margin:"0 auto", background:"rgba(12,10,20,0.92)", backdropFilter:"blur(28px)", WebkitBackdropFilter:"blur(28px)", borderRadius:32, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 8px", boxShadow:"0 8px 40px rgba(0,0,0,0.36), 0 1px 0 rgba(255,255,255,0.07) inset" }}>
        {tabs.map(({ id, label, Icon }) => (
          <button key={id} onClick={() => navigate(id as Screen)} className="pressable" style={{ background:screen===id?"rgba(255,255,255,0.12)":"none", border:"none", borderRadius:16, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3, padding:"8px 12px", transition:"all 0.18s" }}>
            <Icon active={screen===id} />
            <span style={{ fontFamily:MONO, fontSize:7, letterSpacing:"0.09em", color:screen===id?"#FFF":"rgba(255,255,255,0.42)", fontWeight: screen===id ? 600 : 400 }}>{label}</span>
          </button>
        ))}
        <button onClick={onAdd} className="pressable" style={{ background:"#FFF", border:"none", borderRadius:99, width:48, height:48, display:"flex", alignItems:"center", justifyContent:"center", color:T1, fontSize:22, cursor:"pointer", flexShrink:0, boxShadow:"0 2px 12px rgba(255,255,255,0.20)", lineHeight:1 }}>+</button>
        {tabs2.map(({ id, label, Icon }) => (
          <button key={id} onClick={() => navigate(id as Screen)} className="pressable" style={{ background:screen===id?"rgba(255,255,255,0.12)":"none", border:"none", borderRadius:16, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3, padding:"8px 12px", transition:"all 0.18s" }}>
            <Icon active={screen===id} />
            <span style={{ fontFamily:MONO, fontSize:7, letterSpacing:"0.09em", color:screen===id?"#FFF":"rgba(255,255,255,0.42)", fontWeight: screen===id ? 600 : 400 }}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell-root">
      <div className="app-shell-container">
        {children}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// HOME SCREEN (WANTS)
// ─────────────────────────────────────────────────────────────────────────────
function HomeScreen({ wants, profile, onAdd, onSelect }: {
  wants: Want[]; profile: UserProfile; onAdd: () => void; onSelect: (id: string) => void
}) {
  const [viewMode, setViewMode] = useState<"stack"|"grid">("stack")
  const active  = wants.filter(w => w.state !== "bought" && w.state !== "skipped")
  const skipped = wants.filter(w => w.state === "skipped")
  const skTotal = skipped.reduce((s,w) => s+w.price, 0)
  const total   = active.length

  return (
    <div style={{ flex:1, overflowY:"auto", display:"flex", flexDirection:"column", position:"relative" }} className="hide-scroll screen-in">
      {/* Editorial Hero */}
      <div style={{ paddingTop:12, paddingBottom:20, textAlign:"center", flexShrink:0, position:"relative", zIndex:1 }} className="responsive-padding">
        <div style={{ fontFamily:F, fontSize:64, fontWeight:900, color:T1, lineHeight:0.92, letterSpacing:"-0.06em", marginBottom:8 }}>PAUSE.</div>
        <div style={{ fontFamily:F, fontSize:15, color:T2, fontWeight:400, marginBottom:20 }}>Think before you spend.</div>
        <button onClick={onAdd} className="pressable" style={{ display:"inline-flex", alignItems:"center", gap:8, background:ACC, color:"#FFF", border:"none", borderRadius:99, padding:"12px 24px", fontFamily:F, fontSize:14, fontWeight:600, cursor:"pointer", letterSpacing:"-0.01em", boxShadow:"0 2px 14px rgba(12,12,20,0.18)" }}>
          <span style={{ fontSize:16, lineHeight:1 }}>+</span> Add a want
        </button>
      </div>

      {/* Collection Section */}
      <div style={{ flex:1, paddingBottom:36, position:"relative", zIndex:1 }} className="responsive-padding">
        {/* Toggle & Count Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <span style={{ fontFamily:MONO, fontSize:9, letterSpacing:"0.14em", color:T3, textTransform:"uppercase" }}>{total} ON YOUR MIND</span>
          {total > 0 && (
            <div style={{ display:"flex", background:"rgba(12,10,20,0.06)", borderRadius:99, padding:3, gap:2 }}>
              {(["stack","grid"] as const).map(m => (
                <button key={m} onClick={() => setViewMode(m)} className="pressable" style={{
                  background:viewMode===m ? T1 : "transparent",
                  border:"none", borderRadius:99, padding:"5px 14px",
                  fontFamily:MONO, fontSize:8, letterSpacing:"0.10em",
                  color:viewMode===m ? "#FFF" : T2, cursor:"pointer",
                  fontWeight:viewMode===m ? 600 : 400, transition:"all 0.15s"
                }}>
                  {m.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>

        {viewMode==="stack"
          ? <CardStack wants={active} profile={profile} onSelect={onSelect} />
          : <GridView wants={active} onSelect={onSelect} />
        }

        {skipped.length > 0 && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginTop:24 }}>
            {[{big:`${skipped.length}`,label:"skipped"},{big:`$${skTotal.toLocaleString()}`,label:"potential avoided"}].map((t,i) => (
              <div key={i} style={{ ...CARD_SOFT, borderRadius:20, padding:"18px 20px" }}>
                <div style={{ fontFamily:F, fontSize:26, fontWeight:900, color:T1, letterSpacing:"-0.05em", marginBottom:2 }}>{t.big}</div>
                <div style={{ fontFamily:MONO, fontSize:8.5, color:T3, letterSpacing:"0.10em", textTransform:"uppercase" }}>{t.label}</div>
              </div>
            ))}
          </div>
        )}
        <div style={{ height:80 }} />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ADD FLOW SCREENS
// ─────────────────────────────────────────────────────────────────────────────
function AddScreen({ newWant, setNewWant, onNext, onBack, profile }: {
  newWant: Partial<Want>; setNewWant: (w: Partial<Want>) => void; onNext: () => void; onBack: () => void; profile: UserProfile
}) {
  const [urlInput, setUrlInput] = useState("")
  const [loadingUrl, setLoadingUrl] = useState(false)
  const allCtx = [...CONTEXTS, ...(profile.customContexts ?? [])]

  function upd(p: Partial<Want>) { setNewWant({ ...newWant, ...p }) }

  async function handleUrlInput(val: string) {
    setUrlInput(val)
    if (val.length > 8 && (val.startsWith("http://") || val.startsWith("https://") || val.includes("."))) {
      setLoadingUrl(true)
      try {
        const meta = await fetchProductMetadata(val)
        if (meta.title && !newWant.name) upd({ name: meta.title })
        if (meta.price && !newWant.price) upd({ price: meta.price })
        if (meta.image) upd({ note: meta.image })
      } catch (e) {
      } finally {
        setLoadingUrl(false)
      }
    }
  }

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", padding:"24px 0" }} className="screen-in responsive-padding flow-card-container">
      <BackBtn onClick={onBack} />
      <div style={{ margin:"20px 0 24px" }}>
        <div style={{ fontFamily:F, fontSize:36, fontWeight:900, color:T1, lineHeight:1.0, letterSpacing:"-0.04em" }}>What do you want?</div>
        <div style={{ fontFamily:F, fontSize:13, color:T2, marginTop:4 }}>Paste a product URL or enter details manually.</div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:18, flex:1 }}>
        {/* Product URL Input */}
        <div>
          <SectionLabel>PRODUCT URL (OPTIONAL AUTO-FILL)</SectionLabel>
          <div style={{ position:"relative" }}>
            <input type="text" value={urlInput} onChange={e=>handleUrlInput(e.target.value)} placeholder="https://example.com/product/..."
              style={{ width:"100%", ...CARD_SOFT, borderRadius:14, padding:"14px 16px", fontFamily:MONO, fontSize:12, color:T1, outline:"none" }} />
            {loadingUrl && (
              <span className="fade-in" style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", fontFamily:MONO, fontSize:9, color:T3, letterSpacing:"0.08em" }}>
                FINDING METADATA...
              </span>
            )}
          </div>
        </div>
        <div>
          <SectionLabel>ITEM NAME</SectionLabel>
          <input type="text" value={newWant.name||""} onChange={e=>upd({name:e.target.value})} placeholder="Fujifilm X-A20"
            style={{ width:"100%", ...CARD, borderRadius:14, padding:"16px 18px", fontFamily:F, fontSize:17, fontWeight:500, color:T1, outline:"none" }} />
        </div>
        <div>
          <SectionLabel>PRICE</SectionLabel>
          <div style={{ position:"relative" }}>
            <span style={{ position:"absolute", left:18, top:"50%", transform:"translateY(-50%)", fontFamily:F, fontSize:20, fontWeight:700, color:T3 }}>$</span>
            <input type="number" value={String(newWant.price||"")} onChange={e=>upd({price:Number(e.target.value)})} placeholder="375"
              style={{ width:"100%", ...CARD, borderRadius:14, padding:"18px 18px 18px 38px", fontFamily:F, fontSize:34, fontWeight:900, color:T1, outline:"none", letterSpacing:"-0.04em" }} />
          </div>
        </div>
        <div>
          <SectionLabel>CONTEXT</SectionLabel>
          <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
            {allCtx.map(c => (
              <button key={c} onClick={() => upd({context:c})} className="pressable" style={{ ...CARD_SOFT, borderRadius:99, padding:"9px 16px", fontFamily:F, fontSize:13, fontWeight:500, cursor:"pointer", color:newWant.context===c?"#FFF":T2, background:newWant.context===c?ACC:CARD_SOFT.background, border:newWant.context===c?`1.5px solid ${ACC}`:CARD_SOFT.border, transition:"all 0.14s" }}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ padding:"24px 0" }}>
        <PrimaryBtn label="See what it costs →" onClick={onNext} disabled={!newWant.name||!newWant.price} />
      </div>
    </div>
  )
}

function YourPrice({ want, comps, onNext, onBack }: {
  want: Partial<Want>; comps: ReturnType<typeof getComps>; onNext: () => void; onBack: () => void
}) {
  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", padding:"24px 0" }} className="screen-in responsive-padding flow-card-container">
      <BackBtn onClick={onBack} />
      <div style={{ margin:"18px 0 22px" }}>
        <div style={{ fontFamily:MONO, fontSize:9, letterSpacing:"0.12em", color:T3, marginBottom:4 }}>YOUR PRICE</div>
        <div style={{ fontFamily:F, fontSize:34, fontWeight:900, color:T1, letterSpacing:"-0.04em" }}>{want.name}</div>
        <div style={{ fontFamily:F, fontSize:48, fontWeight:900, color:T1, letterSpacing:"-0.05em" }}>${want.price}</div>
      </div>
      <div style={{ flex:1, display:"flex", flexDirection:"column", gap:10 }}>
        <SectionLabel>IN OTHER TERMS</SectionLabel>
        {comps.slice(0, 4).map((c, i) => (
          <div key={i} style={{ ...CARD, borderRadius:16, padding:"14px 16px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ fontSize:22 }}>{c.emoji}</span>
              <div>
                <div style={{ fontFamily:F, fontSize:14, fontWeight:700, color:T1 }}>{c.label}</div>
                <div style={{ fontFamily:MONO, fontSize:8, color:T3 }}>{c.sublabel}</div>
              </div>
            </div>
            <div style={{ fontFamily:F, fontSize:22, fontWeight:900, color:T1 }}>{c.qty}x</div>
          </div>
        ))}
      </div>
      <div style={{ padding:"20px 0" }}>
        <PrimaryBtn label="Why do you want it? →" onClick={onNext} />
      </div>
    </div>
  )
}

function WhyScreen({ newWant, setNewWant, onNext, onBack }: {
  newWant: Partial<Want>; setNewWant: (w: Partial<Want>) => void; onNext: () => void; onBack: () => void
}) {
  const selected = newWant.reasons || []
  function toggle(r: string) {
    const has = selected.includes(r)
    setNewWant({ ...newWant, reasons: has ? selected.filter(x => x !== r) : [...selected, r] })
  }
  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", padding:"24px 0" }} className="screen-in responsive-padding flow-card-container">
      <BackBtn onClick={onBack} />
      <div style={{ margin:"20px 0 24px" }}>
        <div style={{ fontFamily:F, fontSize:34, fontWeight:900, color:T1, letterSpacing:"-0.04em" }}>Why do you want it?</div>
        <div style={{ fontFamily:F, fontSize:13, color:T2, marginTop:4 }}>Select all that apply.</div>
      </div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:8, flex:1 }}>
        {REASONS.map(r => {
          const sel = selected.includes(r)
          return (
            <button key={r} onClick={() => toggle(r)} className="pressable" style={{ ...CARD_SOFT, borderRadius:99, padding:"10px 18px", fontFamily:F, fontSize:13, fontWeight:500, cursor:"pointer", color:sel?"#FFF":T2, background:sel?ACC:CARD_SOFT.background, border:sel?`1.5px solid ${ACC}`:CARD_SOFT.border, transition:"all 0.14s" }}>
              {r}
            </button>
          )
        })}
      </div>
      <div style={{ padding:"20px 0" }}>
        <PrimaryBtn label="Reflect →" onClick={onNext} />
      </div>
    </div>
  )
}

function ReflectionScreen({ newWant, setNewWant, onNext, onBack }: {
  newWant: Partial<Want>; setNewWant: (w: Partial<Want>) => void; onNext: () => void; onBack: () => void
}) {
  function upd(p: Partial<Want>) { setNewWant({ ...newWant, ...p }) }
  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", padding:"24px 0" }} className="screen-in responsive-padding flow-card-container">
      <BackBtn onClick={onBack} />
      <div style={{ margin:"20px 0 24px" }}>
        <div style={{ fontFamily:F, fontSize:34, fontWeight:900, color:T1, letterSpacing:"-0.04em" }}>Reflection</div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:20, flex:1 }}>
        <div>
          <SectionLabel>DO YOU ALREADY HAVE AN ALTERNATIVE?</SectionLabel>
          <div style={{ display:"flex", gap:8 }}>
            {(["yes","kind-of","no"] as const).map(opt => (
              <button key={opt} onClick={() => upd({hasAlternative:opt})} className="pressable" style={{ flex:1, ...CARD_SOFT, borderRadius:14, padding:12, fontFamily:F, fontSize:13, fontWeight:600, cursor:"pointer", color:newWant.hasAlternative===opt?"#FFF":T2, background:newWant.hasAlternative===opt?ACC:CARD_SOFT.background }}>
                {opt.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div>
          <SectionLabel>HOW OFTEN WILL YOU USE IT?</SectionLabel>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {(["daily","weekly","sometimes","rarely"] as const).map(f => (
              <button key={f} onClick={() => upd({useFrequency:f})} className="pressable" style={{ flex:1, minWidth:100, ...CARD_SOFT, borderRadius:14, padding:12, fontFamily:F, fontSize:13, fontWeight:600, cursor:"pointer", color:newWant.useFrequency===f?"#FFF":T2, background:newWant.useFrequency===f?ACC:CARD_SOFT.background }}>
                {f.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ padding:"20px 0" }}>
        <PrimaryBtn label="Assess Urgency →" onClick={onNext} />
      </div>
    </div>
  )
}

function UrgencyScreen({ newWant, setNewWant, onNext, onBack }: {
  newWant: Partial<Want>; setNewWant: (w: Partial<Want>) => void; onNext: () => void; onBack: () => void
}) {
  function upd(p: Partial<Want>) { setNewWant({ ...newWant, ...p }) }
  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", padding:"24px 0" }} className="screen-in responsive-padding flow-card-container">
      <BackBtn onClick={onBack} />
      <div style={{ margin:"20px 0 24px" }}>
        <div style={{ fontFamily:F, fontSize:34, fontWeight:900, color:T1, letterSpacing:"-0.04em" }}>Urgency & Timeline</div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:20, flex:1 }}>
        <div>
          <SectionLabel>DEADLINE / TIMELINE</SectionLabel>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {DEADLINES.map(d => (
              <button key={d} onClick={() => upd({deadline:d})} className="pressable" style={{ ...CARD_SOFT, borderRadius:99, padding:"10px 16px", fontFamily:F, fontSize:13, fontWeight:500, cursor:"pointer", color:newWant.deadline===d?"#FFF":T2, background:newWant.deadline===d?ACC:CARD_SOFT.background }}>
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ padding:"20px 0" }}>
        <PrimaryBtn label="Evaluate Desire →" onClick={onNext} />
      </div>
    </div>
  )
}

function DesireUrgency({ newWant, setNewWant, onNext, onBack }: {
  newWant: Partial<Want>; setNewWant: (w: Partial<Want>) => void; onNext: () => void; onBack: () => void
}) {
  function upd(p: Partial<Want>) { setNewWant({ ...newWant, ...p }) }
  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", padding:"24px 0" }} className="screen-in responsive-padding flow-card-container">
      <BackBtn onClick={onBack} />
      <div style={{ margin:"20px 0 24px" }}>
        <div style={{ fontFamily:F, fontSize:34, fontWeight:900, color:T1, letterSpacing:"-0.04em" }}>Desire Rating</div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:24, flex:1 }}>
        <div>
          <SectionLabel>HOW MUCH DO YOU WANT THIS? (1 - 5)</SectionLabel>
          <div style={{ display:"flex", gap:10, marginTop:8 }}>
            {[1,2,3,4,5].map(v => (
              <button key={v} onClick={() => upd({desire:v})} className="pressable" style={{ flex:1, height:50, borderRadius:16, border:"none", fontFamily:F, fontSize:18, fontWeight:800, cursor:"pointer", color:newWant.desire===v?"#FFF":T1, background:newWant.desire===v?ACC:"rgba(0,0,0,0.06)" }}>
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ padding:"20px 0" }}>
        <PrimaryBtn label="Make a Decision →" onClick={onNext} />
      </div>
    </div>
  )
}

function DecisionScreen({ newWant, chips, onBuy, onWait, onSkip }: {
  newWant: Partial<Want>; chips: ReturnType<typeof getChips>; onBuy: () => void; onWait: () => void; onSkip: () => void
}) {
  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", padding:"24px 0" }} className="screen-in responsive-padding flow-card-container">
      <div style={{ margin:"20px 0 24px", textAlign:"center" }}>
        <div style={{ fontFamily:F, fontSize:36, fontWeight:900, color:T1, letterSpacing:"-0.05em" }}>Your Choice.</div>
        <div style={{ fontFamily:F, fontSize:14, color:T2, marginTop:4 }}>{newWant.name} · ${newWant.price}</div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:12, flex:1, justifyContent:"center" }}>
        <button onClick={onWait} className="pressable" style={{ width:"100%", background:ACC, color:"#FFF", border:"none", borderRadius:20, padding:18, fontFamily:F, fontSize:16, fontWeight:700, cursor:"pointer" }}>
          Cool Off & Wait ⏳
        </button>
        <button onClick={onSkip} className="pressable" style={{ width:"100%", background:"#D8F2E2", color:"#1A6A3A", border:"none", borderRadius:20, padding:18, fontFamily:F, fontSize:16, fontWeight:700, cursor:"pointer" }}>
          Skip & Save ✨
        </button>
        <button onClick={onBuy} className="pressable" style={{ width:"100%", background:"rgba(0,0,0,0.06)", color:T2, border:"none", borderRadius:20, padding:16, fontFamily:F, fontSize:14, fontWeight:600, cursor:"pointer" }}>
          Buy Now
        </button>
      </div>
    </div>
  )
}

function CardDetail({ want, comps, onBack, onUpdate }: {
  want: Want; comps: ReturnType<typeof getComps>; onBack: () => void; onUpdate: (w: Want) => void
}) {
  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", padding:"24px 0" }} className="screen-in responsive-padding flow-card-container">
      <BackBtn onClick={onBack} />
      <div style={{ marginTop:16, marginBottom:20 }}>
        <CtxTag ctx={want.context} />
        <div style={{ fontFamily:F, fontSize:36, fontWeight:900, color:T1, letterSpacing:"-0.05em", marginTop:8 }}>{want.name}</div>
        <div style={{ fontFamily:F, fontSize:48, fontWeight:900, color:T1, letterSpacing:"-0.05em" }}>${want.price.toLocaleString()}</div>
      </div>
      <div style={{ display:"flex", gap:10, marginBottom:24 }}>
        <button onClick={() => onUpdate({ ...want, state: "skipped" })} className="pressable" style={{ flex:1, background:"#D8F2E2", color:"#1A6A3A", border:"none", borderRadius:16, padding:14, fontFamily:F, fontSize:14, fontWeight:700, cursor:"pointer" }}>
          Mark Skipped ✨
        </button>
        <button onClick={() => onUpdate({ ...want, state: "bought" })} className="pressable" style={{ flex:1, background:"rgba(0,0,0,0.06)", color:T1, border:"none", borderRadius:16, padding:14, fontFamily:F, fontSize:14, fontWeight:600, cursor:"pointer" }}>
          Mark Bought
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTEXTS SCREEN — EDITORIAL CONTEXT BOARD
// ─────────────────────────────────────────────────────────────────────────────
function ContextsScreen({ wants, profile, setProfile, onSelectWant }: {
  wants: Want[]; profile: UserProfile; setProfile: (p: UserProfile) => void; onSelectWant: (id: string) => void
}) {
  const [active, setActive]     = useState<string|null>(null)
  const [adding, setAdding]     = useState(false)
  const [newCtxName, setNewCtxName] = useState("")

  const allContexts = [...CONTEXTS, ...(profile.customContexts ?? [])]
  const totals = Object.fromEntries(allContexts.map(c => [
    c,
    { n: wants.filter(w=>w.context===c).length,
      t: wants.filter(w=>w.context===c).reduce((s,w)=>s+w.price,0) }
  ]))
  const filtered = active ? wants.filter(w=>w.context===active) : []

  function addContext() {
    const name = newCtxName.trim()
    if (!name || allContexts.includes(name)) return
    setProfile({ ...profile, customContexts: [...(profile.customContexts??[]), name] })
    setNewCtxName("")
    setAdding(false)
  }

  return (
    <div style={{ flex:1, overflowY:"auto", padding:"0 0 40px" }} className="hide-scroll screen-in responsive-padding">
      {/* Header */}
      <div style={{ marginBottom:32 }}>
        <div style={{ fontFamily:MONO, fontSize:10, letterSpacing:"0.18em", color:T3, marginBottom:10, textTransform:"uppercase" }}>
          EXPLORE CONTEXTS
        </div>
        <div style={{ fontFamily:F, fontSize:44, fontWeight:900, color:T1, lineHeight:1.05, letterSpacing:"-0.05em", marginBottom:8 }}>
          Where your money<br/>wants to go.
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ fontFamily:F, fontSize:14, color:T2 }}>Explore the things competing for your attention.</div>
          <button onClick={() => setAdding(a=>!a)} className="pressable" style={{ background:"none", border:"none", cursor:"pointer", fontFamily:MONO, fontSize:9, letterSpacing:"0.12em", color:T3 }}>
            {adding ? "CANCEL" : "+ CATEGORY"}
          </button>
        </div>
        {adding && (
          <div className="fade-in" style={{ display:"flex", gap:8, marginTop:12 }}>
            <input value={newCtxName} onChange={e=>setNewCtxName(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&addContext()}
              placeholder="e.g. Health, Music…"
              style={{ flex:1, ...CARD_SOFT, borderRadius:14, padding:"12px 16px", fontFamily:F, fontSize:14, color:T1, outline:"none" }} />
            <button onClick={addContext} className="pressable" style={{ background:ACC, color:"#FFF", border:"none", borderRadius:14, padding:"12px 20px", fontFamily:F, fontSize:14, fontWeight:600, cursor:"pointer" }}>Add</button>
          </div>
        )}
      </div>

      {/* Contexts Board Grid */}
      <div className="bento-grid-12">
        {allContexts.map(c => {
          const data = totals[c] || { n:0, t:0 }
          const isSelected = active === c
          const blob = CTX_BLOB[c] || { emoji:"🏷️" }

          return (
            <div key={c} onClick={() => setActive(isSelected ? null : c)} className="bento-card bento-span-6 bento-card-light pressable" style={{
              padding:"28px", border:isSelected ? `2px solid ${T1}` : "1px solid rgba(0,0,0,0.06)", cursor:"pointer"
            }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <span style={{ fontSize:28 }}>{blob.emoji}</span>
                <span style={{ fontFamily:MONO, fontSize:9, letterSpacing:"0.12em", color:T3 }}>{data.n} WANTS</span>
              </div>
              <div style={{ marginTop:16 }}>
                <div style={{ fontFamily:F, fontSize:22, fontWeight:800, color:T1, letterSpacing:"-0.03em" }}>{c}</div>
                <div style={{ fontFamily:F, fontSize:32, fontWeight:900, color:T1, letterSpacing:"-0.05em", marginTop:4 }}>${data.t.toLocaleString()}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Filtered Wants Section */}
      {active && (
        <div style={{ marginTop:40 }} className="fade-in">
          <div style={{ fontFamily:MONO, fontSize:9, letterSpacing:"0.14em", color:T3, marginBottom:16, textTransform:"uppercase" }}>
            WANTS IN {active.toUpperCase()} ({filtered.length})
          </div>
          <GridView wants={filtered} onSelect={onSelectWant} />
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// INSIGHTS SCREEN — EDITORIAL BENTO SYSTEM
// ─────────────────────────────────────────────────────────────────────────────
function InsightsScreen({ wants }: { wants: Want[] }) {
  const skipped = wants.filter(w=>w.state==="skipped")
  const bought  = wants.filter(w=>w.state==="bought")
  const skTotal = skipped.reduce((s,w)=>s+w.price,0)
  const decided = [...bought,...skipped]
  const reflectionRate = decided.length > 0 ? Math.round((skipped.length / decided.length) * 100) : 78
  const avgDays = decided.length>0 ? Math.round(decided.reduce((s,w)=>s+daysSince(w.addedAt),0)/decided.length) : 20
  const totalVal = wants.reduce((s,w)=>s+w.price,0)

  return (
    <div style={{ flex:1, overflowY:"auto", padding:"0 0 40px" }} className="hide-scroll screen-in responsive-padding">
      {/* Header */}
      <div style={{ marginBottom:32 }}>
        <div style={{ fontFamily:MONO, fontSize:10, letterSpacing:"0.18em", color:T3, marginBottom:10, textTransform:"uppercase" }}>
          YOUR PATTERNS
        </div>
        <div style={{ fontFamily:F, fontSize:44, fontWeight:900, color:T1, lineHeight:1.05, letterSpacing:"-0.05em", marginBottom:8 }}>
          Your spending,<br />lately.
        </div>
        <div style={{ fontFamily:F, fontSize:14, color:T2 }}>Observations, not advice.</div>
      </div>

      {/* 12-Column Editorial Bento Grid */}
      <div className="bento-grid-12">

        {/* 1. DECISION BALANCE (6-Col Dark Bento Card) */}
        <div className="bento-card bento-card-dark bento-span-6" style={{ padding:"32px 28px", display:"flex", flexDirection:"column", justifyContent:"space-between", minHeight:220 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
            <span style={{ fontFamily:MONO, fontSize:9, letterSpacing:"0.16em", color:"rgba(255,255,255,0.45)", textTransform:"uppercase" }}>
              DECISION BALANCE
            </span>
            <span className="text-lime-accent" style={{ fontFamily:F, fontSize:24, fontWeight:700 }}>↗</span>
          </div>

          <div style={{ margin:"20px 0" }}>
            <div className="text-lime-accent" style={{ fontFamily:F, fontSize:72, fontWeight:900, lineHeight:0.9, letterSpacing:"-0.06em" }}>
              {reflectionRate}%
            </div>
            <div style={{ fontFamily:F, fontSize:14, color:"rgba(255,255,255,0.65)", marginTop:12 }}>
              {skipped.length} of {decided.length || wants.length} wants paused & skipped after cooling off.
            </div>
          </div>

          <div style={{ fontFamily:MONO, fontSize:8, letterSpacing:"0.12em", color:"rgba(255,255,255,0.35)", textTransform:"uppercase" }}>
            INTENTION INDEX · CALM
          </div>
        </div>

        {/* 2. YOUR PATTERN / 20 DAYS (6-Col Light Bento Card) */}
        <div className="bento-card bento-card-light bento-span-6" style={{ padding:"32px 28px", display:"flex", flexDirection:"column", justifyContent:"space-between", minHeight:220 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontFamily:MONO, fontSize:9, letterSpacing:"0.16em", color:T3, textTransform:"uppercase" }}>
              YOUR PATTERN
            </span>
            <span style={{ fontFamily:MONO, fontSize:9, color:T2, letterSpacing:"0.10em" }}>TIMELINE</span>
          </div>

          <div style={{ display:"flex", alignItems:"baseline", gap:12, margin:"16px 0" }}>
            <span style={{ fontFamily:F, fontSize:64, fontWeight:900, color:T1, lineHeight:0.95, letterSpacing:"-0.06em" }}>
              {avgDays}
            </span>
            <span style={{ fontFamily:F, fontSize:22, fontWeight:800, color:T2 }}>
              DAYS
            </span>
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:8, fontFamily:MONO, fontSize:9, color:T2, letterSpacing:"0.08em" }}>
            <span>WANT</span>
            <span>→</span>
            <span>WAIT</span>
            <span>→</span>
            <span style={{ fontWeight:700, color:T1 }}>DECIDE</span>
          </div>
        </div>

        {/* 3. SPENDING DESIRE TRANSLATED (12-Col Dark Bento Card) */}
        <div className="bento-card bento-card-dark bento-span-12" style={{ padding:"36px 32px", display:"flex", flexDirection:"column", minHeight:240 }}>
          <div style={{ fontFamily:MONO, fontSize:9, letterSpacing:"0.16em", color:"rgba(255,255,255,0.45)", textTransform:"uppercase", marginBottom:16 }}>
            SPENDING DESIRE TRANSLATED
          </div>

          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"flex-end", gap:24 }}>
            <div>
              <div style={{ fontFamily:F, fontSize:64, fontWeight:900, color:"#FFF", lineHeight:0.95, letterSpacing:"-0.06em", marginBottom:10 }}>
                ${skTotal > 0 ? skTotal.toLocaleString() : totalVal.toLocaleString()}
              </div>
              <div style={{ fontFamily:F, fontSize:14, color:"rgba(255,255,255,0.60)" }}>
                Capital preserved & kept in your control.
              </div>
            </div>

            <div style={{ display:"flex", gap:24 }}>
              {[
                { label: "WORK", val: "$679" },
                { label: "HOBBIES", val: "$375" },
                { label: "FITNESS", val: "$160" },
              ].map((item, i) => (
                <div key={i} style={{ borderLeft:"1px solid rgba(255,255,255,0.12)", paddingLeft:16 }}>
                  <div style={{ fontFamily:F, fontSize:22, fontWeight:800, color:"#FFF" }}>{item.val}</div>
                  <div style={{ fontFamily:MONO, fontSize:8, color:"rgba(255,255,255,0.40)", letterSpacing:"0.12em" }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. AVOIDED SPENDING (6-Col Soft Bento Card) */}
        <div className="bento-card bento-card-soft bento-span-6" style={{ padding:"32px 28px", display:"flex", flexDirection:"column", justifyContent:"space-between", minHeight:200 }}>
          <span style={{ fontFamily:MONO, fontSize:9, letterSpacing:"0.16em", color:T3, textTransform:"uppercase" }}>
            AVOIDED SPENDING HERO
          </span>

          <div style={{ margin:"14px 0" }}>
            <span style={{ fontFamily:F, fontSize:52, fontWeight:900, color:T1, lineHeight:0.95, letterSpacing:"-0.05em" }}>
              ${skTotal > 0 ? skTotal.toLocaleString() : 180}
            </span>
            <div style={{ fontFamily:F, fontSize:13, color:T2, marginTop:6 }}>
              Unnecessary impulse purchases avoided.
            </div>
          </div>
        </div>

        {/* 5. REFLECTION ACCELERATION (6-Col Light Bento Card) */}
        <div className="bento-card bento-card-light bento-span-6" style={{ padding:"32px 28px", display:"flex", flexDirection:"column", justifyContent:"space-between", minHeight:200 }}>
          <span style={{ fontFamily:MONO, fontSize:9, letterSpacing:"0.16em", color:T3, textTransform:"uppercase" }}>
            REFLECTION ACCELERATION
          </span>

          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", margin:"14px 0" }}>
            <div>
              <div style={{ fontFamily:F, fontSize:38, fontWeight:900, color:T1, lineHeight:1, letterSpacing:"-0.04em" }}>
                {skipped.length} ITEMS
              </div>
              <div style={{ fontFamily:F, fontSize:13, color:T2, marginTop:4 }}>
                Cooling off progression.
              </div>
            </div>

            <div style={{ display:"flex", alignItems:"flex-end", gap:6 }}>
              {[16, 26, 38, 52, 68].map((h, i) => (
                <div key={i} style={{ width:8, height:h, borderRadius:99, background:i < skipped.length ? T1 : "rgba(0,0,0,0.12)" }} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PROFILE SCREEN — MODULAR 2-COLUMN BOARD
// ─────────────────────────────────────────────────────────────────────────────
function ProfileScreen({ profile, setProfile }: { profile: UserProfile; setProfile: (p: UserProfile) => void }) {
  const [editing, setEditing]       = useState(false)
  const [draft, setDraft]           = useState<UserProfile>(profile)
  const [openCat, setOpenCat]       = useState<string|null>("Everyday")
  const [customLabel, setCustomLabel] = useState("")
  const [customEmoji, setCustomEmoji] = useState("")
  const [customPrice, setCustomPrice] = useState("")
  const [showCustom, setShowCustom]   = useState(false)

  function toggleComp(k: CompKey) {
    const has = draft.comparisons.includes(k)
    setDraft({ ...draft, comparisons: has ? draft.comparisons.filter(c => c !== k) : [...draft.comparisons, k] })
  }
  function addCustom() {
    if (!customLabel || !customPrice) return
    setDraft({ ...draft, customComps: [...draft.customComps, { id: String(Date.now()), label: customLabel, emoji: customEmoji || "🏷️", price: Number(customPrice) }] })
    setCustomLabel(""); setCustomEmoji(""); setCustomPrice(""); setShowCustom(false)
  }

  return (
    <div style={{ flex:1, overflowY:"auto", padding:"0 0 40px" }} className="hide-scroll screen-in responsive-padding">
      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:32 }}>
        <div>
          <div style={{ fontFamily:MONO, fontSize:10, letterSpacing:"0.18em", color:T3, marginBottom:6, textTransform:"uppercase" }}>
            YOUR REFLECTION WORLD
          </div>
          <div style={{ fontFamily:F, fontSize:44, fontWeight:900, color:T1, letterSpacing:"-0.04em", lineHeight:1.05 }}>
            Profile & Parameters
          </div>
        </div>
        <button onClick={() => editing ? (setProfile(draft), setEditing(false)) : setEditing(true)} className="pressable"
          style={{ background:editing ? ACC : "rgba(12,10,20,0.06)", color:editing ? "#FFF" : T1, border:"none", borderRadius:99, padding:"12px 24px", fontFamily:F, fontSize:14, fontWeight:600, cursor:"pointer" }}>
          {editing ? "Save Profile" : "Edit Profile"}
        </button>
      </div>

      <div className="grid-profile-responsive">
        {/* LEFT COLUMN: SPENDING & VALUE */}
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
          <div style={{ background:"#FFF", borderRadius:24, padding:"24px 28px", border:"1px solid rgba(0,0,0,0.06)" }}>
            <SectionLabel>AVAILABLE SPENDING</SectionLabel>
            {editing ? (
              <div style={{ display:"flex", gap:10, marginTop:10 }}>
                <div style={{ position:"relative", flex:1 }}>
                  <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", fontFamily:F, fontSize:16, fontWeight:700, color:T3 }}>$</span>
                  <input type="number" value={draft.amount} onChange={e => setDraft({ ...draft, amount: Number(e.target.value) })}
                    style={{ width:"100%", ...CARD_SOFT, borderRadius:14, padding:"12px 12px 12px 28px", fontFamily:F, fontSize:22, fontWeight:900, color:T1, outline:"none" }} />
                </div>
                <select value={draft.period} onChange={e => setDraft({ ...draft, period: e.target.value as Period })}
                  style={{ background:"rgba(255,255,255,0.70)", borderRadius:14, padding:"0 14px", fontFamily:F, fontSize:13, color:T1, outline:"none", border:"1px solid rgba(0,0,0,0.08)" }}>
                  <option value="weekly">/ week</option>
                  <option value="fortnightly">/ fortnight</option>
                  <option value="monthly">/ month</option>
                </select>
              </div>
            ) : (
              <div style={{ fontFamily:F, fontSize:36, fontWeight:900, color:T1, letterSpacing:"-0.05em", marginTop:8 }}>
                ${profile.amount.toLocaleString()} <span style={{ fontSize:15, fontWeight:400, color:T3 }}>/ {profile.period}</span>
              </div>
            )}
          </div>

          <div style={{ background:"#FFF", borderRadius:24, padding:"24px 28px", border:"1px solid rgba(0,0,0,0.06)" }}>
            <SectionLabel>HOURLY VALUE</SectionLabel>
            {editing ? (
              <div style={{ position:"relative", marginTop:10 }}>
                <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", fontFamily:F, fontSize:16, fontWeight:700, color:T3 }}>$</span>
                <input type="number" value={draft.hourlyRate || ""} onChange={e => setDraft({ ...draft, hourlyRate: e.target.value ? Number(e.target.value) : undefined })} placeholder="Optional"
                  style={{ width:"100%", ...CARD_SOFT, borderRadius:14, padding:"12px 12px 12px 28px", fontFamily:F, fontSize:22, fontWeight:900, color:T1, outline:"none" }} />
              </div>
            ) : (
              <div style={{ fontFamily:F, fontSize:36, fontWeight:900, color:T1, letterSpacing:"-0.05em", marginTop:8 }}>
                {profile.hourlyRate ? <>${profile.hourlyRate} <span style={{ fontSize:15, fontWeight:400, color:T3 }}>/ hr</span></> : <span style={{ fontSize:15, fontWeight:400, color:T3 }}>Not set</span>}
              </div>
            )}
          </div>

          <div style={{ background:"#EAE8F2", borderRadius:24, padding:"24px 28px" }}>
            <div style={{ fontFamily:MONO, fontSize:9, letterSpacing:"0.14em", color:T3, textTransform:"uppercase", marginBottom:8 }}>ABOUT PAUSE</div>
            <div style={{ fontFamily:F, fontSize:13, color:T2, lineHeight:1.6 }}>
              PAUSE turns spending decisions into moments of intention — not restriction. Think before you spend.
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: COMPARISONS & LENS */}
        <div style={{ background:"#FFF", borderRadius:24, padding:"28px", border:"1px solid rgba(0,0,0,0.06)" }}>
          <SectionLabel>MY COMPARISON ANCHORS ({editing ? draft.comparisons.length + draft.customComps.length : profile.comparisons.length + profile.customComps.length})</SectionLabel>
          <div style={{ fontFamily:F, fontSize:13, color:T3, fontStyle:"italic", marginBottom:16, marginTop:4 }}>
            Your money, translated into tangible items you understand.
          </div>

          {editing ? (
            <div>
              {COMP_CATS.map(cat => {
                const keys = ALL_KEYS.filter(k => COMPS[k].category === cat)
                const open = openCat === cat
                return (
                  <div key={cat}>
                    <button onClick={() => setOpenCat(open ? null : cat)} style={{ width:"100%", background:"none", border:"none", display:"flex", justifyContent:"space-between", padding:"10px 0", cursor:"pointer" }}>
                      <span style={{ fontFamily:MONO, fontSize:9, letterSpacing:"0.12em", color:T3 }}>{cat.toUpperCase()}</span>
                      <span style={{ color:T3, fontSize:12, transform:open ? "rotate(180deg)" : "none", transition:"transform 0.18s" }}>▾</span>
                    </button>
                    {open && (
                      <div style={{ display:"flex", flexWrap:"wrap", gap:8, paddingBottom:14 }}>
                        {keys.map(k => {
                          const c = COMPS[k]
                          const sel = draft.comparisons.includes(k)
                          return (
                            <button key={k} onClick={() => toggleComp(k)} className="pressable" style={{ ...CARD_SOFT, borderRadius:99, padding:"8px 14px", fontFamily:F, fontSize:13, fontWeight:500, cursor:"pointer", display:"flex", alignItems:"center", gap:6, color:sel ? "#FFF" : T2, background:sel ? ACC : CARD_SOFT.background, border:sel ? `1.5px solid ${ACC}` : CARD_SOFT.border, transition:"all 0.13s" }}>
                              {c.emoji} {c.label}
                            </button>
                          )
                        })}
                      </div>
                    )}
                    <HDivider />
                  </div>
                )
              })}

              {draft.customComps.map(c => (
                <div key={c.id} style={{ display:"flex", gap:8, marginBottom:8, alignItems:"center", marginTop:8 }}>
                  <div style={{ flex:1, ...CARD_SOFT, borderRadius:12, padding:"9px 14px", fontFamily:F, fontSize:13 }}>{c.emoji} {c.label} · ${c.price}</div>
                  <button onClick={() => setDraft({ ...draft, customComps: draft.customComps.filter(x => x.id !== c.id) })} style={{ background:"none", border:"none", cursor:"pointer", color:T3, fontSize:20 }}>×</button>
                </div>
              ))}

              {showCustom ? (
                <div style={{ ...CARD_SOFT, borderRadius:16, padding:14, display:"flex", flexDirection:"column", gap:10, marginTop:12 }}>
                  <div style={{ display:"flex", gap:8 }}>
                    <input value={customEmoji} onChange={e => setCustomEmoji(e.target.value)} placeholder="🏷️" maxLength={2} style={{ width:46, ...CARD_SOFT, borderRadius:10, padding:"8px", fontSize:16, textAlign:"center", outline:"none" }} />
                    <input value={customLabel} onChange={e => setCustomLabel(e.target.value)} placeholder="My comparison" style={{ flex:1, ...CARD_SOFT, borderRadius:10, padding:"8px 12px", fontFamily:F, fontSize:13, outline:"none", color:T1 }} />
                  </div>
                  <div style={{ position:"relative" }}>
                    <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:T3, fontFamily:F, fontSize:13, fontWeight:700 }}>$</span>
                    <input type="number" value={customPrice} onChange={e => setCustomPrice(e.target.value)} placeholder="15" style={{ width:"100%", ...CARD_SOFT, borderRadius:10, padding:"9px 9px 9px 26px", fontFamily:F, fontSize:15, fontWeight:800, outline:"none", color:T1 }} />
                  </div>
                  <div style={{ display:"flex", gap:8 }}>
                    <button onClick={addCustom} style={{ flex:1, background:ACC, color:"#FFF", border:"none", borderRadius:10, padding:10, fontFamily:F, fontSize:13, fontWeight:600, cursor:"pointer" }}>Add</button>
                    <button onClick={() => setShowCustom(false)} style={{ flex:1, ...CARD_SOFT, borderRadius:10, padding:10, fontFamily:F, fontSize:13, cursor:"pointer", color:T2 }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setShowCustom(true)} style={{ background:"none", border:"1.5px dashed rgba(0,0,0,0.14)", borderRadius:99, padding:"8px 18px", fontFamily:F, fontSize:12, color:T2, cursor:"pointer", marginTop:12 }}>
                  + Add Custom Anchor
                </button>
              )}
            </div>
          ) : (
            <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginTop:12 }}>
              {profile.comparisons.map(k => {
                const c = COMPS[k]
                if (!c) return null
                return (
                  <div key={k} style={{ ...CARD_SOFT, borderRadius:99, padding:"8px 16px", fontFamily:F, fontSize:13, fontWeight:600, color:T1, display:"flex", alignItems:"center", gap:6 }}>
                    {c.emoji} {c.label} <span style={{ color:T3, fontWeight:400 }}>(${c.price})</span>
                  </div>
                )
              })}
              {profile.customComps.map(c => (
                <div key={c.id} style={{ ...CARD_SOFT, borderRadius:99, padding:"8px 16px", fontFamily:F, fontSize:13, fontWeight:600, color:T1, display:"flex", alignItems:"center", gap:6 }}>
                  {c.emoji} {c.label} <span style={{ color:T3, fontWeight:400 }}>(${c.price})</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ONBOARDING
// ─────────────────────────────────────────────────────────────────────────────
function Onboarding({ step, setStep, profile, setProfile, onComplete }: {
  step: number; setStep: (n: number) => void
  profile: UserProfile; setProfile: (p: UserProfile) => void; onComplete: () => void
}) {
  function upd(p: Partial<UserProfile>) { setProfile({ ...profile, ...p }) }
  const progress = (
    <div style={{ display:"flex", alignItems:"center", gap:5 }}>
      {[0,1,2,3].map(i => (
        <div key={i} style={{ height:4, width:i===step?20:4, borderRadius:99, background:i===step?T1:"rgba(0,0,0,0.14)", transition:"all 0.26s cubic-bezier(0.22,1,0.36,1)" }} />
      ))}
    </div>
  )

  return (
    <AppShell>
      <div style={{ flex:1, display:"flex", flexDirection:"column", padding:"32px 0", position:"relative" }} className="screen-in responsive-padding flow-card-container">
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:32 }}>
          <BrandMark size={20} />
          {progress}
        </div>

        {step === 0 && (
          <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center" }}>
            <div style={{ fontFamily:F, fontSize:48, fontWeight:900, color:T1, lineHeight:0.95, letterSpacing:"-0.05em", marginBottom:16 }}>
              Think before<br/>you spend.
            </div>
            <div style={{ fontFamily:F, fontSize:15, color:T2, lineHeight:1.5, marginBottom:32 }}>
              PAUSE helps you reflect on your wants, translate prices into tangible anchors, and make intentional choices.
            </div>
            <PrimaryBtn label="Get Started →" onClick={() => setStep(1)} />
          </div>
        )}

        {step === 1 && (
          <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center" }}>
            <SectionLabel>STEP 1 OF 3</SectionLabel>
            <div style={{ fontFamily:F, fontSize:32, fontWeight:900, color:T1, letterSpacing:"-0.04em", marginBottom:20 }}>
              What is your spending allowance?
            </div>
            <div style={{ position:"relative", marginBottom:16 }}>
              <span style={{ position:"absolute", left:16, top:"50%", transform:"translateY(-50%)", fontFamily:F, fontSize:20, fontWeight:700, color:T3 }}>$</span>
              <input type="number" value={profile.amount} onChange={e=>upd({amount:Number(e.target.value)})}
                style={{ width:"100%", ...CARD, borderRadius:16, padding:"16px 16px 16px 36px", fontFamily:F, fontSize:28, fontWeight:900, color:T1, outline:"none" }} />
            </div>
            <div style={{ display:"flex", gap:8, marginBottom:32 }}>
              {(["weekly","fortnightly","monthly"] as Period[]).map(p => (
                <button key={p} onClick={() => upd({period:p})} className="pressable" style={{ flex:1, ...CARD_SOFT, borderRadius:14, padding:12, fontFamily:F, fontSize:13, fontWeight:600, cursor:"pointer", color:profile.period===p?"#FFF":T2, background:profile.period===p?ACC:CARD_SOFT.background }}>
                  {p}
                </button>
              ))}
            </div>
            <PrimaryBtn label="Continue →" onClick={() => setStep(2)} />
          </div>
        )}

        {step === 2 && (
          <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center" }}>
            <SectionLabel>STEP 2 OF 3</SectionLabel>
            <div style={{ fontFamily:F, fontSize:32, fontWeight:900, color:T1, letterSpacing:"-0.04em", marginBottom:12 }}>
              What is your hourly value?
            </div>
            <div style={{ fontFamily:F, fontSize:14, color:T2, marginBottom:20 }}>
              Optional. We use this to calculate how many hours of work a want represents.
            </div>
            <div style={{ position:"relative", marginBottom:32 }}>
              <span style={{ position:"absolute", left:16, top:"50%", transform:"translateY(-50%)", fontFamily:F, fontSize:20, fontWeight:700, color:T3 }}>$</span>
              <input type="number" value={profile.hourlyRate||""} onChange={e=>upd({hourlyRate:e.target.value?Number(e.target.value):undefined})} placeholder="25"
                style={{ width:"100%", ...CARD, borderRadius:16, padding:"16px 16px 16px 36px", fontFamily:F, fontSize:28, fontWeight:900, color:T1, outline:"none" }} />
            </div>
            <PrimaryBtn label="Continue →" onClick={() => setStep(3)} />
          </div>
        )}

        {step === 3 && (
          <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center" }}>
            <SectionLabel>STEP 3 OF 3</SectionLabel>
            <div style={{ fontFamily:F, fontSize:32, fontWeight:900, color:T1, letterSpacing:"-0.04em", marginBottom:24 }}>
              Choose your comparison anchors
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:32 }}>
              {ALL_KEYS.slice(0, 10).map(k => {
                const c = COMPS[k]
                const sel = profile.comparisons.includes(k)
                return (
                  <button key={k} onClick={() => {
                    const has = profile.comparisons.includes(k)
                    upd({ comparisons: has ? profile.comparisons.filter(x=>x!==k) : [...profile.comparisons, k] })
                  }} className="pressable" style={{ ...CARD_SOFT, borderRadius:99, padding:"10px 16px", fontFamily:F, fontSize:13, fontWeight:500, cursor:"pointer", display:"flex", alignItems:"center", gap:6, color:sel?"#FFF":T2, background:sel?ACC:CARD_SOFT.background }}>
                    {c.emoji} {c.label}
                  </button>
                )
              })}
            </div>
            <PrimaryBtn label="Complete Setup ✨" onClick={onComplete} />
          </div>
        )}
      </div>
    </AppShell>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [onboarded, setOnboarded] = useState(false)
  const [screen, setScreen]       = useState<Screen>("onboarding")
  const [profile, setProfile]     = useState<UserProfile>(DEFAULT_PROFILE)
  const [wants, setWants]         = useState<Want[]>(INIT_WANTS)
  const [newWant, setNewWant]     = useState<Partial<Want>>({})
  const [selId, setSelId]         = useState<string|null>(null)
  const [obStep, setObStep]       = useState(0)

  const selWant = wants.find(w=>w.id===selId) ?? null
  const inFlow  = ["add","your-price","why","reflection","urgency","desire-urgency","decision"].includes(screen)
  const chips   = getChips(newWant.price||0, profile)
  const comps   = getComps(newWant.price||0, profile)

  function nav(s: Screen) { setScreen(s) }
  function startAdd() { setNewWant({id:String(Date.now()),context:"Hobbies"}); nav("add") }
  function finalizeWant(state: WantState) {
    setWants(prev => [{
      id:newWant.id!, name:newWant.name||"Untitled", price:newWant.price||0,
      context:newWant.context||"Personal", state, addedAt:new Date(),
      desire:newWant.desire, urgency:newWant.urgency, reasons:newWant.reasons,
      hasAlternative:newWant.hasAlternative, useFrequency:newWant.useFrequency,
      stillWant:newWant.stillWant, deadline:newWant.deadline, note:newWant.note,
    }, ...prev])
    nav("home")
  }

  if (!onboarded) return (
    <Onboarding step={obStep} setStep={setObStep} profile={profile} setProfile={setProfile}
      onComplete={() => { setOnboarded(true); nav("home") }} />
  )

  return (
    <AppShell>
      {!inFlow && screen!=="card-detail" && (
        <DesktopHeader screen={screen} navigate={nav} onAdd={startAdd} />
      )}
      <div key={screen} style={{ flex:1, display:"flex", flexDirection:"column", minHeight:0 }}>
        {screen==="home"           && <HomeScreen wants={wants} profile={profile} onAdd={startAdd} onSelect={id=>{setSelId(id);nav("card-detail")}} />}
        {screen==="add"            && <AddScreen newWant={newWant} setNewWant={setNewWant} onNext={()=>nav("your-price")} onBack={()=>nav("home")} profile={profile} />}
        {screen==="your-price"     && <YourPrice want={newWant} comps={comps} onNext={()=>nav("why")} onBack={()=>nav("add")} />}
        {screen==="why"            && <WhyScreen newWant={newWant} setNewWant={setNewWant} onNext={()=>nav("reflection")} onBack={()=>nav("your-price")} />}
        {screen==="reflection"     && <ReflectionScreen newWant={newWant} setNewWant={setNewWant} onNext={()=>nav("urgency")} onBack={()=>nav("why")} />}
        {screen==="urgency"        && <UrgencyScreen newWant={newWant} setNewWant={setNewWant} onNext={()=>nav("desire-urgency")} onBack={()=>nav("reflection")} />}
        {screen==="desire-urgency" && <DesireUrgency newWant={newWant} setNewWant={setNewWant} onNext={()=>nav("decision")} onBack={()=>nav("urgency")} />}
        {screen==="decision"       && <DecisionScreen newWant={newWant} chips={chips} onBuy={()=>finalizeWant("bought")} onWait={()=>finalizeWant("waiting")} onSkip={()=>finalizeWant("skipped")} />}
        {screen==="card-detail"    && selWant && <CardDetail want={selWant} comps={getComps(selWant.price,profile)} onBack={()=>nav("home")} onUpdate={u=>setWants(p=>p.map(w=>w.id===u.id?u:w))} />}
        {screen==="contexts"  && <ContextsScreen wants={wants} profile={profile} setProfile={setProfile} onSelectWant={id=>{setSelId(id);nav("card-detail")}} />}
        {screen==="insights"  && <InsightsScreen wants={wants} />}
        {screen==="profile"   && <ProfileScreen profile={profile} setProfile={setProfile} />}
      </div>
      {!inFlow && screen!=="card-detail" && (
        <BottomNav screen={screen} navigate={nav} onAdd={startAdd} />
      )}
    </AppShell>
  )
}
