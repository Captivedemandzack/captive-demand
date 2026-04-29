'use client';

import { useEffect, useRef, useState } from 'react';
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
  lazyMount?: boolean;
  lazyRootMargin?: string;
}

export function GhlBookingCardContent({
  iframeId = 'ghl-booking-widget',
  className,
  iframeClassName,
  lazyMount = true,
  lazyRootMargin = '600px 0px',
}: GhlBookingCardContentProps) {
  const src = resolveGhlBookingWidgetUrl();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [shouldMountIframe, setShouldMountIframe] = useState(!lazyMount);
  const frameClassName = cn(
    'block w-full border-0 bg-transparent',
    iframeClassName ??
      'h-[min(68svh,620px)] md:h-[min(88svh,900px)] rounded-2xl',
  );

  useEffect(() => {
    if (!lazyMount || shouldMountIframe) return;

    const el = wrapperRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      const fallbackTimer = globalThis.setTimeout(() => setShouldMountIframe(true), 0);
      return () => globalThis.clearTimeout(fallbackTimer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMountIframe(true);
          observer.disconnect();
        }
      },
      { rootMargin: lazyRootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [lazyMount, lazyRootMargin, shouldMountIframe]);

  return (
    <div ref={wrapperRef} className={cn('w-full max-w-full', className)}>
      {shouldMountIframe ? (
        <iframe
          title="Book a call with Captive Demand"
          src={src}
          id={iframeId}
          loading="lazy"
          className={frameClassName}
          style={{ border: 'none' }}
        />
      ) : (
        <div aria-hidden="true" className={frameClassName} />
      )}
    </div>
  );
}
