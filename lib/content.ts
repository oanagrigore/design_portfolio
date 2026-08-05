export const profile = {
  name: 'Oana Grigore',
  role: 'Senior Product Designer',
  location: 'Bucharest, Romania',
  email: 'grigore.oana.elena@gmail.com',
  phone: '+40 742 090 361',
  aboutIntro: [
    `Currently leading design strategy across 5 transportation brands, including MediDrive, a non-emergency medical transport (NEMT) platform serving millions of members across Virginia and Colorado, where WCAG accessibility is a mandatory baseline.`,
    `I created the core design system used across all MediDrive touchpoints and led the complete UX/UI redesigns for the Member Mobile App and Member Web Portal, making healthcare transport effortless for members.`,
    `Backing this is an 8+ year specialization in complex web applications, including scaling 40+ Shopify apps for 30,000+ merchants, and a 14-year foundation spanning visual, graphic, and product design.`
  ],
  intro:
    'I lead design across brands, from first click to finished flow, with accessibility built in from the start, because a confusing product fails the people who need it most.',
  avatar: '/oana-avatar.png',
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/oanagrigore' },
    { label: 'Dribbble', href: 'https://dribbble.com/oelenagrigore' },
  ],
}
export interface Highlight {
  value: string;
  title: string;
  description: string; // Add this field
}

export const highlights: Highlight[] = [
  {
    value: 'Millions+',
    title: 'Rider Reach & System Scale',
    description:
      'Designed the MediDrive Member App, Web Portal, and unified design system powering non-emergency healthcare transport across Virginia and Colorado.',
  },
  {
    value: '+8%',
    title: 'Addressable Market Growth',
    description:
      'Advanced accessibility across core applications to align strictly with WCAG guidelines, expanding overall market reach and compliance.',
  },
  {
    value: '+40%',
    title: 'Design Consistency',
    description:
      'Built a tokenized multi-brand design system across production web applications, cutting design debt by 15% and accelerating handoffs.',
  },
  {
    value: '+75%',
    title: 'Startup CSAT Lift',
    description:
      'Guided early-stage startups in establishing online presences and product flows, driving measurable improvements in customer satisfaction.',
  },
]

export type CaseStudyDecision = {
  title: string
  problem: string
  change: string
  why: string
}

export type CaseStudyImage = {
  src: string
  alt: string
  caption?: string
  // Natural pixel dimensions. When provided, the image renders at its natural
  // aspect ratio (never cropped). When omitted, it falls back to a 16:9 frame.
  width?: number
  height?: number
  // When set, the image renders directly after the bullet at this index.
  // Otherwise it renders after the bullet list.
  afterBullet?: number
  afterDecision?: number 
}

export type CaseStudySection = {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
  callout?: string
  decisions?: CaseStudyDecision[]
  images?: CaseStudyImage[]
}

export type CaseStudy = {
  slug: string
  title: string
  summary: string
  cover: string
  year: string
  client: string
  role: string
  tags: string[]
  overview: string
  challenge: string
  approach: string
  outcome: string
  metrics: { label: string; value: string }[]
  // Optional rich content — when present, the case study page renders a
  // detailed, sectioned layout instead of the simple overview format.
  quickSummary?: { label: string; value: string }[]
  sections?: CaseStudySection[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'medidrive-member-portal',
    title: 'Redesigning the MediDrive member portal',
    summary:
      'A heuristic + accessibility-led redesign of a Medicaid non-emergency medical transportation (NEMT) portal — audited flow by flow, rebuilt in light and dark mode with state-specific variants and designed to WCAG 2.1 AA.',
    cover: '/work/MediDrive-portal-cover.png',
    year: '2026',
    client: 'MediDrive',
    role: 'Lead Product Designer',
    tags: ['Product design', 'Accessibility', 'UX Audit', 'Design Systems'],
    overview:
      'MediDrive lets members book and manage rides to medical appointments. The audience skews older, less tech-savvy, and benefit-dependent. I led a flow-based heuristic and accessibility audit of the member portal and partnered with Senior Product Designer Liviu to completely redesign the web portal and app in light and dark mode, including state-specific variants.',
    challenge:
      'The portal had accreted features over time by borrowing mental models from operational and dispatcher tooling. This led to silent failures, premature error states, and severe accessibility barriers that forced members to rely on costly support phone calls.',
    approach:
      'Audited four primary journeys against Nielsen’s heuristics and WCAG 2.1 AA. Anchored the redesign around three core principles: eliminating silent failure states, replacing operational dispatcher grids with intuitive member tables, and baking WCAG 2.1 AA keyboard/contrast accessibility into every component.',
    outcome:
      'A complete, accessibility-first redesign across portal and mobile app surfaces in light and dark mode, backed by a comprehensive 90-day measurement plan targeting onboarding completion, self-service rates, and support call reduction.',
    metrics: [
      { label: 'Accessibility', value: 'WCAG 2.1 AA' },
      { label: 'Theme Support', value: 'Light & Dark' },
      { label: 'State Variants', value: 'UX for elderly users' },
    ],
    quickSummary: [
      { label: 'My role', value: 'Lead Product Designer (Audit, Architecture, Accessibility)' },
      {
        label: 'Team',
        value: 'Co-redesigned with Liviu (Senior Product Designer).',
      },
      {
        label: 'Scope',
        value:
          'Flow heuristic audit, portal & mobile app redesign, light & dark modes, state-specific variant system (Colorado), accessibility compliance specification.',
      },
      {
        label: 'Status',
        value: 'Design complete & specified; awaiting implementation & conformance testing.',
      },
    ],
    sections: [
      {
        heading: 'Context',
        paragraphs: [
          'MediDrive lets members book and manage rides to medical appointments. The audience skews older, less tech-savvy, and benefit-dependent — a group for whom a failed booking isn’t a minor annoyance, it’s a missed appointment. That single fact set the bar for the whole redesign: the portal has to make the next step obvious and never fail silently.',
          'The existing portal had accreted feature by feature, borrowing patterns from operational/dispatcher tooling that were wrong for members. So I audited it before touching the UI.',
          'My role — Lead Product Designer. I led the audit, flow architecture, and accessibility. I partnered with Liviu, the other Senior Product Designer on the team, to fully redesign the member app and portal in light and dark mode.',
          'Status: design complete, not yet in development. The problems below are audited and evidenced; the solutions are designed and specified. Accessibility is designed-in and specified to WCAG 2.1 AA, but not yet implemented or conformance-tested — so this study is honest about what’s proven versus what’s proposed.',
        ],
        images: [
          {
            src: '/work/portal-light-dark.png',
            alt: 'Full bleed overview showing the redesigned MediDrive portal in both light and dark mode.',
            caption: 'The redesigned MediDrive member experience: task-focused portal and app interfaces in light and dark modes.',
          },
        ],
      },
      {
        heading: 'The audit',
        paragraphs: [
          'I ran a flow-based heuristic evaluation, not a screen skin, across the four journeys that mattered to the business: New user, Existing user, Multiple members, and Mobile. Each was evaluated against Nielsen’s 10 usability heuristics (Nielsen Norman Group) and WCAG 2.1 AA (W3C) — because a Medicaid-adjacent product carries a usability and a legal-conformance obligation.',
          'The findings clustered into five core themes:',
        ],
        bullets: [
          'Silent failures and dead-end states: The portal repeatedly put users into blocked states without telling them why or what to do (e.g., multi-leg booking disabling "Continue" without feedback, missing service levels blocking progress without explanation). Violates Heuristics #1 & #9; WCAG 3.3.1 & 4.1.3.',
          'Operational tool wearing a member’s clothes: Layouts borrowed dispatcher mental models (dense operational grids, searching by Trip ID, jargon like "Legs") rather than providing intuitive tables and member-first flows. Violates Heuristics #2 & #8.',
          'Critical accessibility failures: Inputs that could not be completed via keyboard (WCAG 2.1.1 Level A failure), pervasive low-contrast elements (WCAG 1.4.3), and insufficient badge font sizes for older adults.',
          'Error and empty states that mislead: Premature error states that alarmed elderly users into thinking they made mistakes, alongside confusing and misleading empty panel states.',
          'Orientation and feedback gaps: Lack of branding/location hints, no multi-step registration progress indicators, and transient feedback/tooltips that vanished before being read.',
        ],
        callout:
          'Audit Highlight (State-Sync Defect): In the multiple-members flow, selecting a member from the dropdown failed to update the trip list automatically, forcing manual page refreshes. A functional defect the redesign solved structurally.',
        images: [
          {
            src: '/work/portal-audit.png',
            alt: 'Full-bleed heuristic audit analysis mapping screen flaws to Nielsen heuristics and WCAG AA guidelines.',
            caption: 'Flow-based heuristic and accessibility audit matrix mapping critical user friction points.',
            afterBullet: 4,
          },
        ],
      },
      {
        heading: 'Principles',
        paragraphs: [
          'Three non-negotiables, drawn straight from the audit findings, guided every interface decision:',
        ],
        bullets: [
          'No silent states: Every disabled control, block, or error explains itself explicitly and offers a clear way forward.',
          'Members are not dispatchers: Familiar, scannable, task-focused patterns (tables over operational grids); zero internal jargon.',
          'Accessibility is the floor: Keyboard operability and AA contrast designed in from the flow up, verified against WCAG 2.1 — with older adults as the primary design target, not an edge case.',
        ],
      },
      {
        heading: 'The redesign',
        paragraphs: [
          'I rebuilt all four flows and delivered the full screen set in light and dark mode, plus a Colorado state-specific variant set (state Medicaid programs differ in requirements and language — handled as a deliberate variant layer, not hardcoded exceptions).',
        ],
        decisions: [
          {
            title: 'Clear, self-explaining error & block states',
            problem:
              'Users were frequently blocked by disabled buttons or silent validation errors without feedback.',
            change:
              'Redesigned every form and action point so that disabled buttons display contextual helper messages indicating missing required fields.',
            why: 'Eliminates guesswork and keeps anxious or less tech-savvy members moving forward without needing to call support.',
          },
          {
            title: 'Task-focused member tables over operational grids',
            problem:
              'Members had to parse multi-column dispatcher tables with internal jargon like "Trip IDs" and "Legs".',
            change:
              'Replaced dense grids with clean, scannable member tables highlighting date, destination, driver status, and simple human actions.',
            why: 'Aligns with the member mental model, drastically lowering cognitive load and reading friction.',
          },
          {
            title: 'First-run member onboarding priority',
            problem:
              'First-time logins immediately dropped users into booking forms without identifying who the trip was for.',
            change:
              'Structured first-run onboarding to prioritize adding a member and confirming Medicaid details prior to booking.',
            why: 'Prevents the most expensive error in the ecosystem — booking a medical trip under the wrong account.',
          },
        ],
        images: [
          {
            src: '/work/portal-figma.png',
            alt: 'Full-bleed layout comparing member portal dashboard screens across Light, Dark, and Colorado state modes.',
            caption: 'The complete redesign ecosystem: rendered across light mode, dark mode, and state-specific Medicaid variants.',
          },
        ],
      },
      {
        heading: 'Designing for accessibility (design stage)',
        paragraphs: [
          'The portal isn’t in development yet, so I’m not claiming verified conformance — there’s no built product to test. What I can show is accessibility designed in from the flow up, targeting WCAG 2.1 AA, with the specific failures from the audit resolved in the design:',
        ],
        bullets: [
          'Keyboard operability — the audit’s most serious finding, "these inputs can’t be filled out by using a keyboard" (WCAG 2.1.1, Level A), designed out completely.',
          'Contrast — AA-contrast tokens replacing the repeated low-contrast callouts (WCAG 1.4.3).',
          'Error identification and status — errors that no longer fire prematurely, and blocked states that explain themselves (WCAG 3.3.1, 4.1.3) — the change that most directly protects an anxious, older user from thinking they’ve done something wrong.',
        ],
        callout:
          'The honest next step is verification against the built product — an accessibility audit plus usability sessions with real members — before any formal conformance claim is made.',
        images: [
          {
            src: '/work/portal-btns.png',
            alt: 'Full-bleed diagram showing focus ring indicators, high-contrast touch targets, and typography specs.',
            caption: 'Accessibility specifications: keyboard focus navigation states, 44px+ touch targets, and WCAG AA contrast rules.',
            afterBullet: 2,
          },
        ],
      },
      {
        heading: 'How we’ll measure success',
        paragraphs: [
          'No reliable pre-redesign baseline existed, so this is a measurement plan, not a results claim: baseline is established at launch and actuals reported at 90 days. Four metrics tracked from day one, each tied to a problem the audit surfaced:',
        ],
        bullets: [
          '1. Onboarding completion rate: % of users who finish profile setup and make their first booking without calling for help. (Tests theme 5: no multi-step hint, weak orientation.)',
          '2. Self-service rate: % of bookings completed independently: no dispatcher contact, no support call. (Tests theme 2: operational-tool complexity pushing members to call in.)',
          '3. Booking error rate: % of submitted bookings requiring correction, cancellation, or support contact. (Tests themes 1 and 4: silent failures and misleading error states.)',
          '4. Support contact rate: Inbound support contacts per 100 booking attempts — the clearest single signal of user friction.',
        ],
      },
      {
        heading: 'Reflection',
        paragraphs: [
          'Designing for older, less tech-savvy members was a new challenge for me. The lens I used was my own parents: build something they could use on their own, with feedback at every step — feedback that guides rather than alarms. That’s not a sentiment; it’s a design rule that shows up in specific decisions here. It’s why "the error state appears too early… may cause them to stop or second-guess themselves" was flagged critical, why no state is allowed to fail silently, and why the whole point is a member who can complete a booking without calling for help.',
          'I’ll also be honest about the limit of that lens: imagining my parents is empathy, not evidence. It’s a strong starting point, but the design still needs to be validated with real members before launch — usability sessions with actual older adults are the next step, and the measurement plan above is how I’ll know whether the empathy held up.',
        ],
      },
    ],
  },
  {
    slug: 'design-system-redesign',
    title: 'MediDrive: Scaling Accessibility Across an Enterprise Healthtech Ecosystem',
    summary:
      'How a design system built as governance infrastructure made a consistent, accessible redesign of a NEMT member portal and app possible at ecosystem scale.',
    cover: '/work/MediDrive-ds-cover.png',
    year: '2026',
    client: 'MediDrive',
    role: 'Lead Product Designer',
    tags: ['Product design', 'Accessibility', 'Design Systems'],
    overview:
      'MediDrive is a US non-emergency medical transportation (NEMT) service whose members are largely Medicaid beneficiaries aged 65+, many with low digital confidence. I owned the design system and led the end-to-end redesign of both the member portal and the app.',
    challenge:
      'The existing product carried the assumptions of the operation that built it, not the people using it — and there was no shared system to keep an ecosystem of portals consistent or accessible.',
    approach:
      'I made a strategic bet to build the design system as a governance layer first, so consistency and accessibility became structural instead of discretionary, then redesigned each surface around member reality.',
    outcome:
      'The system became the backbone of the redesign, letting a separate development team ship consistent, accessible screens across surfaces — with a clear plan to measure impact on avoidable support calls.',
    metrics: [
      { label: 'Avoidable support calls (target)', value: '15–20%' },
      { label: 'Accessibility standard', value: 'WCAG 2.1 AA' },
      { label: 'Surfaces redesigned', value: 'Portal + App' },
    ],
    quickSummary: [
      { label: 'My role', value: 'Lead Product Designer' },
      {
        label: 'Scope',
        value:
          'Owned the design system, led the end-to-end redesign of both the portal and the app, and coordinated delivery with a separate development team.',
      },
      {
        label: 'Team',
        value:
          'Co-built the design system with one other product designer, worked with content/strategy partners on copy, and handed off to a development team operating under a separate project manager.',
      },
      {
        label: 'Primary metric (target)',
        value: '15–20% reduction in avoidable support calls',
      },
      {
        label: 'Timeline',
        value: 'Started spring 2026 (March–April); ongoing.',
      },
    ],
    sections: [
      {
        heading: 'Context',
        paragraphs: [
          'MediDrive is a US non-emergency medical transportation (NEMT) service. Its members are largely Medicaid beneficiaries aged 65+, many with low digital confidence, and a significant share of bookings are made on behalf of a member by a caregiver or facility staffer.',
          "The platform is not one product — it's an ecosystem of portals serving different audiences: medical facilities, transportation providers, members, and dispatchers. Each has a different job, but they all sit on the same underlying booking and trip data.",
          'This case study focuses on the member surface: a web portal and a mobile app for booking, managing, and tracking medically necessary rides plus mileage reimbursement. The design system was built to serve all of those portals, which is the reason it exists at all.',
        ],
      },
      {
        heading: 'The problem',
        paragraphs: [
          'The existing product carried the assumptions of the operation that built it, not the people using it.',
        ],
        bullets: [
          'The portal was built for dispatchers, not members. The trip list was laid out for staff scanning across many members, so members reading their own trips had to parse a table designed for someone else\u2019s job.',
          "Members were dropped straight into a booking form after login, with no guidance that their first step was to add a member — and no signal that the account they created wasn't the member's.",
          'The booking form was one-size-fits-all. The same fields appeared whether the trip was one-way, round trip, or multi-leg, and errors surfaced after submission — so a caregiver booking on behalf of someone had no confirmation of who the trip was for until it was too late to fix cheaply.',
          'There was no design system. Colors, components, and patterns were inconsistent across surfaces, so every new screen re-litigated basic decisions and accessibility was applied case by case.',
          "The audience amplifies every one of these. For a 65+ Medicaid population, the cost of a confusing flow isn't a bounce — it's a missed medical appointment and a call to a support line.",
        ],
        images: [
          {
          src: '/work/medidrive-dispatcher-view.png',
          alt: 'The original MediDrive trip console: a dense dispatcher-oriented list of trips with status pills, a trip-detail panel, and a large route map — built for staff scanning across many members rather than a single member reading their own trips.',
          caption:
            'The original console — a dispatcher tool members were expected to read as their own trip list.',
          afterBullet: 0,
        },
        {
          src: '/work/portal-booking-1.png',
          alt: 'The original post-login experience: a member is dropped straight into a booking form with no onboarding step and no prompt to add the member who needs transportation, and no indication that the account just created is not the member’s own.',
          caption: 'Login dropped members directly into a booking form — no guidance that the first step was to add a member, and no signal the account wasn’t the member’s.',
          afterBullet: 1,
        },
        {
          src: '/work/portal-booking-2.png',
          alt: 'The original one-size-fits-all booking form: the same fields shown regardless of trip type (one-way, round trip, or multi-leg), with a validation error surfaced only after submission rather than at the point of entry.',
          caption: 'One form for every trip type, with errors appearing only after submit — so a caregiver booking for someone else had no confirmation of who the trip was for until it was too late to fix cheaply.',
          afterBullet: 2,
        }
      ],
        callout:
          'The strategic problem underneath all of this: you cannot redesign two surfaces consistently, accessibly, and at multi-brand scale by hand-crafting screens. The bottleneck isn\u2019t design taste, it\u2019s the absence of a system and a governance model — so I sequenced the work accordingly.',
      },
      
      {
        heading: 'The strategic bet: system first',
        paragraphs: [
          'The decision that shaped everything: build the design system as the governance layer before redesigning at scale, so consistency and accessibility become structural instead of discretionary.',
          'The forcing function was the ecosystem itself. With separate portals for facilities, providers, members, and dispatchers, there is no way to keep the experience coherent — or to change one color, component, or contrast ratio once and have it hold everywhere — without a shared token layer they all consume. A per-portal approach would have re-litigated the same decisions four-plus times and guaranteed drift.',
          "This is deliberately an outcomes-over-output framing: the system's job isn't to produce more components faster — it's to make \u201cconsistent and accessible\u201d the path of least resistance for everyone building on it, including a dev team I don't manage.",
        ],
      },
      {
        heading: 'What I built: the design system',
        paragraphs: [
          'The system is a two-tier token architecture, primitives resolving into semantics, following standard atomic design and token practice.',
        ],
        bullets: [
          'Primitives hold every raw value. They carry no meaning and are never referenced directly in components.',
          'Semantics alias primitives to a role. No semantic token holds a raw hex; it always points to a primitive. This is the governance mechanism, not a nicety — theming, dark mode, and rebrands change one layer, and component authors physically cannot hardcode a value that escapes the system.',
          'Light and dark modes resolve through the semantic layer, so a token never fails to resolve for a developer.',
          'Accessibility is baked into the tokens. WCAG 2.1 AA was applied to color and component decisions at the token level. Contrast is a property of the system, not a per-screen check.',
          'A single icon component set keeps icon usage consistent and swappable.',
        ],
        images: [
          {
          src: '/work/primitives.png',
          alt: 'Primitives hold every raw value',
          caption:
            'The list of primitive colors',
          afterBullet: 0,
        },
        {
          src: '/work/semantics.png',
          alt: 'Semantics alias primitives to a role. No semantic token holds a raw hex; it always points to a primitive',
          caption:
            'Semnatics alias.',
          afterBullet: 1,
        }
      ],
      },
      {
        heading: 'How the system enabled the redesign',
        paragraphs: [
          'With the system in place, the redesign became a series of decisions grounded in members and caregivers reality.',
        ],
        decisions: [
          {
            title: 'Unified sign-in with a member-first first run',
            problem:
              'Conventional sign-in forces users to know in advance whether they already have an account, and onboarding usually starts with account administration rather than the reason they came.',
            change:
              'One entry point takes an email or phone number; the system recognizes the person and routes returning vs. first-time users automatically. For a first-time user, the very first step is adding the member who needs transportation, with support for multiple members, then booking a first trip immediately.',
            why: 'It removes a decision the audience shouldn\u2019t have to make and orders onboarding around the real goal — getting a ride booked — instead of account setup.',
          },
          {
            title: 'Dashboard as the landing surface',
            problem:
              'Login dropped members into a booking form with no context.',
            change:
              'Members now land on a dashboard; if a trip is active, driver details and pickup time are front and center, with shortcuts to trip history, reimbursements, and addresses.',
            why: 'It answers the highest-anxiety question first, so most members never navigate further. Booking starts when the member decides to book — not the instant they log in.',
          },
          {
            title: 'Trip-type selector opens the booking flow',
            problem:
              'One form for every trip type; return legs re-typed by hand; problems discovered only after submit.',
            change:
              'The flow opens with a trip-type choice (round trip / one-way / multi-leg). Round trip auto-fills the return leg; one-way removes the return section entirely; fields adapt to the selection.',
            why: 'Fewer fields per path, no duplicate data entry, and the form\u2019s shape matches the member\u2019s actual intent.',
          },
          {
            title: 'Member confirmation before any field is touched',
            problem:
              'A caregiver or facility staffer booking on behalf of someone found out too late if they had the wrong member.',
            change:
              'Member identity (Medicaid ID, DOB) is confirmed at the top of the flow.',
            why: 'The most expensive error — booking a medical ride for the wrong person — is caught before it can happen.',
          },
          {
            title: 'Inline, specific error handling',
            problem:
              'Errors surfaced after submission, generating support calls.',
            change: 'Validation is inline and specific at the point of entry.',
            why: 'Recovery happens in-flow, matching the prevent-errors and help-users-recover heuristics.',
          },
          {
            title: 'Trip list rebuilt for the member',
            problem: 'The trip layout overview was appropiated to a dispatcher or operational tool. It introduced unnecessary complexity for members and increases cognitive load without adding real value to their core tasks. ',
            change:
              'A table layout it is more intuitive, task-focused and more familiar structure that’s easy to scan and understand, especially for less tech-savvy users.',
            why: 'No training required to read your own trips.',
          },
        ],
        images: [
          {
          src: '/work/md-email-entry.png',
          alt: 'The redesigned MediDrive sign-in: a single entry field accepting either an email address or phone number, with no separate sign-up path — the system recognizes the person and routes returning versus first-time users automatically.',
          caption:'One entry point — email or phone. Returning and first-time members are routed automatically, so no one has to know in advance whether they have an account.',
          afterDecision: 0,
        },
        {
          src: '/work/dashboard-portal.png',
          alt: 'The redesigned member dashboard as the landing surface after login: an active trip shown front and center with driver details and pickup time, plus shortcuts to trip history, reimbursements, and saved addresses.',
          caption:'The dashboard answers the highest-anxiety question first, “is my ride happening?”. So most members never need to navigate further.',
          afterDecision: 1,
        },
        {
          src: '/work/trip-selection.png',
          alt: 'The start of the redesigned booking flow: a trip-type selector offering round trip, one-way, and multi-leg. The choice reshapes the form, round trip auto-fills the return leg, one-way removes the return section entirely.',
          caption: 'The flow opens with a trip-type choice, so each path shows only the fields it needs and the return leg is never re-typed by hand.',
          afterDecision: 2,
        },
        {
          src: '/work/confirmation.png',
          alt: 'The member-confirmation step at the top of the booking flow: the member’s identity — Medicaid ID and date of birth — surfaced for confirmation before any trip fields are filled in.',
          caption:'Member identity is confirmed before any field is touched, so the most expensive error — booking a medical ride for the wrong person — is caught up front.',
          afterDecision: 3,
        },
        {
          src: '/work/errors.png',
          alt: 'The redesigned booking form showing inline validation: a specific, field-level error message displayed next to the input at the point of entry, rather than a generic error after submission.',
          caption: 'Validation is inline and specific at the point of entry, so members recover in-flow instead of calling support after a failed submit.',
          afterDecision: 4,
        },
        {
          src: '/work/trip-list.png',
          alt: 'The redesigned member trip list: one clear row per trip showing member, date, status, treatment, pickup, and drop-off — a simple, member-oriented layout in place of the dispatcher console.',
          caption: 'A member-oriented trip list built to be scanned without training — each row is one trip, in plain terms.',
          afterDecision: 5,
        }
      ],
      },

      {
        heading: 'Accessibility as risk management',
        paragraphs: [
          'For a Medicaid NEMT product, accessibility is legal exposure (ADA / Section 508), not polish. I treated it that way. And a mandatory request from the states.',
        ],
        bullets: [
          'WCAG 2.1 AA applied at the token and component level, contrast is a property of the system, not a per-screen check.',
          'Concrete targets: minimum body text size, 44px touch targets, 4.5:1 contrast, and plain language pitched to the member audience.',
          "Design decisions carried the accessibility load so individual builders didn't have to re-derive it.",
        ],
        callout:
          'I made accessibility structural rather than discretionary, so every screen built on the system inherits it by default.',
      },
      {
        heading: 'Impact',
        paragraphs: [
          'This program is in progress, so this section states a target and a measurement plan, not achieved results. No number here is claimed as proven.',
          'Primary success metric (target): reduce avoidable, self-service-able support calls by 15–20%. This targets specific call reasons — wrong-member bookings, unexplained booking failures, "is my ride happening?", and login confusion — not total call volume, and it is not an attempt to remove the phone as a channel. For a 65+ Medicaid audience the phone is often the appropriate channel; the goal is only to stop generating calls a member never should have needed to make.',
          'The target is only provable if support calls are tagged by reason code, with a baseline captured before rollout and the same categories tracked after. Naming the measurement condition, rather than asserting the number, is what a numerate reader trusts.',
        ],
      },
    ],
  },
  {
    slug: 'omni-limousine',
    title: 'Omni Limousine: Driving direct bookings through a premium web experience',
    summary:
      'Redesign and Webflow build of the web experience for a premium chauffeur service in Las Vegas and Miami, turning a static brand site into a direct-booking channel.',
    cover: '/work/omni-cover.png',
    year: '2026',
    client: 'Omni Limousine',
    role: 'Lead Product Designer',
    tags: ['Product design', 'Webflow', 'UX/UI', 'Design Systems'],
    overview:
      "Omni Limousine has run a premium chauffeur service since 1998, but almost all of its bookings came through partnerships rather than its own website. I redesigned and rebuilt it in Webflow around one goal: turn the website into a direct-booking channel with booking reachable from anywhere on the site.",
    challenge:
      "The old site looked dated, didn't reflect the quality of the real-world service, and wasn't built to convert. Direct web bookings were a small share of volume, and the brand read as generic rather than approachable luxury.",
    approach:
      "I anchored the redesign in three principles: approachable luxury, a distinct Las Vegas at night visual identity, and a 'book from anywhere' strategy with a responsive, omnipresent booking widget built natively in Webflow.",
    outcome:
      "A cohesive, high-converting Webflow web experience paired with a redesigned 4-step booking widget integrated into Omni's reservation platform.",
    metrics: [
      { label: 'Direct bookings (target)', value: '+20%' },
      { label: 'Scope', value: 'UX, UI & Webflow' },
      { label: 'Markets', value: 'Las Vegas & Miami' },
    ],
    quickSummary: [
      { label: 'My role', value: 'Lead Product Designer (solo end-to-end)' },
      {
        label: 'Scope',
        value:
          'Full website redesign, UX/UI for the booking experience, content structure, and front-end Webflow build.',
      },
      {
        label: 'Team',
        value:
          'Solo design and Webflow build. Collaborated with a backend developer who connected the booking widget to Omni’s reservation platform.',
      },
      {
        label: 'Primary metric (target)',
        value: '20% increase in direct web bookings',
      },
    ],
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'Omni Limousine has run a premium chauffeur service since 1998, but almost all of its bookings came through partnerships — hotels, concierges, referrals — rather than its own website.',
          'The old site looked dated, didn’t reflect the quality of the real-world service, and wasn’t built to convert. I redesigned and rebuilt it in Webflow around one goal: turn the website into a direct-booking channel, with booking reachable from anywhere on the site.',
          'Because the previous site collected no analytics and the new one launched without instrumentation, this case study is about the problem, the decisions, and the craft — not a measured lift. I’ve kept the line between result and hypothesis explicit throughout.',
        ],
      },
      {
        heading: 'The problem',
        paragraphs: [
          'Omni’s reputation lived offline. Repeat clients and partners knew the service was reliable and discreet; new customers landing on the website saw none of that. Two problems compounded:',
        ],
        bullets: [
          'The website wasn’t a booking channel: Direct web bookings were a small share of volume; the business leaned on partnership referrals. Growing direct bookings meant the site had to build trust and remove friction on its own.',
          'The brand read as neither premium nor approachable: The old design looked like a generic black-and-white chauffeur template. It didn’t signal luxury, and it didn’t feel welcoming to the broad audience Omni actually serves — event guests, business travelers, and families, not only executives.',
        ],
        callout:
          'The target set for the project was a 20% increase in direct web bookings. To be precise: that was the target the design worked toward, not an outcome I can claim.',
      },
      {
        heading: 'My role and constraints',
        paragraphs: [
          'I was the only designer, and I also built the site, owning the UX, UI, content structure, and Webflow implementation end to end. The booking flow (its steps, fields, states, and logic) was my design; a backend developer wired the resulting widget into Omni’s reservation platform.',
          'Two constraints shaped the work:',
        ],
        bullets: [
          'A fixed booking platform: The reservation back-end was a given, so I designed the flow around what it could support rather than in a vacuum.',
          'No baseline: With no analytics on the old site, I had nothing to diagnose from. I worked from the booking platform’s structure, competitor patterns, and a set of explicit behavioral assumptions that I treated as hypotheses to design against, not as facts.',
        ],
      },
      {
        heading: 'Approach',
        paragraphs: [
          'I anchored the redesign in three core principles:',
        ],
        bullets: [
          'Approachable luxury: Omni serves a wide audience, so the site had to feel premium without being intimidating or exclusive. In practice that meant clean layouts, clear and literal language, readable typography, and straightforward service explanations — luxury you don’t have to decode.',
          'A visual identity built on Las Vegas at night: To break from the generic black-and-white chauffeur look, I built the palette around the city where Omni operates best: deep charcoals for a cinematic base, purple gradients evoking dusk over the strip, and gold accents for warmth and signal. The intent was instant recognizability and clear differentiation from competitors.',
          'Book from anywhere: If the site was going to become a booking channel, booking couldn’t sit on one buried page. I placed an above-the-fold booking widget on the homepage and booking entry points throughout — in the hero, on fleet cards, inside service descriptions, and beside social proof — so the shortest path to a reservation was always one click away.',
        ],
      },
      {
        heading: 'The booking experience',
        paragraphs: [
          'This was the center of the project.',
        ],
        decisions: [
          {
            title: 'Shift from isolated flow to omnipresent entry point',
            problem:
              'The old booking flow was a six-step, single-purpose journey — Reservation, Vehicle, Options, Passenger, Payment, Confirmation — that lived on its own page, disconnected from the rest of the site.',
            change:
              'Reframed booking as something available everywhere, starting with an above-the-fold homepage widget that opens the flow immediately.',
            why: 'A customer no longer has to hunt for the booking page; the entry point is available the second they land or browse any service.',
          },
          {
            title: 'Trip-type first initialization',
            problem:
              'Users faced overwhelming form fields right at the start before defining their core intent.',
            change:
              'The trip type is chosen up front (one-way / return, hourly / as-directed, and security services), revealing only essential fields to start — pickup, drop-off, date, and time.',
            why: 'Reduces cognitive load and allows the reservation to progress naturally into vehicle and detail selection.',
          },
          {
            title: 'Designing edge cases and error states',
            problem:
              'Traditional booking forms fail silently or obscurely when inputs are invalid, causing drop-offs.',
            change:
              'Designed explicit states for empty fields, invalid inputs, and moments where a booking can stall.',
            why: 'Designing for where a flow breaks is what makes it a dependable product rather than just a web form.',
          },
        ],
        images: [
          {
            src: '/work/omni-widget.png',
            alt: 'The redesigned Omni Limousine hero section featuring the inline booking widget with trip type tabs and immediate location inputs.',
            caption: 'The homepage hero widget puts booking front and center with minimal initial friction.',
            afterDecision: 0,
          },
          {
            src: '/work/omni-vehicle.png',
            alt: 'Mobile view of the Omni Limousine booking flow showing thumb-friendly inputs and clear steps.',
            caption: 'Optimized for mobile users who frequently book close to pickup.',
            afterDecision: 1,
          },
        ],
      },
      {
        heading: 'Designing and building it in Webflow',
        paragraphs: [
          'I built the entire site in Webflow, not a design handed off to someone else. That meant translating the system into real, responsive components, wiring the CMS, and collaborating with the backend developer at the one seam where my booking UI met Omni’s reservation platform.',
          'Owning both design and build kept the shipped product faithful to the intent and let me iterate directly instead of through a handoff round-trip.',
        ],
        images: [
          {
            src: '/work/omni-webflow.png',
            alt: 'Webflow component structure and layout system designed for the Omni Limousine website.',
            caption: 'Modular Webflow components designed for seamless responsiveness and CMS integration.',
          },
        ],
      },
      {
        heading: 'Outcome and how I’d measure it',
        paragraphs: [
          'The honest version: there are no performance metrics. The old site tracked nothing, so there’s no baseline; the new site shipped without analytics, so there’s nothing to compare against yet. I won’t present a target as a result.',
          'What I’d do now — and would prioritize on any similar project — is make it measurable from day one:',
        ],
        bullets: [
          'Instrument the booking funnel end to end: widget opens, step completions, drop-off points, completed reservations.',
          'Define the success metric explicitly: direct web bookings, and homepage-to-booking conversion rate against the 20% target.',
          'Validate behavioral assumptions with real data: are guests actually booking on mobile and close to pickup? — and let the findings reshape the flow.',
        ],
      },
      {
        heading: 'Reflection',
        paragraphs: [
          'The craft holds up. The site looks premium, stays approachable, and puts booking one click away from anywhere, but "designed to convert" and "converts" are different claims, and I don’t want to blur them. On the next project, measurement is a first-class design requirement, not an afterthought.',
        ],
      },
    ],
  },
  {
    slug: 'wishlist-accessibility',
    title: 'Standardizing E-Commerce Accessibility Across 1,000+ Custom Shopify Themes',
    summary:
      'Engineered adaptable UI patterns to meet mobile touch-target standards without breaking legacy storefront layouts.',
    cover: '/work/wishlist-cover.png',
    year: '2025',
    client: 'Vitals',
    role: 'Senior Product Designer',
    tags: ['Product design', 'Accessibility'],
    overview:
      "Vitals' Wishlist icon could be injected into any store header, but its tap area was too small for mobile and it clashed with a fragmented landscape of themes. I improved its accessibility and integration so it worked reliably across storefronts.",
    challenge:
      "The icon's touch target fell short of the WCAG-recommended 44x44px minimum, and inconsistent theme markup across Shopify and non-Shopify stores broke its injection, alignment, and badge positioning.",
    approach:
      'I enlarged the icon wrapper to a compliant touch target, added merchant customization for size, color, and badge count, then tested across real stores and partnered with engineering on a resilient fallback for edge-case themes.',
    outcome:
      'A more accessible, theme-agnostic Wishlist experience that reduced support friction, improved mobile usability, and aligned better with merchants\u2019 storefront designs.',
    metrics: [
      { label: 'Touch target', value: '44×44px' },
      { label: 'Themes working', value: '~80%' },
      { label: 'Timeline', value: '1 week' },
    ],
    quickSummary: [
      { label: 'My role', value: 'Senior Product Designer (solo)' },
      {
        label: 'Scope',
        value:
          "Improved the Wishlist icon's accessibility and integration across diverse Shopify and non-Shopify themes, ensuring mobile compliance and seamless merchant customization.",
      },
      {
        label: 'Result',
        value:
          "A more accessible, theme-agnostic Wishlist experience that reduced support friction, improved usability on mobile, and aligned better with merchants' storefront designs.",
      },
      { label: 'Timeline', value: '1 week' },
    ],
    sections: [
      {
        heading: 'The problem',
        paragraphs: [
          "Vitals' Wishlist icon could be injected into any store header — but the initial implementation had several issues.",
        ],
        bullets: [
          'Accessibility on mobile: the tap area around the icon was too small. It didn\u2019t meet the WCAG-recommended 44x44px minimum for touch targets, which was especially problematic on mobile devices.',
          'Integration inconsistencies: merchants could install Vitals on multiple storefronts (Shopify and non-Shopify), each with custom themes or code.',
          'Some themes didn\u2019t support proper injection of the icon into headers.',
          'Others didn\u2019t respect accessibility standards or had layout constraints that clashed with the icon\u2019s structure.',
        ],
      },
      {
        heading: 'What I did',
        decisions: [
          {
            title: 'Redesigned the icon wrapper for accessibility',
            problem:
              'The tap area was smaller than the WCAG-recommended 44x44px minimum, hurting tapability on mobile.',
            change:
              "Increased the icon's wrapper to 44x44px to comply with accessibility guidelines.",
            why: 'This improved tapability across most devices and themes.',
          },
          {
            title: 'Customization options for merchants',
            problem:
              'A single fixed style couldn\u2019t match the range of storefront aesthetics merchants ran.',
            change:
              'Added settings for merchants to control the icon\u2019s size, color, and badge count display.',
            why: 'Ensured design consistency while allowing flexibility across diverse storefronts.',
          },
          {
            title: 'Cross-theme testing',
            problem:
              'Theme fragmentation meant theoretical compliance wasn\u2019t enough — real stores behaved differently.',
            change:
              'Tested the updated version on multiple stores; ~80% of themes worked perfectly. In the remaining 20%, edge cases appeared: misalignment where the 44px wrapper didn\u2019t match smaller header icons, overflow and spacing issues where themes didn\u2019t respect the full height, and badge-positioning bugs where the count floated away from the icon.',
            why: 'Testing across real stores surfaced the layout tradeoffs that drove the next iteration.',
          },
        ],
        images: [{
          src: '/work/wishlist-example1.png',
          alt: 'Three stacked storefront header examples labeled Live version, First iteration (with height: 44px added), and Second iteration (height: 44px removed because it is a non-Shopify theme), each showing the wishlist heart icon with a badge count alongside language, search, cart, and currency controls.',
          width: 777,
          height: 587,
          caption:
            'Iterations of the icon in a live storefront header: the live version, the first iteration adding a fixed 44px height, and the second iteration removing it for non-Shopify themes.',
        }],
      },
      {
        heading: 'Collaboration & tradeoffs',
        paragraphs: [
          'I worked closely with the developer to decide on the next iteration. Here\u2019s how we resolved it.',
        ],
        decisions: [
          {
            title: 'Set the height to auto instead of a fixed 44px',
            problem:
              'A fixed 44px height clashed with non-Shopify themes and smaller header icons, causing misalignment and layout shifts.',
            change:
              'Switched to height: auto, preserving alignment within diverse headers and avoiding clashes for non-Shopify store themes.',
            why: '70%+ of customers use Shopify themes that already follow accessibility practices, so height: auto reduced bugs for non-Shopify themes and edge cases while keeping the win where it mattered most.',
          },
          {
            title: 'Refined icon + badge structure',
            problem:
              'In certain layouts the badge count drifted away from the icon, looking broken or unbalanced.',
            change:
              'Adjusted the internal structure so the badge count stayed visually anchored to the icon.',
            why: 'Prevented scenarios where the spacing between the icon and badge appeared broken.',
          },
        ],
        images: [{
          src: '/work/wishlist-example2.png',
          alt: 'Three header component examples on a dark background labeled Live version, First iteration (note: added height 44px), and Second iteration (note: removed height 44px because this is a non-Shopify theme), each showing the wishlist heart icon with a badge among account, search, and cart icons.',
          width: 671,
          height: 530,
          caption:
            'The same three iterations isolated as components, showing how the badge stays anchored to the heart icon across the wrapper changes.',
        }],
      },
      {
        heading: 'Results',
        paragraphs: ['The updated Wishlist icon is now:'],
        bullets: [
          'Accessible on mobile and compliant with touch-target guidelines.',
          'Easier to customize for merchants via the Vitals dashboard.',
          'More resilient across the majority of Shopify themes and some third-party platforms.',
        ],
      },
      {
        heading: 'What I learned',
        bullets: [
          'Accessibility fixes can introduce new layout issues when working in third-party environments — which requires design-engineering tradeoffs.',
          'Testing across real stores is crucial; theoretical compliance isn\u2019t enough when dealing with theme fragmentation.',
          'Balancing accessibility, visual harmony, and technical constraints is key when designing UI elements that live inside external codebases.',
        ],
        callout:
          'Theoretical compliance isn\u2019t enough — resilient accessibility in third-party environments is a design-engineering negotiation, not a checkbox.',
      },
    ],
  },
  {
    slug: 'design-systems-with-a-twist',
    title: 'Design Systems with a twist at Vitals',
    summary:
      'Building a design system that had to live inside thousands of storefront themes it did not control — flexible enough to adapt, strict enough to stay consistent.',
    cover: '/work/ds-twist-cover.png',
    year: '2023',
    client: 'Vitals',
    role: 'Lead Product Designer',
    tags: ['Product design', 'Design Systems', 'Accessibility'],
    overview:
      "Vitals is a suite of 40+ conversion apps that inject widgets directly into merchants' Shopify (and non-Shopify) storefronts. The design system had to align with every store's unique theme while keeping the apps consistent, accessible, and fast to build.",
    challenge:
      'Designers and developers worked without a central system, so similar components multiplied endless settings, design debt piled up, onboarding was slow, and teams kept miscommunicating about how features should look and behave.',
    approach:
      "I audited established systems (including Shopify's and major store themes) to define a tailored approach to spacing, color, and typography, then built Figma components and tokens, documented naming conventions, and partnered with engineers on implementation with full backward compatibility.",
    outcome:
      'A system adopted by both development teams that improved consistency, accessibility, and design–dev handoff, and reduced design debt by centralizing core components across 40+ apps.',
    metrics: [
      { label: 'Apps served', value: '40+' },
      { label: 'Dev teams adopted', value: '2 of 2' },
      { label: 'Timeframe', value: '2 years' },
    ],
    quickSummary: [
      { label: 'My role', value: 'Lead Product Designer' },
      {
        label: 'Scope',
        value:
          "Audited established design systems (including Shopify's and major store themes) to define a tailored approach to spacing, color, and typography; built Figma components and tokens; documented naming conventions; partnered with engineers for implementation.",
      },
      {
        label: 'Result',
        value:
          'System adopted by both development teams; improved consistency, accessibility, and design–dev handoff; reduced design debt by centralizing and updating core components (buttons, variant/quantity selectors) across 40+ apps.',
      },
      {
        label: 'Timeframe',
        value:
          '2 years (ongoing work alongside product and marketing initiatives)',
      },
    ],
    sections: [
      {
        heading: 'The problem',
        paragraphs: [
          'Why do we need a design system, and what were we trying to solve?',
        ],
        bullets: [
          'Inconsistent UI and UX: designers and developers worked without a central design system, and the lack of standardization produced an ever-growing number of settings for similar components.',
          'Difficulty maintaining and scaling: complexity grew as variations multiplied without a central system, design debt accumulated, and limited patterns hindered new features and growth.',
          'Onboarding challenges: new team members struggled to grasp the design language and coding practices, and repeatedly explaining the rules to each new developer was inefficient and unsustainable.',
          'Communication gaps: the absence of a system led to frequent misunderstandings and misaligned expectations between teams about how features should look and function.',
        ],
      },
      {
        heading: 'The opportunity',
        paragraphs: [
          '"Design isn\u2019t just about how something looks but how it works." — Airbnb',
          'A shared system was a chance to make consistency, accessibility, and speed the default — and to give non-designers and engineers a common language to build with.',
        ],
      },
      {
        heading: 'The challenges',
        paragraphs: [
          'The twist: the system had to live inside storefronts we did not control.',
        ],
        bullets: [
          'Everything had to be accessible, yet users still needed to customize settings to their preferences. Auditing stores surfaced repeated issues with the colors used for Add to Cart buttons, text, and backgrounds.',
          "Store themes carry countless styles, colors, and typography choices, but apps must seamlessly align with each store's design — Shopify theme or not.",
          'We could not use hardcoded values, font families, or font weights, because the apps had to stay consistent with every other section of the store.',
          'Vitals is a large project built with multiple technologies, so components could not be applied universally across all apps.',
          'Every new component and variable had to maintain backward compatibility — and getting management buy-in for a design system was itself a challenge, as there was never an "opportune" moment to start.',
        ],
        images: [{
          src: '/work/ds-twist-frame1.png',
          alt: 'Variant and quantity selector dropdown components in several states — "Team Purple / L", "iPhone 7/8", "Black / Small", and an error state showing "White / 3-6m" with a red border — demonstrating the tokenized selector built to adapt to any store theme.',
          width: 885,
          height: 429,
          caption:
            'Core selector components rebuilt as tokenized, theme-agnostic patterns — including validation states — so a single update propagates across every app.',
        }],
      },
      {
        heading: 'First steps',
        bullets: [
          'Research: audited established design systems, including Shopify\u2019s and major store themes, to learn what to align with.',
          'Colors: defined a tailored, token-based approach so components could inherit each store\u2019s palette instead of hardcoding values.',
          'Good practices: documented naming conventions and usage rules to make the system approachable for designers, engineers, and non-designers alike.',
          'Components: built Figma components and tokens, then partnered with engineers on implementation with backward compatibility.',
        ],
        images: [{
          src: '/work/ds-twist-frame2.png',
          alt: 'Real Vitals widgets built from the design system: a product card for leggings with a size selector and Add to Cart button, an iPhone Case upsell card with a "Get 10% off" badge, a "Buy more, save more!" quantity-bundle offer, and a standalone quantity selector — all styled to blend into a storefront theme.',
          width: 864,
          height: 523,
          caption:
            'The same system powering live conversion widgets — product cards, upsell offers, and bundle selectors — each adapting to the host store\u2019s look.',
        }],
      },
      {
        heading: 'Risks',
        bullets: [
          "Components that don't suit every theme: with such a diverse range of themes, a one-size-fits-all approach isn't feasible, so the system had to stay flexible enough to adapt to each theme's style, color, and typography.",
          'Lack of adoption from the development team: a system only works with buy-in, so it had to be user-friendly, well-documented, and clearly beneficial to encourage widespread use.',
          'Dependence on management support: success required allocated resources, training, and a culture that values design consistency, plus long-term commitment to maintenance and evolution.',
        ],
      },
      {
        heading: 'Rabbit holes & KPIs',
        paragraphs: [
          'I stayed alert to the traps — many iterations and constant updates, and teams\u2019 natural resistance to changing their rhythms — and tied success to measurable signals.',
        ],
        bullets: [
          'Team efficiency: how long it takes to build a new product using the system.',
          'Speed to market: how long it takes to build and test prototypes.',
          'Effect on code: lines of frontend code changed per release, before and after launch.',
          'Adoption in code: how well adopted the system is across the codebase.',
        ],
        callout:
          'Out of scope (for now): AI integration that would let PMs, marketers, and the CEO generate new screens without knowing Figma or code.',
      },
      {
        heading: 'Results & impact',
        bullets: [
          'Adopted across 40+ internal apps by both development teams, improving consistency and reducing maintenance overhead.',
          'Centralized key components — buttons, variant selectors, and quantity selectors — making accessibility updates scalable across the platform.',
          'Improved engineering velocity by documenting components and tokens, reducing design-to-dev clarification and rework.',
          'Reduced design debt by eliminating inconsistent spacing, typography, and color patterns inherited from legacy themes and early-stage chaos.',
          'Boosted internal engagement: naming conventions made the system approachable and encouraged usage from non-designers and engineers.',
          'Still in progress: the system continues to evolve as the team scales.',
        ],
      },
    ],
  },
  {
    slug: 'cart-drawer',
    title: 'Cart Drawer – smoother, faster ecommerce UX',
    summary:
      'A custom, accessible cart drawer built to replace unreliable third-party solutions — improving retention and giving merchants a native way to boost sales with Vitals.',
    cover: '/work/cart-drawer-cover.png',
    year: '2024',
    client: 'Vitals',
    role: 'Lead Product Designer',
    tags: ['Product design', 'Design Systems', 'Accessibility'],
    overview:
      'We built a custom cart drawer to replace unreliable third-party solutions, improving retention and giving merchants a seamless way to boost sales with Vitals. The new drawer works like a native Shopify cart, adds custom elements like Announcement Bars and Cart Notices, and supports every Vitals module.',
    challenge:
      'Merchants relied on inconsistent third-party cart solutions that hurt retention and made it hard to surface Vitals upsell modules in a reliable, accessible way.',
    approach:
      'Starting from competitive analysis and best-practice research, I designed a modular, atomic cart drawer in Figma, baked in accessibility from day one, tested responsive variants across real devices, and built the merchant admin on Shopify Polaris — partnering closely with engineering throughout.',
    outcome:
      'A performant, accessible cart experience with improved UX consistency, reduced support tickets, and new upsell opportunities unlocked for merchants.',
    metrics: [
      { label: 'Touch targets', value: '44×44px' },
      { label: 'WCAG standard', value: '2.1 AA' },
      { label: 'Discovery to handoff', value: '4–5 wks' },
    ],
    quickSummary: [
      { label: 'My role', value: 'Lead Product Designer (solo)' },
      {
        label: 'Scope',
        value:
          'Built a custom cart drawer to replace unreliable third-party solutions, improving retention and giving merchants a seamless way to boost sales with Vitals. The new drawer works like a native Shopify cart, includes custom elements like Announcement Bars and Cart Notices, and supports all Vitals modules: Upsell Builder, Product Bundles, Volume Discounts, Gifts, and Spending Goals.',
      },
      {
        label: 'Result',
        value:
          'A performant, accessible cart experience, improved UX consistency, reduced support tickets, and unlocked new upsell opportunities.',
      },
      { label: 'Timeframe', value: '4–5 weeks (discovery to handoff)' },
    ],
    sections: [
      {
        heading: 'UI/UX process',
        paragraphs: [
          'We kicked off the design process with competitive analysis and best-practice research, focusing on strategies proven to increase conversions in cart interfaces.',
          'Key UX principles we followed:',
        ],
        bullets: [
          'Clarity of product information — each product in the cart displays a thumbnail image, name, specifications (like size or color), and quantity, so users can easily review their order.',
          'Clean, focused layout — we avoided clutter and limited the number of upsells and promotions shown, to maintain a frictionless path to checkout.',
          'Persistent checkout access — the checkout button remains visible across screen sizes, ensuring easy access regardless of device or resolution.',
          'Accessibility — the drawer works well with screen readers and can be fully navigated by keyboard, with WCAG-compliant contrast and tap targets large enough to hit on any device.',
        ],
        images: [{
          src: '/work/cart-drawer-design.png',
          alt: 'The Vitals cart drawer inside the Shopify admin: a settings tree on the left (General settings, Announcement bars, Product upsells, Spending goal, Gift, Empty state) and a live cart preview on the right showing a free-shipping bar, a sneaker line item with quantity stepper and discounted price, an order note, a "You may also like" upsell with a variant selector, a spending-goal progress bar, and a sticky "Go to checkout" button.',
          width: 1440,
          height: 1157,
          caption:
            'The cart drawer previewed inside the merchant admin — free-shipping bar, line items, order note, upsells, spending goal, and a sticky checkout button.',
        }],
      },
      {
        heading: 'Design system & component structure in Figma',
        paragraphs: [
          'To ensure consistency, speed up implementation, and make the cart drawer scalable across merchant setups, we built the UI using atomic, reusable Figma components.',
          'We broke the drawer into modular sections — Products, Upsells, Sticky Checkout, Spending Goal, Order Note, and Discount Summary — each designed as a separate component with variations (collapsed/expanded, filled/empty) that stay visually and functionally consistent.',
        ],
        bullets: [
          'Used Figma variants and component properties (boolean toggles, instance swaps) to manage complexity while keeping the file easy for developers and collaborators.',
          'Built the entire drawer in a modular layout to support future iterations and A/B testing without redesigning from scratch.',
        ],
        images: [{
          src: '/work/cart-components.png',
          alt: 'A Figma components board for the cart drawer showing reusable pieces annotated with "Text default, opacity 70%": upsell "You may also like" cards with variant selectors and Add to cart buttons, product line items with quantity steppers, discount summary panels with old price and subtotal, a spending-goal progress bar, and expandable order-note fields.',
          width: 2048,
          height: 1011,
          caption:
            'The drawer treated as a mini design system: modular, annotated components with variants for every state.',
        }],
      },
      {
        heading: 'Component design & developer handoff',
        paragraphs: [
          'Close partnership with engineering was key. We established a shared workflow that made handoff fast and low-friction.',
        ],
        bullets: [
          'A shared Figma library with components and tokens, enabling faster dev handoff.',
          'Clear documentation on naming conventions, behavior specs, and edge cases.',
          'Regular syncs to discuss blockers, performance optimizations, and accessibility fixes.',
          'A post-launch feedback loop to iterate based on real merchant usage and evolving product needs.',
        ],
        callout:
          'By treating the cart drawer like a mini design system, we made it easy to maintain, expand, and reuse across storefronts — without design debt or guesswork during development.',
      },
      {
        heading: 'Accessibility',
        paragraphs: [
          "Accessibility wasn't an afterthought — it was a core part of the design and development process from the start. We wanted the drawer to be usable by as many people as possible, including those navigating with screen readers, keyboards, or assistive technologies.",
        ],
        bullets: [
          'ARIA labels & landmarks: role="dialog" for proper modal semantics, aria-labelledby tied to the heading, aria-describedby for upsell and discount context, and careful aria-hidden use to keep screen-reader focus inside the drawer.',
          'Keyboard navigation: a logical tab order, focus trapping while the drawer is open, and ESC-to-close that mirrors modal dialog behavior.',
          'Color & contrast: WCAG 2.1 AA contrast ratios for all text, especially interactive elements like buttons, notices, messages, and discount badges.',
          'Tap target sizes: quantity selectors, remove buttons, and upsell CTAs all designed with a minimum 44×44px hit area to prevent frustration on mobile.',
        ],
      },
      {
        heading: 'Responsive design: variants by device',
        paragraphs: [
          'To ensure an optimal experience across devices, we designed and tested the drawer across a range of screen resolutions — each breakpoint chosen to represent real devices in our customer base and to surface layout or behavior inconsistencies.',
          'Edge cases handled:',
        ],
        bullets: [
          'Overflow & scroll: every variant has scroll logic when content exceeds viewport height.',
          'Content scaling: typography and icons scale slightly down on smaller breakpoints.',
          'Touch targets: all tap areas meet minimum guidelines for mobile usability.',
          'Safe areas: padding adjusted for device safe zones (iOS notch, bottom bars).',
        ],
        images: [{
          src: '/work/cart-responsive.png',
          alt: 'Three admin states of the cart drawer labeled Menu items, General settings, and General settings – custom color scheme, each showing the Shopify admin with the settings panel and a live storefront cart preview, demonstrating how the drawer adapts to configuration and custom colors.',
          width: 2034,
          height: 1234,
          caption:
            'Configuration states side by side: menu items, general settings, and a custom color scheme reflected live in the preview.',
        }],
      },
      {
        heading: 'User admin',
        paragraphs: [
          'The interface is built using the Shopify Polaris design system, ensuring accessibility, consistency, and a native admin experience aligned with the rest of the app.',
          'Working within Polaris constraints, we used Figma components that mirrored Polaris patterns to make handoff seamless — with a few adjustments to bridge the gap between Polaris defaults and our custom needs:',
        ],
        bullets: [
          "Preview embeds: since Polaris doesn't natively support live previews, we designed a scrollable drawer mock inside the admin for real-time visual feedback.",
          'Custom component overlays: certain settings (e.g. upsell rules) were layered with collapsible panels and helper tooltips to reduce visual overload.',
        ],
        images: [{
          src: '/work/cart-admin.png',
          alt: 'The Shopify Polaris-based Vitals admin for the cart drawer: a left navigation, a settings tree (General settings, Announcement bars, Product upsells, Spending goal, Gift, Empty state), and a live scrollable cart preview showing line items, an order note, an upsell, a spending-goal bar, and a sticky checkout button.',
          width: 2048,
          height: 649,
          caption:
            'The merchant admin built on Shopify Polaris, with a live scrollable drawer mock for real-time feedback.',
        }],
      },
      {
        heading: 'What I learned',
        bullets: [
          "Accessibility isn't a checklist — it's part of thoughtful, inclusive design, and building for real-world edge cases (screen readers, color contrast) requires collaborating with devs and testers early.",
          'Simplifying a flow often means removing choices, not adding features.',
          'Even small visual tweaks — spacing, button hierarchy — can drastically shift user behavior.',
          'Working closely with developers from day one leads to better outcomes and faster launches.',
          'Designing for reuse requires thinking beyond the current screen.',
        ],
      },
    ],
  },
  {
    slug: 'popup-redesign',
    title: 'Popup redesign that drove a 10% activation increase',
    summary:
      'An end-to-end redesign of the Pop-up app — improving usability, accessibility, and conversion for small merchants while balancing scalability and compliance.',
    cover: '/work/popup-cover.png',
    year: '2024',
    client: 'Vitals',
    role: 'Lead Product Designer',
    tags: ['Product design', 'Accessibility'],
    overview:
      'The Pop-up app was a key activation moment for merchants, but its outdated design limited customization and conversion. I led an end-to-end redesign that added custom layouts, image and logo uploads, and mobile-first optimization — lifting activation by 10%.',
    challenge:
      "The existing app couldn't create brand-aligned layouts (text on one side, image on the other), lacked custom image and logo uploads, and felt unprofessional — driving merchant churn and dissatisfaction.",
    approach:
      "I ran competitive analysis and merchant research, wireframed the enhanced flow for stakeholder alignment, then designed detailed admin and storefront screens in Figma — building in exit-intent triggers, theme-inherited styling, and mobile optimization, working closely with the PM and engineering.",
    outcome:
      'A cleaner, more customizable, mobile-optimized popup that increased user engagement and conversion, simplified setup to reduce time-to-launch, and drove a 10% activation increase one month post-launch.',
    metrics: [
      { label: 'Activation lift', value: '+10%' },
      { label: 'Conversion range', value: '3–9%' },
      { label: 'Research to handoff', value: '3 wks' },
    ],
    quickSummary: [
      {
        label: 'My role',
        value: 'Lead Product Designer, responsible for end-to-end redesign',
      },
      {
        label: 'Scope',
        value:
          'Redesigned a pop-up app to improve usability, accessibility, and conversion rates for small merchants.',
      },
      {
        label: 'Result',
        value:
          'Increased user engagement and conversion rates; simplified setup flow reduced time-to-launch.',
      },
      { label: 'Timeframe', value: '3 weeks from research to handoff' },
      {
        label: 'Twist',
        value:
          'Balanced small merchant needs with scalability and accessibility compliance.',
      },
    ],
    sections: [
      {
        heading: 'The problem',
        paragraphs: [
          'The primary challenge with the existing Pop-up app was its outdated design, which limited its effectiveness and appeal. Merchants were unable to create custom layouts that aligned with their brand aesthetics — particularly the ability to position text on one side (left or right) and images on the opposite side.',
          "Additionally, the app lacked essential features such as the ability to upload and utilize custom images. These limitations significantly reduced the app's value as part of a broader eCommerce strategy.",
        ],
      },
      {
        heading: 'Research',
        paragraphs: [
          'Through our research, we identified several key reasons behind merchant churn and dissatisfaction with the existing Pop-up app.',
        ],
        bullets: [
          'Limited customization options: merchants were frustrated by the inability to customize colors to match their brand identity. The app had launched with pre-made templates that, while quick to market, became outdated and inflexible over time.',
          'Image upload demand: the most frequently requested feature was the ability to upload their own images — critical for visually compelling, brand-aligned pop-ups.',
          'Logo integration: many merchants needed to incorporate their own logos to enhance brand recognition and consistency across their store.',
          'Lack of professional design: merchants felt the templates were too basic and unsuitable for businesses maintaining a minimalist, modern aesthetic.',
        ],
      },
      {
        heading: 'Design process',
        paragraphs: [
          'Our design process began with a competitive analysis of top pop-up solutions and industry benchmarks, revealing that conversion rates can increase by 3–9% on average.',
        ],
        bullets: [
          'Prioritized an exit-intent trigger, which can recover 10–15% of abandoning visitors.',
          'Made mobile optimization a key focus — mobile-friendly apps can boost conversions by up to 300%.',
          'Set a goal to create the most mobile-optimized pop-up solution on Shopify.',
        ],
      },
      {
        heading: 'UI/UX design',
        paragraphs: [
          'In the UI/UX phase, I created wireframes to define the enhanced user flow, facilitating stakeholder alignment. I then developed detailed Figma screens for both the user interface and storefront scenarios, while the development team prepared a more efficient codebase to support the new features.',
        ],
        images: [{
          src: '/work/popup-admin.png',
          alt: 'A Figma canvas mapping every popup variant and state: desktop layouts with image on the right and left, no-image and background variants, scroll-content and error states, plus thank-you, click-through, discount, and close-button scenarios — each annotated with settings like image aspect ratio, max width, and hover states.',
          width: 2048,
          height: 1507,
          caption:
            'The full Figma exploration — every layout, state, and edge case (thank-you, click-through, discount, error, close-button) mapped with settings annotations.',
        }],
      },
      {
        heading: 'User admin design',
        paragraphs: [
          'In collaboration with the Product Manager and the development team, I designed the User Admin interface. Every aspect was discussed and refined to ensure it would be intuitive, user-friendly, and aligned with our goals. The final designs incorporated all the new settings and flows mapped in the wireframing stage.',
          'Key screens from the User Admin interface:',
        ],
        bullets: [
          'Main interface: a clear, organized layout that lets merchants easily navigate settings and customize their pop-ups, with color customization, image uploads, and logo integration prominently featured.',
          'Customization panel: a dedicated section to personalize appearance and ensure alignment with brand identity.',
          'Live preview: merchants see how changes would appear in real time before applying them to their store.',
        ],
      },
      {
        heading: 'Storefront design',
        paragraphs: [
          'The objective was to ensure the pop-up widget would integrate seamlessly with a variety of store themes while providing a consistent, high-conversion experience for users.',
        ],
        bullets: [
          'Visual consistency: designed to align with each storefront\u2019s aesthetic — color schemes, typography, and overall design elements — for a cohesive look.',
          'Responsiveness: optimized for desktop, tablet, and mobile, since mobile-optimized apps can increase conversions by up to 300%.',
          'Customization & flexibility: options for placement, animation styles, and triggers (exit-intent, timed delay) to help recover up to 10–15% of abandoning visitors.',
          'Scenarios: from simple lead capture to more complex upsell opportunities, each scenario highlights the widget\u2019s flexibility in driving engagement.',
        ],
        images: [{
          src: '/work/popup-scenarios.png',
          alt: 'A row of four storefront popup scenarios built from the redesign: image on the right, image on the left, image with logo, and a thank-you screen with a coupon code — all sharing the same clean newsletter-signup layout with an email field, consent checkboxes, and a "Sign me up" button.',
          width: 2048,
          height: 515,
          caption:
            'Storefront scenarios: image-right, image-left, logo, and the thank-you/coupon screen — one consistent, high-conversion system.',
        }],
      },
      {
        heading: 'Mockups',
        paragraphs: [
          'To ensure compatibility with various store themes and simplify setup, we designed the app to inherit key styling elements directly from the theme — such as font family for headings and body text, as well as line height. This lets merchants customize and launch in just a few clicks, providing a seamless integration experience aligned with our easy-onboarding policy.',
        ],
        images: [{
          src: '/work/popup-left.png',
          alt: 'A storefront newsletter popup with the fashion model image on the left and the "Subscribe to our newsletter" content on the right — email field, privacy and offers consent checkboxes, a "Sign me up" button, and a "No, thank you" dismiss link — shown blending into a store theme.',
          width: 1024,
          height: 770,
          caption:
            'A live mockup inheriting the theme\u2019s typography and spacing — brand-aligned in a few clicks.',
        }],
        callout:
          'Designing the app to inherit theme styling was the key to easy onboarding — brand alignment without merchants touching a single style value.',
      },
      {
        heading: 'One month post-launch',
        paragraphs: [
          'The pop-up widget has shown positive results, evidenced by the uptick in adoption from October onward. Adoption had initially trended downward, but recent adjustments improved user engagement.',
          'The widget is now promoted through two in-app methods:',
        ],
        bullets: [
          'Product Update Modal — introducing the widget\u2019s new features to users.',
          '\u201CMy Apps\u201D Reminder — a prompt for users who have yet to activate the widget.',
        ],
        images: [{
          src: '/work/popup-dashboard.png',
          alt: 'The Shopify admin showing a Vitals in-app "Product Update" modal titled "Vitals\u2019 Pop-ups just got a whole lot better," with a preview of the new discount popup and a "Try it now" button — one of the two in-app promotion methods driving activation.',
          width: 1440,
          height: 930,
          caption:
            'The in-app Product Update Modal — one of two prompts driving the 10% activation increase post-launch.',
        }],
      },
    ],
  },

]

export type Testimonial = {
  headline?: string
  quote: string
  name: string
  title: string
}

export const testimonials: Testimonial[] = [
  {
    headline: 'The best business decision we made: partnering with Oana',
    quote:
      "From the early start of our journey at Dillali, we faced significant challenges in nailing our branding and visual communication. That all changed when Oana joined our team. Working with her has been one of the best decisions we made. Oana has been pivotal in defining and creating our brand and product design, blending her remarkable creativity and passion. Her commitment goes beyond consulting; she has become an integral part of our team, deeply involved in shaping our visual narrative. Oana's work is not just about creating designs; it's about crafting a visual language that resonates deeply with our users and symbolises the essence of Dillali. It's difficult to describe the depths of her contribution in just a few words, but let me say this — choosing to work with Oana was a turning point for us. Oana is a visionary partner who brings out the best in our brand.",
    name: 'Ibrahim Bashir',
    title: 'Founder, Dillali',
  },
  {
    quote:
      'Oana played a pivotal role in rebranding Tekudo. Despite our early stage and numerous uncertainties, she was instrumental in establishing our brand identity and developing a comprehensive set of tools for future growth. Beyond this, her mentorship was invaluable to our junior in-house designer, particularly in navigating complex product design challenges. Her skill and professionalism were evident throughout the entire process. We highly recommend her and look forward to potential future collaborations.',
    name: 'Vasile Popescu & Pascal Franke',
    title: 'Founders, Tekudo',
  },
  {
    quote:
      'Oana has been working for us on multiple projects. She always delivered high-quality work on time. Even when we needed something faster, Oana made it possible. We will definitely contact her for future jobs. I highly recommend working with her if you are seeking a very experienced, talented, dedicated and reliable designer.',
    name: 'Felix Harms',
    title: 'Founder, Tabbler',
  },
  {
    quote:
      'I worked with Oana on launching a new brand with 6 apps under it, each one built from the same system but distinct enough to stand on its own. She handled it end to end: the design system itself, the product UI and UX, the component library, icons, App Store assets, landing pages, email design & HTML, plus the social and explainer materials around all of it. She arrives with options rather than one answer, adapts and moves fast when you need her to, and leaves files organised that anyone can pick up the work.',
    name: 'Alice Fischer',
    title: 'Marketing and Operations, Vitals',
  },
]


export type Experience = {
  role: string
  company: string
  period: string
  description: string
  bullets: string[]
}

export const experience: Experience[] = [
  {
    role: 'Lead Product Designer',
    company: 'Technology Oriented',
    period: "Oct '25 — Present",
    description:
      "I stepped into this role to do something I hadn't done before: lead design strategy across 5 brands at once. That means thinking in systems, not just screens, and zooming out from individual flows to ask what each brand needs to communicate, convert, and grow.",
    bullets: [
      'Owning the full design strategy for 5 brands, balancing distinct identities while maintaining coherence across the portfolio.',
      'Redesigning landing pages to improve conversion, restructuring narrative, visual hierarchy, and CTAs based on brand goals and user behaviour.',
      "Defining and executing social media design strategies — from content frameworks to visual language — that translate each brand's identity into scroll-stopping assets.",
      'Improving product flows across multiple platforms, identifying friction points and redesigning experiences to be more intuitive and effective.',
      "Bringing the same systems thinking that helped me scale 40+ apps to a multi-brand environment, making sure quality doesn't slip when scope is wide.",
    ],
  },
  {
    role: 'Product Designer',
    company: 'Vitals',
    period: "Feb '19 — Oct '25",
    description:
      'For 5 years, as a solo designer, I led all facets of product design and UI/UX, ensuring cohesive experiences across over 40 mobile and web apps. My responsibilities also included branding, web design, and social media assets.',
    bullets: [
      'Worked closely with product managers to deeply understand customer needs across multiple product lines, consistently designing experiences that led to a 10–15% increase in key user actions on core apps.',
      'Boosted app activation by 5% and increased offer creation within the Upsell Builder app by approximately 10% through targeted UX improvements.',
      'Developed and maintained robust design systems for 2 years, critical for scaling design quality across a high volume of apps.',
      'Applied human-centered thinking and business acumen to turn concepts into scalable solutions that excel.',
    ],
  },
  {
    role: 'Product Designer',
    company: 'Freelancer',
    period: "Mar '16 — Present",
    description:
      'Working with startups to determine the best solution for their brand, product, and online presence by applying a variety of guides and design systems to help them maintain consistency and ramp up.',
    bullets: [
      'Masterminded the planning, design, and roll-out of three new web applications with product and development teams, achieving a 20% increase in active users within six months.',
      "A proud design generalist — I've had the opportunity to explore various aspects of design with all of the startups I've worked with.",
      'Supported the growth of junior designers by providing feedback, design guidance, and best practices for working within design systems.',
    ],
  },
  {
    role: 'Brand & Product Designer Consultant',
    company: 'Dillali',
    period: "Aug '21 — Nov '24",
    description:
      'I led the design team in the implementation of new features, the creation of various promotional materials (online and offline), and the instruction of how to work with a design system.',
    bullets: [
      'Developed a style guide for implementation across platforms for developers, marketing, and co-founders (web, app, online presence).',
      'Redesigned and developed the brand identity and strategy, including the online presence and website.',
    ],
  },
  {
    role: 'Brand Designer',
    company: 'Electronic Arts',
    period: "Mar '16 — Feb '19",
    description:
      'Crafted brand and visual design work within a global games company, building assets and identity systems across campaigns.',
    bullets: [],
  },
]

export type Certification = {
  name: string
  issuer: string
}

export const certifications: Certification[] = [
  { name: 'Product Psychology Masterclass', issuer: 'Growth Design' },
  { name: 'UX/UI Designer', issuer: 'Uxcel' },
  { name: 'UX Writing', issuer: 'Uxcel' },
  { name: 'Design Accessibility', issuer: 'Uxcel' },
  { name: 'CSS Foundations', issuer: 'Uxcel' },
]

export const services = [
  'Product Strategy & Architecture: Mapping complex user flows, technical constraints, and business goals into scalable product roadmaps.',
  'Design Systems & Governance: Building multi-brand, tokenized UI systems that speed up engineering handoff and enforce consistency.',
  'Accessibility Leadership: Designing WCAG-compliant systems so products are usable by everyone from day one.',
  'Conversion & Flow Optimization: Turning static marketing experiences into high-performing conversion channels.',
]
