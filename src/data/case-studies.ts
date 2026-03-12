export type CaseStudyStat = {
  value: string;
  label: string;
  context: string;
};

export type CaseStudyTestimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarSrc: string;
};

export type CaseStudy = {
  slug: string;
  clientName: string;
  logoSrc: string;
  industry: string;
  year: string;
  headline: string;
  shortDescription: string;
  websiteUrl: string;
  featured: boolean;
  services: string[];
  industryTag: string;
  stats: CaseStudyStat[];
  testimonial: CaseStudyTestimonial;
  overview: string;
  challenge: string;
  solution: string;
  results: string;
  timeline: string;
  heroImage: string;
  galleryImages: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "mentality-health",
    clientName: "Mentality Health",
    logoSrc: "",
    industry: "Health & Wellness",
    year: "2026",
    headline: "A conversion-optimized website that drives engagement and reduces bounce.",
    shortDescription:
      "Website design, development, and CRO that increased organic sessions and engagement while dramatically reducing bounce rate.",
    websiteUrl: "",
    featured: true,
    services: ["Website Design", "Website Development", "CRO"],
    industryTag: "Health & Wellness",
    stats: [
      { value: "5,646", label: "Organic Sessions", context: "Since Launch · Jan–Mar 2026" },
      { value: "+22.5%", label: "Engagement Time Increase", context: "Month-over-Month" },
      { value: "-32.9%", label: "Bounce Rate Reduction", context: "96% down to 64.4%" },
    ],
    testimonial: {
      quote:
        "Captive Demand delivered a website that truly represents our brand and drives real results. The team understood our vision from day one.",
      author: "Partner",
      role: "Team",
      company: "Mentality Health",
      avatarSrc: "/spencer-donaldson.jpg",
    },
    overview:
      "Mentality Health needed a modern, conversion-focused website that could attract and retain visitors in the competitive health and wellness space.",
    challenge:
      "The existing site had a 96% bounce rate and minimal engagement. Visitors were leaving before understanding the value proposition.",
    solution:
      "We redesigned and developed a new website with a focus on conversion optimization, clear messaging, and an intuitive user experience that keeps visitors engaged.",
    results:
      "Organic sessions grew to 5,646 since launch. Engagement time increased 22.5% month-over-month. Bounce rate dropped from 96% to 64.4%.",
    timeline: "3 months",
    heroImage: "/mantalitycover2.png",
    galleryImages: ["/mantalitycover2.png", "/mockup3.png", "/mockup4.png"],
  },
  {
    slug: "custom-cowgirl",
    clientName: "Custom Cowgirl",
    logoSrc: "",
    industry: "FASHION",
    year: "2025",
    headline: "A modern e-commerce experience that keeps visitors exploring.",
    shortDescription:
      "Website design and development for an apparel brand with a focus on session duration and pages per visit.",
    websiteUrl: "https://customcowgirl.com",
    featured: true,
    services: ["Website Design", "Website Development"],
    industryTag: "Fashion",
    stats: [
      { value: "1,057", label: "Total Sessions", context: "Nov 2025 – Mar 2026" },
      { value: "1:48", label: "Avg. Session Duration", context: "Visitors staying & exploring" },
      { value: "2.02", label: "Pages Per Session", context: "Avg. pages per visit" },
    ],
    testimonial: {
      quote:
        "Our new website has transformed how customers interact with our brand. The team understood exactly what we needed.",
      author: "Partner",
      role: "Team",
      company: "Custom Cowgirl",
      avatarSrc: "/spencer-donaldson.jpg",
    },
    overview:
      "Custom Cowgirl needed a refreshed e-commerce presence that would encourage visitors to explore and convert.",
    challenge:
      "The previous site had low session duration and visitors weren't exploring multiple pages.",
    solution:
      "We designed and built a modern e-commerce website with intuitive navigation, compelling product presentation, and a seamless shopping experience.",
    results:
      "Total sessions reached 1,057 in the first five months. Average session duration hit 1:48, with visitors exploring 2.02 pages per session.",
    timeline: "5 months",
    heroImage: "/customcowgirlcover2.png",
    galleryImages: ["/customcowgirlcover2.png", "/mockup3.png", "/mockup4.png"],
  },
  {
    slug: "work-from-home-investor",
    clientName: "Work From Home Investor",
    logoSrc: "",
    industry: "Education",
    year: "2024",
    headline: "An authoritative platform that engages and converts.",
    shortDescription:
      "Website design and development for a real estate investment education platform with strong engagement metrics.",
    websiteUrl: "https://wfhinvestor.com",
    featured: true,
    services: ["Website Design", "Website Development"],
    industryTag: "EDUCATION",
    stats: [
      { value: "739", label: "Total Sessions", context: "16 Months Since Launch" },
      { value: "49.5 sec", label: "Avg. Engagement Time", context: "Last 30 Days" },
      { value: "19.49%", label: "Engagement Rate", context: "Last 16 Months" },
    ],
    testimonial: {
      quote:
        "Captive Demand built us a platform that commands attention and keeps our audience engaged. The results speak for themselves.",
      author: "Partner",
      role: "Team",
      company: "Work From Home Investor",
      avatarSrc: "/spencer-donaldson.jpg",
    },
    overview:
      "Work From Home Investor needed a professional, authoritative website for their real estate investment education platform.",
    challenge:
      "The platform needed to establish credibility and keep visitors engaged in a competitive finance and lifestyle space.",
    solution:
      "We designed and developed a clean, authoritative website that communicates expertise and encourages visitors to explore content and take action.",
    results:
      "739 total sessions over 16 months. Average engagement time of 49.5 seconds in the last 30 days. 19.49% engagement rate over the full period.",
    timeline: "16 months",
    heroImage: "/wfhcover2.png",
    galleryImages: ["/wfhcover2.png", "/mockup3.png", "/mockup4.png"],
  },
  {
    slug: "farmulated",
    clientName: "Farmulated",
    logoSrc: "/logos/farmulated.png",
    industry: "Health & Wellness",
    year: "2024",
    headline: "From page 5 to position 1 in a hyper-competitive CBD market.",
    shortDescription:
      "A complete SEO and content overhaul that transformed Farmulated from invisible to industry-dominant in organic search.",
    websiteUrl: "https://farmulated.com",
    featured: false,
    services: ["SEO", "Content Strategy", "AEO"],
    industryTag: "Health & Wellness",
    stats: [
      { value: "+816%", label: "Organic Traffic", context: "1,200 → 11,000 Sessions/Mo" },
      { value: "+40%", label: "Revenue Growth", context: "Year-over-Year" },
      { value: "6.61%", label: "Conversion Rate", context: "Up 145%" },
    ],
    testimonial: {
      quote:
        "Spencer is knowledgeable, patient, and open to listen! He's willing to try anything to help move the needle, and he's easy to talk to... I feel like he really cares about our business. In addition, our traffic has grown from 1,200 users per month to 11,000 users per month and revenue has increased by 34% YOY.",
      author: "Tricia Restifo",
      role: "VP Finance",
      company: "Farmulated",
      avatarSrc: "/tricia.webp",
    },
    overview:
      "Farmulated came to us buried on page 5 of Google for every keyword that mattered. In a CBD market flooded with well-funded competitors, they needed a strategy that could break through the noise without outspending the competition. We built a comprehensive SEO and AEO foundation from scratch.",
    challenge:
      "The CBD wellness space is one of the most competitive verticals in organic search. Farmulated was competing against brands with 10x their budget, zero domain authority to speak of, and a website that search engines struggled to crawl properly. Their content was thin, their technical foundation was broken, and they had no presence in AI-generated search results.",
    solution:
      "We executed a three-phase approach: First, a full technical audit and rebuild — fixing crawlability, site speed, and schema markup. Second, a content strategy targeting 50+ high-intent keywords with pillar pages and supporting clusters. Third, an AEO layer that structured their content for AI citation in ChatGPT and Google SGE results. Every piece of content was built to serve both traditional search and AI discovery.",
    results:
      "Within 6 months, Farmulated went from page 5 to position 1 for 34 high-intent keywords. Organic traffic increased by 427%, and revenue from organic channels grew 34% year-over-year. They're now consistently cited in AI overviews for CBD-related queries, driving a new channel of zero-click authority traffic.",
    timeline: "6 months",
    heroImage: "/farmulatedcover2.png",
    galleryImages: [
      "/farmulatedcover2.png",
      "/mockup3.png",
      "/mockup4.png",
    ],
  },
  {
    slug: "voyage-and-vibes",
    clientName: "Voyage & Vibes",
    logoSrc: "",
    industry: "Travel Agency & Tours",
    year: "2024",
    headline: "A fully operational booking system, CRM, and custom dashboard — every trip sold out.",
    shortDescription:
      "Web design & development, booking system, CRM, and marketing automation for a Nashville-based travel experience company.",
    websiteUrl: "",
    featured: false,
    services: ["Website Design", "Website Development", "CRM", "Marketing Automation", "Booking System"],
    industryTag: "Travel Agency & Tours",
    stats: [
      { value: "20,000", label: "Monthly Website Visits", context: "Consistent monthly traffic" },
      { value: "100%", label: "YoY Revenue Growth", context: "Year-over-Year" },
      { value: "100%", label: "Trips Sold Out", context: "Every trip at full capacity" },
    ],
    testimonial: {
      quote:
        "Voyage & Vibes launched with a fully operational booking system, CRM, and custom dashboard — and the results speak for themselves. Every trip since launch has sold out at 100% capacity. The site now drives 20,000 visits a month, and the business has grown 100% year-over-year.",
      author: "Partner",
      role: "Team",
      company: "Voyage & Vibes",
      avatarSrc: "/spencer-donaldson.jpg",
    },
    overview:
      "Voyage & Vibes is a Nashville-based travel experience company specializing in curated group trips. They offer themed travel experiences across adventure, cultural, culinary & wine, and fitness & wellness — handling everything from planning to execution for a fully stress-free experience.",
    challenge:
      "Voyage & Vibes needed a scalable digital infrastructure to support their growing travel business — from booking to customer management to marketing.",
    solution:
      "We built a visually engaging, user-friendly website with a full end-to-end booking flow. We created a custom trip management dashboard for internal operations, implemented a full CRM to manage customer relationships, and integrated marketing automation for customer communication and trip promotion.",
    results:
      "Voyage & Vibes launched with a fully operational booking system, CRM, and custom dashboard — and the results speak for themselves. Every trip since launch has sold out at 100% capacity. The site now drives 20,000 visits a month, and the business has grown 100% year-over-year.",
    timeline: "6 months",
    heroImage: "/voyagecover2.png",
    galleryImages: ["/voyagecover2.png", "/mockup3.png", "/mockup4.png"],
  },
  {
    slug: "boombox",
    clientName: "Boombox",
    logoSrc: "/logos/boombox.svg",
    industry: "Entertainment",
    year: "2025",
    headline: "Built topical authority from scratch in 4 months.",
    shortDescription:
      "Technical SEO and entity-building strategy that earned AI citations across ChatGPT and Google SGE for a music tech startup.",
    websiteUrl: "https://boombox.com",
    featured: false,
    services: ["Website Design", "Website Development", "Technical SEO", "Entity SEO", "AEO"],
    industryTag: "Entertainment",
    stats: [
      { value: "+512%", label: "Search Visibility", context: "in 4 months" },
      { value: "47", label: "AI Citations", context: "across ChatGPT & SGE" },
      { value: "3x", label: "Organic Leads", context: "quarter-over-quarter" },
    ],
    testimonial: {
      quote:
        "I've been working in SEO for about a decade now. I've always built my teams in-house because agencies always tend to be too expensive or terrible quality. Captive had very fair prices and followed a process nearly identical to the one I was used to running with my in-house teams, so I knew the quality would be excellent.",
      author: "Jordan Schneider",
      role: "Head of Marketing",
      company: "Boombox",
      avatarSrc: "/Jordan.jpeg",
    },
    overview:
      "Boombox is an AI-powered karaoke platform entering a crowded entertainment tech market. Despite having a strong product, they had zero organic search presence and no topical authority. They needed to build credibility with both Google and AI search models simultaneously.",
    challenge:
      "Starting from zero domain authority in a space dominated by established players means every ranking has to be earned through strategic content and technical excellence. Boombox had no content ecosystem, minimal backlinks, and wasn't structured for AI discovery. Their competitors had years of content head start.",
    solution:
      "We implemented a full technical SEO foundation, then built an entity-first content strategy designed for AI comprehension. This included structured data markup, topical cluster content targeting 80+ keywords, and an AEO layer that made Boombox's content machine-readable for AI models. We focused on becoming the definitive source for AI karaoke and music tech topics.",
    results:
      "Within 4 months, search visibility increased 512%. Boombox earned 47 AI citations across ChatGPT and Google SGE results. Organic lead generation tripled quarter-over-quarter. They're now recognized as a topical authority in the AI music space, with content being cited by AI models as a primary source.",
    timeline: "4 months",
    heroImage: "/boomboxcover2.png",
    galleryImages: [
      "/boomboxcover2.png",
      "/mockup3.png",
      "/mockup4.png",
    ],
  },
  {
    slug: "velocity-international",
    clientName: "Velocity International Group",
    logoSrc: "/logos/velocity.png",
    industry: "Logistics & 3PL",
    year: "2024",
    headline: "67% YoY growth for three consecutive years — infrastructure that scales.",
    shortDescription:
      "Website design & development, custom software, SEO, and business process development for a Nashville-based same-day courier and 3PL logistics company.",
    websiteUrl: "https://velocityintl.com",
    featured: false,
    services: ["Website Design", "Website Development", "SEO", "Custom Software", "Analytics & Reporting", "Business Process Development"],
    industryTag: "Logistics & 3PL",
    stats: [
      { value: "67%", label: "YoY Revenue Growth", context: "3 consecutive years" },
      { value: "3 yrs", label: "Consecutive Growth", context: "" },
      { value: "40%", label: "Reduction in Admin Time", context: "Through custom software & process builds" },
      { value: "2x", label: "Hiring Efficiency", context: "Faster onboarding, better retention" },
    ],
    testimonial: {
      quote:
        "Velocity International has grown 67% year-over-year for three consecutive years — and the infrastructure we've built together is a big part of why. From a performance website and SEO to custom internal software and business processes, every engagement has been focused on making the business faster, leaner, and more scalable. The result is a logistics company that doesn't just move freight — it runs like one.",
      author: "Ben Elizer",
      role: "CEO",
      company: "Velocity International Group",
      avatarSrc: "/ben.webp",
    },
    overview:
      "Velocity International Group is a Nashville-based same-day courier and 3PL logistics company serving businesses of all sizes. They offer local and long-distance expedited shipping, warehousing, and fulfillment — built around reliability and speed.",
    challenge:
      "Velocity needed to scale operations without scaling headcount. Manual processes, outdated systems, and lack of visibility were limiting growth.",
    solution:
      "We built and continue to support a full website that positions Velocity as a credible logistics partner. We built internal software tooling to streamline operations and reduce manual work. We implemented ongoing SEO, full GA4 setup, custom analytics, and business process development across hiring, onboarding, and fulfillment workflows.",
    results:
      "Velocity International has grown 67% year-over-year for three consecutive years. Custom software and process builds reduced admin time by 40%. Hiring efficiency doubled through faster onboarding and better retention.",
    timeline: "3 years",
    heroImage: "/velocitycover2.png",
    galleryImages: [
      "/velocitycover2.png",
      "/mockup4.png",
      "/farmulated.png",
    ],
  },
  {
    slug: "endura-commerce",
    clientName: "Endura Commerce",
    logoSrc: "/logos/enduracommerce.svg",
    industry: "Fintech / Payment Processing",
    year: "2024",
    headline: "Full lead generation infrastructure from scratch — CRM, data, workflows, campaigns, and funnels.",
    shortDescription:
      "Marketing automation, CRM, email marketing, and website & funnel builds for a Nashville-based fintech company (formerly Verity Payment Solutions).",
    websiteUrl: "",
    featured: false,
    services: ["Marketing Automation", "CRM Setup", "Email Marketing", "Website Design", "Website Development", "Sales Funnels"],
    industryTag: "Fintech / Payment Processing",
    stats: [
      { value: "3x", label: "Monthly Lead Volume", context: "From automated email campaigns" },
      { value: "40%+", label: "Email Open Rate", context: "Above industry average" },
      { value: "5", label: "Active Funnels Built", context: "Websites, landing pages & workflows" },
    ],
    testimonial: {
      quote:
        "Endura Commerce came to us with a strong service offering and no scalable way to generate leads. We built the full infrastructure from scratch — CRM, data, workflows, campaigns, websites, and funnels — and turned it into a consistent, automated lead generation engine. The result is a fintech brand that now competes for the merchants that bigger processors overlook, with the systems to prove it.",
      author: "Partner",
      role: "Team",
      company: "Endura Commerce",
      avatarSrc: "/spencer-donaldson.jpg",
    },
    overview:
      "Endura Commerce (formerly Verity Payment Solutions) is a Nashville-based fintech company specializing in payment processing solutions for small and mid-sized businesses. With over 30 years of combined experience, they exist specifically to serve the merchants that big-box processors ignore.",
    challenge:
      "Endura Commerce had a strong service offering but no scalable way to generate leads. They needed full infrastructure — CRM, data, workflows, campaigns, websites, and funnels.",
    solution:
      "We built a custom CRM to manage leads and pipeline. We sourced high-quality prospect data and designed automated email workflows for lead nurturing, onboarding, and re-engagement. We designed and built multiple websites and conversion funnels to support campaigns and capture inbound interest.",
    results:
      "Endura Commerce came to us with a strong service offering and no scalable way to generate leads. We built the full infrastructure from scratch — CRM, data, workflows, campaigns, websites, and funnels — and turned it into a consistent, automated lead generation engine. The result is a fintech brand that now competes for the merchants that bigger processors overlook, with the systems to prove it.",
    timeline: "6 months",
    heroImage: "/enduracover2.png",
    galleryImages: [
      "/enduracover2.png",
      "/mockup3.png",
      "/farmulated.png",
    ],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((cs) => cs.featured);
}

export function getAllSlugs(): string[] {
  return caseStudies.map((cs) => cs.slug);
}

export function getServiceFilters(): string[] {
  const services = new Set<string>();
  caseStudies.forEach((cs) => cs.services.forEach((s) => services.add(s)));
  return Array.from(services);
}

/** Live websites: case studies + additional live-only sites (more live sites than case studies) */
export function getLiveWebsites(): CaseStudy[] {
  const withUrl = caseStudies.filter((cs) => cs.websiteUrl);
  const liveOnly: CaseStudy[] = [
    {
      slug: "new-you-laser",
      clientName: "New You Laser NYC",
      logoSrc: "/logos/theskinreal.png",
      industry: "Health & Wellness",
      year: "2024",
      headline: "Wake Up Smooth. Every Single Day.",
      shortDescription: "Laser hair removal and skincare clinic with a modern, conversion-focused website.",
      websiteUrl: "https://newyoulasernyc.com",
      featured: false,
      services: ["Website Design", "SEO"],
      industryTag: "Health & Wellness",
      stats: [{ value: "+40%", label: "Booking Rate", context: "post-launch" }],
      testimonial: { quote: "", author: "", role: "", company: "", avatarSrc: "" },
      overview: "",
      challenge: "",
      solution: "",
      results: "",
      timeline: "",
      heroImage: "/newyou.png",
      galleryImages: [],
    },
    {
      slug: "eos-wellness",
      clientName: "EOS Wellness",
      logoSrc: "/logos/eoswellness.png",
      industry: "Health & Wellness",
      year: "2024",
      headline: "Wellness reimagined.",
      shortDescription: "Holistic wellness brand with an elegant, conversion-optimized web presence.",
      websiteUrl: "https://eoswellness.com",
      featured: false,
      services: ["Website Design", "Branding"],
      industryTag: "Health & Wellness",
      stats: [{ value: "3x", label: "Lead Growth", context: "in 6 months" }],
      testimonial: { quote: "", author: "", role: "", company: "", avatarSrc: "" },
      overview: "",
      challenge: "",
      solution: "",
      results: "",
      timeline: "",
      heroImage: "/eos-new.png",
      galleryImages: [],
    },
    {
      slug: "dubsy",
      clientName: "Dubsy",
      logoSrc: "/logos/dubsy.svg",
      industry: "SaaS",
      year: "2025",
      headline: "AI-powered dubbing for global reach.",
      shortDescription: "SaaS platform for AI dubbing and localization with a sleek, product-led site.",
      websiteUrl: "https://dubsy.com",
      featured: false,
      services: ["Website Design", "Software"],
      industryTag: "SaaS",
      stats: [{ value: "50+", label: "Languages", context: "supported" }],
      testimonial: { quote: "", author: "", role: "", company: "", avatarSrc: "" },
      overview: "",
      challenge: "",
      solution: "",
      results: "",
      timeline: "",
      heroImage: "/dubsy-art.gif",
      galleryImages: [],
    },
    {
      slug: "first-future",
      clientName: "First Future",
      logoSrc: "/logos/firstfuture.png",
      industry: "Finance",
      year: "2025",
      headline: "Building the future of finance.",
      shortDescription: "Fintech startup with a bold, trust-building website design.",
      websiteUrl: "https://firstfuture.com",
      featured: false,
      services: ["Website Design", "Branding"],
      industryTag: "Finance",
      stats: [{ value: "$2M+", label: "Raised", context: "seed round" }],
      testimonial: { quote: "", author: "", role: "", company: "", avatarSrc: "" },
      overview: "",
      challenge: "",
      solution: "",
      results: "",
      timeline: "",
      heroImage: "/ff-vid.gif",
      galleryImages: [],
    },
    {
      slug: "wfh-investor",
      clientName: "WFH Investor",
      logoSrc: "/logos/arete.png",
      industry: "Real Estate",
      year: "2024",
      headline: "Invest from anywhere.",
      shortDescription: "Real estate investment education platform with a clean, authoritative design.",
      websiteUrl: "https://wfhinvestor.com",
      featured: false,
      services: ["Website Design", "SEO"],
      industryTag: "Real Estate",
      stats: [{ value: "10K+", label: "Students", context: "enrolled" }],
      testimonial: { quote: "", author: "", role: "", company: "", avatarSrc: "" },
      overview: "",
      challenge: "",
      solution: "",
      results: "",
      timeline: "",
      heroImage: "/wfh-new2.png",
      galleryImages: [],
    },
  ];
  return [...withUrl, ...liveOnly];
}
