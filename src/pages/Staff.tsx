import { useState, useEffect, useRef, useCallback } from 'react';
import { Phone, Mail } from 'lucide-react';
import HeroSlideshow from '@/components/HeroSlideshow';
import { staffPageData as mockStaffPageData, staffProfilesData, departmentsData } from '@/data/mockData';
import { useSanityData, useSanityArrayData } from '@/hooks/useSanityData';
import { fetchStaffPageData, fetchStaffProfiles, fetchDepartments } from '@/services/sanity';
import type { StaffProfile, Department } from '@/types';

// Animation hook with reduced frequency
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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return { ref, isIntersecting };
}

// Animated Section Component
function AnimatedSection({
  children,
  className = '',
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isIntersecting } = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${isIntersecting
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-10'
        }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// Director Card Component with slide-up contact panel
function DirectorCard({ profile, accentColor = 'brand' }: { profile: StaffProfile; accentColor?: 'brand' | 'pink' }) {
  const bgColor = accentColor === 'brand' ? 'bg-school-brand/95' : 'bg-school-pink/95';

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group relative h-[400px]">
      {/* Full Image */}
      <img
        src={profile.image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"%3E%3Crect fill="%23e5e7eb" width="400" height="500"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="24" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E'}
        alt={profile.name}
        className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
      />

      {/* Subtle Gradient Overlay - lighter so face is visible */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

      {/* Name and Role - Always visible at bottom */}
      <div className="absolute bottom-0 left-0 w-full text-white p-4 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="font-bold text-lg mb-1">{profile.name}</h3>
        <p className="text-school-yellow font-medium text-xs uppercase tracking-wide">{profile.role}</p>
      </div>

      {/* Contact Info - Slides up on hover from below */}
      <div className={`absolute bottom-0 left-0 w-full ${bgColor} backdrop-blur-sm p-6 text-white transition-transform duration-500 transform translate-y-full group-hover:translate-y-0`}>
        <h3 className="font-bold text-xl mb-1">{profile.name}</h3>
        <p className="text-school-yellow font-medium text-sm mb-4 uppercase tracking-wide">{profile.role}</p>

        <div className="space-y-3">
          {profile.phones && profile.phones.length > 0 && (
            <a
              href={`tel:${profile.phones[0]}`}
              className="flex items-center text-white/90 hover:text-school-yellow transition text-sm bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-white/20"
            >
              <Phone size={16} className="mr-3 text-school-yellow" />
              {profile.phones[0]}
            </a>
          )}
          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center text-white/90 hover:text-school-yellow transition text-sm bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-white/20"
            >
              <Mail size={16} className="mr-3 text-school-yellow" />
              <span className="truncate">{profile.email}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// Vice Director Card Component
function ViceDirectorCard({ profile }: { profile: StaffProfile }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group relative h-[350px]">
      {/* Full Image */}
      <img
        src={profile.image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"%3E%3Crect fill="%23e5e7eb" width="400" height="500"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="24" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E'}
        alt={profile.name}
        className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
      />

      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

      {/* Name and Role - Always visible at bottom */}
      <div className="absolute bottom-0 left-0 w-full text-white p-4 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="font-bold text-lg mb-1">{profile.name}</h3>
        <p className="text-school-yellow font-medium text-xs uppercase tracking-wide">{profile.role}</p>
      </div>

      {/* Contact Info - Slides up on hover from below with pink accent */}
      <div className="absolute bottom-0 left-0 w-full bg-school-pink/95 backdrop-blur-sm p-5 text-white transition-transform duration-500 transform translate-y-full group-hover:translate-y-0">
        <h3 className="font-bold text-lg mb-1">{profile.name}</h3>
        <p className="text-school-yellow font-medium text-sm mb-3 uppercase tracking-wide">{profile.role}</p>

        <div className="space-y-2">
          {profile.phones && profile.phones.length > 0 && (
            <a
              href={`tel:${profile.phones[0]}`}
              className="flex items-center text-white/90 hover:text-school-yellow transition text-sm bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-white/20"
            >
              <Phone size={14} className="mr-2 text-school-yellow" />
              {profile.phones[0]}
            </a>
          )}
          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center text-white/90 hover:text-school-yellow transition text-sm bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-white/20"
            >
              <Mail size={14} className="mr-2 text-school-yellow" />
              <span className="truncate text-xs">{profile.email}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// Founders Section
function FoundersSection({ founders, sectionTitle }: { founders: StaffProfile[]; sectionTitle: string }) {
  if (founders.length === 0) return null;

  const mainFounder = founders[0];
  const coFounders = founders.slice(1);

  return (
    <div className="py-12">
      <AnimatedSection className="text-center mb-10">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-school-brand mb-2">
          {sectionTitle}
        </h2>
      </AnimatedSection>

      {/* Main Founder + Co-Founders Layout */}
      <div className="flex flex-col md:flex-row justify-center items-end gap-8 md:gap-12">
        {/* Main Founder - with hover slide-up effect */}
        <div className="w-full md:w-1/3 relative z-10">
          <AnimatedSection delay={100}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/4] transform md:scale-105 md:hover:scale-110 transition duration-500 border-4 border-school-yellow group">
              <img
                src={mainFounder.image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"%3E%3Crect fill="%23e5e7eb" width="400" height="500"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="24" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E'}
                alt={mainFounder.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

              {/* Name and Role */}
              <div className="absolute bottom-0 left-0 w-full text-white p-5 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="font-bold text-2xl mb-1">{mainFounder.name}</h3>
                <p className="text-school-yellow font-bold text-sm uppercase tracking-wide">{mainFounder.role}</p>
              </div>

              {/* Contact Info - Slides up on hover */}
              <div className="absolute bottom-0 left-0 w-full bg-school-brand/95 backdrop-blur-sm p-6 text-white transition-transform duration-500 transform translate-y-full group-hover:translate-y-0">
                <h3 className="font-bold text-xl mb-1">{mainFounder.name}</h3>
                <p className="text-school-yellow font-medium text-sm mb-4 uppercase tracking-wide">{mainFounder.role}</p>

                <div className="space-y-3">
                  {mainFounder.phones && mainFounder.phones.map((phone, idx) => (
                    <a
                      key={idx}
                      href={`tel:${phone}`}
                      className="flex items-center text-white/90 hover:text-school-yellow transition text-sm bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-white/20"
                    >
                      <Phone size={16} className="mr-3 text-school-yellow" />
                      {phone}
                    </a>
                  ))}
                  {mainFounder.email && (
                    <a
                      href={`mailto:${mainFounder.email}`}
                      className="flex items-center text-white/90 hover:text-school-yellow transition text-sm bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-white/20"
                    >
                      <Mail size={16} className="mr-3 text-school-yellow" />
                      <span className="truncate">{mainFounder.email}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Co-Founders */}
        {coFounders.map((coFounder, index) => (
          <div key={coFounder.id} className="w-full md:w-1/3">
            <AnimatedSection delay={200 + index * 100}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[3/4] group">
                <img
                  src={coFounder.image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"%3E%3Crect fill="%23e5e7eb" width="400" height="500"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="24" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E'}
                  alt={coFounder.name}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                {/* Name and Role - Always visible */}
                <div className="absolute bottom-0 left-0 w-full text-white p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="font-bold text-xl mb-1">{coFounder.name}</h3>
                  <p className="text-school-yellow font-medium text-sm uppercase tracking-wide">{coFounder.role}</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        ))}
      </div>
    </div>
  );
}

// Directors Section
function DirectorsSection({ directors, title, subtitle }: { directors: StaffProfile[]; title: string; subtitle: string }) {
  if (directors.length === 0) return null;

  return (
    <div className="py-12">
      <AnimatedSection className="text-center mb-10">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-school-brand mb-2">
          {title}
        </h2>
        <p className="text-gray-500">{subtitle}</p>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {directors.map((director, index) => (
          <AnimatedSection key={director.id} delay={index * 100}>
            <DirectorCard profile={director} accentColor="brand" />
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}

// Vice Directors Section
function ViceDirectorsSection({ viceDirectors, title, subtitle }: { viceDirectors: StaffProfile[]; title: string; subtitle: string }) {
  if (viceDirectors.length === 0) return null;

  return (
    <div className="py-12">
      <AnimatedSection className="text-center mb-10">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-school-brand mb-2">
          {title}
        </h2>
        <p className="text-gray-500">{subtitle}</p>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {viceDirectors.map((vice, index) => (
          <AnimatedSection key={vice.id} delay={index * 100}>
            <ViceDirectorCard profile={vice} />
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}

// Departments Section - Alternating layout
function DepartmentsSection({ departments, departmentsTitle }: { departments: Department[]; departmentsTitle: string }) {
  return (
    <section className="py-16 md:py-24 bg-school-brand/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl text-school-brand font-bold">
            {departmentsTitle}
          </h2>
        </AnimatedSection>

        <div className="space-y-20">
          {departments.map((dept, index) => (
            <AnimatedSection key={dept.id} delay={index * 150}>
              <div className={`flex flex-col md:flex-row items-center gap-10 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                {/* Image */}
                <div className="w-full md:w-1/2 relative group">
                  <div
                    className={`absolute inset-0 ${index % 2 === 0 ? 'bg-school-yellow' : 'bg-school-pink'}/20 rounded-2xl transform rotate-3 transition duration-500 group-hover:rotate-6`}
                  ></div>
                  <img
                    src={dept.image}
                    alt={dept.name}
                    className="w-full h-80 object-cover rounded-2xl shadow-lg relative z-10 transform transition duration-500 group-hover:-translate-y-2"
                  />
                </div>

                {/* Text */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <h3
                    className="text-3xl font-bold text-gray-800 mb-4"
                    style={{ fontFamily: dept.headerFont || "'Fredoka', sans-serif" }}
                  >
                    {dept.name}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">{dept.description}</p>
                  <div className="h-1 w-24 bg-school-brand rounded-full mx-auto md:mx-0"></div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// Main Staff Page
export default function Staff() {
  const staffFetcher = useCallback(
    () => fetchStaffPageData(),
    []
  );
  const { data: staffPage } = useSanityData(staffFetcher, mockStaffPageData);
  const { data: staffProfiles } = useSanityArrayData(fetchStaffProfiles, staffProfilesData);
  const { data: departments } = useSanityArrayData(fetchDepartments, departmentsData);

  const founders = staffProfiles.filter(p => p.category === 'founder');
  const directors = staffProfiles.filter(p => p.category === 'director');
  const viceDirectors = staffProfiles.filter(p => p.category === 'vice-director');

  return (
    <div className="min-h-screen">
      <HeroSlideshow
        images={staffPage?.hero?.images}
        title={staffPage?.hero?.title}
        subtitle={staffPage?.hero?.subtitle}
        overlayColor={staffPage?.hero?.overlayColor}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Founders */}
        <FoundersSection
          founders={founders}
          sectionTitle={staffPage?.sectionTitles?.foundersTitle}
        />

        {/* Directors */}
        <DirectorsSection
          directors={directors}
          title={staffPage?.sectionTitles?.directorsTitle}
          subtitle={staffPage?.sectionTitles?.directorsSubtitle}
        />

        {/* Vice Directors */}
        <ViceDirectorsSection
          viceDirectors={viceDirectors}
          title={staffPage?.sectionTitles?.viceDirectorsTitle}
          subtitle={staffPage?.sectionTitles?.viceDirectorsSubtitle}
        />
      </div>

      {/* Departments */}
      <DepartmentsSection departments={departments} departmentsTitle={staffPage?.sectionTitles?.departmentsTitle} />
    </div>
  );
}
