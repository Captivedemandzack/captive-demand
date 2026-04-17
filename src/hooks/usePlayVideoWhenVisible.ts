import { useEffect, type RefObject } from 'react';

/**
 * Keeps a muted looping video playing whenever it’s on screen; pauses when off-screen to save work.
 * Also resumes after tab switch / bfcache when the element is visible (Safari often pauses without this).
 */
export function usePlayVideoWhenVisible(
  videoRef: RefObject<HTMLVideoElement | null>,
  options?: { threshold?: number },
): void {
  const threshold = options?.threshold ?? 0.12;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      void video.play().catch(() => {});
    };

    const tryPause = () => {
      video.pause();
    };

    const isRoughlyOnScreen = () => {
      const rect = video.getBoundingClientRect();
      return (
        rect.bottom > 0 &&
        rect.top < window.innerHeight &&
        rect.right > 0 &&
        rect.left < window.innerWidth
      );
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            tryPlay();
          } else {
            tryPause();
          }
        }
      },
      { threshold, rootMargin: '40px 0px' },
    );

    io.observe(video);

    const onVisibility = () => {
      if (document.visibilityState === 'visible' && isRoughlyOnScreen()) {
        tryPlay();
      }
    };

    const onPageShow = () => {
      if (isRoughlyOnScreen()) tryPlay();
    };

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pageshow', onPageShow);

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pageshow', onPageShow);
    };
  }, [videoRef, threshold]);
}
