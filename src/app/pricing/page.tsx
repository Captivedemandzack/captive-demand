import type { Metadata } from 'next';
import { PricingPageClient } from '@/components/pricing/PricingPageClient';

export const metadata: Metadata = {
  title: 'Pricing for Websites, SEO, and Growth Systems',
  description:
    'Review Captive Demand pricing for websites, SEO/AEO, email marketing, automation, and software projects built for growth-stage teams.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'Pricing | Captive Demand',
    description:
      'Pricing for websites, SEO/AEO, email marketing, automation, and software projects.',
    url: '/pricing',
  },
};

export default function PricingPage() {
  return <PricingPageClient />;
}
