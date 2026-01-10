import { sanityClient, getImageUrl } from '../sanity/client';
import type { 
  AboutPageData, 
  StaffPageData, 
  SocialPost, 
  GalleryImage,
  Stat,
  Facility,
  AcademicLevel,
  Service,
  Branch,
  StaffProfile,
  StaffDepartment
} from '../types';

// Default placeholder images
const DEFAULT_PERSON_IMAGE = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
const DEFAULT_DEPARTMENT_IMAGE = 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
const DEFAULT_HERO_IMAGE = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';
const DEFAULT_FACILITY_IMAGE = 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

// Map tailwind-like tokens to real CSS colors so that old values still work
const colorTokenMap: Record<string, string> = {
  'bg-school-brand/80': 'rgba(37, 55, 107, 0.8)',
  'bg-school-brand': 'rgb(37, 55, 107)',
  'bg-school-dark-blue/80': 'rgba(28, 43, 96, 0.8)',
  'bg-school-dark-blue': 'rgb(28, 43, 96)',
  'bg-school-pink/80': 'rgba(232, 121, 149, 0.8)',
  'bg-school-pink': 'rgb(232, 121, 149)',
  'bg-school-yellow/80': 'rgba(249, 195, 75, 0.8)',
  'bg-school-yellow': 'rgb(249, 195, 75)',
};

// Helper: normalize any color value (CSS string, legacy tailwind token, or legacy Sanity color object)
const getColor = (color: any, defaultColor: string = 'rgba(37, 55, 107, 0.8)'): string => {
  if (!color) return defaultColor;
  if (typeof color === 'string') {
    if (colorTokenMap[color]) return colorTokenMap[color];
    return color;
  }
  if (color.hex) {
    const alpha = color.alpha ?? 0.8;
    const hex = color.hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return defaultColor;
};

// ==================== HOME PAGE ====================
export const fetchHomePageData = async () => {
  const query = `*[_type == "homePage"][0]{
    hero{
      title,
      subtitle,
      buttonText,
      buttonLink,
      "images": coalesce(images[].asset->url, carouselImages[].asset->url),
      overlayColor
    },
    grandOpening{
      badge,
      title,
      subtitle,
      description,
      "images": coalesce(images[].asset->url, carouselImages[].asset->url),
      features[]{
        icon,
        title,
        description,
        bgColor
      }
    },
    pillars[]{
      icon,
      title,
      description,
      bgColor,
      iconColor
    },
    aboutSection{
      title,
      content,
      buttonText,
      buttonLink,
      "backgroundImage": backgroundImage.asset->url
    },
    latestUpdates{
      title,
      showCount,
      buttonText
    }
  }`;
  
  const data = await sanityClient.fetch(query);
  
  // Process colors
  if (data) {
    if (data.hero?.overlayColor) {
      data.hero.overlayColorCSS = getColor(data.hero.overlayColor, 'rgba(37, 55, 107, 0.8)');
    }
    if (data.grandOpening?.features) {
      data.grandOpening.features = data.grandOpening.features.map((f: any) => ({
        ...f,
        bgColorCSS: getColor(f.bgColor, 'rgba(37, 55, 107, 1)')
      }));
    }
    if (data.pillars) {
      data.pillars = data.pillars.map((p: any) => ({
        ...p,
        bgColorCSS: getColor(p.bgColor, 'rgba(219, 234, 254, 1)'),
        iconColorCSS: getColor(p.iconColor, 'rgba(37, 55, 107, 1)')
      }));
    }
    if (data.aboutSection && !data.aboutSection.backgroundImage) {
      data.aboutSection.backgroundImage = DEFAULT_HERO_IMAGE;
    }
  }
  
  return data;
};

// ==================== ABOUT PAGE ====================
export const fetchAboutPageData = async (): Promise<AboutPageData> => {
  // Fetch the about page structure
  const aboutQuery = `*[_type == "aboutPage"][0]{
    hero{
      title,
      subtitle,
      "images": images[].asset->url,
      overlayColor
    },
    intro{
      title,
      content[]
    },
    "statsRefs": stats[]->_id,
    "facilitiesRefs": facilities[]->_id,
    "academicsRefs": academics[]->_id,
    "servicesRefs": services[]->_id,
    "branchesRefs": branches[]->_id
  }`;
  
  // Fetch all related content
  const [aboutData, stats, facilities, academics, services, branches] = await Promise.all([
    sanityClient.fetch(aboutQuery),
    sanityClient.fetch(`*[_type == "stat"] | order(order asc){
      _id, label, value, suffix
    }`),
    sanityClient.fetch(`*[_type == "facility"] | order(order asc){
      _id, 
      "id": id.current,
      title, 
      description, 
      icon, 
      colSpan,
      "image": mainImage.asset->url,
      "gallery": gallery[].asset->url
    }`),
    sanityClient.fetch(`*[_type == "academicLevel"] | order(order asc){
      _id,
      "id": id.current,
      level,
      description,
      "image": mainImage.asset->url,
      features[],
      extendedDescription,
      director{
        name,
        role,
        "image": image.asset->url,
        message
      },
      "gallery": gallery[].asset->url
    }`),
    sanityClient.fetch(`*[_type == "service"] | order(order asc){
      _id, title, description, icon, iconColor
    }`),
    sanityClient.fetch(`*[_type == "branch"] | order(order asc){
      _id, name, location, description, features[],
      "image": image.asset->url
    }`)
  ]);

  return {
    hero: {
      title: aboutData?.hero?.title || 'Nurturing Excellence',
      subtitle: aboutData?.hero?.subtitle || 'A Legacy of 15 Years in Education',
      images: aboutData?.hero?.images?.length > 0 ? aboutData.hero.images : [],
      overlayColor: getColor(aboutData?.hero?.overlayColor, 'rgba(37, 55, 107, 0.8)')
    },
    intro: aboutData?.intro || {
      title: 'Welcome to Makko Billi School',
      content: []
    },
    stats: stats.map((s: any) => ({ id: s._id, ...s })),
    facilities: facilities.map((f: any) => ({ 
      id: f.id || f._id, 
      ...f,
      image: f.image || DEFAULT_FACILITY_IMAGE,
      gallery: f.gallery || []
    })),
    academics: academics.map((a: any) => ({ 
      id: a.id || a._id, 
      ...a,
      image: a.image || DEFAULT_HERO_IMAGE,
      gallery: a.gallery || [],
      director: {
        ...a.director,
        image: a.director?.image || DEFAULT_PERSON_IMAGE
      }
    })),
    services: services.map((s: any) => ({ 
      id: s._id, 
      ...s,
      iconColorCSS: getColor(s.iconColor, 'rgba(37, 55, 107, 1)')
    })),
    branches: branches.map((b: any) => ({ 
      id: b._id, 
      ...b,
      image: b.image || DEFAULT_HERO_IMAGE
    }))
  };
};

// ==================== STAFF PAGE ====================
export const fetchStaffPageData = async (): Promise<StaffPageData> => {
  const [pageData, founders, directors, viceDirectors, departments] = await Promise.all([
    sanityClient.fetch(`*[_type == "staffPage"][0]{
      hero{
        title,
        subtitle,
        "images": images[].asset->url,
        overlayColor
      },
      sectionTitles
    }`),
    sanityClient.fetch(`*[_type == "staffProfile" && category == "founder"] | order(order asc){
      _id, name, role, phones[], email,
      "image": image.asset->url
    }`),
    sanityClient.fetch(`*[_type == "staffProfile" && category == "director"] | order(order asc){
      _id, name, role, phones[], email,
      "image": image.asset->url
    }`),
    sanityClient.fetch(`*[_type == "staffProfile" && category == "vice-director"] | order(order asc){
      _id, name, role, phones[], email,
      "image": image.asset->url
    }`),
    sanityClient.fetch(`*[_type == "department"] | order(order asc){
      _id, name, description,
      "image": image.asset->url
    }`)
  ]);

  // Process hero overlay color
  const heroOverlayColor = getColor(pageData?.hero?.overlayColor, 'rgba(37, 55, 107, 0.8)');

  return {
    pageData: pageData ? {
      ...pageData,
      hero: {
        ...pageData.hero,
        overlayColor: heroOverlayColor
      }
    } : null,
    founders: founders.map((s: any) => ({ 
      id: s._id, 
      ...s, 
      image: s.image || DEFAULT_PERSON_IMAGE 
    })),
    directors: directors.map((s: any) => ({ 
      id: s._id, 
      ...s,
      image: s.image || DEFAULT_PERSON_IMAGE
    })),
    viceDirectors: viceDirectors.map((s: any) => ({ 
      id: s._id, 
      ...s,
      image: s.image || DEFAULT_PERSON_IMAGE
    })),
    departments: departments.map((d: any) => ({ 
      id: d._id, 
      ...d,
      image: d.image || DEFAULT_DEPARTMENT_IMAGE
    }))
  };
};

// ==================== GALLERY PAGE ====================
export const fetchGalleryPageData = async () => {
  const pageData = await sanityClient.fetch(`*[_type == "galleryPage"][0]{
    hero{
      title,
      subtitle,
      "images": images[].asset->url,
      overlayColor
    },
    settings
  }`);

  return {
    hero: {
      title: pageData?.hero?.title || 'Gallery',
      subtitle: pageData?.hero?.subtitle || 'Capturing Moments',
      images: pageData?.hero?.images?.length > 0 ? pageData.hero.images : [],
      images: pageData?.hero?.images?.length > 0 ? pageData.hero.images : [],
      overlayColor: getColor(pageData?.hero?.overlayColor, 'rgba(37, 55, 107, 0.8)')
    },
    settings: pageData?.settings || {
      showCategories: true,
      imagesPerPage: 12,
      loadMoreText: 'Load more'
    }
  };
};

export const fetchGalleryImages = async (): Promise<GalleryImage[]> => {
  const images = await sanityClient.fetch(`*[_type == "galleryImage"] | order(order desc, date desc){
    _id,
    "url": image.asset->url,
    caption,
    category,
    date
  }`);

  return images.map((img: any) => ({
    id: img._id,
    url: img.url,
    caption: img.caption || 'School Photo',
    category: img.category || 'other'
  }));
};

// ==================== CONTACT PAGE ====================
export const fetchContactPageData = async () => {
  const pageData = await sanityClient.fetch(`*[_type == "contactPage"][0]{
    hero{
      title,
      subtitle,
      "images": images[].asset->url,
      overlayColor
    },
    sectionTitle,
    phones{
      mainPhones[],
      departmentPhones[]{
        department,
        phone
      }
    },
    emails[]{
      department,
      email
    },
    addresses[]{
      name,
      address,
      city
    },
    form,
    mapLocations[]{
      title,
      embedUrl,
      titleColor
    }
  }`);

  return {
    hero: {
      title: pageData?.hero?.title || 'Contact Us',
      subtitle: pageData?.hero?.subtitle || 'Get in Touch with Us',
      images: pageData?.hero?.images?.length > 0 ? pageData.hero.images : [],
      overlayColor: getColor(pageData?.hero?.overlayColor, 'rgba(232, 121, 149, 0.8)')
    },
    sectionTitle: pageData?.sectionTitle || 'Our Address & Contact Details',
    phones: pageData?.phones || { mainPhones: [], departmentPhones: [] },
    emails: pageData?.emails || [],
    addresses: pageData?.addresses || [],
    form: pageData?.form || {
      enabled: true,
      nameLabel: 'Name*',
      emailLabel: 'Email*',
      subjectLabel: 'Subject*',
      messageLabel: 'Your Message*',
      submitText: 'Send Message'
    },
    mapLocations: (pageData?.mapLocations || []).map((loc: any) => ({
      ...loc,
      titleColorCSS: getColor(loc.titleColor, 'rgba(37, 55, 107, 1)')
    }))
  };
};

// ==================== SOCIAL POSTS (Manual Sanity Posts) ====================
export const fetchSocialPosts = async (): Promise<SocialPost[]> => {
  const posts = await sanityClient.fetch(`*[_type == "socialPost"] | order(date desc)[0...10]{
    _id,
    content,
    "images": images[].asset->url,
    date,
    url,
    platform
  }`);

  return posts.map((post: any) => ({
    id: post._id,
    content: post.content,
    images: post.images || [],
    date: new Date(post.date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }),
    url: post.url,
    source: 'sanity' // Mark as manual post from Sanity
  }));
};

// ==================== SITE SETTINGS ====================
export const fetchSiteSettings = async () => {
  return await sanityClient.fetch(`*[_type == "siteSettings"][0]{
    title,
    description,
    "logo": logo.asset->url,
    "logoMobile": logoMobile.asset->url,
    "favicon": favicon.asset->url,
    "footerLogo": footerLogo.asset->url,
    footerDescription,
    footerContact,
    copyright,
    socialLinks,
    facebookPageId,
    facebookAccessToken
  }`);
};

// ==================== CONTACT INFO (Legacy - kept for backwards compatibility) ====================
export const fetchContactInfo = async () => {
  return await sanityClient.fetch(`*[_type == "contactInfo"][0]{
    mainPhones[],
    departmentPhones[]{
      department,
      phone
    },
    emails[],
    address,
    location{
      city,
      region,
      country
    }
  }`);
};
