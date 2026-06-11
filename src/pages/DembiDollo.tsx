import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Laptop,
  GraduationCap,
  Handshake,
  Gift,
  BookOpen,
  Users,
  ArrowUpRight,
  ArrowDown,
  Lightbulb,
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import WordReveal from '@/components/WordReveal';
import SectionHeading from '@/components/SectionHeading';
import Marquee from '@/components/Marquee';
import LightboxGallery from '@/components/LightboxGallery';
import { useParallax } from '@/hooks/useParallax';
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

// ── IMAGE GRID WITH LIGHTBOX ─────────────────────────────────────────────────
function ImageGrid({ images }: { images: { url: string; caption?: string }[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!images?.length) return null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            className="img-zoom block overflow-hidden rounded-2xl bg-ink/5"
            onClick={() => setLightboxIndex(i)}
            aria-label={img.caption || 'View photo'}
          >
            <img
              src={img.url}
              alt={img.caption || ''}
              className="h-40 w-full object-cover md:h-56"
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>
      {lightboxIndex !== null && (
        <LightboxGallery
          images={images.map(x => x.url)}
          captions={images.map(x => x.caption)}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}

// ── HERO — full-bleed editorial ──────────────────────────────────────────────
function Hero({ hero }: { hero: typeof dembiDolloPageData.hero }) {
  const heroImage = hero.images?.[0];

  return (
    <header className="relative flex min-h-[88svh] flex-col justify-end overflow-hidden bg-night">
      {heroImage && (
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/45 to-night/25" />

      <div className="relative mx-auto w-full max-w-[1200px] px-5 pb-14 pt-40 md:px-8 md:pb-20">
        <Reveal variant="fade">
          <div className="mb-6 flex items-center gap-3 font-label text-[11px] font-semibold uppercase tracking-[0.3em] text-bone/70 md:text-xs">
            <span className="text-sun">Campus 02</span>
            <span className="h-1 w-1 rotate-45 bg-sun" />
            <span>Kellem Wollega, Oromia</span>
          </div>
        </Reveal>
        <WordReveal
          text={hero.title}
          as="h1"
          delay={100}
          className="max-w-4xl font-display text-[2.6rem] font-bold leading-[0.98] tracking-tight text-bone sm:text-6xl md:text-7xl"
        />
        <div className="mt-7 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <Reveal variant="fade" delay={400}>
            <p className="max-w-md text-base leading-relaxed text-bone/70 md:text-lg">
              {hero.subtitle}
            </p>
          </Reveal>
          <Reveal variant="fade" delay={500}>
            <a
              href="#contact"
              onClick={e => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-sun px-7 py-3.5 font-label text-[13px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-bone"
            >
              Get Involved
              <ArrowDown size={15} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </Reveal>
        </div>
      </div>
    </header>
  );
}

// ── STORY ────────────────────────────────────────────────────────────────────
function StoryImage({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  const ref = useParallax<HTMLImageElement>(18);
  return (
    <figure>
      <div className="overflow-hidden rounded-3xl bg-ink/5">
        <div className="aspect-[4/3]">
          <img
            ref={ref}
            src={src}
            alt={alt}
            className="h-full w-full scale-[1.12] object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      {caption && (
        <figcaption className="mt-3 font-label text-[11px] font-medium uppercase tracking-[0.18em] text-ink/40">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function StorySection({ story }: { story: typeof dembiDolloPageData.story }) {
  return (
    <section className="bg-bone py-16 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <SectionHeading
          index="01"
          eyebrow={story.sectionTitle || 'Our Story'}
          title="How It All Started"
          className="mb-12 md:mb-20"
        />

        {/* The Idea */}
        <div className="mb-16 grid items-center gap-10 md:mb-24 md:grid-cols-2 md:gap-16">
          <div>
            <Reveal variant="fade">
              <div className="mb-5 flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-sun">
                  <Lightbulb size={20} />
                </span>
                <h3 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
                  {story.ideaTitle}
                </h3>
              </div>
              <p className="leading-relaxed text-ink/65 md:text-lg">{story.ideaContent}</p>
            </Reveal>
          </div>
          {story.ideaImage && (
            <Reveal variant="fade" delay={150}>
              <StoryImage src={story.ideaImage} alt={story.ideaTitle} caption={story.ideaImageCaption} />
            </Reveal>
          )}
        </div>

        {/* The Location */}
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          {story.locationImage && (
            <Reveal variant="fade" className="order-2 md:order-1">
              <StoryImage
                src={story.locationImage}
                alt={story.locationTitle}
                caption={story.locationImageCaption}
              />
            </Reveal>
          )}
          <div className="order-1 md:order-2">
            <Reveal variant="fade" delay={120}>
              <div className="mb-5 flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-bone">
                  <MapPin size={20} />
                </span>
                <h3 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
                  {story.locationTitle}
                </h3>
              </div>
              <p className="leading-relaxed text-ink/65 md:text-lg">{story.locationContent}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── CAMPUS TEASER ────────────────────────────────────────────────────────────
function CampusTeaser({ gallery }: { gallery: typeof dembiDolloPageData.gallery }) {
  return (
    <section className="border-y border-ink/10 bg-bone">
      <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-6 px-5 py-12 md:flex-row md:items-center md:px-8 md:py-16">
        <div>
          <WordReveal
            text={gallery.sectionTitle}
            as="h2"
            className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl"
          />
          <Reveal variant="fade" delay={200}>
            <p className="mt-2 text-ink/55 md:text-lg">{gallery.sectionSubtitle}</p>
          </Reveal>
        </div>
        <Link
          to="/gallery"
          className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-label text-[13px] font-semibold uppercase tracking-[0.12em] text-bone transition-colors hover:bg-brand"
        >
          View Full Gallery
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </section>
  );
}

// ── COMPOUND / CLASSROOMS / ACTIVITIES ───────────────────────────────────────
function SectionBlock({
  index,
  eyebrow,
  title,
  description,
  images,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description: string;
  images: { url: string; caption?: string }[];
}) {
  if (!images?.length) return null;

  return (
    <section className="border-t border-ink/10 bg-bone py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <SectionHeading
          index={index}
          eyebrow={eyebrow}
          title={title}
          subtitle={description}
          className="mb-10 md:mb-12"
        />
        <Reveal variant="fade" delay={100}>
          <ImageGrid images={images} />
        </Reveal>
      </div>
    </section>
  );
}

// ── STAFF ────────────────────────────────────────────────────────────────────
function StaffSection({ staff }: { staff: typeof dembiDolloPageData.staff }) {
  if (!staff.members?.length) return null;

  return (
    <section className="noise relative overflow-hidden bg-night py-16 text-bone md:py-28">
      <div className="relative mx-auto max-w-[1200px] px-5 md:px-8">
        <SectionHeading
          index="05"
          eyebrow={staff.sectionTitle || 'Our Team'}
          title="The People On the Ground"
          subtitle={staff.sectionSubtitle}
          dark
          className="mb-12 md:mb-16"
        />

        <div className="space-y-5">
          {staff.members.map((member, i) => (
            <Reveal key={i} variant="fade" delay={i * 90}>
              <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-white/10 md:grid-cols-2">
                <div className="img-zoom">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-60 w-full object-cover md:h-80"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex flex-col justify-center p-7 md:p-12">
                  <div className="flex items-center gap-2.5 font-label text-[11px] font-semibold uppercase tracking-[0.25em] text-sun">
                    <Users size={13} />
                    {member.role}
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-bold tracking-tight md:text-3xl">
                    {member.name}
                  </h3>
                  {member.isGroupPhoto && (
                    <span className="mt-4 w-fit rounded-full border border-white/15 px-3.5 py-1 font-label text-[10px] font-semibold uppercase tracking-[0.16em] text-bone/55">
                      Group Photo
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── COMMUNITY SUPPORT ────────────────────────────────────────────────────────
function CommunitySection({ cs }: { cs: typeof dembiDolloPageData.communitySupport }) {
  return (
    <section className="bg-bone py-16 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <SectionHeading
          index="06"
          eyebrow="Together for education"
          title={cs.sectionTitle || 'Community Support'}
          subtitle={cs.sectionDescription}
          className="mb-12 md:mb-16"
        />

        {/* Local & International */}
        <div className="mb-14 grid gap-5 md:grid-cols-2">
          {[
            { title: cs.localTitle, desc: cs.localDescription, icon: MapPin },
            { title: cs.internationalTitle, desc: cs.internationalDescription, icon: GraduationCap },
          ].map((item, i) => (
            <Reveal key={i} variant="fade" delay={i * 110}>
              <div className="group h-full rounded-3xl border border-ink/10 bg-white p-7 transition-colors duration-300 hover:border-ink/30 md:p-9">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-sun">
                    <item.icon size={19} />
                  </span>
                  <span className="font-label text-xs font-medium text-ink/25">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-ink md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-ink/55">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Initiatives */}
        {cs.initiatives?.length > 0 && (
          <div>
            <Reveal variant="fade" className="mb-9">
              <h3 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
                How You Can Help
              </h3>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cs.initiatives.map((init, i) => {
                const IconComp = ICON_MAP[init.initiativeType] || Gift;
                return (
                  <Reveal key={i} variant="fade" delay={(i % 3) * 90}>
                    <div className="flex h-full flex-col rounded-3xl border border-ink/10 bg-white p-6 transition-colors duration-300 hover:border-ink/30 md:p-7">
                      <div className="flex items-center justify-between">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-bone text-brand">
                          <IconComp size={18} />
                        </span>
                        <span className="font-label text-xs font-medium text-ink/25">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <h4 className="mt-5 font-display text-lg font-bold tracking-tight text-ink">
                        {init.title}
                      </h4>
                      <p className="mt-2 flex-grow text-sm leading-relaxed text-ink/55">
                        {init.description}
                      </p>
                      {init.images?.length ? (
                        <div className="img-zoom mt-5 overflow-hidden rounded-2xl">
                          <img
                            src={init.images[0].url}
                            alt={init.title}
                            className="h-36 w-full object-cover"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      ) : null}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ── CONTACT ──────────────────────────────────────────────────────────────────
function ContactSection({ contact }: { contact: typeof dembiDolloPageData.contact }) {
  return (
    <section id="contact" className="noise relative overflow-hidden bg-night py-16 text-bone md:py-28">
      <div className="relative mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              index="07"
              eyebrow={contact.sectionTitle || 'Visit & support us'}
              title="Come See It for Yourself"
              subtitle={contact.sectionDescription}
              dark
            />

            <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {[
                { icon: MapPin, label: 'Address', value: contact.address, href: undefined as string | undefined },
                { icon: Phone, label: 'Phone', value: contact.phone, href: `tel:${contact.phone}` },
                { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
              ].map((row, i) => (
                <div key={i} className="flex items-center gap-5 py-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-sun">
                    <row.icon size={16} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-label text-[10px] font-semibold uppercase tracking-[0.22em] text-bone/40">
                      {row.label}
                    </span>
                    {row.href ? (
                      <a
                        href={row.href}
                        className="break-all font-medium transition-colors hover:text-sun"
                      >
                        {row.value}
                      </a>
                    ) : (
                      <span className="font-medium">{row.value}</span>
                    )}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-9 rounded-3xl border border-white/10 bg-white/5 p-7 md:p-8">
              <h3 className="font-display text-xl font-bold tracking-tight">{contact.ctaTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-bone/55">{contact.ctaDescription}</p>
              <a
                href={contact.ctaButtonLink}
                className="group mt-6 inline-flex items-center gap-2 rounded-full bg-sun px-6 py-3 font-label text-xs font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-bone"
              >
                {contact.ctaButtonText}
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </div>

          <Reveal variant="fade" delay={150}>
            <div className="overflow-hidden rounded-3xl border border-white/10">
              <iframe
                src={contact.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 520 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Makko Billi School Dembi Dollo"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── PAGE ─────────────────────────────────────────────────────────────────────
export default function DembiDollo() {
  const fetcher = useCallback(() => fetchDembiDolloPage(), []);
  const { data } = useSanityData(fetcher, dembiDolloPageData);

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bone">
        <div className="flex flex-col items-center gap-4">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-ink/15 border-t-ink" />
          <p className="font-label text-xs font-medium uppercase tracking-[0.25em] text-ink/40">
            Loading
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Hero hero={data.hero} />
      <Marquee
        items={[
          'Dembi Dollo Campus',
          'Kellem Wollega',
          'Quality Education',
          'Community Powered',
          'Western Ethiopia',
        ]}
      />
      <StorySection story={data.story} />
      <CampusTeaser gallery={data.gallery} />

      {data.compoundSection?.images?.length > 0 && (
        <SectionBlock
          index="02"
          eyebrow="Campus"
          title={data.compoundSection.title}
          description={data.compoundSection.description}
          images={data.compoundSection.images}
        />
      )}

      {data.classroomsSection?.images?.length > 0 && (
        <SectionBlock
          index="03"
          eyebrow="Learning"
          title={data.classroomsSection.title}
          description={data.classroomsSection.description}
          images={data.classroomsSection.images}
        />
      )}

      {data.activitiesSection?.images?.length > 0 && (
        <SectionBlock
          index="04"
          eyebrow="Student life"
          title={data.activitiesSection.title}
          description={data.activitiesSection.description}
          images={data.activitiesSection.images}
        />
      )}

      {data.staff?.members?.length > 0 && <StaffSection staff={data.staff} />}

      <CommunitySection cs={data.communitySupport} />
      <ContactSection contact={data.contact} />
    </div>
  );
}
