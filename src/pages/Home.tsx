import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Apple,
  PlayCircle,
  Globe,
  CalendarDays,
} from 'lucide-react';
import { toast } from 'sonner';
import Reveal from '@/components/Reveal';
import WordReveal from '@/components/WordReveal';
import SectionHeading from '@/components/SectionHeading';
import Marquee from '@/components/Marquee';
import Shimmer from '@/components/Shimmer';
import DynamicIcon from '@/components/DynamicIcon';
import LightboxGallery from '@/components/LightboxGallery';
import { useParallax } from '@/hooks/useParallax';
import { homePageData as mockHomePageData, socialPostsData, statsData } from '@/data/mockData';
import { useSanityData, useSanityArrayData } from '@/hooks/useSanityData';
import {
  fetchHomePageData,
  fetchStudentPortalApp,
  fetchSocialPosts,
  fetchStats,
} from '@/services/sanity';
import type { HomePage } from '@/types';

// ── HERO ─────────────────────────────────────────────────────────────────────
function HomeHero({ hero }: { hero: HomePage['hero'] }) {
  const images = (hero?.images || []).filter(Boolean);
  const [current, setCurrent] = useState(0);

  const statsFetcher = useCallback(() => fetchStats(), []);
  const { data: stats } = useSanityArrayData(statsFetcher, statsData);

  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => setCurrent(c => (c + 1) % images.length), 5200);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <header className="bg-bone pt-24 md:pt-32">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Copy */}
          <div>
            <Reveal variant="fade">
              <div className="mb-6 flex items-center gap-3 font-label text-[11px] font-semibold uppercase tracking-[0.3em] text-ink/55 md:text-xs">
                <span className="text-brand">Est. 2009</span>
                <span className="h-1 w-1 rotate-45 bg-sun" />
                <span>Adama, Ethiopia</span>
                <span className="h-1 w-1 rotate-45 bg-sun" />
                <span>KG – Grade 12</span>
              </div>
            </Reveal>

            <WordReveal
              text={hero?.title || 'Welcome to Makko Billi School'}
              as="h1"
              delay={80}
              className="font-display text-[3rem] font-bold leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-7xl xl:text-[5.2rem]"
            />

            {hero?.subtitle && (
              <Reveal variant="fade" delay={450}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/60 md:text-lg">
                  {hero.subtitle}
                </p>
              </Reveal>
            )}

            <Reveal variant="fade" delay={580}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to={hero?.buttonLink || '/about'}
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-label text-[13px] font-semibold uppercase tracking-[0.12em] text-bone transition-colors hover:bg-brand"
                >
                  {hero?.buttonText || 'Discover More'}
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-7 py-3.5 font-label text-[13px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-bone"
                >
                  Visit Us
                </Link>
              </div>
            </Reveal>

            {/* CMS-driven stat rail */}
            {stats.length > 0 && (
              <Reveal variant="fade" delay={700}>
                <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-ink/15 pt-7 sm:grid-cols-4 lg:mt-14">
                  {stats.slice(0, 4).map(stat => (
                    <div key={stat.id}>
                      <p className="font-label text-2xl font-bold tracking-tight text-ink md:text-3xl">
                        {stat.value}
                        <span className="text-brand">{stat.suffix}</span>
                      </p>
                      <p className="mt-1 font-label text-[10px] font-medium uppercase tracking-[0.18em] text-ink/45">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          {/* Image panel with crossfade + ken burns */}
          {images.length > 0 && (
            <Reveal variant="fade" delay={250}>
              <div className="relative overflow-hidden rounded-3xl bg-ink/5">
                <div className="aspect-[16/11] lg:aspect-[4/5]">
                  {images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={i === 0 ? 'Life at Makko Billi School' : ''}
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                        i === current ? 'animate-kenburns opacity-100' : 'opacity-0'
                      }`}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      fetchPriority={i === 0 ? 'high' : 'low'}
                      decoding="async"
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-night/55 via-transparent to-transparent" />

                  {/* slide index + progress */}
                  {images.length > 1 && (
                    <div className="absolute inset-x-5 bottom-5 flex items-center justify-between md:inset-x-6 md:bottom-6">
                      <span className="font-label text-xs font-medium tracking-[0.25em] text-bone/85">
                        {String(current + 1).padStart(2, '0')} —{' '}
                        {String(images.length).padStart(2, '0')}
                      </span>
                      <div className="flex gap-1.5">
                        {images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            aria-label={`Slide ${i + 1}`}
                            className={`h-1 rounded-full transition-all duration-300 ${
                              i === current ? 'w-8 bg-sun' : 'w-4 bg-white/35 hover:bg-white/60'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </div>

      <div className="mt-12 md:mt-20">
        <Marquee
          items={[
            'Nurturing Minds',
            'Building Character',
            'KG – Grade 12',
            'A Love for Learning',
            'Adama & Dembi Dollo',
            'Since 2009',
          ]}
        />
      </div>
    </header>
  );
}

// ── LATEST UPDATES — horizontal snap rail ────────────────────────────────────
function LatestUpdates({ latestUpdates }: { latestUpdates?: HomePage['latestUpdates'] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const postsFetcher = useCallback(() => fetchSocialPosts(), []);
  const { data: posts, loading } = useSanityArrayData(postsFetcher, socialPostsData);

  const scrollBy = (dir: 1 | -1) => {
    railRef.current?.scrollBy({ left: dir * (railRef.current.clientWidth * 0.85), behavior: 'smooth' });
  };

  if (!loading && (!posts || posts.length === 0)) return null;

  return (
    <section className="bg-bone py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="mb-9 flex items-end justify-between gap-6 md:mb-12">
          <SectionHeading
            index="01"
            eyebrow="News & Announcements"
            title={latestUpdates?.title || 'Latest Updates'}
          />
          <div className="hidden shrink-0 gap-2 md:flex">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Scroll back"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-bone"
            >
              <ArrowLeft size={17} />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Scroll forward"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-bone"
            >
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>

      {/* edge-bleed rail */}
      <div
        ref={railRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:gap-5 md:px-[max(2rem,calc((100vw-1200px)/2+2rem))]"
      >
        {loading && (!posts || posts.length === 0)
          ? [0, 1, 2].map(i => (
              <div key={i} className="w-[80vw] max-w-[330px] shrink-0 snap-start sm:w-[340px] sm:max-w-none">
                <Shimmer className="aspect-[16/10] rounded-2xl" />
                <Shimmer className="mt-3 h-4 w-1/2" />
                <Shimmer className="mt-2 h-4 w-5/6" />
              </div>
            ))
          : posts.map((post, index) => (
              <article
                key={post.id || index}
                className="group w-[80vw] max-w-[330px] shrink-0 snap-start sm:w-[340px] sm:max-w-none"
              >
                {post.images && post.images.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setLightboxImages(post.images)}
                    className="img-zoom relative block w-full overflow-hidden rounded-2xl bg-ink/5"
                    aria-label="View photos"
                  >
                    <div className="aspect-[16/10]">
                      <img
                        src={post.images[0]}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    {post.images.length > 1 && (
                      <span className="absolute bottom-3 right-3 rounded-full bg-night/70 px-2.5 py-1 font-label text-[10px] font-medium tracking-wider text-bone backdrop-blur-sm">
                        +{post.images.length - 1}
                      </span>
                    )}
                  </button>
                )}
                <div className="pt-4">
                  <div className="flex items-center gap-3 font-label text-[10px] font-semibold uppercase tracking-[0.18em]">
                    <span className="rounded-full bg-ink px-2.5 py-1 text-bone">
                      {post.platform === 'manual' ? 'Announcement' : post.platform}
                    </span>
                    {post.date && (
                      <span className="flex items-center gap-1.5 text-ink/45">
                        <CalendarDays size={12} />
                        {new Date(post.date).toLocaleDateString(undefined, {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/70">
                    {post.content}
                  </p>
                </div>
              </article>
            ))}
        <div className="w-1 shrink-0" />
      </div>

      {lightboxImages.length > 0 && (
        <LightboxGallery images={lightboxImages} onClose={() => setLightboxImages([])} />
      )}
    </section>
  );
}

// ── STUDENT PORTAL ───────────────────────────────────────────────────────────
function StudentPortalAppSection() {
  const portalFetcher = useCallback(() => fetchStudentPortalApp(), []);
  const { data: app } = useSanityData(portalFetcher, mockHomePageData.studentPortalApp);
  const imgRef = useParallax<HTMLDivElement>(20);

  if (!app) return null;

  const webPortal =
    app.downloadLinks?.webPortal && app.downloadLinks.webPortal !== '#'
      ? app.downloadLinks.webPortal
      : 'https://portal.makkobillischool.com';

  return (
    <section className="noise relative overflow-hidden bg-night py-16 text-bone md:py-28">
      <div className="relative mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal variant="fade">
              <div className="mb-6 flex items-center gap-3 font-label text-[11px] font-semibold uppercase tracking-[0.3em] text-bone/55 md:text-xs">
                <span className="text-sun">02</span>
                <span className="h-px w-10 bg-bone/25" />
                <span>Digital Campus</span>
                <span className="rounded-full bg-sun px-2 py-0.5 text-[10px] font-bold text-ink">
                  {app.badge}
                </span>
              </div>
            </Reveal>
            <WordReveal
              text={app.title}
              as="h2"
              className="font-display text-3xl font-bold leading-[1.05] tracking-tight md:text-5xl"
            />
            <Reveal variant="fade" delay={250}>
              <p className="mt-3 font-label text-sm font-medium uppercase tracking-[0.2em] text-sun">
                {app.subtitle}
              </p>
              <p className="mt-5 max-w-lg leading-relaxed text-bone/60">{app.description}</p>
            </Reveal>

            {/* Numbered feature list */}
            <div className="mt-9 divide-y divide-white/10 border-y border-white/10">
              {(app.features || []).map(
                (feature: { icon: string; title: string; description: string }, i: number) => (
                  <Reveal key={i} variant="fade" delay={i * 90}>
                    <div className="group flex items-center gap-5 py-4">
                      <span className="font-label text-xs font-medium text-bone/35">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-sun transition-colors duration-300 group-hover:border-sun">
                        <DynamicIcon name={feature.icon} size={17} />
                      </span>
                      <span>
                        <span className="block font-display text-base font-semibold">
                          {feature.title}
                        </span>
                        <span className="block text-xs text-bone/50">{feature.description}</span>
                      </span>
                    </div>
                  </Reveal>
                )
              )}
            </div>

            <Reveal variant="fade" delay={300}>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() =>
                    toast.info('Coming Soon', {
                      description: 'The App Store version will be available soon.',
                    })
                  }
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 font-label text-xs font-semibold uppercase tracking-[0.12em] text-bone transition-colors hover:border-bone hover:bg-bone hover:text-ink"
                >
                  <Apple size={15} />
                  App Store
                </button>
                <button
                  type="button"
                  onClick={() =>
                    toast.info('Coming Soon', {
                      description: 'The Play Store version will be available soon.',
                    })
                  }
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 font-label text-xs font-semibold uppercase tracking-[0.12em] text-bone transition-colors hover:border-bone hover:bg-bone hover:text-ink"
                >
                  <PlayCircle size={15} />
                  Play Store
                </button>
                <a
                  href={webPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-sun px-5 py-3 font-label text-xs font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-bone"
                >
                  <Globe size={15} />
                  Web Portal
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </Reveal>
          </div>

          {/* App visual */}
          <Reveal variant="fade" delay={200}>
            <div className="relative mx-auto max-w-md overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-2 shadow-panel">
              <div className="overflow-hidden rounded-[1.4rem]">
                <div ref={imgRef} className="scale-[1.12]">
                  <img
                    src={
                      app.appImage ||
                      'https://cdn.sanity.io/images/yqwhfc1k/production/8508996403a729ae03430e7460e4a899b40d2c11-1181x768.png'
                    }
                    alt="Makko Billi Student Portal App"
                    className="w-full"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── GRAND OPENING ────────────────────────────────────────────────────────────
function GrandOpening({ grandOpening }: { grandOpening: HomePage['grandOpening'] }) {
  const [current, setCurrent] = useState(0);
  const images = (grandOpening.images || []).filter(Boolean);

  const next = () => setCurrent(c => (c + 1) % images.length);
  const prev = () => setCurrent(c => (c - 1 + images.length) % images.length);

  return (
    <section className="bg-bone py-16 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Carousel */}
          {images.length > 0 && (
            <Reveal variant="fade">
              <div className="relative overflow-hidden rounded-3xl bg-ink/5">
                <div className="aspect-[4/3]">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${grandOpening.title} — photo ${index + 1}`}
                      loading="lazy"
                      decoding="async"
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                        index === current ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-night/50 via-transparent to-transparent" />
                  {images.length > 1 && (
                    <div className="absolute inset-x-5 bottom-5 flex items-center justify-between">
                      <span className="font-label text-xs font-medium tracking-[0.25em] text-bone/85">
                        {String(current + 1).padStart(2, '0')} —{' '}
                        {String(images.length).padStart(2, '0')}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={prev}
                          aria-label="Previous photo"
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-bone backdrop-blur-sm transition-colors hover:bg-bone hover:text-ink"
                        >
                          <ArrowLeft size={16} />
                        </button>
                        <button
                          onClick={next}
                          aria-label="Next photo"
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-bone backdrop-blur-sm transition-colors hover:bg-bone hover:text-ink"
                        >
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          )}

          {/* Content */}
          <div>
            <Reveal variant="fade">
              <div className="mb-6 flex flex-wrap items-center gap-3 font-label text-[11px] font-semibold uppercase tracking-[0.3em] text-ink/55 md:text-xs">
                <span className="text-brand">03</span>
                <span className="h-px w-10 bg-ink/25" />
                <span className="rounded-full bg-rose/15 px-3 py-1 text-rose">
                  {grandOpening.badge}
                </span>
              </div>
            </Reveal>
            <WordReveal
              text={grandOpening.title}
              as="h2"
              className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-ink md:text-5xl"
            />
            <Reveal variant="fade" delay={200}>
              <p className="mt-3 font-label text-sm font-medium uppercase tracking-[0.18em] text-brand">
                {grandOpening.subtitle}
              </p>
              {grandOpening.description && (
                <p className="mt-4 max-w-lg leading-relaxed text-ink/60">
                  {grandOpening.description}
                </p>
              )}
            </Reveal>

            <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
              {(grandOpening.features || []).map((feature, index) => (
                <Reveal key={index} variant="fade" delay={index * 90}>
                  <div className="group flex items-start gap-5 py-4">
                    <span
                      className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white"
                      style={{ backgroundColor: feature.bgColor || '#2d4289' }}
                    >
                      <DynamicIcon name={feature.icon} size={17} />
                    </span>
                    <span>
                      <span className="block font-display text-base font-semibold text-ink">
                        {feature.title}
                      </span>
                      <span className="mt-0.5 block text-sm leading-relaxed text-ink/55">
                        {feature.description}
                      </span>
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── THREE PILLARS ────────────────────────────────────────────────────────────
function ThreePillars({ pillars }: { pillars: HomePage['pillars'] }) {
  return (
    <section className="noise relative overflow-hidden bg-night py-16 text-bone md:py-28">
      <div className="relative mx-auto max-w-[1200px] px-5 md:px-8">
        <SectionHeading
          index="04"
          eyebrow="What we stand for"
          title="The Three Pillars"
          dark
          className="mb-12 md:mb-16"
        />

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-white/10 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Reveal key={index} variant="fade" delay={index * 120} className="h-full">
              <div className="group relative h-full bg-night p-8 transition-colors duration-500 hover:bg-[#161b3d] md:p-10">
                {/* top accent rule grows on hover */}
                <span className="absolute left-0 top-0 h-0.5 w-0 bg-sun transition-all duration-500 group-hover:w-full" />
                <p className="font-label text-sm font-medium text-bone/30">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <span
                  className="mt-7 flex h-12 w-12 items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: pillar.iconColor || '#2d4289' }}
                >
                  <DynamicIcon name={pillar.icon} size={21} />
                </span>
                <h3 className="mt-6 font-display text-xl font-bold md:text-2xl">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-bone/55">{pillar.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── ABOUT SNIPPET ────────────────────────────────────────────────────────────
function AboutSnippet({ aboutSection }: { aboutSection: HomePage['aboutSection'] }) {
  const imgRef = useParallax<HTMLImageElement>(26);

  return (
    <section className="bg-bone px-5 py-16 md:px-8 md:py-24">
      <Reveal variant="fade">
        <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[2rem]">
          {aboutSection.backgroundImage && (
            <img
              ref={imgRef}
              src={aboutSection.backgroundImage}
              alt=""
              className="absolute inset-0 h-full w-full scale-[1.12] object-cover"
              loading="lazy"
              decoding="async"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-night/92 via-night/82 to-brand/72" />

          <div className="relative mx-auto max-w-3xl px-6 py-20 text-center md:py-32">
            <Reveal variant="fade">
              <div className="mb-6 flex items-center justify-center gap-3 font-label text-[11px] font-semibold uppercase tracking-[0.3em] text-bone/55 md:text-xs">
                <span className="text-sun">05</span>
                <span className="h-px w-10 bg-bone/25" />
                <span>Who we are</span>
              </div>
            </Reveal>
            <WordReveal
              text={aboutSection.title}
              as="h2"
              className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-bone md:text-5xl"
            />
            <Reveal variant="fade" delay={250}>
              <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-bone/70 md:text-lg">
                {aboutSection.content}
              </p>
            </Reveal>
            {aboutSection.buttonText && aboutSection.buttonLink && (
              <Reveal variant="fade" delay={350}>
                <Link
                  to={aboutSection.buttonLink}
                  className="group mt-9 inline-flex items-center gap-2 rounded-full bg-sun px-7 py-3.5 font-label text-[13px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-bone"
                >
                  {aboutSection.buttonText}
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </Reveal>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ── PAGE ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const homeFetcher = useCallback(() => fetchHomePageData(), []);
  const { data: homePageData } = useSanityData(homeFetcher, mockHomePageData);

  return (
    <div className="min-h-screen">
      <HomeHero hero={homePageData?.hero} />
      <LatestUpdates latestUpdates={homePageData?.latestUpdates} />
      <StudentPortalAppSection />
      {homePageData?.grandOpening && <GrandOpening grandOpening={homePageData.grandOpening} />}
      {homePageData?.pillars && homePageData.pillars.length > 0 && (
        <ThreePillars pillars={homePageData.pillars} />
      )}
      {homePageData?.aboutSection && <AboutSnippet aboutSection={homePageData.aboutSection} />}
    </div>
  );
}
