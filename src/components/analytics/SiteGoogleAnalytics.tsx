import { GoogleAnalytics as NextGoogleAnalytics } from "@next/third-parties/google";

import { siteConfig } from "@/lib/site";

function resolvedMeasurementId(): string | undefined {
  const fromEnv = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID?.trim();
  if (fromEnv) return fromEnv;
  const fromConfig = siteConfig.ga4MeasurementId.trim();
  return fromConfig || undefined;
}

/**
 * Google Analytics 4 — loads `gtag.js` for the configured Measurement ID (`G-…`).
 *
 * Skipped when NODE_ENV is development unless NEXT_PUBLIC_GA4_IN_DEV=true.
 */
export function SiteGoogleAnalytics() {
  const skipInDev =
    process.env.NODE_ENV === "development" &&
    process.env.NEXT_PUBLIC_GA4_IN_DEV !== "true";

  const gaId = resolvedMeasurementId();

  if (skipInDev || !gaId) return null;

  return <NextGoogleAnalytics gaId={gaId} />;
}
