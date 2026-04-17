/**
 * Warm the browser cache for remote/static image URLs so repeated use (e.g. Next/Image in
 * accordions) renders immediately instead of a blank frame while decoding.
 */
export function prefetchImageUrls(urls: readonly string[]): void {
  for (const src of new Set(urls)) {
    if (!src || src.startsWith('data:')) continue;
    const img = new Image();
    img.src = src;
  }
}
