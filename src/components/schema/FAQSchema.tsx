import { JsonLd } from "./JsonLd";

export interface FAQSchemaItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQSchemaItem[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }}
    />
  );
}
