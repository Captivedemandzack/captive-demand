export const BASE_RANGES: Record<string, [number, number]> = {
  'Brochure / Info Site': [2500, 4000],
  'Lead Gen Site': [3500, 6000],
  'E-commerce Store': [6000, 10000],
  'Membership / Portal': [7000, 12000],
  'Custom Platform': [10000, 25000],
};

export const PAGE_MULTIPLIERS: Record<string, number> = {
  '1–5 Pages': 1.0,
  '6–10 Pages': 1.2,
  '10–20 Pages': 1.4,
  '20+ Pages': 1.7,
};

export const FEATURE_ADDERS: Record<string, [number, number]> = {
  'CMS / Blog': [500, 1000],
  'Booking System': [800, 1500],
  'Payment Processing': [600, 1200],
  'Custom Animations': [1000, 2000],
  'CRM Integration': [700, 1500],
  'SEO Setup': [500, 1000],
  'Multiple Languages': [1200, 2500],
  'Member Login': [1500, 3000],
};

export const TIMELINE_MODIFIERS: Record<string, number> = {
  'ASAP (rush fee applies)': 1.25,
  '4–6 Weeks': 1.0,
  '2–3 Months': 1.0,
  Flexible: 0.95,
};

export type EstimatorTierHint = 'launch' | 'scale' | 'enterprise' | 'custom';

export function mapMidpointToTier(mid: number): EstimatorTierHint {
  if (mid < 4000) return 'launch';
  if (mid < 7000) return 'scale';
  if (mid < 12000) return 'enterprise';
  return 'custom';
}

export function tierLineLabel(hint: EstimatorTierHint): string {
  switch (hint) {
    case 'launch':
      return 'BASE';
    case 'scale':
      return 'PRO';
    case 'enterprise':
      return 'PREMIER';
    default:
      return 'CUSTOM';
  }
}

export function computeEstimateRange(
  siteType: string | null,
  pageCount: string | null,
  features: string[],
  timeline: string | null,
): { min: number; max: number } | null {
  if (!siteType || !BASE_RANGES[siteType]) return null;
  const [bmin, bmax] = BASE_RANGES[siteType];
  const pm = pageCount ? PAGE_MULTIPLIERS[pageCount] ?? 1 : 1;
  let min = bmin * pm;
  let max = bmax * pm;
  for (const f of features) {
    const add = FEATURE_ADDERS[f];
    if (add) {
      min += add[0];
      max += add[1];
    }
  }
  const tm = timeline ? TIMELINE_MODIFIERS[timeline] ?? 1 : 1;
  min *= tm;
  max *= tm;
  return { min: Math.round(min), max: Math.round(max) };
}
