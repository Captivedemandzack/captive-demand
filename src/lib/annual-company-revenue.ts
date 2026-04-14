/** Values posted to /api/contact and used for the pricing-modal booking gate. */
export type AnnualCompanyRevenue = 'under_250k' | '250k_500k' | '500k_1m' | '1m_plus';

export const ANNUAL_COMPANY_REVENUE_OPTIONS: { value: AnnualCompanyRevenue; label: string }[] = [
  { value: 'under_250k', label: 'Under $250k' },
  { value: '250k_500k', label: '$250k - $500k' },
  { value: '500k_1m', label: '$500k - $1M' },
  { value: '1m_plus', label: '$1M+' },
];

export function revenueLabel(value: AnnualCompanyRevenue): string {
  return ANNUAL_COMPANY_REVENUE_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

export function qualifiesForBookingCalendar(revenue: AnnualCompanyRevenue): boolean {
  return revenue === '500k_1m' || revenue === '1m_plus';
}

export function parseAnnualCompanyRevenue(raw: string | undefined): AnnualCompanyRevenue | null {
  if (!raw?.trim()) return null;
  const v = raw.trim() as AnnualCompanyRevenue;
  return ANNUAL_COMPANY_REVENUE_OPTIONS.some((o) => o.value === v) ? v : null;
}
