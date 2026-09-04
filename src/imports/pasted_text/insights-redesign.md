# INSIGHTS PAGE — COMPLETE REDESIGN

## Core Direction

Completely redesign the Insights page from the current analytics/dashboard layout.

The current version feels like a conventional finance app:
- too many charts
- too many colours
- excessive boxes
- repetitive horizontal bars
- weak visual hierarchy
- information feels calculated rather than designed

DO NOT iterate on the existing graph-based layout.

Instead, create a premium editorial / bento-style Insights experience inspired by modern financial/product design systems.

The attached visual references establish the direction:
- large rounded rectangular cards
- strong black / off-white foundations
- restrained accent colour
- oversized typography
- graphic compositions inside cards
- asymmetric bento layout
- visual storytelling instead of conventional dashboards
- each card should feel like a designed object

The page should feel like:
"Your spending behaviour, turned into visual objects."

Not:
"Your banking analytics dashboard."

---

# 1. PAGE STRUCTURE

Use the same global responsive page padding as every other page.

Do NOT place the logo anywhere on this page.

Do NOT put "Worth It?" in the top navigation/header.

Header:

Small eyebrow:
"YOUR PATTERNS"

Large heading:
"Your spending,
lately."

Supporting text:
"Observations, not advice."

The heading must align EXACTLY with the left edge used by the Wants, Contexts and Profile pages.

Respect the device safe area / Dynamic Island.

Never allow the heading or any content to collide with the notch.

Use:

safe-area-inset-top
+
consistent design-system top padding.

The page itself should scroll vertically.

---

# 2. VISUAL SYSTEM

Reduce the entire page to an extremely restrained palette.

PRIMARY:
- near-black #0B0B10
- warm white / off-white
- very pale lavender/blue background

ACCENT:
Use ONE primary accent only.

Preferred accent:
muted electric violet / indigo.

Optional secondary neutral:
soft grey.

DO NOT use separate green, orange, blue, purple and red colours for different metrics.

Status colours should not dominate the page.

The interface should look approximately 85–90% monochrome with a single controlled accent.

---

# 3. BENTO INSIGHT SYSTEM

Replace the existing chart cards with large visual insight cards.

Use a responsive CSS grid.

Desktop/tablet:
2-column bento grid.

Mobile:
1-column layout with occasional full-width cards.

Cards should NOT all have the same dimensions.

Use intentional variations:

- small square
- medium rectangle
- large horizontal feature card
- occasional full-width card

The composition should feel editorial and designed.

Example:

┌───────────────┬───────────────┐
│   DECISION    │   BIGGEST     │
│   BEHAVIOUR   │    WANT       │
│               │               │
├───────────────┴───────────────┤
│       YOUR MONEY BECAME...    │
│                               │
├───────────────┬───────────────┤
│   WAITING     │   AVOIDED     │
│   PATTERN     │   SPENDING    │
└───────────────┴───────────────┘

Do not force this exact arrangement.
Use the content and hierarchy to determine the composition.

---

# 4. FEATURE INSIGHT CARD

Create one dominant feature card.

Example:

"YOUR BIGGEST WANT"

WORK

$679

Use a large visual treatment rather than a graph.

For example:
- oversized typography
- abstract geometric form
- subtle gradient/noise
- small contextual label
- one understated accent line

The graphic should communicate scale and importance.

DO NOT use a bar chart.

The card should feel similar to a premium financial/product landing-page tile.

---

# 5. DECISION BEHAVIOUR CARD

Replace the current:

4 considered
3 waiting
1 skipped
0 bought

dashboard.

Instead create a visual composition:

DECISION BEHAVIOUR

4
considered

3
waiting

1
skipped

0
bought

Use typography and spatial hierarchy.

Example:

4
CONSIDERED

        3
        WAITING

                1
                SKIPPED

The numbers can be positioned spatially inside the card.

A thin visual progression element may be used, but NOT a conventional progress bar.

The card should communicate:
"Most of your spending is still in consideration."

---

# 6. MONEY TRANSLATION CARD

Create a graphic card around the user's comparison system.

Example:

$180

=
12
BURGERS

or

$180
POTENTIAL AVOIDED SPENDING

12 burgers

Use a large visual object or repeated miniature graphic forms.

The graphic should feel playful but premium.

Do NOT use emoji-heavy UI.

If comparison objects are used, render them as simple consistent illustrations/icons.

---

# 7. WAITING PATTERN CARD

Example:

"YOU WAIT."

20 DAYS

average decision time

Create a visual representation of time.

For example:
a large "20"
with a subtle timeline / orbit / circular progression.

Do not use a generic line graph.

The number should be the visual hero.

---

# 8. AVOIDED SPENDING CARD

Example:

$180

AVOIDED

potential spending

Use a large number with a subtle abstract graphic.

Possible graphic:

$180
────────────
still in your account

OR

$180
not spent yet

The visual should make the saving feel tangible.

---

# 9. CONTEXT CARD

Create a card showing the user's strongest spending context.

Example:

WORK

$679

2 WANTS

Use a large abstract background treatment associated with the context.

For example:
- subtle briefcase geometry
- architectural blocks
- simple line illustration
- abstract shape

Do NOT use emoji as the primary graphic.

The context card should look like a designed editorial tile.

---

# 10. SECONDARY INSIGHTS

Additional insights should automatically populate the bento grid.

Possible insights:

- Most expensive want
- Longest waiting item
- Most common context
- Most avoided spending
- Average want value
- Most repeated category
- Fastest decision
- Longest decision
- Spending translated into user's comparison objects

Only show insights that have meaningful data.

Never show empty cards.

If there are only 2–3 meaningful insights, use larger cards rather than filling the screen with placeholders.

---

# 11. GRAPHICS — CRITICAL

The biggest change:

DO NOT interpret "bento" as:

white card + text + graph.

That is NOT the desired design.

Each card should contain a visual composition.

Use:
- abstract shapes
- oversized numbers
- subtle gradients
- line illustrations
- geometric objects
- soft textures
- large typography
- simple iconography
- visual metaphors

The graphics should feel intentionally designed for Worth It?.

They should NOT look like generic Lucide icons dropped into cards.

Avoid:
- generic bar charts
- generic pie charts
- generic line charts
- dashboards
- colourful graphs
- excessive data visualisation
- rainbow gradients
- random decorative blobs

Think:
premium editorial finance app + modern bento design.

---

# 12. CARD STYLING

Cards:

border-radius: 28–32px

Use generous internal padding.

Avoid excessive borders.

Cards should primarily be differentiated through:
- background tone
- scale
- typography
- composition

Not outlines everywhere.

Some cards can be near-black.

Some can be warm white.

Some can use a very subtle accent-tinted background.

However, maintain a controlled visual system.

Example hierarchy:

BLACK FEATURE CARD
↓
OFF-WHITE DATA CARD
↓
PALE ACCENT CARD
↓
OFF-WHITE SECONDARY CARD

Do not make every card a different colour.

---

# 13. DARK FEATURE CARDS

Introduce 1–2 dark cards inspired by the supplied reference.

Dark card:

background:
#0B0B10

text:
off-white

accent:
single muted violet/indigo

Use oversized numbers.

Example:

YOUR MONEY
WAITED.

20
DAYS

average decision time

A subtle abstract graphic can occupy the empty space.

This creates the premium visual contrast missing from the current Insights page.

---

# 14. BENTO COMPOSITION

Do not make the grid symmetrical by default.

Use controlled asymmetry.

Example:

Large black card
+
small white card

then

wide visual card

then

two smaller cards

then

large editorial insight.

The layout should feel deliberately composed.

Cards should visually lock together through spacing.

Use a consistent gap:
16–20px.

Do not create huge gaps between cards.

---

# 15. RESPONSIVE BEHAVIOUR

The bento grid must adapt gracefully.

Mobile:

1 column.

Cards become full width.

Maintain hierarchy by varying height.

Do NOT simply shrink desktop cards.

Tablet:

2 columns.

Desktop:

2–3 columns depending on available width.

Cards should use CSS Grid rather than hardcoded absolute positioning.

Never allow horizontal overflow.

---

# 16. INSIGHT PRIORITY

The page should tell a story from top to bottom.

ORDER:

1. Hero statement
2. Biggest spending pattern
3. Decision behaviour
4. Money translation
5. Waiting behaviour
6. Avoided spending
7. Context pattern
8. Additional discovered insights

The user should understand their behaviour without reading a spreadsheet.

---

# 17. DATA LANGUAGE

Keep the tone observational.

GOOD:

"Work is where most of your wants live."

"You tend to wait before buying."

"$180 stayed unspent."

"Your average want is $304."

BAD:

"You are overspending."

"You should stop buying."

"You spend too much."

The app observes.

It does not judge.

---

# 18. REMOVE FROM CURRENT INSIGHTS PAGE

Completely remove:

- current Decision Behaviour horizontal dashboard
- current By Context bar chart
- coloured category bars
- multi-colour status system
- repetitive metric boxes
- tiny legends
- excessive graph UI
- generic chart components
- empty grid spaces
- rainbow colour coding

Do not preserve the existing visual structure.

Rebuild the page from scratch.

---

# 19. NAVIGATION

Use the same bottom navigation component as the rest of the app.

The active Insights icon should use the same icon family and stroke weight as:

Wants
Contexts
Profile

Do not introduce a different icon style on Insights.

Typography, spacing, icon sizing and active-state treatment must be identical across every page.

The central "+" action remains unchanged.

---

# 20. OVERALL SUCCESS CRITERIA

When finished, the Insights page should look like a premium visual board of personal spending observations.

It should NOT resemble:
- a banking dashboard
- an accounting app
- a spreadsheet
- a generic analytics page

It SHOULD resemble:
- a modern financial design system
- an editorial bento layout
- premium product/brand design
- large visual cards
- restrained monochrome palette
- carefully placed accent colour
- oversized typography
- meaningful graphics

The reference images supplied by the designer should be treated as the visual direction for the BENTO COMPOSITION and GRAPHIC QUALITY.

Do not copy their content.

Copy the design philosophy:
large visual objects + typography + asymmetry + restrained colour + premium composition.

Most importantly:

**STOP MAKING INSIGHTS LOOK LIKE GRAPHS.**

**MAKE INSIGHTS LOOK LIKE DESIGNED OBJECTS.**