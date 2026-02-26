import { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import HeroSlideshow from '@/components/HeroSlideshow';
import { galleryPageData as mockGalleryPageData, galleryImagesData as mockGalleryImages } from '@/data/mockData';
import { useSanityData, useSanityArrayData } from '@/hooks/useSanityData';
import { fetchGalleryPageData, fetchGalleryImages } from '@/services/sanity';
import type { GalleryImage } from '@/types';

// Animation hook
function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, ...options });

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
      className={`transition-all duration-700 ${className} ${isIntersecting
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-8'
        }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// Lightbox Component
function Lightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev
}: {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, onNext, onPrev]);

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
      >
        <X size={24} />
      </button>

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Image */}
      <div className="max-w-5xl max-h-[80vh] px-4">
        <img
          src={currentImage.image}
          alt={currentImage.caption || 'Gallery image'}
          className="max-w-full max-h-[80vh] object-contain rounded-lg"
        />
        {currentImage.caption && (
          <p className="text-white text-center mt-4 text-lg">
            {currentImage.caption}
          </p>
        )}
        <p className="text-white/60 text-center mt-2 text-sm">
          {currentIndex + 1} / {images.length}
        </p>
      </div>
    </div>
  );
}

// Main Gallery Page
export default function Gallery() {
  const galleryFetcher = useCallback(
    () => fetchGalleryPageData(),
    []
  );
  const { data: galleryPage } = useSanityData(galleryFetcher, mockGalleryPageData);
  const { data: galleryImages } = useSanityArrayData(fetchGalleryImages, mockGalleryImages);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState(galleryPage.settings.imagesPerPage);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['all', 'campus', 'events', 'classroom', 'sports', 'arts', 'science', 'other'];

  const filteredImages = selectedCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  const visibleImages = filteredImages.slice(0, visibleCount);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const goToNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };

  const goToPrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? filteredImages.length - 1 : lightboxIndex - 1);
    }
  };

  return (
    <div className="min-h-screen">
      <HeroSlideshow
        images={galleryPage.hero.images}
        title={galleryPage.hero.title}
        subtitle={galleryPage.hero.subtitle}
        overlayColor={galleryPage.hero.overlayColor}
      />

      {/* Gallery Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          {galleryPage.settings.showCategories && (
            <AnimatedSection className="mb-10">
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setVisibleCount(galleryPage.settings.imagesPerPage);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all ${selectedCategory === category
                      ? 'bg-school-brand text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </AnimatedSection>
          )}

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {visibleImages.map((image, index) => (
              <AnimatedSection key={image.id} delay={index * 50}>
                <div
                  onClick={() => openLightbox(index)}
                  className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-md card-hover"
                >
                  <img
                    src={image.image}
                    alt={image.caption || 'Gallery image'}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-sm font-medium">{image.caption}</p>
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-white/90 text-school-brand text-xs font-semibold rounded-full capitalize">
                      {image.category}
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < filteredImages.length && (
            <AnimatedSection className="text-center mt-10">
              <button
                onClick={() => setVisibleCount(prev => prev + galleryPage.settings.imagesPerPage)}
                className="px-8 py-3 bg-school-brand text-white rounded-full font-semibold hover:bg-school-dark-blue transition-colors"
              >
                {galleryPage.settings.loadMoreText}
              </button>
            </AnimatedSection>
          )}

          {/* Empty State */}
          {visibleImages.length === 0 && (
            <AnimatedSection className="text-center py-16">
              <p className="text-gray-500 text-lg">No images found in this category.</p>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={goToNext}
          onPrev={goToPrev}
        />
      )}
    </div>
  );
}
