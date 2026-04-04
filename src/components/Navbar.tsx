import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Facebook, Send, Youtube, Music2, ChevronDown } from 'lucide-react';
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

const branchLinks = [
  { path: '/dembi-dollo', label: 'Dembi Dollo' },
];

export default function Navbar() {
  const { data: siteSettings } = useSanityData(fetchSiteSettings, mockSiteSettings);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBranchesOpen, setIsBranchesOpen] = useState(false);
  const [isMobileBranchesOpen, setIsMobileBranchesOpen] = useState(false);
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

            {/* Branches Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsBranchesOpen(true)}
              onMouseLeave={() => setIsBranchesOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-sm font-semibold tracking-wide transition-colors hover:text-school-yellow ${
                  branchLinks.some(b => location.pathname === b.path)
                    ? 'text-school-yellow'
                    : isTransparent
                      ? 'text-white'
                      : 'text-school-brand'
                }`}
              >
                BRANCHES
                <ChevronDown size={14} className={`transition-transform duration-200 ${isBranchesOpen ? 'rotate-180' : ''}`} />
              </button>

              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 ${
                  isBranchesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1'
                }`}
              >
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[180px] overflow-hidden">
                  {branchLinks.map((branch) => (
                    <Link
                      key={branch.path}
                      to={branch.path}
                      className={`block px-4 py-2.5 text-sm font-semibold transition-colors ${
                        location.pathname === branch.path
                          ? 'bg-school-brand/10 text-school-brand'
                          : 'text-gray-700 hover:bg-school-brand/5 hover:text-school-brand'
                      }`}
                    >
                      {branch.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
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

          {/* Mobile Branches */}
          <div>
            <button
              onClick={() => setIsMobileBranchesOpen(!isMobileBranchesOpen)}
              className={`flex items-center justify-between w-full py-2 px-4 text-sm font-semibold rounded-lg transition-colors ${
                branchLinks.some(b => location.pathname === b.path)
                  ? 'bg-school-brand text-white'
                  : 'text-school-brand hover:bg-school-brand/10'
              }`}
            >
              BRANCHES
              <ChevronDown size={14} className={`transition-transform duration-200 ${isMobileBranchesOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isMobileBranchesOpen ? 'max-h-40' : 'max-h-0'}`}>
              {branchLinks.map((branch) => (
                <Link
                  key={branch.path}
                  to={branch.path}
                  onClick={() => { setIsMobileMenuOpen(false); setIsMobileBranchesOpen(false); }}
                  className={`block py-2 px-8 text-sm font-medium rounded-lg transition-colors ${
                    location.pathname === branch.path
                      ? 'text-school-yellow font-semibold'
                      : 'text-gray-600 hover:text-school-brand hover:bg-school-brand/5'
                  }`}
                >
                  {branch.label}
                </Link>
              ))}
            </div>
          </div>
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
