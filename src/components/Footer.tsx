import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Send, Youtube, Music2, ArrowUpRight } from 'lucide-react';
import { siteSettings as mockSiteSettings } from '@/data/mockData';
import { useSanityData } from '@/hooks/useSanityData';
import { fetchSiteSettings } from '@/services/sanity';
import WordReveal from '@/components/WordReveal';

const quickLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/staff', label: 'Our Staff' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/contact', label: 'Contact' },
  { path: '/dembi-dollo', label: 'MBS Dembi Dollo' },
];

export default function Footer() {
  const { data: siteSettings } = useSanityData(fetchSiteSettings, mockSiteSettings);

  const portalUrl =
    siteSettings.studentPortalUrl && siteSettings.studentPortalUrl !== '#'
      ? siteSettings.studentPortalUrl
      : 'https://portal.makkobillischool.com';

  const socials = [
    { href: siteSettings.socialLinks?.facebook, icon: Facebook, label: 'Facebook' },
    { href: siteSettings.socialLinks?.telegram, icon: Send, label: 'Telegram' },
    { href: siteSettings.socialLinks?.tiktok, icon: Music2, label: 'TikTok' },
    { href: siteSettings.socialLinks?.youtube, icon: Youtube, label: 'YouTube' },
  ].filter(s => s.href);

  return (
    <footer className="noise relative overflow-hidden bg-night text-bone">
      <div className="mx-auto max-w-[1200px] px-5 pb-32 pt-16 md:px-8 md:pb-12 md:pt-24">
        {/* Oversized wordmark */}
        <div className="border-b border-white/10 pb-10 md:pb-14">
          <WordReveal
            text="Makko Billi School"
            as="p"
            className="font-display text-[13vw] font-bold leading-[0.95] tracking-tight text-bone sm:text-6xl md:text-8xl"
          />
          <div className="mt-6 flex flex-col gap-6 md:mt-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-sm leading-relaxed text-bone/55 md:text-base">
              {siteSettings.footerDescription || siteSettings.description}
            </p>
            <a
              href={portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-fit items-center gap-2 rounded-full bg-sun px-6 py-3.5 font-label text-xs font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-bone"
            >
              Open Student Portal
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-10 py-10 md:grid-cols-4 md:py-14">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              {(siteSettings.footerLogo || siteSettings.logo) && (
                <img
                  src={siteSettings.footerLogo || siteSettings.logo}
                  alt=""
                  className="h-11 w-auto object-contain"
                  loading="lazy"
                />
              )}
              <span className="flex flex-col">
                <span className="font-display text-base font-bold leading-none">Makko Billi</span>
                <span className="mt-0.5 font-label text-[10px] font-semibold uppercase tracking-[0.3em] text-bone/50">
                  School
                </span>
              </span>
            </Link>
            {socials.length > 0 && (
              <div className="mt-5 flex items-center gap-2.5">
                {socials.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-bone/70 transition-all hover:border-sun hover:text-sun"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="mb-4 font-label text-[11px] font-semibold uppercase tracking-[0.3em] text-bone/40">
              Explore
            </p>
            <ul className="space-y-2.5">
              {quickLinks.map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-bone/65 transition-colors hover:text-sun"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-label text-[11px] font-semibold uppercase tracking-[0.3em] text-bone/40">
              Contact
            </p>
            <div className="space-y-3">
              {siteSettings.footerContact?.phone && (
                <a
                  href={`tel:${siteSettings.footerContact.phone}`}
                  className="flex items-start gap-2.5 text-sm text-bone/65 transition-colors hover:text-sun"
                >
                  <Phone size={15} className="mt-0.5 shrink-0 text-sun/80" />
                  {siteSettings.footerContact.phone}
                </a>
              )}
              {siteSettings.footerContact?.email && (
                <a
                  href={`mailto:${siteSettings.footerContact.email}`}
                  className="flex items-start gap-2.5 text-sm text-bone/65 transition-colors hover:text-sun"
                >
                  <Mail size={15} className="mt-0.5 shrink-0 text-sun/80" />
                  <span className="break-all">{siteSettings.footerContact.email}</span>
                </a>
              )}
              {siteSettings.footerContact?.address && (
                <p className="flex items-start gap-2.5 text-sm text-bone/65">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-sun/80" />
                  {siteSettings.footerContact.address}
                </p>
              )}
            </div>
          </div>

          <div>
            <p className="mb-4 font-label text-[11px] font-semibold uppercase tracking-[0.3em] text-bone/40">
              Campuses
            </p>
            <ul className="space-y-2.5 text-sm text-bone/65">
              <li>Adama — Main Campus</li>
              <li>
                <Link to="/dembi-dollo" className="transition-colors hover:text-sun">
                  Dembi Dollo Campus
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-2 border-t border-white/10 pt-6 font-label text-[11px] uppercase tracking-[0.18em] text-bone/35 md:flex-row md:items-center">
          <p>{siteSettings.copyright || `© ${new Date().getFullYear()} Makko Billi School`}</p>
          <p>Adama · Dembi Dollo — Ethiopia</p>
        </div>
      </div>
    </footer>
  );
}
