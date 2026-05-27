import { markShoreFormSubmitted } from '@/lib/shore-form-session';

export type ShoreAuditFormSource = 'audit-form' | 'exit-intent';

export type SubmitShoreAuditParams = {
  source: ShoreAuditFormSource;
  email: string;
  fullName: string;
  businessName: string;
  siteUrls: string[];
  recaptchaToken?: string;
};

export function normalizeSiteUrls(urls: string[]): string[] {
  return urls.map((u) => u.trim()).filter(Boolean);
}

export function formatSiteUrlsMessage(urls: string[]): string {
  return normalizeSiteUrls(urls).join('\n');
}

export async function submitShoreAuditForm(params: SubmitShoreAuditParams): Promise<boolean> {
  const urls = normalizeSiteUrls(params.siteUrls);
  if (!params.email.trim() || urls.length === 0) {
    return false;
  }

  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      source: params.source,
      fullName: params.fullName.trim(),
      email: params.email.trim(),
      businessName: params.businessName.trim(),
      message: formatSiteUrlsMessage(urls),
      recaptchaToken: params.recaptchaToken,
    }),
  });

  if (!res.ok) {
    return false;
  }

  markShoreFormSubmitted();
  return true;
}
