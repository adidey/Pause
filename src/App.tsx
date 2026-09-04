import { useState, useRef } from "react"

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────────────────────
const F    = "'Inter', system-ui, sans-serif"
const MONO = "'DM Mono', monospace"

// Spacing scale
const SX = 24   // horizontal screen inset

// Atmospheric mesh backgrounds — same family, per-screen dominant tint
const BG_HOME = [
  "radial-gradient(ellipse 130% 55% at 90% 2%,  rgba(210,195,255,0.72) 0%, transparent 50%)",
  "radial-gradient(ellipse 100% 65% at 4%  20%,  rgba(255,210,185,0.60) 0%, transparent 46%)",
  "radial-gradient(ellipse 85%  75% at 50% 102%, rgba(185,215,255,0.50) 0%, transparent 54%)",
  "radial-gradient(ellipse 60%  50% at 18% 65%,  rgba(255,195,215,0.28) 0%, transparent 48%)",
  "#F7F5FF",
].join(", ")

const BG_CONTEXTS = [
  "radial-gradient(ellipse 120% 55% at 85% 5%,  rgba(195,230,215,0.60) 0%, transparent 50%)",
  "radial-gradient(ellipse 90%  60% at 8%  25%,  rgba(250,230,200,0.55) 0%, transparent 46%)",
  "radial-gradient(ellipse 80%  70% at 50% 100%, rgba(210,195,255,0.42) 0%, transparent 52%)",
  "#F8F6F0",
].join(", ")

const BG_INSIGHTS = [
  "radial-gradient(ellipse 110% 50% at 88% 4%,  rgba(205,195,255,0.55) 0%, transparent 48%)",
  "radial-gradient(ellipse 85%  62% at 6%  22%,  rgba(185,220,255,0.45) 0%, transparent 46%)",
  "radial-gradient(ellipse 70%  65% at 50% 100%, rgba(255,215,195,0.35) 0%, transparent 52%)",
  "#F9F8FC",
].join(", ")

const BG_PROFILE = [
  "radial-gradient(ellipse 100% 55% at 88% 4%,  rgba(205,195,255,0.45) 0%, transparent 50%)",
  "radial-gradient(ellipse 80%  60% at 5%  20%,  rgba(255,220,205,0.38) 0%, transparent 46%)",
  "#FAF9FD",
].join(", ")

const BG_FLOW = [
  "radial-gradient(ellipse 115% 58% at 88% 3%,  rgba(215,205,255,0.68) 0%, transparent 48%)",
  "radial-gradient(ellipse 88%  70% at 6%  24%,  rgba(255,220,205,0.58) 0%, transparent 46%)",
  "radial-gradient(ellipse 75%  65% at 52% 100%, rgba(205,225,255,0.45) 0%, transparent 54%)",
  "#F8F6FF",
].join(", ")

// Colours
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

// Ticket notch background — matches each screen's base bg tint
const NOTCH_CLR = "rgba(232,228,252,0.98)"

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
const REASONS   = ["I need it","Replace something","Upgrade","Hobby","Convenience","Fun","Sale","Social pressure","I don't know"]
const DEADLINES = ["No deadline","Sale ends","Trip / event","Replacement needed","Limited availability"]

const CTX_BLOB: Record<string, { fill: string; label: string; emoji: string }> = {
  Hobbies:  { fill: "#F0A070", label: "#7A2800", emoji: "🎨" },
  Home:     { fill: "#E8C840", label: "#5A3A00", emoji: "🏠" },
  Fitness:  { fill: "#70C890", label: "#0A4A1A", emoji: "💪" },
  Travel:   { fill: "#70A8E8", label: "#082060", emoji: "✈️" },
  Study:    { fill: "#B090D8", label: "#2A0A5A", emoji: "📚" },
  Work:     { fill: "#68C4A8", label: "#0A3A2A", emoji: "💼" },
  Personal: { fill: "#F090B0", label: "#5A0020", emoji: "✦"  },
}
const CTX_TINT: Record<string, { bg: string; fg: string }> = {
  Hobbies:  { bg: "rgba(232,130,74,0.12)",    fg: "#7A3010" },
  Home:     { bg: "rgba(220,185,48,0.12)",    fg: "#5A3A00" },
  Fitness:  { bg: "rgba(80,180,120,0.12)",    fg: "#0A4A1A" },
  Travel:   { bg: "rgba(80,150,220,0.12)",    fg: "#082060" },
  Study:    { bg: "rgba(155,120,210,0.12)",   fg: "#2A0A5A" },
  Work:     { bg: "rgba(80,185,155,0.12)",    fg: "#0A3A2A" },
  Personal: { bg: "rgba(220,100,155,0.12)",   fg: "#5A0020" },
}
const CTX_IMG: Record<string, { from: string; to: string }> = {
  Hobbies:  { from: "#FDE8D4", to: "#F8C8A4" },
  Home:     { from: "#FDF4D0", to: "#F4E098" },
  Fitness:  { from: "#D4F0E0", to: "#A8DCC0" },
  Travel:   { from: "#D0E8F8", to: "#A4CCF0" },
  Study:    { from: "#E8E0F8", to: "#CCC0F0" },
  Work:     { from: "#D0EEE8", to: "#A4D8CC" },
  Personal: { from: "#FDE0E8", to: "#F4B8CC" },
}
const STATE_META: Record<WantState, { label: string; bg: string; fg: string }> = {
  new:      { label: "NEW",      bg: "rgba(0,0,0,0.06)",      fg: T3        },
  thinking: { label: "THINKING", bg: "rgba(210,155,25,0.12)", fg: "#7A5C00" },
  waiting:  { label: "WAITING",  bg: "rgba(100,85,220,0.11)", fg: "#3C2CC0" },
  bought:   { label: "BOUGHT",   bg: "rgba(40,165,90,0.11)",  fg: "#1A6A20" },
  skipped:  { label: "SKIPPED",  bg: "rgba(0,0,0,0.06)",      fg: T3        },
}
// Context blob positions for the spatial map
const BLOB_POS: Record<string, { cx: number; cy: number; r: number }> = {
  Hobbies:  { cx: 0.70, cy: 0.12, r: 0.21 },
  Home:     { cx: 0.27, cy: 0.28, r: 0.19 },
  Fitness:  { cx: 0.75, cy: 0.42, r: 0.18 },
  Travel:   { cx: 0.46, cy: 0.60, r: 0.20 },
  Study:    { cx: 0.18, cy: 0.56, r: 0.17 },
  Work:     { cx: 0.78, cy: 0.70, r: 0.19 },
  Personal: { cx: 0.38, cy: 0.82, r: 0.18 },
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function daysSince(d: Date) { return Math.floor((Date.now() - d.getTime()) / 86400000) }
function weeklyAmt(a: number, p: Period) { return p === "weekly" ? a : p === "fortnightly" ? a / 2 : a / 4.33 }
function fmtWeeks(price: number, w: number) {
  const r = price / w; return r < 1 ? `${Math.round(r * 7)}d` : `${r.toFixed(1)}w`
}
function getComps(price: number, p: UserProfile) {
  const w = weeklyAmt(p.amount, p.period)
  const out: { emoji: string; color: string; value: string; unit: string; sublabel: string }[] = []
  out.push({ emoji: "💸", color: "#6050D8", value: fmtWeeks(price, w), unit: "", sublabel: "spending" })
  if (p.hourlyRate) out.push({ emoji: "⏰", color: "#C07820", value: `${Math.round(price / p.hourlyRate)}h`, unit: "", sublabel: "work" })
  p.comparisons.slice(0, 4).forEach((k) => {
    const c = COMPS[k]; out.push({ emoji: c.emoji, color: c.color, value: `${Math.round(price / c.price)}`, unit: "", sublabel: c.label })
  })
  p.customComps.slice(0, 2).forEach((c) => {
    out.push({ emoji: c.emoji, color: "#888", value: `${Math.round(price / c.price)}`, unit: "", sublabel: c.label })
  })
  return out
}
function getChips(price: number, p: UserProfile) {
  const w = weeklyAmt(p.amount, p.period)
  const chips: { emoji: string; value: string; label: string }[] = []
  chips.push({ emoji: "💸", value: fmtWeeks(price, w), label: "spending" })
  if (p.hourlyRate) chips.push({ emoji: "⏰", value: `${Math.round(price / p.hourlyRate)}h`, label: "work" })
  p.comparisons.slice(0, 3).forEach((k) => {
    const c = COMPS[k]; chips.push({ emoji: c.emoji, value: `${Math.round(price / c.price)}`, label: c.label })
  })
  return chips
}

// ─────────────────────────────────────────────────────────────────────────────
// SEED DATA
// ─────────────────────────────────────────────────────────────────────────────
const INIT_WANTS: Want[] = [
  { id:"1", name:"Fujifilm X-A20",  price:375, context:"Hobbies", state:"waiting",  addedAt:new Date(Date.now()-4*86400000),  desire:9, urgency:2, reasons:["Hobby","Upgrade"], note:"Already have a phone camera — want something more intentional." },
  { id:"2", name:"Sony WH-1000XM5", price:499, context:"Work",    state:"thinking", addedAt:new Date(Date.now()-2*86400000),  desire:7, urgency:3 },
  { id:"3", name:"Nike Air Max 90",  price:160, context:"Fitness", state:"waiting",  addedAt:new Date(Date.now()-12*86400000), desire:5, urgency:1 },
  { id:"4", name:"Keychron K2 Pro",  price:180, context:"Work",    state:"skipped",  addedAt:new Date(Date.now()-20*86400000) },
]
const DEFAULT_PROFILE: UserProfile = {
  moneyType:"salary", period:"fortnightly", amount:400, hourlyRate:25,
  comparisons:["burger","coffee","flight","movie"], customComps:[], customContexts:[],
}

// ─────────────────────────────────────────────────────────────────────────────
// BRAND MARK  — typographic "|| WORTH IT?"
// ─────────────────────────────────────────────────────────────────────────────
function PauseMark({ size = 12, color = T3 }: { size?: number; color?: string }) {
  const h = size, w = Math.round(size * 0.22), gap = Math.round(size * 0.22), r = Math.round(size * 0.12)
  return (
    <svg width={w*2+gap} height={h} viewBox={`0 0 ${w*2+gap} ${h}`} fill="none" style={{ display:"block", flexShrink:0 }}>
      <rect x={0} y={0} width={w} height={h} rx={r} fill={color} />
      <rect x={w+gap} y={0} width={w} height={h} rx={r} fill={color} />
    </svg>
  )
}
function BrandMark({ size = 11, color = T3 }: { size?: number; color?: string }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
      <PauseMark size={size+1} color={color} />
      <span style={{ fontFamily:MONO, fontSize:size, letterSpacing:"0.10em", color, fontWeight:500 }}>WORTH IT?</span>
    </div>
  )
}
// Large pause watermark for backgrounds
function PauseWatermark({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <div style={{ position:"absolute", right:-20, top:"15%", display:"flex", gap:14, pointerEvents:"none", zIndex:0, opacity }}>
      <div style={{ width:52, height:180, borderRadius:26, background:T1 }} />
      <div style={{ width:52, height:180, borderRadius:26, background:T1 }} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// NAV ICONS (simple SVG line icons)
// ─────────────────────────────────────────────────────────────────────────────
function IconWants({ active }: { active: boolean }) {
  const s = active ? 1.8 : 1.4
  return (
    <svg width={22} height={22} viewBox="0 0 22 22" fill="none">
      <rect x={2} y={4} width={18} height={14} rx={3} stroke={T1} strokeWidth={s} />
      <line x1={2} y1={9} x2={20} y2={9} stroke={T1} strokeWidth={s} />
      <circle cx={11} cy={9} r={2.2} fill={active ? T1 : "none"} stroke={T1} strokeWidth={active ? 0 : s} />
    </svg>
  )
}
function IconContexts({ active }: { active: boolean }) {
  const s = active ? 2 : 1.5
  return (
    <svg width={22} height={22} viewBox="0 0 22 22" fill="none">
      <circle cx={7.5} cy={7.5} r={3.5} stroke={T1} strokeWidth={s} fill={active ? T1 : "none"} />
      <circle cx={14.5} cy={7.5} r={2.5} stroke={T1} strokeWidth={s} fill="none" />
      <circle cx={7.5} cy={15} r={2.5} stroke={T1} strokeWidth={s} fill="none" />
      <circle cx={15} cy={14.5} r={3} stroke={T1} strokeWidth={s} fill="none" />
    </svg>
  )
}
function IconInsights({ active }: { active: boolean }) {
  const s = active ? 2 : 1.5
  return (
    <svg width={22} height={22} viewBox="0 0 22 22" fill="none">
      <rect x={3} y={13} width={4} height={7} rx={1} fill={active ? T1 : "none"} stroke={T1} strokeWidth={s} />
      <rect x={9} y={8}  width={4} height={12} rx={1} fill={active ? T1 : "none"} stroke={T1} strokeWidth={s} />
      <rect x={15} y={4} width={4} height={16} rx={1} fill={active ? T1 : "none"} stroke={T1} strokeWidth={s} />
    </svg>
  )
}
function IconProfile({ active }: { active: boolean }) {
  const s = active ? 2 : 1.5
  return (
    <svg width={22} height={22} viewBox="0 0 22 22" fill="none">
      <circle cx={11} cy={7.5} r={3.5} stroke={T1} strokeWidth={s} fill={active ? T1 : "none"} />
      <path d="M3.5 19c0-4.14 3.36-7.5 7.5-7.5s7.5 3.36 7.5 7.5" stroke={T1} strokeWidth={s} strokeLinecap="round" />
    </svg>
  )
}
// NavIcon inverts icon colors for dark floating nav
function NavIcon({ Icon, active }: { Icon: React.ComponentType<{ active: boolean }>; active: boolean }) {
  return (
    <div style={{ filter: "invert(1) brightness(2)", opacity: active ? 1 : 0.55 }}>
      <Icon active={active} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ATOMS
// ─────────────────────────────────────────────────────────────────────────────
function Tag({ label, bg, fg }: { label: string; bg: string; fg: string }) {
  return (
    <span style={{ background:bg, color:fg, borderRadius:99, padding:"3px 10px", fontFamily:MONO, fontSize:8.5, fontWeight:500, letterSpacing:"0.08em", whiteSpace:"nowrap", display:"inline-block" }}>
      {label}
    </span>
  )
}
function StateTag({ state }: { state: WantState }) {
  const m = STATE_META[state]; return <Tag label={m.label} bg={m.bg} fg={m.fg} />
}
function CtxTag({ ctx }: { ctx: string }) {
  const s = CTX_TINT[ctx] || { bg:"rgba(0,0,0,0.07)", fg:T2 }
  return <Tag label={ctx.toUpperCase()} bg={s.bg} fg={s.fg} />
}
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontFamily:MONO, fontSize:9.5, letterSpacing:"0.10em", color:T3, marginBottom:10, textTransform:"uppercase" as const }}>{children}</div>
}
function HDivider() {
  return <div style={{ height:1, background:"rgba(0,0,0,0.07)" }} />
}

// Buttons
function PrimaryBtn({ label, onClick, disabled }: { label: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled} className="pressable" style={{ width:"100%", background:disabled ? "rgba(0,0,0,0.10)" : ACC, color:disabled ? T3 : "#FFF", border:"none", borderRadius:99, padding:"18px 24px", fontFamily:F, fontSize:16, fontWeight:600, cursor:disabled ? "default" : "pointer", letterSpacing:"-0.01em", transition:"opacity 0.15s" }}>
      {label}
    </button>
  )
}
function OutlineBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="pressable" style={{ width:"100%", background:"rgba(255,255,255,0.80)", color:T1, border:"1.5px solid rgba(0,0,0,0.12)", borderRadius:99, padding:"17px 24px", fontFamily:F, fontSize:16, fontWeight:500, cursor:"pointer", letterSpacing:"-0.01em" }}>
      {label}
    </button>
  )
}
function GhostBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="pressable" style={{ width:"100%", background:"transparent", color:T3, border:"none", borderRadius:99, padding:"14px", fontFamily:F, fontSize:15, fontWeight:400, cursor:"pointer" }}>
      {label}
    </button>
  )
}
function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="pressable" style={{ background:"none", border:"none", padding:"6px 0", cursor:"pointer", fontFamily:F, fontSize:14, fontWeight:500, color:T2, display:"flex", alignItems:"center", gap:6 }}>
      {"← Back"}
    </button>
  )
}

// Selection cards for onboarding
function OptionCard({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="pressable" style={{ width:"100%", borderRadius:14, padding:"15px 20px", fontFamily:F, fontSize:15, fontWeight:500, cursor:"pointer", textAlign:"left", color:selected ? "#FFF" : T1, background:selected ? ACC : "rgba(255,255,255,0.65)", border:selected ? `1.5px solid ${ACC}` : "1.5px solid rgba(255,255,255,0.82)", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)", transition:"all 0.16s" }}>
      {label}
    </button>
  )
}
function SegBtn({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="pressable" style={{ flex:1, borderRadius:12, padding:"12px 6px", fontFamily:F, fontSize:13, fontWeight:500, cursor:"pointer", color:selected ? "#FFF" : T2, background:selected ? ACC : "rgba(255,255,255,0.60)", border:selected ? `1.5px solid ${ACC}` : "1.5px solid rgba(255,255,255,0.80)", backdropFilter:"blur(10px)", WebkitBackdropFilter:"blur(10px)", transition:"all 0.15s" }}>
      {label}
    </button>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// BARCODE DECORATION
// ─────────────────────────────────────────────────────────────────────────────
function Barcode() {
  const bars = [3,1,2,1,4,1,2,3,1,2,1,3,2,1,4,1,3,1,2,1,3,2,1]
  return (
    <div style={{ display:"flex", gap:2, alignItems:"center" }}>
      {bars.map((h, i) => (
        <div key={i} style={{ width:2, height:h*3, background:"rgba(0,0,0,0.18)", borderRadius:1 }} />
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TICKET CARD
// ─────────────────────────────────────────────────────────────────────────────
function TicketCard({ want, chips, onClick, style, compact }: {
  want: Want; chips?: { emoji: string; value: string; label: string }[]
  onClick?: () => void; style?: React.CSSProperties; compact?: boolean
}) {
  const days  = daysSince(want.addedAt)
  const faded = want.state === "skipped" || want.state === "bought"
  const img   = CTX_IMG[want.context]  || { from:"#F0EBE3", to:"#E8E0D4" }
  const blob  = CTX_BLOB[want.context] || { fill:"#C8C4C0", emoji:"✦" }
  const tickNum = `#${want.id.padStart(4,"0")}`

  return (
    <div onClick={onClick} className={onClick ? "pressable" : ""} style={{
      position:"relative", opacity:faded ? 0.50 : 1, cursor:onClick ? "pointer" : "default",
      filter:"drop-shadow(0 3px 18px rgba(60,40,120,0.10))", ...style,
    }}>
      {!compact && (
        <>
          {/* Image area */}
          <div style={{ height:152, background:`linear-gradient(140deg, ${img.from}, ${img.to})`, borderRadius:"20px 20px 0 0", overflow:"hidden", position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontSize:88, opacity:0.18, userSelect:"none", marginTop:10 }}>{blob.emoji}</span>
            <div style={{ position:"absolute", right:18, bottom:-10, fontFamily:F, fontSize:76, fontWeight:900, color:"rgba(0,0,0,0.045)", letterSpacing:"-0.05em", lineHeight:1, userSelect:"none" }}>
              {want.name.charAt(0)}
            </div>
            <div style={{ position:"absolute", top:14, right:16, display:"flex", gap:10 }}>
              {days > 0 && <span style={{ fontFamily:MONO, fontSize:8, color:"rgba(0,0,0,0.32)", letterSpacing:"0.08em" }}>DAY {String(days).padStart(2,"0")}</span>}
              <span style={{ fontFamily:MONO, fontSize:8, color:"rgba(0,0,0,0.32)", letterSpacing:"0.08em" }}>{tickNum}</span>
            </div>
          </div>

          {/* Perforated notch divider */}
          <div style={{ position:"relative", height:18, display:"flex", alignItems:"center", zIndex:1 }}>
            <div style={{ width:18, height:18, borderRadius:"0 9px 9px 0", background:NOTCH_CLR, flexShrink:0, border:"1px solid rgba(200,196,240,0.45)", borderLeft:"none" }} />
            <div style={{ flex:1, height:0, borderTop:"1.5px dashed rgba(0,0,0,0.10)", background:"rgba(255,255,255,0.88)" }} />
            <div style={{ width:18, height:18, borderRadius:"9px 0 0 9px", background:NOTCH_CLR, flexShrink:0, border:"1px solid rgba(200,196,240,0.45)", borderRight:"none" }} />
          </div>
        </>
      )}

      {/* Body */}
      <div style={{ padding:compact ? "14px 16px" : "16px 22px 18px", borderRadius:compact ? 20 : "0 0 20px 20px", ...CARD }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:compact ? 8 : 10 }}>
          <CtxTag ctx={want.context} />
          <StateTag state={want.state} />
        </div>
        <div style={{ fontFamily:F, fontSize:compact ? 12 : 13, color:T2, marginBottom:2, lineHeight:1.3 }}>{want.name}</div>
        <div style={{ fontFamily:F, fontSize:compact ? 28 : 48, fontWeight:900, color:T1, lineHeight:1, letterSpacing:"-0.05em", marginBottom:chips && chips.length && !compact ? 14 : 0 }}>
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
// CARD STACK — swipeable ticket deck
// ─────────────────────────────────────────────────────────────────────────────
function CardStack({ wants, profile, onSelect }: {
  wants: Want[]; profile: UserProfile; onSelect: (id: string) => void
}) {
  const [idx, setIdx]       = useState(0)
  const [offset, setOffset] = useState(0)
  const [drag, setDrag]     = useState(false)
  const [dir, setDir]       = useState<1|-1|0>(0)  // 1 = forward (next), -1 = backward (prev)
  const tx = useRef<number|null>(null)

  function ts(e: React.TouchEvent) { tx.current = e.touches[0].clientX; setDrag(true) }
  function tm(e: React.TouchEvent) { if (tx.current===null) return; setOffset(e.touches[0].clientX - tx.current) }
  function te() {
    if (offset < -55 && idx < wants.length-1) { setDir(1);  setIdx(idx+1) }
    if (offset > 55  && idx > 0)              { setDir(-1); setIdx(idx-1) }
    setOffset(0); setDrag(false); tx.current = null
  }
  function goTo(i: number) { setDir(i > idx ? 1 : -1); setIdx(i) }

  if (wants.length === 0) return (
    <div style={{ ...CARD, borderRadius:20, padding:"48px 24px", textAlign:"center" }}>
      <div style={{ display:"flex", justifyContent:"center", marginBottom:14 }}><PauseMark size={28} color="rgba(0,0,0,0.08)" /></div>
      <div style={{ fontFamily:F, color:T3, fontSize:14, lineHeight:1.6 }}>Nothing on your mind yet.<br/><span style={{ fontSize:12 }}>Add a want to get started.</span></div>
    </div>
  )

  const front  = wants[idx]
  const behind = wants.slice(idx+1, idx+3)
  const chips  = getChips(front.price, profile)
  const behindCount = Math.min(behind.length, 2)

  return (
    <div>
      <div style={{ position:"relative", paddingBottom: behindCount * 10 }}
        onTouchStart={ts} onTouchMove={tm} onTouchEnd={te}>
        {/* Behind cards — blank strips, no content bleed */}
        {[...behind.slice(0,2)].reverse().map((w, ri) => {
          const depth = behind.slice(0,2).length - ri
          const img = CTX_IMG[w.context] || { from:"#F0EBE3", to:"#E8E0D4" }
          return (
            <div key={w.id} style={{
              position:"absolute", bottom:0,
              left:`${depth*10}px`, right:`${depth*10}px`,
              height:52,
              background:`linear-gradient(140deg, ${img.from}, ${img.to})`,
              borderRadius:16,
              zIndex:10-depth,
              pointerEvents:"none",
              opacity: 0.85 - depth*0.15,
            }} />
          )
        })}
        {/* Front card */}
        <div key={idx} style={{
            position:"relative", zIndex:20,
            transform: drag ? `translateX(${offset*0.55}px) rotate(${offset*0.016}deg)` : undefined,
            opacity: drag ? Math.max(0.72, 1-Math.abs(offset)/300) : 1,
            transition: drag ? "none" : "opacity 0.15s",
          }} className={drag ? "" : dir===1 ? "ticket-in-right" : dir===-1 ? "ticket-in-left" : "card-in"}>
          <TicketCard want={front} chips={chips} onClick={() => onSelect(front.id)} />
        </div>
      </div>

      {/* Arrow counter navigation */}
      {wants.length > 1 && (
        <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:0, marginTop:16 }}>
          <button onClick={() => goTo(Math.max(0,idx-1))} disabled={idx===0} className="pressable"
            style={{ background:"none", border:"none", cursor:idx===0?"default":"pointer", opacity:idx===0?0.18:0.55, width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, color:T1, fontFamily:F }}>{"←"}</button>
          <span style={{ fontFamily:MONO, fontSize:10, letterSpacing:"0.12em", color:T3, minWidth:52, textAlign:"center" }}>
            {String(idx+1).padStart(2,"0")} / {String(wants.length).padStart(2,"0")}
          </span>
          <button onClick={() => goTo(Math.min(wants.length-1,idx+1))} disabled={idx>=wants.length-1} className="pressable"
            style={{ background:"none", border:"none", cursor:idx>=wants.length-1?"default":"pointer", opacity:idx>=wants.length-1?0.18:0.55, width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, color:T1, fontFamily:F }}>{"→"}</button>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// BOTTOM NAVIGATION
// ─────────────────────────────────────────────────────────────────────────────
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
    <div style={{ flexShrink:0, padding:`8px 16px max(env(safe-area-inset-bottom, 0px) + 8px, 20px)` }}>
    <div style={{ background:"rgba(12,10,20,0.92)", backdropFilter:"blur(28px)", WebkitBackdropFilter:"blur(28px)", borderRadius:32, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 8px", boxShadow:"0 8px 40px rgba(0,0,0,0.36), 0 1px 0 rgba(255,255,255,0.07) inset" }}>
      {tabs.map(({ id, label, Icon }) => (
        <button key={id} onClick={() => navigate(id as Screen)} className="pressable" style={{ background:screen===id?"rgba(255,255,255,0.12)":"none", border:"none", borderRadius:16, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3, padding:"8px 12px", transition:"all 0.18s" }}>
          <NavIcon Icon={Icon} active={screen===id} />
          <span style={{ fontFamily:MONO, fontSize:7, letterSpacing:"0.09em", color:screen===id?"#FFF":"rgba(255,255,255,0.42)", fontWeight: screen===id ? 600 : 400 }}>{label}</span>
        </button>
      ))}
      <button onClick={onAdd} className="pressable" style={{ background:"#FFF", border:"none", borderRadius:99, width:48, height:48, display:"flex", alignItems:"center", justifyContent:"center", color:T1, fontSize:22, cursor:"pointer", flexShrink:0, boxShadow:"0 2px 12px rgba(255,255,255,0.20)", lineHeight:1 }}>+</button>
      {tabs2.map(({ id, label, Icon }) => (
        <button key={id} onClick={() => navigate(id as Screen)} className="pressable" style={{ background:screen===id?"rgba(255,255,255,0.12)":"none", border:"none", borderRadius:16, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3, padding:"8px 12px", transition:"all 0.18s" }}>
          <NavIcon Icon={Icon} active={screen===id} />
          <span style={{ fontFamily:MONO, fontSize:7, letterSpacing:"0.09em", color:screen===id?"#FFF":"rgba(255,255,255,0.42)", fontWeight: screen===id ? 600 : 400 }}>{label}</span>
        </button>
      ))}
    </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// APP SHELL
// ─────────────────────────────────────────────────────────────────────────────
function AppShell({ children, bg }: { children: React.ReactNode; bg?: string }) {
  return (
    <div style={{ position:"fixed", inset:0, display:"flex", justifyContent:"center", background:"#E2E0EC" }}>
      <div style={{ width:"100%", maxWidth:430, height:"100%", display:"flex", flexDirection:"column", overflow:"hidden", background:bg||BG_HOME, position:"relative" }}>
        {children}
      </div>
    </div>
  )
}

// Safe-area top padding helper
const topSafe = "max(env(safe-area-inset-top, 0px) + 16px, 64px)"
const botSafe = "max(env(safe-area-inset-bottom, 0px) + 8px, 20px)"

// ─────────────────────────────────────────────────────────────────────────────
// ONBOARDING
// ─────────────────────────────────────────────────────────────────────────────
function Onboarding({ step, setStep, profile, setProfile, onComplete }: {
  step: number; setStep: (n: number) => void
  profile: UserProfile; setProfile: (p: UserProfile) => void; onComplete: () => void
}) {
  const [openCat, setOpenCat]       = useState<string|null>("Everyday")
  const [customLabel, setCustomLabel] = useState("")
  const [customEmoji, setCustomEmoji] = useState("")
  const [customPrice, setCustomPrice] = useState("")
  const [showCustom, setShowCustom]   = useState(false)

  function upd(p: Partial<UserProfile>) { setProfile({ ...profile, ...p }) }
  function toggleComp(k: CompKey) {
    const has = profile.comparisons.includes(k)
    upd({ comparisons: has ? profile.comparisons.filter(c=>c!==k) : [...profile.comparisons, k] })
  }
  function addCustom() {
    if (!customLabel || !customPrice) return
    upd({ customComps:[...profile.customComps,{id:String(Date.now()),label:customLabel,emoji:customEmoji||"🏷️",price:Number(customPrice)}] })
    setCustomLabel(""); setCustomEmoji(""); setCustomPrice(""); setShowCustom(false)
  }

  const progress = (
    <div style={{ display:"flex", alignItems:"center", gap:5 }}>
      {[0,1,2,3].map(i => (
        <div key={i} style={{ height:4, width:i===step?20:4, borderRadius:99, background:i===step?T1:"rgba(0,0,0,0.14)", transition:"all 0.26s cubic-bezier(0.22,1,0.36,1)" }} />
      ))}
    </div>
  )

  // Shared layout wrapper
  const Wrap = ({ children }: { children: React.ReactNode }) => (
    <AppShell bg={BG_FLOW}>
      <div style={{ flex:1, display:"flex", flexDirection:"column", padding:`${topSafe} ${SX}px 0`, overflow:"hidden", position:"relative" }} className="screen-in">
        <PauseWatermark opacity={0.035} />
        {/* Header row */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:32, flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            {step > 0 && <BackBtn onClick={() => setStep(step-1)} />}
            {step === 0 && <BrandMark size={10} />}
          </div>
          {progress}
        </div>
        {children}
      </div>
    </AppShell>
  )

  const foot = (label: string, action: () => void, disabled?: boolean) => (
    <div style={{ paddingBottom:`calc(${botSafe} + 8px)`, flexShrink:0 }}>
      <PrimaryBtn label={label} onClick={action} disabled={disabled} />
    </div>
  )

  // Step 3 — completion brand moment
  if (step === 3) return (
    <Wrap>
      <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", textAlign:"center", gap:16 }}>
        <BrandMark size={13} color={T2} />
        <div style={{ fontFamily:F, fontSize:64, fontWeight:900, color:T1, lineHeight:0.92, letterSpacing:"-0.06em" }}>WORTH<br/>IT?</div>
        <div style={{ fontFamily:F, fontSize:28, fontWeight:900, color:T1, letterSpacing:"-0.04em", marginTop:8 }}>PAUSE.</div>
        <div style={{ fontFamily:F, fontSize:15, color:T2 }}>Then spend.</div>
      </div>
      {foot("Let's go →", onComplete)}
    </Wrap>
  )

  return (
    <Wrap>
      {step === 0 && (
        <>
          <div style={{ flexShrink:0, marginBottom:24 }}>
            <div style={{ fontFamily:F, fontSize:30, fontWeight:900, color:T1, lineHeight:1.08, letterSpacing:"-0.035em", marginBottom:6 }}>What do you call your money?</div>
            <div style={{ fontFamily:F, fontSize:14, color:T2, lineHeight:1.5 }}>This helps us speak your language.</div>
          </div>
          <div style={{ flex:1, display:"flex", flexDirection:"column", gap:8, overflowY:"auto" }} className="hide-scroll">
            {["Allowance","Salary","Casual income","Mixed","Other"].map(t => (
              <OptionCard key={t} label={t} selected={profile.moneyType===t.toLowerCase().split(" ")[0]} onClick={() => upd({moneyType:t.toLowerCase().split(" ")[0]})} />
            ))}
          </div>
          {foot("Continue →", () => setStep(1))}
        </>
      )}

      {step === 1 && (
        <>
          <div style={{ flexShrink:0, marginBottom:24 }}>
            <div style={{ fontFamily:F, fontSize:30, fontWeight:900, color:T1, lineHeight:1.08, letterSpacing:"-0.035em", marginBottom:6 }}>How much can you spend?</div>
            <div style={{ fontFamily:F, fontSize:14, color:T2, lineHeight:1.5 }}>We translate prices into your world.</div>
          </div>
          <div style={{ flex:1, display:"flex", flexDirection:"column", gap:20, overflowY:"auto" }} className="hide-scroll">
            <div>
              <SectionLabel>AVAILABLE SPENDING / {profile.period.toUpperCase()}</SectionLabel>
              <div style={{ position:"relative" }}>
                <span style={{ position:"absolute", left:20, top:"50%", transform:"translateY(-50%)", fontFamily:F, fontSize:22, fontWeight:700, color:T3 }}>$</span>
                <input type="number" value={String(profile.amount||"")} onChange={e=>upd({amount:Number(e.target.value)})} placeholder="400"
                  style={{ width:"100%", ...CARD, borderRadius:16, padding:"18px 18px 18px 42px", fontFamily:F, fontSize:36, fontWeight:900, color:T1, outline:"none", letterSpacing:"-0.04em" }} />
              </div>
              <div style={{ display:"flex", gap:8, marginTop:10 }}>
                {(["weekly","fortnightly","monthly"] as Period[]).map(p => (
                  <button key={p} onClick={() => upd({period:p})} style={{ flex:1, borderRadius:10, padding:"9px 4px", fontFamily:F, fontSize:12, fontWeight:500, cursor:"pointer", color:profile.period===p?"#FFF":T2, background:profile.period===p?ACC:"rgba(255,255,255,0.60)", border:profile.period===p?`1.5px solid ${ACC}`:"1.5px solid rgba(255,255,255,0.80)" }}>
                    {p.charAt(0).toUpperCase()+p.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <SectionLabel>HOURLY RATE — OPTIONAL</SectionLabel>
              <div style={{ position:"relative" }}>
                <span style={{ position:"absolute", left:20, top:"50%", transform:"translateY(-50%)", fontFamily:F, fontSize:18, fontWeight:700, color:T3 }}>$</span>
                <input type="number" value={String(profile.hourlyRate||"")} onChange={e=>upd({hourlyRate:e.target.value?Number(e.target.value):undefined})} placeholder="25"
                  style={{ width:"100%", ...CARD, borderRadius:16, padding:"16px 18px 16px 38px", fontFamily:F, fontSize:28, fontWeight:800, color:T1, outline:"none", letterSpacing:"-0.04em" }} />
              </div>
              <div style={{ fontFamily:F, fontSize:12, color:T3, marginTop:6 }}>See purchases as hours of your time.</div>
            </div>
          </div>
          {foot("Continue →", () => setStep(2), !profile.amount)}
        </>
      )}

      {step === 2 && (
        <>
          <div style={{ flexShrink:0, marginBottom:20 }}>
            <div style={{ fontFamily:F, fontSize:30, fontWeight:900, color:T1, lineHeight:1.08, letterSpacing:"-0.035em", marginBottom:6 }}>How do you want things translated?</div>
            <div style={{ fontFamily:F, fontSize:14, color:T2 }}>Choose what makes money feel real.</div>
          </div>
          <div style={{ flex:1, overflowY:"auto" }} className="hide-scroll">
            {COMP_CATS.map(cat => {
              const keys = ALL_KEYS.filter(k=>COMPS[k].category===cat), open = openCat===cat
              return (
                <div key={cat} style={{ marginBottom:4 }}>
                  <button onClick={() => setOpenCat(open?null:cat)} style={{ width:"100%", background:"none", border:"none", display:"flex", justifyContent:"space-between", padding:"9px 2px", cursor:"pointer" }}>
                    <span style={{ fontFamily:MONO, fontSize:9, letterSpacing:"0.10em", color:T3 }}>{cat.toUpperCase()}</span>
                    <span style={{ color:T3, fontSize:11, transform:open?"rotate(180deg)":"none", transition:"transform 0.18s" }}>{"▾"}</span>
                  </button>
                  {open && (
                    <div style={{ display:"flex", flexWrap:"wrap", gap:6, paddingBottom:10 }}>
                      {keys.map(k => {
                        const c=COMPS[k], sel=profile.comparisons.includes(k)
                        return (
                          <button key={k} onClick={() => toggleComp(k)} className="pressable" style={{ ...CARD_SOFT, borderRadius:99, padding:"7px 14px", fontFamily:F, fontSize:12, fontWeight:500, cursor:"pointer", display:"flex", alignItems:"center", gap:5, color:sel?"#FFF":T2, background:sel?ACC:CARD_SOFT.background, border:sel?`1.5px solid ${ACC}`:CARD_SOFT.border, transition:"all 0.14s" }}>
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
            {profile.customComps.map(c => (
              <div key={c.id} style={{ display:"flex", gap:8, marginBottom:6, alignItems:"center" }}>
                <div style={{ flex:1, ...CARD_SOFT, borderRadius:12, padding:"8px 14px", fontFamily:F, fontSize:12 }}>{c.emoji} {c.label} · ${c.price}</div>
                <button onClick={() => upd({customComps:profile.customComps.filter(x=>x.id!==c.id)})} style={{ background:"none",border:"none",cursor:"pointer",color:T3,fontSize:18 }}>×</button>
              </div>
            ))}
            {showCustom ? (
              <div style={{ ...CARD_SOFT, borderRadius:16, padding:14, display:"flex", flexDirection:"column", gap:8, marginTop:8 }}>
                <div style={{ display:"flex", gap:8 }}>
                  <input value={customEmoji} onChange={e=>setCustomEmoji(e.target.value)} placeholder="🏷️" maxLength={2} style={{ width:44,...CARD_SOFT,borderRadius:10,padding:"8px",fontSize:16,textAlign:"center",outline:"none" }} />
                  <input value={customLabel} onChange={e=>setCustomLabel(e.target.value)} placeholder="My biryani" style={{ flex:1,...CARD_SOFT,borderRadius:10,padding:"8px 12px",fontFamily:F,fontSize:13,outline:"none",color:T1 }} />
                </div>
                <div style={{ position:"relative" }}>
                  <span style={{ position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:T3,fontFamily:F,fontSize:13,fontWeight:700 }}>$</span>
                  <input type="number" value={customPrice} onChange={e=>setCustomPrice(e.target.value)} placeholder="15" style={{ width:"100%",...CARD_SOFT,borderRadius:10,padding:"9px 9px 9px 24px",fontFamily:F,fontSize:15,fontWeight:800,outline:"none",color:T1 }} />
                </div>
                <div style={{ display:"flex",gap:6 }}>
                  <button onClick={addCustom} style={{ flex:1,background:ACC,color:"#FFF",border:"none",borderRadius:10,padding:10,fontFamily:F,fontSize:12,fontWeight:600,cursor:"pointer" }}>Add</button>
                  <button onClick={() => setShowCustom(false)} style={{ flex:1,...CARD_SOFT,borderRadius:10,padding:10,fontFamily:F,fontSize:12,cursor:"pointer",color:T2 }}>Cancel</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setShowCustom(true)} style={{ background:"none",border:"1.5px dashed rgba(0,0,0,0.12)",borderRadius:99,padding:"7px 16px",fontFamily:F,fontSize:11,color:T3,cursor:"pointer",marginTop:6 }}>
                + Create your own
              </button>
            )}
          </div>
          {foot("Continue →", () => setStep(3), profile.comparisons.length===0 && profile.customComps.length===0)}
        </>
      )}
    </Wrap>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// GRID VIEW — compact 2-col want cards
// ─────────────────────────────────────────────────────────────────────────────
function GridView({ wants, onSelect }: { wants: Want[]; onSelect: (id: string) => void }) {
  if (wants.length === 0) return null
  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
      {wants.map(w => {
        const img  = CTX_IMG[w.context]  || { from:"#F0EBE3", to:"#E8E0D4" }
        const blob = CTX_BLOB[w.context] || { fill:"#C8C4C0", emoji:"✦" }
        const faded = w.state==="skipped"||w.state==="bought"
        return (
          <div key={w.id} onClick={() => onSelect(w.id)} className="pressable" style={{
            ...CARD, borderRadius:18, overflow:"hidden", cursor:"pointer",
            opacity:faded?0.50:1, filter:"drop-shadow(0 2px 10px rgba(60,40,120,0.08))"
          }}>
            {/* Mini image */}
            <div style={{ height:80, background:`linear-gradient(140deg, ${img.from}, ${img.to})`, position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ fontSize:44, opacity:0.20, userSelect:"none" }}>{blob.emoji}</span>
              <div style={{ position:"absolute", top:8, right:8 }}><StateTag state={w.state} /></div>
            </div>
            {/* Info */}
            <div style={{ padding:"10px 12px 12px" }}>
              <div style={{ marginBottom:4 }}><CtxTag ctx={w.context} /></div>
              <div style={{ fontFamily:F, fontSize:11, color:T2, marginBottom:2, lineHeight:1.3, overflow:"hidden", textOverflow:"ellipsis", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" as const }}>{w.name}</div>
              <div style={{ fontFamily:F, fontSize:20, fontWeight:900, color:T1, letterSpacing:"-0.04em", lineHeight:1 }}>${w.price.toLocaleString()}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// HOME SCREEN
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
      {/* Header */}
      <div style={{ paddingTop:topSafe, paddingLeft:SX, paddingRight:SX, paddingBottom:20, textAlign:"center", flexShrink:0, position:"relative", zIndex:1 }}>
        <div style={{ fontFamily:F, fontSize:80, fontWeight:900, color:T1, lineHeight:0.90, letterSpacing:"-0.07em", marginBottom:12 }}>PAUSE.</div>
        <div style={{ fontFamily:F, fontSize:15, color:T2, fontWeight:400, marginBottom:24 }}>Think before you spend.</div>
        <button onClick={onAdd} className="pressable" style={{ display:"inline-flex", alignItems:"center", gap:8, background:ACC, color:"#FFF", border:"none", borderRadius:99, padding:"13px 24px", fontFamily:F, fontSize:15, fontWeight:600, cursor:"pointer", letterSpacing:"-0.01em", boxShadow:"0 2px 14px rgba(12,12,20,0.18)" }}>
          <span style={{ fontSize:17, lineHeight:1 }}>+</span> Add a want
        </button>
      </div>

      {/* Wants */}
      <div style={{ flex:1, padding:`0 ${SX}px 28px`, position:"relative", zIndex:1 }}>
        {/* Row: count label + view toggle */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
          <span style={{ fontFamily:MONO, fontSize:9, letterSpacing:"0.10em", color:T3 }}>{total} ON YOUR MIND</span>
          {total > 0 && (
            <div style={{ display:"flex", background:"rgba(0,0,0,0.07)", borderRadius:99, padding:2, gap:2 }}>
              {(["stack","grid"] as const).map(m => (
                <button key={m} onClick={() => setViewMode(m)} className="pressable" style={{ background:viewMode===m?"rgba(255,255,255,0.90)":"transparent", border:"none", borderRadius:99, padding:"4px 12px", fontFamily:MONO, fontSize:7.5, letterSpacing:"0.08em", color:viewMode===m?T1:T3, cursor:"pointer", fontWeight:viewMode===m?600:400, transition:"all 0.15s" }}>
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
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:16 }}>
            {[{big:`${skipped.length}`,label:"skipped"},{big:`$${skTotal.toLocaleString()}`,label:"potential avoided"}].map((t,i) => (
              <div key={i} style={{ ...CARD_SOFT, borderRadius:18, padding:"15px 16px" }}>
                <div style={{ fontFamily:F, fontSize:22, fontWeight:900, color:T1, letterSpacing:"-0.04em", marginBottom:2 }}>{t.big}</div>
                <div style={{ fontFamily:F, fontSize:11, color:T3 }}>{t.label}</div>
              </div>
            ))}
          </div>
        )}
        {/* Floating nav clearance */}
        <div style={{ height:90 }} />
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
  const allCtx = [...CONTEXTS, ...(profile.customContexts ?? [])]
  function upd(p: Partial<Want>) { setNewWant({...newWant,...p}) }
  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", padding:`${topSafe} ${SX}px 0` }} className="screen-in">
      <BackBtn onClick={onBack} />
      <div style={{ margin:"22px 0 26px" }}>
        <div style={{ fontFamily:F, fontSize:36, fontWeight:900, color:T1, lineHeight:1.0, letterSpacing:"-0.04em" }}>What do you want?</div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:20, flex:1 }}>
        <div>
          <SectionLabel>ITEM</SectionLabel>
          <input type="text" value={newWant.name||""} onChange={e=>upd({name:e.target.value})} placeholder="Fujifilm X-A20"
            style={{ width:"100%",...CARD, borderRadius:14, padding:"16px 18px", fontFamily:F, fontSize:17, fontWeight:500, color:T1, outline:"none" }} />
        </div>
        <div>
          <SectionLabel>PRICE</SectionLabel>
          <div style={{ position:"relative" }}>
            <span style={{ position:"absolute", left:18, top:"50%", transform:"translateY(-50%)", fontFamily:F, fontSize:20, fontWeight:700, color:T3 }}>$</span>
            <input type="number" value={String(newWant.price||"")} onChange={e=>upd({price:Number(e.target.value)})} placeholder="375"
              style={{ width:"100%",...CARD, borderRadius:14, padding:"18px 18px 18px 38px", fontFamily:F, fontSize:34, fontWeight:900, color:T1, outline:"none", letterSpacing:"-0.04em" }} />
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
      <div style={{ padding:"20px 0", paddingBottom:`calc(20px + ${botSafe})` }}>
        <PrimaryBtn label="See what it costs →" onClick={onNext} disabled={!newWant.name||!newWant.price} />
      </div>
    </div>
  )
}

function YourPrice({ want, comps, onNext, onBack }: {
  want: Partial<Want>; comps: ReturnType<typeof getComps>; onNext: () => void; onBack: () => void
}) {
  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", padding:`${topSafe} ${SX}px 0` }} className="screen-in">
      <BackBtn onClick={onBack} />
      <div style={{ margin:"18px 0 22px" }}>
        <div style={{ fontFamily:MONO, fontSize:12, color:T2, marginBottom:4, letterSpacing:"0.08em" }}>IN YOUR WORLD</div>
        <div style={{ fontFamily:F, fontSize:76, fontWeight:900, color:T1, lineHeight:1, letterSpacing:"-0.07em", marginBottom:4 }}>${(want.price||0).toLocaleString()}</div>
        <div style={{ fontFamily:F, fontSize:14, color:T2 }}>Here is what that equals.</div>
      </div>
      <div style={{ ...CARD, borderRadius:20, overflow:"hidden", flex:1 }}>
        {comps.map((c,i) => (
          <div key={i} className={`fade-in delay-${Math.min(i+1,5)}`}>
            {i>0 && <HDivider />}
            <div style={{ padding:"15px 20px", display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ width:38, height:38, borderRadius:"50%", background:`${c.color}15`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <span style={{ fontSize:17 }}>{c.emoji}</span>
              </div>
              <div>
                <div style={{ fontFamily:F, fontSize:19, fontWeight:800, color:T1, lineHeight:1.1, letterSpacing:"-0.025em" }}>
                  {c.value} {c.unit && <span style={{ fontWeight:400, color:T2, fontSize:15 }}>{c.unit}</span>}
                </div>
                <div style={{ fontFamily:F, fontSize:10.5, color:T3, marginTop:1 }}>{c.sublabel}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding:"18px 0", paddingBottom:`calc(18px + ${botSafe})` }}>
        <PrimaryBtn label="Think about it →" onClick={onNext} />
      </div>
    </div>
  )
}

function WhyScreen({ newWant, setNewWant, onNext, onBack }: {
  newWant: Partial<Want>; setNewWant: (w: Partial<Want>) => void; onNext: () => void; onBack: () => void
}) {
  const sel = newWant.reasons || []
  function toggle(r: string) { const has=sel.includes(r); setNewWant({...newWant, reasons:has?sel.filter(x=>x!==r):[...sel,r]}) }
  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", padding:`${topSafe} ${SX}px 0` }} className="screen-in">
      <BackBtn onClick={onBack} />
      <div style={{ margin:"22px 0 26px" }}>
        <div style={{ fontFamily:F, fontSize:34, fontWeight:900, color:T1, lineHeight:1.08, letterSpacing:"-0.035em" }}>Why do you want it?</div>
      </div>
      <div style={{ flex:1, overflowY:"auto", display:"flex", flexDirection:"column", gap:8 }} className="hide-scroll">
        {REASONS.map(r => <OptionCard key={r} label={r} selected={sel.includes(r)} onClick={() => toggle(r)} />)}
      </div>
      <div style={{ padding:"16px 0", paddingBottom:`calc(16px + ${botSafe})`, display:"flex", flexDirection:"column", gap:4 }}>
        <PrimaryBtn label="Continue" onClick={onNext} />
        <GhostBtn label="Skip" onClick={onNext} />
      </div>
    </div>
  )
}

function ReflectionScreen({ newWant, setNewWant, onNext, onBack }: {
  newWant: Partial<Want>; setNewWant: (w: Partial<Want>) => void; onNext: () => void; onBack: () => void
}) {
  const [step, setStep] = useState(0)
  function upd(p: Partial<Want>) { setNewWant({...newWant,...p}) }
  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", padding:`${topSafe} ${SX}px 0` }} className="screen-in">
      <BackBtn onClick={onBack} />
      <div style={{ margin:"22px 0 22px" }}>
        <div style={{ fontFamily:F, fontSize:34, fontWeight:900, color:T1, lineHeight:1.08, letterSpacing:"-0.035em", marginBottom:4 }}>A few honest questions.</div>
        <div style={{ fontFamily:F, fontSize:14, color:T3 }}>Just for you.</div>
      </div>
      <div style={{ flex:1, overflowY:"auto", display:"flex", flexDirection:"column", gap:18 }} className="hide-scroll">
        <div>
          <SectionLabel>DO YOU ALREADY OWN SOMETHING THAT DOES THIS?</SectionLabel>
          <div style={{ display:"flex", gap:8 }}>
            {(["yes","kind-of","no"] as const).map(v => (
              <SegBtn key={v} label={v==="kind-of"?"Kind of":v.charAt(0).toUpperCase()+v.slice(1)} selected={newWant.hasAlternative===v}
                onClick={() => { upd({hasAlternative:v}); setStep(Math.max(step,1)) }} />
            ))}
          </div>
        </div>
        {step >= 1 && (
          <div className="slide-up">
            <SectionLabel>HOW OFTEN WILL YOU USE IT?</SectionLabel>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              {([["daily","Every day"],["weekly","Every week"],["sometimes","Sometimes"],["rarely","Rarely"]] as const).map(([v,l]) => (
                <SegBtn key={v} label={l} selected={newWant.useFrequency===v} onClick={() => { upd({useFrequency:v}); setStep(Math.max(step,2)) }} />
              ))}
            </div>
          </div>
        )}
        {step >= 2 && (
          <>
            <div className="slide-up">
              <SectionLabel>{"IF YOU COULDN'T BUY TODAY — STILL WANT IT NEXT WEEK?"}</SectionLabel>
              <div style={{ display:"flex", gap:8 }}>
                {([["definitely","Definitely"],["maybe","Maybe"],["probably-not","Prob not"]] as const).map(([v,l]) => (
                  <SegBtn key={v} label={l} selected={newWant.stillWant===v} onClick={() => upd({stillWant:v})} />
                ))}
              </div>
            </div>
            <div className="slide-up">
              <SectionLabel>MUSING — OPTIONAL</SectionLabel>
              <textarea value={newWant.note||""} onChange={e=>upd({note:e.target.value})} placeholder="What's really going on here?" rows={3}
                style={{ width:"100%",...CARD, borderRadius:14, padding:16, fontFamily:F, fontSize:14, color:T1, outline:"none", resize:"none", fontStyle:"italic" }} />
            </div>
          </>
        )}
      </div>
      <div style={{ padding:"16px 0", paddingBottom:`calc(16px + ${botSafe})`, display:"flex", flexDirection:"column", gap:4 }}>
        <PrimaryBtn label="Continue" onClick={onNext} />
        <GhostBtn label="Skip all" onClick={onNext} />
      </div>
    </div>
  )
}

function UrgencyScreen({ newWant, setNewWant, onNext, onBack }: {
  newWant: Partial<Want>; setNewWant: (w: Partial<Want>) => void; onNext: () => void; onBack: () => void
}) {
  function upd(p: Partial<Want>) { setNewWant({...newWant,...p}) }
  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", padding:`${topSafe} ${SX}px 0` }} className="screen-in">
      <BackBtn onClick={onBack} />
      <div style={{ margin:"22px 0 26px" }}>
        <div style={{ fontFamily:F, fontSize:34, fontWeight:900, color:T1, lineHeight:1.08, letterSpacing:"-0.035em" }}>Does this have a deadline?</div>
      </div>
      <div style={{ flex:1, display:"flex", flexDirection:"column", gap:8 }}>
        {DEADLINES.map(d => <OptionCard key={d} label={d} selected={newWant.deadline===d} onClick={() => upd({deadline:d})} />)}
      </div>
      {newWant.deadline === "No deadline" && (
        <div className="fade-in" style={{ ...CARD_SOFT, borderRadius:14, padding:"12px 16px", margin:"12px 0", fontFamily:F, fontSize:13, color:T2, fontStyle:"italic", textAlign:"center" }}>
          No rush. That is useful to know.
        </div>
      )}
      <div style={{ padding:"16px 0", paddingBottom:`calc(16px + ${botSafe})`, display:"flex", flexDirection:"column", gap:4 }}>
        <PrimaryBtn label="Continue" onClick={onNext} />
        <GhostBtn label="Skip" onClick={onNext} />
      </div>
    </div>
  )
}

function SliderBlock({ label, value, onChange, color }: { label: string; value: number; onChange: (v: number) => void; color: string }) {
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:10 }}>
        <div style={{ fontFamily:F, fontSize:14, fontWeight:500, color:T1 }}>{label}</div>
        <div style={{ fontFamily:F, fontSize:30, fontWeight:900, color:T1, letterSpacing:"-0.04em" }}>{value}</div>
      </div>
      <div style={{ display:"flex", gap:3 }}>
        {Array.from({length:10}).map((_,i) => (
          <button key={i} onClick={() => onChange(i+1)} className="pressable" style={{ flex:1, height:28, borderRadius:6, border:"none", background:i<value?color:"rgba(0,0,0,0.08)", cursor:"pointer", transition:"background 0.10s" }} />
        ))}
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
        <span style={{ fontFamily:MONO, fontSize:7.5, color:T3 }}>barely</span>
        <span style={{ fontFamily:MONO, fontSize:7.5, color:T3 }}>really</span>
      </div>
    </div>
  )
}
function ScorePill({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div style={{ flex:1, background:`${color}12`, borderRadius:14, padding:"12px 16px", display:"flex", flexDirection:"column", alignItems:"center" }}>
      <span style={{ fontFamily:F, fontSize:24, fontWeight:900, color, letterSpacing:"-0.04em" }}>{value}</span>
      <span style={{ fontFamily:MONO, fontSize:8, color, opacity:0.7, letterSpacing:"0.08em", marginTop:2 }}>{label}</span>
    </div>
  )
}

function DesireUrgency({ newWant, setNewWant, onNext, onBack }: {
  newWant: Partial<Want>; setNewWant: (w: Partial<Want>) => void; onNext: () => void; onBack: () => void
}) {
  const desire=newWant.desire??7, urgency=newWant.urgency??3
  function upd(p: Partial<Want>) { setNewWant({...newWant,...p}) }
  const highU=urgency>=7, noDeadline=!newWant.deadline||newWant.deadline==="No deadline"
  function msg() {
    if (desire>=7&&urgency>=7) return {h:"You want it and there is a real reason.",s:"This might be worth deciding now."}
    if (desire>=7) return {h:"You really want it.",s:"But you don't need to rush."}
    if (urgency>=7) return {h:"Feels urgent — but do you actually want it?",s:"This could be FOMO."}
    return {h:"You are not that convinced.",s:"Probably easy to skip."}
  }
  const m=msg()
  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", padding:`${topSafe} ${SX}px 0` }} className="screen-in">
      <BackBtn onClick={onBack} />
      <div style={{ margin:"22px 0 26px" }}>
        <div style={{ fontFamily:F, fontSize:34, fontWeight:900, color:T1, lineHeight:1.08, letterSpacing:"-0.035em" }}>Two quick readings.</div>
      </div>
      <div style={{ flex:1, display:"flex", flexDirection:"column", gap:22 }}>
        <SliderBlock label="How badly do you want it?" value={desire} onChange={v=>upd({desire:v})} color="#6050D8" />
        <SliderBlock label="How urgent is the decision?" value={urgency} onChange={v=>upd({urgency:v})} color="#C07820" />
        {highU && noDeadline && (
          <div className="scale-in" style={{ background:"rgba(255,215,90,0.16)", border:"1px solid rgba(195,155,0,0.20)", borderRadius:14, padding:"12px 16px" }}>
            <div style={{ fontFamily:F, fontSize:14, fontWeight:700, color:"#6B4A00", marginBottom:2 }}>Feels urgent. But is it?</div>
            <div style={{ fontFamily:F, fontSize:12, color:"#8A6000" }}>What happens if you wait 7 days?</div>
          </div>
        )}
        <div style={{ ...CARD, borderRadius:18, padding:"16px 18px" }}>
          <div style={{ display:"flex", gap:10, marginBottom:12 }}>
            <ScorePill value={desire} label="DESIRE" color="#6050D8" />
            <ScorePill value={urgency} label="URGENCY" color="#C07820" />
          </div>
          <div style={{ fontFamily:F, fontSize:14, fontWeight:600, color:T1, lineHeight:1.4 }}>{m.h}</div>
          <div style={{ fontFamily:F, fontSize:12, color:T3, marginTop:3 }}>{m.s}</div>
        </div>
      </div>
      <div style={{ padding:"18px 0", paddingBottom:`calc(18px + ${botSafe})` }}>
        <PrimaryBtn label="Continue" onClick={onNext} />
      </div>
    </div>
  )
}

function DecisionScreen({ newWant, chips, onBuy, onWait, onSkip }: {
  newWant: Partial<Want>; chips: { emoji:string;value:string;label:string }[]
  onBuy: () => void; onWait: () => void; onSkip: () => void
}) {
  const d=newWant.desire??5, u=newWant.urgency??5
  let rec: { word:string; sub:string; bg:string }
  if (d>=7&&u>=7)    rec={word:"DECIDE", sub:"Real desire, real reason. This one is intentional.", bg:BG_FLOW}
  else if (d<5&&u<5) rec={word:"SKIP IT",sub:"You probably don't need this one.", bg:"linear-gradient(160deg, #EEEAEE 0%, #F5F3F5 60%, #FAFAFA 100%)"}
  else               rec={word:"WAIT.",  sub:"You want it. Nothing is forcing you today.", bg:BG_HOME}
  return (
    <div style={{ flex:1, overflowY:"auto", background:rec.bg }} className="hide-scroll">
      <div className="screen-in" style={{ padding:`${topSafe} ${SX}px 0`, display:"flex", flexDirection:"column", minHeight:"100%" }}>
        <div style={{ textAlign:"center", marginBottom:26 }}>
          <div style={{ fontFamily:F, fontSize:92, fontWeight:900, color:T1, lineHeight:1, letterSpacing:"-0.07em", marginBottom:12 }}>{rec.word}</div>
          <div style={{ fontFamily:F, fontSize:15, color:T2, lineHeight:1.6, maxWidth:260, margin:"0 auto" }}>{rec.sub}</div>
        </div>
        {newWant.name && (
          <div style={{ ...CARD, borderRadius:20, padding:"18px 20px", marginBottom:18 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
              {newWant.context && <CtxTag ctx={newWant.context} />}
              <span style={{ fontFamily:MONO, fontSize:8.5, color:T3 }}>DAY 01</span>
            </div>
            <div style={{ fontFamily:F, fontSize:13, color:T2, marginBottom:2 }}>{newWant.name}</div>
            <div style={{ fontFamily:F, fontSize:40, fontWeight:900, color:T1, lineHeight:1, letterSpacing:"-0.05em", marginBottom:14 }}>
              ${(newWant.price||0).toLocaleString()}
            </div>
            <HDivider />
            <div style={{ display:"flex", gap:16, marginTop:12, flexWrap:"wrap" }}>
              {chips.slice(0,3).map((c,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:5 }}>
                  <span style={{ fontSize:12 }}>{c.emoji}</span>
                  <div>
                    <div style={{ fontFamily:F, fontSize:13, fontWeight:700, color:T1, lineHeight:1 }}>{c.value}</div>
                    <div style={{ fontFamily:MONO, fontSize:7.5, color:T3, lineHeight:1.2 }}>{c.label.toUpperCase()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div style={{ display:"flex", flexDirection:"column", gap:10, paddingBottom:`calc(28px + ${botSafe})` }}>
          <PrimaryBtn label="Wait 7 days" onClick={onWait} />
          <OutlineBtn label="Buy it anyway" onClick={onBuy} />
          <GhostBtn label="Skip it" onClick={onSkip} />
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CARD DETAIL
// ─────────────────────────────────────────────────────────────────────────────
function CardDetail({ want, comps, onBack, onUpdate }: {
  want: Want; comps: ReturnType<typeof getComps>; onBack: () => void; onUpdate: (w: Want) => void
}) {
  const days=daysSince(want.addedAt)
  function setState(state: WantState) { onUpdate({...want,state}); onBack() }
  const img  = CTX_IMG[want.context]  || {from:"#F0EBE3",to:"#E8E0D4"}
  const blob = CTX_BLOB[want.context] || {fill:"#C8C4C0",emoji:"✦"}
  return (
    <div style={{ flex:1, overflowY:"auto" }} className="hide-scroll screen-in">
      <div style={{ height:196, background:`linear-gradient(140deg, ${img.from}, ${img.to})`, position:"relative", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
        <span style={{ fontSize:120, opacity:0.17, userSelect:"none", marginTop:18 }}>{blob.emoji}</span>
        <div style={{ position:"absolute", right:20, bottom:-12, fontFamily:F, fontSize:100, fontWeight:900, color:"rgba(0,0,0,0.045)", letterSpacing:"-0.05em", lineHeight:1, userSelect:"none" }}>
          {want.name.charAt(0)}
        </div>
        <div style={{ position:"absolute", top:`calc(env(safe-area-inset-top,0px) + 16px)`, left:SX }}>
          <button onClick={onBack} className="pressable" style={{ background:"rgba(255,255,255,0.72)", border:"none", borderRadius:99, padding:"8px 16px", fontFamily:F, fontSize:13, fontWeight:500, color:T1, cursor:"pointer", backdropFilter:"blur(8px)" }}>{"← Back"}</button>
        </div>
      </div>
      <div style={{ padding:`22px ${SX}px 32px` }}>
        <div style={{ display:"flex", gap:7, alignItems:"center", marginBottom:12 }}>
          <CtxTag ctx={want.context} />
          <StateTag state={want.state} />
          {days>0 && <span style={{ fontFamily:MONO, fontSize:8.5, color:T3, letterSpacing:"0.06em" }}>DAY {String(days).padStart(2,"0")}</span>}
        </div>
        <div style={{ fontFamily:F, fontSize:14, color:T2, marginBottom:4 }}>{want.name}</div>
        <div style={{ fontFamily:F, fontSize:60, fontWeight:900, color:T1, lineHeight:1, letterSpacing:"-0.06em", marginBottom:20 }}>
          ${want.price.toLocaleString()}
        </div>
        <div style={{ ...CARD, borderRadius:20, overflow:"hidden", marginBottom:12 }}>
          <div style={{ padding:"14px 20px 8px" }}><SectionLabel>IN YOUR WORLD</SectionLabel></div>
          {comps.map((c,i) => (
            <div key={i}>
              {i>0 && <div style={{ margin:"0 20px" }}><HDivider /></div>}
              <div style={{ padding:"11px 20px", display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ width:34, height:34, borderRadius:"50%", background:`${c.color}14`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span style={{ fontSize:15 }}>{c.emoji}</span>
                </div>
                <div>
                  <div style={{ fontFamily:F, fontSize:16, fontWeight:800, color:T1, lineHeight:1.1, letterSpacing:"-0.02em" }}>
                    {c.value}{c.unit?` ${c.unit}`:""}
                  </div>
                  <div style={{ fontFamily:F, fontSize:10.5, color:T3, marginTop:1 }}>{c.sublabel}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {(want.desire!==undefined||want.urgency!==undefined) && (
          <div style={{ display:"flex", gap:8, marginBottom:12 }}>
            {want.desire!==undefined  && <ScorePill value={want.desire}  label="DESIRE"  color="#6050D8" />}
            {want.urgency!==undefined && <ScorePill value={want.urgency} label="URGENCY" color="#C07820" />}
          </div>
        )}
        {want.note && (
          <div style={{ ...CARD_SOFT, borderRadius:14, padding:"14px 18px", marginBottom:16, borderLeft:"3px solid rgba(96,80,216,0.30)" }}>
            <SectionLabel>MUSING</SectionLabel>
            <div style={{ fontFamily:F, fontSize:14, color:T2, fontStyle:"italic", lineHeight:1.6 }}>"{want.note}"</div>
          </div>
        )}
        {want.state!=="bought"&&want.state!=="skipped" ? (
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            <PrimaryBtn label="Buy it" onClick={() => setState("bought")} />
            <OutlineBtn label="Keep waiting" onClick={() => setState("waiting")} />
            <GhostBtn label="Skip it" onClick={() => setState("skipped")} />
          </div>
        ) : (
          <div style={{ ...CARD_SOFT, borderRadius:14, padding:16, textAlign:"center", fontFamily:F, fontSize:14, color:T3 }}>
            This one is {want.state==="bought"?"done ✓":"skipped ✕"}.
          </div>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTEXTS SCREEN — full-screen spatial map
// ─────────────────────────────────────────────────────────────────────────────
// CONTEXTS SCREEN — spatial blob field
// ─────────────────────────────────────────────────────────────────────────────
// Extended fill colors for custom contexts (cycling through a palette)
const CUSTOM_CTX_FILLS = ["#C084FC","#F472B6","#FB923C","#34D399","#60A5FA","#FBBF24","#A78BFA"]

function ContextsScreen({ wants, profile, setProfile, onSelectWant }: {
  wants: Want[]; profile: UserProfile; setProfile: (p: UserProfile) => void; onSelectWant: (id: string) => void
}) {
  const [active, setActive]     = useState<string|null>(null)
  const [adding, setAdding]     = useState(false)
  const [newCtxName, setNewCtxName] = useState("")

  const allContexts = [...CONTEXTS, ...(profile.customContexts ?? [])]

  // Custom blob positions for custom contexts (placed around the edges)
  const CUSTOM_BLOB_POS: Record<string, { cx:number; cy:number; r:number }> = {}
  ;(profile.customContexts ?? []).forEach((c, i) => {
    const angle = ((i / Math.max(profile.customContexts.length, 1)) * Math.PI * 2) + Math.PI * 0.25
    CUSTOM_BLOB_POS[c] = { cx: 0.5 + Math.cos(angle) * 0.36, cy: 0.45 + Math.sin(angle) * 0.40, r: 0.16 }
  })

  const totals = Object.fromEntries(allContexts.map(c => [
    c,
    { n: wants.filter(w=>w.context===c).length,
      t: wants.filter(w=>w.context===c).reduce((s,w)=>s+w.price,0) }
  ]))
  const maxN = Math.max(...Object.values(totals).map(v=>v.n), 1)
  const filtered = active ? wants.filter(w=>w.context===active) : []

  function addContext() {
    const name = newCtxName.trim()
    if (!name || allContexts.includes(name)) return
    setProfile({ ...profile, customContexts: [...profile.customContexts, name] })
    setNewCtxName("")
    setAdding(false)
  }
  function removeCustomCtx(c: string) {
    setProfile({ ...profile, customContexts: profile.customContexts.filter(x=>x!==c) })
    if (active===c) setActive(null)
  }

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }} className="screen-in">
      {/* Header */}
      <div style={{ padding:`${topSafe} ${SX}px 0`, flexShrink:0, position:"relative", zIndex:2 }}>
        <div style={{ fontFamily:F, fontSize:28, fontWeight:900, color:T1, lineHeight:1.12, letterSpacing:"-0.03em", marginBottom:4 }}>
          Where your money<br/>wants to go.
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ fontFamily:F, fontSize:13, color:T2 }}>Tap a context to explore.</div>
          <button onClick={() => setAdding(a=>!a)} className="pressable" style={{ background:"none", border:"none", cursor:"pointer", fontFamily:MONO, fontSize:8, letterSpacing:"0.10em", color:T3, padding:"4px 0" }}>
            {adding ? "CANCEL" : "+ CATEGORY"}
          </button>
        </div>
        {adding && (
          <div className="fade-in" style={{ display:"flex", gap:8, marginTop:10 }}>
            <input value={newCtxName} onChange={e=>setNewCtxName(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&addContext()}
              placeholder="e.g. Health, Music…"
              style={{ flex:1, ...CARD_SOFT, borderRadius:12, padding:"10px 14px", fontFamily:F, fontSize:13, color:T1, outline:"none" }} />
            <button onClick={addContext} className="pressable" style={{ background:ACC, color:"#FFF", border:"none", borderRadius:12, padding:"10px 16px", fontFamily:F, fontSize:13, fontWeight:600, cursor:"pointer" }}>Add</button>
          </div>
        )}
      </div>

      {/* Full-screen blob field */}
      <div style={{ flex:1, position:"relative", overflow:"hidden" }}>
        {allContexts.map((ctx, ctxIdx) => {
          const isCustom = !CONTEXTS.includes(ctx)
          const pos   = isCustom ? (CUSTOM_BLOB_POS[ctx] || { cx:0.5, cy:0.5, r:0.16 }) : BLOB_POS[ctx]
          const blob  = CTX_BLOB[ctx] || { fill: CUSTOM_CTX_FILLS[ctxIdx % CUSTOM_CTX_FILLS.length], label:"#1A1A2E", emoji:"✦" }
          const data  = totals[ctx]
          const isAct = active===ctx
          const scale = 1 + (data.n/maxN)*0.20
          const lbl   = ctx==="Home"?"HOME & LIVING":ctx==="Study"?"STUDY & TECH":ctx==="Travel"?"TRAVEL & TRIPS":ctx.toUpperCase()

          return (
            <button key={ctx} onClick={() => setActive(isAct?null:ctx)} style={{
              position:"absolute",
              left:`calc(${pos.cx*100}% - ${pos.r*100}vw * 0.55)`,
              top:`calc(${pos.cy*100}% - ${pos.r*100}vw * 0.55)`,
              width:`${pos.r*200}vw`, maxWidth:`${pos.r*200*2}px`,
              height:`${pos.r*200}vw`, maxHeight:`${pos.r*200*2}px`,
              background:"none", border:"none", cursor:"pointer", padding:0,
              zIndex: isAct?20:10,
              transform:`scale(${isAct?scale*1.12:scale})`,
              transition:"transform 0.30s cubic-bezier(0.22,1,0.36,1)",
            }}>
              {/* Stronger outer glow */}
              <div style={{ position:"absolute", inset:-20, borderRadius:"50%", background:blob.fill, filter:`blur(${pos.r*220}px)`, opacity:isAct?0.85:0.68, transition:"opacity 0.28s" }} />
              {/* Inner tighter fill */}
              <div style={{ position:"absolute", inset:0, borderRadius:"50%", background:blob.fill, filter:`blur(${pos.r*80}px)`, opacity:isAct?0.55:0.38, transition:"opacity 0.28s" }} />
              <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:1 }}>
                <span style={{ fontFamily:MONO, fontSize:8, fontWeight:600, letterSpacing:"0.12em", color:blob.label, textAlign:"center", lineHeight:1.4 }}>{lbl}</span>
                {data.n > 0 && (
                  <>
                    <span style={{ fontFamily:F, fontSize:10, color:blob.label, opacity:0.82 }}>{data.n} want{data.n!==1?"s":""}</span>
                    <span style={{ fontFamily:F, fontSize:14, fontWeight:900, color:blob.label, letterSpacing:"-0.02em" }}>${data.t.toLocaleString()}</span>
                  </>
                )}
              </div>
            </button>
          )
        })}

        {/* Detail panel */}
        {active && (
          <div className="slide-up" style={{ position:"absolute", bottom:0, left:0, right:0, ...CARD, borderRadius:"20px 20px 0 0", padding:"18px 20px 24px", zIndex:30, maxHeight:"48%" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <div>
                <div style={{ fontFamily:MONO, fontSize:9, letterSpacing:"0.10em", color:T3, marginBottom:4 }}>{active.toUpperCase()}</div>
                <div style={{ fontFamily:F, fontSize:18, fontWeight:900, color:T1, letterSpacing:"-0.03em" }}>
                  {totals[active].n} want{totals[active].n!==1?"s":""}{totals[active].t > 0 ? ` · $${totals[active].t.toLocaleString()}` : ""}
                </div>
              </div>
              <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                {!CONTEXTS.includes(active) && (
                  <button onClick={() => removeCustomCtx(active)} style={{ background:"rgba(255,60,60,0.09)", border:"none", borderRadius:99, padding:"5px 10px", cursor:"pointer", fontFamily:F, fontSize:11, color:"#D03030" }}>Remove</button>
                )}
                <button onClick={() => setActive(null)} style={{ background:"rgba(0,0,0,0.07)", border:"none", borderRadius:99, width:30, height:30, cursor:"pointer", fontSize:16, color:T2 }}>×</button>
              </div>
            </div>
            <div style={{ overflowY:"auto", maxHeight:180 }} className="hide-scroll">
              {filtered.length===0 ? (
                <div style={{ fontFamily:F, fontSize:13, color:T3, textAlign:"center", padding:"16px 0" }}>Nothing in {active} yet.</div>
              ) : filtered.map(w => (
                <button key={w.id} onClick={() => onSelectWant(w.id)} className="pressable" style={{ width:"100%", background:"rgba(0,0,0,0.035)", border:"none", borderRadius:14, padding:"12px 16px", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6, textAlign:"left" }}>
                  <div>
                    <div style={{ fontFamily:F, fontSize:13, fontWeight:500, color:T1, marginBottom:2 }}>{w.name}</div>
                    <div style={{ fontFamily:F, fontSize:20, fontWeight:900, color:T1, letterSpacing:"-0.03em" }}>${w.price.toLocaleString()}</div>
                  </div>
                  <StateTag state={w.state} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// INSIGHTS SCREEN — widget bento (Apple Watch-style dark cards + infographics)
// ─────────────────────────────────────────────────────────────────────────────
const INK      = "#0B0B10"
const VIO      = "#7B7BF0"
const EGGSHELL = "#F9F8FC"

// State → widget square color
const STATE_SQ: Record<WantState, string> = {
  waiting:  "#7B7BF0",
  thinking: "#B090E0",
  new:      "#606080",
  skipped:  "#38384A",
  bought:   "#4BC07A",
}

// Arc gauge SVG (half-circle, 0–1 fill)
function ArcGauge({ pct, color, size=80 }: { pct:number; color:string; size?:number }) {
  const r = size * 0.42
  const cx = size / 2, cy = size * 0.56
  const circ = Math.PI * r
  const dash = Math.max(0, Math.min(1, pct)) * circ
  return (
    <svg width={size} height={size * 0.62} viewBox={`0 0 ${size} ${size * 0.62}`} fill="none">
      <path d={`M ${cx-r} ${cy} A ${r} ${r} 0 0 1 ${cx+r} ${cy}`} stroke="rgba(255,255,255,0.10)" strokeWidth={size*0.075} strokeLinecap="round" />
      <path d={`M ${cx-r} ${cy} A ${r} ${r} 0 0 1 ${cx+r} ${cy}`} stroke={color} strokeWidth={size*0.075} strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`} style={{ transition:"stroke-dasharray 0.8s cubic-bezier(0.22,1,0.36,1)" }} />
    </svg>
  )
}

// Vertical bar mini-histogram
function BarHistogram({ values, color, height=36 }: { values:number[]; color:string; height?:number }) {
  const max = Math.max(...values, 1)
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:3, height }}>
      {values.map((v,i) => (
        <div key={i} style={{ flex:1, background:`rgba(255,255,255,0.10)`, borderRadius:3, height:"100%", display:"flex", alignItems:"flex-end" }}>
          <div style={{ width:"100%", background:color, borderRadius:3, height:`${(v/max)*100}%`, minHeight:3, transition:"height 0.6s cubic-bezier(0.22,1,0.36,1)" }} />
        </div>
      ))}
    </div>
  )
}

// Colored dot spectrum (like Apple Watch soil sensor)
function DotSpectrum({ count, activeIdx, colors }: { count:number; activeIdx:number; colors:string[] }) {
  return (
    <div style={{ display:"flex", gap:4, flexWrap:"wrap" as const }}>
      {Array.from({length:count}).map((_,i) => (
        <div key={i} style={{ width:10, height:10, borderRadius:"50%", background:colors[i % colors.length], opacity: i <= activeIdx ? 1 : 0.20, transition:"opacity 0.3s" }} />
      ))}
    </div>
  )
}

// Colored square tile row (like Apple Watch watering widget)
function TileRow({ wants }: { wants: Want[] }) {
  const tiles = wants.slice(0, 12)
  return (
    <div style={{ display:"flex", gap:4, flexWrap:"wrap" as const }}>
      {tiles.map(w => (
        <div key={w.id} style={{ width:20, height:20, borderRadius:5, background:STATE_SQ[w.state] }} />
      ))}
    </div>
  )
}

function InsightsScreen({ wants }: { wants: Want[] }) {
  const skipped = wants.filter(w=>w.state==="skipped")
  const bought  = wants.filter(w=>w.state==="bought")
  const waiting = wants.filter(w=>["waiting","thinking","new"].includes(w.state))
  const skTotal = skipped.reduce((s,w)=>s+w.price,0)
  const decided = [...bought,...skipped]
  const avgDays = decided.length>0 ? Math.round(decided.reduce((s,w)=>s+daysSince(w.addedAt),0)/decided.length) : null
  const avgPrc  = wants.length>0 ? Math.round(wants.reduce((s,w)=>s+w.price,0)/wants.length) : null
  const ctxList = CONTEXTS.map(c=>({c,n:wants.filter(w=>w.context===c).length,t:wants.filter(w=>w.context===c).reduce((s,w)=>s+w.price,0)})).filter(x=>x.n>0).sort((a,b)=>b.t-a.t)
  const topCtx  = ctxList[0]
  const totalVal = wants.reduce((s,w)=>s+w.price,0)

  // Context bar values for histogram
  const ctxVals = ctxList.slice(0,8).map(x=>x.t)

  // Day spectrum: 30 dots, how many "lit" = avgDays
  const dayDots = 20
  const dayActiveIdx = avgDays !== null ? Math.round((avgDays / 30) * dayDots) - 1 : 0
  const dayColors = ["#4BC07A","#7BD06A","#B0D050","#E8C840","#F0A040","#E86040","#D04040"]

  const gap = 11

  // Stepped bars for avoided spending: 6 bars ascending in height
  const barHeights = [18, 26, 34, 44, 54, 66]

  // Spectrum gradient bar with position marker for avgPrc
  const specMin = 0, specMax = Math.max((avgPrc ?? 0) * 2, 500)
  const specPct = avgPrc !== null ? Math.min(100, Math.round(((avgPrc - specMin) / (specMax - specMin)) * 100)) : 50

  // Arc for biggest-area card: pct of totalVal
  const bigAreaPct = topCtx && totalVal > 0 ? topCtx.t / totalVal : 0

  // Circular arc for waiting days: 0–60 day scale
  const waitPct = avgDays !== null ? Math.min(1, avgDays / 60) : 0

  const CARD_DARK = "#1A1714"
  const CARD_MID  = "#141210"
  const LBL = { fontFamily:MONO, fontSize:8, letterSpacing:"0.14em", color:"rgba(255,255,255,0.45)", textTransform:"uppercase" as const }
  const HERO = { fontFamily:F, fontWeight:900, color:"#FFFFFF", lineHeight:1, letterSpacing:"-0.05em" }

  return (
    <div style={{ flex:1, overflowY:"auto", padding:`${topSafe} ${SX}px calc(${botSafe} + 32px)` }} className="hide-scroll screen-in">
      {/* Header */}
      <div style={{ marginBottom:22 }}>
        <div style={{ fontFamily:MONO, fontSize:9, letterSpacing:"0.16em", color:T3, marginBottom:10, textTransform:"uppercase" as const }}>Your Patterns</div>
        <div style={{ fontFamily:F, fontSize:36, fontWeight:900, color:T1, lineHeight:1.02, letterSpacing:"-0.04em", marginBottom:5 }}>Your spending,<br/>lately.</div>
        <div style={{ fontFamily:F, fontSize:13, color:T2 }}>Observations, not advice.</div>
      </div>

      {/* ── ROW 1: Considered + Biggest Area (2 square widgets) ── */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap, marginBottom:gap }}>

        {/* CONSIDERED widget — tile row infographic */}
        <div style={{ background:CARD_DARK, borderRadius:24, padding:"18px 16px 16px", display:"flex", flexDirection:"column", minHeight:200 }}>
          <div style={LBL}>Considered</div>
          <div style={{ ...HERO, fontSize:64, marginTop:6, marginBottom:"auto" }}>{wants.length}</div>
          <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:"0.10em", color:"rgba(255,255,255,0.28)", marginBottom:8, textTransform:"uppercase" as const }}>All wants</div>
          {/* Tile row: one square per want, colored by state */}
          <TileRow wants={wants} />
        </div>

        {/* BIGGEST AREA widget — arc gauge infographic */}
        <div style={{ background:CARD_MID, borderRadius:24, padding:"18px 16px 16px", display:"flex", flexDirection:"column", minHeight:200 }}>
          <div style={LBL}>Top Area</div>
          {topCtx ? (
            <>
              <div style={{ fontFamily:MONO, fontSize:9, letterSpacing:"0.12em", color:"rgba(255,255,255,0.55)", marginTop:4, textTransform:"uppercase" as const }}>{topCtx.c}</div>
              <div style={{ ...HERO, fontSize:42, marginTop:2, marginBottom:"auto" }}>${topCtx.t >= 1000 ? `${(topCtx.t/1000).toFixed(1)}k` : topCtx.t}</div>
              <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:"0.10em", color:"rgba(255,255,255,0.28)", marginBottom:4, textTransform:"uppercase" as const }}>{topCtx.n} want{topCtx.n!==1?"s":""}</div>
              {/* Arc gauge: proportion of total */}
              <div style={{ display:"flex", justifyContent:"center" }}>
                <ArcGauge pct={bigAreaPct} color={VIO} size={90} />
              </div>
            </>
          ) : (
            <div style={{ fontFamily:F, fontSize:12, color:"rgba(255,255,255,0.30)", marginTop:16 }}>No data yet</div>
          )}
        </div>
      </div>

      {/* ── ROW 2: Avoided Spending — full-width dark widget, stepped bars ── */}
      {skTotal > 0 && (
        <div style={{ background:CARD_DARK, borderRadius:24, padding:"20px 20px 18px", marginBottom:gap, display:"flex", flexDirection:"column" }}>
          <div style={LBL}>Potential Avoided</div>
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between" }}>
            <div>
              <div style={{ ...HERO, fontSize:52, marginTop:6 }}>${skTotal.toLocaleString()}</div>
              <div style={{ fontFamily:F, fontSize:12, color:"rgba(255,255,255,0.36)", marginTop:6, lineHeight:1.4 }}>
                {skipped.length} want{skipped.length!==1?"s":""} stayed unspent.
              </div>
            </div>
            {/* Ascending stepped bars */}
            <div style={{ display:"flex", alignItems:"flex-end", gap:5, paddingBottom:2 }}>
              {barHeights.map((h, i) => (
                <div key={i} style={{ width:10, height:h, borderRadius:3, background:i < skipped.length ? VIO : "rgba(255,255,255,0.10)", transition:"height 0.5s cubic-bezier(0.22,1,0.36,1)" }} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── ROW 3: Waiting + Avg Want ── */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap, marginBottom:gap }}>

        {/* WAITING DAYS widget — circular arc gauge */}
        {avgDays !== null && (
          <div style={{ background:CARD_MID, borderRadius:24, padding:"18px 16px 16px", display:"flex", flexDirection:"column", minHeight:190 }}>
            <div style={LBL}>You Wait</div>
            <div style={{ ...HERO, fontSize:56, marginTop:6, marginBottom:"auto" }}>{avgDays}</div>
            <div style={{ fontFamily:MONO, fontSize:8, letterSpacing:"0.12em", color:VIO, textTransform:"uppercase" as const, marginBottom:8 }}>Days avg.</div>
            {/* Circular arc gauge */}
            <div style={{ position:"relative", display:"flex", justifyContent:"center" }}>
              <svg width={80} height={80} viewBox="0 0 80 80" fill="none">
                <circle cx={40} cy={40} r={32} stroke="rgba(255,255,255,0.10)" strokeWidth={7} />
                <circle cx={40} cy={40} r={32} stroke={VIO} strokeWidth={7} strokeLinecap="round"
                  strokeDasharray={`${waitPct * 2 * Math.PI * 32} ${2 * Math.PI * 32}`}
                  strokeDashoffset={2 * Math.PI * 32 * 0.25}
                  style={{ transition:"stroke-dasharray 0.8s cubic-bezier(0.22,1,0.36,1)" }} />
                <text x={40} y={45} textAnchor="middle" fill="rgba(255,255,255,0.50)" fontSize={10} fontFamily="DM Mono, monospace">{Math.round(waitPct*100)}%</text>
              </svg>
            </div>
          </div>
        )}

        {/* AVG WANT widget — spectrum gradient bar */}
        {avgPrc !== null && (
          <div style={{ background:CARD_DARK, borderRadius:24, padding:"18px 16px 16px", display:"flex", flexDirection:"column", minHeight:190 }}>
            <div style={LBL}>Avg Want</div>
            <div style={{ ...HERO, fontSize:42, marginTop:6, marginBottom:"auto" }}>${avgPrc}</div>
            <div style={{ fontFamily:F, fontSize:10, color:"rgba(255,255,255,0.32)", marginBottom:12 }}>per item considered</div>
            {/* Spectrum bar */}
            <div style={{ position:"relative" }}>
              <div style={{ height:8, borderRadius:99, background:"linear-gradient(90deg, #2D2D56 0%, #5B5BD6 40%, #A0B0FF 70%, #E8E4FF 100%)" }} />
              {/* Marker */}
              <div style={{ position:"absolute", top:-3, left:`${specPct}%`, transform:"translateX(-50%)", width:14, height:14, borderRadius:"50%", background:"#FFF", border:"2px solid #5B5BD6" }} />
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:5 }}>
              <div style={{ fontFamily:MONO, fontSize:7, color:"rgba(255,255,255,0.25)", letterSpacing:"0.08em" }}>$0</div>
              <div style={{ fontFamily:MONO, fontSize:7, color:"rgba(255,255,255,0.25)", letterSpacing:"0.08em" }}>${specMax}</div>
            </div>
          </div>
        )}
      </div>

      {/* ── ROW 4: Observations editorial strip ── */}
      {(topCtx || avgDays !== null) && (
        <div style={{ background:INK, borderRadius:24, padding:"20px 20px 18px" }}>
          <div style={{ fontFamily:MONO, fontSize:8, letterSpacing:"0.14em", color:"rgba(255,255,255,0.28)", marginBottom:14, textTransform:"uppercase" as const }}>Patterns</div>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {[
              topCtx && `${topCtx.c} is where most of your wants live.`,
              avgDays !== null && avgDays < 7  && `You tend to decide quickly — within ${avgDays} day${avgDays!==1?"s":""}.`,
              avgDays !== null && avgDays >= 7  && `You sit with purchases. ${avgDays} days on average.`,
              skipped.length > 0 && `${skipped.length} want${skipped.length!==1?"s":""} didn't make the cut. That's restraint.`,
              avgPrc !== null && `Your average want is $${avgPrc}.`,
            ].filter(Boolean).map((line, i) => (
              <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                <div style={{ width:4, height:4, borderRadius:"50%", background:i===0?VIO:"rgba(255,255,255,0.22)", flexShrink:0, marginTop:8 }} />
                <div style={{ fontFamily:F, fontSize:13, color:"rgba(255,255,255,0.72)", lineHeight:1.55 }}>{line as string}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PROFILE SCREEN
// ─────────────────────────────────────────────────────────────────────────────
function ProfileScreen({ profile, setProfile }: { profile: UserProfile; setProfile: (p: UserProfile) => void }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft]     = useState(profile)
  const [openCat, setOpenCat] = useState<string|null>(null)
  const [showCustom, setShowCustom] = useState(false)
  const [customLabel, setCustomLabel] = useState("")
  const [customEmoji, setCustomEmoji] = useState("")
  const [customPrice, setCustomPrice] = useState("")

  function toggleComp(k: CompKey) {
    const has=draft.comparisons.includes(k)
    setDraft({...draft, comparisons:has?draft.comparisons.filter(c=>c!==k):[...draft.comparisons,k]})
  }
  function addCustom() {
    if (!customLabel||!customPrice) return
    setDraft({...draft, customComps:[...draft.customComps,{id:String(Date.now()),label:customLabel,emoji:customEmoji||"🏷️",price:Number(customPrice)}]})
    setCustomLabel(""); setCustomEmoji(""); setCustomPrice(""); setShowCustom(false)
  }

  const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div style={{ paddingBottom:16, marginBottom:16, borderBottom:"1px solid rgba(0,0,0,0.07)" }}>
      <SectionLabel>{label}</SectionLabel>
      {children}
    </div>
  )

  const SectionHead = ({ label }: { label: string }) => (
    <div style={{ fontFamily:MONO, fontSize:8.5, letterSpacing:"0.14em", color:T3, marginBottom:16, paddingBottom:10, borderBottom:`1px solid rgba(0,0,0,0.07)` }}>{label}</div>
  )

  return (
    <div style={{ flex:1, overflowY:"auto", padding:`${topSafe} ${SX}px 32px` }} className="hide-scroll screen-in">
      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:32 }}>
        <div style={{ fontFamily:F, fontSize:34, fontWeight:900, color:T1, letterSpacing:"-0.035em", lineHeight:1 }}>Profile</div>
        <button onClick={() => editing?(setProfile(draft),setEditing(false)):setEditing(true)} className="pressable"
          style={{ background:editing?ACC:"rgba(0,0,0,0.07)", color:editing?"#FFF":T1, border:"none", borderRadius:99, padding:"9px 18px", fontFamily:F, fontSize:13, fontWeight:600, cursor:"pointer" }}>
          {editing?"Save":"Edit"}
        </button>
      </div>

      {/* ── YOUR WORLD ── */}
      <div style={{ marginBottom:8 }}><SectionHead label="YOUR WORLD" /></div>
      <div style={{ background:"#FFF", borderRadius:20, padding:"20px 20px 4px", border:"1px solid rgba(0,0,0,0.07)", marginBottom:10 }}>
        <Row label="AVAILABLE SPENDING">
          {editing ? (
            <div style={{ display:"flex", gap:8 }}>
              <div style={{ position:"relative", flex:1 }}>
                <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", fontFamily:F, fontSize:16, fontWeight:700, color:T3 }}>$</span>
                <input type="number" value={draft.amount} onChange={e=>setDraft({...draft,amount:Number(e.target.value)})}
                  style={{ width:"100%",...CARD_SOFT, borderRadius:12, padding:"11px 11px 11px 28px", fontFamily:F, fontSize:20, fontWeight:900, color:T1, outline:"none", letterSpacing:"-0.03em" }} />
              </div>
              <select value={draft.period} onChange={e=>setDraft({...draft,period:e.target.value as Period})}
                style={{ background:"rgba(255,255,255,0.60)", borderRadius:12, padding:"0 12px", fontFamily:F, fontSize:13, color:T1, outline:"none", border:"1px solid rgba(255,255,255,0.80)" }}>
                <option value="weekly">{"/ week"}</option>
                <option value="fortnightly">{"/ fortnight"}</option>
                <option value="monthly">{"/ month"}</option>
              </select>
            </div>
          ) : (
            <div style={{ fontFamily:F, fontSize:28, fontWeight:900, color:T1, letterSpacing:"-0.04em" }}>
              ${profile.amount.toLocaleString()} <span style={{ fontSize:14, fontWeight:400, color:T3 }}>{"/ " + profile.period}</span>
            </div>
          )}
        </Row>
        <Row label="HOURLY RATE">
          {editing ? (
            <div style={{ position:"relative" }}>
              <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", fontFamily:F, fontSize:16, fontWeight:700, color:T3 }}>$</span>
              <input type="number" value={draft.hourlyRate||""} onChange={e=>setDraft({...draft,hourlyRate:e.target.value?Number(e.target.value):undefined})} placeholder="Optional"
                style={{ width:"100%",...CARD_SOFT, borderRadius:12, padding:"11px 11px 11px 28px", fontFamily:F, fontSize:20, fontWeight:900, color:T1, outline:"none", letterSpacing:"-0.03em" }} />
            </div>
          ) : (
            <div style={{ fontFamily:F, fontSize:28, fontWeight:900, color:T1, letterSpacing:"-0.04em" }}>
              {profile.hourlyRate?<>${profile.hourlyRate} <span style={{ fontSize:14,fontWeight:400,color:T3 }}>/ hr</span></>:<span style={{ fontSize:14,fontWeight:400,color:T3 }}>Not set</span>}
            </div>
          )}
        </Row>
      </div>

      {/* ── YOUR LENS ── */}
      <div style={{ marginTop:18, marginBottom:8 }}><SectionHead label="YOUR LENS" /></div>
      <div style={{ background:"#FFF", borderRadius:20, padding:"20px 20px 12px", border:"1px solid rgba(0,0,0,0.07)", marginBottom:10 }}>
        <SectionLabel>MY COMPARISONS</SectionLabel>
        <div style={{ fontFamily:F, fontSize:12, color:T3, fontStyle:"italic", marginBottom:12 }}>Your money, translated into things you understand.</div>
        {editing ? (
          <div>
            {COMP_CATS.map(cat => {
              const keys=ALL_KEYS.filter(k=>COMPS[k].category===cat), open=openCat===cat
              return (
                <div key={cat}>
                  <button onClick={() => setOpenCat(open?null:cat)} style={{ width:"100%",background:"none",border:"none",display:"flex",justifyContent:"space-between",padding:"7px 0",cursor:"pointer" }}>
                    <span style={{ fontFamily:MONO,fontSize:8.5,letterSpacing:"0.10em",color:T3 }}>{cat.toUpperCase()}</span>
                    <span style={{ color:T3,fontSize:11,transform:open?"rotate(180deg)":"none",transition:"transform 0.18s" }}>{"▾"}</span>
                  </button>
                  {open && (
                    <div style={{ display:"flex",flexWrap:"wrap",gap:6,paddingBottom:10 }}>
                      {keys.map(k => {
                        const c=COMPS[k],sel=draft.comparisons.includes(k)
                        return (
                          <button key={k} onClick={() => toggleComp(k)} className="pressable" style={{ ...CARD_SOFT,borderRadius:99,padding:"6px 12px",fontFamily:F,fontSize:12,fontWeight:500,cursor:"pointer",display:"flex",alignItems:"center",gap:4,color:sel?"#FFF":T2,background:sel?ACC:CARD_SOFT.background,border:sel?`1.5px solid ${ACC}`:CARD_SOFT.border,transition:"all 0.13s" }}>
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
              <div key={c.id} style={{ display:"flex",gap:8,marginBottom:6,alignItems:"center" }}>
                <div style={{ flex:1,...CARD_SOFT,borderRadius:10,padding:"7px 12px",fontFamily:F,fontSize:12 }}>{c.emoji} {c.label} · ${c.price}</div>
                <button onClick={() => setDraft({...draft,customComps:draft.customComps.filter(x=>x.id!==c.id)})} style={{ background:"none",border:"none",cursor:"pointer",color:T3,fontSize:18 }}>×</button>
              </div>
            ))}
            {showCustom ? (
              <div style={{ ...CARD_SOFT,borderRadius:14,padding:12,display:"flex",flexDirection:"column",gap:8,marginTop:8 }}>
                <div style={{ display:"flex",gap:8 }}>
                  <input value={customEmoji} onChange={e=>setCustomEmoji(e.target.value)} placeholder="🏷️" maxLength={2} style={{ width:42,...CARD_SOFT,borderRadius:8,padding:"7px",fontSize:15,textAlign:"center",outline:"none" }} />
                  <input value={customLabel} onChange={e=>setCustomLabel(e.target.value)} placeholder="My biryani" style={{ flex:1,...CARD_SOFT,borderRadius:8,padding:"7px 12px",fontFamily:F,fontSize:13,outline:"none",color:T1 }} />
                </div>
                <div style={{ position:"relative" }}>
                  <span style={{ position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:T3,fontFamily:F,fontSize:12,fontWeight:700 }}>$</span>
                  <input type="number" value={customPrice} onChange={e=>setCustomPrice(e.target.value)} placeholder="15" style={{ width:"100%",...CARD_SOFT,borderRadius:8,padding:"8px 8px 8px 22px",fontFamily:F,fontSize:14,fontWeight:800,outline:"none",color:T1 }} />
                </div>
                <div style={{ display:"flex",gap:6 }}>
                  <button onClick={addCustom} style={{ flex:1,background:ACC,color:"#FFF",border:"none",borderRadius:8,padding:9,fontFamily:F,fontSize:12,fontWeight:600,cursor:"pointer" }}>Add</button>
                  <button onClick={() => setShowCustom(false)} style={{ flex:1,...CARD_SOFT,borderRadius:8,padding:9,fontFamily:F,fontSize:12,cursor:"pointer",color:T2 }}>Cancel</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setShowCustom(true)} style={{ background:"none",border:"1.5px dashed rgba(0,0,0,0.12)",borderRadius:99,padding:"7px 14px",fontFamily:F,fontSize:11,color:T3,cursor:"pointer",marginTop:6 }}>
                + Create your own
              </button>
            )}
          </div>
        ) : (
          <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
            {profile.comparisons.map(k => {
              const c=COMPS[k]
              return (
                <div key={k} style={{ background:"rgba(0,0,0,0.05)",borderRadius:12,padding:"9px 14px",display:"flex",alignItems:"center",gap:7 }}>
                  <span style={{ fontSize:17 }}>{c.emoji}</span>
                  <div>
                    <div style={{ fontFamily:F,fontSize:12,fontWeight:600,color:T1 }}>{c.label}</div>
                    <div style={{ fontFamily:MONO,fontSize:7.5,color:T3,letterSpacing:"0.06em" }}>${c.price}</div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* ── ABOUT WORTH IT? ── */}
      <div style={{ marginTop:18, marginBottom:8 }}><SectionHead label="ABOUT WORTH IT?" /></div>
      <div style={{ background:"#FFF", borderRadius:20, padding:"18px 20px", border:"1px solid rgba(0,0,0,0.07)" }}>
        <div style={{ fontFamily:F, fontSize:13, color:T2, lineHeight:1.7, marginBottom:14 }}>
          Before you buy something, pause and see what it means in your world.
        </div>
        <div style={{ fontFamily:F, fontSize:13, color:T2, lineHeight:1.7, marginBottom:14 }}>
          Worth It? turns spending decisions into a moment of intention — not restriction.
        </div>
        <div style={{ fontFamily:MONO, fontSize:8, color:T3, letterSpacing:"0.10em" }}>V1.0 · MADE WITH INTENTION</div>
      </div>
    </div>
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

  const screenBg: Partial<Record<Screen,string>> = {
    home:BG_HOME, contexts:BG_CONTEXTS, insights:BG_INSIGHTS, profile:BG_PROFILE,
    add:BG_FLOW, "your-price":BG_FLOW, why:BG_FLOW, reflection:BG_FLOW,
    urgency:BG_FLOW, "desire-urgency":BG_FLOW, decision:BG_HOME, "card-detail":"#FFF",
  }

  return (
    <AppShell bg={screenBg[screen]||BG_HOME}>
      <div key={screen} style={{ flex:1, display:"flex", flexDirection:"column", minHeight:0, overflow:"hidden" }}>
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
