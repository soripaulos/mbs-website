import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSlideshowProps {
  images?: string[];
  title?: string;
  subtitle?: string;
  overlayColor?: string;
  children?: React.ReactNode;
  showDots?: boolean;
  showArrows?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function HeroSlideshow({
  images,
  title,
  subtitle,
  overlayColor = 'rgba(37, 55, 107, 0.6)',
  children,
  showDots = true,
  showArrows = false,
  autoPlay = true,
  autoPlayInterval = 5000,
}: HeroSlideshowProps) {
  const safeImages = (images || []).filter(Boolean);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [currentIndex, isTransitioning]);

  const goToPrevious = useCallback(() => {
    if (safeImages.length === 0) return;
    const newIndex = currentIndex === 0 ? safeImages.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, safeImages.length, goToSlide]);

  const goToNext = useCallback(() => {
    if (safeImages.length === 0) return;
    const newIndex = currentIndex === safeImages.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, safeImages.length, goToSlide]);

  useEffect(() => {
    if (!autoPlay || safeImages.length <= 1) return;

    const interval = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, safeImages.length, goToNext]);

  return (
    <div className="relative w-full overflow-hidden aspect-[16/9] max-h-screen">
      {/* Background Images */}
      {safeImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={index === 0 ? 'high' : 'low'}
          />
        </div>
      ))}

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: overlayColor }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pb-12 md:pb-20">
        {title && (
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-4 md:mb-6 max-w-4xl leading-tight drop-shadow-lg">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="text-school-yellow text-lg md:text-xl lg:text-2xl max-w-2xl mb-8 font-semibold drop-shadow-md">
            {subtitle}
          </p>
        )}
        {children}
      </div>

      {/* Navigation Arrows */}
      {showArrows && safeImages.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && safeImages.length > 1 && (
        <div className="absolute bottom-14 md:bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {safeImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                ? 'bg-school-yellow w-8'
                : 'bg-white/50 hover:bg-white/80'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Wave SVG */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-10 md:h-24"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,156.86,79.08,321.39,56.44Z"
            className="fill-white"
          />
        </svg>
      </div>
    </div>
  );
}
