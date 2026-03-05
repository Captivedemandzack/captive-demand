'use client';

import React from 'react';
import { CaseStudyPageContent } from '@/components/work/CaseStudyPage';
import type { CaseStudy } from '@/data/case-studies';

export function CaseStudyPageClient({ study }: { study: CaseStudy }) {
  return (
    <main className="w-full bg-[#FAFAFA] min-h-screen">
      <CaseStudyPageContent study={study} />
    </main>
  );
}
