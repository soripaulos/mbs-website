import { useEffect, useRef } from 'react';

/**
 * Scroll-linked parallax: translates the element vertically based on its
 * position relative to the viewport center. rAF-throttled, passive listeners,
 * disabled for users who prefer reduced motion.
 *
 * Apply the returned ref to an element inside an overflow-hidden container
 * (scale the element slightly, e.g. scale-110, so edges never show).
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(strength = 14) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < -100 || r.top > vh + 100) return;
      // -1 .. 1 as the element crosses the viewport
      const progress = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
      el.style.transform = `translate3d(0, ${(-progress * strength).toFixed(2)}px, 0) scale(1.12)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return ref;
}
