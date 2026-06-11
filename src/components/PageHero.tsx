import Reveal from '@/components/Reveal';
import { Polaroid, Scallop, DoodleStar, DoodleSun, DoodleSwirl } from '@/components/decor';

const ACCENTS = {
  sun: { hand: 'text-sun', squiggle: 'text-sun' },
  coral: { hand: 'text-coral', squiggle: 'text-coral' },
  sky: { hand: 'text-sky', squiggle: 'text-sky' },
};

/**
 * Compact, mobile-first page banner that replaces the old full-screen hero
 * slideshow on inner pages. Sanity hero images become playful taped polaroids
 * instead of a dark full-bleed background.
 */
export default function PageHero({
  title,
  subtitle,
  images = [],
  accent = 'sun',
  children,
}: {
  title?: string;
  subtitle?: string;
  images?: string[];
  accent?: keyof typeof ACCENTS;
  children?: React.ReactNode;
}) {
  const photos = (images || []).filter(Boolean).slice(0, 2);
  const a = ACCENTS[accent];

  return (
    <header className="relative overflow-hidden bg-brand">
      {/* texture + doodles */}
      <div className="absolute inset-0 bg-dots opacity-40" aria-hidden="true" />
      <DoodleSun className="absolute -left-8 top-12 h-24 w-24 text-sun/40 animate-spin-slow" />
      <DoodleStar className="absolute right-[8%] top-16 h-7 w-7 text-coral/70 animate-float" />
      <DoodleStar className="absolute left-[16%] bottom-20 h-5 w-5 text-sun/60 animate-float [animation-delay:1.2s]" />
      <DoodleSwirl className="absolute -right-4 bottom-16 h-12 w-24 text-white/20" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 pb-16 pt-28 text-center sm:px-6 md:pb-20 md:pt-36 lg:flex-row lg:items-center lg:justify-between lg:text-left">
        <div className="max-w-2xl">
          <Reveal>
            <h1 className="font-display text-4xl font-bold leading-[1.05] text-white drop-shadow-sm sm:text-5xl md:text-6xl">
              {title}
            </h1>
          </Reveal>
          {subtitle && (
            <Reveal delay={120}>
              <p className={`mt-3 font-hand text-2xl sm:text-3xl md:text-4xl ${a.hand}`}>
                {subtitle}
              </p>
            </Reveal>
          )}
          {children && <Reveal delay={220} className="mt-6">{children}</Reveal>}
        </div>

        {/* taped photos — compact fan, never a giant empty banner on mobile */}
        {photos.length > 0 && (
          <Reveal variant="pop" delay={150} className="hidden shrink-0 sm:block">
            <div className="relative h-44 w-64 md:h-52 md:w-80">
              <Polaroid
                src={photos[0]}
                imgClassName="aspect-[4/3] h-full"
                tape
                eager
                className={`absolute inset-0 rotate-[-4deg] ${photos[1] ? 'z-10 w-[78%]' : 'w-full'}`}
              />
              {photos[1] && (
                <Polaroid
                  src={photos[1]}
                  imgClassName="aspect-[4/3] h-full"
                  tape
                  tapeColor="bg-coral/70"
                  className="absolute bottom-0 right-0 w-[62%] rotate-[5deg]"
                />
              )}
            </div>
          </Reveal>
        )}
      </div>

      {/* scallop into the page background */}
      <Scallop className="relative h-5 text-paper md:h-7" />
    </header>
  );
}
