import { useState, useEffect, useRef, useCallback } from 'react';
import { Phone, Mail, MapPin, Heart, Globe, Users, ChevronLeft, ChevronRight, X, BookOpen, Lightbulb, Map } from 'lucide-react';
import HeroSlideshow from '@/components/HeroSlideshow';
import { dembiDolloPageData as mockData } from '@/data/mockData';
import { useSanityData } from '@/hooks/useSanityData';
import { fetchDembiDolloPageData } from '@/services/sanity';
import type { DembiDolloGalleryItem, DembiDolloStaff, CommunityInitiative } from '@/types';

// ═══════════════════════════════════════
//  Animation Utilities
// ═══════════════════════════════════════
function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.disconnect();
      }
    }, { threshold: 0.12, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return { ref, isIntersecting };
}

function AnimatedSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isIntersecting } = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ═══════════════════════════════════════
//  Section Divider
// ═══════════════════════════════════════
function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-2">
      <div className="h-px w-16 bg-school-yellow/40" />
      <div className="mx-3 w-2 h-2 bg-school-yellow rounded-full" />
      <div className="h-px w-16 bg-school-yellow/40" />
    </div>
  );
}

// ═══════════════════════════════════════
//  Gallery Feature Sections
// ═══════════════════════════════════════
function CampusSection({
  title,
  description,
  images,
  bgColorClass = "bg-white",
}: {
  title?: string;
  description?: string;
  images: DembiDolloGalleryItem[];
  bgColorClass?: string;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Close lightbox on escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight' && lightboxIndex !== null && images)
        setLightboxIndex((prev) => (prev! + 1) % images.length);
      if (e.key === 'ArrowLeft' && lightboxIndex !== null && images)
        setLightboxIndex((prev) => (prev! - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, images]);

  if (!title && !images) return null;

  return (
    <section className={`py-16 md:py-24 ${bgColorClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-school-brand mb-3">
            {title}
          </h2>
          {description && (
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              {description}
            </p>
          )}
          <SectionDivider />
        </AnimatedSection>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images && images.length > 0 ? (
            images.map((item, index) => (
              <AnimatedSection key={index} delay={index * 60}>
                <div
                  className="group relative rounded-xl overflow-hidden cursor-pointer aspect-square shadow-md hover:shadow-xl transition-all duration-500"
                  onClick={() => setLightboxIndex(index)}
                >
                  <img
                    src={item.image}
                    alt={item.caption || `Photo ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {item.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      {item.caption}
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-400">
              <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">Photos coming soon</p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && images && images.length > 0 && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white transition"
            onClick={() => setLightboxIndex(null)}
          >
            <X size={32} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition p-2"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
            }}
          >
            <ChevronLeft size={36} />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition p-2"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex + 1) % images.length);
            }}
          >
            <ChevronRight size={36} />
          </button>
          <img
            src={images[lightboxIndex].image}
            alt={images[lightboxIndex].caption || ''}
            className="max-w-full max-h-[85vh] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {images[lightboxIndex].caption && (
            <p className="absolute bottom-6 text-white text-center text-lg font-medium">
              {images[lightboxIndex].caption}
            </p>
          )}
        </div>
      )}
    </section>
  );
}

// ═══════════════════════════════════════
//  2. Story Section
// ═══════════════════════════════════════
function StorySection({
  story,
}: {
  story: {
    sectionTitle: string;
    ideaTitle: string;
    ideaContent: string;
    ideaImage?: string;
    locationTitle: string;
    locationContent: string;
    locationImage?: string;
  };
}) {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-school-brand/5 to-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-school-yellow/10 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-20 -right-20 w-72 h-72 bg-school-pink/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '3s' }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-school-brand mb-3">
            {story?.sectionTitle || 'Our Story'}
          </h2>
          <SectionDivider />
        </AnimatedSection>

        {/* The Idea */}
        <div className="flex flex-col md:flex-row items-center gap-10 mb-20">
          <AnimatedSection className="w-full md:w-1/2" delay={100}>
            <div className="relative group">
              <div className="absolute inset-0 bg-school-yellow/20 rounded-2xl transform rotate-3 transition-transform duration-500 group-hover:rotate-6" />
              {story?.ideaImage ? (
                <img
                  src={story.ideaImage}
                  alt={story?.ideaTitle}
                  className="w-full h-80 object-cover rounded-2xl shadow-xl relative z-10 transform transition-transform duration-500 group-hover:-translate-y-2"
                />
              ) : (
                <div className="w-full h-80 bg-gradient-to-br from-school-brand/10 to-school-yellow/10 rounded-2xl shadow-xl relative z-10 flex items-center justify-center">
                  <Lightbulb size={64} className="text-school-brand/30" />
                </div>
              )}
            </div>
          </AnimatedSection>

          <AnimatedSection className="w-full md:w-1/2" delay={200}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-school-yellow/20 rounded-xl flex items-center justify-center">
                <Lightbulb size={24} className="text-school-brand" />
              </div>
              <h3 className="font-display text-2xl font-bold text-gray-800">
                {story?.ideaTitle || 'The Idea'}
              </h3>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              {story?.ideaContent}
            </p>
            <div className="h-1 w-24 bg-school-yellow rounded-full mt-6" />
          </AnimatedSection>
        </div>

        {/* The Location */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-10">
          <AnimatedSection className="w-full md:w-1/2" delay={100}>
            <div className="relative group">
              <div className="absolute inset-0 bg-school-pink/20 rounded-2xl transform -rotate-3 transition-transform duration-500 group-hover:-rotate-6" />
              {story?.locationImage ? (
                <img
                  src={story.locationImage}
                  alt={story?.locationTitle}
                  className="w-full h-80 object-cover rounded-2xl shadow-xl relative z-10 transform transition-transform duration-500 group-hover:-translate-y-2"
                />
              ) : (
                <div className="w-full h-80 bg-gradient-to-br from-school-pink/10 to-school-brand/10 rounded-2xl shadow-xl relative z-10 flex items-center justify-center">
                  <Map size={64} className="text-school-pink/30" />
                </div>
              )}
            </div>
          </AnimatedSection>

          <AnimatedSection className="w-full md:w-1/2" delay={200}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-school-pink/20 rounded-xl flex items-center justify-center">
                <Map size={24} className="text-school-pink" />
              </div>
              <h3 className="font-display text-2xl font-bold text-gray-800">
                {story?.locationTitle || 'The Location'}
              </h3>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              {story?.locationContent}
            </p>
            <div className="h-1 w-24 bg-school-pink rounded-full mt-6" />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
//  3. Community Support Section
// ═══════════════════════════════════════
function CommunityImageCarousel({ images }: { images: DembiDolloGalleryItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
        <Heart size={48} className="text-gray-300" />
      </div>
    );
  }

  return (
    <div className="relative rounded-xl overflow-hidden aspect-[4/3] shadow-lg group">
      {images.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={item.image}
            alt={item.caption || `Community support ${index + 1}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      {images[currentIndex]?.caption && (
        <p className="absolute bottom-3 left-3 right-3 text-white text-sm font-medium">
          {images[currentIndex].caption}
        </p>
      )}
      {images.length > 1 && (
        <div className="absolute bottom-3 right-3 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex ? 'bg-school-yellow w-5' : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CommunitySupportSection({
  communitySupport,
}: {
  communitySupport: {
    sectionTitle: string;
    sectionDescription: string;
    initiatives: CommunityInitiative[];
  };
}) {
  const initiatives = communitySupport?.initiatives || [];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-school-brand mb-3">
            {communitySupport?.sectionTitle || 'Community Support'}
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {communitySupport?.sectionDescription}
          </p>
          <SectionDivider />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initiatives.length > 0 ? (
            initiatives.map((initiative, idx) => (
              <AnimatedSection key={idx} delay={idx * 150}>
                <div className="bg-gradient-to-b from-gray-50 to-white hover:from-school-brand/5 hover:to-white transition-colors duration-300 rounded-2xl p-6 h-full shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-school-brand/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
                      <Heart size={20} className="text-school-pink" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-gray-800">
                      {initiative.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3 hover:line-clamp-none transition-all">
                    {initiative.description}
                  </p>
                  <CommunityImageCarousel images={initiative.images || []} />
                </div>
              </AnimatedSection>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-400">
              <Heart size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">Support initiatives coming soon</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
//  4. Staff Section — Matching main Staff page style
// ═══════════════════════════════════════
function StaffCard({ member, index }: { member: DembiDolloStaff; index: number }) {
  // Alternate accent colors
  const bgAccent = index % 2 === 0 ? 'bg-school-brand/95' : 'bg-school-pink/95';

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group relative h-[380px]">
      {/* Full Image */}
      <img
        src={member.image || 'https://via.placeholder.com/400x500?text=No+Image'}
        alt={member.name}
        className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {/* Name & Role — always visible */}
      <div className="absolute bottom-0 left-0 w-full text-white p-4 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="font-bold text-lg mb-1">{member.name}</h3>
        {member.role && (
          <p className="text-school-yellow font-medium text-xs uppercase tracking-wide">
            {member.role}
          </p>
        )}
      </div>

      {/* Contact — slide up on hover */}
      <div
        className={`absolute bottom-0 left-0 w-full ${bgAccent} backdrop-blur-sm p-6 text-white transition-transform duration-500 transform translate-y-full group-hover:translate-y-0`}
      >
        <h3 className="font-bold text-xl mb-1">{member.name}</h3>
        {member.role && (
          <p className="text-school-yellow font-medium text-sm mb-4 uppercase tracking-wide">
            {member.role}
          </p>
        )}

        <div className="space-y-3">
          {member.phones && member.phones.length > 0 && (
            <a
              href={`tel:${member.phones[0]}`}
              className="flex items-center text-white/90 hover:text-school-yellow transition text-sm bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-white/20"
            >
              <Phone size={16} className="mr-3 text-school-yellow" />
              {member.phones[0]}
            </a>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="flex items-center text-white/90 hover:text-school-yellow transition text-sm bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-white/20"
            >
              <Mail size={16} className="mr-3 text-school-yellow" />
              <span className="truncate">{member.email}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function StaffSection({
  staff,
}: {
  staff: {
    sectionTitle: string;
    sectionSubtitle: string;
    members: DembiDolloStaff[];
  };
}) {
  const members = staff?.members || [];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-school-brand/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-school-brand mb-3">
            {staff?.sectionTitle || 'Our Team'}
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {staff?.sectionSubtitle}
          </p>
          <SectionDivider />
        </AnimatedSection>

        {members.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {members.map((member, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <StaffCard member={member} index={index} />
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <AnimatedSection className="text-center py-16 text-gray-400">
            <Users size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">Staff profiles coming soon</p>
            <p className="text-sm mt-1">Add team members in Sanity Studio</p>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
//  5. Contact & Location Section
// ═══════════════════════════════════════
function ContactSection({
  contact,
}: {
  contact: {
    sectionTitle: string;
    sectionDescription: string;
    phone: string;
    email?: string;
    address?: string;
    mapEmbedUrl: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButtonText: string;
    ctaButtonLink?: string;
  };
}) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-school-brand mb-3">
            {contact?.sectionTitle || 'Visit & Support Us'}
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {contact?.sectionDescription}
          </p>
          <SectionDivider />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Contact Info Cards */}
          <AnimatedSection delay={100}>
            <div className="space-y-6">
              {/* Phone */}
              {contact?.phone && (
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100 group">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-school-brand/10 rounded-xl flex items-center justify-center group-hover:bg-school-brand group-hover:text-white transition-colors">
                      <Phone size={24} className="text-school-brand group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Phone</p>
                      <a
                        href={`tel:${contact.phone}`}
                        className="text-lg font-semibold text-school-brand hover:text-school-pink transition-colors"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Email */}
              {contact?.email && (
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100 group">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-school-yellow/20 rounded-xl flex items-center justify-center group-hover:bg-school-yellow transition-colors">
                      <Mail size={24} className="text-school-brand" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Email</p>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-lg font-semibold text-school-brand hover:text-school-pink transition-colors"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Address */}
              {contact?.address && (
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100 group">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-school-pink/20 rounded-xl flex items-center justify-center group-hover:bg-school-pink transition-colors">
                      <MapPin size={24} className="text-school-pink group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Address</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {contact.address}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </AnimatedSection>

          {/* Map */}
          <AnimatedSection delay={200}>
            {contact?.mapEmbedUrl ? (
              <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 h-full min-h-[350px]">
                <iframe
                  src={contact.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 350 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Makko Billi School — Dembi Dollo Location"
                  className="w-full h-full"
                />
              </div>
            ) : (
              <div className="rounded-2xl bg-gray-100 h-full min-h-[350px] flex items-center justify-center">
                <MapPin size={48} className="text-gray-300" />
              </div>
            )}
          </AnimatedSection>
        </div>

        {/* Community Support CTA */}
        {contact?.ctaTitle && (
          <AnimatedSection delay={300}>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-school-brand to-school-dark-blue p-8 md:p-12 text-center text-white">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-school-yellow/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-school-pink/10 rounded-full translate-x-1/4 translate-y-1/4" />

              <div className="relative z-10">
                <div className="w-16 h-16 bg-school-yellow/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart size={32} className="text-school-yellow" />
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  {contact.ctaTitle}
                </h3>
                <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                  {contact.ctaDescription}
                </p>
                {contact.ctaButtonText && (
                  <a
                    href={contact.ctaButtonLink || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-school-yellow text-school-brand font-bold rounded-full hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    <Heart size={20} />
                    {contact.ctaButtonText}
                  </a>
                )}
              </div>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
//  Main Dembi Dollo Page
// ═══════════════════════════════════════
export default function DembiDollo() {
  const fetcher = useCallback(() => fetchDembiDolloPageData(), []);
  const { data: pageData } = useSanityData(fetcher, mockData);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <HeroSlideshow
        images={pageData?.hero?.images}
        title={pageData?.hero?.title}
        subtitle={pageData?.hero?.subtitle}
        overlayColor={pageData?.hero?.overlayColor}
      />

      {/* Campus Sections */}
      <CampusSection
        title={pageData?.compoundSection?.title}
        description={pageData?.compoundSection?.description}
        images={pageData?.compoundSection?.images || []}
        bgColorClass="bg-white"
      />
      <CampusSection
        title={pageData?.classroomsSection?.title}
        description={pageData?.classroomsSection?.description}
        images={pageData?.classroomsSection?.images || []}
        bgColorClass="bg-gray-50/50"
      />
      <CampusSection
        title={pageData?.activitiesSection?.title}
        description={pageData?.activitiesSection?.description}
        images={pageData?.activitiesSection?.images || []}
        bgColorClass="bg-white"
      />

      {/* Story */}
      <StorySection story={pageData?.story} />

      {/* Community Support */}
      <CommunitySupportSection communitySupport={pageData?.communitySupport} />

      {/* Staff */}
      <StaffSection staff={pageData?.staff} />

      {/* Contact & Location */}
      <ContactSection contact={pageData?.contact} />
    </div>
  );
}
