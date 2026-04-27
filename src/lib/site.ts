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
  gtmId: "GTM-KDGH9S9",
  ga4MeasurementId: "G-2PX5BV44GV",
} as const;

export function absoluteUrl(path = "") {
  if (/^https?:\/\//.test(path)) return path;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath === "/" ? "" : normalizedPath}`;
}
