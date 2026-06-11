import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Facebook, Send, Youtube, Music2, Globe } from 'lucide-react';
import { siteSettings as mockSiteSettings } from '@/data/mockData';
import { useSanityData } from '@/hooks/useSanityData';
import { fetchSiteSettings } from '@/services/sanity';
import { DoodleStar } from '@/components/decor';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/staff', label: 'Staff' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/contact', label: 'Contact' },
  { path: '/dembi-dollo', label: 'Dembi Dollo' },
];

export default function Navbar() {
  const { data: siteSettings } = useSanityData(fetchSiteSettings, mockSiteSettings);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const portalUrl =
    siteSettings.studentPortalUrl && siteSettings.studentPortalUrl !== '#'
      ? siteSettings.studentPortalUrl
      : 'https://portal.makkobillischool.com';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close menu on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const socials = [
    { href: siteSettings.socialLinks?.facebook, icon: Facebook, label: 'Facebook' },
    { href: siteSettings.socialLinks?.telegram, icon: Send, label: 'Telegram' },
    { href: siteSettings.socialLinks?.youtube, icon: Youtube, label: 'YouTube' },
    { href: siteSettings.socialLinks?.tiktok, icon: Music2, label: 'TikTok' },
  ].filter(s => s.href);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
        <div
          className={`mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 rounded-2xl border-2 border-ink/10 bg-paper/95 px-4 backdrop-blur transition-shadow duration-300 sm:px-5 ${
            isScrolled ? 'shadow-soft' : 'shadow-sm'
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="Makko Billi School — Home">
            {siteSettings.logo && (
              <img
                src={siteSettings.logoMobile || siteSettings.logo}
                alt=""
                className="h-10 w-auto object-contain"
                loading="eager"
                fetchPriority="high"
                width={40}
                height={40}
              />
            )}
            <span className="flex flex-col leading-none">
              <span className="font-display text-base font-bold text-brand md:text-lg">Makko Billi</span>
              <span className="font-hand text-base leading-none text-coral-deep md:text-lg">School</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map(link => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`rounded-xl px-3.5 py-2 font-display text-[15px] font-semibold transition-colors ${
                    active
                      ? 'bg-sun text-ink shadow-sticker-xs'
                      : 'text-ink/70 hover:bg-cream hover:text-brand'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Portal button + hamburger */}
          <div className="flex items-center gap-2">
            <a
              href={portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press hidden items-center gap-2 rounded-xl border-2 border-ink bg-brand px-4 py-2 font-display text-sm font-bold text-white shadow-sticker-sm md:inline-flex"
            >
              <Globe size={15} />
              Portal
            </a>
            <button
              onClick={() => setIsOpen(o => !o)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border-2 border-ink/10 bg-cream text-brand transition-colors hover:bg-sun lg:hidden"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div
        className={`fixed inset-0 z-40 bg-cream transition-all duration-300 lg:hidden ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-dots opacity-50" aria-hidden="true" />
        <DoodleStar className="absolute right-8 top-28 h-8 w-8 text-sun" />
        <DoodleStar className="absolute bottom-32 left-8 h-5 w-5 text-coral" />

        <div className="relative flex h-full flex-col px-7 pb-8 pt-28">
          <nav className="flex flex-1 flex-col justify-center gap-1.5">
            {navLinks.map((link, i) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 font-display text-3xl font-bold transition-all duration-300 ${
                    active ? 'text-brand' : 'text-ink/60 hover:text-brand'
                  } ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                  style={{ transitionDelay: isOpen ? `${100 + i * 50}ms` : '0ms' }}
                >
                  <span
                    className={`inline-block h-3 w-3 rounded-full ${
                      active ? 'bg-sun' : 'bg-ink/15'
                    }`}
                  />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div
            className={`space-y-5 transition-all duration-500 ${
              isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: isOpen ? '400ms' : '0ms' }}
          >
            <a
              href={portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-ink bg-brand px-6 py-4 font-display text-lg font-bold text-white shadow-sticker"
            >
              <Globe size={18} />
              Student Portal
            </a>
            {socials.length > 0 && (
              <div className="flex items-center justify-center gap-3">
                {socials.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-ink/10 bg-white text-brand transition-colors hover:bg-sun"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
