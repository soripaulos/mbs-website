
import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { fetchContactPageData } from '../services/sanity';
import { ContactPageData } from '../types';
import HeroSlideshow from '../components/HeroSlideshow';

const DEFAULT_HERO_IMAGE = 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';

// Fallback data
const fallbackData: ContactPageData = {
  hero: {
    title: 'Contact Us',
    subtitle: 'Get in Touch with Us',
    images: [DEFAULT_HERO_IMAGE],
    overlayColor: 'bg-school-pink/80'
  },
  sectionTitle: 'Our Address & Contact Details',
  phones: {
    mainPhones: ['+251 221 120620', '+251 221 120621'],
    departmentPhones: [
      { department: 'Kindergarten', phone: '+251 222 116031' },
      { department: 'Primary School', phone: '+251 222 125803' },
      { department: 'High School', phone: '+251 222 119848' },
      { department: 'Second Branch', phone: '+251 222 121 984' }
    ]
  },
  emails: [
    { department: 'Kindergarten', email: 'kinder@makkobillischool.com' },
    { department: 'Primary School', email: 'primary@makkobillischool.com' },
    { department: 'High School', email: 'secondary@makkobillischool.com' }
  ],
  addresses: [
    { name: 'Main Branch', address: 'Goro, Near Silassie Church', city: 'Adama, Ethiopia' },
    { name: 'Second Branch', address: 'Near former Adama Kebele 11 Administration Office', city: 'Adama, Ethiopia' }
  ],
  form: {
    enabled: true,
    nameLabel: 'Name*',
    emailLabel: 'Email*',
    subjectLabel: 'Subject*',
    messageLabel: 'Your Message*',
    submitText: 'Send Message'
  },
  mapLocations: [
    { title: 'Main Branch Location', embedUrl: 'https://maps.google.com/maps?q=H757+F9%20Adama&t=&z=17&ie=UTF8&iwloc=&output=embed', titleColor: 'text-school-brand' },
    { title: 'Second Branch Location', embedUrl: 'https://maps.google.com/maps?q=G7MC+6Q3%20Adama&t=&z=17&ie=UTF8&iwloc=&output=embed', titleColor: 'text-school-pink' }
  ]
};

const Contact: React.FC = () => {
  const [pageData, setPageData] = useState<ContactPageData>(fallbackData);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchContactPageData();
        if (data) {
          // Merge with fallback for any missing data
          setPageData({
            ...fallbackData,
            ...data,
            phones: {
              mainPhones: data.phones?.mainPhones?.length ? data.phones.mainPhones : fallbackData.phones.mainPhones,
              departmentPhones: data.phones?.departmentPhones?.length ? data.phones.departmentPhones : fallbackData.phones.departmentPhones
            },
            emails: data.emails?.length ? data.emails : fallbackData.emails,
            addresses: data.addresses?.length ? data.addresses : fallbackData.addresses,
            mapLocations: data.mapLocations?.length ? data.mapLocations : fallbackData.mapLocations
          });
        }
      } catch (error) {
        console.log('Failed to load contact page data from Sanity, using fallback');
      }
    };
    loadData();
  }, []);

  // Get hero images (use fallback if not available)
  const heroImages = pageData.hero.images?.length > 0 ? pageData.hero.images : [DEFAULT_HERO_IMAGE];

  return (
    <div className="w-full pt-20">
      {/* Hero - Dynamic Slideshow */}
      <HeroSlideshow
        images={heroImages}
        title={pageData.hero.title}
        subtitle={pageData.hero.subtitle}
        overlayColor={pageData.hero.overlayColor}
      />

      {/* Content Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="font-hand text-4xl text-school-brand mb-8">{pageData.sectionTitle}</h2>
          
          {/* Contact Icons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
            {/* Phone Numbers */}
            <div className="flex flex-col items-center hover:transform hover:scale-105 transition duration-300">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4 shadow-sm ring-2 ring-green-200">
                <Phone className="text-green-600 w-8 h-8" />
              </div>
              <h3 className="font-hand text-2xl text-green-600 mb-2">Phone Numbers</h3>
              <div className="text-school-pink text-sm mb-2 flex flex-col font-bold">
                {pageData.phones.mainPhones.map((phone, idx) => (
                  <a key={idx} href={`tel:${phone.replace(/\s/g, '')}`} className="hover:underline">{phone}</a>
                ))}
              </div>
              <div className="text-xs text-gray-500 space-y-1 flex flex-col">
                {pageData.phones.departmentPhones.map((item, idx) => (
                  <p key={idx}>
                    <span className="font-bold text-gray-700">{item.department}:</span>{' '}
                    <a href={`tel:${item.phone.replace(/\s/g, '')}`} className="hover:text-green-600 transition">{item.phone}</a>
                  </p>
                ))}
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center hover:transform hover:scale-105 transition duration-300">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 shadow-sm ring-2 ring-blue-200">
                <Mail className="text-school-brand w-8 h-8" />
              </div>
              <h3 className="font-hand text-2xl text-school-brand mb-2">Email</h3>
              <div className="text-xs text-school-pink space-y-1 flex flex-col font-bold">
                {pageData.emails.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <p className="text-gray-700 font-normal mt-1">{item.department}</p>
                    <a href={`mailto:${item.email}`} className="hover:underline mb-1">{item.email}</a>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="flex flex-col items-center hover:transform hover:scale-105 transition duration-300">
              <div className="w-16 h-16 rounded-full bg-yellow-50 flex items-center justify-center mb-4 shadow-sm ring-2 ring-yellow-200">
                <MapPin className="text-yellow-600 w-8 h-8" />
              </div>
              <h3 className="font-hand text-2xl text-yellow-500 mb-2">Address</h3>
              <div className="text-xs text-school-pink space-y-4 font-bold">
                {pageData.addresses.map((addr, idx) => (
                  <div key={idx}>
                    <p className="font-normal text-gray-800">{addr.name}</p>
                    <p>{addr.address}</p>
                    <p className="text-gray-500 font-normal">{addr.city}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        {pageData.form.enabled && (
          <div className="max-w-4xl mx-auto bg-gray-50 p-8 rounded-xl shadow-lg mb-20 border-t-4 border-school-yellow">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{pageData.form.nameLabel}</label>
                <input type="text" placeholder="Your Name" className="w-full p-3 border border-gray-300 rounded-md bg-white focus:border-school-yellow outline-none transition focus:ring-1 focus:ring-school-yellow" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{pageData.form.emailLabel}</label>
                <input type="email" placeholder="example@email.com" className="w-full p-3 border border-gray-300 rounded-md bg-white focus:border-school-yellow outline-none transition focus:ring-1 focus:ring-school-yellow" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">{pageData.form.subjectLabel}</label>
                <input type="text" placeholder="Your Message Subject" className="w-full p-3 border border-gray-300 rounded-md bg-white focus:border-school-yellow outline-none transition focus:ring-1 focus:ring-school-yellow" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">{pageData.form.messageLabel}</label>
                <textarea rows={6} placeholder="Your Message Here" className="w-full p-3 border border-gray-300 rounded-md bg-white focus:border-school-yellow outline-none transition focus:ring-1 focus:ring-school-yellow"></textarea>
              </div>
              <div className="md:col-span-2">
                <button type="button" className="bg-school-brand text-white font-bold py-3 px-8 rounded-full hover:bg-school-pink transition flex items-center shadow-lg transform hover:-translate-y-1 w-full md:w-auto justify-center">
                  {pageData.form.submitText} <Send size={16} className="ml-2" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Maps Sections */}
        <div className="max-w-6xl mx-auto space-y-12">
          {pageData.mapLocations.map((map, idx) => {
            // Convert color object to CSS
            const titleStyle = typeof map.titleColor === 'object' && map.titleColor?.hex 
              ? { color: map.titleColor.hex }
              : {};
            const titleClass = typeof map.titleColor === 'string' ? map.titleColor : 'text-school-brand';
            
            return (
              <div key={idx}>
                <h3 
                  className={`font-display font-bold text-3xl ${titleClass} mb-4 border-l-4 ${idx === 0 ? 'border-school-yellow' : 'border-school-brand'} pl-3`}
                  style={titleStyle}
                >
                  {map.title}
                </h3>
                <div className="w-full h-96 bg-gray-200 rounded-xl overflow-hidden relative shadow-xl group border border-gray-200">
                  <iframe 
                    src={map.embedUrl}
                    width="100%" 
                    height="100%" 
                    style={{border:0}} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale-0 transition duration-700"
                    title={map.title}
                  ></iframe>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Contact;
