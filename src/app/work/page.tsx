import { WorkArchive } from '@/components/work/WorkArchive';
import { createSeoMetadata } from '@/lib/site';

export const metadata = createSeoMetadata({
  title: 'Digital Agency Case Studies',
  description:
    'Explore Captive Demand case studies across web design, SEO, email marketing, software, and automation for growing companies.',
  path: '/work',
});

export default function WorkPage() {
  return (
    <main className="w-full bg-[#FAFAFA] min-h-screen">
      <WorkArchive />
    </main>
  );
}
