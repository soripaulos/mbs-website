import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { DoodleStar } from '@/components/decor';
import { galleryPageData as mockGalleryPageData, galleryImagesData as mockGalleryImages } from '@/data/mockData';
import { useSanityData, useSanityArrayData } from '@/hooks/useSanityData';
import { fetchGalleryPageData, fetchGalleryImages } from '@/services/sanity';
import type { GalleryImage } from '@/types';

const CATEGORIES = [
  { id: 'all', label: 'All', emoji: '✨' },
  { id: 'campus', label: 'Campus', emoji: '🏫' },
  { id: 'events', label: 'Events', emoji: '🎉' },
  { id: 'classroom', label: 'Classroom', emoji: '📚' },
  { id: 'sports', label: 'Sports', emoji: '⚽' },
  { id: 'arts', label: 'Arts', emoji: '🎨' },
  { id: 'science', label: 'Science', emoji: '🔬' },
  { id: 'other', label: 'Other', emoji: '📌' },
];

// ── LIGHTBOX ─────────────────────────────────────────────────────────────────
function Lightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink/95" onClick={onClose}>
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
      >
        <X size={22} />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={e => { e.stopPropagation(); onPrev(); }}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 md:left-5"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={e => { e.stopPropagation(); onNext(); }}
            aria-label="Next image"
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 md:right-5"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      <figure className="max-h-[88vh] max-w-5xl px-4" onClick={e => e.stopPropagation()}>
        <img
          src={currentImage.image}
          alt={currentImage.caption || 'Gallery image'}
          className="max-h-[76vh] max-w-full rounded-2xl object-contain"
        />
        <figcaption className="mt-4 text-center">
          {currentImage.caption && <p className="font-hand text-2xl text-white">{currentImage.caption}</p>}
          <p className="mt-1 text-sm text-white/50">
            {currentIndex + 1} / {images.length}
          </p>
        </figcaption>
      </figure>
    </div>
  );
}

// ── PAGE ─────────────────────────────────────────────────────────────────────
export default function Gallery() {
  const { data: galleryPage } = useSanityData(fetchGalleryPageData, mockGalleryPageData);
  const { data: galleryImages } = useSanityArrayData(fetchGalleryImages, mockGalleryImages);

  const perPage = galleryPage?.settings?.imagesPerPage || 12;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState(perPage);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages =
    selectedCategory === 'all'
      ? galleryImages
      : galleryImages.filter(img => img.category === selectedCategory);

  const visibleImages = filteredImages.slice(0, visibleCount);

  return (
    <div className="min-h-screen">
      <PageHero
        title={galleryPage?.hero?.title || 'School Gallery'}
        subtitle={galleryPage?.hero?.subtitle}
        images={galleryPage?.hero?.images}
        accent="sky"
      />

      <section className="relative bg-paper py-12 md:py-16">
        <DoodleStar className="absolute right-[6%] top-6 hidden h-7 w-7 text-sun-deep/60 animate-float md:block" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Category filters */}
          {galleryPage?.settings?.showCategories && (
            <Reveal className="mb-10">
              <div className="flex flex-wrap justify-center gap-2 md:gap-2.5">
                {CATEGORIES.map(category => {
                  const active = selectedCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setVisibleCount(perPage);
                      }}
                      className={`inline-flex items-center gap-1.5 rounded-full border-2 px-4 py-2 font-display text-sm font-bold transition-all ${
                        active
                          ? 'border-ink bg-brand text-white shadow-sticker-xs'
                          : 'border-ink/10 bg-white text-ink/60 hover:border-ink/30 hover:bg-cream hover:text-brand'
                      }`}
                    >
                      <span aria-hidden="true">{category.emoji}</span>
                      {category.label}
                    </button>
                  );
                })}
              </div>
            </Reveal>
          )}

          {/* Masonry grid */}
          <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
            {visibleImages.map((image, index) => (
              <Reveal key={image.id} delay={(index % 4) * 60} className="break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className="group relative block w-full overflow-hidden rounded-2xl border-2 border-ink/10 bg-white p-1.5 transition-all hover:-translate-y-1 hover:shadow-soft"
                  aria-label={image.caption || 'View image'}
                >
                  <span className="block overflow-hidden rounded-xl bg-cream">
                    <img
                      src={image.image}
                      alt={image.caption || 'Gallery image'}
                      loading="lazy"
                      decoding="async"
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </span>
                  <span className="pointer-events-none absolute inset-1.5 rounded-xl bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {image.caption && (
                    <span className="pointer-events-none absolute inset-x-4 bottom-3.5 translate-y-2 text-left font-hand text-lg leading-tight text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {image.caption}
                    </span>
                  )}
                  <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-bold capitalize text-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {image.category}
                  </span>
                </button>
              </Reveal>
            ))}
          </div>

          {/* Load more */}
          {visibleCount < filteredImages.length && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setVisibleCount(c => c + perPage)}
                className="btn-press inline-flex items-center gap-2 rounded-2xl border-2 border-ink bg-sun px-8 py-3.5 font-display font-bold text-ink shadow-sticker"
              >
                {galleryPage?.settings?.loadMoreText || 'Load More Photos'}
              </button>
              <p className="mt-3 text-xs font-semibold text-ink/40">
                Showing {visibleImages.length} of {filteredImages.length} photos
              </p>
            </div>
          )}

          {/* Empty state */}
          {visibleImages.length === 0 && (
            <Reveal className="py-16 text-center">
              <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl border-2 border-ink/10 bg-cream text-ink/30">
                <ImageOff size={28} />
              </span>
              <p className="font-display text-lg font-bold text-ink/50">No photos in this category yet.</p>
              <p className="mt-1 font-hand text-xl text-coral-deep">Check back soon!</p>
            </Reveal>
          )}
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={() => setLightboxIndex(i => (i! + 1) % filteredImages.length)}
          onPrev={() => setLightboxIndex(i => (i! === 0 ? filteredImages.length - 1 : i! - 1))}
        />
      )}
    </div>
  );
}
