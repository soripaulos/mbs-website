import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Send, Youtube, Music2, Heart, Globe } from 'lucide-react';
import { siteSettings as mockSiteSettings } from '@/data/mockData';
import { useSanityData } from '@/hooks/useSanityData';
import { fetchSiteSettings } from '@/services/sanity';

export default function Footer() {
  const { data: siteSettings } = useSanityData(fetchSiteSettings, mockSiteSettings);

  return (
    <footer className="bg-school-dark-blue text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-1 space-y-5">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={siteSettings.footerLogo || siteSettings.logo}
                alt={siteSettings.title || 'Logo'}
                className="h-12 w-auto object-contain"
              />
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg leading-tight text-white">
                  MAKKO BILLI
                </span>
                <span className="text-xs tracking-wider text-white/60">
                  SCHOOL
                </span>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              {siteSettings.footerDescription || siteSettings.description}
            </p>
            <div className="flex items-center gap-3 pt-2">
              {siteSettings.socialLinks?.facebook && (
                <a
                  href={siteSettings.socialLinks?.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-school-yellow hover:text-school-brand transition-all"
                >
                  <Facebook size={16} />
                </a>
              )}
              {siteSettings.socialLinks?.telegram && (
                <a
                  href={siteSettings.socialLinks?.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-school-yellow hover:text-school-brand transition-all"
                >
                  <Send size={16} />
                </a>
              )}
              {siteSettings.socialLinks?.tiktok && (
                <a
                  href={siteSettings.socialLinks?.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-school-yellow hover:text-school-brand transition-all"
                >
                  <Music2 size={16} />
                </a>
              )}
              {siteSettings.socialLinks?.youtube && (
                <a
                  href={siteSettings.socialLinks?.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-school-yellow hover:text-school-brand transition-all"
                >
                  <Youtube size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h3 className="font-display font-bold text-lg text-school-yellow">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white/70 hover:text-school-yellow transition-colors text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-school-yellow rounded-full"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-school-yellow transition-colors text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-school-yellow rounded-full"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/staff" className="text-white/70 hover:text-school-yellow transition-colors text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-school-yellow rounded-full"></span>
                  Our Staff
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-white/70 hover:text-school-yellow transition-colors text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-school-yellow rounded-full"></span>
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-school-yellow transition-colors text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-school-yellow rounded-full"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-5">
            <h3 className="font-display font-bold text-lg text-school-yellow">
              Contact Us
            </h3>
            <div className="space-y-4">
              {siteSettings.footerContact?.phone && (
                <a
                  href={`tel:${siteSettings.footerContact.phone}`}
                  className="flex items-start gap-3 text-white/70 hover:text-school-yellow transition-colors text-sm group"
                >
                  <Phone size={18} className="text-school-yellow mt-0.5 flex-shrink-0" />
                  <span className="group-hover:translate-x-1 transition-transform">{siteSettings.footerContact.phone}</span>
                </a>
              )}
              {siteSettings.footerContact?.email && (
                <a
                  href={`mailto:${siteSettings.footerContact.email}`}
                  className="flex items-start gap-3 text-white/70 hover:text-school-yellow transition-colors text-sm group"
                >
                  <Mail size={18} className="text-school-yellow mt-0.5 flex-shrink-0" />
                  <span className="group-hover:translate-x-1 transition-transform">{siteSettings.footerContact.email}</span>
                </a>
              )}
              {siteSettings.footerContact?.address && (
                <div className="flex items-start gap-3 text-white/70 text-sm">
                  <MapPin size={18} className="text-school-yellow mt-0.5 flex-shrink-0" />
                  <span>{siteSettings.footerContact.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Student Portal */}
          <div className="space-y-5">
            <h3 className="font-display font-bold text-lg text-school-yellow">
              Student Portal
            </h3>
            <p className="text-white/70 text-sm">
              Access grades, attendance, and school updates from anywhere.
            </p>
            <a
              href={siteSettings.studentPortalUrl && siteSettings.studentPortalUrl !== '#' ? siteSettings.studentPortalUrl : 'https://portal.makkobillischool.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-school-yellow text-school-brand rounded-lg font-semibold text-sm hover:bg-white transition-colors"
            >
              <Globe size={16} />
              Open Portal
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-xs text-center md:text-left">
              {siteSettings.copyright || `COPYRIGHT © ${new Date().getFullYear()} MAKKO BILLI SCHOOL`}
            </p>
            <p className="text-white/50 text-xs flex items-center gap-1">
              Made with <Heart size={12} className="text-school-pink fill-school-pink" /> by Makko Billi School
            </p>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-white/50 hover:text-white text-xs transition-colors">
                Privacy Policy
              </Link>
              <Link to="/" className="text-white/50 hover:text-white text-xs transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
