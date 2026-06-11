import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin, Phone, Laptop, GraduationCap, Handshake, Gift, BookOpen, Mail, ChevronRight, Users, Lightbulb,
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import LightboxGallery from '@/components/LightboxGallery';
import { Polaroid, Scallop, Tape, DoodleStar, DoodleSun } from '@/components/decor';
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
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!images?.length) return null;

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            className="group relative overflow-hidden rounded-2xl border-2 border-ink/10 bg-white p-1.5 transition-all hover:-translate-y-1 hover:shadow-soft"
            onClick={() => {
              setLightboxImages(images.map(x => x.url));
              setLightboxIndex(i);
            }}
            aria-label={img.caption || 'View photo'}
          >
            <span className="block overflow-hidden rounded-xl">
              <img
                src={img.url}
                alt={img.caption || ''}
                className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-52"
                loading="lazy"
              />
            </span>
          </button>
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

// ── HERO ─────────────────────────────────────────────────────────────────────
function Hero({ hero }: { hero: typeof dembiDolloPageData.hero }) {
  const heroImage = hero.images?.[0];

  return (
    <header className="relative overflow-hidden bg-brand">
      {heroImage && (
        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" loading="eager" fetchPriority="high" />
      )}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(26,27,94,0.55) 0%, rgba(26,27,94,0.8) 100%)' }}
      />
      <div className="absolute inset-0 bg-dots opacity-20" aria-hidden="true" />
      <DoodleStar className="absolute right-[10%] top-24 h-6 w-6 text-sun/80 animate-float" />

      <div className="relative mx-auto flex min-h-[72vh] max-w-4xl flex-col items-center justify-center px-4 pb-20 pt-32 text-center sm:px-6">
        <Reveal>
          <span className="mb-5 inline-block rounded-full border-2 border-white/25 bg-white/10 px-5 py-1.5 font-display text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
            Dembi Dollo Campus
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mx-auto mt-4 max-w-2xl font-hand text-2xl text-sun sm:text-3xl">{hero.subtitle}</p>
        </Reveal>
        <Reveal delay={300}>
          <a
            href="#contact"
            onClick={e => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-press mt-9 inline-flex items-center gap-2 rounded-2xl border-2 border-ink bg-sun px-7 py-3.5 font-display text-base font-bold text-ink shadow-sticker"
          >
            Get Involved
            <ChevronRight size={18} />
          </a>
        </Reveal>
      </div>

      <Scallop className="relative h-5 text-paper md:h-7" />
    </header>
  );
}

// ── OUR STORY ────────────────────────────────────────────────────────────────
function StorySection({ story }: { story: typeof dembiDolloPageData.story }) {
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={story.sectionTitle || 'Our Story'}
          title="How It All Started"
          accent="sun"
          className="mb-14 md:mb-20"
        />

        {/* The Idea */}
        <div className="mb-16 grid items-center gap-10 md:mb-24 md:grid-cols-2 md:gap-14">
          <Reveal variant="left">
            <div className="mb-5 flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-ink bg-sun text-ink shadow-sticker-xs">
                <Lightbulb size={22} />
              </span>
              <h3 className="font-display text-2xl font-bold text-brand md:text-3xl">{story.ideaTitle}</h3>
            </div>
            <p className="leading-relaxed text-ink/70 md:text-lg">{story.ideaContent}</p>
          </Reveal>
          <Reveal variant="right" delay={120}>
            {story.ideaImage ? (
              <Polaroid
                src={story.ideaImage}
                alt={story.ideaImageCaption || story.ideaTitle}
                caption={story.ideaImageCaption}
                imgClassName="aspect-[4/3]"
                tape
                className="rotate-[1.25deg]"
              />
            ) : (
              <p className="text-center font-hand text-2xl text-ink/30">photo coming soon…</p>
            )}
          </Reveal>
        </div>

        {/* The Location */}
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <Reveal variant="left" className="order-2 md:order-1">
            {story.locationImage ? (
              <Polaroid
                src={story.locationImage}
                alt={story.locationImageCaption || story.locationTitle}
                caption={story.locationImageCaption}
                imgClassName="aspect-[4/3]"
                tape
                tapeColor="bg-coral/70"
                className="rotate-[-1.25deg]"
              />
            ) : (
              <p className="text-center font-hand text-2xl text-ink/30">photo coming soon…</p>
            )}
          </Reveal>
          <Reveal variant="right" delay={120} className="order-1 md:order-2">
            <div className="mb-5 flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-ink bg-coral text-white shadow-sticker-xs">
                <MapPin size={22} />
              </span>
              <h3 className="font-display text-2xl font-bold text-brand md:text-3xl">{story.locationTitle}</h3>
            </div>
            <p className="leading-relaxed text-ink/70 md:text-lg">{story.locationContent}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── CAMPUS GALLERY TEASER ────────────────────────────────────────────────────
function CampusTeaser({ gallery }: { gallery: typeof dembiDolloPageData.gallery }) {
  return (
    <section className="bg-paper px-4 pb-16 sm:px-6 md:pb-20">
      <Reveal variant="pop">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border-2 border-ink bg-brand shadow-sticker-sun">
          <div className="absolute inset-0 bg-dots opacity-30" aria-hidden="true" />
          <DoodleSun className="absolute -left-8 -top-8 h-24 w-24 text-sun/30 animate-spin-slow" />
          <div className="relative mx-auto max-w-2xl px-6 py-14 text-center md:py-16">
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">{gallery.sectionTitle}</h2>
            <p className="mt-3 font-hand text-2xl text-sun">{gallery.sectionSubtitle}</p>
            <Link
              to="/gallery"
              className="btn-press mt-7 inline-flex items-center gap-2 rounded-2xl border-2 border-ink bg-sun px-7 py-3.5 font-display font-bold text-ink shadow-sticker"
            >
              View Full Gallery
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ── COMPOUND / CLASSROOMS / ACTIVITIES ───────────────────────────────────────
function SectionBlock({
  title,
  description,
  images,
  eyebrow,
  accent,
  bgClass = 'bg-paper',
}: {
  title: string;
  description: string;
  images: { url: string; caption?: string }[];
  eyebrow: string;
  accent: 'sun' | 'coral' | 'sky';
  bgClass?: string;
}) {
  if (!images?.length) return null;

  return (
    <section className={`relative overflow-hidden py-16 md:py-20 ${bgClass}`}>
      {bgClass.includes('cream') && <div className="absolute inset-0 bg-dots opacity-50" aria-hidden="true" />}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          subtitle={description}
          accent={accent}
          align="left"
          className="mb-10"
        />
        <Reveal delay={100}>
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
    <section className="relative overflow-hidden bg-cream py-16 md:py-24">
      <div className="absolute inset-0 bg-dots opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={staff.sectionTitle || 'Our Team'}
          title="Meet Our Team"
          subtitle={staff.sectionSubtitle}
          accent="coral"
          className="mb-12 md:mb-14"
        />

        <div className="space-y-8">
          {staff.members.map((member, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="flex flex-col items-center gap-6 rounded-3xl border-2 border-ink/10 bg-white p-4 shadow-soft md:flex-row md:gap-10 md:p-5">
                <div className="relative w-full shrink-0 md:w-1/2">
                  <Tape />
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-60 w-full object-cover md:h-80"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="flex-1 pb-4 text-center md:pb-0 md:text-left">
                  <p className="mb-2 flex items-center justify-center gap-2 font-hand text-2xl text-coral-deep md:justify-start">
                    <Users size={18} className="text-sun-deep" />
                    {member.role}
                  </p>
                  <h3 className="font-display text-2xl font-bold text-brand md:text-3xl">{member.name}</h3>
                  {member.isGroupPhoto && (
                    <span className="mt-3 inline-block rounded-full border-2 border-ink/10 bg-cream px-3.5 py-1 text-xs font-bold text-brand">
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
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Together for education"
          title={cs.sectionTitle || 'Community Support'}
          subtitle={cs.sectionDescription}
          accent="sun"
          className="mb-12 md:mb-14"
        />

        {/* Local & International */}
        <div className="mb-14 grid gap-6 md:grid-cols-2 md:gap-7">
          {[
            { title: cs.localTitle, desc: cs.localDescription, icon: MapPin, chip: 'bg-brand text-white', rotate: 'md:rotate-[-0.75deg]' },
            { title: cs.internationalTitle, desc: cs.internationalDescription, icon: GraduationCap, chip: 'bg-sun text-ink', rotate: 'md:rotate-[0.75deg]' },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 120} variant="pop">
              <div className={`h-full rounded-3xl border-2 border-ink/10 bg-white p-7 shadow-soft transition-transform hover:rotate-0 md:p-8 ${item.rotate}`}>
                <span className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-ink shadow-sticker-xs ${item.chip}`}>
                  <item.icon size={22} />
                </span>
                <h3 className="mb-3 font-display text-xl font-bold text-brand">{item.title}</h3>
                <p className="leading-relaxed text-ink/60">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Initiatives */}
        {cs.initiatives?.length > 0 && (
          <div>
            <Reveal className="mb-10 text-center">
              <p className="mb-1 font-hand text-2xl text-coral-deep">Every bit counts!</p>
              <h3 className="font-display text-2xl font-bold text-brand md:text-3xl">How You Can Help</h3>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cs.initiatives.map((init, i) => {
                const IconComp = ICON_MAP[init.initiativeType] || Gift;
                return (
                  <Reveal key={i} delay={(i % 3) * 90}>
                    <div className="card-hover flex h-full flex-col rounded-3xl border-2 border-ink/10 bg-white p-6">
                      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cream text-brand">
                        <IconComp size={22} />
                      </span>
                      <h4 className="mb-2 font-display text-lg font-bold text-brand">{init.title}</h4>
                      <p className="flex-grow text-sm leading-relaxed text-ink/60">{init.description}</p>
                      {init.images?.length ? (
                        <div className="mt-4 overflow-hidden rounded-2xl border-2 border-ink/10">
                          <img src={init.images[0].url} alt={init.title} className="h-36 w-full object-cover" loading="lazy" />
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
    <section id="contact" className="relative overflow-hidden bg-navy py-16 md:py-24">
      <Scallop className="absolute inset-x-0 top-0 h-5 rotate-180 text-paper md:h-6" />
      <div className="absolute inset-0 bg-dots opacity-20" aria-hidden="true" />
      <DoodleStar className="absolute left-[8%] top-20 h-6 w-6 text-sun/60 animate-float" />

      <div className="relative mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <p className="mb-1 font-hand text-2xl text-sun md:text-3xl">{contact.sectionTitle}</p>
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">Visit & Support Us</h2>
            <p className="mt-4 leading-relaxed text-white/65 md:text-lg">{contact.sectionDescription}</p>

            <div className="mt-9 space-y-5">
              {[
                { icon: MapPin, label: 'Address', value: contact.address, href: undefined as string | undefined },
                { icon: Phone, label: 'Phone', value: contact.phone, href: `tel:${contact.phone}` },
                { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
              ].map((row, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-sun">
                    <row.icon size={18} />
                  </span>
                  <span>
                    <span className="block text-[11px] font-bold uppercase tracking-widest text-white/40">{row.label}</span>
                    {row.href ? (
                      <a href={row.href} className="break-all text-white transition-colors hover:text-sun">
                        {row.value}
                      </a>
                    ) : (
                      <span className="text-white">{row.value}</span>
                    )}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-3xl border-2 border-white/15 bg-white/10 p-7 backdrop-blur-sm md:p-8">
              <h3 className="font-display text-xl font-bold text-white">{contact.ctaTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{contact.ctaDescription}</p>
              <a
                href={contact.ctaButtonLink}
                className="btn-press mt-6 inline-flex items-center gap-2 rounded-2xl border-2 border-ink bg-sun px-6 py-3 font-display font-bold text-ink shadow-sticker-sm"
              >
                {contact.ctaButtonText}
                <ChevronRight size={17} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="overflow-hidden rounded-3xl border-2 border-white/15 bg-white p-2.5 shadow-soft">
              <iframe
                src={contact.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 480 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Makko Billi School Dembi Dollo"
                className="rounded-2xl"
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
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand/20 border-t-brand" />
          <p className="font-hand text-2xl text-ink/40">loading…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Hero hero={data.hero} />
      <StorySection story={data.story} />
      <CampusTeaser gallery={data.gallery} />

      {data.compoundSection?.images?.length > 0 && (
        <SectionBlock
          title={data.compoundSection.title}
          description={data.compoundSection.description}
          images={data.compoundSection.images}
          eyebrow="Campus"
          accent="sun"
          bgClass="bg-paper"
        />
      )}

      {data.classroomsSection?.images?.length > 0 && (
        <SectionBlock
          title={data.classroomsSection.title}
          description={data.classroomsSection.description}
          images={data.classroomsSection.images}
          eyebrow="Learning"
          accent="coral"
          bgClass="bg-cream"
        />
      )}

      {data.activitiesSection?.images?.length > 0 && (
        <SectionBlock
          title={data.activitiesSection.title}
          description={data.activitiesSection.description}
          images={data.activitiesSection.images}
          eyebrow="Student life"
          accent="sky"
          bgClass="bg-paper"
        />
      )}

      {data.staff?.members?.length > 0 && <StaffSection staff={data.staff} />}

      <CommunitySection cs={data.communitySupport} />
      <ContactSection contact={data.contact} />
    </div>
  );
}
