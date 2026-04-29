import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { HomepageDeferredSections } from "@/components/sections/HomepageDeferredSections";
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

export default function Home() {
    return (
        <>
            <FAQSchema faqs={homeFaqs} />
            <Hero />
            <HomepageDeferredSections />
        </>
    );
}
