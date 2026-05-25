import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin, Phone, Mail, ChevronLeft, ChevronRight, X,
  Laptop, GraduationCap, Handshake, Gift, Clock, Coins, BookOpen
} from 'lucide-react';
import HeroSlideshow from '@/components/HeroSlideshow';
import DynamicIcon from '@/components/DynamicIcon';
import LightboxGallery from '@/components/LightboxGallery';
import { useSanityData } from '@/hooks/useSanityData';
import { fetchDembiDolloPage } from '@/services/sanity';
import { dembiDolloPageData } from '@/data/mockData';

const ICON_MAP: Record<string, React.ElementType> = {
  computer: Laptop,
  book: BookOpen,
  graduation: GraduationCap,
  handshake: Handshake,
  gift: Gift,
  clock: Clock,
  coins: Coins,
};

function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.disconnect();
      }
    }, { threshold: 0.15, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isIntersecting };
}

function AnimatedSection({
  children, className = '', delay = 0
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

// Image Gallery with Lightbox
function ImageGallery({
  images,
  title,
}: {
  images: { url: string; caption?: string }[];
  title: string;
}) {
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!images?.length) return null;

  const openLightbox = (index: number) => {
    setLightboxImages(images.map(i => i.url));
    setLightboxIndex(index);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <div
            key={i}
            className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md"
            onClick={() => openLightbox(i)}
          >
            <img
              src={img.url}
              alt={img.caption || title}
              className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
              {img.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-xs">{img.caption}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {lightboxImages.length > 0 && (
        <LightboxGallery
          images={lightboxImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxImages([])}
        />
      )}
    </>
  );
}

// Story Section — alternating layout
function StorySection({ story }: { story: typeof dembiDolloPageData.story }) {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-school-brand/10 text-school-brand text-sm font-bold rounded-full mb-4 tracking-wider">
            {story.sectionTitle}
          </span>
        </AnimatedSection>

        {/* Idea */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <AnimatedSection className={orderClass(0)}>
            <h3 className="font-display text-3xl font-bold text-school-brand mb-6">
              {story.ideaTitle}
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {story.ideaContent}
            </p>
          </AnimatedSection>
          <AnimatedSection className={orderClass(1)} delay={150}>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src={story.ideaImage}
                alt={story.ideaImageCaption}
                className="w-full h-72 md:h-80 object-cover"
              />
              {story.ideaImageCaption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-white text-sm">{story.ideaImageCaption}</p>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>

        {/* Location */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimatedSection className={orderClass(1)} delay={100}>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src={story.locationImage}
                alt={story.locationImageCaption}
                className="w-full h-72 md:h-80 object-cover"
              />
              {story.locationImageCaption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-white text-sm">{story.locationImageCaption}</p>
                </div>
              )}
            </div>
          </AnimatedSection>
          <AnimatedSection className={orderClass(0)} delay={250}>
            <div className="flex items-start gap-3 mb-4">
              <MapPin className="text-school-yellow mt-1 flex-shrink-0" size={24} />
              <h3 className="font-display text-3xl font-bold text-school-brand">
                {story.locationTitle}
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">
              {story.locationContent}
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function orderClass(n: number) {
  return 'order-1';
}

// Gallery teaser section
function GallerySection({ gallery }: { gallery: typeof dembiDolloPageData.gallery }) {
  return (
    <section className="py-16 bg-school-brand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            {gallery.sectionTitle}
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            {gallery.sectionSubtitle}
          </p>
        </AnimatedSection>
        <AnimatedSection delay={200}>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-school-brand font-semibold rounded-full hover:bg-school-yellow transition-colors"
          >
            View Full Gallery
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Generic section with image grid
function SectionWithGallery({
  title,
  description,
  images,
  badge,
  bgClass = 'bg-gray-50',
}: {
  title: string;
  description: string;
  images: { url: string; caption?: string }[];
  badge?: string;
  bgClass?: string;
}) {
  return (
    <section className={`py-16 md:py-20 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-10">
          {badge && (
            <span className="inline-block px-3 py-1 bg-school-yellow/20 text-school-yellow text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
              {badge}
            </span>
          )}
          <h2 className="font-display text-3xl md:text-4xl font-bold text-school-brand mb-4">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl text-lg">{description}</p>
        </AnimatedSection>
        <AnimatedSection delay={150}>
          <ImageGallery images={images} title={title} />
        </AnimatedSection>
      </div>
    </section>
  );
}

// Staff section
function StaffSection({ staff }: { staff: typeof dembiDolloPageData.staff }) {
  if (!staff.members?.length) return null;

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-school-brand/10 text-school-brand text-sm font-bold rounded-full mb-4 tracking-wider">
            {staff.sectionTitle}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-school-brand mb-4">
            {staff.sectionTitle}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {staff.sectionSubtitle}
          </p>
        </AnimatedSection>

        <div className="space-y-8">
          {staff.members.map((member, i) => (
            <AnimatedSection key={i} delay={i * 100}>
              <div className="bg-gray-50 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
                <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-md">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
                <div className="md:w-1/2">
                  <h3 className="font-display text-2xl font-bold text-school-brand mb-1">
                    {member.name}
                  </h3>
                  <p className="text-school-yellow font-medium mb-4">{member.role}</p>
                  {member.isGroupPhoto && (
                    <span className="inline-block px-3 py-1 bg-school-brand/10 text-school-brand text-xs font-semibold rounded-full">
                      Group Photo
                    </span>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// Community Support section
function CommunitySection({ cs }: { cs: typeof dembiDolloPageData.communitySupport }) {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-school-yellow/20 text-school-yellow text-sm font-bold rounded-full mb-4 tracking-wider uppercase">
            Together for Education
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-school-brand mb-4">
            {cs.sectionTitle}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {cs.sectionDescription}
          </p>
        </AnimatedSection>

        {/* Local & International */}
        <div className="grid md:grid-cols-2 gap-8 mb-14">
          <AnimatedSection delay={100}>
            <div className="bg-white rounded-2xl p-8 shadow-sm h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-school-brand flex items-center justify-center">
                  <MapPin size={20} className="text-white" />
                </div>
                <h3 className="font-display text-xl font-bold text-school-brand">
                  {cs.localTitle}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{cs.localDescription}</p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <div className="bg-white rounded-2xl p-8 shadow-sm h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-school-yellow flex items-center justify-center">
                  <GraduationCap size={20} className="text-white" />
                </div>
                <h3 className="font-display text-xl font-bold text-school-brand">
                  {cs.internationalTitle}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{cs.internationalDescription}</p>
            </div>
          </AnimatedSection>
        </div>

        {/* Initiatives */}
        {cs.initiatives?.length > 0 && (
          <div className="mb-6">
            <h3 className="font-display text-2xl font-bold text-school-brand text-center mb-8">
              How You Can Help
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cs.initiatives.map((init, i) => {
                const IconComp = ICON_MAP[init.initiativeType] || Gift;
                return (
                  <AnimatedSection key={i} delay={i * 80}>
                    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                      <div className="w-12 h-12 rounded-xl bg-school-brand/10 flex items-center justify-center mb-4 flex-shrink-0">
                        <IconComp size={24} className="text-school-brand" />
                      </div>
                      <h4 className="font-display text-lg font-bold text-school-brand mb-2">
                        {init.title}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                        {init.description}
                      </p>
                      {init.images?.length && (
                        <div className="mt-4 rounded-lg overflow-hidden">
                          <img
                            src={init.images[0].url}
                            alt={init.title}
                            className="w-full h-32 object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// Contact section
function ContactSection({ contact }: { contact: typeof dembiDolloPageData.contact }) {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <AnimatedSection>
            <span className="inline-block px-4 py-1 bg-school-brand/10 text-school-brand text-sm font-bold rounded-full mb-4 tracking-wider uppercase">
              {contact.sectionTitle}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-school-brand mb-4">
              {contact.sectionTitle}
            </h2>
            <p className="text-gray-600 mb-8 text-lg">{contact.sectionDescription}</p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <MapPin className="text-school-yellow mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-school-brand">Address</p>
                  <p className="text-gray-600">{contact.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="text-school-yellow mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-school-brand">Phone</p>
                  <a href={`tel:${contact.phone}`} className="text-gray-600 hover:text-school-brand transition-colors">
                    {contact.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-school-brand rounded-2xl p-8 text-white">
              <h3 className="font-display text-2xl font-bold mb-2">{contact.ctaTitle}</h3>
              <p className="text-white/80 mb-6">{contact.ctaDescription}</p>
              <a
                href={contact.ctaButtonLink}
                className="inline-flex items-center gap-2 px-6 py-3 bg-school-yellow text-school-brand font-bold rounded-full hover:bg-white transition-colors"
              >
                {contact.ctaButtonText}
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="rounded-2xl overflow-hidden shadow-lg h-full min-h-[400px]">
              <iframe
                src={contact.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '450px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Makko Billi School Dembi Dollo Location"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// Main Page
export default function DembiDollo() {
  const fetcher = useCallback(() => fetchDembiDolloPage(), []);
  const { data } = useSanityData(fetcher, dembiDolloPageData);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-school-brand font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative" style={{ height: '70vh', minHeight: 500 }}>
        <HeroSlideshow
          images={data.hero?.images || []}
          overlayColor={data.hero?.overlayColor}
          showDots={false}
          showArrows={false}
          autoPlay={true}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {data.hero?.title}
            </h1>
            {data.hero?.subtitle && (
              <p className="text-white/90 text-lg md:text-2xl font-medium">
                {data.hero.subtitle}
              </p>
            )}
          </div>
        </div>
        {/* Wave transition — positioned as the very bottom of the hero */}
        <div className="absolute -bottom-1 left-0 w-full overflow-hidden leading-none">
          <svg
            className="block w-full"
            style={{ height: 120 }}
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

      <StorySection story={data.story} />
      <GallerySection gallery={data.gallery} />

      {data.compoundSection?.images?.length > 0 && (
        <SectionWithGallery
          title={data.compoundSection.title}
          description={data.compoundSection.description}
          images={data.compoundSection.images}
          badge="Campus"
          bgClass="bg-white"
        />
      )}

      {data.classroomsSection?.images?.length > 0 && (
        <SectionWithGallery
          title={data.classroomsSection.title}
          description={data.classroomsSection.description}
          images={data.classroomsSection.images}
          badge="Learning"
          bgClass="bg-gray-50"
        />
      )}

      {data.activitiesSection?.images?.length > 0 && (
        <SectionWithGallery
          title={data.activitiesSection.title}
          description={data.activitiesSection.description}
          images={data.activitiesSection.images}
          badge="Student Life"
          bgClass="bg-white"
        />
      )}

      {data.staff?.members?.length > 0 && <StaffSection staff={data.staff} />}

      <CommunitySection cs={data.communitySupport} />

      <ContactSection contact={data.contact} />
    </div>
  );
}