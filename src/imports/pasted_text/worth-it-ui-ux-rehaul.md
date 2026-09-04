# WORTH IT? — COMPLETE UI / UX REHAUL
## Responsive system, ticket library, stack/grid browsing, restrained insights & flexible profile

Rework the existing Worth It? mobile app into one cohesive, premium editorial product.

Do NOT treat this as a cosmetic polish.

Rebuild the underlying layout, component hierarchy, responsive behaviour and information architecture while preserving the core product concept:

> Worth It? helps people pause before spending by translating purchases into their own world.

The product should feel like:

EDITORIAL OBJECT LIBRARY
+
PREMIUM TICKET / PASS
+
PERSONAL SPENDING JOURNAL
+
MODERN FINANCIAL UTILITY

It should NOT feel like:

- generic fintech
- banking dashboard
- rainbow analytics app
- ecommerce catalogue
- wellness app
- overly playful budgeting app

The visual hierarchy must come primarily from:

TYPOGRAPHY
+
SPACING
+
SHAPE
+
LIGHT
+
MOTION

not excessive colour or excessive cards.

---

# 01 — GLOBAL DESIGN PRINCIPLE

The entire app must feel like ONE visual system.

Every screen must share:

- identical page margins
- identical header alignment
- identical safe-area logic
- identical typography hierarchy
- identical navigation component
- identical icon language
- identical corner-radius system
- identical spacing scale
- identical interaction language

Do NOT manually position elements independently on each screen.

Use shared components and Auto Layout.

The Home, Contexts, Insights and Profile screens must feel like different rooms in the same house.

---

# 02 — RESPONSIVE SAFE AREA

THIS IS A CRITICAL REQUIREMENT.

The current interface places content too close to the Dynamic Island / notch.

Do NOT position content using fixed coordinates relative to the phone mockup.

Use responsive constraints and safe-area-aware Auto Layout.

Every screen must calculate:

TOP SAFE AREA
+
CONTENT BREATHING ROOM

before beginning the actual page content.

The hierarchy should be:

Dynamic Island / notch
↓
safe-area inset
↓
intentional breathing space
↓
eyebrow / page label
↓
page heading
↓
subtitle / content

Never allow:

- page titles to touch the Dynamic Island
- logos to sit beside the Dynamic Island
- buttons to collide with the notch
- back buttons to sit too high
- decorative elements to become obstructive

The exact top inset should adapt automatically to different iPhone sizes.

Do not hard-code the current mockup's coordinates.

---

# 03 — GLOBAL HORIZONTAL SPACING

Create a shared horizontal content system.

All major page content should align to the same left and right edges.

Target:

24–32px responsive horizontal inset

depending on available viewport width.

The following must share the same alignment:

- Home heading
- Contexts heading
- Insights heading
- Profile heading
- page subtitles
- primary content
- cards
- charts
- grid items

Do NOT allow the current visual displacement where each page starts at a slightly different horizontal position.

The user should be able to draw one imaginary vertical line down the app and see consistent alignment.

---

# 04 — REMOVE THE CURRENT LOGO TREATMENT

Completely remove the repeated:

"|| WORTH IT?"

branding from individual pages.

Do NOT place the brand mark above every page.

Do NOT place pause bars beside every heading.

Do NOT repeatedly embed "PAUSE" as a logo.

Do NOT use the current pause-bars symbol as a decorative device.

The previous logo treatment is visually noisy and makes the interface feel like it is trying too hard to brand itself.

Brand identity should instead come from:

- typography
- ticket geometry
- spacing
- restrained atmospheric colour
- iconography
- motion
- the PAUSE concept on the Home screen

The Home screen can carry the strongest brand expression.

Secondary screens should remain clean.

---

# 05 — BRAND / LOGOTYPE DIRECTION

Do not force a conventional icon logo into the UI.

The wordmark should be the primary brand identity.

Use:

WORTH IT?

as a refined editorial wordmark.

Typography should feel:

- bold
- modern
- slightly editorial
- compact
- confident
- recognisable at small sizes

The question mark is important to the identity.

Avoid:

- generic finance icons
- piggy banks
- wallets
- dollar signs
- pause buttons
- generic checkmarks
- complicated monograms

If a symbol is eventually explored, it should derive from the concept of:

PAUSE
+
TICKET
+
DECISION

but it should remain extremely simple.

Do not introduce a symbol until it feels stronger than the wordmark itself.

---

# 06 — GLOBAL COLOUR SYSTEM

Reduce the number of colours across the app.

The existing UI currently uses too many unrelated accents.

Establish a restrained palette:

PRIMARY:
- near-black
- warm white

ATMOSPHERIC:
- extremely pale lavender
- extremely pale peach
- extremely pale blue

ACCENT:
- one muted lavender/blue

OPTIONAL SECONDARY:
- one muted green for positive/decided states

Do NOT assign a different bright colour to every statistic.

Do NOT create rainbow charts.

Do NOT make each page a different gradient.

---

# 07 — ATMOSPHERIC GRADIENT SYSTEM

Use one shared atmospheric lighting language.

Base:

warm off-white

with extremely subtle:

lavender
+
peach
+
pale blue

light leaks.

The gradient should feel like ambient light entering a room.

It should NOT look like:

- a rainbow
- a neon gradient
- a wellness app
- an AI assistant background

The gradient is atmosphere, not information.

Use different intensity by screen:

HOME:
slightly richer atmosphere

CONTEXTS:
most atmospheric

INSIGHTS:
almost neutral

PROFILE:
almost neutral

This creates consistency without making every page identical.

---

# 08 — TYPOGRAPHY SYSTEM

Use one consistent typographic hierarchy.

DISPLAY:

Heavy bold sans-serif
Tight tracking
Large editorial scale

Examples:

PAUSE.
Your spending,
lately.
Contexts
Profile

BODY:

Contemporary sans-serif
Comfortable line height
Muted dark blue/grey

METADATA:

Monospaced or mono-inspired type

Uppercase
Generous letter spacing
Small scale

Examples:

WAITING
DAY 04
DECISION TIME
AVAILABLE SPENDING

Do not introduce multiple unrelated typefaces.

---

# 09 — GLOBAL NAVIGATION

Create ONE reusable bottom navigation component.

Order:

WANTS
CONTEXTS
+
INSIGHTS
PROFILE

The centre "+" button is the primary action.

Navigation must:

- respect the bottom safe area
- respect the iPhone home indicator
- remain fixed to the bottom
- never overlap content
- have identical height across screens
- use identical icon sizes
- use identical typography
- use identical spacing

Only active state changes.

---

# 10 — NAVIGATION ICON LANGUAGE

Use a single geometric icon family.

All icons must share:

- same stroke weight
- same optical size
- same corner treatment
- same visual density

Suggested:

WANTS:
ticket / pass icon

CONTEXTS:
connected nodes / constellation icon

INSIGHTS:
minimal bar-chart icon

PROFILE:
simple person silhouette

Avoid mixing:

- outlined icons
- filled icons
- emoji
- random icon libraries

inside the navigation itself.

Emoji can remain inside product comparison content because they are part of the app's personality.

---

# 11 — HOME / WANTS

The Home screen remains the emotional centre of Worth It?

Hierarchy:

PAUSE.

Think before you spend.

[ + Add a want ]

3 ON YOUR MIND

Then the user's wants.

The Home screen should feel spacious and calm.

Do not push the heading toward the Dynamic Island.

Do not make the top section excessively tall.

The ticket library should begin at a visually natural point after the primary action.

---

# 12 — WANT LIBRARY: TWO VIEW MODES

The Wants screen must support TWO viewing modes:

STACK
GRID

Provide a small segmented control / toggle near:

"3 ON YOUR MIND"

Example:

3 ON YOUR MIND

[ STACK ] [ GRID ]

The control should be extremely subtle.

Do not make it visually dominant.

---

# 13 — STACK MODE

STACK is the default mode.

The user sees one dominant ticket.

Behind it:

- next ticket peeks slightly
- third ticket may peek subtly
- additional tickets remain part of the stack
- no excessive transparency
- no messy overlapping text

The stack should communicate:

"There is more."

without becoming visually confusing.

Each ticket should be separated enough that it remains understandable.

---

# 14 — STACK NAVIGATION BEHAVIOUR

Do NOT rely entirely on vertical page scrolling.

The stack should behave like a physical collection of tickets.

Show:

←                 →

around the ticket image / ticket content area.

Tapping the right arrow should:

1. animate the current ticket away
2. reveal the next ticket
3. promote the next ticket into the primary position
4. update the ticket counter
5. subtly shift the stack behind it

Use a smooth:

slide + fade + depth

transition.

The user should NOT need to scroll down the entire screen to discover the next want.

The screen itself remains stable.

The ticket changes inside the browsing area.

Example:

        1 / 3

     ←   TICKET   →

Next:

        2 / 3

     ←   TICKET   →

Next:

        3 / 3

     ←   TICKET   →

If there are 10 or 20 wants, the same interaction continues.

Do not build a separate special state only for three items.

---

# 15 — STACK REVEAL ANIMATION

The animation should feel physical.

Current ticket:

moves slightly left / right

while:

next ticket rises from underneath

and becomes the primary ticket.

The underlying stack should subtly shift.

Avoid:

- aggressive card flipping
- 3D gimmicks
- large rotations
- excessive bounce
- carousel dots as the primary interaction

The interaction should feel like moving through a stack of physical passes.

---

# 16 — TICKET COUNTER

Show a small counter:

01 / 03

or:

1 / 3

For larger collections:

04 / 12

The counter should remain subtle and use the mono metadata typography.

Do not use oversized pagination dots.

---

# 17 — GRID MODE

GRID provides a second way to browse a larger collection.

When GRID is selected:

Show all wants as a responsive grid.

For example:

2-column grid on standard mobile widths.

Each item becomes a compact ticket preview.

Grid cards should include:

- product image
- item name
- price
- status
- category

Do not show every metric in the grid.

The grid is for scanning.

The stack is for experiencing one want at a time.

---

# 18 — GRID RESPONSIVENESS

The grid must adapt automatically.

2 items:
2-column layout

3 items:
third item occupies normal grid position

4 items:
2 × 2

6 items:
2 × 3

10+ items:
continue naturally

Do not create awkward empty spaces.

Cards must maintain consistent:

- width
- gutters
- corner radius
- internal padding

Long item names must wrap naturally.

---

# 19 — TICKET DESIGN

The Want card must genuinely look like a premium physical ticket.

Not:

"rounded ecommerce card"

Instead:

shopping ticket
×
museum pass
×
product object

Structure:

--------------------------------
PRODUCT IMAGE
--------------------------------
category        status
ITEM NAME
$375

--------------------------------
comparison metrics

ticket number
--------------------------------

Use a slightly warm off-white ticket surface.

Use subtle depth.

Use a very soft shadow.

---

# 20 — TICKET CUT-OUTS

At the boundary between:

IMAGE

and

INFORMATION

create genuine inward semicircular ticket cut-outs.

One on the left edge.

One on the right edge.

The cuts should look like physical ticket perforations.

Do NOT simulate them with random circles floating on top.

The ticket silhouette itself should contain the cut-outs.

This is a defining visual characteristic of the component.

---

# 21 — TICKET PERFORATION

Between image and information:

create a subtle horizontal perforation.

Possible treatment:

- dotted line
- fine dashed line
- tiny perforation marks

Keep it subtle.

It should communicate:

"this is a ticket"

without becoming decorative noise.

---

# 22 — BARCODE

A barcode is OPTIONAL.

Do not make it mandatory.

Do not reserve a large fixed area for it.

If included:

place a small barcode / receipt-like code near the bottom edge.

It should feel like an authentic ticket detail.

If there is insufficient space:

hide it.

The ticket must still look complete without the barcode.

Do not make the barcode functional.

It is purely a visual identity detail.

---

# 23 — TICKET IDENTITY

Optional small metadata:

#0001

DAY 04

WAITING

WORTH IT?

Use tiny mono typography.

These details should reinforce the physical-ticket metaphor.

They should never overpower:

PRODUCT
NAME
PRICE

---

# 24 — PRODUCT IMAGE

The product is the hero.

Make the product image visually dominant.

Do not treat it as a small thumbnail.

Use:

- clean product photography
- generous breathing room
- soft background
- subtle depth

The product should feel almost like an object displayed in a gallery.

---

# 25 — PRODUCT-BASED AMBIENT LIGHT

Allow the current product to subtly influence the surrounding atmosphere.

Example:

camera:
muted blue-grey

DJ equipment:
warm amber

shoes:
soft green-neutral

flight:
soft sunset peach

BUT:

very subtle.

Never allow product colour to create a rainbow UI.

The ticket remains neutral.

The atmosphere changes around it.

---

# 26 — TICKET INFORMATION HIERARCHY

Prioritise:

1. product
2. name
3. price
4. status
5. decision context
6. comparisons

Example:

HOBBIES                     WAITING

Fujifilm X-A20

$375

1.9 weeks
15 hours
25 burgers
63 coffees

The statistics should support the decision.

They should not visually dominate the object.

---

# 27 — CONTEXTS

Contexts should occupy the FULL SCREEN.

Do not create a small coloured rectangle inside the viewport.

The atmospheric field should extend through the primary content area.

Header:

Contexts

Where your money wants to go.

Then the visual map.

The background should feel continuous.

---

# 28 — CONTEXT GRAVITY MAP

Contexts should behave like a visual map of the user's spending desires.

Each context becomes a soft field / planet.

Examples:

HOBBIES
WORK
FITNESS
TRAVEL
HOME
STUDY
PERSONAL

The size of a context should be influenced by:

TOTAL MONEY ASSOCIATED WITH THAT CONTEXT

not simply number of wants.

Example:

HOBBIES
$1,140

should visually carry more weight than:

HOME
$120

Allow contexts to feel spatially distributed.

Do not make this look like a standard chart.

---

# 29 — CONTEXT INTERACTION

Tapping a context should reveal its wants.

Use:

zoom
+
fade
+
spatial transition

to move into the selected context.

Example:

HOBBIES

Fujifilm X-A20
$375

DJ Deck
$400

Headphones
$499

The interaction should feel like entering a personal spending universe.

---

# 30 — INSIGHTS — COMPLETE REDESIGN

The current Insights screen is too colourful and too dashboard-like.

Rebuild it from scratch.

The attached visual reference should be used as the conceptual direction:

DARK / LIGHT
+
LARGE NUMBERS
+
MINIMAL CHARTS
+
STRONG TYPOGRAPHY
+
ONE RESTRAINED ACCENT

Do NOT copy the reference literally.

Translate its visual discipline into Worth It?.

---

# 31 — INSIGHTS COLOUR SYSTEM

Use approximately:

70–80% warm white / near-white
15–25% near-black
5% restrained lavender/blue accent

Optional:

small amount of muted green for positive outcomes.

Do NOT use:

bright purple
bright green
orange
blue
red
yellow

all simultaneously.

One chart should never look like five different products.

---

# 32 — INSIGHTS HEADER

Use:

Your spending,
lately.

Observations, not advice.

Use the same left alignment as every other page.

The header must sit safely below the Dynamic Island.

No repeated Worth It? logo.

No pause-bars logo.

---

# 33 — INSIGHTS HERO

Instead of four colourful metric columns, create ONE dominant behavioural statement.

Example:

DECISION BEHAVIOUR

4
wants considered

Then a restrained horizontal visual:

WAITING      ███████████
SKIPPED      ███
BOUGHT       █

Use one accent colour.

Do not give each state a separate bright colour.

---

# 34 — INSIGHTS PRIMARY VISUAL

Create a large editorial visualization.

Example:

WHERE YOUR WANTS GO

WORK        █████████████     $679
HOBBIES     ███████           $375
FITNESS     ███               $160

Use:

one accent

for all bars.

The largest bar should visually dominate.

Do not assign a different colour to each context.

---

# 35 — INSIGHTS KEY NUMBERS

Use a disciplined grid.

Do NOT create random card sizes.

Use:

2-column grid

with perfectly aligned gutters.

Example:

--------------------------------
MONEY AVOIDED       DECISION TIME

$180                20 days
--------------------------------

AVG WANT

$304
--------------------------------

Every grid item must share:

- consistent padding
- consistent radius
- consistent typography
- consistent alignment

No awkward empty cells.

No random card heights.

No unnecessary decorative icons.

---

# 36 — INSIGHTS EDITORIAL NARRATIVE

After the visualizations, show 2–3 observations.

Example:

Work is your biggest area of desire.

You usually sit with a purchase for 20 days.

You've avoided $180 of potential spending.

These should look like editorial notes.

Not alerts.

Not notifications.

Not achievement badges.

Use tiny monochrome markers or one restrained accent.

---

# 37 — INSIGHTS INFORMATION HIERARCHY

The hierarchy should be:

BIG IDEA
↓
ONE MAJOR VISUAL
↓
SUPPORTING NUMBERS
↓
SHORT OBSERVATIONS

Not:

card
card
card
card
card

The page should feel closer to a premium editorial report than a financial dashboard.

---

# 38 — INSIGHTS RESPONSIVENESS

The Insights layout must work with changing data.

If there are:

3 contexts
5 contexts
10 contexts

the visualization must adapt.

Long context names must wrap.

Large numbers must not collide.

Charts should resize naturally.

Grid items should never overlap.

The screen must scroll vertically.

Bottom navigation must never cover the last content.

---

# 39 — PROFILE — PERSONAL SPENDING IDENTITY

Profile should NOT look like another analytics dashboard.

It should feel calm, personal and configurable.

Use:

Profile                         Edit

Then:

YOUR WORLD

$400
fortnightly spending

$25
worth of your time / hour

Then:

YOUR LENS

🍔 burgers
☕ coffees
✈️ short flights
🎬 cinema tickets

Then:

ABOUT WORTH IT?

Before I buy something,
I pause and see what it means
in my world.

Avoid excessive cards.

Use typography and spacing to create hierarchy.

---

# 40 — PROFILE FLEXIBILITY

Profile must be genuinely editable.

The Edit interface should support:

available spending
payment period
hourly rate
comparison items
comparison values
comparison categories

Allow:

ADD
EDIT
REMOVE
REORDER

comparisons.

Do NOT hard-code four comparison items.

---

# 41 — PROFILE COMPARISON SYSTEM

The comparison system must support:

2 comparisons
4 comparisons
6 comparisons
10+ comparisons

without breaking the layout.

Use Auto Layout.

Allow wrapping.

Example:

🍔 burgers     $15
☕ coffees      $6
✈️ flights     $300
🎬 cinema      $22
🛒 groceries   $120

Long names must wrap.

Do not force everything onto one line.

---

# 42 — PROFILE EDIT MODE

Edit mode should feel like a clean configuration experience.

Example:

AVAILABLE SPENDING

$400

[ Fortnightly ▼ ]

HOURLY RATE

$25

YOUR COMPARISONS

[ 🍔 Burgers       $15    Edit ]
[ ☕ Coffees        $6    Edit ]
[ + Add comparison ]

Use simple controls.

Avoid heavy form-card styling.

---

# 43 — PROFILE RESPONSIVENESS

Profile must scroll vertically.

Content height must be dynamic.

Never use fixed-height containers for content that can change.

Long names wrap.

Long descriptions wrap.

Comparison items expand naturally.

The Edit button remains inside the header safe area.

Bottom navigation never overlaps content.

---

# 44 — HOME / STACK / GRID RESPONSIVE BEHAVIOUR

The Home screen must remain functional with:

1 want
3 wants
5 wants
10 wants
50+ wants

For:

1 want:
show one ticket and no unnecessary stack controls.

2–3 wants:
show stack depth.

4+ wants:
show stack depth plus counter.

10+ wants:
stack remains the primary experience,
GRID becomes especially useful for scanning.

---

# 45 — STACK + GRID STATE PERSISTENCE

Remember the user's selected view mode.

If they select:

GRID

and return to Wants,

GRID remains selected.

If they select:

STACK,

return to STACK.

Do not reset unnecessarily.

---

# 46 — MOTION LANGUAGE

Motion should communicate physicality.

Use:

- subtle slide
- depth
- fade
- reveal
- gentle parallax

Avoid:

- bouncing UI
- excessive spring effects
- large rotations
- gimmicky 3D transitions

The ticket should feel like a physical object being handled.

---

# 47 — HOME SCROLL BEHAVIOUR

The Home screen itself can still scroll vertically.

However:

the WANT STACK is an interactive browsing module.

Do not force the user to scroll several screen heights simply to move from Want #1 to Want #2.

Use arrow/reveal interaction inside the stack.

Vertical scrolling should be used for:

- moving beyond the hero
- seeing supporting content
- reaching secondary information

not as the only way to browse wants.

---

# 48 — ACCESSIBILITY / TOUCH TARGETS

All interactive controls should have comfortable touch targets.

Arrows:

minimum approximately 44 × 44px

Grid/Stack toggle:

comfortable tap area

Add Want:

large primary action

Navigation:

comfortable touch targets

Do not sacrifice usability for visual minimalism.

---

# 49 — COMPONENT ARCHITECTURE

Create reusable components:

PageHeader
PrimaryButton
BottomNavigation
WantTicket
TicketImage
TicketPerforation
TicketCutout
TicketMetadata
TicketMetrics
TicketStack
TicketGrid
ViewToggle
ContextMap
ContextNode
InsightMetric
InsightChart
InsightObservation
ProfileSection
ComparisonChip
EditControl

Use Auto Layout / responsive constraints.

Do not duplicate screen-specific components unnecessarily.

---

# 50 — DESIGN TOKENS

Create shared tokens for:

PAGE_HORIZONTAL_PADDING
SAFE_AREA_TOP
SECTION_GAP
CARD_RADIUS
TICKET_RADIUS
GRID_GUTTER
NAV_HEIGHT
BUTTON_HEIGHT
TITLE_SIZE
SUBTITLE_SIZE
BODY_SIZE
META_SIZE

All screens should consume these shared values.

Do not manually tune each screen independently.

---

# 51 — FINAL VISUAL TARGET

The final app should feel:

quiet
intelligent
editorial
premium
slightly futuristic
physical
human

The product should make the user feel:

"I'm looking at something I want."

Then:

"Let me pause."

Then:

"What does this actually mean in my world?"

That psychological sequence is more important than decorative styling.

---

# 52 — FINAL QUALITY CHECK

Before considering the redesign complete, inspect:

HOME
CONTEXTS
INSIGHTS
PROFILE
STACK
GRID
EDIT PROFILE

side-by-side.

Verify:

- identical left alignment
- identical safe-area logic
- no content near Dynamic Island
- no repeated logo
- no pause-bars decoration
- consistent typography
- restrained colour
- no rainbow analytics
- no random card sizes
- no overlapping ticket text
- genuine ticket cut-outs
- barcode optional
- stack works with 1, 3, 10+ wants
- grid works with 1, 3, 6, 10+ wants
- arrows reveal the next ticket
- stack does not require excessive vertical scrolling
- Insights feels editorial rather than fintech
- Profile adapts to changing comparison data
- navigation is identical across screens
- bottom navigation respects the home indicator
- no content is clipped
- no fixed-height containers break with longer content

---

# CORE DESIGN RULE

Do not add more visual elements to solve a hierarchy problem.

Solve hierarchy with:

TYPOGRAPHY
SPACING
SIZE
POSITION
LIGHT
MOTION

Use colour sparingly.

Use cards only when they represent a meaningful object.

The most important object in Worth It? is the WANT.

Make the want feel tangible.

Make the decision feel deliberate.

Make the interface disappear enough for the user to think.