import { Hero } from "@/components/sections/Hero";
import { HomepageDeferredSections } from "@/components/sections/HomepageDeferredSections";
import { FAQSchema } from "@/components/schema/FAQSchema";
import { homeFaqs } from "@/lib/home-faqs";
import { createSeoMetadata } from "@/lib/site";

export const metadata = createSeoMetadata({
    title: "Nashville Web Design & SEO Agency",
    description:
        "Captive Demand builds websites, SEO/AEO systems, email marketing, automation, and software for growth-stage brands and Nashville businesses.",
    path: "/",
});

export default function Home() {
    return (
        <>
            <FAQSchema faqs={homeFaqs} />
            <Hero />
            <HomepageDeferredSections />
        </>
    );
}
