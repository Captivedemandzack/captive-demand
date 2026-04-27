import { absoluteUrl } from "@/lib/site";
import { JsonLd } from "./JsonLd";

interface ServiceSchemaProps {
  name: string;
  description: string;
  slug: string;
}

export function ServiceSchema({ name, description, slug }: ServiceSchemaProps) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        provider: { "@id": absoluteUrl("/#organization") },
        areaServed: "United States",
        url: absoluteUrl(`/services/${slug}`),
      }}
    />
  );
}
