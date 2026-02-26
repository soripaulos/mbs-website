import { useState, useEffect, useRef, useCallback } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import HeroSlideshow from '@/components/HeroSlideshow';
import { contactPageData as mockContactData } from '@/data/mockData';
import { useSanityData } from '@/hooks/useSanityData';
import { fetchContactPageData } from '@/services/sanity';

// Animation hook
function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return { ref, isIntersecting };
}

// Animated Section Component
function AnimatedSection({
  children,
  className = '',
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isIntersecting } = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className} ${isIntersecting
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-8'
        }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// Contact Info Cards
function ContactInfoCards({ contactData }: { contactData: typeof mockContactData }) {
  const { phones, emails, addresses } = contactData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {/* Phone Numbers */}
      <AnimatedSection delay={100}>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center h-full">
          <div className="w-14 h-14 bg-school-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone size={28} className="text-school-brand" />
          </div>
          <h3 className="font-display font-semibold text-lg text-school-brand mb-4">
            Phone Numbers
          </h3>
          <div className="space-y-2">
            {phones.mainPhones.map((phone, idx) => (
              <a
                key={idx}
                href={`tel:${phone}`}
                className="block text-school-pink hover:text-school-brand transition-colors"
              >
                {phone}
              </a>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            {phones.departmentPhones.map((dept, idx) => (
              <div key={idx} className="text-sm text-gray-600 mb-1">
                <span className="font-medium">{dept.department}:</span>{' '}
                <a href={`tel:${dept.phone}`} className="text-school-pink hover:underline">
                  {dept.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Email */}
      <AnimatedSection delay={200}>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center h-full">
          <div className="w-14 h-14 bg-school-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail size={28} className="text-school-brand" />
          </div>
          <h3 className="font-display font-semibold text-lg text-school-brand mb-4">
            Email
          </h3>
          <div className="space-y-2">
            {emails.map((email, idx) => (
              <div key={idx} className="text-sm">
                <span className="text-gray-500">{email.department}</span>
                <a
                  href={`mailto:${email.email}`}
                  className="block text-school-pink hover:text-school-brand transition-colors"
                >
                  {email.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Address */}
      <AnimatedSection delay={300}>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center h-full">
          <div className="w-14 h-14 bg-school-pink/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin size={28} className="text-school-brand" />
          </div>
          <h3 className="font-display font-semibold text-lg text-school-brand mb-4">
            Address
          </h3>
          <div className="space-y-3">
            {addresses.map((addr, idx) => (
              <div key={idx} className="text-sm">
                <p className="font-medium text-school-pink">{addr.name}</p>
                <p className="text-gray-600">{addr.address}</p>
                <p className="text-gray-500">{addr.city}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}

// Contact Form
function ContactForm({ contactData }: { contactData: typeof mockContactData }) {
  const { form } = contactData;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  if (!form.enabled) return null;

  if (submitted) {
    return (
      <AnimatedSection className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send size={32} className="text-green-600" />
        </div>
        <h3 className="font-display text-xl font-semibold text-school-brand mb-2">
          Message Sent!
        </h3>
        <p className="text-gray-600">
          Thank you for reaching out. We'll get back to you soon.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 text-school-brand hover:text-school-pink transition-colors"
        >
          Send another message
        </button>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection delay={400}>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {form.nameLabel}
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-school-brand focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {form.emailLabel}
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="example@email.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-school-brand focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {form.subjectLabel}
          </label>
          <input
            type="text"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="Your Message Subject"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-school-brand focus:border-transparent outline-none transition-all"
          />
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {form.messageLabel}
          </label>
          <textarea
            required
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Your Message Here"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-school-brand focus:border-transparent outline-none transition-all resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full md:w-auto px-8 py-3 bg-school-brand text-white rounded-full font-semibold hover:bg-school-dark-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              {form.submitText}
              <Send size={18} />
            </>
          )}
        </button>
      </form>
    </AnimatedSection>
  );
}

// Map Section
function MapSection({ contactData }: { contactData: typeof mockContactData }) {
  const { mapLocations } = contactData;

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {mapLocations.map((location, index) => (
            <AnimatedSection key={index} delay={index * 150}>
              <div>
                <h3
                  className="font-display text-xl font-semibold mb-4"
                  style={{ color: location.titleColor || '#2d4289' }}
                >
                  {location.title}
                </h3>
                <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-200">
                  <iframe
                    src={location.embedUrl}
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={location.title}
                    className="w-full"
                  />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// Main Contact Page
export default function Contact() {
  const contactFetcher = useCallback(
    () => fetchContactPageData(),
    []
  );
  const { data: contactData } = useSanityData(contactFetcher, mockContactData);

  return (
    <div className="min-h-screen">
      <HeroSlideshow
        images={contactData.hero.images}
        title={contactData.hero.title}
        subtitle={contactData.hero.subtitle}
        overlayColor={contactData.hero.overlayColor}
      />

      {/* Contact Info Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-school-brand mb-4">
              {contactData.sectionTitle}
            </h2>
            <div className="w-20 h-1 bg-school-yellow mx-auto rounded-full" />
          </AnimatedSection>

          <ContactInfoCards contactData={contactData} />
          <ContactForm contactData={contactData} />
        </div>
      </section>

      {/* Map Section */}
      <MapSection contactData={contactData} />
    </div>
  );
}
