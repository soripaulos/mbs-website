import React, { useEffect, useState } from 'react';
import { Facebook, Youtube, Send, Phone, Mail, MapPin } from 'lucide-react';
import { fetchSiteSettings } from '../services/sanity';
import { SOCIAL_LINKS } from '../constants';

interface SiteSettings {
  title?: string;
  footerLogo?: string;
  footerDescription?: string;
  footerContact?: {
    phone?: string;
    email?: string;
    address?: string;
  };
  copyright?: string;
  socialLinks?: {
    facebook?: string;
    telegram?: string;
    tiktok?: string;
    youtube?: string;
  };
}

const Footer: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await fetchSiteSettings();
        if (data) setSettings(data);
      } catch (error) {
        console.log('Failed to load site settings for footer');
      }
    };
    loadSettings();
  }, []);

  const footerLogo = settings?.footerLogo || null;
  const footerDescription = settings?.footerDescription || 'Nurturing minds, building character, and fostering a love for learning since 2009.';
  const copyright = settings?.copyright || 'COPYRIGHT © 2025 MAKKO BILLI SCHOOL';
  const phone = settings?.footerContact?.phone || '+251-221-120620';
  const email = settings?.footerContact?.email || 'info@makkobillischool.com';
  const address = settings?.footerContact?.address || 'Adama, Ethiopia';
  
  // Social links - use Sanity settings or fallback to constants
  const socialFacebook = settings?.socialLinks?.facebook || SOCIAL_LINKS.facebook;
  const socialTelegram = settings?.socialLinks?.telegram || SOCIAL_LINKS.telegram;
  const socialTiktok = settings?.socialLinks?.tiktok || SOCIAL_LINKS.tiktok;
  const socialYoutube = settings?.socialLinks?.youtube || SOCIAL_LINKS.youtube;

  return (
    <footer className="relative">
      <div className="bg-gradient-to-b from-school-brand to-school-pink pt-20 pb-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left text-white">
          
          {/* Column 1: Logo & About */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center mb-4">
              {footerLogo && (
                <img 
                  src={footerLogo} 
                  alt="Makko Billi Logo" 
                  className="h-12 w-auto max-w-[60px] mr-3 object-contain"
                />
              )}
              <div className="flex flex-col leading-tight">
                <span className="font-display font-bold text-2xl text-white">MAKKO BILLI</span>
                <span className="font-display text-sm tracking-widest text-white/90">SCHOOL</span>
              </div>
            </div>
            <p className="text-sm text-white/90 mb-4 font-sans leading-relaxed">
              {footerDescription}
            </p>
            <p className="text-xs text-white/80">
              {copyright}
            </p>
          </div>

          {/* Column 2: Contact Info */}
          <div className="flex flex-col items-center">
            <h3 className="font-display font-bold text-xl mb-6 text-school-yellow">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-center space-x-2 group">
                <Phone size={16} className="text-school-yellow group-hover:rotate-12 transition" />
                <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="hover:underline">{phone}</a>
              </li>
              <li className="flex items-center justify-center space-x-2 group">
                <Mail size={16} className="text-school-yellow group-hover:scale-110 transition" />
                <a href={`mailto:${email}`} className="hover:underline">{email}</a>
              </li>
              <li className="flex items-center justify-center space-x-2">
                <MapPin size={16} className="text-school-yellow" />
                <span>{address}</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Socials */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="font-display font-bold text-xl mb-6 text-school-yellow">Follow Us</h3>
            <div className="flex space-x-4 mb-6">
              <a href={socialFacebook} target="_blank" rel="noreferrer" className="bg-blue-600 p-2 rounded-full hover:scale-110 transition transform shadow-lg border border-white/20">
                <Facebook size={20} />
              </a>
              <a href={socialTelegram} target="_blank" rel="noreferrer" className="bg-blue-400 p-2 rounded-full hover:scale-110 transition transform shadow-lg border border-white/20">
                <Send size={20} />
              </a>
              <a href={socialTiktok} target="_blank" rel="noreferrer" className="bg-black p-2 rounded-full hover:scale-110 transition transform shadow-lg border border-white/20">
                <svg viewBox="0 0 24 24" fill="white" width="20" height="20"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
              </a>
              <a href={socialYoutube} target="_blank" rel="noreferrer" className="bg-red-600 p-2 rounded-full hover:scale-110 transition transform shadow-lg border border-white/20">
                <Youtube size={20} />
              </a>
            </div>
            <p className="text-xs text-white/80 mt-auto">
              POWERED BY MAKKO BILLI SCHOOL
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
