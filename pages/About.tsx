
import React, { useEffect, useState } from 'react';
import { fetchAboutPageData } from '../services/sanity';
import { fetchAboutPageData as fetchFallbackAboutData } from '../services/cms';
import { AboutPageData, Facility } from '../types';
import * as LucideIcons from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroSlideshow from '../components/HeroSlideshow';

// Dynamic icon component - supports any Lucide icon by name
const DynamicIcon: React.FC<{ name: string; className?: string; style?: React.CSSProperties }> = ({ 
  name, 
  className = "w-8 h-8", 
  style 
}) => {
  const IconComponent = (LucideIcons as any)[name];
  if (IconComponent) {
    return <IconComponent className={className} style={style} />;
  }
  // Fallback to Star if icon not found
  return <LucideIcons.Star className={className} style={style} />;
};

const About: React.FC = () => {
  const [data, setData] = useState<AboutPageData | null>(null);
  const [activeAcademic, setActiveAcademic] = useState<string>('kg');
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Try Sanity first
        const content = await fetchAboutPageData();
        if (content && content.stats && content.stats.length > 0) {
          setData(content);
          if (content.academics && content.academics.length > 0) {
            setActiveAcademic(content.academics[0].id);
          }
          return;
        }
      } catch (error) {
        console.log('Sanity fetch failed, using fallback data');
      }
      // Fallback to static CMS data
      const fallbackContent = await fetchFallbackAboutData();
      setData(fallbackContent);
      if (fallbackContent && fallbackContent.academics.length > 0) {
        setActiveAcademic(fallbackContent.academics[0].id);
      }
    };
    loadData();
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-school-brand"></div>
      </div>
    );
  }

  // Icon mapping for facilities - now supports any Lucide icon name
  const getIcon = (iconName: string, id?: string) => {
    // If icon name is provided from Sanity, use it
    if (iconName && iconName !== id) {
      return <DynamicIcon name={iconName} className="w-8 h-8" />;
    }
    // Fallback to id-based mapping for backwards compatibility
    const iconMap: Record<string, string> = {
      'lib': 'Book',
      'lab': 'FlaskConical',
      'it': 'Monitor',
      'av': 'Video',
      'field': 'Trophy',
      'art': 'Palette',
      'music': 'Music',
      'playground': 'Star',
      'clinic': 'Stethoscope',
    };
    return <DynamicIcon name={iconMap[id || ''] || 'Star'} className="w-8 h-8" />;
  };

  const getServiceIcon = (icon: string, color?: string) => {
    const style = color ? { color } : undefined;
    return <DynamicIcon name={icon || 'Star'} className="w-8 h-8" style={style} />;
  };

  const activeAcademicData = data.academics.find(a => a.id === activeAcademic);

  // Get hero images array (support both single image and array)
  const heroImages = data.hero.images?.length > 0 
    ? data.hero.images 
    : (data.hero.image ? [data.hero.image] : ['https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80']);

  return (
    <div className="w-full overflow-x-hidden pt-20">
      
      {/* Hero Section - Using HeroSlideshow for multiple images */}
      <HeroSlideshow
        images={heroImages}
        title={data.hero.title}
        subtitle={data.hero.subtitle}
        overlayColor={data.hero.overlayColor}
      />

      {/* Intro & Stats Section */}
      <section className="bg-white py-20 px-4 relative z-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl mb-8 text-school-brand font-bold">{data.intro.title}</h2>
            <div className="space-y-6 text-gray-600 leading-loose text-lg md:text-center font-sans max-w-4xl mx-auto">
              {data.intro.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-b border-gray-100 py-12">
            {data.stats.map((stat) => (
              <div key={stat.id} className="text-center group">
                <div className="font-display font-bold text-4xl md:text-5xl text-school-brand mb-2 group-hover:text-school-pink transition-colors duration-300">
                  {stat.value}<span className="text-school-yellow text-3xl">{stat.suffix}</span>
                </div>
                <p className="text-gray-500 uppercase tracking-wider text-xs md:text-sm font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Academic Divisions */}
      <section className="bg-gray-50 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <span className="text-school-pink font-bold tracking-widest uppercase text-sm">Academics</span>
             <h2 className="font-display text-4xl text-school-brand mt-2 font-bold">Learning Pathways</h2>
             <p className="text-gray-500 mt-2 max-w-2xl mx-auto">Click on each level to explore our curriculum, meet the directors, and see our students in action.</p>
          </div>

          {/* Level Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {data.academics.map((level) => (
              <div 
                key={level.id} 
                onClick={() => setActiveAcademic(level.id)}
                className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group relative border-2 ${activeAcademic === level.id ? 'border-school-yellow ring-2 ring-school-yellow/20 transform scale-105 z-10' : 'border-transparent'}`}
              >
                <div className="h-48 overflow-hidden relative">
                  <div className={`absolute inset-0 transition duration-500 ${activeAcademic === level.id ? 'bg-transparent' : 'bg-school-brand/30 group-hover:bg-school-brand/10'}`}></div>
                  <img src={level.image} alt={level.level} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 text-center relative">
                  {activeAcademic === level.id && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-school-yellow text-school-brand p-1 rounded-full shadow-md">
                      <ChevronDown size={20} />
                    </div>
                  )}
                  <h3 className={`font-display font-bold text-2xl mb-2 ${activeAcademic === level.id ? 'text-school-brand' : 'text-gray-700'}`}>{level.level}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{level.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Expanded Content Area */}
          {activeAcademicData && (
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 animate-fade-in-up">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                
                {/* Left: Director & Info */}
                <div className="p-8 md:p-12 flex flex-col justify-between">
                  <div>
                     <h3 className="font-display text-3xl font-bold text-school-brand mb-6 border-l-4 border-school-yellow pl-4">
                       {activeAcademicData.level} Overview
                     </h3>
                     <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                       {activeAcademicData.extendedDescription}
                     </p>
                     
                     <div className="bg-blue-50 rounded-xl p-6 flex items-start gap-4 border border-blue-100">
                        <img src={activeAcademicData.director.image} alt={activeAcademicData.director.name} className="w-16 h-16 rounded-full object-cover shadow-md border-2 border-white" />
                        <div>
                           <p className="text-xs text-school-pink font-bold uppercase mb-1">{activeAcademicData.director.role}</p>
                           <h4 className="font-bold text-school-brand text-lg">{activeAcademicData.director.name}</h4>
                           <p className="text-gray-600 italic text-sm mt-2">"{activeAcademicData.director.message}"</p>
                        </div>
                     </div>
                  </div>

                  <div className="mt-8">
                    <div className="flex flex-wrap gap-3">
                      {activeAcademicData.features.map((feature, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                          <CheckCircle2 size={14} className="text-school-brand mr-2" /> {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Gallery Grid */}
                <div className="bg-gray-100 p-8 md:p-12">
                   <h4 className="font-display text-xl font-bold text-gray-700 mb-6">Life in {activeAcademicData.level}</h4>
                   <div className="grid grid-cols-2 gap-4 h-full">
                      <div className="space-y-4">
                         <img src={activeAcademicData.gallery[0]} className="w-full h-48 object-cover rounded-lg shadow-md hover:scale-105 transition duration-500" alt="Gallery 1" />
                         <img src={activeAcademicData.gallery[1]} className="w-full h-32 object-cover rounded-lg shadow-md hover:scale-105 transition duration-500" alt="Gallery 2" />
                         <img src={activeAcademicData.gallery[4]} className="w-full h-32 object-cover rounded-lg shadow-md hover:scale-105 transition duration-500" alt="Gallery 5" />
                      </div>
                      <div className="space-y-4 pt-8">
                         <img src={activeAcademicData.gallery[2]} className="w-full h-32 object-cover rounded-lg shadow-md hover:scale-105 transition duration-500" alt="Gallery 3" />
                         <img src={activeAcademicData.gallery[3]} className="w-full h-32 object-cover rounded-lg shadow-md hover:scale-105 transition duration-500" alt="Gallery 4" />
                         <Link to="/gallery" className="h-48 bg-school-brand rounded-lg flex items-center justify-center text-white p-6 text-center shadow-md hover:bg-school-pink transition duration-300 cursor-pointer block">
                            <div>
                               <p className="font-bold text-2xl mb-2">Explore</p>
                               <p className="text-sm opacity-80">See full gallery</p>
                            </div>
                         </Link>
                      </div>
                   </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </section>

      {/* Expanded Facilities Bento Grid */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <span className="text-school-yellow font-bold tracking-widest uppercase text-sm">Campus Infrastructure</span>
             <h2 className="font-display text-4xl text-school-brand mt-2 font-bold">World-Class Facilities</h2>
             <p className="text-gray-500 mt-2 text-sm">Click any facility to view more photos.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4">
            {data.facilities.map((facility) => (
              <div 
                key={facility.id} 
                onClick={() => setSelectedFacility(facility)}
                className={`relative group rounded-2xl overflow-hidden cursor-pointer shadow-md ${
                  facility.colSpan === 2 ? 'md:col-span-2' : 
                  facility.colSpan === 3 ? 'md:col-span-3' : 'md:col-span-1'
                }`}
              >
                <img src={facility.image} alt={facility.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-school-brand/90 via-school-brand/40 to-transparent opacity-90 md:opacity-70 md:group-hover:opacity-90 transition duration-300"></div>
                
                <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                  <div className="mb-2 p-2 bg-white/20 backdrop-blur-md rounded-lg inline-block text-school-yellow">
                    {getIcon(facility.id)}
                  </div>
                  <h3 className="font-display font-bold text-xl md:text-2xl mb-2">{facility.title}</h3>
                  <p className="text-sm md:text-base text-gray-200 opacity-0 group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0 transition duration-300 line-clamp-2">
                    {facility.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Gallery Modal */}
      {selectedFacility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fade-in-up duration-300">
           <div className="bg-white w-full max-w-6xl h-[90vh] rounded-2xl overflow-hidden relative flex flex-col">
              {/* Close Button */}
              <button 
                onClick={() => setSelectedFacility(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-red-600 transition"
              >
                <X size={24} />
              </button>

              <div className="p-8 border-b border-gray-100">
                <h2 className="font-display text-3xl text-school-brand font-bold flex items-center">
                  {getIcon(selectedFacility.id)} <span className="ml-3">{selectedFacility.title}</span>
                </h2>
                <p className="text-gray-500 mt-2">{selectedFacility.description}</p>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                   {/* Main Image */}
                   <div className="md:col-span-2 lg:col-span-2 h-80 rounded-xl overflow-hidden shadow-md">
                      <img src={selectedFacility.image} alt={selectedFacility.title} className="w-full h-full object-cover" />
                   </div>
                   {/* Gallery Images */}
                   {selectedFacility.gallery.map((img, idx) => (
                      <div key={idx} className="h-80 rounded-xl overflow-hidden shadow-md">
                         <img src={img} alt={`${selectedFacility.title} ${idx}`} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                      </div>
                   ))}
                </div>
              </div>
           </div>
        </div>
      )}

      {/* New Services Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
           <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl text-school-brand font-bold">Beyond the Classroom</h2>
              <p className="text-gray-500 mt-2">Integrated technology and holistic support for a thriving student life.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.services.map((service) => (
                <div key={service.id} className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition duration-300 border-b-4 border-transparent hover:border-school-yellow">
                   <div className="mb-6">
                      {getServiceIcon(service.icon)}
                   </div>
                   <h3 className="font-bold text-xl text-gray-800 mb-3">{service.title}</h3>
                   <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Our Branches Section */}
      {data.branches && data.branches.length > 0 && (
        <section className="py-24 px-4 bg-white relative">
           <div className="max-w-6xl mx-auto">
             <div className="text-center mb-16">
                <span className="text-school-pink font-bold tracking-widest uppercase text-sm">Our Network</span>
                <h2 className="font-display text-4xl text-school-brand mt-2 font-bold">Expanding Horizons</h2>
                <p className="text-gray-500 mt-2">Bringing quality education to more communities.</p>
             </div>

             <div className="space-y-20">
                {data.branches.map((branch, index) => (
                  <div key={branch.id} className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                     <div className="w-full md:w-1/2 h-96 rounded-3xl overflow-hidden shadow-2xl relative group">
                        <img src={branch.image} alt={branch.name} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-school-brand/20 group-hover:bg-transparent transition duration-300"></div>
                     </div>
                     <div className="w-full md:w-1/2">
                        <div className="flex items-center text-school-yellow mb-2">
                           <MapPin size={20} className="mr-2" />
                           <span className="font-bold uppercase text-sm tracking-wider">{branch.location}</span>
                        </div>
                        <h3 className="font-display text-3xl font-bold text-school-brand mb-6">{branch.name}</h3>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">{branch.description}</p>
                        
                        <h4 className="font-bold text-gray-800 mb-4">Campus Highlights:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                           {branch.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center text-gray-600">
                                 <div className="w-2 h-2 bg-school-pink rounded-full mr-3"></div>
                                 {feature}
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
                ))}
             </div>
           </div>
        </section>
      )}

      {/* Call to Action / Footer Parallax */}
      <section className="relative py-32 bg-fixed bg-center bg-cover" 
        style={{backgroundImage: 'url(https://images.unsplash.com/photo-1577896337349-fd3219b66908?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)'}}>
        <div className="absolute inset-0 bg-school-brand/80 mix-blend-multiply"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 text-white">
          <h2 className="font-hand text-5xl mb-6">Join Our Community</h2>
          <p className="text-lg font-sans mb-8 opacity-90 max-w-2xl mx-auto">
            Be part of a legacy that values integrity, innovation, and inclusivity. Discover what makes Makko Billi School the perfect place for your child's future.
          </p>
          <button className="bg-school-yellow text-school-brand font-bold py-3 px-8 rounded-full hover:bg-white hover:scale-105 transition transform shadow-xl">
            Apply for Admission
          </button>
        </div>
      </section>

    </div>
  );
};

export default About;