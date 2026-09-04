# WORTH IT? — COMPLETE UI OVERHAUL

## Objective

Rehaul the existing WORTH IT? app UI into one cohesive, premium, editorial-fintech experience.

Do NOT redesign each screen independently.

The entire app must feel like one product with:
- one visual identity
- one spacing system
- one typography system
- one navigation language
- one gradient/material language
- one card language
- consistent header alignment
- consistent interaction patterns

Preserve the core product concept and existing information architecture, but substantially improve the visual hierarchy, polish, responsiveness, and consistency.

The product should feel:
- calm
- intelligent
- playful
- premium
- editorial
- slightly experimental
- financially useful without feeling like a traditional finance app

Avoid:
- generic fintech dashboards
- excessive gradients
- excessive colourful UI
- excessive rounded cards
- random emoji usage
- inconsistent typography
- excessive whitespace
- cramped headers
- visual noise


# 1. CORE BRAND DIRECTION

## Brand

WORTH IT?

The brand idea is a "pause" between wanting something and buying it.

The identity should communicate:

WANT → PAUSE → REFLECT → DECIDE

The visual language should make "pause" feel like a physical moment.

## Brand personality

Quiet confidence.

The app should not scream "finance".

It should feel closer to:
- an editorial magazine
- a thoughtful personal object
- a premium lifestyle app
- a beautifully designed journal

with financial intelligence underneath.


# 2. LOGOTYPE — REWORK COMPLETELY

Do NOT use the previous logo concept.

Do not create a complicated icon.

Create a very simple typographic logotype:

WORTH IT?

Use the question mark as the distinctive brand element.

### Recommended direction

"WORTH IT?" in a compact uppercase grotesk/neo-grotesk style.

The question mark should have slightly exaggerated proportions and become the recognizable brand signature.

Alternative subtle brand mark:

A minimal pause symbol:

|| 

but do NOT make it look like a generic media-player pause icon.

Instead, create two narrow vertical editorial bars with slightly asymmetric spacing.

The pause mark can appear as:

|| WORTH IT?

or

WORTH IT? ||

depending on context.

### Logo usage

The logo should NOT dominate every screen.

Use the full logotype primarily:
- onboarding
- splash/loading
- profile/about
- empty states

Use the compact pause mark in:
- navigation/header
- cards
- small brand moments
- ticket detail
- contextual UI

The pause mark should become the app's recurring visual signature.

Do NOT place a large logo behind every screen.

Instead, occasionally use an extremely subtle oversized pause mark or question mark as a background watermark.


# 3. GLOBAL VISUAL SYSTEM

Create a unified design system and apply it to every screen.

## Typography

Use one primary modern grotesk sans-serif.

Recommended characteristics:
- bold/heavy display weight
- regular body weight
- restrained mono/technical secondary style

Typography hierarchy:

DISPLAY:
Very large, heavy, tight tracking.

HEADLINE:
Bold, strong, left aligned.

BODY:
Comfortable, readable, slightly muted.

LABEL:
Uppercase mono or technical sans-serif.

MICRO:
Small uppercase mono labels for metadata.

Do NOT change the font treatment between screens.

## Header alignment

This is critical.

Every primary screen must use the SAME left content inset.

The homepage, Contexts, Insights and Profile must all share the exact same horizontal alignment grid.

Example:

Screen edge
↓
24–28px safe margin
↓
same header x-position
↓
same title x-position
↓
same content grid

Do not allow Contexts or Insights to drift horizontally from the homepage.

All major headers must begin on exactly the same vertical grid line.

## Top safe area

Respect the Dynamic Island/notch.

Never place content too close to the top.

Create a reusable safe-area header component.

Minimum spacing:

Dynamic Island
↓
24–32px
↓
small brand eyebrow / label
↓
16–20px
↓
headline

The homepage "WORTH IT?" label must never touch or visually collide with the Dynamic Island.

Make this responsive for different iPhone sizes.

Do not use fixed absolute positioning for primary content.


# 4. BACKGROUND SYSTEM

Use a unified soft atmospheric background system across the app.

The existing pastel gradients are directionally correct but need refinement.

Do NOT use a completely different gradient on every page.

Create one shared "WORTH IT atmosphere".

Base:

very light warm white / ivory

with extremely subtle atmospheric colour fields.

Primary palette:

- soft lavender
- powder blue
- pale peach
- muted mint
- warm cream

The gradients should behave like soft light rather than coloured blobs.

Use:
- huge blurred radial fields
- low saturation
- very high blur
- subtle opacity
- lots of negative space

Each screen may have a different dominant tint, but they must clearly belong to the same gradient family.

Example:

HOME:
lavender + peach + very subtle blue

CONTEXTS:
cream + mint + lavender

INSIGHTS:
lavender + powder blue + very subtle peach

PROFILE:
warm white + lavender

ONBOARDING:
very light lavender/cream

Never use more than 2–3 dominant gradient colours on one screen.

Avoid rainbow gradients.


# 5. HOME / WANTS SCREEN

This is the most important screen.

It should feel like the emotional centre of the product.

Structure:

SAFE AREA
↓
small WORTH IT? / pause branding
↓
large "PAUSE."
↓
"Think before you spend."
↓
Add a want
↓
"3 ON YOUR MIND"
↓
primary want ticket/card
↓
secondary stacked wants
↓
bottom navigation


## Home headline

Use:

PAUSE.

Large, heavy, editorial typography.

The word should be the strongest visual element.

Do not make it unnecessarily close to the Dynamic Island.

Maintain generous top breathing room.

## Add a want

Keep the black pill button.

However:
- reduce excessive shadow
- make it feel tactile
- use a simple + icon
- maintain consistent typography with navigation and other controls

## Wants presentation

Do NOT use the current awkward stacked-card arrangement.

The current secondary card appears partially underneath the main card in a way that looks accidental.

Replace it with a deliberate horizontal card stack / ticket deck.

### Interaction

The primary want is displayed prominently.

Additional wants appear as:
- offset cards behind it
- small visible edge/preview
- or a horizontal swipeable deck

The user should immediately understand:

"There are more wants here."

Use subtle depth.

Example:

PRIMARY CARD
        ↓
small visible portion of next card
        ↓
next card

Do NOT allow cards to overlap important information.


# 6. WANT CARD / TICKET SYSTEM

The want object should feel like a collectible ticket.

Do NOT make it look like a generic rounded finance card.

## Ticket silhouette

Use a rectangular ticket structure with:
- modest corner radius
- clear upper image section
- divider
- information section
- ticket-like side notches

The ticket MUST have the inward semicircular cut-outs in the middle of the left and right edges.

The cut-outs should visually resemble a real admission/train/event ticket.

Example concept:

|   IMAGE / VISUAL   |
|                    |
|------ ticket ------|
◖                  ◗
|                  |
| FUJIFILM X-A20    |
| $375              |
|------------------|
| 1.9 weeks        |
| 15h work         |
| 25 burgers       |
| 63 coffees       |

The inward cut-outs must be part of the actual ticket silhouette, not just decorative circles placed on top.

## Barcode

The barcode should NOT be mandatory.

Treat it as optional decorative/metadata content.

If included:
- make it subtle
- place it near the bottom
- do not let it dominate
- allow the barcode to be hidden entirely

The ticket should still look complete without a barcode.

## Ticket numbering

Use a tiny ticket identifier such as:

#0001

in the upper/lower metadata area.

This reinforces the collectible-ticket concept.

## Ticket animation

Create a subtle interaction concept for scrolling through wants.

When the user swipes horizontally:
- current ticket moves aside
- next ticket slides into focus
- cards behind shift forward
- slight scale/depth transition
- no excessive 3D rotation

Think:

physical stack of beautifully printed tickets.

Use spring-based motion.

The interaction should feel tactile, not gimmicky.


# 7. WANT IMAGE AREA

Each want should have an image/visual object.

For example:

Fujifilm X-A20

should show a tasteful camera image or product illustration.

The image area should feel editorial.

Do not simply place a product image on a white background.

Use:
- soft gradient field
- subtle oversized contextual object
- atmospheric lighting
- restrained opacity

The image should visually communicate the category.

Examples:

CAMERA:
camera/product silhouette

SHOES:
shoe

TRAVEL:
airplane/luggage/location visual

FITNESS:
fitness object

TECH:
device

The image treatment should be consistent across tickets.


# 8. "IN YOUR WORLD" / VALUE TRANSLATION

This is a major product differentiator.

The ticket should translate the purchase into the user's personal world.

For example:

$375

→ 1.9 weeks spending
→ 15 hours of work
→ 25 burgers
→ 63 coffees

Do NOT make these feel like random emoji statistics.

Use a consistent icon + number + label system.

Example:

[$ icon]
1.9 weeks
SPENDING

[clock icon]
15h
WORK

[burger icon]
25
BURGERS

[coffee icon]
63
COFFEES

Icons should be small, refined, and stylistically consistent.

Use simple line/solid hybrid icons rather than oversized emoji.

Allow user-selected comparison units from Profile.


# 9. CONTEXTS SCREEN

Contexts must occupy the FULL usable viewport.

The current version feels like a large coloured panel occupying only part of the screen.

Do NOT do this.

The Contexts screen itself should be an immersive spatial visualization.

Structure:

SAFE AREA
↓
header
↓
"Where your money wants to go."
↓
FULL-SCREEN CONTEXT FIELD
↓
bottom navigation

The contextual gradient field should extend almost to the bottom content boundary.

Do not leave a large arbitrary white section underneath it.

## Context visualization

Keep the atmospheric map concept.

Contexts should float within the space:

WORK
$679

HOBBIES
$375

FITNESS
$160

HOME & LIVING
STUDY & TECH
TRAVEL & TRIPS
PERSONAL

Use position and scale to create hierarchy.

Higher spending contexts can be slightly larger or visually stronger.

Lower activity contexts remain quieter.

Do NOT use conventional charts here.

This screen should feel spatial and exploratory.

## Interaction

Tap a context.

The selected context should gently expand/highlight.

Then show:
- wants inside the context
- total amount
- number of wants
- average price

Use a smooth transition rather than navigating abruptly.


# 10. INSIGHTS SCREEN — COMPLETE RESTRUCTURE

The current Insights screen has too many colours and an awkward grid.

Simplify it.

Insights should feel analytical but still belong to the same editorial product.

## Colour

Use mostly:
- black
- off-white
- muted lavender
- muted blue
- muted green

Avoid multiple saturated colours.

Colour should communicate meaning, not decoration.

## Layout

Do NOT use an uneven collection of floating cards.

Create a clear vertical information hierarchy.

Structure:

HEADER

"Your spending,
lately."

"Observations, not advice."

↓

DECISION BEHAVIOUR
Full-width card

4 considered
3 waiting
1 skipped
0 bought

↓

CONTEXT SPENDING
Full-width card

Work ━━━━━━━━━ $679
Hobbies ━━━━━ $375
Fitness ━━━━ $160

↓

KEY METRICS
2-column grid

$180
potential spending avoided

20 days
average decision time

$304
average want

↓

OBSERVATIONS
Full-width insight cards

"Work is your biggest area of desire."

"You tend to sit with purchases for 20 days before deciding."

The grid must have consistent:
- widths
- gutters
- vertical spacing
- card heights where appropriate

Do not leave an isolated card floating awkwardly on one side.

## Infographics

Introduce small, elegant infographics rather than decorative colour.

Examples:
- horizontal proportional bars
- decision funnel
- simple timeline
- spending-by-context bars
- waiting-time indicator

Charts should remain extremely simple.

No pie-chart overload.

No dashboard clutter.


# 11. PROFILE SCREEN

Profile should feel like a personal settings/identity page, not another analytics screen.

Structure:

SAFE AREA

WORTH IT? / pause mark

Profile
Edit

↓

AVAILABLE SPENDING

$400 / fortnight

↓

HOURLY RATE

$25 / hr

↓

MY COMPARISONS

burgers
coffees
short flights
cinema tickets

↓

PERSONALIZATION

Optional additional settings.

Use fewer giant cards.

Group related information into clean sections.

The visual weight should be calmer than Insights.

Profile should feel like:

"this is how WORTH IT understands my world."


# 12. ONBOARDING

The current onboarding has too much unused whitespace.

Use the space intentionally.

Do not simply enlarge the content.

Create an editorial onboarding composition.

Each onboarding screen should contain:

small WORTH IT? branding

large question

supporting explanation

interactive input

progress indicator

primary action

The content should sit around the visual centre of the screen rather than being pinned to the top.

## Onboarding progression

1.
What do you call your money?

Allowance
Salary
Casual income
Mixed
Other

2.
How much can you spend?

Available spending
$400 / fortnight

Hourly rate
$25 / hr

3.
How do you want things translated?

Choose comparisons.

Burgers
Coffees
Hours of work
Flights
Cinema tickets

4.
Finish with a clear brand moment:

WORTH IT?

PAUSE.
Then spend.

Do not create huge dead areas between sections.

Use subtle atmospheric gradients and a very faint oversized pause mark/question mark in the background.


# 13. NAVIGATION

The bottom navigation currently feels visually disconnected from the rest of the app.

Rebuild it.

Navigation must use the SAME typographic system as the rest of the app.

Use:

WANTS
CONTEXTS
+
INSIGHTS
PROFILE

But introduce simple icons.

Recommended icons:

WANTS
ticket / bookmark-like icon

CONTEXTS
four-point spatial/grid icon

ADD
large central + button

INSIGHTS
small bar-chart / pulse icon

PROFILE
person / circle icon

Icons should:
- be minimal
- match stroke weight
- match visual language
- remain secondary to labels

Do not use random icon styles.

## Active state

Active destination should use:
- darker typography
- small icon emphasis
- subtle indicator

Do NOT put an arbitrary orange rectangle around the selected item.

The previous orange outline clashes with the brand.

## Central add button

Keep the central black circular + button.

Make it a consistent component across every screen.

It should appear slightly elevated.

Do not let it overpower the navigation.


# 14. NAVIGATION TYPOGRAPHY

Navigation labels should use the same technical/mono label language used elsewhere.

Example:

WANTS
CONTEXTS
INSIGHTS
PROFILE

Small uppercase.

Consistent letter spacing.

Consistent baseline.

Active item slightly darker/bolder.

Do not mix serif, rounded sans, mono, and random weights in navigation.


# 15. COMPONENT SYSTEM

Create reusable components.

Components should include:

- AppHeader
- BrandMark
- PageHeader
- PrimaryButton
- AddWantButton
- BottomNavigation
- TicketCard
- TicketStack
- ContextField
- ContextNode
- InsightCard
- MetricCard
- ComparisonMetric
- ProgressIndicator
- OnboardingOption
- SectionLabel

All screens should use these components.

Do not manually recreate similar components with slightly different spacing.


# 16. SPACING SYSTEM

Use a consistent spacing scale.

Base:

4px

Then:

8
12
16
20
24
32
40
48
64

Primary screen horizontal inset:

24px approximately.

Maintain the same left/right grid throughout the app.

Cards should use consistent internal padding.

Do not allow individual screens to invent their own spacing.


# 17. RESPONSIVE BEHAVIOUR

This is essential.

Do not design only for one iPhone frame.

Use responsive constraints.

Support:
- smaller iPhones
- modern Dynamic Island devices
- taller devices

Headers should respond to safe areas.

Cards should resize naturally.

Typography should remain balanced.

Bottom navigation should respect the home indicator.

No critical content should be positioned using absolute coordinates tied to one phone size.


# 18. MOTION LANGUAGE

Use subtle motion throughout.

Motion should reinforce the "pause" concept.

Examples:

Opening a want:
card gently expands.

Swiping tickets:
physical ticket stack motion.

Opening a context:
context expands into focus.

Insights:
bars subtly animate into their final values.

Navigation:
small crossfade/slide.

Do NOT use:
- excessive bouncing
- spinning
- dramatic 3D rotations
- flashy gradients
- unnecessary particle effects


# 19. BRAND BACKGROUND ELEMENT

Use the pause mark as a recurring environmental element.

Example:

A huge:

||

or

?

very faintly embedded into the background.

It should look almost like an embossed/3D object hidden inside the gradient.

Possible treatment:

large translucent pause bars
+
soft blur
+
subtle shadow
+
very low opacity

The element should sometimes be partially cropped by the viewport.

This creates brand recognition without requiring a logo in every header.

Do NOT make it obvious or decorative.


# 20. VISUAL CONSISTENCY CHECK

Before finishing, compare all primary screens side-by-side:

HOME
CONTEXTS
INSIGHTS
PROFILE
ONBOARDING

They must feel like the same app.

Specifically verify:

[ ] Same left header alignment
[ ] Same top safe-area treatment
[ ] Same typography
[ ] Same label system
[ ] Same navigation
[ ] Same central + button
[ ] Same card radius language
[ ] Same background gradient family
[ ] Same icon language
[ ] Same spacing scale
[ ] Same visual density
[ ] Same brand mark
[ ] Same interaction language


# 21. FINAL DESIGN PRINCIPLE

The product should feel like a beautifully designed pause button for spending.

Not a budgeting app.

Not a banking app.

Not a dashboard.

The experience should communicate:

"I want this."

↓

"Pause."

↓

"See what this actually means in my world."

↓

"Decide."

The UI should make that emotional journey visible.

Prioritize hierarchy, whitespace, typography, tactile cards, atmospheric gradients and consistency over adding more UI elements.