export type Period = "weekly" | "fortnightly" | "monthly"

export type WantState = "new" | "thinking" | "waiting" | "bought" | "skipped"

export type CompKey =
  | "burger"
  | "coffee"
  | "groceries"
  | "movie"
  | "game"
  | "petrol"
  | "clothes"
  | "flight"
  | "gym"
  | "concert"
  | "rideshare"
  | "haircut"
  | "restaurant"
  | "streaming"
  | "transit"
  | "hostel"

export interface CustomComp {
  id: string
  label: string
  emoji: string
  price: number
}

export interface UserProfile {
  moneyType: string
  period: Period
  amount: number
  hourlyRate?: number
  currency: string
  comparisons: CompKey[]
  customComps: CustomComp[]
  customContexts: string[]
  showComparisons: boolean
  remindPause: boolean
  weeklySummary: boolean
  aboutMe?: string
}

export interface Want {
  id: string
  name: string
  price: number
  context: string
  state: WantState
  addedAt: Date
  desire?: number
  urgency?: number
  reasons?: string[]
  hasAlternative?: "yes" | "kind-of" | "no"
  useFrequency?: "daily" | "weekly" | "sometimes" | "rarely"
  stillWant?: "definitely" | "maybe" | "probably-not"
  deadline?: string
  note?: string
}

export const REASONS = [
  "Makes life easier",
  "Upgrade existing",
  "Treat myself",
  "Work & productivity",
  "Fitness & health",
  "Social / event",
  "Saw online",
  "Long-term goal",
]

export const DEADLINES = ["No rush", "This week", "This month", "Special event", "Limited sale"]

export const COMPS: Record<
  CompKey,
  { label: string; sublabel: string; emoji: string; price: number; category: string; color: string }
> = {
  burger: { label: "burgers", sublabel: "fav place", emoji: "🍔", price: 15, category: "Everyday", color: "#E8824A" },
  coffee: { label: "coffees", sublabel: "specialty latte", emoji: "☕", price: 6, category: "Everyday", color: "#7B4A22" },
  groceries: { label: "grocery runs", sublabel: "weekly shop", emoji: "🛒", price: 120, category: "Everyday", color: "#4CAF50" },
  movie: { label: "cinema tickets", sublabel: "incl. snacks", emoji: "🎬", price: 22, category: "Everyday", color: "#7B52D4" },
  haircut: { label: "haircuts", sublabel: "incl. tip", emoji: "💇", price: 45, category: "Lifestyle", color: "#E05090" },
  clothes: { label: "outfits", sublabel: "mid-range", emoji: "👕", price: 60, category: "Lifestyle", color: "#2196F3" },
  gym: { label: "gym sessions", sublabel: "per session", emoji: "🏋️", price: 20, category: "Lifestyle", color: "#00BCD4" },
  restaurant: { label: "dinners out", sublabel: "sit-down meal", emoji: "🍽️", price: 55, category: "Lifestyle", color: "#E85030" },
  game: { label: "games", sublabel: "new release", emoji: "🎮", price: 79, category: "Entertainment", color: "#6A3AB0" },
  concert: { label: "concerts", sublabel: "floor ticket", emoji: "🎵", price: 120, category: "Entertainment", color: "#C0185A" },
  streaming: { label: "streaming months", sublabel: "premium plan", emoji: "📺", price: 17, category: "Entertainment", color: "#3F51B5" },
  petrol: { label: "tank fills", sublabel: "full tank", emoji: "⛽", price: 80, category: "Transport", color: "#607D8B" },
  transit: { label: "weekly transit", sublabel: "public transport", emoji: "🚆", price: 45, category: "Transport", color: "#00ACC1" },
  rideshare: { label: "rideshares", sublabel: "avg trip", emoji: "🚕", price: 25, category: "Transport", color: "#E0A000" },
  flight: { label: "short flights", sublabel: "domestic return", emoji: "✈️", price: 300, category: "Travel", color: "#1565C0" },
  hostel: { label: "hostel nights", sublabel: "private room", emoji: "🎒", price: 50, category: "Travel", color: "#2E7D32" },
}

export const CONTEXTS = ["Hobbies", "Home", "Fitness", "Travel", "Work", "Personal"]

export const CTX_BLOB: Record<string, { fill: string; emoji: string }> = {
  Hobbies: { fill: "#F8D4BE", emoji: "🎮" },
  Home: { fill: "#FEF0CC", emoji: "🏠" },
  Fitness: { fill: "#D0EADF", emoji: "👟" },
  Travel: { fill: "#D4ECFD", emoji: "✈️" },
  Work: { fill: "#DCD6F7", emoji: "💼" },
  Personal: { fill: "#E4F7D8", emoji: "🌿" },
}

export function getComps(price: number, profile: UserProfile) {
  const keys = profile.comparisons.length > 0 ? profile.comparisons : (["burger", "coffee", "flight", "movie"] as CompKey[])
  const list = keys
    .map((k) => {
      const c = COMPS[k]
      if (!c) return null
      const qty = Math.max(1, Math.round(price / c.price))
      return { ...c, qty, key: k }
    })
    .filter(Boolean) as (typeof COMPS[CompKey] & { qty: number; key: string })[]

  const custom = (profile.customComps ?? []).map((c) => ({
    label: c.label,
    sublabel: "custom",
    emoji: c.emoji,
    price: c.price,
    category: "Custom",
    color: "#666",
    qty: Math.max(1, Math.round(price / c.price)),
    key: c.id,
  }))

  return [...list, ...custom]
}

export function getChips(price: number, profile: UserProfile) {
  const chips: { emoji: string; value: string; label: string }[] = []
  const comps = getComps(price, profile)
  if (comps[1]) chips.push({ emoji: comps[1].emoji, value: `${comps[1].qty}`, label: comps[1].label })
  if (comps[3]) chips.push({ emoji: comps[3].emoji, value: `${comps[3].qty}`, label: comps[3].label })
  if (comps[0]) chips.push({ emoji: comps[0].emoji, value: `${comps[0].qty}`, label: comps[0].label })
  return chips
}
