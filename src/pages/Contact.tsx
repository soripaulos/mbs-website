import { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import { DoodleStar, DoodleSwirl } from '@/components/decor';
import { contactPageData as mockContactData } from '@/data/mockData';
import { useSanityData } from '@/hooks/useSanityData';
import { fetchContactPageData } from '@/services/sanity';
import type { ContactInfo } from '@/types';

const inputClass =
  'w-full rounded-xl border-2 border-ink/15 bg-paper px-4 py-3 text-ink placeholder:text-ink/35 outline-none transition-colors focus:border-brand focus:bg-white';

// ── INFO CARDS ───────────────────────────────────────────────────────────────
function ContactInfoCards({ contactData }: { contactData: ContactInfo }) {
  const phones = contactData?.phones;
  const emails = contactData?.emails;
  const addresses = contactData?.addresses;

  const cards = [
    {
      icon: Phone,
      title: 'Phone Numbers',
      chip: 'bg-brand text-white',
      rotate: 'md:rotate-[-1deg]',
      content: (
        <>
          <div className="space-y-1.5">
            {(phones?.mainPhones || []).map((phone, idx) => (
              <a
                key={idx}
                href={`tel:${phone}`}
                className="block font-semibold text-brand transition-colors hover:text-coral-deep"
              >
                {phone}
              </a>
            ))}
          </div>
          {phones?.departmentPhones && phones.departmentPhones.length > 0 && (
            <div className="mt-4 space-y-1.5 border-t-2 border-dashed border-ink/10 pt-4">
              {phones.departmentPhones.map((dept, idx) => (
                <p key={idx} className="text-sm text-ink/60">
                  <span className="font-bold">{dept.department}:</span>{' '}
                  <a href={`tel:${dept.phone}`} className="font-semibold text-brand hover:text-coral-deep">
                    {dept.phone}
                  </a>
                </p>
              ))}
            </div>
          )}
        </>
      ),
    },
    {
      icon: Mail,
      title: 'Email',
      chip: 'bg-sun text-ink',
      rotate: '',
      content: (
        <div className="space-y-3">
          {(emails || []).map((email, idx) => (
            <p key={idx} className="text-sm">
              <span className="block text-xs font-bold uppercase tracking-wide text-ink/40">{email.department}</span>
              <a
                href={`mailto:${email.email}`}
                className="break-all font-semibold text-brand transition-colors hover:text-coral-deep"
              >
                {email.email}
              </a>
            </p>
          ))}
        </div>
      ),
    },
    {
      icon: MapPin,
      title: 'Address',
      chip: 'bg-coral text-white',
      rotate: 'md:rotate-[1deg]',
      content: (
        <div className="space-y-3.5">
          {(addresses || []).map((addr, idx) => (
            <p key={idx} className="text-sm">
              <span className="block font-display font-bold text-coral-deep">{addr.name}</span>
              <span className="block text-ink/65">{addr.address}</span>
              <span className="block text-ink/45">{addr.city}</span>
            </p>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7">
      {cards.map((card, i) => (
        <Reveal key={card.title} delay={i * 120} variant="pop">
          <div
            className={`h-full rounded-3xl border-2 border-ink/10 bg-white p-6 text-center shadow-soft transition-transform duration-300 hover:rotate-0 md:p-7 ${card.rotate}`}
          >
            <span className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-ink shadow-sticker-xs ${card.chip}`}>
              <card.icon size={24} />
            </span>
            <h3 className="mb-4 font-display text-lg font-bold text-brand">{card.title}</h3>
            {card.content}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

// ── FORM ─────────────────────────────────────────────────────────────────────
function ContactForm({ contactData }: { contactData: ContactInfo }) {
  const form = contactData?.form;
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    window.location.href = `mailto:info@makkobillischool.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  if (form && !form.enabled) return null;

  if (submitted) {
    return (
      <Reveal variant="pop">
        <div className="rounded-3xl border-2 border-ink bg-white p-10 text-center shadow-sticker-sun">
          <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-leaf/15 text-leaf">
            <CheckCircle2 size={34} />
          </span>
          <h3 className="font-display text-2xl font-bold text-brand">Message Sent!</h3>
          <p className="mt-2 text-ink/60">Thank you for reaching out. We'll get back to you soon.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-5 font-display font-bold text-coral-deep underline decoration-wavy underline-offset-4 hover:text-brand"
          >
            Send another message
          </button>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal delay={150}>
      <form
        onSubmit={handleSubmit}
        className="relative rounded-3xl border-2 border-ink/10 bg-white p-6 shadow-soft md:p-9"
      >
        <DoodleStar className="absolute -right-3 -top-3 h-8 w-8 rotate-12 text-sun" />
        <p className="mb-6 text-center font-hand text-3xl text-coral-deep md:text-left">
          Send us a message ✏️
        </p>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-bold text-ink/70">{form?.nameLabel || 'Name'} *</span>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your Name"
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-bold text-ink/70">{form?.emailLabel || 'Email'} *</span>
            <input
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="example@email.com"
              className={inputClass}
            />
          </label>
        </div>
        <label className="mt-5 block">
          <span className="mb-1.5 block text-sm font-bold text-ink/70">{form?.subjectLabel || 'Subject'} *</span>
          <input
            type="text"
            required
            value={formData.subject}
            onChange={e => setFormData({ ...formData, subject: e.target.value })}
            placeholder="What is it about?"
            className={inputClass}
          />
        </label>
        <label className="mt-5 block">
          <span className="mb-1.5 block text-sm font-bold text-ink/70">{form?.messageLabel || 'Message'} *</span>
          <textarea
            required
            rows={5}
            value={formData.message}
            onChange={e => setFormData({ ...formData, message: e.target.value })}
            placeholder="Write your message here…"
            className={`${inputClass} resize-none`}
          />
        </label>
        <button
          type="submit"
          className="btn-press mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-ink bg-brand px-8 py-3.5 font-display font-bold text-white shadow-sticker md:w-auto"
        >
          {form?.submitText || 'Send Message'}
          <Send size={17} />
        </button>
      </form>
    </Reveal>
  );
}

// ── MAPS ─────────────────────────────────────────────────────────────────────
function MapSection({ contactData }: { contactData: ContactInfo }) {
  const mapLocations = contactData?.mapLocations;
  if (!mapLocations || mapLocations.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-cream py-16 md:py-24">
      <div className="absolute inset-0 bg-dots opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Come say hi!"
          title="Find Us on the Map"
          accent="coral"
          className="mb-10 md:mb-14"
        />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {mapLocations.map((location, index) => (
            <Reveal key={index} delay={index * 130} className={mapLocations.length === 1 ? 'lg:col-span-2' : ''}>
              <div className="overflow-hidden rounded-3xl border-2 border-ink/10 bg-white p-2.5 shadow-soft">
                <p className="flex items-center gap-2 px-3 py-2.5 font-display text-lg font-bold" style={{ color: location.titleColor || '#2d4289' }}>
                  <MapPin size={18} />
                  {location.title}
                </p>
                <iframe
                  src={location.embedUrl}
                  width="100%"
                  height="380"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={location.title}
                  className="w-full rounded-2xl"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PAGE ─────────────────────────────────────────────────────────────────────
export default function Contact() {
  const { data: contactData } = useSanityData(fetchContactPageData, mockContactData);

  return (
    <div className="min-h-screen">
      <PageHero
        title={contactData?.hero?.title || 'Contact Us'}
        subtitle={contactData?.hero?.subtitle}
        images={contactData?.hero?.images}
        accent="coral"
      />

      <section className="relative bg-paper py-14 md:py-20">
        <DoodleSwirl className="absolute left-8 top-8 hidden h-9 w-20 text-sun/70 lg:block" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="We'd love to hear from you"
            title={contactData.sectionTitle || 'Our Address & Contact Details'}
            accent="sun"
            className="mb-10 md:mb-14"
          />
          <ContactInfoCards contactData={contactData} />
          <ContactForm contactData={contactData} />
        </div>
      </section>

      <MapSection contactData={contactData} />
    </div>
  );
}
