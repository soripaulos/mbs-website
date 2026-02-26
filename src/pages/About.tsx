import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ChevronLeft, ChevronRight, X } from 'lucide-react';
import HeroSlideshow from '@/components/HeroSlideshow';
import DynamicIcon from '@/components/DynamicIcon';
import {
  aboutPageData,
  statsData,
  facilitiesData,
  academicLevelsData,
  servicesData,
  branchesData
} from '@/data/mockData';
import { useSanityData } from '@/hooks/useSanityData';
import {
  fetchAboutPageData,
  fetchStats,
  fetchFacilities,
  fetchAcademicLevels,
  fetchServices,
  fetchBranches
} from '@/services/sanity';
import { useCallback } from 'react';

// Animation hook with reduced frequency
function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.disconnect();
      }
    }, { threshold: 0.15, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return { ref, isIntersecting };
}

// Animated Section Component
function AnimatedSection({
  children,
  className = '',
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isIntersecting } = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${isIntersecting
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-10'
        }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// Stats Section
function StatsSection() {
  const fetcher = useCallback(() => fetchStats(), []);
  const { data: stats } = useSanityData(fetcher, statsData);
  const [counters, setCounters] = useState<number[]>([]);
  const { ref, isIntersecting } = useIntersectionObserver();

  useEffect(() => {
    if (!isIntersecting || stats.length === 0) return;

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounters(stats.map(stat => Math.floor(stat.value * easeOut)));

      if (step >= steps) {
        clearInterval(timer);
        setCounters(stats.map(stat => stat.value));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isIntersecting, stats]);

  if (stats.length === 0) return null;

  return (
    <div ref={ref} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div key={stat.id} className="text-center">
              <div className="font-display text-4xl md:text-5xl font-bold text-school-brand mb-2">
                {counters[index] !== undefined ? counters[index] : stat.value}
                <span className="text-school-yellow">{stat.suffix}</span>
              </div>
              <div className="text-gray-500 text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Intro Section
function IntroSection({ intro }: { intro: typeof aboutPageData.intro }) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <span className="inline-block px-4 py-1 bg-school-brand/10 text-school-brand text-sm font-bold rounded-full mb-4">
            ABOUT US
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-school-brand mb-8">
            {intro?.title || ''}
          </h2>
        </AnimatedSection>
        <div className="space-y-4">
          {intro?.content?.map((paragraph, index) => (
            <AnimatedSection key={index} delay={150 + index * 150}>
              <p className="text-gray-600 leading-relaxed">{paragraph}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// Academics Section - Moved above Facilities with Image Slider
function AcademicsSection() {
  const academicsRef = useRef<HTMLDivElement>(null);
  const fetcher = useCallback(() => fetchAcademicLevels(), []);
  const { data: academicLevels } = useSanityData(fetcher, academicLevelsData);
  const [activeLevel, setActiveLevel] = useState<string>(academicLevels[0]?.id || '');

  useEffect(() => {
    if (academicLevels?.length > 0 && !academicLevels.find(l => l.id === activeLevel)) {
      setActiveLevel(academicLevels[0].id);
    }
  }, [academicLevels, activeLevel]);

  // Scroll to expanded content when active level changes
  const handleLevelClick = (id: string) => {
    setActiveLevel(id);

    // Use a small timeout to allow React to render the expanded view and transitions to start
    setTimeout(() => {
      const element = document.getElementById('active-pathway-content');
      if (element) {
        const offset = 100; // Account for fixed header
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  if (!academicLevels || academicLevels.length === 0) return null;

  const activeData = academicLevels.find(l => l.id === activeLevel) || academicLevels[0];

  const renderActiveContent = () => {
    if (!activeData) return null;
    return (
      <div id="active-pathway-content" className="bg-white rounded-[2rem] shadow-sm p-6 md:p-10 border border-gray-100 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Left: Description & Director */}
          <AnimatedSection delay={200}>
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-8 bg-school-yellow rounded-full"></div>
                <h3 className="font-display text-3xl font-bold text-school-brand">
                  {activeData.level} Overview
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">{activeData.extendedDescription}</p>

              {activeData.director && (
                <div className="bg-[#f4f7fb] rounded-2xl p-6">
                  <p className="text-[10px] font-bold text-school-pink uppercase tracking-widest mb-3">{activeData.director.role}</p>
                  <div className="flex items-start gap-4">
                    {activeData.director.image && (
                      <img
                        src={activeData.director.image}
                        alt={activeData.director.name}
                        className="w-16 h-16 rounded-full object-cover shadow-sm bg-white"
                        loading="lazy"
                      />
                    )}
                    <div>
                      <p className="font-bold text-school-brand text-lg">{activeData.director.name}</p>
                      {activeData.director.message && (
                        <p className="text-sm text-gray-500 mt-2 italic flex">
                          <span className="text-2xl leading-none text-gray-300 mr-1 opacity-50 font-serif">"</span>
                          {activeData.director.message}
                          <span className="text-2xl leading-none text-gray-300 ml-1 opacity-50 font-serif">"</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div>
                <div className="flex flex-wrap gap-3">
                  {activeData.features.map((feature: string, idx: number) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-700 border border-gray-200"
                    >
                      <div className="w-4 h-4 rounded-full border border-school-brand flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-school-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Uniform Bento Gallery */}
          <AnimatedSection delay={300}>
            <div className="space-y-4">
              <h4 className="font-display font-bold text-school-brand text-xl lg:hidden mb-4">Life in {activeData.level}</h4>
              <h4 className="font-display font-bold text-school-brand text-xl hidden lg:block mb-6">Life in {activeData.level}</h4>

              {(() => {
                const allImages = activeData.gallery?.length > 0
                  ? activeData.gallery
                  : activeData.mainImage ? [activeData.mainImage] : [];

                if (allImages.length === 0) return null;

                return (
                  <div className="grid grid-cols-2 gap-3 md:gap-4 auto-rows-[120px] md:auto-rows-[140px]">
                    {/* Map up to 5 images into standard 1x1 grid slots */}
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-2xl overflow-hidden shadow-sm bg-gray-100 ${!allImages[i] ? 'hidden md:block opacity-50' : ''}`}
                      >
                        {allImages[i] ? (
                          <img src={allImages[i]} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <span className="text-4xl text-gray-200 tracking-widest leading-none">...</span>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* 6th Slot: Explore tile */}
                    <Link
                      to="/gallery"
                      className="rounded-2xl bg-[#2d3a77] flex flex-col items-center justify-center text-white hover:bg-school-brand transition-colors shadow-sm"
                    >
                      <span className="font-display font-bold text-xl mb-1">Explore</span>
                      <span className="text-white/80 text-sm">See full gallery</span>
                    </Link>
                  </div>
                );
              })()}
            </div>
          </AnimatedSection>

        </div>
      </div>
    );
  };

  return (
    <section ref={academicsRef} className="py-16 md:py-24 bg-gray-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-school-pink/20 text-school-pink text-sm font-bold rounded-full mb-4">
            ACADEMICS
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-school-brand mb-2">
            Learning Pathways
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Click on each level to explore our curriculum, meet the directors, and see our students in action.
          </p>
        </AnimatedSection>

        {/* Level Cards */}
        <AnimatedSection delay={150} className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {academicLevels.map((level) => {
              const isActive = activeLevel === level.id;
              return (
                <div key={level.id} className="relative flex flex-col">
                  {/* Card Header */}
                  <div
                    onClick={() => handleLevelClick(level.id)}
                    className={`relative cursor-pointer rounded-2xl overflow-hidden bg-white shadow-sm transition-all duration-300 transform md:hover:-translate-y-1 ${isActive ? 'ring-2 ring-school-yellow ring-offset-2' : 'border border-gray-100 hover:shadow-md'
                      }`}
                  >
                    {/* Top Image */}
                    <div className="h-48 w-full overflow-hidden">
                      <img
                        src={level.mainImage || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80'}
                        alt={level.level}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    {/* Chevron over edge for active state */}
                    {isActive && (
                      <div className="absolute left-1/2 -ml-4 top-44 w-8 h-8 bg-school-yellow rounded-full flex items-center justify-center text-white shadow-md z-10 transition-transform">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </div>
                    )}

                    {/* Bottom Content */}
                    <div className="p-6 text-center">
                      <h3 className="font-display font-bold text-xl text-school-brand mb-2">{level.level}</h3>
                      <p className="text-gray-500 text-sm line-clamp-2">{level.description}</p>
                    </div>
                  </div>

                  {/* Mobile expanded view injected right under the card */}
                  <div className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${isActive ? 'max-h-[3000px] opacity-100 mt-6 mb-8' : 'max-h-0 opacity-0'}`}>
                    {isActive && renderActiveContent()}
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Desktop Active Level Content container (hidden on mobile) */}
        <div className="hidden md:block max-w-6xl mx-auto">
          {renderActiveContent()}
        </div>

      </div>
    </section>
  );
}

// Facility Gallery Modal
function FacilityGalleryModal({
  facility,
  onClose
}: {
  facility: any;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const allImages = [facility.mainImage, ...facility.gallery].filter(Boolean);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
      >
        <X size={24} />
      </button>

      <div className="max-w-4xl w-full">
        <div className="relative aspect-video rounded-xl overflow-hidden">
          <img
            src={allImages[currentIndex]}
            alt={facility.title}
            className="w-full h-full object-cover"
          />

          {allImages.length > 1 && (
            <>
              <button
                onClick={() => setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-school-brand hover:bg-white transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setCurrentIndex((prev) => (prev + 1) % allImages.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-school-brand hover:bg-white transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        <div className="mt-4 text-center">
          <h3 className="text-white font-bold text-xl">{facility.title}</h3>
          <p className="text-white/70 mt-1">{facility.description}</p>
          <p className="text-white/50 text-sm mt-2">{currentIndex + 1} / {allImages.length}</p>
        </div>

        {/* Thumbnails */}
        {allImages.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${idx === currentIndex ? 'border-school-yellow' : 'border-transparent opacity-60'
                  }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Facilities Section - Now with expandable gallery
function FacilitiesSection() {
  const fetcher = useCallback(() => fetchFacilities(), []);
  const { data: facilities } = useSanityData(fetcher, facilitiesData);
  const [selectedFacility, setSelectedFacility] = useState<any | null>(null);

  if (!facilities || facilities.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-school-yellow/20 text-school-brand text-sm font-bold rounded-full mb-4">
            CAMPUS INFRASTRUCTURE
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-school-brand mb-2">
            World-Class Facilities
          </h2>
          <p className="text-gray-500">Click any facility to view more photos.</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility, index) => (
            <AnimatedSection
              key={facility.id}
              delay={index * 100}
              className={facility.colSpan === 2 ? 'md:col-span-2' : ''}
            >
              <div
                onClick={() => setSelectedFacility(facility)}
                className="group relative rounded-2xl overflow-hidden shadow-lg card-hover cursor-pointer"
              >
                <div className={`${facility.colSpan === 2 ? 'aspect-[2/1]' : 'aspect-square'}`}>
                  <img
                    src={facility.mainImage}
                    alt={facility.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <DynamicIcon name={facility.icon} size={20} className="text-school-yellow" />
                    <h3 className="font-display font-bold text-xl text-white">
                      {facility.title}
                    </h3>
                  </div>
                  <p className="text-white/80 text-sm">{facility.description}</p>
                  {facility.gallery?.length > 0 && (
                    <p className="text-school-yellow text-xs mt-2 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-school-yellow rounded-full" />
                      {facility.gallery.length + 1} photos
                    </p>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Gallery Modal */}
      {selectedFacility && (
        <FacilityGalleryModal
          facility={selectedFacility}
          onClose={() => setSelectedFacility(null)}
        />
      )}
    </section>
  );
}

// Services Section
function ServicesSection() {
  const fetcher = useCallback(() => fetchServices(), []);
  const { data: services } = useSanityData(fetcher, servicesData);

  if (!services || services.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-school-brand mb-2">
            Beyond the Classroom
          </h2>
          <p className="text-gray-500">
            Integrated technology and holistic support for a thriving student life.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <AnimatedSection key={service.id} delay={index * 100}>
              <div className="bg-white rounded-xl p-6 shadow-md card-hover h-full">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: service.iconColor || '#e0e7ff' }}
                >
                  <DynamicIcon
                    name={service.icon}
                    size={24}
                    className="text-school-brand"
                  />
                </div>
                <h3
                  className="font-display font-bold text-lg mb-2"
                  style={{ color: service.iconColor || '#2d4289' }}
                >
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// Branches Section
function BranchesSection() {
  const fetcher = useCallback(() => fetchBranches(), []);
  const { data: branches } = useSanityData(fetcher, branchesData);

  if (!branches || branches.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-school-brand/10 text-school-brand text-sm font-bold rounded-full mb-4">
            OUR NETWORK
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-school-brand mb-2">
            Expanding Horizons
          </h2>
          <p className="text-gray-500">Bringing quality education to more communities.</p>
        </AnimatedSection>

        <div className="space-y-12">
          {branches.map((branch, index) => (
            <AnimatedSection key={branch.id} delay={index * 200}>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}>
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={branch.image}
                      alt={branch.name}
                      className="w-full aspect-video object-cover"
                    />
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin size={18} className="text-school-yellow" />
                    <span className="text-school-pink font-bold text-sm uppercase tracking-wider">
                      {branch.location}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-school-brand mb-4">
                    {branch.name}
                  </h3>
                  <p className="text-gray-600 mb-6">{branch.description}</p>
                  <div>
                    <h4 className="font-bold text-school-brand mb-3">Campus Highlights</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {branch.features?.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-school-yellow rounded-full" />
                          <span className="text-gray-600 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-school-brand">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Join Our Community
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Be part of a legacy that values integrity, innovation, and inclusivity.
            Discover what makes Makko Billi School the perfect place for your child's future.
          </p>
          <button className="px-8 py-3 bg-school-yellow text-school-brand rounded-full font-bold hover:bg-white transition-colors shadow-lg">
            Apply for Admission
          </button>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Main About Page
export default function About() {
  const aboutFetcher = useCallback(
    () => fetchAboutPageData(),
    []
  );
  const { data: pageData } = useSanityData(aboutFetcher, aboutPageData);

  return (
    <div className="min-h-screen">
      <HeroSlideshow
        images={pageData?.hero?.images}
        title={pageData?.hero?.title}
        subtitle={pageData?.hero?.subtitle}
        overlayColor={pageData?.hero?.overlayColor}
      />
      {pageData?.intro && <IntroSection intro={pageData.intro} />}
      <StatsSection />
      {/* Learning Pathways moved above Facilities */}
      <AcademicsSection />
      <FacilitiesSection />
      <ServicesSection />
      <BranchesSection />
      <CTASection />
    </div>
  );
}
