import { useState } from 'react';
import { Phone, Mail, Plus } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import Shimmer from '@/components/Shimmer';
import { staffPageData as mockStaffPageData, staffProfilesData, departmentsData } from '@/data/mockData';
import { useSanityData, useSanityArrayData } from '@/hooks/useSanityData';
import { fetchStaffPageData, fetchStaffProfiles, fetchDepartments } from '@/services/sanity';
import type { StaffProfile, Department } from '@/types';

const NO_PHOTO =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"%3E%3Crect fill="%23e8e6df" width="400" height="500"/%3E%3Ctext fill="%23a9a698" font-family="sans-serif" font-size="20" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3EPhoto coming soon%3C/text%3E%3C/svg%3E';

// Contact actions — always visible and tappable (no hover traps on touch)
function ContactActions({ profile }: { profile: StaffProfile }) {
  const phone = profile.phones?.[0];
  if (!phone && !profile.email) return null;

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
    {phone && (
        <a
          href={`tel:${phone}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 font-label text-[11px] font-medium tracking-wide text-ink/70 transition-colors hover:border-ink hover:bg-ink hover:text-bone"
        >
          <Phone size={11} />
          {phone}
        </a>
      )}
      {profile.email && (
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 font-label text-[11px] font-medium tracking-wide text-ink/70 transition-colors hover:border-ink hover:bg-ink hover:text-bone"
        >
          <Mail size={11} className="shrink-0" />
          <span className="truncate">{profile.email}</span>
        </a>
      )}
    </div>
  );
}

// ── FOUNDERS — editorial feature row ─────────────────────────────────────────
function FoundersSection({
  founders,
  sectionTitle,
  loading,
}: {
  founders: StaffProfile[];
  sectionTitle: string;
  loading: boolean;
}) {
  if (!loading && founders.length === 0) return null;

  return (
    <section className="border-t border-ink/10 bg-bone py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <SectionHeading
          index="01"
          eyebrow="Where it all began"
          title={sectionTitle || 'Our Founders'}
          className="mb-10 md:mb-14"
        />

        {loading && founders.length === 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map(i => (
              <div key={i}>
                <Shimmer className="aspect-[4/5] rounded-3xl" />
                <Shimmer className="mt-4 h-5 w-2/3" />
                <Shimmer className="mt-2 h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {founders.map((profile, i) => (
              <Reveal key={profile.id} variant="fade" delay={i * 120}>
                <article className={i === 0 ? 'lg:-mt-6' : ''}>
                  <div className="img-zoom relative overflow-hidden rounded-3xl bg-ink/5">
                    <div className="aspect-[4/5]">
                      <img
                        src={profile.image || NO_PHOTO}
                        alt={profile.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <span className="absolute left-4 top-4 rounded-full bg-night/65 px-3 py-1 font-label text-[10px] font-semibold uppercase tracking-[0.18em] text-sun backdrop-blur-sm">
                      {String(i + 1).padStart(2, '0')} — Founder
                    </span>
                  </div>
                  <div className="pt-5">
                    <h3 className="font-display text-xl font-bold tracking-tight text-ink md:text-2xl">
                      {profile.name}
                    </h3>
                    <p className="mt-1 font-label text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
                      {profile.role}
                    </p>
                    <ContactActions profile={profile} />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ── DIRECTORS / VICE DIRECTORS — directory grid ──────────────────────────────
function StaffGrid({
  profiles,
  title,
  subtitle,
  index,
  eyebrow,
}: {
  profiles: StaffProfile[];
  title: string;
  subtitle: string;
  index: string;
  eyebrow: string;
}) {
  if (profiles.length === 0) return null;

  return (
    <section className="border-t border-ink/10 bg-bone py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <SectionHeading
          index={index}
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          className="mb-10 md:mb-14"
        />

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
          {profiles.map((profile, i) => (
            <Reveal key={profile.id} variant="fade" delay={(i % 4) * 80}>
              <article>
                <div className="img-zoom overflow-hidden rounded-2xl bg-ink/5 md:rounded-3xl">
                  <div className="aspect-[4/5]">
                    <img
                      src={profile.image || NO_PHOTO}
                      alt={profile.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
                <div className="pt-4">
                  <h3 className="font-display text-base font-bold leading-tight tracking-tight text-ink md:text-lg">
                    {profile.name}
                  </h3>
                  <p className="mt-1 font-label text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/50">
                    {profile.role}
                  </p>
                  <ContactActions profile={profile} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── DEPARTMENTS — accordion index ────────────────────────────────────────────
function DepartmentsSection({
  departments,
  departmentsTitle,
}: {
  departments: Department[];
  departmentsTitle: string;
}) {
  const [openId, setOpenId] = useState<string | null>(departments[0]?.id ?? null);

  if (departments.length === 0) return null;

  return (
    <section className="noise relative overflow-hidden bg-night py-16 text-bone md:py-28">
      <div className="relative mx-auto max-w-[1200px] px-5 md:px-8">
        <SectionHeading
          index="04"
          eyebrow="The teams behind the school"
          title={departmentsTitle || 'Our Departments'}
          dark
          className="mb-10 md:mb-14"
        />

        <div className="border-t border-white/10">
          {departments.map((dept, i) => {
            const open = openId === dept.id;
            return (
              <div key={dept.id} className="border-b border-white/10">
                <button
                  onClick={() => setOpenId(open ? null : dept.id)}
                  aria-expanded={open}
                  className="group flex w-full items-center gap-5 py-5 text-left md:gap-8 md:py-7"
                >
                  <span
                    className={`font-label text-sm font-medium transition-colors md:text-base ${
                      open ? 'text-sun' : 'text-bone/30'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`flex-1 font-display text-xl font-bold tracking-tight transition-colors md:text-3xl ${
                      open ? 'text-bone' : 'text-bone/60 group-hover:text-bone'
                    }`}
                    style={dept.headerFont ? { fontFamily: dept.headerFont } : undefined}
                  >
                    {dept.name}
                  </span>
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                      open
                        ? 'rotate-45 border-sun text-sun'
                        : 'border-white/20 text-bone/60 group-hover:border-bone group-hover:text-bone'
                    }`}
                  >
                    <Plus size={17} />
                  </span>
                </button>

                <div className="acc" data-open={open}>
                  <div>
                    <div className="grid grid-cols-1 gap-6 pb-8 md:grid-cols-[1fr_380px] md:gap-12 md:pb-10 md:pl-[3.4rem]">
                      <p className="max-w-2xl leading-relaxed text-bone/65 md:text-lg">
                        {dept.description}
                      </p>
                      {dept.image && (
                        <div className="overflow-hidden rounded-2xl">
                          <img
                            src={dept.image}
                            alt={dept.name}
                            className={`h-52 w-full object-cover transition-all duration-700 md:h-56 ${
                              open ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                            }`}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
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
  const { data: staffProfiles, loading } = useSanityArrayData(fetchStaffProfiles, staffProfilesData);
  const { data: departments } = useSanityArrayData(fetchDepartments, departmentsData);

  const founders = staffProfiles.filter(p => p.category === 'founder');
  const directors = staffProfiles.filter(p => p.category === 'director');
  const viceDirectors = staffProfiles.filter(p => p.category === 'vice-director');

  return (
    <div className="min-h-screen">
      <PageHero
        crumb="Staff"
        title={staffPage?.hero?.title || 'Our Staff'}
        subtitle={staffPage?.hero?.subtitle}
        images={staffPage?.hero?.images}
      />

      <FoundersSection
        founders={founders}
        sectionTitle={staffPage?.sectionTitles?.foundersTitle}
        loading={loading}
      />

      <StaffGrid
        profiles={directors}
        title={staffPage?.sectionTitles?.directorsTitle || 'Our Directors'}
        subtitle={staffPage?.sectionTitles?.directorsSubtitle || ''}
        index="02"
        eyebrow="Leadership"
      />

      <StaffGrid
        profiles={viceDirectors}
        title={staffPage?.sectionTitles?.viceDirectorsTitle || 'Our Vice Directors'}
        subtitle={staffPage?.sectionTitles?.viceDirectorsSubtitle || ''}
        index="03"
        eyebrow="Operations"
      />

      <DepartmentsSection
        departments={departments}
        departmentsTitle={staffPage?.sectionTitles?.departmentsTitle}
      />
    </div>
  );
}
