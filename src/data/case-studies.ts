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
    slug: "farmulated",
    clientName: "Farmulated",
    logoSrc: "/logos/farmulated.png",
    industry: "Health & Wellness",
    year: "2024",
    headline: "From page 5 to position 1 in a hyper-competitive CBD market.",
    shortDescription:
      "A complete SEO and content overhaul that transformed Farmulated from invisible to industry-dominant in organic search.",
    websiteUrl: "https://farmulated.com",
    featured: true,
    services: ["SEO", "Content Strategy", "AEO"],
    industryTag: "Health & Wellness",
    stats: [
      { value: "+427%", label: "Organic Traffic", context: "in 6 months" },
      { value: "34", label: "Page 1 Rankings", context: "high-intent keywords" },
      { value: "+34%", label: "Revenue YOY", context: "from organic" },
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
    heroImage: "/farmulated.png",
    galleryImages: [
      "/farmulated.png",
      "/mockup3.png",
      "/mockup4.png",
    ],
  },
  {
    slug: "north-star-nature-suites",
    clientName: "North Star Nature Suites",
    logoSrc: "/logos/arcticelevation.png",
    industry: "Hospitality",
    year: "2024",
    headline: "Dominated local search and cut OTA dependency by 60%.",
    shortDescription:
      "Local SEO and schema markup strategy that drove direct bookings and reduced reliance on third-party booking platforms.",
    websiteUrl: "https://northstarnaturesuites.com",
    featured: true,
    services: ["Local SEO", "Website Design", "Schema Markup"],
    industryTag: "Hospitality",
    stats: [
      { value: "+289%", label: "Direct Bookings", context: "year-over-year" },
      { value: "60%", label: "OTA Dependency Cut", context: "in 4 months" },
      { value: "#1", label: "Local Pack", context: "luxury cabin rentals" },
    ],
    testimonial: {
      quote:
        "Our business went from only referral-based clients to having an entire authoritative online presence that allowed us to grow by over 1,000% in our first true year of business. It opened doors to partnerships that we did not believe were possible.",
      author: "Matthew Ford",
      role: "Founder",
      company: "North Star Nature Suites",
      avatarSrc: "/matthew.webp",
    },
    overview:
      "North Star Nature Suites is a luxury cabin rental property in a competitive hospitality market. They were hemorrhaging margin to OTA platforms like Airbnb and VRBO, paying 15-20% commissions on every booking. They needed direct bookings driven by organic search.",
    challenge:
      "The hospitality industry is dominated by OTAs with massive domain authority. Competing for local search visibility against Airbnb, VRBO, and Booking.com requires a precision strategy. North Star had no local SEO foundation, no schema markup, and a website that wasn't optimized for conversion.",
    solution:
      "We built a comprehensive local SEO strategy: Google Business Profile optimization, location-specific landing pages, and rich schema markup for lodging and reviews. The website was redesigned with a focus on direct booking conversion. We implemented FAQ and review schema to capture rich snippet real estate in search results.",
    results:
      "Direct bookings increased 289% year-over-year. OTA dependency dropped from 85% to 25% of total revenue. North Star now holds the #1 position in the local pack for luxury cabin rental searches in their market, and their average booking value increased 22% through direct-channel upselling.",
    timeline: "4 months",
    heroImage: "/northstarnaturesuites.png",
    galleryImages: [
      "/northstarnaturesuites.png",
      "/mockup3.png",
      "/mockup4.png",
    ],
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
    featured: true,
    services: ["Technical SEO", "Entity SEO", "AEO"],
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
    heroImage: "/boombox.png",
    galleryImages: [
      "/boombox.png",
      "/mockup3.png",
      "/mockup4.png",
    ],
  },
  {
    slug: "velocity-international",
    clientName: "Velocity International",
    logoSrc: "/logos/velocity.png",
    industry: "Logistics",
    year: "2025",
    headline: "A website that finally matched the scale of the business.",
    shortDescription:
      "Enterprise-grade website redesign and email automation that repositioned Velocity as a market leader in global logistics.",
    websiteUrl: "https://velocityintl.com",
    featured: false,
    services: ["Website Design", "Email Marketing", "Branding"],
    industryTag: "Logistics",
    stats: [
      { value: "4.2x", label: "Lead Conversion", context: "post-redesign" },
      { value: "+156%", label: "Email Revenue", context: "in 3 months" },
      { value: "38%", label: "Bounce Rate Drop", context: "site-wide" },
    ],
    testimonial: {
      quote:
        "Captive Demand is different than any other agency we have worked with. They take a genuine interest in your success and back up their promises with results. Our website is everything we wanted and more.",
      author: "Ben Elizer",
      role: "CEO",
      company: "Velocity International",
      avatarSrc: "/ben.webp",
    },
    overview:
      "Velocity International is a global logistics company with enterprise clients, but their digital presence told a different story. Their website looked like it was built in 2015, their email marketing was nonexistent, and they were losing deals to competitors with better-looking brands.",
    challenge:
      "In B2B logistics, trust is everything. Velocity's outdated website was actively undermining their sales team's efforts. Prospects would visit the site after a great sales call and immediately question the company's capabilities. The disconnect between their actual service quality and their digital presence was costing them six-figure contracts.",
    solution:
      "We redesigned the entire web presence from the ground up — a modern, enterprise-grade website that communicated scale and reliability. We implemented a full email marketing automation system with nurture sequences, proposal follow-ups, and re-engagement campaigns. The brand was refreshed to match the caliber of their client roster.",
    results:
      "Lead conversion increased 4.2x after the redesign. Email marketing generated a 156% increase in revenue within the first 3 months. Site-wide bounce rate dropped 38%, and average session duration doubled. The sales team reported that prospects now arrive to calls already pre-sold on Velocity's capabilities.",
    timeline: "8 weeks",
    heroImage: "/mockup3.png",
    galleryImages: [
      "/mockup3.png",
      "/mockup4.png",
      "/farmulated.png",
    ],
  },
  {
    slug: "apex-digital",
    clientName: "Apex Digital",
    logoSrc: "/logos/encappture.png",
    industry: "SaaS",
    year: "2025",
    headline: "Automated 80% of their marketing ops in 6 weeks.",
    shortDescription:
      "Marketing automation and email infrastructure that freed up 30+ hours per week and doubled their lead-to-close rate.",
    websiteUrl: "https://apexdigital.io",
    featured: false,
    services: ["Marketing Automation", "Email Marketing", "SEO"],
    industryTag: "SaaS",
    stats: [
      { value: "80%", label: "Ops Automated", context: "in 6 weeks" },
      { value: "2x", label: "Close Rate", context: "lead-to-customer" },
      { value: "30+", label: "Hours Saved", context: "per week" },
    ],
    testimonial: {
      quote:
        "They are always on time and they're always willing to listen to my non-tech vision and translate the vision into core pieces of my business. They are responsive, have a high quality of work, and always listen to my goals.",
      author: "Bonnie Paik",
      role: "Owner",
      company: "Apex Digital",
      avatarSrc: "/bonnie.webp",
    },
    overview:
      "Apex Digital is a fast-growing SaaS company whose marketing team was drowning in manual processes. Lead scoring, email sequences, follow-ups, and reporting were all handled manually — consuming over 30 hours per week of skilled labor on tasks that should be automated.",
    challenge:
      "The marketing team was spending more time on operational tasks than strategic work. Manual lead scoring meant hot leads went cold. Email sequences were inconsistent. Reporting took days to compile. The team was burning out, and growth was plateauing because they couldn't scale their efforts without scaling headcount.",
    solution:
      "We implemented a full marketing automation stack: automated lead scoring and routing, multi-touch email nurture sequences triggered by behavior, real-time reporting dashboards, and integration between their CRM, email platform, and analytics tools. Every workflow was designed to eliminate manual touchpoints while maintaining personalization.",
    results:
      "Within 6 weeks, 80% of their marketing operations were automated. The lead-to-close rate doubled as hot leads were routed instantly. The team recovered 30+ hours per week, redirecting that time into strategic initiatives that drove a 45% increase in pipeline value the following quarter.",
    timeline: "6 weeks",
    heroImage: "/mockup4.png",
    galleryImages: [
      "/mockup4.png",
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
