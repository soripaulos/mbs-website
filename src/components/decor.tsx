/**
 * Small decorative building blocks for the "paper & sticker" design language:
 * squiggles, scallop dividers, washi tape, polaroid frames and doodles.
 * All purely presentational (aria-hidden where appropriate).
 */

// Hand-drawn squiggle underline (uses currentColor)
export function Squiggle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 12" className={className} fill="none" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M3 8.5C13 2.5 21 2.5 31 8.5C41 14.5 49 14.5 59 8.5C69 2.5 77 2.5 87 8.5C97 14.5 105 14.5 117 7"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Scalloped edge divider — renders bumps in currentColor.
// Place at the TOP of a section (bumps point up into the previous section)
// or pass flip to point them down.
export function Scallop({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  const bumps = 30;
  const w = 1200 / bumps; // 40
  const rx = w / 2;
  const ry = 16;
  let d = 'M0 20';
  for (let i = 0; i < bumps; i++) {
    d += ` A ${rx} ${ry} 0 0 1 ${(i + 1) * w} 20`;
  }
  d += ' Z';
  return (
    <svg
      viewBox="0 0 1200 20"
      preserveAspectRatio="none"
      className={`block w-full ${flip ? 'rotate-180' : ''} ${className}`}
      aria-hidden="true"
    >
      <path d={d} fill="currentColor" />
    </svg>
  );
}

// Washi tape strip for taped-on photos / cards
export function Tape({ className = '', color = 'bg-sun/80' }: { className?: string; color?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute -top-3 left-1/2 z-10 h-7 w-24 -translate-x-1/2 -rotate-3 rounded-[3px] ${color} opacity-90 shadow-sm ${className}`}
      style={{ backdropFilter: 'saturate(1.2)' }}
    />
  );
}

// Polaroid photo frame
export function Polaroid({
  src,
  alt = '',
  caption,
  className = '',
  imgClassName = 'aspect-[4/3]',
  tape = false,
  tapeColor,
  eager = false,
}: {
  src: string;
  alt?: string;
  caption?: string;
  className?: string;
  imgClassName?: string;
  tape?: boolean;
  tapeColor?: string;
  eager?: boolean;
}) {
  return (
    <figure className={`relative rounded-2xl border-2 border-ink/10 bg-white p-2.5 pb-3 shadow-soft ${className}`}>
      {tape && <Tape color={tapeColor} />}
      <div className={`overflow-hidden rounded-xl bg-cream ${imgClassName}`}>
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
      {caption && (
        <figcaption className="px-1 pt-2 text-center font-hand text-xl leading-none text-ink/70">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// ── Doodles ────────────────────────────────────────────────────────────────

export function DoodleStar({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 1.5c.6 3.8 1.6 6.4 3.2 8 1.6 1.7 4 2.7 7.3 3.2-3.4.6-5.8 1.6-7.4 3.3-1.6 1.6-2.6 4-3.1 7.5-.6-3.5-1.6-6-3.2-7.6-1.6-1.6-4-2.6-7.3-3.2 3.3-.5 5.7-1.5 7.3-3.1 1.6-1.7 2.6-4.3 3.2-8.1Z" />
    </svg>
  );
}

export function DoodleSun({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" aria-hidden="true">
      <circle cx="24" cy="24" r="9" fill="currentColor" stroke="none" />
      <path d="M24 4v6M24 38v6M4 24h6M38 24h6M9.9 9.9l4.2 4.2M33.9 33.9l4.2 4.2M38.1 9.9l-4.2 4.2M14.1 33.9l-4.2 4.2" />
    </svg>
  );
}

export function DoodleHeart({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 21s-7.5-4.7-10-9.3C.2 8.4 2 4.6 5.6 4.1c2.2-.3 4.4.8 6.4 3.3 2-2.5 4.2-3.6 6.4-3.3 3.6.5 5.4 4.3 3.6 7.6C19.5 16.3 12 21 12 21Z" />
    </svg>
  );
}

export function DoodleSwirl({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 32" className={className} fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" aria-hidden="true">
      <path d="M3 26C12 8 22 4 28 10c5 5-1 14-8 12-8-2-4-16 8-19 11-3 22 1 33 17" />
    </svg>
  );
}

export function DoodleDots({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 14" className={className} fill="currentColor" aria-hidden="true">
      <circle cx="6" cy="7" r="4" />
      <circle cx="29" cy="7" r="4" />
      <circle cx="52" cy="7" r="4" />
    </svg>
  );
}
