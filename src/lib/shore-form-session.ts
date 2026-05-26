export const SHORE_EXIT_INTENT_SHOWN_KEY = 'shore-partnership-exit-intent-shown';
export const SHORE_FORM_SUBMITTED_KEY = 'shore-partnership-form-submitted';

export function markShoreFormSubmitted(): void {
  try {
    sessionStorage.setItem(SHORE_FORM_SUBMITTED_KEY, '1');
  } catch {
    /* ignore */
  }
}

export function hasShoreFormSubmitted(): boolean {
  try {
    return sessionStorage.getItem(SHORE_FORM_SUBMITTED_KEY) === '1';
  } catch {
    return false;
  }
}

export function hasExitIntentShown(): boolean {
  try {
    return sessionStorage.getItem(SHORE_EXIT_INTENT_SHOWN_KEY) === '1';
  } catch {
    return false;
  }
}

export function markExitIntentShown(): void {
  try {
    sessionStorage.setItem(SHORE_EXIT_INTENT_SHOWN_KEY, '1');
  } catch {
    /* ignore */
  }
}
