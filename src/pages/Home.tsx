import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Apple, PlayCircle, Globe, Calendar, Bell } from 'lucide-react';
import { toast } from 'sonner';
import HeroSlideshow from '@/components/HeroSlideshow';
import DynamicIcon from '@/components/DynamicIcon';
import { homePageData as mockHomePageData, socialPostsData } from '@/data/mockData';
import { useSanityData, useSanityArrayData } from '@/hooks/useSanityData';
import { fetchHomePageData, fetchStudentPortalApp, fetchSocialPosts } from '@/services/sanity';
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

// Floating Shape Component
function FloatingShape({
  color,
  size,
  top,
  left,
  delay = 0,
  shape = 'circle'
}: {
  color: string;
  size: number;
  top: string;
  left: string;
  delay?: number;
  shape?: 'circle' | 'square' | 'triangle';
}) {
  const shapeClass = shape === 'circle' ? 'rounded-full' : shape === 'square' ? 'rounded-lg' : '';

  return (
    <div
      className={`absolute ${shapeClass} opacity-20 animate-pulse`}
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        top,
        left,
        animationDelay: `${delay}s`,
        animationDuration: '4s'
      }}
    />
  );
}

// Student Portal App Section
function StudentPortalAppSection() {
  const portalFetcher = useCallback(() => fetchStudentPortalApp(), []);
  const { data: studentPortalApp } = useSanityData(portalFetcher, mockHomePageData.studentPortalApp);
  const [activeFeature, setActiveFeature] = useState(0);

  // Safeguard in case Sanity data shape is unexpected
  if (!studentPortalApp) return null;

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-school-brand via-school-brand to-school-dark-blue relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingShape color="#fed250" size={120} top="10%" left="5%" delay={0} />
        <FloatingShape color="#f179aa" size={80} top="60%" left="85%" delay={1} />
        <FloatingShape color="#fed250" size={60} top="80%" left="15%" delay={2} />
        <FloatingShape color="#ffffff" size={40} top="20%" left="90%" delay={1.5} />
        {/* Abstract Waves */}
        <svg className="absolute bottom-0 left-0 w-full opacity-10" viewBox="0 0 1440 320">
          <path fill="#fed250" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-school-yellow text-school-brand text-sm font-bold rounded-full mb-6">
              <span className="w-2 h-2 bg-school-brand rounded-full animate-pulse" />
              {studentPortalApp.badge}
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {studentPortalApp.title}
            </h2>
            <p className="text-school-yellow text-xl font-medium mb-4">
              {studentPortalApp.subtitle}
            </p>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              {studentPortalApp.description}
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {studentPortalApp.features.map((feature: any, index: number) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${activeFeature === index
                    ? 'bg-white/20'
                    : 'bg-white/5 hover:bg-white/10'
                    }`}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className="w-10 h-10 bg-school-yellow rounded-lg flex items-center justify-center flex-shrink-0">
                    <DynamicIcon name={feature.icon} size={20} className="text-school-brand" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{feature.title}</p>
                    <p className="text-white/60 text-xs">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => toast.info('Coming Soon', { description: 'The App Store version will be available soon.' })}
                className="flex items-center gap-2 px-5 py-3 bg-white text-school-brand rounded-xl font-semibold hover:bg-school-yellow transition-colors cursor-pointer"
              >
                <Apple size={20} />
                App Store
              </button>
              <button
                type="button"
                onClick={() => toast.info('Coming Soon', { description: 'The Play Store version will be available soon.' })}
                className="flex items-center gap-2 px-5 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors border border-white/30 cursor-pointer"
              >
                <PlayCircle size={20} />
                Play Store
              </button>
              <a
                href={studentPortalApp.downloadLinks?.webPortal && studentPortalApp.downloadLinks.webPortal !== '#' ? studentPortalApp.downloadLinks.webPortal : 'https://portal.makkobillischool.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-school-yellow text-school-brand rounded-xl font-semibold hover:bg-white transition-colors"
              >
                <Globe size={20} />
                Web Portal
              </a>
            </div>
          </AnimatedSection>

          {/* App Image */}
          <AnimatedSection delay={200}>
            <div className="relative">
              {/* Decorative Ring */}
              <div className="absolute inset-0 bg-school-yellow/20 rounded-full blur-3xl transform scale-110" />
              <div className="relative bg-white rounded-3xl p-4 shadow-2xl">
                <img
                  src="https://cdn.sanity.io/images/yqwhfc1k/production/8508996403a729ae03430e7460e4a899b40d2c11-1181x768.png"
                  alt="Student Portal App"
                  className="w-full rounded-2xl"
                />
                {/* Floating Feature Cards */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Calendar size={16} className="text-green-600" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">95% Attendance</span>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-school-yellow rounded-full flex items-center justify-center">
                      <Bell size={16} className="text-school-brand" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">3 New Alerts</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// Latest Updates Section
function LatestUpdates({ latestUpdates }: { latestUpdates?: typeof mockHomePageData.latestUpdates }) {
  const [visibleCount, setVisibleCount] = useState(3);
  const postsFetcher = useCallback(() => fetchSocialPosts(), []);
  const { data: posts, loading: postsLoading } = useSanityArrayData(postsFetcher, socialPostsData);

  const sectionTitle = latestUpdates?.title || 'Latest Posts';
  const buttonText = latestUpdates?.buttonText || 'Load More';

  if (!postsLoading && (!posts || posts.length === 0)) return null;
  if (postsLoading && (!posts || posts.length === 0)) return null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-school-brand mb-4">
            {sectionTitle}
          </h2>
          <div className="w-20 h-1 bg-school-yellow mx-auto rounded-full" />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, visibleCount).map((post: any, index: number) => (
            <AnimatedSection key={post.id || index} delay={index * 150}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover border border-gray-100">
                {post.images && post.images.length > 0 && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.images[0]}
                      alt="Post"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-school-brand/10 text-school-brand text-xs font-semibold rounded-full">
                      {post.platform === 'manual' ? 'Announcement' : post.platform}
                    </span>
                    {post.date && (
                      <span className="text-gray-400 text-xs">
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-3">{post.content}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {visibleCount < posts.length && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleCount(prev => prev + 3)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-school-brand text-white rounded-full font-semibold hover:bg-school-dark-blue transition-colors"
            >
              {buttonText}
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// Grand Opening Section - Improved Design
function GrandOpening({ grandOpening }: { grandOpening: typeof mockHomePageData.grandOpening }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === grandOpening.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? grandOpening.images.length - 1 : prev - 1
    );
  };

  return (
    <section className="py-20 md:py-28 bg-gray-50 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Circle */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-school-yellow/10 rounded-full" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-school-pink/10 rounded-full" />
        {/* Small Decorative Shapes */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-school-yellow rounded-full animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute top-40 right-20 w-6 h-6 bg-school-pink/40 rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-school-brand/30 rounded-full animate-bounce" style={{ animationDuration: '2.5s' }} />
        {/* Abstract Lines */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,50 Q25,30 50,50 T100,50" stroke="#2d4289" strokeWidth="0.5" fill="none" />
          <path d="M0,60 Q25,40 50,60 T100,60" stroke="#f179aa" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-school-pink/20 text-school-pink text-sm font-bold rounded-full mb-6">
            <span className="w-2 h-2 bg-school-pink rounded-full animate-pulse" />
            {grandOpening.badge}
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-school-brand mb-3">
            {grandOpening.title}
          </h2>
          <p className="text-2xl text-gray-700 font-medium">{grandOpening.subtitle}</p>
          <p className="text-school-pink font-semibold mt-2">{grandOpening.description}</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image Carousel */}
          <AnimatedSection delay={150}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3]">
                {grandOpening.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Campus ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${index === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                      }`}
                  />
                ))}
              </div>
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

              {grandOpening.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-school-brand hover:bg-school-yellow transition-colors shadow-lg"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-school-brand hover:bg-school-yellow transition-colors shadow-lg"
                  >
                    <ChevronRight size={24} />
                  </button>
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {grandOpening.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-2 rounded-full transition-all ${index === currentImageIndex
                          ? 'bg-school-yellow w-8'
                          : 'bg-white/70 w-2 hover:bg-white'
                          }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </AnimatedSection>

          {/* Features - Clean inline layout */}
          <div className="space-y-6">
            {grandOpening.features.map((feature, index) => (
              <AnimatedSection key={index} delay={250 + index * 120}>
                <div className="group flex gap-4 items-start py-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: feature.bgColor }}
                  >
                    <DynamicIcon name={feature.icon} size={24} className="text-white" />
                  </div>
                  <div>
                    <h3
                      className="font-display font-bold text-lg mb-1 transition-colors"
                      style={{ color: feature.bgColor }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Three Pillars Section
function ThreePillars({ pillars }: { pillars: typeof mockHomePageData.pillars }) {

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <AnimatedSection key={index} delay={index * 200}>
              <div
                className="text-center p-8 rounded-2xl h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                style={{ backgroundColor: pillar.bgColor }}
              >
                <div
                  className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                  style={{ backgroundColor: pillar.iconColor }}
                >
                  <DynamicIcon name={pillar.icon} size={32} className="text-white" />
                </div>
                <h3 className="font-display font-bold text-xl text-school-brand mb-3">
                  {pillar.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// About Snippet Section
function AboutSnippet({ aboutSection }: { aboutSection: typeof mockHomePageData.aboutSection }) {

  return (
    <section
      className="relative py-24 md:py-32 bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: aboutSection.backgroundImage
          ? `url(${aboutSection.backgroundImage})`
          : undefined
      }}
    >
      <div className="absolute inset-0 bg-school-brand/85" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-6 font-bold">
            {aboutSection.title}
          </h2>
          <p className="text-white/90 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            {aboutSection.content}
          </p>
          {aboutSection.buttonText && aboutSection.buttonLink && (
            <Link
              to={aboutSection.buttonLink}
              className="inline-flex items-center gap-2 px-8 py-3 bg-school-yellow text-school-brand rounded-full font-bold hover:bg-white transition-colors shadow-lg"
            >
              {aboutSection.buttonText}
              <ArrowRight size={18} />
            </Link>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}

// Main Home Page
export default function Home() {
  const homeFetcher = useCallback(
    () => fetchHomePageData(),
    []
  );
  const { data: homePageData } = useSanityData(homeFetcher, mockHomePageData);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSlideshow
        images={homePageData?.hero?.images}
        title={homePageData?.hero?.title}
        subtitle={homePageData?.hero?.subtitle}
        overlayColor={homePageData?.hero?.overlayColor}
      >
        {homePageData?.hero?.buttonText && homePageData?.hero?.buttonLink && (
          <Link
            to={homePageData.hero.buttonLink}
            className="inline-flex items-center gap-2 px-8 py-4 bg-school-yellow text-school-brand rounded-full font-bold text-lg hover:bg-white transition-colors shadow-lg"
          >
            {homePageData.hero.buttonText}
            <ArrowRight size={20} />
          </Link>
        )}
      </HeroSlideshow>

      {/* Latest Updates / Social Posts */}
      <LatestUpdates latestUpdates={homePageData?.latestUpdates} />

      {/* Student Portal App Section - NEW */}
      <StudentPortalAppSection />

      {/* Grand Opening Section */}
      {homePageData?.grandOpening && (
        <GrandOpening grandOpening={homePageData.grandOpening} />
      )}

      {/* Three Pillars Section */}
      {homePageData?.pillars && homePageData.pillars.length > 0 && (
        <ThreePillars pillars={homePageData.pillars} />
      )}

      {/* About Snippet Section */}
      {homePageData?.aboutSection && (
        <AboutSnippet aboutSection={homePageData.aboutSection} />
      )}
    </div>
  );
}
