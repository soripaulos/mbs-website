import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Facebook, Send, Youtube, Music2 } from 'lucide-react';
import { siteSettings as mockSiteSettings } from '@/data/mockData';
import { useSanityData } from '@/hooks/useSanityData';
import { fetchSiteSettings } from '@/services/sanity';

const navLinks = [
  { path: '/', label: 'HOME' },
  { path: '/about', label: 'ABOUT' },
  { path: '/staff', label: 'STAFF' },
  { path: '/gallery', label: 'GALLERY' },
  { path: '/contact', label: 'CONTACT' },
];

export default function Navbar() {
  const { data: siteSettings } = useSanityData(fetchSiteSettings, mockSiteSettings);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = isHome && !isScrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isTransparent
        ? 'bg-transparent'
        : 'bg-white shadow-md'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            {siteSettings.logo && (
              <>
                <img
                  src={siteSettings.logoMobile || siteSettings.logo}
                  alt={siteSettings.title || 'Logo'}
                  className="h-10 w-auto object-contain md:hidden"
                  loading="eager"
                  fetchPriority="high"
                  width={40}
                  height={40}
                />
                <img
                  src={siteSettings.logo}
                  alt={siteSettings.title || 'Logo'}
                  className="hidden md:block h-12 w-auto object-contain"
                  loading="eager"
                  fetchPriority="high"
                  width={48}
                  height={48}
                />
              </>
            )}
            <div className="flex flex-col">
              <span className={`font-display font-bold text-sm md:text-lg leading-tight transition-colors ${isTransparent ? 'text-white' : 'text-school-brand'
                }`}>
                MAKKO BILLI
              </span>
              <span className={`text-[10px] md:text-xs tracking-wider transition-colors ${isTransparent ? 'text-white/80' : 'text-school-brand/80'
                }`}>
                SCHOOL
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold tracking-wide transition-colors hover:text-school-yellow ${location.pathname === link.path
                  ? 'text-school-yellow'
                  : isTransparent
                    ? 'text-white'
                    : 'text-school-brand'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social Icons */}
          <div className="hidden lg:flex items-center gap-3">
            {siteSettings.socialLinks?.facebook && (
              <a
                href={siteSettings.socialLinks?.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors hover:text-school-yellow ${isTransparent ? 'text-white' : 'text-school-brand'
                  }`}
              >
                <Facebook size={18} />
              </a>
            )}
            {siteSettings.socialLinks?.telegram && (
              <a
                href={siteSettings.socialLinks?.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors hover:text-school-yellow ${isTransparent ? 'text-white' : 'text-school-brand'
                  }`}
              >
                <Send size={18} />
              </a>
            )}
            {siteSettings.socialLinks?.youtube && (
              <a
                href={siteSettings.socialLinks?.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors hover:text-school-yellow ${isTransparent ? 'text-white' : 'text-school-brand'
                  }`}
              >
                <Youtube size={18} />
              </a>
            )}
            {siteSettings.socialLinks?.tiktok && (
              <a
                href={siteSettings.socialLinks?.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors hover:text-school-yellow ${isTransparent ? 'text-white' : 'text-school-brand'
                  }`}
              >
                <Music2 size={18} />
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors ${isTransparent ? 'text-white' : 'text-school-brand'
              }`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 ${isMobileMenuOpen
          ? 'opacity-100 visible translate-y-0'
          : 'opacity-0 invisible -translate-y-2'
          }`}
      >
        <div className="px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block py-2 px-4 text-sm font-semibold rounded-lg transition-colors ${location.pathname === link.path
                ? 'bg-school-brand text-white'
                : 'text-school-brand hover:bg-school-brand/10'
                }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-4 pt-4 px-4 border-t border-gray-100">
            {siteSettings.socialLinks?.facebook && (
              <a
                href={siteSettings.socialLinks?.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-school-brand hover:text-school-yellow transition-colors"
              >
                <Facebook size={20} />
              </a>
            )}
            {siteSettings.socialLinks?.telegram && (
              <a
                href={siteSettings.socialLinks?.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-school-brand hover:text-school-yellow transition-colors"
              >
                <Send size={20} />
              </a>
            )}
            {siteSettings.socialLinks?.youtube && (
              <a
                href={siteSettings.socialLinks?.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-school-brand hover:text-school-yellow transition-colors"
              >
                <Youtube size={20} />
              </a>
            )}
            {siteSettings.socialLinks?.tiktok && (
              <a
                href={siteSettings.socialLinks?.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-school-brand hover:text-school-yellow transition-colors"
              >
                <Music2 size={20} />
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
