'use client';

import { PricingLeadProvider } from '@/components/pricing/pricing-lead-context';
import { PricingQualifyModal } from '@/components/pricing/PricingQualifyModal';

export function PricingShell({ children }: { children: React.ReactNode }) {
  return (
    <PricingLeadProvider>
      {children}
      <PricingQualifyModal />
    </PricingLeadProvider>
  );
}
