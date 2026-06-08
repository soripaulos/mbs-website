import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin, Phone, Laptop, GraduationCap, Handshake, Gift, BookOpen, Mail, ChevronRight, Users, Clock, Coins
} from 'lucide-react';
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
    }, { threshold: 0.12, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isIntersecting };
}

function FadeUp({
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
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// Image Grid with Lightbox
function ImageGrid({
  images,
}: {
  images: { url: string; caption?: string }[];
}) {
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!images?.length) return null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <div
            key={i}
            className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-md"
            onClick={() => {
              setLightboxImages(images.map(x => x.url));
              setLightboxIndex(i);
            }}
          >
            <img
              src={img.url}
              alt={img.caption || ''}
              className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
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

// ── HERO ──────────────────────────────────────────────────────────────────────
function Hero({ hero }: { hero: typeof dembiDolloPageData.hero }) {
  const heroImage = hero.images?.[0];

  return (
    <div className="relative w-full bg-school-brand" style={{ height: '85vh', minHeight: 560 }}>
      {/* Background — bg-school-brand above is the fallback when the image fails to load */}
      {heroImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
      )}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(15,30,70,0.55) 0%, rgba(15,30,70,0.75) 100%)' }} />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-4xl">
          <FadeUp>
            <span className="inline-block px-5 py-1.5 bg-white/15 text-white/90 text-xs font-bold uppercase tracking-widest rounded-full mb-6 backdrop-blur-sm border border-white/20">
              Dembi Dollo Campus
            </span>
          </FadeUp>
          <FadeUp delay={100}>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              {hero.title}
            </h1>
          </FadeUp>
          <FadeUp delay={200}>
            <p className="text-white/80 text-lg md:text-2xl max-w-2xl mx-auto mb-10">
              {hero.subtitle}
            </p>
          </FadeUp>
          <FadeUp delay={300}>
            <a
              href="#contact"
              onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-school-yellow text-school-brand font-bold text-lg rounded-full hover:bg-white transition-colors shadow-lg"
            >
              Get Involved
              <ChevronRight size={20} />
            </a>
          </FadeUp>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/50 text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </div>
  );
}

// ── OUR STORY ─────────────────────────────────────────────────────────────────
function StorySection({ story }: { story: typeof dembiDolloPageData.story }) {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <FadeUp className="text-center mb-20">
          <span className="inline-block px-4 py-1 bg-school-brand/10 text-school-brand text-sm font-bold rounded-full mb-4 tracking-wider uppercase">
            {story.sectionTitle}
          </span>
        </FadeUp>

        {/* The Idea */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <FadeUp>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-school-brand flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-white font-display font-bold text-2xl">✦</span>
              </div>
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-school-brand mb-3">
                  {story.ideaTitle}
                </h2>
                <div className="w-12 h-1 bg-school-yellow rounded-full" />
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">
              {story.ideaContent}
            </p>
          </FadeUp>
          {!story.ideaImage && (
            <p className="text-gray-400 italic">Image coming soon</p>
          )}
          {story.ideaImage && (
            <FadeUp delay={150}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={story.ideaImage}
                  alt={story.ideaImageCaption}
                  className="w-full h-72 md:h-80 object-cover"
                />
                {story.ideaImageCaption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white text-sm">{story.ideaImageCaption}</p>
                  </div>
                )}
              </div>
            </FadeUp>
          )}
        </div>

        {/* The Location */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {story.locationImage ? (
            <FadeUp className="order-2 md:order-1" delay={100}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={story.locationImage}
                  alt={story.locationImageCaption}
                  className="w-full h-72 md:h-80 object-cover"
                />
                {story.locationImageCaption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white text-sm">{story.locationImageCaption}</p>
                  </div>
                )}
              </div>
            </FadeUp>
          ) : (
            <p className="text-gray-400 italic order-2 md:order-1">Image coming soon</p>
          )}
          <FadeUp className="order-1 md:order-2" delay={150}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-school-brand flex items-center justify-center flex-shrink-0 shadow-lg">
                <MapPin size={24} className="text-white" />
              </div>
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-school-brand mb-3">
                  {story.locationTitle}
                </h2>
                <div className="w-12 h-1 bg-school-yellow rounded-full" />
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">
              {story.locationContent}
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ── CAMPUS GALLERY TEASER ──────────────────────────────────────────────────────
function CampusTeaser({ gallery }: { gallery: typeof dembiDolloPageData.gallery }) {
  return (
    <section className="py-20 bg-school-brand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeUp>
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <MapPin size={18} className="text-school-yellow" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              {gallery.sectionTitle}
            </h2>
          </div>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            {gallery.sectionSubtitle}
          </p>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-school-brand font-bold text-lg rounded-full hover:bg-school-yellow transition-colors shadow-xl"
          >
            View Full Gallery
            <ChevronRight size={20} />
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}

// ── COMPOUND / CLASSROOMS / ACTIVITIES ─────────────────────────────────────────
function SectionBlock({
  title,
  description,
  images,
  badge,
  bgClass = 'bg-white',
}: {
  title: string;
  description: string;
  images: { url: string; caption?: string }[];
  badge?: string;
  bgClass?: string;
}) {
  if (!images?.length) return null;

  return (
    <section className={`py-20 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end gap-6">
            <div>
              {badge && (
                <span className="inline-block mb-3 px-3 py-1 bg-school-yellow/20 text-school-brand text-xs font-bold uppercase tracking-widest rounded-full">
                  {badge}
                </span>
              )}
              <h2 className="font-display text-3xl md:text-4xl font-bold text-school-brand">
                {title}
              </h2>
            </div>
            <div className="w-16 h-1 bg-school-yellow rounded-full sm:mb-2" />
          </div>
          <p className="text-gray-500 mt-4 max-w-xl text-lg leading-relaxed">
            {description}
          </p>
        </FadeUp>
        <FadeUp delay={120}>
          <ImageGrid images={images} />
        </FadeUp>
      </div>
    </section>
  );
}

// ── STAFF ─────────────────────────────────────────────────────────────────────
function StaffSection({ staff }: { staff: typeof dembiDolloPageData.staff }) {
  if (!staff.members?.length) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center mb-14">
          <span className="inline-block px-4 py-1 bg-school-brand/10 text-school-brand text-sm font-bold rounded-full mb-4 tracking-wider uppercase">
            {staff.sectionTitle}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-school-brand mb-4">
            Meet Our Team
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            {staff.sectionSubtitle}
          </p>
        </FadeUp>

        <div className="space-y-8">
          {staff.members.map((member, i) => (
            <FadeUp key={i} delay={i * 100}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-md flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2 shrink-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
                <div className="p-8 md:p-10 flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Users size={20} className="text-school-yellow" />
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                      {member.role}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-school-brand mb-2">
                    {member.name}
                  </h3>
                  {member.isGroupPhoto && (
                    <span className="inline-block mt-2 px-3 py-1 bg-school-brand/10 text-school-brand text-xs font-semibold rounded-full">
                      Group Photo
                    </span>
                  )}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── COMMUNITY SUPPORT ──────────────────────────────────────────────────────────
function CommunitySection({ cs }: { cs: typeof dembiDolloPageData.communitySupport }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center mb-4">
          <span className="inline-block px-4 py-1 bg-school-yellow/20 text-school-brand text-sm font-bold rounded-full mb-4 tracking-wider uppercase">
            Together for Education
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-school-brand mb-4">
            {cs.sectionTitle}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            {cs.sectionDescription}
          </p>
        </FadeUp>

        {/* Local & International */}
        <div className="grid md:grid-cols-2 gap-6 mb-14">
          {[
            { title: cs.localTitle, desc: cs.localDescription, icon: <MapPin size={20} />, color: 'bg-school-brand' },
            { title: cs.internationalTitle, desc: cs.internationalDescription, icon: <GraduationCap size={20} />, color: 'bg-school-yellow' },
          ].map((item, i) => (
            <FadeUp key={i} delay={i * 100}>
              <div className="bg-gray-50 rounded-2xl p-8 h-full border border-gray-100">
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-5 text-white`}>
                  {item.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-school-brand mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Initiatives */}
        {cs.initiatives?.length > 0 && (
          <div>
            <FadeUp className="mb-10">
              <h3 className="font-display text-2xl font-bold text-school-brand text-center">
                How You Can Help
              </h3>
            </FadeUp>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cs.initiatives.map((init, i) => {
                const IconComp = ICON_MAP[init.initiativeType] || Gift;
                return (
                  <FadeUp key={i} delay={i * 80}>
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md hover:border-school-brand/20 transition-all duration-300 h-full flex flex-col">
                      <div className="w-12 h-12 rounded-xl bg-school-brand/10 flex items-center justify-center mb-5 flex-shrink-0">
                        <IconComp size={22} className="text-school-brand" />
                      </div>
                      <h4 className="font-display text-lg font-bold text-school-brand mb-3">
                        {init.title}
                      </h4>
                      <p className="text-gray-500 text-sm leading-relaxed flex-grow">
                        {init.description}
                      </p>
                      {init.images?.length ? (
                        <div className="mt-4 rounded-xl overflow-hidden">
                          <img
                            src={init.images[0].url}
                            alt={init.title}
                            className="w-full h-36 object-cover"
                          />
                        </div>
                      ) : null}
                    </div>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ── CONTACT ────────────────────────────────────────────────────────────────────
function ContactSection({ contact }: { contact: typeof dembiDolloPageData.contact }) {
  return (
    <section id="contact" className="py-20 bg-school-brand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <FadeUp>
            <span className="inline-block px-4 py-1 bg-white/15 text-white/80 text-sm font-bold rounded-full mb-6 tracking-wider uppercase">
              {contact.sectionTitle}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Visit &amp; Support Us
            </h2>
            <p className="text-white/60 mb-10 text-lg">{contact.sectionDescription}</p>

            <div className="space-y-6">
              {[
                { icon: <MapPin size={18} />, label: 'Address', value: contact.address },
                { icon: <Phone size={18} />, label: 'Phone', value: contact.phone, href: `tel:${contact.phone}` },
                { icon: <Mail size={18} />, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
              ].map((row, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-school-yellow mt-0.5 flex-shrink-0">
                    {row.icon}
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-1">{row.label}</p>
                    {row.href ? (
                      <a href={row.href} className="text-white hover:text-school-yellow transition-colors text-base">
                        {row.value}
                      </a>
                    ) : (
                      <p className="text-white text-base">{row.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="font-display text-xl font-bold text-white mb-2">
                {contact.ctaTitle}
              </h3>
              <p className="text-white/60 mb-6 text-sm">{contact.ctaDescription}</p>
              <a
                href={contact.ctaButtonLink}
                className="inline-flex items-center gap-2 px-6 py-3 bg-school-yellow text-school-brand font-bold rounded-full hover:bg-white transition-colors"
              >
                {contact.ctaButtonText}
                <ChevronRight size={18} />
              </a>
            </div>
          </FadeUp>

          <FadeUp delay={150}>
            <div className="rounded-2xl overflow-hidden shadow-2xl h-full min-h-[400px]">
              <iframe
                src={contact.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 480 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Makko Billi School Dembi Dollo"
              />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ── MAIN PAGE ──────────────────────────────────────────────────────────────────
export default function DembiDollo() {
  const fetcher = useCallback(() => fetchDembiDolloPage(), []);
  const { data } = useSanityData(fetcher, dembiDolloPageData);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-school-brand/30 border-t-school-brand rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Hero hero={data.hero} />
      <StorySection story={data.story} />
      <CampusTeaser gallery={data.gallery} />

      {data.compoundSection?.images?.length > 0 && (
        <SectionBlock
          title={data.compoundSection.title}
          description={data.compoundSection.description}
          images={data.compoundSection.images}
          badge="Campus"
          bgClass="bg-white"
        />
      )}

      {data.classroomsSection?.images?.length > 0 && (
        <SectionBlock
          title={data.classroomsSection.title}
          description={data.classroomsSection.description}
          images={data.classroomsSection.images}
          badge="Learning"
          bgClass="bg-gray-50"
        />
      )}

      {data.activitiesSection?.images?.length > 0 && (
        <SectionBlock
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