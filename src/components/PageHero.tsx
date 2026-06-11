import { Link } from 'react-router-dom';
import Reveal from '@/components/Reveal';
import WordReveal from '@/components/WordReveal';
import { useParallax } from '@/hooks/useParallax';

/**
 * Editorial page opener: breadcrumb rail, oversized masked headline and an
 * asymmetric image band built from the page's Sanity hero images.
 * Compact on mobile by design — no more full-screen empty banners.
 */
export default function PageHero({
  crumb,
  title,
  subtitle,
  images = [],
}: {
  crumb: string;
  title?: string;
  subtitle?: string;
  images?: string[];
}) {
  const photos = (images || []).filter(Boolean).slice(0, 3);
  const p1 = useParallax<HTMLImageElement>(16);
  const p2 = useParallax<HTMLImageElement>(26);
  const p3 = useParallax<HTMLImageElement>(20);
  const parallaxRefs = [p1, p2, p3];

  return (
    <header className="bg-bone pt-24 md:pt-32">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        {/* breadcrumb rail */}
        <Reveal variant="fade">
          <div className="flex items-center gap-3 border-t border-ink/15 pt-5 font-label text-[11px] font-medium uppercase tracking-[0.3em] text-ink/50 md:text-xs">
            <Link to="/" className="transition-colors hover:text-ink">
              Home
            </Link>
            <span className="h-1 w-1 rotate-45 bg-sun" />
            <span className="text-ink">{crumb}</span>
          </div>
        </Reveal>

        <div className="flex flex-col gap-4 pb-10 pt-8 md:flex-row md:items-end md:justify-between md:pb-14 md:pt-12">
          <WordReveal
            text={title || crumb}
            as="h1"
            className="max-w-3xl font-display text-[2.75rem] font-bold leading-[0.98] tracking-tight text-ink sm:text-6xl md:text-7xl"
          />
          {subtitle && (
            <Reveal variant="fade" delay={300} className="md:max-w-xs md:pb-2 md:text-right">
              <p className="text-base leading-snug text-ink/55 md:text-lg">{subtitle}</p>
            </Reveal>
          )}
        </div>
      </div>

      {/* asymmetric image band */}
      {photos.length > 0 && (
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <Reveal variant="fade" delay={150}>
            <div
              className={`grid gap-3 md:gap-4 ${
                photos.length === 1
                  ? 'grid-cols-1'
                  : photos.length === 2
                    ? 'grid-cols-[1.6fr_1fr]'
                    : 'grid-cols-[1.6fr_1fr_0.8fr]'
              }`}
            >
              {photos.map((src, i) => (
                <div
                  key={i}
                  className={`overflow-hidden rounded-2xl bg-ink/5 md:rounded-3xl ${
                    i === 0 ? 'h-48 sm:h-64 md:h-[22rem]' : 'h-48 sm:h-64 md:h-[22rem]'
                  } ${i === 2 ? 'hidden sm:block' : ''}`}
                >
                  <img
                    ref={parallaxRefs[i]}
                    src={src}
                    alt=""
                    className="h-full w-full scale-[1.12] object-cover"
                    loading={i === 0 ? 'eager' : 'lazy'}
                    fetchPriority={i === 0 ? 'high' : undefined}
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      )}
      <div className="h-12 md:h-20" />
    </header>
  );
}
