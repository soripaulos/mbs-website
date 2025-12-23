import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react';
import { fetchFacebookPosts } from '../services/api';
import type { SocialPost } from '../types';

type Props = {
  title?: string;
  initialCount?: number;
  step?: number;
};

export default function FacebookPosts({ title = 'Latest Updates', initialCount = 3, step = 3 }: Props) {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(initialCount);

  // Per-post slideshow: track current image index for each post
  const [postImageIndex, setPostImageIndex] = useState<Record<string, number>>({});

  // Lightbox state
  const [lightbox, setLightbox] = useState<{ post: SocialPost; imageIndex: number } | null>(null);

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMorePosts = posts.length > visibleCount;

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      try {
        const fbPosts = await fetchFacebookPosts();
        if (mounted) setPosts(fbPosts);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    run();
    return () => {
      mounted = false;
    };
  }, []);

  // Auto slideshow for multi-image posts (normal card view)
  useEffect(() => {
    if (posts.length === 0) return;

    const timer = setInterval(() => {
      setPostImageIndex((prev) => {
        const next = { ...prev };
        for (const post of posts) {
          const imageCount = post.images?.length || 0;
          if (imageCount > 1) {
            const currentIdx = prev[post.id] ?? 0;
            next[post.id] = (currentIdx + 1) % imageCount;
          }
        }
        return next;
      });
    }, 3500);

    return () => clearInterval(timer);
  }, [posts]);

  const handleLoadMore = () => setVisibleCount((prev) => prev + step);

  const openLightbox = (post: SocialPost, imageIndex: number) => setLightbox({ post, imageIndex });
  const closeLightbox = () => setLightbox(null);

  const nextLightboxImage = () => {
    if (!lightbox) return;
    const count = lightbox.post.images?.length || 0;
    if (count <= 1) return;
    setLightbox({ post: lightbox.post, imageIndex: (lightbox.imageIndex + 1) % count });
  };

  const prevLightboxImage = () => {
    if (!lightbox) return;
    const count = lightbox.post.images?.length || 0;
    if (count <= 1) return;
    setLightbox({ post: lightbox.post, imageIndex: (lightbox.imageIndex - 1 + count) % count });
  };

  return (
    <>
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-school-dark-blue font-display">{title}</h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-100 h-80 rounded-xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {visiblePosts.map((post) => {
                  const currentImageIdx = postImageIndex[post.id] ?? 0;
                  const hasImages = post.images && post.images.length > 0;
                  const hasMultipleImages = post.images && post.images.length > 1;

                  return (
                    <div
                      key={post.id}
                      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col"
                    >
                      {hasImages && (
                        <div
                          className="relative h-52 overflow-hidden cursor-pointer group"
                          onClick={() => openLightbox(post, currentImageIdx)}
                          title="Click to expand"
                        >
                          <img
                            src={post.images[currentImageIdx] || post.images[0]}
                            alt="Post"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />

                          {hasMultipleImages && (
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                              {currentImageIdx + 1} / {post.images.length}
                            </div>
                          )}

                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium bg-black/50 px-3 py-1 rounded">
                              Click to expand
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="p-5 flex flex-col flex-grow">
                        <p className="text-gray-700 text-sm mb-4 line-clamp-4 flex-grow leading-relaxed">
                          {post.content || 'Check out our latest update!'}
                        </p>

                        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                          <span className="text-xs text-gray-400">{post.date}</span>
                          {post.url && post.url !== '#' && (
                            <a
                              href={post.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-school-dark-blue hover:text-school-brand transition-colors"
                              onClick={(e) => e.stopPropagation()}
                              aria-label="Open on Facebook"
                              title="Open on Facebook"
                            >
                              <ExternalLink size={16} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center mt-12">
                {hasMorePosts ? (
                  <button
                    onClick={handleLoadMore}
                    className="inline-block px-8 py-3 border-2 border-school-dark-blue text-school-dark-blue rounded-full font-bold hover:bg-school-dark-blue hover:text-white transition-colors text-sm"
                  >
                    See More ({posts.length - visibleCount} more)
                  </button>
                ) : (
                  posts.length > initialCount && <p className="text-gray-400 text-sm">You&apos;ve seen all posts!</p>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {lightbox && (
        <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4" onClick={closeLightbox}>
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute -top-12 right-0 text-white font-medium flex items-center gap-2 hover:text-gray-300 transition-colors"
              onClick={closeLightbox}
            >
              <X size={20} />
              Close
            </button>

            <img
              src={lightbox.post.images[lightbox.imageIndex]}
              alt="Expanded view"
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />

            {lightbox.post.images.length > 1 && (
              <>
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-colors"
                  onClick={prevLightboxImage}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-colors"
                  onClick={nextLightboxImage}
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                <div className="mt-4 text-center text-white text-sm">
                  {lightbox.imageIndex + 1} / {lightbox.post.images.length}
                </div>
              </>
            )}

            {lightbox.post.content && (
              <p className="mt-4 text-gray-300 text-sm text-center max-w-2xl mx-auto line-clamp-3">
                {lightbox.post.content}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}


