'use client';

import { GoogleReCaptchaContext, GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import { recaptchaSiteKey } from '@/lib/recaptcha-config';

const EMPTY_RECAPTCHA_CTX = { executeRecaptcha: undefined };

export function SiteReCaptchaProvider({ children }: { children: React.ReactNode }) {
  const key = recaptchaSiteKey();

  if (!key) {
    return <GoogleReCaptchaContext.Provider value={EMPTY_RECAPTCHA_CTX}>{children}</GoogleReCaptchaContext.Provider>;
  }

  return <GoogleReCaptchaProvider reCaptchaKey={key}>{children}</GoogleReCaptchaProvider>;
}
