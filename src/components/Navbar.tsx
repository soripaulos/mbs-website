import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Facebook, Send, Youtube, Music2 } from 'lucide-react';
import { siteSettings as mockSiteSettings } from '@/data/mockData';
import { useSanityData } from '@/hooks/useSanityData';
import { fetchSiteSettings } from '@/services/sanity';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/staff', label: 'Staff' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/contact', label: 'Contact' },
  { path: '/dembi-dollo', label: 'Dembi Dollo' },
];

/**
 * Desktop: minimal editorial top bar with animated link underlines.
 * Mobile: slim top bar (logo + socials) — primary navigation lives in the
 * app-style bottom tab bar (MobileTabBar). The Portal CTA only appears on
 * the home page, alongside the social links; every other page just shows
 * the socials, keeping the bar quiet on inner pages.
 */
export default function Navbar() {
  const { data: siteSettings } = useSanityData(fetchSiteSettings, mockSiteSettings);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const portalUrl =
    siteSettings.studentPortalUrl && siteSettings.studentPortalUrl !== '#'
      ? siteSettings.studentPortalUrl
      : 'https://portal.makkobillischool.com';

  const socials = [
    { href: siteSettings.socialLinks?.facebook, icon: Facebook, label: 'Facebook' },
    { href: siteSettings.socialLinks?.telegram, icon: Send, label: 'Telegram' },
    { href: siteSettings.socialLinks?.youtube, icon: Youtube, label: 'YouTube' },
    { href: siteSettings.socialLinks?.tiktok, icon: Music2, label: 'TikTok' },
  ].filter(s => s.href);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-ink/10 bg-bone/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 md:h-[4.5rem] md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5" aria-label="Makko Billi School — Home">
          {siteSettings.logo && (
            <img
              src={siteSettings.logoMobile || siteSettings.logo}
              alt=""
              className="h-9 w-auto object-contain md:h-10"
              loading="eager"
              fetchPriority="high"
              width={40}
              height={40}
            />
          )}
          <span className="flex flex-col">
            <span className="font-display text-[15px] font-bold leading-none tracking-tight text-ink md:text-base">
              Makko Billi
            </span>
            <span className="mt-0.5 font-label text-[9px] font-semibold uppercase tracking-[0.3em] text-ink/50 md:text-[10px]">
              School
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map(link => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                data-active={active}
                className={`link-line font-label text-[13px] font-medium uppercase tracking-[0.14em] transition-colors ${
                  active ? 'text-ink' : 'text-ink/55 hover:text-ink'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Socials + (home-only) Portal CTA */}
        <div className="flex items-center gap-2 md:gap-3">
          {socials.length > 0 && (
            <div className="flex items-center gap-1.5 md:gap-2">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-ink/55 transition-colors hover:bg-ink/5 hover:text-ink md:h-9 md:w-9"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          )}
          {isHome && (
            <a
              href={portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 font-label text-xs font-semibold uppercase tracking-[0.12em] text-bone transition-colors hover:bg-brand md:px-5 md:py-2.5"
            >
              Portal
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
