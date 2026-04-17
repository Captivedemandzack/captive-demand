'use client';

import { cn } from '@/lib/utils';

/** Default widget URL; override with NEXT_PUBLIC_GHL_BOOKING_EMBED_URL. */
const DEFAULT_GHL_BOOKING_WIDGET_URL =
  'https://api.leadconnectorhq.com/widget/booking/RDho94A86drpgGj9WCKN';

/** No `form_embed.js` — iframe-resizer’s default scroll behavior was scrolling the host page. */

export function resolveGhlBookingWidgetUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_GHL_BOOKING_EMBED_URL?.trim();
  if (fromEnv) {
    try {
      return new URL(fromEnv).toString();
    } catch {
      /* fall through */
    }
  }
  return DEFAULT_GHL_BOOKING_WIDGET_URL;
}

export interface GhlBookingCardContentProps {
  iframeId?: string;
  className?: string;
  /**
   * Override default height. Default is shorter on mobile so the calendar step doesn’t leave a huge
   * empty band above the footer; taller flows scroll inside the iframe. Desktop keeps a large frame.
   */
  iframeClassName?: string;
}

export function GhlBookingCardContent({
  iframeId = 'ghl-booking-widget',
  className,
  iframeClassName,
}: GhlBookingCardContentProps) {
  const src = resolveGhlBookingWidgetUrl();

  return (
    <div className={cn('w-full max-w-full', className)}>
      <iframe
        title="Book a call with Captive Demand"
        src={src}
        id={iframeId}
        className={cn(
          'block w-full border-0 bg-transparent',
          iframeClassName ??
            'h-[min(68svh,620px)] md:h-[min(88svh,900px)] rounded-2xl',
        )}
        style={{ border: 'none' }}
      />
    </div>
  );
}
