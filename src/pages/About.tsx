import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  X,
  Check,
  Camera,
  Quote,
} from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import WordReveal from '@/components/WordReveal';
import SectionHeading from '@/components/SectionHeading';
import DynamicIcon from '@/components/DynamicIcon';
import { useParallax } from '@/hooks/useParallax';
import {
  aboutPageData,
  statsData,
  facilitiesData,
  academicLevelsData,
  servicesData,
  branchesData,
} from '@/data/mockData';
import { useSanityData } from '@/hooks/useSanityData';
import {
  fetchAboutPageData,
  fetchStats,
  fetchFacilities,
  fetchAcademicLevels,
  fetchServices,
  fetchBranches,
} from '@/services/sanity';
import type { AcademicLevel, Facility } from '@/types';

const NO_IMAGE =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"%3E%3Crect fill="%23e8e6df" width="800" height="500"/%3E%3Ctext fill="%23a9a698" font-family="sans-serif" font-size="20" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3EPhoto coming soon%3C/text%3E%3C/svg%3E';

// ── INTRO — editorial two-column ─────────────────────────────────────────────
function IntroSection({ intro }: { intro: typeof aboutPageData.intro }) {
  const paragraphs = intro?.content || [];

  return (
    <section className="border-t border-ink/10 bg-bone py-16 md:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 md:grid-cols-[260px_1fr] md:gap-16 md:px-8">
        <div className="md:sticky md:top-28 md:self-start">
          <Reveal variant="fade">
            <div className="flex items-center gap-3 font-label text-[11px] font-semibold uppercase tracking-[0.3em] text-ink/55 md:text-xs">
              <span className="text-brand">01</span>
              <span className="h-px w-10 bg-ink/25" />
              <span>Our Story</span>
            </div>
          </Reveal>
        </div>
        <div>
          <WordReveal
            text={intro?.title || 'About Makko Billi School'}
            as="h2"
            className="font-display text-2xl font-bold leading-snug tracking-tight text-ink md:text-4xl md:leading-[1.2]"
          />
          <div className="mt-8 space-y-6">
            {paragraphs.map((paragraph, index) => (
              <Reveal key={index} variant="fade" delay={index * 100}>
                <p
                  className={
                    index === 0
                      ? 'text-lg leading-relaxed text-ink/75 md:text-xl'
                      : 'leading-relaxed text-ink/60'
                  }
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── STATS — dark count-up band ───────────────────────────────────────────────
function StatsSection() {
  const fetcher = useCallback(() => fetchStats(), []);
  const { data: stats } = useSanityData(fetcher, statsData);
  const [counters, setCounters] = useState<number[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || stats.length === 0) return;
    const duration = 1700;
    const steps = 50;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const eased = 1 - Math.pow(1 - step / steps, 3);
      setCounters(stats.map(s => Math.floor(s.value * eased)));
      if (step >= steps) {
        clearInterval(timer);
        setCounters(stats.map(s => s.value));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, stats]);

  if (stats.length === 0) return null;

  return (
    <div ref={ref} className="noise relative overflow-hidden bg-night py-12 text-bone md:py-16">
      <div className="relative mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.id} variant="fade" delay={index * 90}>
              <div className={index > 0 ? 'md:border-l md:border-white/10 md:pl-8' : ''}>
                <p className="font-label text-4xl font-bold tracking-tight md:text-6xl">
                  {counters[index] !== undefined ? counters[index] : stat.value}
                  <span className="text-sun">{stat.suffix}</span>
                </p>
                <p className="mt-2 font-label text-[10px] font-medium uppercase tracking-[0.22em] text-bone/45 md:text-xs">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── ACADEMICS — sticky side-rail explorer ────────────────────────────────────
function PathwayPanel({ level }: { level: AcademicLevel }) {
  const gallery = level.gallery?.length > 0 ? level.gallery : level.mainImage ? [level.mainImage] : [];

  return (
    <div className="animate-fade-in overflow-hidden rounded-3xl border border-ink/10 bg-white">
      {/* header image */}
      <div className="relative h-44 w-full overflow-hidden md:h-60">
        <img
          src={level.mainImage || NO_IMAGE}
          alt={level.level}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-5 md:bottom-5 md:left-7">
          <p className="font-label text-[10px] font-semibold uppercase tracking-[0.25em] text-sun">
            Learning Pathway
          </p>
          <h3 className="mt-1 font-display text-2xl font-bold text-bone md:text-3xl">{level.level}</h3>
        </div>
      </div>

      <div className="p-5 md:p-8">
        {level.extendedDescription && (
          <p className="leading-relaxed text-ink/65 md:text-lg">{level.extendedDescription}</p>
        )}

        {/* director */}
        {level.director && (
          <div className="mt-7 rounded-2xl bg-bone p-5 md:p-6">
            <div className="flex items-start gap-4">
              {level.director.image && (
                <img
                  src={level.director.image}
                  alt={level.director.name}
                  className="h-14 w-14 rounded-full object-cover"
                  loading="lazy"
                />
              )}
              <div className="min-w-0">
                <p className="font-label text-[10px] font-semibold uppercase tracking-[0.22em] text-brand">
                  {level.director.role}
                </p>
                <p className="mt-0.5 font-display text-lg font-bold text-ink">{level.director.name}</p>
                {level.director.message && (
                  <p className="mt-2 flex gap-2 text-sm italic leading-relaxed text-ink/55">
                    <Quote size={14} className="mt-0.5 shrink-0 rotate-180 text-sun" />
                    {level.director.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* features */}
        {level.features?.length > 0 && (
          <div className="mt-7 flex flex-wrap gap-2">
            {level.features.map((feature, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3.5 py-1.5 font-label text-xs font-medium text-ink/70"
              >
                <Check size={12} strokeWidth={3} className="text-leaf" />
                {feature}
              </span>
            ))}
          </div>
        )}

        {/* gallery strip */}
        {gallery.length > 0 && (
          <div className="no-scrollbar -mx-5 mt-7 flex gap-3 overflow-x-auto px-5 md:-mx-8 md:px-8">
            {gallery.slice(0, 6).map((img, i) => (
              <div key={i} className="h-28 w-40 shrink-0 overflow-hidden rounded-xl bg-ink/5 md:h-32 md:w-48">
                <img
                  src={img}
                  alt={`${level.level} photo ${i + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
            <Link
              to="/gallery"
              className="flex h-28 w-40 shrink-0 flex-col items-center justify-center gap-1.5 rounded-xl bg-ink text-bone transition-colors hover:bg-brand md:h-32 md:w-48"
            >
              <Camera size={18} />
              <span className="font-label text-xs font-semibold uppercase tracking-[0.14em]">
                Full Gallery
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function AcademicsSection() {
  const fetcher = useCallback(() => fetchAcademicLevels(), []);
  const { data: academicLevels } = useSanityData(fetcher, academicLevelsData);
  const [activeId, setActiveId] = useState<string>(academicLevels[0]?.id || '');

  useEffect(() => {
    if (academicLevels?.length > 0 && !academicLevels.find(l => l.id === activeId)) {
      setActiveId(academicLevels[0].id);
    }
  }, [academicLevels, activeId]);

  if (!academicLevels || academicLevels.length === 0) return null;

  const active = academicLevels.find(l => l.id === activeId) || academicLevels[0];

  return (
    <section className="bg-bone py-16 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <SectionHeading
          index="02"
          eyebrow="Academics"
          title="Learning Pathways"
          subtitle="From kindergarten through grade 12 — explore each level's curriculum, meet its director, and see students in action."
          className="mb-10 md:mb-14"
        />

        {/* Mobile: horizontal segmented selector */}
        <div className="no-scrollbar -mx-5 mb-6 flex gap-2 overflow-x-auto px-5 md:hidden">
          {academicLevels.map((level, i) => (
            <button
              key={level.id}
              onClick={() => setActiveId(level.id)}
              className={`shrink-0 rounded-full border px-4 py-2.5 font-label text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${
                level.id === active.id
                  ? 'border-ink bg-ink text-bone'
                  : 'border-ink/20 text-ink/60'
              }`}
            >
              <span className={level.id === active.id ? 'text-sun' : 'text-ink/35'}>
                {String(i + 1).padStart(2, '0')}
              </span>{' '}
              {level.level}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[300px_1fr] md:gap-8">
          {/* Desktop: sticky rail */}
          <div className="hidden md:block">
            <div className="sticky top-28 space-y-2">
              {academicLevels.map((level, i) => {
                const isActive = level.id === active.id;
                return (
                  <button
                    key={level.id}
                    onClick={() => setActiveId(level.id)}
                    className={`group w-full rounded-2xl border p-5 text-left transition-all duration-300 ${
                      isActive
                        ? 'border-ink bg-ink text-bone'
                        : 'border-ink/10 bg-white text-ink hover:border-ink/35'
                    }`}
                    aria-pressed={isActive}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-label text-xs font-medium ${
                          isActive ? 'text-sun' : 'text-ink/35'
                        }`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <ArrowRight
                        size={15}
                        className={`transition-all duration-300 ${
                          isActive
                            ? 'translate-x-0 text-sun opacity-100'
                            : '-translate-x-1 text-ink/30 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                        }`}
                      />
                    </div>
                    <p className="mt-2 font-display text-lg font-bold">{level.level}</p>
                    <p
                      className={`mt-1 line-clamp-2 text-xs leading-relaxed ${
                        isActive ? 'text-bone/55' : 'text-ink/45'
                      }`}
                    >
                      {level.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Panel */}
          <div key={active.id}>
            <PathwayPanel level={active} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FACILITIES ───────────────────────────────────────────────────────────────
function FacilityGalleryModal({ facility, onClose }: { facility: Facility; onClose: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const allImages = [facility.mainImage, ...(facility.gallery || [])].filter(Boolean) as string[];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrentIndex(i => (i + 1) % allImages.length);
      if (e.key === 'ArrowLeft') setCurrentIndex(i => (i - 1 + allImages.length) % allImages.length);
    };
    document.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handler);
    };
  }, [onClose, allImages.length]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex animate-fade-in items-center justify-center bg-night/95 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-bone/80 transition-colors hover:border-sun hover:text-sun"
      >
        <X size={20} />
      </button>

      <div className="w-full max-w-4xl" onClick={e => e.stopPropagation()}>
        <div className="relative overflow-hidden rounded-2xl">
          <div className="aspect-video bg-night">
            <img
              key={currentIndex}
              src={allImages[currentIndex]}
              alt={facility.title}
              className="h-full w-full animate-fade-in object-cover"
            />
          </div>
          {allImages.length > 1 && (
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
              <span className="font-label text-xs font-medium tracking-[0.25em] text-bone/85">
                {String(currentIndex + 1).padStart(2, '0')} /{' '}
                {String(allImages.length).padStart(2, '0')}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentIndex(i => (i - 1 + allImages.length) % allImages.length)}
                  aria-label="Previous photo"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-bone backdrop-blur-sm transition-colors hover:bg-bone hover:text-ink"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={() => setCurrentIndex(i => (i + 1) % allImages.length)}
                  aria-label="Next photo"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-bone backdrop-blur-sm transition-colors hover:bg-bone hover:text-ink"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-5 text-center">
          <h3 className="font-display text-xl font-bold text-bone">{facility.title}</h3>
          <p className="mt-1 text-sm text-bone/55">{facility.description}</p>
        </div>

        {allImages.length > 1 && (
          <div className="no-scrollbar mt-4 flex justify-center gap-2 overflow-x-auto pb-1">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Photo ${idx + 1}`}
                className={`h-12 w-16 shrink-0 overflow-hidden rounded-lg transition-all ${
                  idx === currentIndex
                    ? 'ring-2 ring-sun'
                    : 'opacity-45 hover:opacity-80'
                }`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FacilitiesSection() {
  const fetcher = useCallback(() => fetchFacilities(), []);
  const { data: facilities } = useSanityData(fetcher, facilitiesData);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

  if (!facilities || facilities.length === 0) return null;

  return (
    <section className="border-t border-ink/10 bg-bone py-16 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <SectionHeading
          index="03"
          eyebrow="Campus"
          title="World-Class Facilities"
          subtitle="Select any facility to flip through more photos."
          className="mb-10 md:mb-14"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {facilities.map((facility, index) => (
            <Reveal
              key={facility.id}
              variant="fade"
              delay={(index % 3) * 90}
              className={facility.colSpan === 2 ? 'sm:col-span-2' : ''}
            >
              <button
                type="button"
                onClick={() => setSelectedFacility(facility)}
                className="img-zoom group relative block w-full overflow-hidden rounded-2xl text-left md:rounded-3xl"
              >
                <div className={facility.colSpan === 2 ? 'aspect-[2/1]' : 'aspect-[4/3] sm:aspect-square'}>
                  <img
                    src={facility.mainImage || NO_IMAGE}
                    alt={facility.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/25 to-transparent transition-opacity duration-500" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 md:p-6">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <DynamicIcon name={facility.icon} size={16} className="text-sun" />
                      <h3 className="font-display text-lg font-bold text-bone md:text-xl">
                        {facility.title}
                      </h3>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-bone/65 md:text-sm">
                      {facility.description}
                    </p>
                    {facility.gallery?.length > 0 && (
                      <p className="mt-2 font-label text-[10px] font-medium uppercase tracking-[0.18em] text-sun">
                        {facility.gallery.length + 1} photos
                      </p>
                    )}
                  </div>
                  <span className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 text-bone transition-all duration-300 group-hover:bg-sun group-hover:text-ink">
                    <ArrowUpRight size={15} />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {selectedFacility && (
        <FacilityGalleryModal facility={selectedFacility} onClose={() => setSelectedFacility(null)} />
      )}
    </section>
  );
}

// ── SERVICES ─────────────────────────────────────────────────────────────────
function ServicesSection() {
  const fetcher = useCallback(() => fetchServices(), []);
  const { data: services } = useSanityData(fetcher, servicesData);

  if (!services || services.length === 0) return null;

  return (
    <section className="noise relative overflow-hidden bg-night py-16 text-bone md:py-28">
      <div className="relative mx-auto max-w-[1200px] px-5 md:px-8">
        <SectionHeading
          index="04"
          eyebrow="Student life"
          title="Beyond the Classroom"
          subtitle="Integrated technology and holistic support for a thriving student life."
          dark
          className="mb-12 md:mb-16"
        />

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.id} variant="fade" delay={(index % 3) * 90} className="h-full">
              <div className="group relative h-full bg-night p-7 transition-colors duration-500 hover:bg-[#161b3d] md:p-8">
                <span className="absolute left-0 top-0 h-0.5 w-0 bg-sun transition-all duration-500 group-hover:w-full" />
                <div className="flex items-center justify-between">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full"
                    style={{ backgroundColor: service.iconColor || '#2d4289' }}
                  >
                    <DynamicIcon name={service.icon} size={18} className="text-ink" />
                  </span>
                  <span className="font-label text-xs font-medium text-bone/25">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-bone/55">{service.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── BRANCHES ─────────────────────────────────────────────────────────────────
function BranchImage({ src, alt }: { src: string; alt: string }) {
  const ref = useParallax<HTMLImageElement>(20);
  return (
    <div className="overflow-hidden rounded-3xl bg-ink/5">
      <div className="aspect-video">
        <img
          ref={ref}
          src={src}
          alt={alt}
          className="h-full w-full scale-[1.12] object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}

function BranchesSection() {
  const fetcher = useCallback(() => fetchBranches(), []);
  const { data: branches } = useSanityData(fetcher, branchesData);

  if (!branches || branches.length === 0) return null;

  return (
    <section className="bg-bone py-16 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <SectionHeading
          index="05"
          eyebrow="Our network"
          title="Expanding Horizons"
          subtitle="Bringing quality education to more communities across Ethiopia."
          className="mb-12 md:mb-16"
        />

        <div className="space-y-16 md:space-y-24">
          {branches.map((branch, index) => {
            const flipped = index % 2 === 1;
            return (
              <Reveal key={branch.id} variant="fade">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
                  <div className={flipped ? 'lg:order-2' : ''}>
                    <BranchImage src={branch.image || NO_IMAGE} alt={branch.name} />
                  </div>
                  <div className={flipped ? 'lg:order-1' : ''}>
                    <div className="flex items-center gap-2.5 font-label text-[11px] font-semibold uppercase tracking-[0.25em] text-ink/50">
                      <MapPin size={13} className="text-brand" />
                      {branch.location}
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink md:text-4xl">
                      {branch.name}
                    </h3>
                    <p className="mt-4 leading-relaxed text-ink/60">{branch.description}</p>
                    {branch.features?.length > 0 && (
                      <div className="mt-7 grid grid-cols-1 gap-x-6 border-t border-ink/10 sm:grid-cols-2">
                        {branch.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2.5 border-b border-ink/10 py-3"
                          >
                            <Check size={14} strokeWidth={3} className="shrink-0 text-leaf" />
                            <span className="text-sm font-medium text-ink/70">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── CTA ──────────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="bg-bone px-5 pb-16 md:px-8 md:pb-24">
      <Reveal variant="fade">
        <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[2rem] bg-sun">
          <div className="relative grid grid-cols-1 items-center gap-8 px-7 py-14 md:grid-cols-[1fr_auto] md:px-14 md:py-20">
            <div>
              <p className="font-label text-[11px] font-semibold uppercase tracking-[0.3em] text-ink/55 md:text-xs">
                Admissions open
              </p>
              <WordReveal
                text="Join Our Community"
                as="h2"
                className="mt-4 font-display text-3xl font-bold leading-[1.02] tracking-tight text-ink md:text-6xl"
              />
              <p className="mt-5 max-w-xl leading-relaxed text-ink/65">
                Be part of a legacy that values integrity, innovation, and inclusivity. Discover what
                makes Makko Billi School the right place for your child's future.
              </p>
            </div>
            <Link
              to="/contact"
              className="group inline-flex w-fit items-center gap-2 rounded-full bg-ink px-8 py-4 font-label text-[13px] font-semibold uppercase tracking-[0.12em] text-bone transition-colors hover:bg-brand"
            >
              Apply for Admission
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ── PAGE ─────────────────────────────────────────────────────────────────────
export default function About() {
  const aboutFetcher = useCallback(() => fetchAboutPageData(), []);
  const { data: pageData } = useSanityData(aboutFetcher, aboutPageData);

  return (
    <div className="min-h-screen">
      <PageHero
        crumb="About"
        title={pageData?.hero?.title || 'About Us'}
        subtitle={pageData?.hero?.subtitle}
        images={pageData?.hero?.images}
      />
      {pageData?.intro && <IntroSection intro={pageData.intro} />}
      <StatsSection />
      <AcademicsSection />
      <FacilitiesSection />
      <ServicesSection />
      <BranchesSection />
      <CTASection />
    </div>
  );
}
