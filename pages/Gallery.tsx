
import React, { useState, useEffect } from 'react';
import { fetchGalleryPageData, fetchGalleryImages as fetchSanityGalleryImages } from '../services/sanity';
import { GalleryImage, GalleryPageData } from '../types';
import HeroSlideshow from '../components/HeroSlideshow';

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

      try {
        const sanityImages = await fetchSanityGalleryImages();
        setImages(sanityImages || []);
      } catch (error) {
        console.warn("Failed to load gallery images", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Dynamic values with fallbacks
  const heroTitle = pageData?.hero?.title || 'Gallery';
  const heroSubtitle = pageData?.hero?.subtitle || 'Capturing Moments';
  const heroImages = pageData?.hero?.images || [];
  const overlayColor = pageData?.hero?.overlayColor || 'rgba(37, 55, 107, 0.8)';
  const loadMoreText = pageData?.settings?.loadMoreText || 'Load more';

  return (
    <div className="w-full pt-20">
      {/* Header - Dynamic Hero Slideshow */}
      <HeroSlideshow
        images={heroImages}
        title={heroTitle}
        subtitle={heroSubtitle}
        overlayColor={overlayColor}
      />

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
                      (e.target as HTMLImageElement).style.display = 'none';
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
