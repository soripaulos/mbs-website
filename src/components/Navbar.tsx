import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Facebook, Send, Youtube, Music2 } from 'lucide-react';
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
 * Header nav appears from `md` up — a real top-bar menu the moment the
 * mobile bottom tab bar (also `md`-gated) disappears, so there's never a
 * width with no navigation at all. Below `md`, MobileTabBar carries
 * primary navigation instead.
 *
 * The Portal CTA lives in the home hero now, not the header — every page
 * gets the same quiet header: logo, nav links, social links.
 */
export default function Navbar() {
  const { data: siteSettings } = useSanityData(fetchSiteSettings, mockSiteSettings);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

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
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 md:h-[4.5rem] md:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="Makko Billi School — Home">
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

        {/* Header nav links — md and up */}
        <div className="hidden items-center gap-4 md:flex lg:gap-7">
          {navLinks.map(link => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                data-active={active}
                className={`link-line whitespace-nowrap font-label text-[12px] font-medium uppercase tracking-[0.1em] transition-colors lg:text-[13px] lg:tracking-[0.14em] ${
                  active ? 'text-ink' : 'text-ink/55 hover:text-ink'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Socials — same on every page */}
        {socials.length > 0 && (
          <div className="flex shrink-0 items-center gap-1 md:gap-1.5">
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
      </div>
    </nav>
  );
}
