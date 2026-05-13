/**
 * GA4 + dataLayer helpers.
 *
 * **Key events (mark as conversions in GA4):** Admin → Data display → Events → toggle “Mark as key event”
 * on any event name below that matters for your funnel (`generate_lead`, `cd_pricing_modal_open`, etc.).
 *
 * **“Traffic from another site” / unnamed:** Usually wrong stream, Measurement ID, or hostname on the stream.
 * In GA4 → Admin → Data streams → open your web stream: URL must match production (`https://captivedemand.com`).
 * Realtime should show **Page hostname** = `captivedemand.com` after deploy with `G-N2HFM02GMY`.
 *
 * **Forms:** We fire GA4’s recommended `generate_lead` plus custom funnel events (`cd_*`) for the pricing modal.
 */

type DataLayerEvent = {
  event: string;
  [key: string]: unknown;
};

type WindowWithGa = Window & {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
};

export function pushDataLayerEvent(event: DataLayerEvent) {
  if (typeof window === "undefined") return;
  const w = window as WindowWithGa;
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push(event);
}

/**
 * Sends an event to GA4 via global `gtag` (injected by SiteGoogleAnalytics).
 * Falls back to a GTM-style dataLayer object if `gtag` is not ready yet.
 */
export function trackGa4Event(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as WindowWithGa;
  const body = params ?? {};
  if (typeof w.gtag === "function") {
    w.gtag("event", eventName, body);
    return;
  }
  pushDataLayerEvent({ event: eventName, ...body });
}
