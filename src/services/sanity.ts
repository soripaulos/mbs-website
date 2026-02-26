import { sanityClient } from '../sanity/client';
import type {
  SiteSettings,
  GalleryImage,
  ContactInfo,
  StaffPage,
  GalleryPage,
  StaffProfile,
  Department,
  HomePage,
  AboutPage,
  Stat,
  Facility,
  AcademicLevel,
  Service,
  Branch,
  SocialPost,
} from '../types';

// Fetch Site Settings (logo, social links, description, footer)
export const fetchSiteSettings = async (): Promise<SiteSettings | null> => {
  const query = `*[_type == "siteSettings"] | order(_updatedAt desc)[0] {
    title,
    description,
    "logo": logo.asset->url,
    "logoMobile": logoMobile.asset->url,
    "favicon": favicon.asset->url,
    "footerLogo": footerLogo.asset->url,
    footerDescription,
    footerContact,
    copyright,
    socialLinks {
      facebook,
      telegram,
      tiktok,
      youtube
    },
    facebookPageId,
    facebookAccessToken
  }`;

  try {
    const result = await sanityClient.fetch(query);
    return result;
  } catch (error) {
    console.error('[Sanity] Error fetching site settings:', error);
    return null;
  }
};

// Helper: append optimization parameters to Sanity image URLs
function optimizeImageUrl(url: string | undefined | null) {
  if (!url) return url;
  if (url.includes('cdn.sanity.io')) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}auto=format&w=1920&q=80`;
  }
  return url;
}

// Helper: ensure hero images is always an array (Sanity returns null if no images uploaded)
function ensureHeroImages(hero: any): any {
  if (!hero) return { images: [], title: '', subtitle: '', overlayColor: '' };
  const rawImages = hero.images && hero.images.length > 0 ? hero.images : [];
  return {
    ...hero,
    images: rawImages.map(optimizeImageUrl),
  };
}

// Fetch Contact Page Data
export const fetchContactPageData = async (): Promise<ContactInfo | null> => {
  const query = `*[_type == "contactPage"] | order(_updatedAt desc)[0] {
    "hero": {
      "images": hero.images[].asset->url,
      "title": hero.title,
      "subtitle": hero.subtitle,
      "overlayColor": hero.overlayColor
    },
    sectionTitle,
    phones {
      mainPhones,
      "departmentPhones": departmentPhones[] {
        department,
        phone
      }
    },
    "emails": emails[] {
      department,
      email
    },
    "addresses": addresses[] {
      name,
      address,
      city
    },
    form {
      enabled,
      nameLabel,
      emailLabel,
      subjectLabel,
      messageLabel,
      submitText
    },
    "mapLocations": mapLocations[] {
      title,
      embedUrl,
      titleColor
    }
  }`;

  try {
    const result = await sanityClient.fetch(query);
    result.hero = ensureHeroImages(result.hero);
    return result;
  } catch (error) {
    console.error('[Sanity] Error fetching contact page data:', error);
    return null;
  }
};

// Fetch Staff Page Data (hero + section titles only — staff profiles are not in Sanity)
export const fetchStaffPageData = async (): Promise<StaffPage | null> => {
  const query = `*[_type == "staffPage"] | order(_updatedAt desc)[0] {
    "hero": {
      "images": hero.images[].asset->url,
      "title": hero.title,
      "subtitle": hero.subtitle,
      "overlayColor": hero.overlayColor
    },
    sectionTitles {
      foundersTitle,
      directorsTitle,
      directorsSubtitle,
      viceDirectorsTitle,
      viceDirectorsSubtitle,
      departmentsTitle
    }
  }`;

  try {
    const result = await sanityClient.fetch(query);
    result.hero = ensureHeroImages(result.hero);
    return result;
  } catch (error) {
    console.error('[Sanity] Error fetching staff page data:', error);
    return null;
  }
};

// Fetch Gallery Page Data (hero + settings)
export const fetchGalleryPageData = async (): Promise<GalleryPage | null> => {
  const query = `*[_type == "galleryPage"] | order(_updatedAt desc)[0] {
    "hero": {
      "images": hero.images[].asset->url,
      "title": hero.title,
      "subtitle": hero.subtitle,
      "overlayColor": hero.overlayColor
    },
    settings {
      showCategories,
      imagesPerPage,
      loadMoreText
    }
  }`;

  try {
    const result = await sanityClient.fetch(query);
    result.hero = ensureHeroImages(result.hero);
    return result;
  } catch (error) {
    console.error('[Sanity] Error fetching gallery page data:', error);
    return null;
  }
};

// Fetch Gallery Images
export const fetchGalleryImages = async (): Promise<GalleryImage[]> => {
  const query = `*[_type == "galleryImage"] | order(order asc) {
    "id": _id,
    "image": image.asset->url,
    caption,
    category,
    date,
    order
  }`;

  try {
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error('[Sanity] Error fetching gallery images:', error);
    return [];
  }
};

// Fetch Staff Profiles
export const fetchStaffProfiles = async (): Promise<StaffProfile[]> => {
  const query = `*[_type == "staffProfile"] | order(order asc) {
    "id": _id,
    name,
    role,
    category,
    "image": image.asset->url,
    phones,
    email,
    bio,
    order
  }`;

  try {
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error('[Sanity] Error fetching staff profiles:', error);
    return [];
  }
};

// Fetch Departments
export const fetchDepartments = async (): Promise<Department[]> => {
  const query = `*[_type == "department"] | order(order asc) {
    "id": _id,
    name,
    description,
    "image": image.asset->url,
    headerFont,
    order
  }`;

  try {
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error('[Sanity] Error fetching departments:', error);
    return [];
  }
};

// Fetch Home Page Data
export const fetchHomePageData = async (): Promise<HomePage | null> => {
  // Query for the document that actually has images in it, to avoid empty duplicates
  const query = `*[_type == "homePage" && defined(hero.images)] | order(_updatedAt desc)[0] {
    "hero": {
      "images": hero.images[].asset->url,
      "title": hero.title,
      "subtitle": hero.subtitle,
      "overlayColor": hero.overlayColor,
      "buttonText": hero.buttonText,
      "buttonLink": hero.buttonLink
    },
    grandOpening {
      badge,
      title,
      subtitle,
      description,
      "images": images[].asset->url,
      features[] {
        icon,
        title,
        description,
        bgColor
      }
    },
    pillars[] {
      icon,
      title,
      description,
      bgColor,
      iconColor
    },
    aboutSection {
      title,
      content,
      "backgroundImage": backgroundImage.asset->url,
      buttonText,
      buttonLink
    },
    latestUpdates {
      title,
      showCount,
      buttonText
    }
  }`;

  try {
    const result = await sanityClient.fetch(query);
    result.hero = ensureHeroImages(result.hero);
    return result;
  } catch (error) {
    console.error('[Sanity] Error fetching home page data:', error);
    return null;
  }
};

// Fetch About Page Data
export const fetchAboutPageData = async (): Promise<AboutPage | null> => {
  const query = `*[_type == "aboutPage"] | order(_updatedAt desc)[0] {
    "hero": {
      "images": hero.images[].asset->url,
      "title": hero.title,
      "subtitle": hero.subtitle,
      "overlayColor": hero.overlayColor
    },
    intro {
      title,
      content
    }
  }`;

  try {
    const result = await sanityClient.fetch(query);
    result.hero = ensureHeroImages(result.hero);
    return result;
  } catch (error) {
    console.error('[Sanity] Error fetching about page data:', error);
    return null;
  }
};

// Fetch Student Portal App Section Data
export const fetchStudentPortalApp = async (): Promise<any> => {
  const query = `*[_type == "homePage"] | order(_updatedAt desc)[0].studentPortalApp {
    badge,
    title,
    subtitle,
    description,
    "appImage": appImage.asset->url,
    features[] {
      icon,
      title,
      description
    },
    downloadLinks {
      appStore,
      playStore,
      webPortal
    }
  }`;

  try {
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error('[Sanity] Error fetching student portal app data:', error);
    return null;
  }
};

// Fetch Stats
export const fetchStats = async (): Promise<Stat[]> => {
  const query = `*[_type == "stat"] | order(order asc) {
    "id": _id,
    label,
    value,
    suffix,
    order
  }`;
  try {
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error('[Sanity] Error fetching stats:', error);
    return [];
  }
};

// Fetch Facilities
export const fetchFacilities = async (): Promise<Facility[]> => {
  const query = `*[_type == "facility"] | order(order asc) {
    "id": _id,
    title,
    description,
    "mainImage": mainImage.asset->url,
    "gallery": gallery[].asset->url,
    colSpan,
    icon,
    order
  }`;
  try {
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error('[Sanity] Error fetching facilities:', error);
    return [];
  }
};

// Fetch Academic Levels
export const fetchAcademicLevels = async (): Promise<AcademicLevel[]> => {
  const query = `*[_type == "academicLevel"] | order(order asc) {
    "id": _id,
    level,
    description,
    "mainImage": mainImage.asset->url,
    features,
    extendedDescription,
    director {
      name,
      role,
      "image": image.asset->url,
      message
    },
    "gallery": gallery[].asset->url,
    order
  }`;
  try {
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error('[Sanity] Error fetching academic levels:', error);
    return [];
  }
};

// Fetch Services
export const fetchServices = async (): Promise<Service[]> => {
  const query = `*[_type == "service"] | order(order asc) {
    "id": _id,
    title,
    description,
    icon,
    iconColor,
    order
  }`;
  try {
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error('[Sanity] Error fetching services:', error);
    return [];
  }
};

// Fetch Branches
export const fetchBranches = async (): Promise<Branch[]> => {
  const query = `*[_type == "branch"] | order(order asc) {
    "id": _id,
    name,
    location,
    description,
    "image": image.asset->url,
    features,
    order
  }`;
  try {
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error('[Sanity] Error fetching branches:', error);
    return [];
  }
};

// Fetch Social Posts
export const fetchSocialPosts = async (): Promise<SocialPost[]> => {
  const query = `*[_type == "socialPost"] | order(date desc) {
    "id": _id,
    content,
    "images": images[].asset->url,
    date,
    url,
    platform
  }`;
  try {
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error('[Sanity] Error fetching social posts:', error);
    return [];
  }
};
