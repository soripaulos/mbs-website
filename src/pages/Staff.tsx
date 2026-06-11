import { Phone, Mail } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import { Tape, DoodleStar, DoodleSwirl } from '@/components/decor';
import { staffPageData as mockStaffPageData, staffProfilesData, departmentsData } from '@/data/mockData';
import { useSanityData, useSanityArrayData } from '@/hooks/useSanityData';
import { fetchStaffPageData, fetchStaffProfiles, fetchDepartments } from '@/services/sanity';
import type { StaffProfile, Department } from '@/types';

const NO_PHOTO =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"%3E%3Crect fill="%23fbf3e4" width="400" height="500"/%3E%3Ctext fill="%23b9b09c" font-family="sans-serif" font-size="20" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3EPhoto coming soon%3C/text%3E%3C/svg%3E';

// Contact chips — always visible, tappable on mobile (no hover required)
function ContactChips({ profile, compact = false }: { profile: StaffProfile; compact?: boolean }) {
  const hasContact = (profile.phones && profile.phones.length > 0) || profile.email;
  if (!hasContact) return null;

  return (
    <div className={`flex flex-wrap items-center gap-2 ${compact ? 'justify-center' : ''}`}>
      {(profile.phones || []).map((phone, idx) => (
        <a
          key={idx}
          href={`tel:${phone}`}
          className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink/10 bg-cream px-3 py-1.5 text-xs font-bold text-brand transition-colors hover:border-ink/30 hover:bg-sun"
        >
          <Phone size={12} />
          {phone}
        </a>
      ))}
      {profile.email && (
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex max-w-full items-center gap-1.5 rounded-full border-2 border-ink/10 bg-cream px-3 py-1.5 text-xs font-bold text-brand transition-colors hover:border-ink/30 hover:bg-sun"
        >
          <Mail size={12} className="shrink-0" />
          <span className="truncate">{profile.email}</span>
        </a>
      )}
    </div>
  );
}

// ── FOUNDERS ─────────────────────────────────────────────────────────────────
function FoundersSection({ founders, sectionTitle }: { founders: StaffProfile[]; sectionTitle: string }) {
  if (founders.length === 0) return null;

  const mainFounder = founders[0];
  const coFounders = founders.slice(1);
  const ordered = [coFounders[0], mainFounder, coFounders[1]].filter(Boolean) as StaffProfile[];

  return (
    <section className="relative bg-paper py-14 md:py-20">
      <DoodleSwirl className="absolute left-6 top-8 hidden h-10 w-20 text-sun/60 md:block" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Where it all began"
          title={sectionTitle || 'Our Founders'}
          accent="sun"
          className="mb-10 md:mb-14"
        />

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:items-end lg:grid-cols-3">
          {ordered.map((profile, i) => {
            const isMain = profile === mainFounder;
            return (
              <Reveal key={profile.id} delay={i * 130} variant="pop" className={isMain ? 'sm:col-span-2 lg:col-span-1' : ''}>
                <div
                  className={`relative h-full rounded-3xl border-2 bg-white p-3 pb-5 text-center transition-transform duration-300 hover:-translate-y-1.5 ${
                    isMain
                      ? 'border-ink shadow-sticker-sun lg:scale-[1.04]'
                      : 'border-ink/10 shadow-soft'
                  } ${i === 0 ? 'rotate-[-1deg]' : i === 2 ? 'rotate-[1deg]' : ''}`}
                >
                  <Tape color={isMain ? 'bg-sun/80' : 'bg-coral/60'} />
                  <div className="img-zoom overflow-hidden rounded-2xl">
                    <div className="aspect-[4/5]">
                      <img
                        src={profile.image || NO_PHOTO}
                        alt={profile.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-brand">{profile.name}</h3>
                  <p className="mb-3 mt-0.5 font-hand text-xl leading-none text-coral-deep">{profile.role}</p>
                  <div className="px-2">
                    <ContactChips profile={profile} compact />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── DIRECTORS / VICE DIRECTORS ───────────────────────────────────────────────
function StaffGrid({
  profiles,
  title,
  subtitle,
  eyebrow,
  accent,
  bgClass,
}: {
  profiles: StaffProfile[];
  title: string;
  subtitle: string;
  eyebrow: string;
  accent: 'coral' | 'sky' | 'sun';
  bgClass: string;
}) {
  if (profiles.length === 0) return null;

  return (
    <section className={`relative overflow-hidden py-14 md:py-20 ${bgClass}`}>
      {bgClass.includes('cream') && <div className="absolute inset-0 bg-dots opacity-50" aria-hidden="true" />}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          accent={accent}
          className="mb-10 md:mb-14"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {profiles.map((profile, index) => (
            <Reveal key={profile.id} delay={(index % 4) * 90}>
              <div className="card-hover h-full rounded-3xl border-2 border-ink/10 bg-white p-3 pb-4 text-center">
                <div className="img-zoom overflow-hidden rounded-2xl">
                  <div className="aspect-[4/5]">
                    <img
                      src={profile.image || NO_PHOTO}
                      alt={profile.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <h3 className="mt-3.5 font-display text-lg font-bold leading-tight text-brand">{profile.name}</h3>
                <p className="mb-3 mt-0.5 font-hand text-lg leading-tight text-coral-deep">{profile.role}</p>
                <ContactChips profile={profile} compact />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── DEPARTMENTS ──────────────────────────────────────────────────────────────
function DepartmentsSection({ departments, departmentsTitle }: { departments: Department[]; departmentsTitle: string }) {
  if (departments.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-cream py-16 md:py-24">
      <div className="absolute inset-0 bg-dots opacity-50" aria-hidden="true" />
      <DoodleStar className="absolute right-[6%] top-14 h-7 w-7 text-sun-deep/70 animate-float" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="The teams behind the magic"
          title={departmentsTitle || 'Our Departments'}
          accent="coral"
          className="mb-12 md:mb-16"
        />

        <div className="space-y-16 md:space-y-20">
          {departments.map((dept, index) => {
            const flipped = index % 2 === 1;
            return (
              <Reveal key={dept.id}>
                <div className={`flex flex-col items-center gap-8 md:gap-12 ${flipped ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                  {/* Photo with rotated color backdrop */}
                  <div className="group relative w-full md:w-1/2">
                    <div
                      className={`absolute inset-0 rounded-3xl border-2 border-ink/10 transition-transform duration-500 ${
                        flipped
                          ? 'rotate-[3deg] bg-coral/25 group-hover:rotate-[5deg]'
                          : 'rotate-[-3deg] bg-sun/40 group-hover:rotate-[-5deg]'
                      }`}
                      aria-hidden="true"
                    />
                    <div className="relative rounded-3xl border-2 border-ink/10 bg-white p-2.5 transition-transform duration-500 group-hover:-translate-y-1.5">
                      <Tape color={flipped ? 'bg-coral/60' : 'bg-sun/80'} />
                      <div className="overflow-hidden rounded-2xl">
                        <img
                          src={dept.image || NO_PHOTO}
                          alt={dept.name}
                          className="h-64 w-full object-cover md:h-80"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="w-full text-center md:w-1/2 md:text-left">
                    <h3
                      className="font-display text-2xl font-bold text-brand md:text-3xl"
                      style={dept.headerFont ? { fontFamily: dept.headerFont } : undefined}
                    >
                      {dept.name}
                    </h3>
                    <DoodleSwirl className={`mx-auto mt-2 h-6 w-14 md:mx-0 ${flipped ? 'text-coral' : 'text-sun-deep'}`} />
                    <p className="mt-4 leading-relaxed text-ink/65 md:text-lg">{dept.description}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── PAGE ─────────────────────────────────────────────────────────────────────
export default function Staff() {
  const { data: staffPage } = useSanityData(fetchStaffPageData, mockStaffPageData);
  const { data: staffProfiles } = useSanityArrayData(fetchStaffProfiles, staffProfilesData);
  const { data: departments } = useSanityArrayData(fetchDepartments, departmentsData);

  const founders = staffProfiles.filter(p => p.category === 'founder');
  const directors = staffProfiles.filter(p => p.category === 'director');
  const viceDirectors = staffProfiles.filter(p => p.category === 'vice-director');

  return (
    <div className="min-h-screen">
      <PageHero
        title={staffPage?.hero?.title || 'Our Staff'}
        subtitle={staffPage?.hero?.subtitle}
        images={staffPage?.hero?.images}
        accent="coral"
      />

      <FoundersSection founders={founders} sectionTitle={staffPage?.sectionTitles?.foundersTitle} />

      <StaffGrid
        profiles={directors}
        title={staffPage?.sectionTitles?.directorsTitle || 'Our Directors'}
        subtitle={staffPage?.sectionTitles?.directorsSubtitle || ''}
        eyebrow="Leadership"
        accent="coral"
        bgClass="bg-cream"
      />

      <StaffGrid
        profiles={viceDirectors}
        title={staffPage?.sectionTitles?.viceDirectorsTitle || 'Our Vice Directors'}
        subtitle={staffPage?.sectionTitles?.viceDirectorsSubtitle || ''}
        eyebrow="Right-hand heroes"
        accent="sky"
        bgClass="bg-paper"
      />

      <DepartmentsSection
        departments={departments}
        departmentsTitle={staffPage?.sectionTitles?.departmentsTitle}
      />
    </div>
  );
}
