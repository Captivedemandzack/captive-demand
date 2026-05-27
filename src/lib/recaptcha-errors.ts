export function recaptchaErrorMessage(error?: string): string | null {
  if (error === 'reCAPTCHA failed' || error === 'reCAPTCHA required') {
    return 'Security check failed. Refresh the page and try again.';
  }
  return null;
}
