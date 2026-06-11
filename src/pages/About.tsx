import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ChevronLeft, ChevronRight, ChevronDown, X, Check, ArrowRight, Camera } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import DynamicIcon from '@/components/DynamicIcon';
import { Polaroid, Tape, Scallop, DoodleStar, DoodleSun, DoodleSwirl } from '@/components/decor';
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
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%23fbf3e4" width="400" height="300"/%3E%3Ctext fill="%23b9b09c" font-family="sans-serif" font-size="18" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3EPhoto coming soon%3C/text%3E%3C/svg%3E';

// ── INTRO ────────────────────────────────────────────────────────────────────
function IntroSection({ intro }: { intro: typeof aboutPageData.intro }) {
  return (
    <section className="relative bg-paper py-16 md:py-20">
      <DoodleSwirl className="absolute left-6 top-10 hidden h-10 w-20 text-coral/30 md:block" />
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <SectionHeading eyebrow="Our story" title={intro?.title || 'About Us'} accent="coral" />
        <div className="mt-8 space-y-5">
          {intro?.content?.map((paragraph, index) => (
            <Reveal key={index} delay={120 + index * 120}>
              <p className="leading-relaxed text-ink/70 md:text-lg">{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── STATS ────────────────────────────────────────────────────────────────────
const STAT_STYLES = [
  'bg-sun rotate-[-1.5deg]',
  'bg-white rotate-[1deg]',
  'bg-coral rotate-[-1deg] text-white',
  'bg-white rotate-[1.5deg]',
];

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
    const duration = 1800;
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
    <div ref={ref} className="bg-paper pb-16 md:pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {stats.map((stat, index) => (
            <Reveal key={stat.id} delay={index * 100} variant="pop">
              <div
                className={`h-full rounded-3xl border-2 border-ink p-5 text-center shadow-sticker-sm transition-transform hover:rotate-0 md:p-7 ${
                  STAT_STYLES[index % 4]
                }`}
              >
                <p className="font-display text-3xl font-bold md:text-5xl">
                  {counters[index] !== undefined ? counters[index] : stat.value}
                  <span className={index % 4 === 2 ? 'text-sun' : 'text-coral-deep'}>{stat.suffix}</span>
                </p>
                <p
                  className={`mt-1.5 text-[11px] font-bold uppercase tracking-widest md:text-xs ${
                    index % 4 === 2 ? 'text-white/80' : 'text-ink/50'
                  }`}
                >
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

// ── ACADEMICS / LEARNING PATHWAYS ────────────────────────────────────────────
function PathwayContent({ level }: { level: AcademicLevel }) {
  const allImages =
    level.gallery?.length > 0 ? level.gallery : level.mainImage ? [level.mainImage] : [];

  return (
    <div
      id="active-pathway-content"
      className="scroll-mt-28 rounded-[2rem] border-2 border-ink/10 bg-white p-6 shadow-soft md:p-10"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Description & director */}
        <div className="space-y-7">
          <div className="flex items-center gap-3">
            <span className="h-9 w-2 rounded-full bg-sun" />
            <h3 className="font-display text-2xl font-bold text-brand md:text-3xl">
              {level.level} Overview
            </h3>
          </div>
          {level.extendedDescription && (
            <p className="leading-relaxed text-ink/70 md:text-lg">{level.extendedDescription}</p>
          )}

          {level.director && (
            <div className="relative rounded-2xl border-2 border-ink/10 bg-cream p-5 md:p-6">
              <Tape color="bg-coral/60" className="h-5 w-16" />
              <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-coral-deep">
                {level.director.role}
              </p>
              <div className="flex items-start gap-4">
                {level.director.image && (
                  <img
                    src={level.director.image}
                    alt={level.director.name}
                    className="h-16 w-16 rounded-2xl border-2 border-ink/10 bg-white object-cover"
                    loading="lazy"
                  />
                )}
                <div>
                  <p className="font-display text-lg font-bold text-brand">{level.director.name}</p>
                  {level.director.message && (
                    <p className="mt-1.5 font-hand text-xl leading-snug text-ink/60">
                      “{level.director.message}”
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {level.features?.length > 0 && (
            <div className="flex flex-wrap gap-2.5">
              {level.features.map((feature, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-ink/10 bg-paper px-4 py-1.5 text-sm font-semibold text-ink/75"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-leaf/15 p-0.5 text-leaf">
                    <Check size={13} strokeWidth={3.5} />
                  </span>
                  {feature}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Photo grid */}
        <div>
          <h4 className="mb-4 font-hand text-2xl text-coral-deep md:text-3xl">Life in {level.level} ✨</h4>
          <div className="grid auto-rows-[110px] grid-cols-2 gap-3 md:auto-rows-[130px] md:gap-4">
            {allImages.slice(0, 5).map((img, i) => (
              <div key={i} className="img-zoom overflow-hidden rounded-2xl border-2 border-ink/10 bg-cream">
                <img src={img} alt={`${level.level} photo ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
              </div>
            ))}
            <Link
              to="/gallery"
              className="btn-press flex flex-col items-center justify-center gap-1 rounded-2xl border-2 border-ink bg-brand text-white shadow-sticker-sm"
            >
              <Camera size={22} />
              <span className="font-display text-lg font-bold leading-none">Explore</span>
              <span className="text-xs text-white/70">See full gallery</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function AcademicsSection() {
  const fetcher = useCallback(() => fetchAcademicLevels(), []);
  const { data: academicLevels } = useSanityData(fetcher, academicLevelsData);
  const [activeLevel, setActiveLevel] = useState<string>(academicLevels[0]?.id || '');

  useEffect(() => {
    if (academicLevels?.length > 0 && !academicLevels.find(l => l.id === activeLevel)) {
      setActiveLevel(academicLevels[0].id);
    }
  }, [academicLevels, activeLevel]);

  const handleLevelClick = (id: string) => {
    setActiveLevel(id);
    setTimeout(() => {
      const element = document.getElementById('active-pathway-content');
      if (element) {
        const top = element.getBoundingClientRect().top + window.pageYOffset - 110;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 120);
  };

  if (!academicLevels || academicLevels.length === 0) return null;

  const activeData = academicLevels.find(l => l.id === activeLevel) || academicLevels[0];

  return (
    <section className="relative overflow-hidden bg-cream py-16 md:py-24">
      <div className="absolute inset-0 bg-dots opacity-50" aria-hidden="true" />
      <DoodleSun className="absolute -right-8 top-10 h-24 w-24 text-sun/50 animate-spin-slow" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Academics"
          title="Learning Pathways"
          subtitle="Tap a level to explore the curriculum, meet the directors, and see our students in action."
          accent="coral"
          className="mb-10 md:mb-14"
        />

        {/* Level cards */}
        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {academicLevels.map((level, idx) => {
            const isActive = activeLevel === level.id;
            return (
              <div key={level.id} className="flex flex-col">
                <Reveal delay={idx * 100} className="h-full">
                  <button
                    type="button"
                    onClick={() => handleLevelClick(level.id)}
                    aria-expanded={isActive}
                    className={`group relative block h-full w-full rounded-3xl border-2 bg-white p-3 pb-5 text-center transition-all duration-300 ${
                      isActive
                        ? 'border-ink shadow-sticker-sun md:-translate-y-1.5'
                        : 'border-ink/10 shadow-sm hover:-translate-y-1 hover:shadow-soft'
                    }`}
                  >
                    <span className="img-zoom block overflow-hidden rounded-2xl">
                      <span className="block aspect-[16/10]">
                        <img
                          src={level.mainImage || NO_IMAGE}
                          alt={level.level}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </span>
                    </span>
                    <span className="mt-4 block font-display text-xl font-bold text-brand">{level.level}</span>
                    <span className="mt-1 block px-3 text-sm leading-snug text-ink/55">{level.description}</span>
                    <span
                      className={`absolute -bottom-3.5 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-ink text-ink transition-all duration-300 ${
                        isActive ? 'rotate-180 bg-sun opacity-100' : 'bg-white opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <ChevronDown size={17} strokeWidth={3} />
                    </span>
                  </button>
                </Reveal>

                {/* Mobile: expand right under the tapped card */}
                <div
                  className={`md:hidden ${isActive ? 'mt-7 animate-fade-in-up' : 'hidden'}`}
                >
                  {isActive && <PathwayContent level={activeData} />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop: expanded panel below the cards */}
        <div className="hidden md:block">
          <Reveal key={activeData.id} variant="fade">
            <PathwayContent level={activeData} />
          </Reveal>
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink/95 p-4" onClick={onClose}>
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
      >
        <X size={22} />
      </button>

      <div className="w-full max-w-4xl" onClick={e => e.stopPropagation()}>
        <div className="relative overflow-hidden rounded-3xl border-2 border-white/15">
          <div className="aspect-video bg-ink">
            <img src={allImages[currentIndex]} alt={facility.title} className="h-full w-full object-cover" />
          </div>
          {allImages.length > 1 && (
            <>
              <button
                onClick={() => setCurrentIndex(i => (i - 1 + allImages.length) % allImages.length)}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink transition-colors hover:bg-sun"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setCurrentIndex(i => (i + 1) % allImages.length)}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink transition-colors hover:bg-sun"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        <div className="mt-4 text-center">
          <h3 className="font-display text-xl font-bold text-white">{facility.title}</h3>
          <p className="mt-1 text-sm text-white/60">{facility.description}</p>
          <p className="mt-1.5 text-xs text-white/40">
            {currentIndex + 1} / {allImages.length}
          </p>
        </div>

        {allImages.length > 1 && (
          <div className="mt-4 flex justify-center gap-2 overflow-x-auto pb-1">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Photo ${idx + 1}`}
                className={`h-12 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                  idx === currentIndex ? 'border-sun' : 'border-transparent opacity-50 hover:opacity-80'
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
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Campus infrastructure"
          title="World-Class Facilities"
          subtitle="Tap any facility to flip through more photos."
          accent="sun"
          className="mb-10 md:mb-14"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility, index) => (
            <Reveal
              key={facility.id}
              delay={(index % 3) * 100}
              className={facility.colSpan === 2 ? 'sm:col-span-2' : ''}
            >
              <button
                type="button"
                onClick={() => setSelectedFacility(facility)}
                className="card-hover group relative block w-full overflow-hidden rounded-3xl border-2 border-ink/10 text-left"
              >
                <div className={facility.colSpan === 2 ? 'aspect-[2/1]' : 'aspect-[4/3] sm:aspect-square'}>
                  <img
                    src={facility.mainImage || NO_IMAGE}
                    alt={facility.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <div className="mb-1.5 flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sun text-ink">
                      <DynamicIcon name={facility.icon} size={18} />
                    </span>
                    <h3 className="font-display text-xl font-bold text-white">{facility.title}</h3>
                  </div>
                  <p className="text-sm leading-snug text-white/75">{facility.description}</p>
                  {facility.gallery?.length > 0 && (
                    <p className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-xs font-bold text-sun backdrop-blur-sm">
                      <Camera size={12} />
                      {facility.gallery.length + 1} photos
                    </p>
                  )}
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
    <section className="relative overflow-hidden bg-cream py-16 md:py-24">
      <div className="absolute inset-0 bg-dots opacity-50" aria-hidden="true" />
      <DoodleStar className="absolute right-[8%] top-12 h-7 w-7 text-coral/60 animate-float" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Student life"
          title="Beyond the Classroom"
          subtitle="Integrated technology and holistic support for a thriving student life."
          accent="sky"
          className="mb-10 md:mb-14"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={(index % 3) * 100}>
              <div className="card-hover h-full rounded-3xl border-2 border-ink/10 bg-white p-6">
                <span
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-ink/10 text-brand"
                  style={{ backgroundColor: service.iconColor || '#e0e7ff' }}
                >
                  <DynamicIcon name={service.icon} size={22} />
                </span>
                <h3 className="mb-1.5 font-display text-lg font-bold text-brand">{service.title}</h3>
                <p className="text-sm leading-relaxed text-ink/60">{service.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── BRANCHES ─────────────────────────────────────────────────────────────────
function BranchesSection() {
  const fetcher = useCallback(() => fetchBranches(), []);
  const { data: branches } = useSanityData(fetcher, branchesData);

  if (!branches || branches.length === 0) return null;

  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Our network"
          title="Expanding Horizons"
          subtitle="Bringing quality education to more communities."
          accent="coral"
          className="mb-12 md:mb-16"
        />

        <div className="space-y-16 md:space-y-20">
          {branches.map((branch, index) => {
            const flipped = index % 2 === 1;
            return (
              <Reveal key={branch.id}>
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
                  <div className={flipped ? 'lg:order-2' : ''}>
                    <Polaroid
                      src={branch.image || NO_IMAGE}
                      alt={branch.name}
                      imgClassName="aspect-video"
                      caption={branch.location}
                      tape
                      tapeColor={flipped ? 'bg-coral/70' : 'bg-sun/80'}
                      className={flipped ? 'rotate-[1.25deg]' : 'rotate-[-1.25deg]'}
                    />
                  </div>
                  <div className={flipped ? 'lg:order-1' : ''}>
                    <p className="mb-2 inline-flex items-center gap-1.5 font-hand text-2xl text-coral-deep">
                      <MapPin size={18} className="text-sun-deep" />
                      {branch.location}
                    </p>
                    <h3 className="font-display text-2xl font-bold text-brand md:text-3xl">{branch.name}</h3>
                    <p className="mt-4 leading-relaxed text-ink/65">{branch.description}</p>
                    {branch.features?.length > 0 && (
                      <div className="mt-6">
                        <h4 className="mb-3 font-display font-bold text-ink">Campus Highlights</h4>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                          {branch.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2.5">
                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-leaf/15 text-leaf">
                                <Check size={12} strokeWidth={3.5} />
                              </span>
                              <span className="text-sm font-semibold text-ink/70">{feature}</span>
                            </div>
                          ))}
                        </div>
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
    <section className="bg-paper px-4 pb-4 sm:px-6">
      <Reveal variant="pop">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border-2 border-ink bg-sun shadow-sticker">
          <div className="absolute inset-0 bg-dots opacity-30" aria-hidden="true" />
          <DoodleSun className="absolute -right-8 -top-8 h-28 w-28 text-white/50 animate-spin-slow" />
          <DoodleStar className="absolute bottom-8 left-8 h-7 w-7 text-coral animate-float" />

          <div className="relative mx-auto max-w-2xl px-6 py-14 text-center md:py-16">
            <p className="mb-1 font-hand text-2xl text-coral-deep md:text-3xl">Ready to join us?</p>
            <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">Join Our Community</h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-ink/70">
              Be part of a legacy that values integrity, innovation, and inclusivity. Discover what makes
              Makko Billi School the perfect place for your child's future.
            </p>
            <Link
              to="/contact"
              className="btn-press mt-8 inline-flex items-center gap-2 rounded-2xl border-2 border-ink bg-brand px-7 py-3.5 font-display font-bold text-white shadow-sticker"
            >
              Apply for Admission
              <ArrowRight size={18} />
            </Link>
          </div>
          <Scallop className="relative h-4 text-paper md:h-5" />
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
        title={pageData?.hero?.title || 'About Us'}
        subtitle={pageData?.hero?.subtitle}
        images={pageData?.hero?.images}
        accent="sun"
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
