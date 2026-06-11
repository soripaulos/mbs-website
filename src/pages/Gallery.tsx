import { useState, useMemo } from 'react';
import { ImageOff, Plus } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import Shimmer from '@/components/Shimmer';
import LightboxGallery from '@/components/LightboxGallery';
import {
  galleryPageData as mockGalleryPageData,
  galleryImagesData as mockGalleryImages,
} from '@/data/mockData';
import { useSanityData, useSanityArrayData } from '@/hooks/useSanityData';
import { fetchGalleryPageData, fetchGalleryImages } from '@/services/sanity';

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'campus', label: 'Campus' },
  { id: 'events', label: 'Events' },
  { id: 'classroom', label: 'Classroom' },
  { id: 'sports', label: 'Sports' },
  { id: 'arts', label: 'Arts' },
  { id: 'science', label: 'Science' },
  { id: 'other', label: 'Other' },
];

export default function Gallery() {
  const { data: galleryPage } = useSanityData(fetchGalleryPageData, mockGalleryPageData);
  const { data: galleryImages, loading } = useSanityArrayData(fetchGalleryImages, mockGalleryImages);

  const perPage = galleryPage?.settings?.imagesPerPage || 12;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState(perPage);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // per-category counts for the filter rail
  const counts = useMemo(() => {
    const map: Record<string, number> = { all: galleryImages.length };
    for (const img of galleryImages) {
      map[img.category] = (map[img.category] || 0) + 1;
    }
    return map;
  }, [galleryImages]);

  const filteredImages =
    selectedCategory === 'all'
      ? galleryImages
      : galleryImages.filter(img => img.category === selectedCategory);

  const visibleImages = filteredImages.slice(0, visibleCount);

  return (
    <div className="min-h-screen">
      <PageHero
        crumb="Gallery"
        title={galleryPage?.hero?.title || 'School Gallery'}
        subtitle={galleryPage?.hero?.subtitle}
        images={galleryPage?.hero?.images}
      />

      {/* Sticky filter rail */}
      {galleryPage?.settings?.showCategories && (
        <div className="sticky top-16 z-30 border-y border-ink/10 bg-bone/90 backdrop-blur-md md:top-[4.5rem]">
          <div className="no-scrollbar mx-auto flex max-w-[1200px] gap-2 overflow-x-auto px-5 py-3 md:px-8">
            {CATEGORIES.filter(c => c.id === 'all' || (counts[c.id] || 0) > 0).map(category => {
              const active = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setVisibleCount(perPage);
                  }}
                  className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 font-label text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${
                    active
                      ? 'border-ink bg-ink text-bone'
                      : 'border-ink/15 text-ink/55 hover:border-ink/40 hover:text-ink'
                  }`}
                >
                  {category.label}
                  <span className={active ? 'text-sun' : 'text-ink/35'}>
                    {counts[category.id] || 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <section className="bg-bone py-10 md:py-14">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          {/* Loading skeleton */}
          {loading && galleryImages.length === 0 ? (
            <div className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4 [&>*]:mb-3 md:[&>*]:mb-4">
              {[180, 240, 200, 260, 190, 230, 210, 250].map((h, i) => (
                <Shimmer key={i} className="w-full break-inside-avoid" style={{ height: h }} />
              ))}
            </div>
          ) : (
            <>
              {/* Masonry grid */}
              <div className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4 [&>*]:mb-3 md:[&>*]:mb-4">
                {visibleImages.map((image, index) => (
                  <Reveal key={image.id} variant="fade" delay={(index % 4) * 60} className="break-inside-avoid">
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(index)}
                      className="img-zoom group relative block w-full overflow-hidden rounded-xl bg-ink/5 md:rounded-2xl"
                      aria-label={image.caption || 'View image'}
                    >
                      <img
                        src={image.image}
                        alt={image.caption || 'Gallery image'}
                        loading="lazy"
                        decoding="async"
                        className="w-full object-cover"
                      />
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/75 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <span className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between gap-3 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <span className="text-left text-xs font-medium leading-snug text-bone">
                          {image.caption || ''}
                        </span>
                        <span className="shrink-0 rounded-full bg-bone/15 px-2.5 py-1 font-label text-[9px] font-semibold uppercase tracking-[0.14em] text-sun backdrop-blur-sm">
                          {image.category}
                        </span>
                      </span>
                    </button>
                  </Reveal>
                ))}
              </div>

              {/* Load more */}
              {visibleCount < filteredImages.length && (
                <div className="mt-12 flex flex-col items-center gap-3">
                  <button
                    onClick={() => setVisibleCount(c => c + perPage)}
                    className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-label text-[13px] font-semibold uppercase tracking-[0.12em] text-bone transition-colors hover:bg-brand"
                  >
                    <Plus size={15} className="transition-transform duration-300 group-hover:rotate-90" />
                    {galleryPage?.settings?.loadMoreText || 'Load More'}
                  </button>
                  <p className="font-label text-[11px] font-medium uppercase tracking-[0.2em] text-ink/40">
                    {visibleImages.length} / {filteredImages.length}
                  </p>
                </div>
              )}

              {/* Empty state */}
              {visibleImages.length === 0 && (
                <Reveal variant="fade" className="py-20 text-center">
                  <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-ink/15 text-ink/30">
                    <ImageOff size={22} />
                  </span>
                  <p className="font-display text-lg font-bold text-ink/60">
                    No photos in this category yet.
                  </p>
                  <p className="mt-1 text-sm text-ink/40">Check back soon.</p>
                </Reveal>
              )}
            </>
          )}
        </div>
      </section>

      {lightboxIndex !== null && (
        <LightboxGallery
          images={filteredImages.map(i => i.image)}
          captions={filteredImages.map(i => i.caption)}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}
