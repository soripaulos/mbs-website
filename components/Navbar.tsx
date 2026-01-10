
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Facebook, Youtube, Send } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';
import { fetchSiteSettings } from '../services/sanity';

// Default logo fallback
const DEFAULT_LOGO = 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch site settings for logo
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await fetchSiteSettings();
        if (settings?.logo) {
          setLogo(settings.logo);
        }
        // Update socials if provided
        if (settings?.socialLinks) {
          SOCIAL_LINKS.facebook = settings.socialLinks.facebook || SOCIAL_LINKS.facebook;
          SOCIAL_LINKS.telegram = settings.socialLinks.telegram || SOCIAL_LINKS.telegram;
          SOCIAL_LINKS.youtube = settings.socialLinks.youtube || SOCIAL_LINKS.youtube;
          SOCIAL_LINKS.tiktok = settings.socialLinks.tiktok || SOCIAL_LINKS.tiktok;
        }
        // Update favicon if provided
        if (settings?.favicon) {
          const existing = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
          if (existing) {
            existing.href = settings.favicon;
          } else {
            const link = document.createElement('link');
            link.rel = 'icon';
            link.href = settings.favicon;
            document.head.appendChild(link);
          }
        }
      } catch (error) {
        console.log('Failed to load site settings');
      }
    };
    loadSettings();
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'STAFF', path: '/staff' },
    { name: 'GALLERY', path: '/gallery' },
    { name: 'CONTACT', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  // TikTok icon component
  const TikTokIcon = ({ size = 18 }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
  );

  // Determine styles based on state
  // Case 1: Scrolled (Any Page) -> Brand BG, White Text
  // Case 2: Home + Top -> Transparent BG, White Text
  // Case 3: Not Home + Top -> White BG, Brand Text

  let navContainerClass = "fixed w-full z-50 transition-all duration-300 ";
  let textClass = "";
  let linkHoverClass = "";
  let mobileButtonClass = "";
  let logoTextClass = "";

  if (scrolled) {
    navContainerClass += "bg-school-brand shadow-lg py-2";
    textClass = "text-white";
    linkHoverClass = "hover:text-school-yellow";
    mobileButtonClass = "text-white";
    logoTextClass = "text-white";
  } else if (isHome) {
    navContainerClass += "bg-transparent py-4";
    textClass = "text-white";
    linkHoverClass = "hover:text-school-yellow";
    mobileButtonClass = "text-white";
    logoTextClass = "text-white";
  } else {
    navContainerClass += "bg-white shadow-md py-4";
    textClass = "text-school-brand";
    linkHoverClass = "hover:text-school-pink";
    mobileButtonClass = "text-school-brand";
    logoTextClass = "text-school-brand";
  }

  return (
    <nav className={navContainerClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
             <img 
                src={logo || DEFAULT_LOGO} 
                alt="Makko Billi Logo" 
                className="h-12 w-auto max-w-[60px] mr-3 object-contain"
             />
            <div className={`flex flex-col leading-tight ${logoTextClass}`}>
              <span className="font-display font-bold text-xl tracking-wide">MAKKO BILLI</span>
              <span className="font-display text-sm tracking-widest opacity-90">SCHOOL</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
               const active = isActive(link.path);
               // Active color logic
               let activeClass = "";
               if (scrolled || isHome) {
                 activeClass = active ? "text-school-yellow" : textClass;
               } else {
                 activeClass = active ? "text-school-yellow" : textClass; // Or pink for contrast on white
                 if (!active) activeClass = textClass;
                 else activeClass = "text-school-yellow font-bold"; // Make active stand out
               }

               return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-display font-semibold tracking-wide transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-school-yellow after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${linkHoverClass} ${activeClass}`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className={`flex items-center space-x-3 border-l pl-4 ${scrolled || isHome ? 'border-white/30' : 'border-gray-200'}`}>
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" className={`${textClass} ${linkHoverClass} transition hover:-translate-y-1 transform`}><Facebook size={18} /></a>
              <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noreferrer" className={`${textClass} ${linkHoverClass} transition hover:-translate-y-1 transform`}><Send size={18} /></a>
              <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" className={`${textClass} ${linkHoverClass} transition hover:-translate-y-1 transform`}><Youtube size={18} /></a>
              <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noreferrer" className={`${textClass} ${linkHoverClass} transition hover:-translate-y-1 transform`}><TikTokIcon size={18} /></a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className={`${mobileButtonClass} focus:outline-none`}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-school-brand/95 backdrop-blur-md absolute top-full left-0 w-full shadow-xl border-t border-white/10">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-white font-display font-bold text-lg hover:bg-white/10 rounded-md transition"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex space-x-6 px-3 pt-4 border-t border-white/20 mt-4">
              <a href={SOCIAL_LINKS.facebook} className="text-white hover:text-school-yellow"><Facebook size={24} /></a>
              <a href={SOCIAL_LINKS.telegram} className="text-white hover:text-school-yellow"><Send size={24} /></a>
              <a href={SOCIAL_LINKS.youtube} className="text-white hover:text-school-yellow"><Youtube size={24} /></a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;