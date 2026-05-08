/** Production origin for analytics, OG, and AI “tell me about …” deep links (never localhost). */
export const canonicalProductionOrigin = "https://captivedemand.com";

export const siteConfig = {
  name: "Captive Demand",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://captivedemand.com",
  defaultTitle: "Captive Demand | Nashville Web Design, SEO & Email Marketing Agency",
  titleTemplate: "%s | Captive Demand",
  description:
    "Captive Demand engineers demand for private equity portfolios, venture-backed startups, and local businesses through web development, SEO/AEO, email marketing, and custom software.",
  phone: "+1-615-909-2337",
  phoneDisplay: "615.909.2337",
  email: "hello@captivedemand.com",
  address: {
    streetAddress: "1015 W Kirkland Ave, Suite 200",
    addressLocality: "Nashville",
    addressRegion: "TN",
    postalCode: "37216",
    addressCountry: "US",
  },
  geo: {
    latitude: 36.1849,
    longitude: -86.7356,
  },
  sameAs: [
    "https://linkedin.com/company/captive-demand",
    "https://instagram.com/captivedemand",
  ],
  /** GA4 property ID for captivedemand.com (Admin → Property settings). */
  ga4PropertyId: "357177260",
  /**
   * GA4 Web Measurement ID for that property (Admin → Data streams → Web → Measurement ID).
   * Override with NEXT_PUBLIC_GA4_MEASUREMENT_ID in Netlify env if this stream changes.
   */
  ga4MeasurementId: "G-N2HFM02GMY",
} as const;

export function absoluteUrl(path = "") {
  if (/^https?:\/\//.test(path)) return path;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath === "/" ? "" : normalizedPath}`;
}
