import Reveal from '@/components/Reveal';
import { Squiggle } from '@/components/decor';

const ACCENT_TEXT: Record<string, string> = {
  sun: 'text-sun-deep',
  coral: 'text-coral-deep',
  sky: 'text-sky',
  leaf: 'text-leaf',
  brand: 'text-brand',
  white: 'text-white/90',
};

const SQUIGGLE_TEXT: Record<string, string> = {
  sun: 'text-sun',
  coral: 'text-coral',
  sky: 'text-sky',
  leaf: 'text-leaf',
  brand: 'text-brand',
  white: 'text-sun',
};

/**
 * Standard section header: handwritten eyebrow, chunky display title with a
 * squiggle under the last word, optional subtitle.
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  accent = 'coral',
  align = 'center',
  dark = false,
  className = '',
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  accent?: 'sun' | 'coral' | 'sky' | 'leaf' | 'brand' | 'white';
  align?: 'center' | 'left';
  dark?: boolean;
  className?: string;
}) {
  const words = (title || '').trim().split(' ');
  const last = words.length > 1 ? words.pop() : null;

  return (
    <Reveal className={`${align === 'center' ? 'text-center' : 'text-left'} ${className}`}>
      {eyebrow && (
        <p className={`mb-1 font-hand text-2xl md:text-3xl ${ACCENT_TEXT[accent]}`}>
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-3xl font-bold leading-tight md:text-4xl lg:text-[2.75rem] ${
          dark ? 'text-white' : 'text-brand'
        }`}
      >
        {last ? (
          <>
            {words.join(' ')}{' '}
            <span className="relative inline-block whitespace-nowrap">
              {last}
              <Squiggle className={`absolute -bottom-2 left-0 h-2.5 w-full md:-bottom-3 md:h-3 ${SQUIGGLE_TEXT[accent]}`} />
            </span>
          </>
        ) : (
          <span className="relative inline-block">
            {title}
            <Squiggle className={`absolute -bottom-2 left-0 h-2.5 w-full md:-bottom-3 md:h-3 ${SQUIGGLE_TEXT[accent]}`} />
          </span>
        )}
      </h2>
      {subtitle && (
        <p
          className={`mx-auto mt-5 max-w-2xl text-base leading-relaxed md:text-lg ${
            dark ? 'text-white/70' : 'text-ink/60'
          } ${align === 'left' ? 'mx-0' : ''}`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
