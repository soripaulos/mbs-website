import React, { useEffect, useState } from 'react';
import { fetchHomePageData } from '../services/sanity';
import { HomePageData } from '../types';
import * as LucideIcons from 'lucide-react';
import { Link } from 'react-router-dom';
import FacebookPosts from '../components/FacebookPosts';

// Dynamic icon component - supports any Lucide icon by name
const DynamicIcon: React.FC<{ name: string; className?: string; style?: React.CSSProperties }> = ({ 
  name, 
  className = "w-6 h-6", 
  style 
}) => {
  const IconComponent = (LucideIcons as any)[name];
  if (IconComponent) {
    return <IconComponent className={className} style={style} />;
  }
  // Fallback to Star if icon not found
  return <LucideIcons.Star className={className} style={style} />;
};

const Home: React.FC = () => {
  // Page data from Sanity
  const [pageData, setPageData] = useState<HomePageData | null>(null);

  // Hero carousel
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

  // Grand Opening carousel
  const [grandOpeningIndex, setGrandOpeningIndex] = useState(0);

  // ============ DERIVED DATA ============
  const heroImages = pageData?.hero?.images || [];
  const heroOverlayColor = pageData?.hero?.overlayColorCSS || 'rgba(37, 55, 107, 0.8)';
  const heroTitle = pageData?.hero?.title || '';
  const heroSubtitle = pageData?.hero?.subtitle || '';
  const heroButtonText = pageData?.hero?.buttonText || '';
  const heroButtonLink = pageData?.hero?.buttonLink || '/about';

  const grandOpeningImages = pageData?.grandOpening?.images || [];
  const grandOpeningBadge = pageData?.grandOpening?.badge || '';
  const grandOpeningTitle = pageData?.grandOpening?.title || '';
  const grandOpeningSubtitle = pageData?.grandOpening?.subtitle || '';
  const grandOpeningDescription = pageData?.grandOpening?.description || '';
  const grandOpeningFeatures = pageData?.grandOpening?.features || [];

  const pillars = pageData?.pillars || [];
  const aboutTitle = pageData?.aboutSection?.title || '';
  const aboutContent = pageData?.aboutSection?.content || '';
  const aboutBgImage = pageData?.aboutSection?.backgroundImage || '';
  const aboutButtonText = pageData?.aboutSection?.buttonText || '';
  const latestUpdatesTitle = pageData?.latestUpdates?.title || 'Latest Updates';

  // ============ DATA LOADING ============
  useEffect(() => {
    const loadData = async () => {
      // Load Sanity page data
      try {
        const data = await fetchHomePageData();
        if (data) setPageData(data);
      } catch (err) {
        console.log('Failed to load home page data from Sanity');
      }
    };

    loadData();
  }, []);

  // ============ HERO CAROUSEL ============
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCarouselIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  // ============ GRAND OPENING CAROUSEL ============
  useEffect(() => {
    const timer = setInterval(() => {
      setGrandOpeningIndex((prev) => (prev + 1) % grandOpeningImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [grandOpeningImages.length]);

  const nextGrandOpeningImage = () => {
    setGrandOpeningIndex((prev) => (prev + 1) % grandOpeningImages.length);
  };

  const prevGrandOpeningImage = () => {
    setGrandOpeningIndex((prev) => (prev - 1 + grandOpeningImages.length) % grandOpeningImages.length);
  };

  // ============ RENDER ============
  return (
    <div className="w-full overflow-x-hidden bg-white">
      {/* ========== HERO SECTION ========== */}
      <div className="relative h-[90vh] w-full overflow-hidden">
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentCarouselIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div 
              className="absolute inset-0 z-10" 
              style={{ backgroundColor: heroOverlayColor }}
            />
            <img
              src={img}
              alt="School Campus"
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 animate-fade-in-up">
          {heroTitle && (
            <h1 className="text-5xl md:text-7xl font-hand text-white mb-4 drop-shadow-lg font-bold tracking-tight">
              {heroTitle.includes(' at ') ? (
                <>
                  {heroTitle.split(' at ')[0]}
                  <br />
                  {'at '}
                  {heroTitle.split(' at ')[1]}
                </>
              ) : (
                heroTitle
              )}
            </h1>
          )}
          {heroSubtitle && (
            <p className="text-xl md:text-2xl text-school-yellow mb-10 font-display tracking-wide max-w-3xl font-medium">
              {heroSubtitle}
            </p>
          )}

          {heroButtonText && (
            <Link
              to={heroButtonLink}
              className="bg-school-yellow text-school-dark-blue px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition-all transform hover:scale-105 shadow-lg"
            >
              {heroButtonText}
            </Link>
          )}
        </div>

        {/* Image indicators */}
        {heroImages.length > 1 && (
          <div className="absolute bottom-28 md:bottom-56 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentCarouselIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentCarouselIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Wave Curve */}
        <div className="absolute bottom-0 left-0 w-full z-30 leading-none">
          <svg className="w-full h-24 md:h-48 text-white" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="currentColor" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      <FacebookPosts title={latestUpdatesTitle} />

      {/* ========== GRAND OPENING SECTION ========== */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-white"></div>
          <div className="absolute top-0 right-0 w-2/3 h-full bg-[#FFFDF5] transform -skew-x-12 origin-bottom-right"></div>
        </div>

        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-school-yellow/20 rounded-full animate-blob"></div>
          <div className="absolute top-40 right-20 w-40 h-40 bg-school-pink/20 rounded-full animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-school-brand/10 rounded-full animate-blob animation-delay-4000"></div>
          <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-school-yellow/15 rounded-full animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block bg-school-pink text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider mb-4 uppercase">
              {grandOpeningBadge}
            </span>
            <h2 className="text-5xl font-hand text-school-dark-blue mb-2">{grandOpeningTitle}</h2>
            <h3 className="text-2xl font-display text-gray-700">{grandOpeningSubtitle}</h3>
            <p className="text-school-brand font-bold text-sm mt-2">{grandOpeningDescription}</p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Carousel Side */}
            <div className="flex-1 lg:flex-[1.4] w-full">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl p-2 bg-white/50 backdrop-blur group">
                <div className="relative h-[450px] rounded-xl overflow-hidden">
                  {grandOpeningImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Campus ${idx + 1}`}
                      loading="lazy"
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                        idx === grandOpeningIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}

                  <div className="absolute inset-0 bg-gradient-to-r from-school-brand/20 to-transparent pointer-events-none"></div>

                  <button
                    onClick={prevGrandOpeningImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <LucideIcons.ChevronLeft className="w-6 h-6 text-school-dark-blue" />
                  </button>
                  <button
                    onClick={nextGrandOpeningImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <LucideIcons.ChevronRight className="w-6 h-6 text-school-dark-blue" />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {grandOpeningImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setGrandOpeningIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === grandOpeningIndex ? 'bg-white w-8' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Features Side */}
            <div className="flex-1 space-y-8">
              {grandOpeningFeatures.map((item: any, idx: number) => (
                <div key={idx} className="flex gap-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md"
                    style={{ backgroundColor: item.bgColorCSS || item.bgColor || '#25376B' }}
                  >
                    <DynamicIcon name={item.icon} className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-school-dark-blue mb-1">{item.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description || item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== THREE PILLARS SECTION ========== */}
      <section className="py-16 px-4 bg-[#FFFDF5]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {pillars.map((item: any, idx: number) => (
            <div key={idx} className="flex flex-col items-center group">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300"
                style={{ backgroundColor: item.bgColorCSS || item.bgColor || '#dbeafe' }}
              >
                <DynamicIcon 
                  name={item.icon} 
                  className="w-10 h-10" 
                  style={{ color: item.iconColorCSS || item.iconColor || '#25376B' }}
                />
              </div>
              <h3 className="text-lg font-bold text-school-brand mb-3">{item.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed max-w-xs">{item.description || item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== ABOUT SNIPPET SECTION ========== */}
      <section
        className="py-24 px-4 bg-school-dark-blue text-white relative overflow-hidden bg-fixed bg-center bg-cover"
        style={
          aboutBgImage
            ? {
                backgroundImage: `linear-gradient(rgba(37, 55, 107, 0.85), rgba(37, 55, 107, 0.85)), url('${aboutBgImage}')`,
                backgroundAttachment: 'fixed',
              }
            : { backgroundColor: 'rgba(37,55,107,0.85)' }
        }
      >
        <div className="absolute inset-0 opacity-10"></div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-display font-bold mb-6">{aboutTitle}</h2>
          <p className="text-gray-300 text-sm leading-loose mb-10">{aboutContent}</p>
          <Link
            to="/about"
            className="inline-block bg-school-yellow text-school-dark-blue px-8 py-3 rounded-full font-bold hover:bg-white transition-all text-sm"
          >
            {aboutButtonText}
          </Link>
        </div>
      </section>

      {/* Lightbox is handled inside <FacebookPosts /> */}
    </div>
  );
};

export default Home;
