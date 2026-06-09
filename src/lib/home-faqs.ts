import type { FAQSchemaItem } from "@/components/schema/FAQSchema";

export interface HomeFAQItem extends FAQSchemaItem {
  tags: string[];
}

export const homeFaqs: HomeFAQItem[] = [
  {
    question: "How do you work across a portfolio of companies?",
    answer:
      "We operate as one team across every company you own. Shared playbooks, one consolidated stack, and a single knowledge base, so a win at one company becomes the standard for the next. You get consistency across the portfolio without flattening what makes each brand work locally.",
    tags: ["Portfolio", "Scale"],
  },
  {
    question: "Do we own what you build?",
    answer:
      "Yes. Sites, ad accounts, data, and domains stay yours. We never train on your data. If you ever move on, we help you transition out cleanly instead of holding your accounts hostage.",
    tags: ["Ownership", "IP"],
  },
  {
    question: "How fast can you move after an acquisition?",
    answer:
      "We start with an audit and an access sweep, then move fast. Sites typically launch in two to six weeks, three on average, and we run the consolidation in parallel so the company is producing while the rest gets cleaned up.",
    tags: ["Speed", "Onboarding"],
  },
  {
    question: "How do you handle multiple stakeholders and approvals?",
    answer:
      "A portfolio is dozens of stakeholders across companies and departments. We carry context across all of it, run an approval process for teams that need a paper trail, and act as the project managers so you get an owner's attention without managing the work yourself.",
    tags: ["Process", "Stakeholders"],
  },
  {
    question: "How is this priced?",
    answer:
      "Built for portfolio economics. Because AI and our own tooling absorb the repetitive work, we deliver senior-led marketing at over 50% less than a comparable agency, and the per-company cost drops as we standardize across the portfolio.",
    tags: ["Pricing", "Budget"],
  },
  {
    question: "How do you report and measure success?",
    answer:
      "Leadership-level reporting, visible by brand and by cohort, tied to the metrics owners underwrite: revenue, conversion, cost per outcome, and speed to value. No vanity dashboards.",
    tags: ["Reporting", "Results"],
  },
];
