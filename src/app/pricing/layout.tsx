import { DM_Mono, DM_Sans } from 'next/font/google';

import { PricingShell } from '@/components/pricing/PricingShell';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-pricing-sans',
  weight: ['400', '700'],
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-pricing-mono',
  weight: ['400', '500'],
  display: 'swap',
});

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${dmSans.variable} ${dmMono.variable}`}>
      <PricingShell>{children}</PricingShell>
    </div>
  );
}
