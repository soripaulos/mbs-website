import { useEffect, useRef, useState, createElement } from 'react';

/**
 * Word-by-word masked reveal for display headings.
 * Each word slides up out of an overflow-hidden mask when the heading
 * enters the viewport — staggered left to right.
 */
export default function WordReveal({
  text,
  as = 'h2',
  className = '',
  delay = 0,
  stagger = 55,
  once = true,
}: {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setShown(false);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const words = (text || '').trim().split(/\s+/).filter(Boolean);

  return createElement(
    as,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { ref: ref as any, className },
    words.map((word, i) => (
      <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
        <span
          className="inline-block transition-transform duration-700 ease-out2 will-change-transform motion-reduce:transition-none motion-reduce:transform-none"
          style={{
            transform: shown ? 'translateY(0)' : 'translateY(112%)',
            transitionDelay: `${delay + i * stagger}ms`,
          }}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      </span>
    ))
  );
}
