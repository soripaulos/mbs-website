import React, { useEffect, useState } from 'react';
import { fetchHomePageData } from '../services/sanity';
import { HomePageData } from '../types';
import { BookOpen, Users, Lightbulb, ChevronRight, Star, MapPin, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import FacebookPosts from '../components/FacebookPosts';

const Home: React.FC = () => {
  // Page data from Sanity
  const [pageData, setPageData] = useState<HomePageData | null>(null);

  // Hero carousel
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

  // Grand Opening carousel
  const [grandOpeningIndex, setGrandOpeningIndex] = useState(0);

  // ============ FALLBACK DATA ============
  const fallbackHeroImages = [
    "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1427504742925-087e6b2dd71e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ];

  const fallbackGrandOpeningImages = [
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  ];

  const fallbackFeatures = [
    { icon: 'MapPin', bg: "bg-school-dark-blue", title: "Prime Location", desc: "Located in the heart of Dembi Dollo, bringing world-class education closer to the West Welega community." },
    { icon: 'Star', bg: "bg-school-yellow", title: "Modern Infrastructure", desc: "State-of-the-art laboratories, smart classrooms, and extensive sports facilities designed for holistic development." },
    { icon: 'BookOpen', bg: "bg-school-pink", title: "Comprehensive Curriculum", desc: "Offering KG to Grade 8 education with a focus on academic excellence, character building, and digital literacy." }
  ];

  const fallbackPillars = [
    { icon: 'Lightbulb', bg: "bg-blue-100", iconColor: "text-school-dark-blue", title: "Quality Education", desc: "Nurturing curious minds with rigorous academics, innovative teaching, and a passion for lifelong learning." },
    { icon: 'Users', bg: "bg-yellow-100", iconColor: "text-school-yellow", title: "Character Building", desc: "Instilling values, empathy, and integrity to shape compassionate and responsible global citizens." },
    { icon: 'BookOpen', bg: "bg-pink-100", iconColor: "text-school-pink", title: "Skill Development", desc: "Equipping students with practical skills, critical thinking, and adaptability for a dynamic world." }
  ];

  // ============ DERIVED DATA ============
  const heroImages = pageData?.hero?.carouselImages?.length ? pageData.hero.carouselImages : fallbackHeroImages;
  const heroTitle = pageData?.hero?.title || '15 Years of Fellowship at Makko Billi';
  const heroSubtitle = pageData?.hero?.subtitle || '"Our first batch of graduates who stayed with our school since nursery"';
  const heroButtonText = pageData?.hero?.buttonText || 'Discover Our Story';
  const heroButtonLink = pageData?.hero?.buttonLink || '/about';

  const grandOpeningImages = pageData?.grandOpening?.carouselImages?.length ? pageData.grandOpening.carouselImages : fallbackGrandOpeningImages;
  const grandOpeningBadge = pageData?.grandOpening?.badge || 'New Campus';
  const grandOpeningTitle = pageData?.grandOpening?.title || 'Grand Opening';
  const grandOpeningSubtitle = pageData?.grandOpening?.subtitle || 'Makko Billi School Dembi Dollo';
  const grandOpeningDescription = pageData?.grandOpening?.description || 'KG and Elementary (KG-Grade 8)';
  const grandOpeningFeatures = pageData?.grandOpening?.features?.length ? pageData.grandOpening.features : fallbackFeatures;

  const pillars = pageData?.pillars?.length ? pageData.pillars : fallbackPillars;
  const aboutTitle = pageData?.aboutSection?.title || 'A Little About Us';
  const aboutContent = pageData?.aboutSection?.content || 'Makko Billi School, a private institution founded in July 2009 in Adama, Ethiopia, takes its name from a visionary leader of the Macha Oromos during the 16th century. The school boasts exceptional facilities, including modern classrooms, a fully equipped library, and advanced laboratories.';
  const aboutBgImage = pageData?.aboutSection?.backgroundImage || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80';
  const aboutButtonText = pageData?.aboutSection?.buttonText || 'Read More';
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

  // ============ ICON HELPER ============
  const getIcon = (iconName: string, className?: string) => {
    switch (iconName) {
      case 'MapPin': return <MapPin className={className || "w-6 h-6 text-white"} />;
      case 'Star': return <Star className={className || "w-6 h-6 text-white"} />;
      case 'BookOpen': return <BookOpen className={className || "w-6 h-6 text-white"} />;
      case 'Lightbulb': return <Lightbulb className={className || "w-10 h-10"} />;
      case 'Users': return <Users className={className || "w-10 h-10"} />;
      default: return <Star className={className || "w-6 h-6 text-white"} />;
    }
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
            <div className="absolute inset-0 bg-school-dark-blue/80 z-10" />
            <img
              src={img}
              alt="School Campus"
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 animate-fade-in-up">
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
          <p className="text-xl md:text-2xl text-school-yellow mb-10 font-display tracking-wide max-w-3xl font-medium">
            {heroSubtitle}
          </p>

          <Link
            to={heroButtonLink}
            className="bg-school-yellow text-school-dark-blue px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition-all transform hover:scale-105 shadow-lg"
          >
            {heroButtonText}
          </Link>
        </div>

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
                    <ChevronLeft className="w-6 h-6 text-school-dark-blue" />
                  </button>
                  <button
                    onClick={nextGrandOpeningImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="w-6 h-6 text-school-dark-blue" />
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
                    className={`w-12 h-12 rounded-lg ${item.bgColor || item.bg} flex items-center justify-center flex-shrink-0 shadow-md`}
                  >
                    {getIcon(item.icon)}
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
                className={`w-24 h-24 rounded-full ${item.bgColor || item.bg} flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300`}
              >
                <span className={item.iconColor}>{getIcon(item.icon, `w-10 h-10 ${item.iconColor}`)}</span>
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
        style={{
          backgroundImage: `linear-gradient(rgba(37, 55, 107, 0.85), rgba(37, 55, 107, 0.85)), url('${aboutBgImage}')`,
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
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
