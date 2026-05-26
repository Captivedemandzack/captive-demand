const prefetched = new Set<string>();

/** Warm browser cache for a public asset path (image or video). Idempotent. */
export function prefetchMediaSrc(src: string): void {
  if (typeof window === 'undefined' || prefetched.has(src)) return;
  prefetched.add(src);

  if (/\.(mov|mp4|webm)$/i.test(src)) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'video';
    link.href = src;
    document.head.appendChild(link);
    return;
  }

  const img = new window.Image();
  img.decoding = 'async';
  img.src = src;
}

export function prefetchBeforeAfterShowcase(beforeSrc: string, afterSrc: string): void {
  prefetchMediaSrc(beforeSrc);
  prefetchMediaSrc(afterSrc);
}
