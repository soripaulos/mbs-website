
import React, { useState, useEffect } from 'react';
import { fetchGalleryImages } from '../services/api';
import { fetchGalleryPageData, fetchGalleryImages as fetchSanityGalleryImages } from '../services/sanity';
import { GalleryImage, GalleryPageData } from '../types';
import Wave from '../components/Wave';

const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<GalleryPageData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      // Load page configuration from Sanity
      try {
        const data = await fetchGalleryPageData();
        setPageData(data);
      } catch (error) {
        console.log('Failed to load gallery page data from Sanity');
      }

      // Load gallery images
      try {
        // Try Sanity first
        const sanityImages = await fetchSanityGalleryImages();
        if (sanityImages && sanityImages.length > 0) {
          setImages(sanityImages);
        } else {
          // Fallback to Facebook/Instagram API
          const apiImages = await fetchGalleryImages();
          setImages(apiImages);
        }
      } catch (error) {
        console.error("Failed to load gallery images", error);
        // Try API as fallback
        try {
          const apiImages = await fetchGalleryImages();
          setImages(apiImages);
        } catch (e) {
          console.error("API fallback also failed", e);
        }
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Dynamic values with fallbacks
  const heroTitle = pageData?.hero?.title || 'Gallery';
  const heroSubtitle = pageData?.hero?.subtitle || 'Capturing Moments';
  const heroImage = pageData?.hero?.backgroundImage || 'https://images.unsplash.com/photo-1427504742925-087e6b2dd71e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
  const overlayColor = pageData?.hero?.overlayColor || 'bg-school-brand/80';
  const loadMoreText = pageData?.settings?.loadMoreText || 'Load more';

  return (
    <div className="w-full pt-20">
      {/* Header - Dynamic Hero */}
      <div className="relative h-[90vh] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 ${overlayColor} z-10`} />
          <img 
            src={heroImage} 
            alt={heroTitle} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-hand text-white mb-4 drop-shadow-lg font-bold tracking-tight">
            {heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-school-yellow mb-10 font-display tracking-wide max-w-3xl font-medium">
            {heroSubtitle}
          </p>
        </div>

        {/* Wave Curve */}
        <div className="absolute bottom-0 left-0 w-full z-30 leading-none">
          <svg className="w-full h-24 md:h-48 text-white" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="currentColor" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-gray-200 h-64 rounded-xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 p-4">
              {images.map((img) => (
                <div key={img.id} className="break-inside-avoid relative group overflow-hidden rounded-xl shadow-lg cursor-pointer border-2 border-transparent hover:border-school-yellow transition-all">
                  <img 
                    src={img.url} 
                    alt={img.caption} 
                    className="w-full object-cover transform group-hover:scale-110 transition duration-700 ease-in-out"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-school-brand/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-6">
                    <p className="text-white font-display font-bold text-lg translate-y-4 group-hover:translate-y-0 transition duration-300 line-clamp-2">{img.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            <button className="bg-school-brand text-white font-bold py-3 px-10 rounded-full hover:bg-school-pink transition shadow-md hover:scale-105 transform border-2 border-transparent hover:border-white">
              {loadMoreText}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
