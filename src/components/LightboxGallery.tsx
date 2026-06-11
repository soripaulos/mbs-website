import { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxGalleryProps {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
  captions?: (string | undefined)[];
}

/**
 * Full-screen lightbox with keyboard navigation and touch-swipe support.
 */
export default function LightboxGallery({
  images,
  initialIndex = 0,
  onClose,
  captions,
}: LightboxGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const touchX = useRef<number | null>(null);

  const prev = useCallback(() => {
    setCurrentIndex(i => (i > 0 ? i - 1 : images.length - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setCurrentIndex(i => (i < images.length - 1 ? i + 1 : 0));
  }, [images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose, prev, next]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 48) (dx > 0 ? prev : next)();
    touchX.current = null;
  };

  const caption = captions?.[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[9999] flex animate-fade-in items-center justify-center bg-night/95 backdrop-blur-sm"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="dialog"
      aria-label="Image viewer"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-bone/80 transition-colors hover:border-sun hover:text-sun"
      >
        <X size={20} />
      </button>

      {images.length > 1 && (
        <div className="absolute left-1/2 top-6 -translate-x-1/2 font-label text-xs font-medium tracking-[0.25em] text-bone/50">
          {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </div>
      )}

      {images.length > 1 && (
        <>
          <button
            onClick={e => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous image"
            className="absolute left-3 z-10 hidden h-11 w-11 items-center justify-center rounded-full border border-white/15 text-bone/80 transition-colors hover:border-sun hover:text-sun sm:flex md:left-6"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={e => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next image"
            className="absolute right-3 z-10 hidden h-11 w-11 items-center justify-center rounded-full border border-white/15 text-bone/80 transition-colors hover:border-sun hover:text-sun sm:flex md:right-6"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      <figure className="px-4" onClick={e => e.stopPropagation()}>
        <img
          key={currentIndex}
          src={images[currentIndex]}
          alt={caption || ''}
          className="max-h-[78vh] max-w-[92vw] animate-fade-in rounded-xl object-contain"
        />
        {caption && (
          <figcaption className="mt-4 text-center text-sm text-bone/70">{caption}</figcaption>
        )}
      </figure>

      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={e => {
                e.stopPropagation();
                setCurrentIndex(i);
              }}
              aria-label={`Image ${i + 1}`}
              className={`h-1 rounded-full transition-all ${
                i === currentIndex ? 'w-7 bg-sun' : 'w-3 bg-white/25 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
