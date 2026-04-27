import { siteConfig, absoluteUrl } from "@/lib/site";
import { JsonLd } from "./JsonLd";

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": absoluteUrl("/#organization"),
            name: siteConfig.name,
            url: siteConfig.url,
            logo: absoluteUrl("/captive-demand-logo.png"),
            sameAs: siteConfig.sameAs,
            founder: {
              "@type": "Person",
              name: "Spencer Donaldson",
            },
          },
          {
            "@type": "LocalBusiness",
            "@id": absoluteUrl("/#localbusiness"),
            name: siteConfig.name,
            image: absoluteUrl("/captive-demand-logo.png"),
            telephone: siteConfig.phone,
            email: siteConfig.email,
            url: siteConfig.url,
            address: {
              "@type": "PostalAddress",
              ...siteConfig.address,
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: siteConfig.geo.latitude,
              longitude: siteConfig.geo.longitude,
            },
            priceRange: "$$-$$$",
            areaServed: ["United States"],
          },
        ],
      }}
    />
  );
}
