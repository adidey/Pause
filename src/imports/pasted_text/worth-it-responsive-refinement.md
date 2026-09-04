# WORTH IT? — RESPONSIVE SPACING + INSIGHTS + PROFILE REHAUL

## IMPORTANT

This is a structural and responsive refinement of the existing WORTH IT? app.

DO NOT redesign the entire app.
DO NOT introduce a new visual language.
DO NOT change the core typography, gradients, card language, navigation concept, or overall personality.

Preserve the current aesthetic:
- editorial
- minimal
- soft pastel
- slightly playful
- premium
- generous whitespace
- bold black typography
- subtle pastel gradients
- rounded cards
- restrained use of colour
- monospaced eyebrow labels

The purpose of this edit is to make the UI feel like ONE professionally designed responsive product rather than individually designed screens.

---

# 1. GLOBAL RESPONSIVE PADDING SYSTEM

The biggest priority is fixing inconsistent spacing between screens.

Every screen must use the SAME responsive layout system.

## Safe-area / Dynamic Island

Never position content directly underneath or too close to the Dynamic Island / notch.

Create a proper top safe-area system.

The first meaningful UI element on every screen should have comfortable clearance from the Dynamic Island.

Do NOT solve this by simply adding a huge fixed top margin.

Use responsive safe-area-aware spacing.

Conceptually:

SAFE AREA
↓
TOP CONTENT PADDING
↓
EYEBROW / HEADER
↓
TITLE
↓
SUBTITLE / CONTENT

The header position should remain visually consistent across different iPhone sizes.

---

# 2. GLOBAL HORIZONTAL PADDING

All major screens should share the same horizontal content alignment.

Use a consistent horizontal margin system rather than manually positioning each screen.

Target:

- approximately 24px horizontal padding on standard mobile widths
- approximately 20–24px minimum on narrower screens
- never allow text or cards to touch the screen edge
- cards should align with the primary page heading
- headings, subtitles and primary content should share the same left edge

The homepage, Contexts, Insights and Profile must feel like they belong to the same grid.

DO NOT allow:

Homepage heading → one left edge
Contexts heading → different left edge
Insights heading → different left edge
Profile heading → different left edge

They should all snap to the same content grid.

---

# 3. RESPONSIVE WIDTH BEHAVIOUR

Do not hard-code the current screen dimensions.

Components must respond naturally to:

- smaller iPhones
- larger iPhones
- different aspect ratios
- Dynamic Island / notch variations
- accessibility text scaling
- longer text
- larger numbers
- different content quantities

Cards should use:

width: 100% of available content area

rather than fixed pixel widths.

Use:

max-width where appropriate
min-width only where necessary
flexible internal spacing
flex-wrap for metadata
intrinsic text sizing

Nothing should overlap when content becomes longer.

---

# 4. TYPOGRAPHIC RESPONSIVENESS

Preserve the current typography.

However, make typography responsive.

Large editorial headlines such as:

"PAUSE."
"Your spending, lately."
"Profile"
"Contexts"

should scale down gracefully on smaller screens.

Never allow:
- clipping
- awkward line breaks
- text touching the Dynamic Island
- buttons being pushed off-screen
- numbers overflowing cards

Use sensible maximum font sizes and responsive scaling.

The visual hierarchy should remain identical across devices.

---

# 5. NAVIGATION RESPONSIVENESS

Keep the existing bottom navigation concept.

The navbar must remain anchored to the bottom safe area.

It must NOT overlap page content.

Use:

bottom safe-area padding
+
navigation height
+
content bottom padding

so the final card/content item is never hidden underneath the navigation.

The central "+" button must remain optically centred regardless of screen width.

Navigation labels and icons should remain aligned consistently.

---

# 6. INSIGHTS PAGE — COMPLETE STRUCTURAL REWORK

The Insights page currently feels too colourful and too grid-like in the wrong way.

Rebuild it with a much clearer information hierarchy.

The page should feel like:

"an intelligent personal spending observation"

rather than:

"a financial analytics dashboard."

Keep the editorial personality.

---

## INSIGHTS COLOUR SYSTEM

Reduce the number of colours dramatically.

Use a restrained palette:

PRIMARY:
near-black

BACKGROUND:
very subtle warm lavender / off-white gradient

SECONDARY:
muted lavender

ACCENT:
ONE controlled accent colour

SUCCESS:
muted green only when genuinely necessary

WARNING:
muted amber only when genuinely necessary

Do NOT give every statistic its own colour.

Avoid rainbow analytics.

The current multiple purple / green / orange / grey combinations should be simplified.

Colour should communicate meaning, not decoration.

---

# 7. INSIGHTS PAGE HIERARCHY

Use this structure:

EYEBROW

Your spending,
lately.

Observations, not advice.


↓


## DECISION BEHAVIOUR

A single large horizontal card.

Example:

4
considered

3
waiting

1
skipped

0
bought


Then one restrained progress visualization.

Do not make each number a separate colourful tile.

The four states should be primarily typographic.

Use subtle accent colours only where necessary.


↓


## WHERE YOUR WANTS ARE

Replace the current overly colourful "BY CONTEXT" block with a clean ranked visualization.

Example:

WORK
██████████████████
$679

HOBBIES
██████████
$375

FITNESS
██████
$160

Use ONE accent colour for the bars.

The amount should be right-aligned.

The bar lengths should be proportional to spending/want value.

This should immediately communicate:

"Where does most of my desire go?"

without looking like a banking dashboard.


↓


## KEY NUMBERS

Use a clean 2-column responsive layout.

Card 1:
AVOIDED
$180
potential spending

Card 2:
DECISION TIME
20
days on average

Card 3:
AVG WANT
$304
per item considered

On narrow screens:
cards should automatically become one column.

Do not force a two-column layout if it causes cramped content.


↓


## OBSERVATIONS

Instead of multiple colourful cards, use calm editorial insight rows.

Example:

💼  Work is your biggest area of desire.

⌛  You tend to sit with purchases for 20 days before deciding.

These should feel like sentences extracted from the user's behaviour.

Minimal styling.
White / translucent cards.
Small icon.
Strong sentence.
No unnecessary graphs.


---

# 8. INSIGHTS GRID RULES

The current grid structure feels uneven.

Fix this completely.

Use a predictable spacing system:

8px base spacing unit.

Examples:

8
16
24
32
40
48

All cards should align to the same column grid.

No random card widths.

No visually orphaned cards.

No awkward empty spaces created by fixed-height cards.

Cards should use intrinsic height based on content.

The page should be able to grow vertically.

Scrolling should feel natural.

---

# 9. INSIGHTS RESPONSIVE BEHAVIOUR

On smaller phones:

- single-column cards
- reduced headline size
- tighter card padding
- bars remain readable
- numbers never wrap awkwardly
- observations become full-width
- navbar remains fixed
- content scrolls behind/above navbar correctly

On larger phones:

- maintain comfortable whitespace
- do NOT simply enlarge everything
- allow cards to breathe
- maintain the same visual hierarchy

---

# 10. PROFILE PAGE — MAKE IT FLEXIBLE

The Profile page should become a proper editable preferences / spending configuration page.

Do NOT treat the existing "$400 / fortnight" and "$25 / hr" cards as static visual cards.

They should behave like real editable components.

---

## PROFILE HEADER

Keep:

WORTH IT?

Profile

Edit

But make the Edit button functional in the design system.

Use a clear edit state.

When editing:

Profile fields transition into editable controls.

---

# 11. PROFILE — SPENDING AMOUNT

Create an editable spending component.

Example:

AVAILABLE SPENDING

$400
/ fortnight

The user should be able to change:

amount
currency
frequency

Frequency options:

Weekly
Fortnightly
Monthly
Custom

The visual presentation should automatically update.

Examples:

$200 / week
$400 / fortnight
$900 / month

Do not hard-code "fortnightly."

---

# 12. PROFILE — HOURLY RATE

Hourly rate should be OPTIONAL.

If the user provides it:

$25 / hr

If they don't:

Hourly comparison is disabled.

The UI should gracefully handle:

No hourly rate set

rather than displaying fake or empty data.

Allow:

Enable hourly comparison
+
Set hourly rate

This should affect the "hours of your life" calculation throughout the app.

---

# 13. PROFILE — COMPARISON SYSTEM

Make "My comparisons" flexible.

Users should be able to:

- add a comparison
- remove a comparison
- reorder comparisons
- edit a comparison
- choose from suggested comparison objects
- optionally create a custom comparison

Examples:

🍔 burgers
☕ coffees
✈️ short flights
🎬 cinema tickets

The profile should not assume exactly four comparison items.

The layout must support:

1 item
2 items
3 items
4 items
5+ items

Use wrapping chips or a responsive list.

---

# 14. PROFILE — CUSTOM COMPARISON

Allow a user to create:

CUSTOM COMPARISON

Name:
"Protein shakes"

Price:
$8

Icon:
optional

The app can then translate wants into that comparison.

Example:

$375

≈ 47 protein shakes

This should be reflected dynamically throughout the app.

---

# 15. PROFILE — FLEXIBLE CURRENCY

Currency should be editable.

Default based on locale if available.

Allow manual selection.

Examples:

AUD
USD
GBP
EUR

The entire app should use the selected currency consistently.

Do not hard-code "$" into components.

---

# 16. PROFILE — EMPTY STATES

Design proper empty states.

If there is no hourly rate:

HOURLY RATE
Not set

Add hourly rate

If there are no comparisons:

MY COMPARISONS

Add something you naturally think in.

[ + Add comparison ]

If there is no spending amount:

AVAILABLE SPENDING

Set your spending amount

These should look intentional, not like missing data.

---

# 17. PROFILE — EDITING EXPERIENCE

Editing should feel lightweight.

Prefer:

tap card
→ card becomes editable

rather than navigating through many separate screens.

Use:

inline editing
bottom sheets
segmented controls
steppers where appropriate

Avoid excessive forms.

The app should feel calm and approachable.

---

# 18. COMPONENT SYSTEM

Create reusable components for:

PageHeader
EyebrowLabel
PrimaryButton
SecondaryButton
StatCard
InsightCard
ComparisonChip
ContextBar
EditableValueCard
BottomNavigation
FloatingAddButton

Every component should use the same spacing tokens.

Do not manually recreate the same component differently on every page.

---

# 19. SPACING TOKENS

Establish a global spacing system:

XS = 8
SM = 12
MD = 16
LG = 24
XL = 32
XXL = 40
XXXL = 48

Use these consistently.

Page horizontal padding:
24px

Page top content spacing:
responsive safe-area + approximately 24–32px

Card internal padding:
24px

Section spacing:
32–40px

Do not introduce arbitrary values unless required for visual alignment.

---

# 20. FINAL QUALITY CHECK

Before finishing the redesign, inspect every screen at:

- small iPhone
- standard iPhone
- large iPhone

Check specifically:

✓ Dynamic Island clearance
✓ top padding consistency
✓ left/right alignment
✓ headline wrapping
✓ card widths
✓ card heights
✓ bottom navigation clearance
✓ floating "+" positioning
✓ long numbers
✓ long item names
✓ long comparison names
✓ empty states
✓ profile editing states
✓ one-column responsive behaviour
✓ scrolling behaviour

Most importantly:

THE APP MUST FEEL LIKE ONE DESIGN SYSTEM.

The homepage, Contexts, Insights, Profile and onboarding must share the same:

- left alignment
- typography
- spacing
- navigation
- card geometry
- corner radius
- gradient philosophy
- icon language
- interaction language

Do not optimise each screen independently.

Optimise the system first.