/**
 * Infinite marquee divider strip. Geometric diamond separators,
 * Space Grotesk uppercase — energetic but adult.
 */
export default function Marquee({
  items,
  dark = false,
  className = '',
}: {
  items: string[];
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden border-y py-3.5 md:py-4 ${
        dark ? 'border-white/10 bg-night text-bone' : 'border-ink bg-sun text-ink'
      } ${className}`}
    >
      <div className="flex w-max animate-marquee items-center">
        {[0, 1].map(copy => (
          <div key={copy} className="flex items-center">
            {items.map((item, i) => (
              <span
                key={`${copy}-${i}`}
                className="flex items-center font-label text-xs font-semibold uppercase tracking-[0.3em] md:text-sm"
              >
                <span className="px-6 md:px-9">{item}</span>
                <span
                  className={`h-1.5 w-1.5 rotate-45 ${dark ? 'bg-sun' : 'bg-ink'}`}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
