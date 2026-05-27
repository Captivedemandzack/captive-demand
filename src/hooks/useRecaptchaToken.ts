'use client';

import { useCallback } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import { isRecaptchaEnabled } from '@/lib/recaptcha-config';

export type RecaptchaTokenResult =
  | { ok: true; token: string }
  | { ok: false; error: string };

export function useRecaptchaToken() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const getToken = useCallback(
    async (action: string): Promise<RecaptchaTokenResult> => {
      if (!isRecaptchaEnabled()) {
        return { ok: true, token: '' };
      }

      if (!executeRecaptcha) {
        return { ok: false, error: 'Security check is still loading. Try again in a moment.' };
      }

      try {
        const token = await executeRecaptcha(action);
        if (!token) {
          return { ok: false, error: 'Something went wrong. Please try again.' };
        }
        return { ok: true, token };
      } catch {
        return { ok: false, error: 'Something went wrong. Please try again.' };
      }
    },
    [executeRecaptcha],
  );

  return { getToken };
}
