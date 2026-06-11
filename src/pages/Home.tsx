import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Apple,
  PlayCircle,
  Globe,
  CalendarDays,
} from 'lucide-react';
import { toast } from 'sonner';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import DynamicIcon from '@/components/DynamicIcon';
import LightboxGallery from '@/components/LightboxGallery';
import {
  Polaroid,
  Scallop,
  Tape,
  DoodleStar,
  DoodleSun,
  DoodleHeart,
  DoodleSwirl,
} from '@/components/decor';
import { homePageData as mockHomePageData, socialPostsData, statsData } from '@/data/mockData';
import { useSanityData, useSanityArrayData } from '@/hooks/useSanityData';
import {
  fetchHomePageData,
  fetchStudentPortalApp,
  fetchSocialPosts,
  fetchStats,
} from '@/services/sanity';
import type { HomePage } from '@/types';

// ── HERO ──────────────────────────────────────────────────────────────────────
function HomeHero({ hero }: { hero: HomePage['hero'] }) {
  const images = (hero?.images || []).filter(Boolean);
  const [current, setCurrent] = useState(0);

  const statsFetcher = useCallback(() => fetchStats(), []);
  const { data: stats } = useSanityArrayData(statsFetcher, statsData);

  // gentle auto-rotation of the main polaroid
  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => setCurrent(c => (c + 1) % images.length), 4500);
    return () => clearInterval(t);
  }, [images.length]);

  const title = hero?.title || 'Welcome to Makko Billi School';
  const words = title.trim().split(' ');
  const tail = words.length > 2 ? words.splice(-2).join(' ') : words.splice(-1).join(' ');

  return (
    <header className="relative overflow-hidden bg-cream">
      <div className="absolute inset-0 bg-dots opacity-60" aria-hidden="true" />
      {/* doodles */}
      <DoodleSun className="absolute -right-10 -top-10 h-36 w-36 text-sun/70 animate-spin-slow" />
      <DoodleStar className="absolute left-[6%] top-32 hidden h-8 w-8 text-coral/80 animate-float md:block" />
      <DoodleHeart className="absolute bottom-28 left-[44%] hidden h-6 w-6 -rotate-12 text-coral/60 lg:block" />
      <DoodleSwirl className="absolute bottom-24 left-4 h-10 w-20 text-brand/20 md:left-10" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-28 sm:px-6 md:pb-20 md:pt-36 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <Reveal>
            <p className="mb-3 inline-flex items-center gap-2 font-hand text-2xl text-coral-deep md:text-3xl">
              <DoodleStar className="h-5 w-5 text-sun-deep" />
              A K-12 school in Adama, Ethiopia
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display text-[2.6rem] font-bold leading-[1.04] text-ink sm:text-6xl lg:text-[4.2rem]">
              {words.join(' ')}{' '}
              <span className="highlight-sun whitespace-pre-wrap">{tail}</span>
            </h1>
          </Reveal>
          {hero?.subtitle && (
            <Reveal delay={200}>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink/65 sm:text-lg lg:mx-0">
                {hero.subtitle}
              </p>
            </Reveal>
          )}
          <Reveal delay={300}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link
                to={hero?.buttonLink || '/about'}
                className="btn-press inline-flex items-center gap-2 rounded-2xl border-2 border-ink bg-brand px-6 py-3.5 font-display text-base font-bold text-white shadow-sticker sm:px-7"
              >
                {hero?.buttonText || 'Discover More'}
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/contact"
                className="btn-press inline-flex items-center gap-2 rounded-2xl border-2 border-ink bg-sun px-6 py-3.5 font-display text-base font-bold text-ink shadow-sticker sm:px-7"
              >
                Visit Us
              </Link>
            </div>
          </Reveal>

          {/* CMS-driven stat chips */}
          {stats.length > 0 && (
            <Reveal delay={400}>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 lg:justify-start">
                {stats.slice(0, 4).map(stat => (
                  <div key={stat.id} className="flex items-baseline gap-1.5">
                    <span className="font-display text-2xl font-bold text-brand sm:text-3xl">
                      {stat.value}
                      <span className="text-coral-deep">{stat.suffix}</span>
                    </span>
                    <span className="max-w-[7rem] text-[11px] font-bold uppercase leading-tight tracking-wide text-ink/50">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>

        {/* Photo collage */}
        {images.length > 0 && (
          <Reveal variant="pop" delay={200} className="mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative mx-auto aspect-[5/4] w-full max-w-[26rem] lg:max-w-[30rem]">
              {/* back photos */}
              {images[1] && (
                <Polaroid
                  src={images[1]}
                  imgClassName="aspect-[4/3]"
                  className="absolute -left-2 top-6 w-[55%] rotate-[-8deg] sm:-left-4"
                />
              )}
              {images[2] && (
                <Polaroid
                  src={images[2]}
                  imgClassName="aspect-[4/3]"
                  className="absolute -right-1 bottom-0 w-[52%] rotate-[7deg] sm:-right-3"
                />
              )}
              {/* main rotating polaroid */}
              <figure className="absolute left-1/2 top-1/2 z-10 w-[78%] -translate-x-1/2 -translate-y-1/2 rotate-[2deg] rounded-2xl border-2 border-ink/10 bg-white p-3 pb-4 shadow-soft">
                <Tape />
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-cream">
                  {images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={i === 0 ? 'Life at Makko Billi School' : ''}
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                        i === current ? 'opacity-100' : 'opacity-0'
                      }`}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      fetchPriority={i === 0 ? 'high' : 'low'}
                    />
                  ))}
                </div>
                <figcaption className="flex items-center justify-between px-1 pt-2.5">
                  <span className="font-hand text-xl leading-none text-ink/70">school days ♡</span>
                  {images.length > 1 && (
                    <span className="flex gap-1.5">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrent(i)}
                          aria-label={`Photo ${i + 1}`}
                          className={`h-2 rounded-full transition-all ${
                            i === current ? 'w-5 bg-coral' : 'w-2 bg-ink/15 hover:bg-ink/30'
                          }`}
                        />
                      ))}
                    </span>
                  )}
                </figcaption>
              </figure>
            </div>
          </Reveal>
        )}
      </div>

      {/* marquee values strip */}
      <div className="relative border-y-2 border-ink bg-brand py-3 md:py-3.5" aria-hidden="true">
        <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap pr-8">
          {[0, 1].map(copy => (
            <div key={copy} className="flex items-center gap-8">
              {[
                'Nurturing Minds',
                'Building Character',
                'KG – Grade 12',
                'A Love for Learning',
                'Adama & Dembi Dollo',
                'Since 2009',
              ].map(item => (
                <span key={item} className="flex items-center gap-8 font-display text-sm font-bold uppercase tracking-widest text-sun md:text-base">
                  {item}
                  <DoodleStar className="h-4 w-4 text-coral" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

// ── LATEST UPDATES (social posts) ────────────────────────────────────────────
function LatestUpdates({ latestUpdates }: { latestUpdates?: HomePage['latestUpdates'] }) {
  const [visibleCount, setVisibleCount] = useState(3);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const postsFetcher = useCallback(() => fetchSocialPosts(), []);
  const { data: posts, loading } = useSanityArrayData(postsFetcher, socialPostsData);

  if ((!posts || posts.length === 0) && !loading) return null;
  if (loading && (!posts || posts.length === 0)) return null;

  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="What's new?"
          title={latestUpdates?.title || 'Latest Updates'}
          accent="coral"
          className="mb-10 md:mb-14"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, visibleCount).map((post, index) => (
            <Reveal key={post.id || index} delay={(index % 3) * 120}>
              <article
                className={`card-hover relative h-full rounded-3xl border-2 border-ink/10 bg-white p-3 ${
                  index % 3 === 1 ? 'sm:rotate-[0.6deg]' : index % 3 === 2 ? 'sm:rotate-[-0.6deg]' : ''
                }`}
              >
                {post.images && post.images.length > 0 && (
                  <button
                    type="button"
                    className="img-zoom relative block w-full cursor-pointer overflow-hidden rounded-2xl"
                    onClick={() => setLightboxImages(post.images)}
                    aria-label="View photos"
                  >
                    <div className="aspect-video">
                      <img
                        src={post.images[0]}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    {post.images.length > 1 && (
                      <span className="absolute bottom-2.5 right-2.5 rounded-full bg-ink/70 px-2.5 py-1 text-xs font-bold text-white">
                        +{post.images.length - 1} photos
                      </span>
                    )}
                  </button>
                )}
                <div className="p-4">
                  <div className="mb-3 flex items-center gap-2.5">
                    <span className="rounded-full bg-sun px-3 py-1 font-display text-xs font-bold text-ink">
                      {post.platform === 'manual' ? 'Announcement' : post.platform}
                    </span>
                    {post.date && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-ink/40">
                        <CalendarDays size={13} />
                        {new Date(post.date).toLocaleDateString(undefined, {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    )}
                  </div>
                  <p className="line-clamp-3 text-sm leading-relaxed text-ink/70">{post.content}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {visibleCount < posts.length && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setVisibleCount(c => c + 3)}
              className="btn-press inline-flex items-center gap-2 rounded-2xl border-2 border-ink bg-white px-7 py-3 font-display font-bold text-brand shadow-sticker"
            >
              {latestUpdates?.buttonText || 'Load More'}
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>

      {lightboxImages.length > 0 && (
        <LightboxGallery images={lightboxImages} onClose={() => setLightboxImages([])} />
      )}
    </section>
  );
}

// ── STUDENT PORTAL APP ────────────────────────────────────────────────────────
function StudentPortalAppSection() {
  const portalFetcher = useCallback(() => fetchStudentPortalApp(), []);
  const { data: app } = useSanityData(portalFetcher, mockHomePageData.studentPortalApp);

  if (!app) return null;

  const webPortal =
    app.downloadLinks?.webPortal && app.downloadLinks.webPortal !== '#'
      ? app.downloadLinks.webPortal
      : 'https://portal.makkobillischool.com';

  return (
    <section className="bg-paper px-4 pb-16 sm:px-6 md:pb-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border-2 border-ink bg-brand shadow-sticker-sun">
        <div className="absolute inset-0 bg-dots opacity-30" aria-hidden="true" />
        <DoodleSun className="absolute -left-8 -top-8 h-28 w-28 text-sun/30 animate-spin-slow" />
        <DoodleStar className="absolute bottom-10 right-[45%] hidden h-6 w-6 text-coral/70 lg:block" />

        <div className="relative grid grid-cols-1 items-center gap-10 p-7 sm:p-10 lg:grid-cols-2 lg:p-14">
          <div>
            <Reveal>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-sun px-4 py-1.5 font-display text-xs font-bold uppercase tracking-wider text-ink shadow-sticker-xs">
                <span className="h-2 w-2 animate-pulse rounded-full bg-coral-deep" />
                {app.badge}
              </span>
              <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl">
                {app.title}
              </h2>
              <p className="mt-2 font-hand text-2xl text-sun md:text-3xl">{app.subtitle}</p>
              <p className="mt-4 max-w-lg leading-relaxed text-white/75">{app.description}</p>
            </Reveal>

            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {(app.features || []).map((feature: { icon: string; title: string; description: string }, i: number) => (
                <Reveal key={i} delay={100 + i * 80}>
                  <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-3 transition-colors hover:bg-white/15">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sun text-ink">
                      <DynamicIcon name={feature.icon} size={19} />
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-white">{feature.title}</span>
                      <span className="block text-xs text-white/60">{feature.description}</span>
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={350}>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() =>
                    toast.info('Coming Soon', { description: 'The App Store version will be available soon.' })
                  }
                  className="btn-press inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-white px-5 py-2.5 font-display text-sm font-bold text-ink shadow-sticker-sm"
                >
                  <Apple size={17} />
                  App Store
                </button>
                <button
                  type="button"
                  onClick={() =>
                    toast.info('Coming Soon', { description: 'The Play Store version will be available soon.' })
                  }
                  className="btn-press inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-white px-5 py-2.5 font-display text-sm font-bold text-ink shadow-sticker-sm"
                >
                  <PlayCircle size={17} />
                  Play Store
                </button>
                <a
                  href={webPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-sun px-5 py-2.5 font-display text-sm font-bold text-ink shadow-sticker-sm"
                >
                  <Globe size={17} />
                  Web Portal
                </a>
              </div>
            </Reveal>
          </div>

          {/* App screenshot */}
          <Reveal variant="pop" delay={200}>
            <div className="relative mx-auto max-w-md">
              <div className="absolute inset-0 scale-110 rounded-full bg-sun/20 blur-3xl" aria-hidden="true" />
              <div className="relative rotate-[-1.5deg] rounded-3xl border-2 border-ink/10 bg-white p-3 shadow-soft">
                <Tape color="bg-coral/70" />
                <img
                  src={
                    app.appImage ||
                    'https://cdn.sanity.io/images/yqwhfc1k/production/8508996403a729ae03430e7460e4a899b40d2c11-1181x768.png'
                  }
                  alt="Makko Billi Student Portal App"
                  className="w-full rounded-2xl"
                  loading="lazy"
                />
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
    <section className="relative overflow-hidden bg-cream py-16 md:py-24">
      <div className="absolute inset-0 bg-dots opacity-50" aria-hidden="true" />
      <DoodleSwirl className="absolute right-6 top-10 h-10 w-20 text-coral/40" />
      <DoodleStar className="absolute bottom-16 left-[5%] h-6 w-6 text-sun-deep/70 animate-float" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mb-12 text-center md:mb-16">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-coral px-4 py-1.5 font-display text-xs font-bold uppercase tracking-wider text-white shadow-sticker-xs">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
            {grandOpening.badge}
          </span>
          <h2 className="font-display text-3xl font-bold text-brand md:text-4xl lg:text-[2.75rem]">
            {grandOpening.title}
          </h2>
          <p className="mt-2 font-hand text-2xl text-coral-deep md:text-3xl">{grandOpening.subtitle}</p>
          {grandOpening.description && (
            <p className="mx-auto mt-3 max-w-2xl text-ink/60">{grandOpening.description}</p>
          )}
        </Reveal>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Carousel as a big polaroid */}
          {images.length > 0 && (
            <Reveal variant="left">
              <div className="relative rotate-[-1deg] rounded-3xl border-2 border-ink/10 bg-white p-3 pb-4 shadow-soft">
                <Tape />
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Campus photo ${index + 1}`}
                      loading="lazy"
                      className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                        index === current ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                      }`}
                    />
                  ))}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prev}
                        aria-label="Previous photo"
                        className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-ink bg-white text-ink shadow-sticker-xs transition-colors hover:bg-sun"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={next}
                        aria-label="Next photo"
                        className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-ink bg-white text-ink shadow-sticker-xs transition-colors hover:bg-sun"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>
                <div className="flex items-center justify-between px-1 pt-2.5">
                  <span className="font-hand text-xl leading-none text-ink/70">our new campus!</span>
                  {images.length > 1 && (
                    <span className="flex gap-1.5">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrent(i)}
                          aria-label={`Photo ${i + 1}`}
                          className={`h-2 rounded-full transition-all ${
                            i === current ? 'w-5 bg-coral' : 'w-2 bg-ink/15 hover:bg-ink/30'
                          }`}
                        />
                      ))}
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          )}

          {/* Features */}
          <div className="space-y-3">
            {(grandOpening.features || []).map((feature, index) => (
              <Reveal key={index} variant="right" delay={index * 110}>
                <div className="group flex items-start gap-4 rounded-2xl border-2 border-ink/10 bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-soft">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white transition-transform group-hover:rotate-[-6deg] group-hover:scale-105"
                    style={{ backgroundColor: feature.bgColor || '#2d4289' }}
                  >
                    <DynamicIcon name={feature.icon} size={22} />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-bold text-brand">{feature.title}</span>
                    <span className="mt-0.5 block text-sm leading-relaxed text-ink/60">{feature.description}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── THREE PILLARS ────────────────────────────────────────────────────────────
const PILLAR_SHADOWS = ['shadow-sticker-sun', 'shadow-sticker-coral', 'shadow-sticker-brand'];

function ThreePillars({ pillars }: { pillars: HomePage['pillars'] }) {
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="What we stand for"
          title="Our Three Pillars"
          accent="sun"
          className="mb-10 md:mb-14"
        />
        <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Reveal key={index} delay={index * 140} variant="pop">
              <div
                className={`group h-full rounded-3xl border-2 border-ink p-7 text-center transition-transform duration-300 hover:-translate-y-1.5 hover:rotate-[-0.75deg] md:p-8 ${PILLAR_SHADOWS[index % 3]} ${
                  index % 2 === 1 ? 'md:translate-y-4' : ''
                }`}
                style={{ backgroundColor: pillar.bgColor || '#ffffff' }}
              >
                <span
                  className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-ink text-white transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
                  style={{ backgroundColor: pillar.iconColor || '#2d4289' }}
                >
                  <DynamicIcon name={pillar.icon} size={30} />
                </span>
                <h3 className="mb-2.5 font-display text-xl font-bold text-ink">{pillar.title}</h3>
                <p className="text-sm leading-relaxed text-ink/65">{pillar.description}</p>
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
  return (
    <section className="bg-paper px-4 pb-4 pt-8 sm:px-6 md:pt-12">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border-2 border-ink shadow-sticker">
        {/* plain cover image (bg-attachment: fixed breaks on iOS — avoided on purpose) */}
        {aboutSection.backgroundImage && (
          <img
            src={aboutSection.backgroundImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-brand/85 to-brand/75" />
        <div className="absolute inset-0 bg-dots opacity-20" aria-hidden="true" />

        <div className="relative mx-auto max-w-3xl px-6 py-16 text-center md:py-24">
          <Reveal>
            <p className="mb-2 font-hand text-2xl text-sun md:text-3xl">Get to know us</p>
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-[2.75rem]">
              {aboutSection.title}
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-white/80 md:text-lg">
              {aboutSection.content}
            </p>
          </Reveal>
          {aboutSection.buttonText && aboutSection.buttonLink && (
            <Reveal delay={250}>
              <Link
                to={aboutSection.buttonLink}
                className="btn-press mt-8 inline-flex items-center gap-2 rounded-2xl border-2 border-ink bg-sun px-7 py-3.5 font-display font-bold text-ink shadow-sticker"
              >
                {aboutSection.buttonText}
                <ArrowRight size={18} />
              </Link>
            </Reveal>
          )}
        </div>
        <Scallop className="relative h-4 text-paper md:h-5" />
      </div>
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
