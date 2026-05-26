export interface ShoreBeforeAfterShowcase {
  /** Unique prefix for tab/panel ids (accessibility when multiple showcases exist). */
  tabIdPrefix: string;
  beforeSrc: string;
  afterSrc: string;
  imageAltBefore: string;
  imageAltAfter: string;
  /** Defaults to cover; use contain when GIFs must stay fully visible (letterboxed). */
  imageObjectFit?: 'cover' | 'contain';
  /** Accessible name for the Before / After tab strip. */
  tablistAriaLabel?: string;
}

/** Optional editorial dual-period chart shown inside the Results panel when present. */
export interface ShoreImpactChart {
  /** Intro copy above the bars; omit for a tighter chart. */
  subtitle?: string;
  comparisonLabels: [string, string];
  bars: Array<{ label: string; prior: number; current: number }>;
  /** Optional fine print below the bars; omit for a cleaner chart. */
  footnote?: string;
  /**
   * period: columns are two reporting windows (default).
   * segment: columns compare two segments in the same window (e.g. Paid vs Organic).
   */
  comparisonMode?: 'period' | 'segment';
}

export interface ShoreCaseStudy {
  id: string;
  name: string;
  engagementType: string;
  /** Compact tag pills shown on the card header */
  tags: string[];
  challenge: string;
  actions: string[];
  results: string;
  /** Per-study direction for the visual proof slot */
  visualProof?: string;
  /** When set, renders inside the Results card as the primary proof (alongside optional narrative). */
  impactChart?: ShoreImpactChart;
  /** When set, replaces the dashed visual slot with a tabbed before/after annotated showcase. */
  beforeAfterShowcase?: ShoreBeforeAfterShowcase;
  /** Shore portfolio cases stay pinned + expanded by default */
  tier: 'shore' | 'supporting';
  /**
   * Cards flagged for review hide their expanded content and surface a small
   * note for Spencer. They still render so he can decide on the call.
   */
  pendingReview?: string;
  /** Static cards (no expansion, no body) for breadth callouts */
  variant?: 'expandable' | 'static';
  /**
   * With `beforeAfterShowcase`, stacks the showcase full-width under a two-column
   * row (actions | results) instead of placing the showcase in the right column.
   */
  panelLayout?: 'default' | 'showcaseBottom';
  /** Optional cadence callout in the accordion header (e.g. delivery turnaround). */
  deliveryTimeline?: string;
}

export const shorePartnershipCaseStudies: ShoreCaseStudy[] = [
  {
    id: 'empower',
    name: 'Empower Aesthetics',
    tier: 'shore',
    engagementType: 'Email & lifecycle automation. Multi-brand portfolio.',
    tags: ['Shore portfolio', 'Email & lifecycle automation', 'Multi-brand portfolio'],
    challenge:
      'Empower runs eleven medspa brands under one Shore portfolio company. Each brand has its own audience, voice, and local market. We built the lifecycle programming that scales across all of them without flattening what makes each one work locally.',
    actions: [
      'Mapped customer journeys across all eleven brands with shared taxonomy and brand-specific guardrails',
      'Built the email and automation flows fueling buying cycles and compliance norms across the portfolio',
      'Instrumented reporting at the leadership level so performance is visible by brand and cohort',
      'Senior-led implementation with AI-accelerated production, no junior handoffs',
    ],
    results: '',
    impactChart: {
      comparisonLabels: ['Q1 2025', 'Q1 2026'],
      bars: [
        { label: 'Recipients reached', prior: 266_450, current: 580_419 },
        { label: 'Total opens generated', prior: 32_221, current: 47_151 },
        { label: 'Total clicks generated', prior: 2981, current: 4269 },
        { label: 'Core campaigns shipped', prior: 80, current: 141 },
      ],
    },
    beforeAfterShowcase: {
      tabIdPrefix: 'empower-lifecycle',
      beforeSrc: '/empower-lifecycle-before.webp',
      afterSrc: '/empower-lifecycle-after.webp',
      imageAltBefore: 'Empower lifecycle email before redesign, December savings promo',
      imageAltAfter: 'Empower lifecycle email after Captive Demand redesign, Valentine lip filler promo',
      tablistAriaLabel: 'Lifecycle email before and after comparison',
    },
  },
  {
    id: 'agentis',
    name: 'Agentis Longevity',
    tier: 'shore',
    engagementType: 'Phased web work. Tracking infrastructure.',
    tags: ['Shore portfolio', 'Website', 'CRO'],
    deliveryTimeline: 'Delivered in 3 weeks',
    challenge:
      'Agentis needed credibility fast. Their existing site was holding back conversion and the data layer underneath it did not tell the truth. We delivered a phased rollout: a fast surface refresh first to stabilize lead flow, then a full rebuild plus tracking infrastructure that gave clinical and marketing leadership the same view.',
    actions: [
      'Phase 01: surface-level refresh that stabilized hero, conversion, and trust elements without disrupting active traffic',
      'Phase 02: full rebuild on a modern stack, redesigned IA, and clinical intake stay aligned to brand',
      'GA4, GTM, and CRM-routing rebuilt at launch so leadership can act on the same numbers',
      'Built sub-brand sites for companies under the Agentis umbrella as the portfolio expanded',
    ],
    results: '',
    beforeAfterShowcase: {
      tabIdPrefix: 'agentis-hero',
      beforeSrc: '/Agentis-home-before.webp',
      afterSrc: '/Agentis-Home-New.webp',
      imageAltBefore: 'Agentis homepage before redesign, full-page crop from top',
      imageAltAfter: 'Agentis homepage after redesign, full-page crop from top',
    },
    impactChart: {
      comparisonLabels: ['Earlier 30 days', 'Latest 30 days'],
      bars: [
        { label: 'Sessions', prior: 467, current: 1822 },
        { label: 'Total users', prior: 346, current: 1204 },
        { label: 'Engaged sessions', prior: 253, current: 961 },
        { label: 'Page views', prior: 904, current: 3462 },
      ],
    },
  },
  {
    id: 'mantality-health',
    name: 'Mantality Health',
    tier: 'supporting',
    engagementType: 'Web design & development, CRO, and rapid turnaround.',
    tags: ['Shore portfolio', 'Website', 'CRO'],
    deliveryTimeline: 'Delivered in 2 weeks',
    challenge:
      'The legacy site lacked a clear brand and differentiation—visitors were not connecting with the practice. Mantality needed a fast turnaround on a full redesign. What we delivered is a modern, conversion-focused experience that can compete in a hyper-competitive TRT market without sacrificing clinical credibility.',
    actions: [
      'Redesign focused on conversion paths, clarity above the fold, and trust signals aligned to patient intent',
      'Full build with intuitive UX, faster perceived performance, and measurement-ready structure',
      'GA4 and GTM instrumentation so bounce, engagement time, and acquisition reflect reality after launch',
    ],
    results: '',
    beforeAfterShowcase: {
      tabIdPrefix: 'mantality-hero',
      beforeSrc: '/Mantality-home-old.webp',
      afterSrc: '/mantality-home-new.webp',
      imageAltBefore: 'Mantality Health homepage before redesign, full-page crop from top',
      imageAltAfter: 'Mantality Health homepage after redesign, full-page crop from top',
    },
    impactChart: {
      comparisonLabels: ['Legacy baseline', 'Post-launch'],
      bars: [
        { label: 'Bounce rate (%)', prior: 96, current: 48 },
        { label: 'Engagement time index', prior: 100, current: 125 },
      ],
    },
    visualProof:
      'Optional: drop Overview screenshots from GA4 property 426558326 or hero crops alongside the before/after tabs.',
  },
  {
    id: 'slk-clinic',
    name: 'SLK Clinic',
    tier: 'shore',
    engagementType: 'Hosting, maintenance, CRO, and SEO for a Shore portfolio clinic.',
    tags: ['Shore portfolio', 'Hosting & maintenance', 'CRO', 'SEO'],
    panelLayout: 'showcaseBottom',
    challenge:
      'SLK Clinic needed dependable web operations inside Shore\'s portfolio while Zenoti\'s default booking experience buried clarity, especially across multiple service lines. The site needed standardized practices, cleaner measurement, and a booking path visitors could actually finish.',
    actions: [
      'Standardized WordPress practices and kept plugins plus theme current on a disciplined maintenance cadence',
      'Integrated a ticketing system so website updates route cleanly and ship without hallway slack threads',
      'Shipped conversion-focused custom modal booking flows (one modal per service option) so visitors skip Zenoti\'s confusing embedded UX while still landing in the right calendar',
      'Wired every modal through GTM and GA4 for conversion tracking leadership can audit',
      'Cleaned GA4 key events and GTM triggers so reporting reflects real funnel steps, not legacy noise',
    ],
    results: '',
    beforeAfterShowcase: {
      tabIdPrefix: 'slk-booking',
      beforeSrc: '/slkclinic-booking-old.mov',
      afterSrc: '/Slkclinic-booking-new.mov',
      imageAltBefore: 'SLK Clinic legacy Zenoti booking experience before custom modal flow',
      imageAltAfter: 'SLK Clinic custom modal booking flow after implementation',
      imageObjectFit: 'contain',
      tablistAriaLabel: 'Booking experience before and after comparison',
    },
    impactChart: {
      comparisonMode: 'segment',
      comparisonLabels: ['Site-wide average', 'Nashville clinic page'],
      bars: [
        { label: 'Engagement rate (%)', prior: 61, current: 83 },
        { label: 'Avg session duration (sec)', prior: 142, current: 182 },
      ],
    },
  },
];
