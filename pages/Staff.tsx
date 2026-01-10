
import React, { useEffect, useState } from 'react';
import { fetchStaffPageData } from '../services/sanity';
import { fetchStaffPageData as fetchFallbackStaffData } from '../services/cms';
import { StaffPageData } from '../types';
import { Phone, Mail } from 'lucide-react';
import HeroSlideshow from '../components/HeroSlideshow';

const Staff: React.FC = () => {
  const [data, setData] = useState<StaffPageData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Try Sanity first
        const content = await fetchStaffPageData();
        if (content && content.founders && content.founders.length > 0) {
          setData(content);
          return;
        }
      } catch (error) {
        console.log('Sanity fetch failed, using fallback data');
      }
      // Fallback to static CMS data
      const fallbackContent = await fetchFallbackStaffData();
      setData(fallbackContent);
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

  // Dynamic page data with fallbacks
  const heroTitle = data.pageData?.hero?.title || 'Our Staff';
  const heroSubtitle = data.pageData?.hero?.subtitle || 'The Pillars of Our Community';
  const heroImages = data.pageData?.hero?.images || [];
  const overlayColor = data.pageData?.hero?.overlayColor || 'rgba(37, 55, 107, 0.8)';

  const foundersTitle = data.pageData?.sectionTitles?.foundersTitle || 'Our Founders';
  const directorsTitle = data.pageData?.sectionTitles?.directorsTitle || 'Our Directors';
  const directorsSubtitle = data.pageData?.sectionTitles?.directorsSubtitle || 'Leading with vision and dedication';
  const viceDirectorsTitle = data.pageData?.sectionTitles?.viceDirectorsTitle || 'Vice Directors';
  const viceDirectorsSubtitle = data.pageData?.sectionTitles?.viceDirectorsSubtitle || 'Supporting academic and operational excellence';
  const departmentsTitle = data.pageData?.sectionTitles?.departmentsTitle || 'Our Departments';

  return (
    <div className="w-full pt-20 overflow-x-hidden">
      {/* Hero Section - Slideshow */}
      <HeroSlideshow
        images={heroImages}
        title={heroTitle}
        subtitle={heroSubtitle}
        overlayColor={overlayColor}
      />

      {/* Founders Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl text-school-brand font-bold mb-16 relative inline-block">
            {foundersTitle}
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-school-yellow rounded-full"></span>
          </h2>
          
          <div className="flex flex-col md:flex-row justify-center items-end gap-8 md:gap-12">
            {/* Main Founder - Hover slide-up effect like directors */}
            <div className="w-full md:w-1/3 order-1 relative z-10">
               <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/4] transform md:scale-105 md:hover:scale-110 transition duration-500 border-4 border-school-yellow group">
                  <img src={data.founders[0].image} alt={data.founders[0].name} className="w-full h-full object-cover" />
                  
                  {/* Subtle Gradient Overlay - face always visible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                  {/* Name and Role - Always visible at bottom */}
                  <div className="absolute bottom-0 left-0 w-full text-white p-5 bg-gradient-to-t from-black/80 to-transparent">
                     <h3 className="font-bold text-2xl mb-1">{data.founders[0].name}</h3>
                     <p className="text-school-yellow font-bold text-sm uppercase tracking-wide">{data.founders[0].role}</p>
                  </div>

                  {/* Contact Info - Slides up on hover from below */}
                  <div className="absolute bottom-0 left-0 w-full bg-school-brand/95 backdrop-blur-sm p-6 text-white transition-transform duration-500 transform translate-y-full group-hover:translate-y-0">
                     <h3 className="font-bold text-2xl mb-1">{data.founders[0].name}</h3>
                     <p className="text-school-yellow font-bold mb-4">{data.founders[0].role}</p>
                     
                     <div className="space-y-2 border-t border-white/20 pt-4">
                        {data.founders[0].phones && data.founders[0].phones.map((phone, idx) => (
                           <a key={idx} href={`tel:${phone}`} className="flex items-center text-sm hover:text-school-yellow transition bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-white/20">
                              <Phone size={14} className="mr-2" />
                              {phone}
                           </a>
                        ))}
                        {data.founders[0].email && (
                           <a href={`mailto:${data.founders[0].email}`} className="flex items-center text-sm hover:text-school-yellow transition bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-white/20">
                              <Mail size={14} className="mr-2" />
                              {data.founders[0].email}
                           </a>
                        )}
                     </div>
                  </div>
               </div>
            </div>

            {/* Co-Founder 1 - Moved to Middle (order-2) */}
            <div className="w-full md:w-1/3 order-2 transform hover:-translate-y-2 transition duration-500">
               <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[3/4]">
                  <img src={data.founders[1].image} alt={data.founders[1].name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-school-brand to-transparent p-6 text-white text-left pt-20">
                     <h3 className="font-bold text-xl">{data.founders[1].name}</h3>
                     <p className="text-sm text-school-yellow">{data.founders[1].role}</p>
                  </div>
               </div>
            </div>

            {/* Co-Founder 2 - Moved to Right (order-3) */}
            <div className="w-full md:w-1/3 order-3 transform hover:-translate-y-2 transition duration-500">
               <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[3/4]">
                  <img src={data.founders[2].image} alt={data.founders[2].name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-school-brand to-transparent p-6 text-white text-left pt-20">
                     <h3 className="font-bold text-xl">{data.founders[2].name}</h3>
                     <p className="text-sm text-school-yellow">{data.founders[2].role}</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Directors Section */}
      <section className="py-20 px-4 bg-gray-50 relative">
         {/* Background Blobs */}
         <div className="absolute top-20 left-0 w-64 h-64 bg-school-pink/10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
         <div className="absolute bottom-20 right-0 w-64 h-64 bg-school-yellow/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>

         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
               <h2 className="font-display text-4xl text-school-brand font-bold">{directorsTitle}</h2>
               <p className="text-gray-500 mt-2">{directorsSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {data.directors.map((director) => (
                  <div key={director.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group relative h-[400px]">
                     {/* Full Image */}
                     <img src={director.image} alt={director.name} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
                     
                     {/* Subtle Gradient Overlay - lighter so face is visible */}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                     {/* Name and Role - Always visible at bottom */}
                     <div className="absolute bottom-0 left-0 w-full text-white p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="font-bold text-lg mb-1">{director.name}</h3>
                        <p className="text-school-yellow font-medium text-xs uppercase tracking-wide">{director.role}</p>
                     </div>

                     {/* Contact Info - Slides up on hover from below */}
                     <div className="absolute bottom-0 left-0 w-full bg-school-brand/95 backdrop-blur-sm p-6 text-white transition-transform duration-500 transform translate-y-full group-hover:translate-y-0">
                        <h3 className="font-bold text-xl mb-1">{director.name}</h3>
                        <p className="text-school-yellow font-medium text-sm mb-4 uppercase tracking-wide">{director.role}</p>
                        
                        <div className="space-y-3">
                           {director.phones && (
                              <a href={`tel:${director.phones[0]}`} className="flex items-center text-white/90 hover:text-school-yellow transition text-sm bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-white/20">
                                 <Phone size={16} className="mr-3 text-school-yellow" />
                                 {director.phones[0]}
                              </a>
                           )}
                           {director.email && (
                              <a href={`mailto:${director.email}`} className="flex items-center text-white/90 hover:text-school-yellow transition text-sm bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-white/20">
                                 <Mail size={16} className="mr-3 text-school-yellow" />
                                 <span className="truncate">{director.email}</span>
                              </a>
                           )}
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Vice Directors Section */}
      <section className="py-20 px-4 bg-white">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
               <h2 className="font-display text-4xl text-school-pink font-bold">{viceDirectorsTitle}</h2>
               <p className="text-gray-500 mt-2">{viceDirectorsSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {data.viceDirectors.map((vice) => (
                  <div key={vice.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group relative h-[350px]">
                     {/* Full Image */}
                     <img src={vice.image} alt={vice.name} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
                     
                     {/* Subtle Gradient Overlay - lighter so face is visible */}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                     {/* Name and Role - Always visible at bottom */}
                     <div className="absolute bottom-0 left-0 w-full text-white p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="font-bold text-base mb-1">{vice.name}</h3>
                        <p className="text-school-yellow font-medium text-xs uppercase tracking-wide">{vice.role}</p>
                     </div>

                     {/* Contact Info - Slides up on hover from below */}
                     <div className="absolute bottom-0 left-0 w-full bg-school-pink/95 backdrop-blur-sm p-5 text-white transition-transform duration-500 transform translate-y-full group-hover:translate-y-0">
                        <h3 className="font-bold text-lg mb-1">{vice.name}</h3>
                        <p className="text-school-yellow font-medium text-xs mb-3 uppercase tracking-wide">{vice.role}</p>
                        
                        {vice.phones && (
                           <a href={`tel:${vice.phones[0]}`} className="flex items-center text-white/90 hover:text-school-yellow transition text-sm bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-white/20">
                              <Phone size={16} className="mr-3 text-school-yellow" />
                              {vice.phones[0]}
                           </a>
                        )}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Departments Section */}
      <section className="py-24 px-4 bg-school-brand/5">
         <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
               <h2 className="font-display text-4xl text-school-brand font-bold">{departmentsTitle}</h2>
            </div>

            <div className="space-y-20">
               {data.departments.map((dept, index) => (
                  <div key={dept.id} className={`flex flex-col md:flex-row items-center gap-10 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                     <div className="w-full md:w-1/2 relative group">
                        <div className={`absolute inset-0 bg-${index % 2 === 0 ? 'school-yellow' : 'school-pink'}/20 rounded-2xl transform rotate-3 transition duration-500 group-hover:rotate-6`}></div>
                        <img src={dept.image} alt={dept.name} className="w-full h-80 object-cover rounded-2xl shadow-lg relative z-10 transform transition duration-500 group-hover:-translate-y-2" />
                     </div>
                     <div className="w-full md:w-1/2 text-center md:text-left">
                        <h3 className="font-display text-3xl font-bold text-gray-800 mb-4">{dept.name}</h3>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">{dept.description}</p>
                        <div className="h-1 w-24 bg-school-brand rounded-full mx-auto md:mx-0"></div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};

export default Staff;