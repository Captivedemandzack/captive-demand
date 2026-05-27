export function isRecaptchaSkipped(): boolean {
  return process.env.NEXT_PUBLIC_SKIP_RECAPTCHA === 'true';
}

/** Client-side: load the reCAPTCHA script when a site key exists and skip is off. */
export function isRecaptchaEnabled(): boolean {
  return !isRecaptchaSkipped() && Boolean(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
}

/** Server-side: verify tokens when a secret exists and skip flags are off. */
export function isRecaptchaVerificationEnabled(): boolean {
  return (
    process.env.SKIP_RECAPTCHA_VERIFICATION !== 'true' &&
    process.env.NEXT_PUBLIC_SKIP_RECAPTCHA !== 'true' &&
    Boolean(process.env.RECAPTCHA_SECRET_KEY)
  );
}

export function recaptchaSiteKey(): string {
  if (isRecaptchaSkipped()) return '';
  return process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? '';
}
