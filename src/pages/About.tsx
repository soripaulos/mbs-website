import { useState, useEffect, useRef } from 'react';
import { MapPin, Check, ChevronLeft, ChevronRight, X, Lightbulb, Heart, Palette, Calculator, BookOpen, Users, Globe } from 'lucide-react';
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

// Feature Icon Component - Unique and Customizable
function FeatureIcon({ icon, color }: { icon: string; color: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    'Play-based learning': <Lightbulb size={16} />,
    'Social development': <Heart size={16} />,
    'Basic numeracy & literacy': <Calculator size={16} />,
    'Creative arts': <Palette size={16} />,
    'Core curriculum': <BookOpen size={16} />,
    'Critical thinking': <Lightbulb size={16} />,
    'Character education': <Heart size={16} />,
    'Extracurricular activities': <Users size={16} />,
    'Advanced subjects': <BookOpen size={16} />,
    'College preparation': <Globe size={16} />,
    'Leadership programs': <Users size={16} />,
    'Career guidance': <Lightbulb size={16} />,
  };

  return (
    <div
      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor: color }}
    >
      <span className="text-white">{iconMap[icon] || <Check size={14} />}</span>
    </div>
  );
}

// Image Slider Component
function ImageSlider({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length <= 1) {
    return images.length === 1 ? (
      <img src={images[0]} alt="Gallery" className="w-full h-full object-cover rounded-2xl" />
    ) : null;
  }

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
        />
      ))}
      <button
        onClick={prevImage}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-school-brand hover:bg-white transition-colors"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-school-brand hover:bg-white transition-colors"
      >
        <ChevronRight size={18} />
      </button>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-school-yellow w-4' : 'bg-white/70'
              }`}
          />
        ))}
      </div>
    </div>
  );
}

// Academics Section - Moved above Facilities with Image Slider
function AcademicsSection() {
  const fetcher = useCallback(() => fetchAcademicLevels(), []);
  const { data: academicLevels } = useSanityData(fetcher, academicLevelsData);
  const [activeLevel, setActiveLevel] = useState<string>(academicLevels[0]?.id || '');

  useEffect(() => {
    if (academicLevels?.length > 0 && !academicLevels.find(l => l.id === activeLevel)) {
      setActiveLevel(academicLevels[0].id);
    }
  }, [academicLevels, activeLevel]);

  if (!academicLevels || academicLevels.length === 0) return null;

  const activeData = academicLevels.find(l => l.id === activeLevel) || academicLevels[0];

  // Feature colors for each level
  const featureColors: Record<string, string> = {
    kg: '#f179aa',
    primary: '#2d4289',
    secondary: '#fed250'
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
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

        {/* Level Tabs */}
        <AnimatedSection delay={150} className="mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            {academicLevels.map((level) => (
              <button
                key={level.id}
                onClick={() => setActiveLevel(level.id)}
                className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${activeLevel === level.id
                  ? 'bg-school-brand text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
                  }`}
              >
                {level.level}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Active Level Content */}
        {activeData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatedSection delay={200}>
              <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                <ImageSlider images={activeData.gallery?.length > 0 ? activeData.gallery : ((activeData as any).image ? [(activeData as any).image] : (activeData.mainImage ? [activeData.mainImage] : []))} />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-2xl font-bold text-school-brand mb-2">
                    {activeData.level} Overview
                  </h3>
                  <p className="text-gray-600">{activeData.extendedDescription}</p>
                </div>

                {activeData.director && (
                  <div className="bg-school-brand/5 rounded-xl p-4 border-l-4 border-school-brand">
                    <div className="flex items-center gap-4">
                      {activeData.director.image && (
                        <img
                          src={activeData.director.image}
                          alt={activeData.director.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-school-yellow"
                        />
                      )}
                      <div>
                        <p className="font-bold text-school-brand">{activeData.director.name}</p>
                        <p className="text-sm text-gray-500">{activeData.director.role}</p>
                        {activeData.director.message && (
                          <p className="text-sm text-gray-600 mt-1 italic">"{activeData.director.message}"</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-bold text-school-brand mb-3">Key Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeData.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full text-sm shadow-sm"
                      >
                        <FeatureIcon icon={feature} color={featureColors[activeData.id] || '#2d4289'} />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        )}
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
        images={pageData.hero.images}
        title={pageData.hero.title}
        subtitle={pageData.hero.subtitle}
        overlayColor={pageData.hero.overlayColor}
      />
      <IntroSection intro={pageData.intro} />
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
