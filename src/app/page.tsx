import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { FAQSchema } from "@/components/schema/FAQSchema";
import { homeFaqs } from "@/lib/home-faqs";

export const metadata: Metadata = {
    title: "Nashville Web Design & SEO Agency",
    description:
        "Captive Demand builds websites, SEO/AEO systems, email marketing, automation, and software for growth-stage brands and Nashville businesses.",
    alternates: { canonical: "/" },
    openGraph: {
        title: "Nashville Web Design & SEO Agency | Captive Demand",
        description:
            "Web design, SEO/AEO, email marketing, automation, and software for businesses ready to grow.",
        url: "/",
    },
};

const AboutSection = dynamic(() =>
    import("@/components/sections/AboutSection").then(m => ({ default: m.AboutSection }))
);
const FeaturesSection = dynamic(() =>
    import("@/components/sections/FeaturesSection").then(m => ({ default: m.FeaturesSection }))
);
const IndustriesFolderSection = dynamic(() =>
    import("@/components/sections/IndustriesFolderSection").then(m => ({ default: m.IndustriesFolderSection }))
);
const BentoGridSection = dynamic(() =>
    import("@/components/sections/BentoGridSection").then(m => ({ default: m.BentoGridSection }))
);
const TestimonialsSection = dynamic(() =>
    import("@/components/sections/TestimonialsSection").then(m => ({ default: m.TestimonialsSection }))
);
const ProcessSection = dynamic(() =>
    import("@/components/sections/ProcessSection").then(m => ({ default: m.ProcessSection }))
);
const CaseStudiesSection = dynamic(() =>
    import("@/components/sections/CaseStudiesSection").then(m => ({ default: m.CaseStudiesSection }))
);
const FAQSection = dynamic(() =>
    import("@/components/sections/FAQSection").then(m => ({ default: m.FAQSection }))
);
const CTASection = dynamic(() =>
    import("@/components/sections/CTASection").then(m => ({ default: m.CTASection }))
);

export default function Home() {
    return (
        <>
            <FAQSchema faqs={homeFaqs} />
            <Hero />
            <AboutSection />
            <FeaturesSection />
            <IndustriesFolderSection />
            <BentoGridSection />
            <TestimonialsSection />
            <ProcessSection />
            <CaseStudiesSection />
            <FAQSection />
            <CTASection />
        </>
    );
}
