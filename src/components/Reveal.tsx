import { useEffect, useRef, useState } from 'react';

type Variant = 'up' | 'left' | 'right' | 'pop' | 'fade';

const HIDDEN: Record<Variant, string> = {
  up: 'opacity-0 translate-y-8',
  left: 'opacity-0 -translate-x-8',
  right: 'opacity-0 translate-x-8',
  pop: 'opacity-0 scale-90',
  fade: 'opacity-0',
};

/**
 * Scroll-reveal wrapper used across all pages.
 * Animates once, when ~12% of the element enters the viewport.
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  variant = 'up',
  threshold = 0.12,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: Variant;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform motion-reduce:transition-none motion-reduce:transform-none ${
        shown ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : HIDDEN[variant]
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
