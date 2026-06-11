import Reveal from '@/components/Reveal';
import WordReveal from '@/components/WordReveal';

/**
 * Editorial section header: indexed Space Grotesk eyebrow with rule,
 * masked word-reveal display title, optional measure-width subtitle.
 */
export default function SectionHeading({
  index,
  eyebrow,
  title,
  subtitle,
  align = 'left',
  dark = false,
  className = '',
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  dark?: boolean;
  className?: string;
}) {
  const center = align === 'center';

  return (
    <div className={`${center ? 'text-center' : 'text-left'} ${className}`}>
      {(eyebrow || index) && (
        <Reveal variant="fade">
          <div
            className={`mb-5 flex items-center gap-3 font-label text-[11px] font-semibold uppercase tracking-[0.3em] md:text-xs ${
              center ? 'justify-center' : ''
            } ${dark ? 'text-bone/60' : 'text-ink/55'}`}
          >
            {index && <span className={dark ? 'text-sun' : 'text-brand'}>{index}</span>}
            <span className={`h-px w-10 ${dark ? 'bg-bone/25' : 'bg-ink/25'}`} />
            <span>{eyebrow}</span>
          </div>
        </Reveal>
      )}
      <WordReveal
        text={title}
        as="h2"
        className={`font-display text-3xl font-bold leading-[1.06] tracking-tight md:text-5xl ${
          dark ? 'text-bone' : 'text-ink'
        }`}
      />
      {subtitle && (
        <Reveal variant="fade" delay={250}>
          <p
            className={`mt-5 max-w-2xl text-base leading-relaxed md:text-lg ${
              dark ? 'text-bone/60' : 'text-ink/60'
            } ${center ? 'mx-auto' : ''}`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
