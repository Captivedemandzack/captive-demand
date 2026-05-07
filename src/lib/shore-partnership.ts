/** UTM source/medium pair shared across every outbound playbook link */
export const SHORE_PLAYBOOK_UTM_BASE = 'utm_source=shore&utm_medium=partnership-page';

const PLAYBOOK_ORIGIN = 'https://shoreppg.captivedemand.com';

/** Append the partnership UTM (and an optional `utm_content` tag) to any playbook URL */
export function playbookUrl(path = '/', content?: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const base = `${PLAYBOOK_ORIGIN}${normalized}`;
  const join = normalized.includes('?') ? '&' : '?';
  const utm = content ? `${SHORE_PLAYBOOK_UTM_BASE}&utm_content=${encodeURIComponent(content)}` : SHORE_PLAYBOOK_UTM_BASE;
  return `${base}${join}${utm}`;
}

export function playbookPresentationUrl(content?: string): string {
  return playbookUrl('/presentation.html', content);
}

/** Same default as `resolveGhlBookingWidgetUrl` (Spencer / team booking). */
export function shorePartnershipBookingUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_GHL_BOOKING_EMBED_URL?.trim();
  if (fromEnv) {
    try {
      return new URL(fromEnv).toString();
    } catch {
      /* fall through */
    }
  }
  return 'https://api.leadconnectorhq.com/widget/booking/RDho94A86drpgGj9WCKN';
}

export const SHORE_NAVY = '#34538C';
export const SHORE_NAVY_DEEP = '#1F3F7A';
export const SHORE_NAVY_TINT = '#E8EEF7';
export const SHORE_PAGE_BG = '#FAFAF7';

export const SHORE_LOGOMARK_URL =
  'https://media.brand.dev/80482689-3206-4471-9d7b-96af4a318b60.png';

export const CAPTIVE_DEMAND_LOGO = '/captive-demand-logo.png';
