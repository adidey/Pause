# WORTH IT? — VISUAL OVERHAUL v2
## Product UI Direction + Responsive Layout Specification

Rework the existing Worth It? app into a cohesive, premium mobile experience.

The goal is NOT to add more decoration.

The goal is to make the interface feel:
- intentional
- editorial
- premium
- calm
- slightly playful
- financially intelligent without looking like a banking app
- visually consistent across every screen

The attached Bento-style visual reference is the primary inspiration for the Insights page.

---

# 01 — NON-NEGOTIABLE GLOBAL RULES

## Remove the current visual inconsistencies

Do NOT preserve:
- the Worth It? micro-logo/header appearing on every page
- floating branding inside content pages
- oversized PAUSE branding on internal pages
- decorative vertical pill shapes behind content
- excessive pastel gradients
- rainbow colour coding
- generic dashboard/chart aesthetics
- arbitrary coloured progress bars
- excessive rounded white cards
- inconsistent left/right page margins
- content sitting underneath or too close to the Dynamic Island/notch

The application should have ONE visual identity.

---

# 02 — BRANDING

## Brand name

The product is:

WORTH IT?

Use the brand name primarily on the Home / Wants screen.

Do NOT repeat the logo or wordmark at the top of:
- Insights
- Contexts
- Profile

Those screens should begin directly with their page title.

Example:

Insights

Your spending,
lately.

Contexts

Where your money
wants to go.

Profile

Profile

No secondary "WORTH IT?" branding above these titles.

---

# 03 — LOGO / WORDMARK

Remove the current pause-symbol-based logo completely.

Do not use:
- "||"
- pause bars
- a fake pause button as a logo
- tiny WORTH IT? labels as persistent branding
- a giant PAUSE wordmark

The brand should be represented by a clean typographic wordmark:

WORTH IT?

Recommended direction:

"WORTH" in a strong grotesk/bold typeface
"IT?" slightly lighter or with subtle typographic contrast.

The wordmark should feel like an editorial fashion/finance brand rather than a meditation app.

Optional visual device:
A small typographic dot or period can act as the brand signature.

Do not turn this into an icon-heavy logo.

The brand should be recognizable primarily through typography.

---

# 04 — TYPOGRAPHIC SYSTEM

Create one consistent typographic hierarchy.

## Display

Large page titles:
48–56px
very bold
tight line height
near-black

Example:

Your spending,
lately.

## Section titles

18–22px
bold

## Body

16–18px
comfortable line height

## Metadata

11–12px
monospaced or highly structured grotesk
uppercase
letter spacing 0.12–0.18em

Examples:

3 ON YOUR MIND
DECISION BEHAVIOUR
BY CONTEXT
AVAILABLE SPENDING

## Numbers

Large financial values should use the same heavy display face as page titles.

Examples:

$375
$180
$304

Do not use multiple unrelated typefaces.

---

# 05 — GLOBAL RESPONSIVE PADDING

This is extremely important.

The Dynamic Island / notch is NOT content padding.

Never position content using the top of the physical viewport.

Use a safe-area-aware content container.

Conceptually:

padding-top =
safe-area-inset-top + 24–32px

Then content begins BELOW the Dynamic Island.

Never allow:
- page titles behind the Dynamic Island
- logo/header behind the Dynamic Island
- cards to begin underneath the Dynamic Island
- text visually colliding with the notch

## Horizontal padding

Use a consistent page gutter:

Mobile:
20–24px

Small mobile:
18–20px

Larger mobile:
24–28px

All primary page content must align to the SAME left edge.

The following must share the same horizontal alignment:
- page title
- subtitle
- section labels
- cards
- Bento panels
- grids
- profile sections
- insights sections

Do not independently center or offset headers.

---

# 06 — GLOBAL NAVIGATION

Keep one unified bottom navigation system.

Navigation:

WANTS
CONTEXTS
+
INSIGHTS
PROFILE

Use icons that visually belong to the same icon family.

Icons should be:
- simple
- geometric
- outlined when inactive
- solid/strong when active
- approximately 22–24px
- consistent stroke weight

Suggested icon concepts:

WANTS
briefcase / ticket

CONTEXTS
four connected circles

INSIGHTS
three ascending blocks

PROFILE
simple person outline

Do not use unrelated icon styles.

The central "+" action remains the dominant navigation action.

The active navigation item should use:
- near-black icon
- near-black label

Inactive items:
- muted grey

No pastel icon colours.

---

# 07 — HOME / WANTS

The Home screen is the only place where the brand identity should be highly visible.

Top:

WORTH IT?

Think before you spend.

Primary CTA:

+ Add a want

Then:

3 ON YOUR MIND                         STACK / GRID

The Home screen supports TWO representations:

STACK
GRID

The user can switch between them.

---

# 08 — WANT TICKETS

The "Want" object is a ticket.

It should visually feel like a physical ticket/card rather than a generic rounded rectangle.

## Ticket construction

Each ticket has:

1. image/graphic header
2. perforation boundary
3. content section
4. metadata
5. subtle ticket edge treatment

The perforation should include inward semicircular cuts on the left and right edges.

Do NOT use a barcode as a required element.

A barcode may exist as optional visual metadata, but it must NEVER be necessary to identify, open, or use the ticket.

The ticket should still clearly read as a ticket without it.

---

# 09 — TICKET GRAPHICS

The image area should contain a simple, expressive graphic representing the want.

Examples:

camera:
minimal illustrated camera / palette / photographic object

headphones:
minimal headphone graphic

shoes:
minimal sneaker graphic

Do not use random stock imagery.

Graphics should feel like part of the same visual system.

Use soft, restrained backgrounds.

---

# 10 — STACK MODE

Stack mode is NOT a horizontally scrolling carousel.

It is a vertical deck.

The currently selected ticket is displayed prominently.

Additional tickets appear partially behind it.

Example:

        CURRENT TICKET
     ┌─────────────────┐
     │                 │
     │                 │
     │      IMAGE      │
     │                 │
     ├─────────────────┤
     │  CONTENT        │
     │                 │
     └─────────────────┘
       ┌───────────────┐
       │ next ticket   │
       └───────────────┘

The next cards should subtly peek from behind.

---

# 11 — STACK NAVIGATION

Do NOT make the user scroll the entire page just to browse tickets.

The stack itself should behave like a controlled deck.

Use:

←    01 / 06    →

The arrows change the active ticket.

When the user taps the right arrow:

The current ticket transitions away and the next ticket becomes the primary ticket.

The ticket should visually "replace" the current ticket.

The surrounding page does NOT scroll.

This is effectively a mini ticket viewer inside the Home page.

Swipe gestures may also be supported.

The user should be able to browse 3, 5, 10, or 50 wants without the layout breaking.

---

# 12 — GRID MODE

When Grid is selected, transform the ticket collection into a responsive grid.

2-column mobile grid.

Each ticket becomes a compact Bento-like card.

Example:

┌────────────┐ ┌────────────┐
│   IMAGE    │ │   IMAGE    │
├────────────┤ ├────────────┤
│ Fuji X-A20 │ │ Headphones │
│ $375       │ │ $499       │
└────────────┘ └────────────┘

┌────────────┐ ┌────────────┐
│   IMAGE    │ │   IMAGE    │
├────────────┤ ├────────────┤
│ Nike       │ │ Trip       │
│ $160       │ │ $300       │
└────────────┘ └────────────┘

The grid should naturally expand for any number of wants.

Do NOT hardcode a 3-item layout.

---

# 13 — HOME SUMMARY

Below the ticket viewer/grid, show a small number of useful metrics.

Examples:

1
skipped

$180
potential avoided

Keep these secondary.

Do not turn Home into a dashboard.

---

# 14 — CONTEXTS

Contexts should occupy the FULL usable screen.

Do not constrain the Contexts visual field to a small viewport/card.

Page structure:

Where your money
wants to go.

Tap a context to explore.

Then create a large visual field containing the contexts.

Contexts should feel spatial rather than like a traditional list.

Possible contexts:

WORK
HOBBIES
FITNESS
HOME & LIVING
STUDY & TECH
TRAVEL & TRIPS
PERSONAL

Use restrained atmospheric colour only as subtle background fields.

Do not use seven saturated colours.

Each context can have a small amount of contextual tint, but the overall page should remain calm.

---

# 15 — INSIGHTS — COMPLETE REDESIGN

THIS IS THE MOST IMPORTANT CHANGE.

The Insights page must NOT look like the current analytics dashboard.

Do not simply rearrange the existing charts.

Do not use:
- traditional graphs
- generic progress bars
- rainbow categories
- four tiny metric cards
- spreadsheet-style analytics
- excessive legends
- coloured chart lines
- chart-heavy dashboard UI

The inspiration is the attached Bento reference.

Think:

EDITORIAL BENTO
+
FINANCIAL INSIGHT
+
GRAPHIC DESIGN

---

# 16 — INSIGHTS VISUAL LANGUAGE

Use:

near-black
off-white
soft grey

with ONE restrained accent colour.

Preferred accent:

acid yellow / muted lime

Use the accent sparingly.

Approximately:

85–90% neutral
10–15% accent

No rainbow.

No separate colour for Work, Hobbies, Fitness, etc.

Categories are differentiated by typography and layout, NOT colour.

---

# 17 — INSIGHTS BENTO STRUCTURE

Instead of a grid of identical cards, use an asymmetrical Bento composition.

The composition should contain:

## PANEL A — DECISION BEHAVIOUR

Large square-ish panel.

Near-black background.

White typography.

Large number:

4

CONSIDERED

Small supporting text.

Add a simple abstract visual element:

A thin curved line / path / ring / trajectory.

This is NOT a chart.

It is a graphic representation of decision behaviour.

---

## PANEL B — WAITING

Large square panel.

Neutral dark/grey background.

Huge:

3

WAITING

Use the accent colour as a small graphic gesture.

For example:
a simple arrow,
spark,
dot,
or rising shape.

Again:

GRAPHIC,
not chart.

---

## PANEL C — AVOIDED

Wide horizontal Bento panel.

Large:

$180

POTENTIAL SPENDING AVOIDED

Add a large abstract graphic such as:

three small ticket shapes disappearing/fading into the background.

The visual communicates "avoided spending".

---

## PANEL D — BIGGEST DESIRE

Wide horizontal feature panel.

Example:

WORK

$679

Your biggest area
of desire.

Use an oversized abstract briefcase/work graphic.

Do not use a bar chart.

---

## PANEL E — DECISION TIME

Smaller panel.

20

DAYS

AVERAGE DECISION TIME

Graphic treatment:

a simple oversized circular dial / clock-like object.

Not a data visualization.

---

## PANEL F — AVERAGE WANT

Smaller panel.

$304

AVERAGE WANT

per item considered

Use an abstract ticket stack graphic.

---

# 18 — BENTO COMPOSITION

Do not make every panel identical.

The composition should intentionally resemble a premium editorial Bento layout:

┌─────────────┐ ┌─────────────┐
│             │ │             │
│  DECISION   │ │   WAITING   │
│      4      │ │      3      │
│             │ │             │
└─────────────┘ └─────────────┘

┌─────────────────────────────┐
│                             │
│       $180                  │
│       AVOIDED               │
│                             │
└─────────────────────────────┘

┌─────────────────────────────┐
│ WORK                 $679   │
│ Biggest area of desire      │
└─────────────────────────────┘

┌─────────────┐ ┌─────────────┐
│     20      │ │    $304     │
│   DAYS      │ │ AVG WANT    │
└─────────────┘ └─────────────┘

Panels should have different visual weights.

---

# 19 — INSIGHTS GRAPHICS

Create actual graphic objects inside the panels.

Examples:

- oversized abstract arrows
- circles
- ticket silhouettes
- simple line trajectories
- geometric shapes
- clock/dial forms
- briefcase silhouette
- stacked ticket shapes
- dots and connecting paths
- oversized numerals

These are ART-DIRECTION ELEMENTS.

They are not charts.

The user should feel that Insights has been designed by a graphic designer rather than generated from a dashboard component library.

---

# 20 — INSIGHTS RESPONSIVENESS

On narrow phones:

2-column Bento grid where possible.

Wide feature panels span both columns.

Square panels occupy one column.

On larger phones:

Increase panel scale and whitespace.

Do not compress everything just to fit above the fold.

Insights should be vertically scrollable.

The navigation remains fixed.

---

# 21 — PROFILE

Profile should become a useful configuration/control centre rather than a static information page.

Header:

Profile                                  Edit

Then a clean financial configuration panel.

Example:

AVAILABLE SPENDING

$400 / fortnight

---

HOURLY RATE

$25 / hr

---

MY COMPARISONS

Your money, translated into
things you understand.

Then comparison chips:

🍔 burgers
$15

☕ coffees
$6

✈️ short flights
$300

🎬 cinema tickets
$22

---

# 22 — PROFILE FLEXIBILITY

The Edit action must actually support editing.

Allow users to modify:

- available spending
- pay frequency
- hourly rate
- comparison items
- comparison prices
- comparison display order
- comparison visibility
- default comparison set

Users should be able to:

ADD
EDIT
DELETE
REORDER

comparison items.

Do not hardcode four comparisons.

The UI should gracefully support:

0 comparisons
1 comparison
3 comparisons
10+ comparisons

Use a horizontally wrapping chip/grid system.

---

# 23 — PROFILE EDITING

Use a clean edit sheet/modal.

Do not navigate to a completely disconnected visual style.

Example:

EDIT SPENDING

Available spending
[ $400 ]

Frequency
[ Fortnightly ▾ ]

Hourly rate
[ $25 ]

SAVE

The controls should inherit the same typography and spacing system.

---

# 24 — COLOUR SYSTEM

The entire application should use a restrained palette.

Primary:
Near-black

Background:
Warm/off-white

Secondary:
Soft lavender-grey / cool neutral

Accent:
One muted lime/yellow

Optional very subtle peach/lavender atmospheric gradients may exist ONLY on Home and Contexts.

Insights should be predominantly neutral.

Do not assign:
green = fitness
orange = hobbies
blue = travel
purple = study
etc.

That creates visual noise.

---

# 25 — CARDS

Cards should not all look like:

white rectangle
rounded corners
label
number

Instead, vary visual hierarchy.

Some panels:
- dark
- light
- full-width
- square
- graphic-heavy
- typography-heavy

But keep:
- same corner radius family
- same spacing system
- same typography
- same shadows
- same alignment

---

# 26 — MOTION

Motion should be subtle.

Ticket stack:
- directional replacement animation
- slight depth
- slight scale

Grid ↔ Stack:
- morph/transition where possible

Insights:
- panels gently reveal on entry

Navigation:
- minimal active-state transition

Avoid:
- excessive bouncing
- flashy transitions
- large parallax
- distracting animations

---

# 27 — CONTENT WIDTH

All pages must use the same content container.

Never allow:

Home = 24px margin
Insights = 18px
Contexts = 40px
Profile = 30px

They must share the same responsive gutter.

Headers, cards and content align to the same vertical rails.

---

# 28 — SAFE AREA

Implement proper mobile safe-area handling.

The bottom navigation must respect:

safe-area-inset-bottom

The top content must respect:

safe-area-inset-top

Never visually position content based on the Dynamic Island dimensions.

The Dynamic Island is hardware UI, not application layout.

---

# 29 — REMOVE COMPLETELY

Delete/rework these existing patterns:

- persistent "WORTH IT?" micro-header on every screen
- PAUSE branding
- pause bars as branding
- oversized PAUSE logo
- floating decorative vertical pill shapes
- barcode as required ticket element
- horizontal ticket carousel
- scroll-to-browse ticket behaviour
- rainbow Insights colours
- traditional Insights graphs
- generic progress bars
- identical analytics cards
- arbitrary coloured category bars
- disconnected header alignment
- inconsistent page padding
- content underneath Dynamic Island

---

# 30 — FINAL DESIGN PRINCIPLE

WORTH IT? should feel like:

A thoughtful consumer product
designed by a strong editorial designer.

NOT:

a budgeting spreadsheet
inside a banking dashboard.

The emotional experience should be:

SEE IT
→ PAUSE
→ UNDERSTAND IT
→ DECIDE

But do not literally place the word "PAUSE" throughout the interface.

The product philosophy should be expressed through interaction and composition rather than repeated branding.

The final interface should have:
- fewer colours
- stronger typography
- larger graphics
- more negative space
- stronger hierarchy
- better alignment
- fewer UI components
- more intentional composition

When in doubt:

REMOVE rather than ADD.