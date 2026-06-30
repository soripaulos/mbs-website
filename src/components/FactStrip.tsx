import Reveal from '@/components/Reveal';

/**
 * Static horizontal band of short facts/tags, diamond-separated.
 * Replaces the old infinite-scroll ticker — same information, but it
 * sits still and reads like an editorial meta-line instead of a stock
 * ticker.
 */
export default function FactStrip({
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
      className={`border-y py-4 md:py-5 ${
        dark ? 'border-white/10 bg-night text-bone' : 'border-ink bg-sun text-ink'
      } ${className}`}
    >
      <Reveal variant="fade">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-3 gap-y-2 px-5 md:gap-x-4 md:px-8">
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-3 md:gap-4">
              <span className="font-label text-xs font-semibold uppercase tracking-[0.22em] md:text-sm">
                {item}
              </span>
              {i < items.length - 1 && (
                <span
                  className={`h-1 w-1 shrink-0 rotate-45 ${dark ? 'bg-sun' : 'bg-ink/50'}`}
                  aria-hidden="true"
                />
              )}
            </span>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
