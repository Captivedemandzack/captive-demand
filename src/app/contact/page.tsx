import type { Metadata } from 'next';
import { ContactHero } from '@/components/contact/ContactHero';
import { TestimonialMarquee } from '@/components/contact/TestimonialMarquee';
import { TrustBar } from '@/components/contact/TrustBar';
import { ContactFAQ } from '@/components/contact/ContactFAQ';

export const metadata: Metadata = {
  title: 'Contact | Captive Demand',
  description:
    'Start your project with Captive Demand. Tell us about your goals — we respond within 24 hours.',
};

export default function ContactPage() {
  return (
    <main className="w-full bg-[#FAFAFA] min-h-screen">
      <ContactHero />
      <TestimonialMarquee />
      <TrustBar />
      <ContactFAQ />
    </main>
  );
}
