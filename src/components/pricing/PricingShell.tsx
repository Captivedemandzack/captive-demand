'use client';

import React from 'react';
import { GoogleReCaptchaContext, GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import { PricingLeadProvider } from '@/components/pricing/pricing-lead-context';
import { PricingQualifyModal } from '@/components/pricing/PricingQualifyModal';

const EMPTY_RECAPTCHA_CTX = { executeRecaptcha: undefined };

export function PricingShell({ children }: { children: React.ReactNode }) {
  const skipRecaptcha = process.env.NEXT_PUBLIC_SKIP_RECAPTCHA === 'true';
  const key = skipRecaptcha ? '' : (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? '');

  const inner = (
    <PricingLeadProvider>
      {children}
      <PricingQualifyModal />
    </PricingLeadProvider>
  );

  if (!key) {
    return <GoogleReCaptchaContext.Provider value={EMPTY_RECAPTCHA_CTX}>{inner}</GoogleReCaptchaContext.Provider>;
  }

  return <GoogleReCaptchaProvider reCaptchaKey={key}>{inner}</GoogleReCaptchaProvider>;
}
