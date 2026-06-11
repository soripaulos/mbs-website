import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  House,
  Compass,
  Users,
  Images,
  LayoutGrid,
  Phone,
  MapPin,
  Globe,
  X,
  Facebook,
  Send,
  Youtube,
  Music2,
} from 'lucide-react';
import { siteSettings as mockSiteSettings } from '@/data/mockData';
import { useSanityData } from '@/hooks/useSanityData';
import { fetchSiteSettings } from '@/services/sanity';

const tabs = [
  { path: '/', label: 'Home', icon: House },
  { path: '/about', label: 'About', icon: Compass },
  { path: '/staff', label: 'Staff', icon: Users },
  { path: '/gallery', label: 'Gallery', icon: Images },
];

/**
 * App-style bottom navigation for mobile — most visitors browse on phones,
 * so primary navigation lives under the thumb. "More" opens a bottom sheet
 * with the remaining destinations.
 */
export default function MobileTabBar() {
  const { data: siteSettings } = useSanityData(fetchSiteSettings, mockSiteSettings);
  const [sheetOpen, setSheetOpen] = useState(false);
  const location = useLocation();

  const portalUrl =
    siteSettings.studentPortalUrl && siteSettings.studentPortalUrl !== '#'
      ? siteSettings.studentPortalUrl
      : 'https://portal.makkobillischool.com';

  // close the sheet on navigation
  useEffect(() => {
    setSheetOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = sheetOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sheetOpen]);

  const moreActive = ['/contact', '/dembi-dollo'].includes(location.pathname);

  const socials = [
    { href: siteSettings.socialLinks?.facebook, icon: Facebook, label: 'Facebook' },
    { href: siteSettings.socialLinks?.telegram, icon: Send, label: 'Telegram' },
    { href: siteSettings.socialLinks?.youtube, icon: Youtube, label: 'YouTube' },
    { href: siteSettings.socialLinks?.tiktok, icon: Music2, label: 'TikTok' },
  ].filter(s => s.href);

  return (
    <>
      {/* Bottom sheet */}
      {sheetOpen && (
        <div className="fixed inset-0 z-[55] md:hidden" role="dialog" aria-label="More navigation">
          <button
            className="absolute inset-0 bg-night/60 backdrop-blur-[2px] animate-fade-in"
            onClick={() => setSheetOpen(false)}
            aria-label="Close menu"
          />
          <div className="absolute inset-x-0 bottom-0 animate-sheet-up rounded-t-3xl bg-bone pb-28 shadow-panel">
            <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-ink/15" />
            <div className="flex items-center justify-between px-6 pb-2 pt-4">
              <p className="font-label text-[11px] font-semibold uppercase tracking-[0.3em] text-ink/50">
                More
              </p>
              <button
                onClick={() => setSheetOpen(false)}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/5 text-ink/60"
              >
                <X size={16} />
              </button>
            </div>
            <div className="space-y-1 px-4">
              <Link
                to="/contact"
                className="flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-colors active:bg-ink/5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-bone">
                  <Phone size={17} />
                </span>
                <span>
                  <span className="block font-display text-base font-bold text-ink">Contact Us</span>
                  <span className="block text-xs text-ink/50">Phones, emails & directions</span>
                </span>
              </Link>
              <Link
                to="/dembi-dollo"
                className="flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-colors active:bg-ink/5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-bone">
                  <MapPin size={17} />
                </span>
                <span>
                  <span className="block font-display text-base font-bold text-ink">MBS Dembi Dollo</span>
                  <span className="block text-xs text-ink/50">Our campus in Western Ethiopia</span>
                </span>
              </Link>
              <a
                href={portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-colors active:bg-ink/5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sun text-ink">
                  <Globe size={17} />
                </span>
                <span>
                  <span className="block font-display text-base font-bold text-ink">Student Portal</span>
                  <span className="block text-xs text-ink/50">Grades, attendance & updates</span>
                </span>
              </a>
            </div>
            {socials.length > 0 && (
              <div className="mt-4 flex items-center gap-3 border-t border-ink/10 px-6 pt-4">
                {socials.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink/70"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab bar */}
      <nav
        className="fixed inset-x-0 bottom-0 z-[56] border-t border-white/10 bg-night/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
        aria-label="Primary"
      >
        <div className="grid grid-cols-5">
          {tabs.map(tab => {
            const active = location.pathname === tab.path;
            return (
              <Link
                key={tab.path}
                to={tab.path}
                onClick={() => setSheetOpen(false)}
                className="flex flex-col items-center gap-1 py-2.5"
                aria-current={active ? 'page' : undefined}
              >
                <tab.icon
                  size={20}
                  strokeWidth={active ? 2.4 : 1.8}
                  className={`transition-colors ${active ? 'text-sun' : 'text-bone/55'}`}
                />
                <span
                  className={`font-label text-[9.5px] font-medium uppercase tracking-[0.12em] transition-colors ${
                    active ? 'text-sun' : 'text-bone/45'
                  }`}
                >
                  {tab.label}
                </span>
              </Link>
            );
          })}
          <button
            onClick={() => setSheetOpen(o => !o)}
            className="flex flex-col items-center gap-1 py-2.5"
            aria-expanded={sheetOpen}
            aria-label="More navigation"
          >
            <LayoutGrid
              size={20}
              strokeWidth={sheetOpen || moreActive ? 2.4 : 1.8}
              className={`transition-colors ${sheetOpen || moreActive ? 'text-sun' : 'text-bone/55'}`}
            />
            <span
              className={`font-label text-[9.5px] font-medium uppercase tracking-[0.12em] transition-colors ${
                sheetOpen || moreActive ? 'text-sun' : 'text-bone/45'
              }`}
            >
              More
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}
