import React, { useState, useEffect } from 'react';

interface HeroSlideshowProps {
  images: string[];
  title: string;
  subtitle?: string;
  overlayColor?: string;
  children?: React.ReactNode;
}

const HeroSlideshow: React.FC<HeroSlideshowProps> = ({
  images,
  title,
  subtitle,
  overlayColor = 'rgba(37, 55, 107, 0.8)',
  children,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const hasImages = images && images.length > 0;
  // Auto-rotate images if there are multiple
  useEffect(() => {
    if (!hasImages || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000); // 5 seconds per image

    return () => clearInterval(timer);
  }, [images.length, hasImages]);

  // Check if overlayColor is a CSS value (rgba/rgb/hex) or a Tailwind class
  const isCSSColor = overlayColor.startsWith('rgba') || 
                     overlayColor.startsWith('rgb') || 
                     overlayColor.startsWith('#');

  return (
    <div className="relative h-[90vh] w-full overflow-hidden" style={!hasImages && isCSSColor ? { backgroundColor: overlayColor } : undefined}>
      {/* Background Images with Crossfade */}
      <div className="absolute inset-0">
        {/* Overlay - supports both CSS colors and Tailwind classes */}
        <div 
          className={`absolute inset-0 z-10 ${!isCSSColor ? overlayColor : ''}`}
          style={isCSSColor ? { backgroundColor: overlayColor } : undefined}
        />
        
        {hasImages && images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${title} - Image ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              idx === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 pb-20 md:pb-48 animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-hand text-white mb-4 drop-shadow-lg font-bold tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-school-yellow mb-10 font-display tracking-wide max-w-3xl font-medium">
            {subtitle}
          </p>
        )}
        {children}
      </div>

      {/* Image Indicators - positioned above wave, below content */}
      {hasImages && images.length > 1 && (
        <div className="absolute bottom-28 md:bottom-56 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentImageIndex
                  ? 'bg-white w-6'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Wave Curve */}
      <div className="absolute bottom-0 left-0 w-full z-30 leading-none">
        <svg
          className="w-full h-24 md:h-48 text-white"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeroSlideshow;
