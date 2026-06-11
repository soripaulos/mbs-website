import { useState } from 'react';
import { Phone, Mail, MapPin, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import { contactPageData as mockContactData } from '@/data/mockData';
import { useSanityData } from '@/hooks/useSanityData';
import { fetchContactPageData } from '@/services/sanity';
import type { ContactInfo } from '@/types';

const inputClass =
  'w-full border-0 border-b border-ink/20 bg-transparent px-0 py-3 text-ink placeholder:text-ink/30 outline-none transition-colors focus:border-ink';

// ── INFO PANEL — sticky dark card ────────────────────────────────────────────
function InfoPanel({ contactData }: { contactData: ContactInfo }) {
  const phones = contactData?.phones;
  const emails = contactData?.emails;
  const addresses = contactData?.addresses;

  return (
    <div className="noise relative overflow-hidden rounded-3xl bg-night p-7 text-bone md:p-9 lg:sticky lg:top-28">
      <p className="font-label text-[11px] font-semibold uppercase tracking-[0.3em] text-bone/45">
        Reach us directly
      </p>

      {/* Phones */}
      {(phones?.mainPhones?.length || 0) > 0 && (
        <div className="mt-7">
          <div className="mb-3 flex items-center gap-2.5 font-label text-[11px] font-semibold uppercase tracking-[0.22em] text-sun">
            <Phone size={13} />
            Phone
          </div>
          <div className="space-y-1.5">
            {(phones?.mainPhones || []).map((phone, idx) => (
              <a
                key={idx}
                href={`tel:${phone}`}
                className="block font-display text-lg font-semibold tracking-tight transition-colors hover:text-sun md:text-xl"
              >
                {phone}
              </a>
            ))}
          </div>
          {phones?.departmentPhones && phones.departmentPhones.length > 0 && (
            <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
              {phones.departmentPhones.map((dept, idx) => (
                <p key={idx} className="flex items-baseline justify-between gap-4 text-sm">
                  <span className="text-bone/50">{dept.department}</span>
                  <a href={`tel:${dept.phone}`} className="font-medium transition-colors hover:text-sun">
                    {dept.phone}
                  </a>
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Emails */}
      {(emails?.length || 0) > 0 && (
        <div className="mt-8">
          <div className="mb-3 flex items-center gap-2.5 font-label text-[11px] font-semibold uppercase tracking-[0.22em] text-sun">
            <Mail size={13} />
            Email
          </div>
          <div className="space-y-2.5">
            {(emails || []).map((email, idx) => (
              <p key={idx} className="text-sm">
                <span className="block font-label text-[10px] font-medium uppercase tracking-[0.18em] text-bone/40">
                  {email.department}
                </span>
                <a
                  href={`mailto:${email.email}`}
                  className="break-all font-medium transition-colors hover:text-sun"
                >
                  {email.email}
                </a>
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Addresses */}
      {(addresses?.length || 0) > 0 && (
        <div className="mt-8">
          <div className="mb-3 flex items-center gap-2.5 font-label text-[11px] font-semibold uppercase tracking-[0.22em] text-sun">
            <MapPin size={13} />
            Visit
          </div>
          <div className="space-y-3.5">
            {(addresses || []).map((addr, idx) => (
              <p key={idx} className="text-sm leading-relaxed">
                <span className="block font-semibold">{addr.name}</span>
                <span className="block text-bone/55">{addr.address}</span>
                <span className="block text-bone/40">{addr.city}</span>
              </p>
            ))}
          </div>
        </div>
      )}
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
      <Reveal variant="fade">
        <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-ink/10 bg-white p-10 text-center">
          <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-leaf/10 text-leaf">
            <CheckCircle2 size={28} />
          </span>
          <h3 className="font-display text-2xl font-bold tracking-tight text-ink">Message Sent</h3>
          <p className="mt-2 text-ink/55">Thank you for reaching out — we'll get back to you soon.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="link-line mt-6 font-label text-xs font-semibold uppercase tracking-[0.14em] text-brand"
          >
            Send another message
          </button>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal variant="fade" delay={120}>
      <form onSubmit={handleSubmit} className="rounded-3xl border border-ink/10 bg-white p-6 md:p-9">
        <p className="font-label text-[11px] font-semibold uppercase tracking-[0.3em] text-ink/45">
          Send a message
        </p>
        <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
          We'd love to hear from you.
        </h3>

        <div className="mt-8 grid grid-cols-1 gap-7 md:grid-cols-2">
          <label className="block">
            <span className="mb-1 block font-label text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/45">
              {form?.nameLabel || 'Name'} *
            </span>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your name"
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="mb-1 block font-label text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/45">
              {form?.emailLabel || 'Email'} *
            </span>
            <input
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@example.com"
              className={inputClass}
            />
          </label>
        </div>
        <label className="mt-7 block">
          <span className="mb-1 block font-label text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/45">
            {form?.subjectLabel || 'Subject'} *
          </span>
          <input
            type="text"
            required
            value={formData.subject}
            onChange={e => setFormData({ ...formData, subject: e.target.value })}
            placeholder="What is this about?"
            className={inputClass}
          />
        </label>
        <label className="mt-7 block">
          <span className="mb-1 block font-label text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/45">
            {form?.messageLabel || 'Message'} *
          </span>
          <textarea
            required
            rows={4}
            value={formData.message}
            onChange={e => setFormData({ ...formData, message: e.target.value })}
            placeholder="Write your message here…"
            className={`${inputClass} resize-none`}
          />
        </label>

        <button
          type="submit"
          className="group mt-9 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 font-label text-[13px] font-semibold uppercase tracking-[0.12em] text-bone transition-colors hover:bg-brand md:w-auto"
        >
          {form?.submitText || 'Send Message'}
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
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
    <section className="border-t border-ink/10 bg-bone py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <SectionHeading
          index="02"
          eyebrow="Find us"
          title="On the Map"
          className="mb-10 md:mb-14"
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {mapLocations.map((location, index) => (
            <Reveal
              key={index}
              variant="fade"
              delay={index * 110}
              className={mapLocations.length === 1 ? 'lg:col-span-2' : ''}
            >
              <div className="overflow-hidden rounded-3xl border border-ink/10 bg-white">
                <p className="flex items-center gap-2.5 px-6 py-4 font-label text-xs font-semibold uppercase tracking-[0.16em] text-ink">
                  <MapPin size={14} className="text-brand" />
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
                  className="w-full"
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
        crumb="Contact"
        title={contactData?.hero?.title || 'Contact Us'}
        subtitle={contactData?.hero?.subtitle}
        images={contactData?.hero?.images}
      />

      <section className="border-t border-ink/10 bg-bone py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <SectionHeading
            index="01"
            eyebrow="Get in touch"
            title={contactData.sectionTitle || 'Our Address & Contact Details'}
            className="mb-10 md:mb-14"
          />
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
            <InfoPanel contactData={contactData} />
            <ContactForm contactData={contactData} />
          </div>
        </div>
      </section>

      <MapSection contactData={contactData} />
    </div>
  );
}
