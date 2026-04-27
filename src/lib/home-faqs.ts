import type { FAQSchemaItem } from "@/components/schema/FAQSchema";

export interface HomeFAQItem extends FAQSchemaItem {
  tags: string[];
}

export const homeFaqs: HomeFAQItem[] = [
  {
    question: "What services do you offer?",
    answer:
      "We offer comprehensive digital marketing solutions including website design and development, SEO/AEO optimization, email marketing, software development, and workflow automation. Each service is tailored to help local businesses grow their online presence and drive revenue.",
    tags: ["Services", "Overview"],
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Timeline varies by project scope. Website projects typically launch within 4-8 weeks. SEO results begin showing within 3-6 months. Email marketing campaigns can generate revenue within days of launch. We'll set clear expectations during our initial consultation.",
    tags: ["Timeline", "Process"],
  },
  {
    question: "What's your pricing structure?",
    answer:
      "We offer flexible pricing based on your needs, from one-time projects to ongoing retainers. Every engagement starts with a discovery call where we understand your goals and provide a transparent quote. No hidden fees, no surprises.",
    tags: ["Pricing", "Budget"],
  },
  {
    question: "Do I need technical knowledge?",
    answer:
      "Not at all. We handle all the technical aspects of your digital presence, from development to optimization. You focus on running your business while we take care of the digital side. We keep you informed with clear, jargon-free updates.",
    tags: ["Technical", "Support"],
  },
  {
    question: "How do you measure success?",
    answer:
      "We're obsessed with data. Every project includes clear KPIs, whether that's increased traffic, higher conversion rates, more qualified leads, or revenue growth. We provide regular reports and are always transparent about what's working.",
    tags: ["Results", "Analytics"],
  },
];
