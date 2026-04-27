import type { Metadata } from 'next';
import { WorkArchive } from '@/components/work/WorkArchive';

export const metadata: Metadata = {
  title: 'Digital Agency Case Studies',
  description:
    'Explore Captive Demand case studies across web design, SEO, email marketing, software, and automation for growing companies.',
  alternates: { canonical: '/work' },
  openGraph: {
    title: 'Digital Agency Case Studies | Captive Demand',
    description:
      'Real website, SEO, software, automation, and email marketing work from Captive Demand.',
    url: '/work',
  },
};

export default function WorkPage() {
  return (
    <main className="w-full bg-[#FAFAFA] min-h-screen">
      <WorkArchive />
    </main>
  );
}
