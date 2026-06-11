import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Send, Youtube, Music2, Heart, Globe } from 'lucide-react';
import { siteSettings as mockSiteSettings } from '@/data/mockData';
import { useSanityData } from '@/hooks/useSanityData';
import { fetchSiteSettings } from '@/services/sanity';
import { Scallop, DoodleStar } from '@/components/decor';

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
    <footer className="relative mt-16">
      {/* scalloped top edge */}
      <Scallop className="-mb-px h-5 text-navy md:h-6" />

      <div className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 bg-dots opacity-20" aria-hidden="true" />
        <DoodleStar className="absolute right-[12%] top-10 h-6 w-6 text-sun/50" />
        <DoodleStar className="absolute left-[6%] bottom-24 h-4 w-4 text-coral/50" />

        <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-14 sm:px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {/* Brand */}
            <div className="space-y-5">
              <Link to="/" className="flex items-center gap-3">
                {(siteSettings.footerLogo || siteSettings.logo) && (
                  <img
                    src={siteSettings.footerLogo || siteSettings.logo}
                    alt=""
                    className="h-12 w-auto object-contain"
                    loading="lazy"
                  />
                )}
                <span className="flex flex-col leading-none">
                  <span className="font-display text-lg font-bold text-white">Makko Billi</span>
                  <span className="font-hand text-lg leading-tight text-sun">School</span>
                </span>
              </Link>
              <p className="text-sm leading-relaxed text-white/70">
                {siteSettings.footerDescription || siteSettings.description}
              </p>
              {socials.length > 0 && (
                <div className="flex items-center gap-2.5 pt-1">
                  {socials.map(({ href, icon: Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition-all hover:-translate-y-0.5 hover:bg-sun hover:text-ink"
                    >
                      <Icon size={17} />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Quick links */}
            <div className="space-y-5">
              <h3 className="font-display text-lg font-bold text-sun">Quick Links</h3>
              <ul className="space-y-2.5">
                {quickLinks.map(link => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="group flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-sun"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-sun/70 transition-transform group-hover:scale-150" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-5">
              <h3 className="font-display text-lg font-bold text-sun">Contact Us</h3>
              <div className="space-y-3.5">
                {siteSettings.footerContact?.phone && (
                  <a
                    href={`tel:${siteSettings.footerContact.phone}`}
                    className="group flex items-start gap-3 text-sm text-white/70 transition-colors hover:text-sun"
                  >
                    <Phone size={17} className="mt-0.5 shrink-0 text-sun" />
                    <span className="transition-transform group-hover:translate-x-1">
                      {siteSettings.footerContact.phone}
                    </span>
                  </a>
                )}
                {siteSettings.footerContact?.email && (
                  <a
                    href={`mailto:${siteSettings.footerContact.email}`}
                    className="group flex items-start gap-3 text-sm text-white/70 transition-colors hover:text-sun"
                  >
                    <Mail size={17} className="mt-0.5 shrink-0 text-sun" />
                    <span className="break-all transition-transform group-hover:translate-x-1">
                      {siteSettings.footerContact.email}
                    </span>
                  </a>
                )}
                {siteSettings.footerContact?.address && (
                  <div className="flex items-start gap-3 text-sm text-white/70">
                    <MapPin size={17} className="mt-0.5 shrink-0 text-sun" />
                    <span>{siteSettings.footerContact.address}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Portal */}
            <div className="space-y-5">
              <h3 className="font-display text-lg font-bold text-sun">Student Portal</h3>
              <p className="text-sm text-white/70">
                Access grades, attendance, and school updates from anywhere.
              </p>
              <a
                href={portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-sun px-5 py-2.5 font-display text-sm font-bold text-ink shadow-sticker-sm"
              >
                <Globe size={16} />
                Open Portal
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 border-t border-white/10 pt-6">
            <div className="flex flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
              <p className="text-xs text-white/50">
                {siteSettings.copyright || `© ${new Date().getFullYear()} Makko Billi School. All rights reserved.`}
              </p>
              <p className="flex items-center gap-1.5 text-xs text-white/50">
                Made with <Heart size={12} className="fill-coral text-coral" /> in Adama, Ethiopia
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
