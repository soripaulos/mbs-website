
import React from 'react';
import { Facebook, Youtube, Send, Phone, Mail, MapPin } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="relative">
      <div className="bg-gradient-to-b from-school-brand to-school-pink pt-20 pb-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left text-white">
          
          {/* Column 1: Logo & About */}
          <div className="flex flex-col items-center md:items-start">
             <div className="flex items-center mb-4">
                <img 
                   src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
                   alt="Makko Billi Logo" 
                   className="h-12 w-12 rounded-full border-2 border-school-yellow mr-3 object-cover"
                />
                <div className="flex flex-col leading-tight">
                  <span className="font-display font-bold text-2xl text-white">MAKKO BILLI</span>
                  <span className="font-display text-sm tracking-widest text-white/90">SCHOOL</span>
                </div>
            </div>
            <p className="text-sm text-white/90 mb-4 font-sans leading-relaxed">
              Nurturing minds, building character, and fostering a love for learning since 2009.
            </p>
            <p className="text-xs text-white/80">
              COPYRIGHT © 2025 MAKKO BILLI SCHOOL
            </p>
          </div>

          {/* Column 2: Contact Info */}
          <div className="flex flex-col items-center">
            <h3 className="font-display font-bold text-xl mb-6 text-school-yellow">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-center space-x-2 group">
                <Phone size={16} className="text-school-yellow group-hover:rotate-12 transition" />
                <a href="tel:+251221120620" className="hover:underline">+251-221-120620</a>
              </li>
              <li className="flex items-center justify-center space-x-2 group">
                <Mail size={16} className="text-school-yellow group-hover:scale-110 transition" />
                <a href="mailto:info@makkobillischool.com" className="hover:underline">info@makkobillischool.com</a>
              </li>
              <li className="flex items-center justify-center space-x-2">
                <MapPin size={16} className="text-school-yellow" />
                <span>Adama, Ethiopia</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Socials */}
          <div className="flex flex-col items-center md:items-end">
             <h3 className="font-display font-bold text-xl mb-6 text-school-yellow">Follow Us</h3>
             <div className="flex space-x-4 mb-6">
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" className="bg-blue-600 p-2 rounded-full hover:scale-110 transition transform shadow-lg border border-white/20"><Facebook size={20} /></a>
                <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noreferrer" className="bg-blue-400 p-2 rounded-full hover:scale-110 transition transform shadow-lg border border-white/20"><Send size={20} /></a>
                <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noreferrer" className="bg-black p-2 rounded-full hover:scale-110 transition transform shadow-lg border border-white/20">
                  <svg viewBox="0 0 24 24" fill="white" width="20" height="20"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                </a>
                <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" className="bg-red-600 p-2 rounded-full hover:scale-110 transition transform shadow-lg border border-white/20"><Youtube size={20} /></a>
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