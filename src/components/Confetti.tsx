// Fixed (non-random) confetti piece layout — deterministic so it never
// reshuffles on re-render, and easy to delete along with the section that
// uses it once the graduation season has passed.
const PIECES: { left: string; color: string; shape: 'sq' | 'circle' | 'bar'; size: number; rotate: number; delay: string; duration: string }[] = [
  { left: '3%', color: 'bg-sun', shape: 'sq', size: 10, rotate: 18, delay: '0s', duration: '6.5s' },
  { left: '10%', color: 'bg-rose', shape: 'circle', size: 8, rotate: 0, delay: '1.1s', duration: '7.2s' },
  { left: '18%', color: 'bg-brand', shape: 'bar', size: 12, rotate: -24, delay: '0.4s', duration: '6s' },
  { left: '27%', color: 'bg-leaf', shape: 'sq', size: 9, rotate: 35, delay: '2s', duration: '7.8s' },
  { left: '35%', color: 'bg-sun', shape: 'circle', size: 11, rotate: 0, delay: '0.8s', duration: '6.8s' },
  { left: '44%', color: 'bg-blue', shape: 'bar', size: 10, rotate: 12, delay: '1.6s', duration: '7s' },
  { left: '52%', color: 'bg-rose', shape: 'sq', size: 8, rotate: -15, delay: '0.2s', duration: '6.3s' },
  { left: '60%', color: 'bg-sun', shape: 'bar', size: 13, rotate: 28, delay: '2.3s', duration: '7.5s' },
  { left: '68%', color: 'bg-brand', shape: 'circle', size: 9, rotate: 0, delay: '1.3s', duration: '6.6s' },
  { left: '76%', color: 'bg-leaf', shape: 'sq', size: 11, rotate: -30, delay: '0.6s', duration: '7.1s' },
  { left: '84%', color: 'bg-sun', shape: 'circle', size: 10, rotate: 0, delay: '1.9s', duration: '6.9s' },
  { left: '92%', color: 'bg-blue', shape: 'bar', size: 9, rotate: -18, delay: '0.1s', duration: '7.4s' },
  { left: '7%', color: 'bg-brand', shape: 'circle', size: 7, rotate: 0, delay: '3.2s', duration: '7.6s' },
  { left: '23%', color: 'bg-sun', shape: 'bar', size: 11, rotate: 20, delay: '3.8s', duration: '6.4s' },
  { left: '40%', color: 'bg-rose', shape: 'sq', size: 10, rotate: 40, delay: '3.1s', duration: '7.9s' },
  { left: '57%', color: 'bg-leaf', shape: 'circle', size: 8, rotate: 0, delay: '4.1s', duration: '6.7s' },
  { left: '73%', color: 'bg-sun', shape: 'sq', size: 12, rotate: -22, delay: '3.5s', duration: '7.3s' },
  { left: '88%', color: 'bg-brand', shape: 'bar', size: 8, rotate: 15, delay: '4.4s', duration: '6.2s' },
];

const SHAPE_CLASS: Record<(typeof PIECES)[number]['shape'], string> = {
  sq: 'rounded-sm',
  circle: 'rounded-full',
  bar: 'rounded-sm',
};

/**
 * Lightweight CSS-only confetti for the graduation announcement section.
 * Purely decorative (aria-hidden), disabled automatically under
 * prefers-reduced-motion via the global rule in index.css.
 */
export default function Confetti({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {PIECES.map((p, i) => (
        <span
          key={i}
          className={`absolute top-0 opacity-0 animate-confetti-fall ${p.color} ${SHAPE_CLASS[p.shape]}`}
          style={{
            left: p.left,
            width: p.shape === 'bar' ? p.size * 0.45 : p.size,
            height: p.shape === 'bar' ? p.size * 1.6 : p.size,
            transform: `rotate(${p.rotate}deg)`,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}
