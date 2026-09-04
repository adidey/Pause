# WORTH IT?
## Product Requirements Document + Google Stitch MVP Prompt

### Working tagline
**Know what it costs. Know what it means to you.**

---

# 1. Product Vision

**WORTH IT?** is a personal purchase-decision app that helps users understand the *real personal cost* of things they want to buy.

It is not a budgeting app.

It does not tell users how to manage their entire finances.

Instead, it sits at the exact moment between:

**“I want this.”**

and

**“Should I actually buy this?”**

The app transforms a price into meaningful comparisons based on the user's own life:

> **$375**

could become:

> **1.9 weeks of your spending money**  
> **15 hours of work**  
> **25 burgers**  
> **2.3 weeks of your hobby budget**

The user can then save the purchase as a visual card and watch their desire evolve over time.

---

# 2. Core Product Philosophy

### The app doesn't say “don't buy it.”

It says:

> **“Understand what you're choosing.”**

A purchase can be completely unnecessary and still be worth it.

A purchase can also be affordable and still not be worth it.

The product therefore focuses on:

**Cost → Context → Desire → Time → Decision**

---

# 3. Target User

Primary users:

- 18–30 year olds
- students and young professionals
- people with discretionary spending
- online shoppers
- people interested in intentional spending
- people who frequently experience impulse purchases
- people saving for larger goals

Typical situation:

> User sees a camera on Facebook Marketplace for $375.

Instead of immediately buying it, they open WORTH IT?

They enter:

**Fujifilm X-A20**

**$375**

The app translates it into their personal context.

---

# 4. Core User Journey

### DISCOVER

User sees something they want.

↓

### CAPTURE

Adds the item to WORTH IT?

↓

### TRANSLATE

The app turns the price into personally meaningful units.

↓

### REFLECT

The user answers a few questions.

↓

### SAVE

The purchase becomes a card in their Wants dashboard.

↓

### WAIT

Time passes.

↓

### DECIDE

**BUY · WAIT · SKIP**

↓

### LEARN

The app remembers the decision and gradually learns the user's spending patterns.

---

# 5. Onboarding

The onboarding should take less than 2 minutes.

## Step 1 — What do you call your money?

Options:

**Allowance**

**Salary**

**Casual income**

**Mixed**

**Other**

---

## Step 2 — How often do you receive it?

**Weekly**

**Fortnightly**

**Monthly**

---

## Step 3 — How much do you usually have available?

Example:

**$400 / fortnight**

Important:

Call this **available spending money**, not income.

This prevents the app from treating someone's gross salary as money they can freely spend.

---

## Step 4 — Optional hourly rate

> **Want to see purchases as time?**

Example:

**$25/hour**

Then:

$375 → **15 hours of work**

This feature can be skipped.

---

# 6. Personal Comparison System

This is one of the product's defining features.

Users select the things they naturally understand money through.

### Everyday

🍔 Meals  
☕ Coffees  
🛒 Groceries  
🎬 Movies

### Lifestyle

💇 Haircuts  
👕 Clothes  
🏋️ Gym sessions  
🍽 Restaurant meals

### Entertainment

🎮 Games  
🎵 Concerts  
🎬 Cinema  
📺 Streaming

### Transport

⛽ Petrol  
🚆 Public transport  
🚕 Rideshare

### Travel

🏨 Hotel nights  
✈️ Flights  
🎒 Hostel nights

Users can select as many comparison categories as they want.

---

# 7. Personal Comparison Cards

For every purchase, show a compact set of meaningful conversions.

Example:

## FUJIFILM X-A20

**$375**

### In your world

**1.9 weeks**
of spending money

**15 hours**
of work

**25**
burgers

**2.5 months**
of hobby spending

The user can tap any comparison to see how it was calculated.

---

# 8. Comparison Library

The app includes an internal library of common reference items.

Each item contains:

- item name
- category
- current reference price
- currency
- location/market
- source
- date last updated
- user override

Example:

**Burger**

Category: Food

Reference price: $15

Market: Australia

Updated: Today

---

# 9. Real-Time Pricing

The long-term product should support regularly updated reference prices.

Architecture:

**Reference item**
→ **price**
→ **source**
→ **market**
→ **last updated**

The app should never imply that a reference price is permanently accurate.

For MVP:

- use a curated reference library
- allow manual price editing
- clearly show when prices were last updated

Future versions can introduce automated live pricing.

---

# 10. Custom Comparisons

Users can create their own units.

Example:

> **My usual biryani**

Price:

**$15**

Now:

**$375 = 25 biryanis**

Other examples:

> “My weekly groceries”

> “One night out”

> “My train pass”

> “My guitar lesson”

This makes the comparison system genuinely personal.

---

# 11. WANT CARD

Every item the user adds becomes a visual card.

Example:

### FUJIFILM X-A20

**$375**

WAITING · 4 DAYS

**1.9 weeks spending money**

**15 hours work**

**25 burgers**

Context:

**HOBBIES**

The card should visually resemble a beautiful physical object.

---

# 12. WANTS DASHBOARD

This is the primary dashboard.

Inspired by the layered card-stack interaction from the reference image.

Cards overlap vertically.

Example:

**FUJIFILM X-A20**  
$375  
WAITING · 4 DAYS

↓

**SONY HEADPHONES**  
$499  
THINKING · 2 DAYS

↓

**NIKE SHOES**  
$160  
WANT · 12 DAYS

↓

**KEYBOARD**  
$180  
SKIPPED

Users can swipe through the stack.

The dashboard should feel like:

> **a wallet full of things you want**

rather than a spreadsheet.

---

# 13. Card States

Each want moves through a simple lifecycle.

### NEW

Just added.

### THINKING

User is considering it.

### WAITING

User has chosen to wait.

### DECIDED

User has made a decision.

### BOUGHT

Purchase happened.

### SKIPPED

User decided against it.

The card should subtly change as it moves through these states.

---

# 14. Time as a Product Mechanic

Time is central to the experience.

When a user adds something:

**DAY 1**

> “You want it.”

After several days:

**DAY 5**

> “Still thinking about it?”

After 7 days:

**DAY 7**

> “Still worth it?”

This creates a natural cooling-off period.

The app should not shame users for buying something quickly.

---

# 15. Reflection Engine

Before a purchase is classified as WAIT or SKIP, ask lightweight questions.

### Question 1

**What do you want this for?**

Options:

- I need it
- Replace something
- Upgrade
- Convenience
- Hobby
- Fun
- Social pressure
- Sale
- I don't know

---

### Question 2

**Do you already own something that does this?**

**YES**

**KIND OF**

**NO**

---

### Question 3

**How often will you realistically use it?**

**Every day**

**Every week**

**Sometimes**

**Probably rarely**

---

### Question 4

**If you couldn't buy it today, would you still want it next week?**

**Definitely**

**Maybe**

**Probably not**

---

# 16. Decision Score

Do not present this as a rigid financial score.

Instead, internally evaluate signals such as:

- affordability
- frequency of use
- existing alternative
- strength of desire
- waiting time
- stated purpose
- urgency

Then produce a simple recommendation:

### BUY

**This looks intentional.**

### WAIT

**Give it some time.**

### SKIP

**You probably don't need this one.**

The user can always override the recommendation.

---

# 17. Optional Urgency System

Urgency is an **optional feature**.

The purpose is not to manufacture FOMO.

It is to distinguish genuine deadlines from emotional urgency.

When adding an item, users can optionally select:

### Does this actually have a deadline?

**No deadline**

**Sale ends**

**Event/trip**

**Replacement needed**

**Limited availability**

**Custom date**

---

# 18. Urgency Indicator

If the user enters a genuine deadline, the card can display:

### URGENCY

**3 DAYS LEFT**

or

**SALE ENDS FRIDAY**

The visual treatment should be subtle.

Never use fake scarcity.

Never tell the user something is “limited” unless the user provides that information or it comes from a verified source.

---

# 19. “Urgency Token” Concept

Optional experimental mechanic:

Users receive a small number of **Urgency Tokens**.

A token means:

> **“I believe this decision genuinely needs attention.”**

Example:

The user has 3 tokens.

They can assign one to:

**Camera**

**Urgency: 1**

The card receives a small visual marker.

The purpose is to prevent every purchase from feeling urgent.

If everything is urgent:

**nothing is urgent.**

The token system should therefore be intentionally limited.

Possible MVP implementation:

**3 tokens per month**

Users can spend one on an item.

Tokens replenish automatically.

---

# 20. Urgency vs Desire

This should become a distinctive insight.

The app can ask:

### How badly do you want it?

**1 — barely**

to

**10 — really want it**

Then separately:

### How urgently do you need to decide?

**1 — whenever**

to

**10 — genuinely time-sensitive**

This creates four interesting situations:

### High desire + low urgency

**WAIT.**

You really want it, but there's no reason to rush.

### High desire + high urgency

**DECIDE.**

There may be a legitimate reason to act.

### Low desire + high urgency

**PAUSE.**

This may be FOMO.

### Low desire + low urgency

**SKIP.**

This probably isn't important.

This could be one of the app's most valuable psychological features.

---

# 21. Urgency Warning

If the user marks something as highly urgent but provides no real deadline:

> **Feels urgent. But is it?**

Then:

**“What happens if you wait 7 days?”**

This is intentionally reflective rather than restrictive.

---

# 22. Contexts

Use the spatial visual language from the first reference.

Instead of folders, contexts appear as floating areas.

Examples:

**HOME**

**HOBBIES**

**FITNESS**

**TRAVEL**

**STUDY**

**WORK**

**PERSONAL**

The user can move cards between contexts.

The interface should resemble a map of thoughts.

---

# 23. Spending Dashboard

Keep financial information secondary.

Show:

**THIS MONTH**

$1,240

considered

$620

bought

$620

skipped

Then:

**Potential spending avoided**

$620

This is not “money saved” because the user may never have spent it.

Use accurate language.

---

# 24. Personal Insights

Once enough history exists, surface simple patterns.

Examples:

> **You usually stop wanting things after 6 days.**

> **Electronics make up most of your current wants.**

> **You've skipped 5 purchases after waiting more than a week.**

> **Your average considered purchase is $184.**

These should feel like observations, not financial advice.

---

# 25. Musings

Users can attach a private note to any purchase.

Example:

> “I think I mostly want this because I like the idea of owning a camera.”

The app stores these notes with the card.

Over time, these become a personal record of buying impulses.

---

# 26. Home Screen

The home screen should be extremely minimal.

Large heading:

**WORTH IT?**

Supporting line:

**Pause before you buy.**

Primary CTA:

**+ Add a want**

Below:

**You have 6 things on your mind.**

Then show a small preview of the current card stack.

---

# 27. Main Navigation

Use four destinations:

### WANTS

The card stack.

### ADD

Quickly capture a purchase.

### CONTEXTS

Spatial categories.

### PROFILE

Personal spending context, comparisons and insights.

---

# 28. Profile

Display:

**AVAILABLE SPENDING**

$400 / fortnight

**HOURLY RATE**

$25 / hour

**COMPARISONS**

🍔 Burgers  
☕ Coffee  
🎬 Movies  
✈️ Travel

**URGENCY TOKENS**

3 available

Allow all settings to be edited.

---

# 29. MVP Scope

### MUST HAVE

- onboarding
- available spending amount
- optional hourly wage
- add purchase
- purchase price
- personal price conversions
- comparison library
- custom comparison
- card stack
- purchase states
- reflection questions
- BUY / WAIT / SKIP
- waiting timer
- contexts
- basic history

### SHOULD HAVE

- urgency/deadline
- urgency indicator
- simple statistics
- custom notes
- custom comparisons

### LATER

- automated real-time reference pricing
- intelligent spending pattern analysis
- receipt scanning
- browser/share-sheet capture
- AI reflection
- price-drop monitoring
- marketplace integration
- bank integration
- spending goals
- social features

---

# 30. What NOT to Build

Do not turn this into:

- Mint
- YNAB
- Apple Wallet
- a banking app
- a shopping app
- an investment platform
- a coupon app
- a social network

The product should remain focused on:

> **Understanding a want before turning it into a purchase.**

---

# 31. Success Metrics

Primary:

**% of added wants that reach a deliberate decision**

Secondary:

- reflection completion
- 7-day return rate
- WAIT → SKIP conversion
- WAIT → BUY conversion
- average days before decision
- number of wants added
- percentage of users creating custom comparisons
- percentage using personal price conversions

The most important signal:

> **Do users actually pause before purchasing?**

---

# 32. Visual Identity

The app should combine the two supplied visual references.

### Reference 1

Use for:

- contexts
- reflection
- musings
- ambient visual language
- soft colour fields
- spatial organisation

### Reference 2

Use for:

- wants dashboard
- layered card stack
- tactile interaction
- large typography
- visual hierarchy

The final product should feel like:

**a private journal + a physical wallet of desires + a personal price translator.**

---

# 33. Google Stitch Prompt

Design a high-fidelity iOS mobile app called **“WORTH IT?”**

The app helps users decide whether purchases are worth the personal cost.

This is NOT a budgeting app and NOT a banking app.

The central experience is:

**ADD A WANT → UNDERSTAND THE COST → REFLECT → WAIT → DECIDE**

Use the two supplied visual references as design inspiration.

Combine the first reference's soft, spatial, editorial interface with the second reference's tactile layered card-stack interface.

The product should feel premium, calm, intelligent, personal and slightly experimental.

---

## SCREEN 1 — ONBOARDING

Create a beautiful minimal onboarding flow.

Ask:

**How do you usually receive money?**

Allowance / Salary / Casual / Mixed

Then:

**How much do you usually have available to spend?**

Example:

**$400 / fortnight**

Then optionally:

**What is your hourly rate?**

Example:

**$25 / hour**

Explain:

**We'll translate prices into time and spending power.**

Then:

**What comparisons make money feel real to you?**

Selectable chips:

🍔 Meals  
☕ Coffee  
🛒 Groceries  
🎬 Movies  
🎮 Games  
⛽ Petrol  
👕 Clothes  
✈️ Travel

Allow:

**+ Create your own**

---

# SCREEN 2 — HOME / WANTS

Create a visually striking home dashboard.

Warm cream/off-white background.

Large editorial typography:

**WORTH IT?**

Small subtitle:

**Pause before you buy.**

Primary button:

**+ Add a want**

Below:

**6 things on your mind**

Display the user's purchases as overlapping cards.

Cards should look tactile and physical, inspired by the supplied card-stack reference.

---

# SCREEN 3 — ADD WANT

Large heading:

**What do you want?**

Input:

**Fujifilm X-A20**

Price:

**$375**

Context:

**HOBBIES**

Optional image placeholder.

CTA:

**See what it costs**

---

# SCREEN 4 — YOUR PRICE

This is one of the most important screens.

Display:

**FUJIFILM X-A20**

**$375**

Then large visual comparisons:

**1.9 weeks**

of your spending money

**15 hours**

of work

**25**

burgers

**2.5 months**

of hobby spending

Use large typography and generous whitespace.

Each comparison should feel like a visual object rather than a spreadsheet row.

CTA:

**Think about it**

---

# SCREEN 5 — WHY DO YOU WANT IT?

Large heading:

**Why do you want it?**

Large rounded selection cards:

**I need it**

**Replace something**

**Upgrade**

**Hobby**

**Convenience**

**Fun**

**Sale**

**Social pressure**

**I don't know**

Allow one or multiple selections.

---

# SCREEN 6 — REFLECTION

Create a private journal-like screen.

Question:

**Do you already own something that does this?**

YES / KIND OF / NO

Then:

**How often will you realistically use it?**

EVERY DAY / EVERY WEEK / SOMETIMES / RARELY

Then:

**If you couldn't buy it today, would you still want it next week?**

DEFINITELY / MAYBE / PROBABLY NOT

Use progressive disclosure rather than showing a huge form.

---

# SCREEN 7 — URGENCY

Create an optional screen.

Heading:

**Does this actually have a deadline?**

Options:

**No deadline**

**Sale ends**

**Trip / event**

**Replacement needed**

**Limited availability**

**Custom date**

If no deadline is selected, show:

**No rush. That's useful to know.**

If a deadline is selected, allow the user to specify the date.

Do not manufacture scarcity.

---

# SCREEN 8 — URGENCY / DESIRE

Create a simple two-axis visual.

**How badly do you want it?**

1 → 10

**How urgently do you need to decide?**

1 → 10

Display the two values as a subtle visual map.

Example:

**DESIRE 9**

**URGENCY 2**

Then:

**You really want it.  
But you don't need to rush.**

CTA:

**Wait 7 days**

This screen should feel insightful rather than judgmental.

---

# SCREEN 9 — DECISION

Create a premium decision screen.

Example:

**WAIT**

Large typography.

Underneath:

**You want it. But nothing is forcing you to decide today.**

Then show:

$375

**1.9 weeks spending money**

**15 hours work**

**25 burgers**

Primary CTA:

**Wait 7 days**

Secondary:

**Buy anyway**

Third:

**Skip it**

---

# SCREEN 10 — WANTS CARD STACK

Create the signature dashboard.

Show a deep layered stack of purchase cards.

Front card:

**FUJIFILM X-A20**

$375

**WAITING · 4 DAYS**

25 🍔

15 hrs

1.9 weeks

Behind it:

**SONY HEADPHONES**

$499

**THINKING · 2 DAYS**

Behind that:

**NIKE SHOES**

$160

**SKIPPED**

Behind that:

**KEYBOARD**

$180

**BOUGHT**

Cards should overlap and have subtle depth.

Allow horizontal/vertical swipe interactions.

Make this screen visually memorable.

---

# SCREEN 11 — CARD DETAIL

When opening a card, show:

**FUJIFILM X-A20**

$375

**WAITING · DAY 4**

Personal cost:

15 hours work  
1.9 weeks spending  
25 burgers

Context:

**HOBBIES**

Desire:

**9 / 10**

Urgency:

**2 / 10**

Reflection:

> “I already have a phone that takes decent photos, but I want something more intentional.”

Buttons:

**BUY**

**KEEP WAITING**

**SKIP**

---

# SCREEN 12 — CONTEXTS

Use the visual language from the first reference.

Title:

**Contexts**

Place softly blurred colour fields around the screen.

Labels:

**HOBBIES**

**HOME**

**FITNESS**

**TRAVEL**

**STUDY**

**WORK**

**PERSONAL**

Purchase cards float within these areas.

Avoid a conventional folder/grid design.

It should look like a visual map of the user's thoughts.

---

# SCREEN 13 — INSIGHTS

Title:

**Your spending, lately**

Show understated statistics:

**23**

wants considered

**8**

skipped

**$1,240**

potential spending avoided

**6.4 days**

average decision time

Then insight cards:

**You usually stop wanting something after about a week.**

**Electronics are currently your biggest category.**

Keep this calm and observational.

---

# SCREEN 14 — PROFILE

Show:

**AVAILABLE SPENDING**

$400 / fortnight

**HOURLY RATE**

$25 / hour

**YOUR COMPARISONS**

🍔 Meals  
☕ Coffee  
🎬 Movies  
✈️ Travel

**URGENCY TOKENS**

3 available

Allow editing.

---

# DESIGN SYSTEM

Use:

- warm cream background
- dark charcoal typography
- soft orange
- yellow
- blue
- lavender
- green
- subtle blur
- large modern sans-serif typography
- small uppercase labels
- generous whitespace
- rounded cards
- tactile shadows
- layered card depth
- subtle animations
- smooth transitions
- iOS-native interaction patterns

Avoid:

- traditional finance dashboards
- red/green financial UI
- excessive graphs
- dense tables
- generic SaaS cards
- aggressive notifications
- gamified spending scores
- fake scarcity
- excessive icons

---

# INTERACTION PRINCIPLES

The app should feel:

**calm before purchase**

**curious during reflection**

**satisfying when saving a want**

**quietly intelligent over time**

The user should never feel punished for buying something.

The app is not a financial authority.

It is a mirror.

---

# MVP PROTOTYPE JOURNEY

Prioritize this complete flow:

**ONBOARDING**

↓

**HOME**

↓

**ADD FUJIFILM X-A20 — $375**

↓

**YOUR PRICE**

↓

**WHY**

↓

**REFLECTION**

↓

**DESIRE + URGENCY**

↓

**WAIT**

↓

**WANT CARD**

↓

**CARD STACK**

Make this journey extremely polished before adding secondary screens.

The most important visual moment is the transformation:

**$375**

into

**15 hours of your life**

**1.9 weeks of spending money**

**25 burgers**

followed by:

**“Do you still want it?”**

The final prototype should communicate the product within five seconds:

> **WORTH IT? helps me understand what a purchase actually costs me before I buy it.**