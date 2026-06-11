import { sanityClient } from '../sanity/client';
import {
  optimizeImageUrl,
  optimizeImageUrls,
  applyPresetToPaths,
} from '../sanity/image';
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
  DembiDolloPage,
} from '../types';

// Back-compat shim so any other file in the codebase that still imports
// the local helpers continues to work. New code should import from
// '@/sanity/image' instead.
export { optimizeImageUrl, optimizeImageUrls };

// Apply the hero preset to the .images array on any hero-shaped object.
// Returns a normalized object with a guaranteed `images: string[]`.
function normalizeHero(hero: any): any {
  const base = hero ?? {};
  const images = optimizeImageUrls(base.images, 'hero');
  return { ...base, images };
}

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
    if (!result) return null;
    applyPresetToPaths(result, ['logo', 'logoMobile', 'footerLogo'], 'logo');
    // favicon is left as-is — it's served as a 32x32 icon, optimization
    // would just round-trip the same bytes.
    return result;
  } catch (error) {
    console.error('[Sanity] Error fetching site settings:', error);
    return null;
  }
};

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
    if (!result) return null;
    result.hero = normalizeHero(result.hero);
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
    result.hero = normalizeHero(result.hero);
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
    result.hero = normalizeHero(result.hero);
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
    const rows = await sanityClient.fetch(query);
    return Array.isArray(rows)
      ? rows.map((r) => {
          applyPresetToPaths(r, ['image'], 'gallery');
          return r;
        })
      : rows;
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
    const rows = await sanityClient.fetch(query);
    return Array.isArray(rows)
      ? rows.map((r) => {
          applyPresetToPaths(r, ['image'], 'staffAvatar');
          return r;
        })
      : rows;
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
    const rows = await sanityClient.fetch(query);
    return Array.isArray(rows)
      ? rows.map((r) => {
          applyPresetToPaths(r, ['image'], 'gallery');
          return r;
        })
      : rows;
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
    if (!result) return null;
    result.hero = normalizeHero(result.hero);
    applyPresetToPaths(result, [
      'grandOpening.images[]',
      'aboutSection.backgroundImage',
    ], 'sectionBg');
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
    result.hero = normalizeHero(result.hero);
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
    const result = await sanityClient.fetch(query);
    if (result) {
      applyPresetToPaths(result, ['appImage'], 'appScreenshot');
    }
    return result;
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
    const rows = await sanityClient.fetch(query);
    return Array.isArray(rows)
      ? rows.map((r) => {
          applyPresetToPaths(r, ['mainImage'], 'facility');
          applyPresetToPaths(r, ['gallery[]'], 'gallery');
          return r;
        })
      : rows;
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
    const rows = await sanityClient.fetch(query);
    return Array.isArray(rows)
      ? rows.map((r) => {
          applyPresetToPaths(r, ['mainImage'], 'facility');
          applyPresetToPaths(r, ['gallery[]'], 'gallery');
          applyPresetToPaths(r, ['director.image'], 'staffAvatar');
          return r;
        })
      : rows;
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
    const rows = await sanityClient.fetch(query);
    return Array.isArray(rows)
      ? rows.map((r) => {
          applyPresetToPaths(r, ['image'], 'branch');
          return r;
        })
      : rows;
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
    const rows = await sanityClient.fetch(query);
    return Array.isArray(rows)
      ? rows.map((r) => {
          applyPresetToPaths(r, ['images[]'], 'socialPost');
          return r;
        })
      : rows;
  } catch (error) {
    console.error('[Sanity] Error fetching social posts:', error);
    return [];
  }
};

// Fetch Dembi Dollo Page Data
export const fetchDembiDolloPage = async (): Promise<DembiDolloPage | null> => {
  const query = `*[_type == "dembiDolloPage"] | order(_updatedAt desc)[0] {
    title,
    hero {
      title,
      subtitle,
      "images": images[].asset->url,
      overlayColor
    },
    story {
      sectionTitle,
      ideaTitle,
      ideaContent,
      "ideaImage": ideaImage.asset->url,
      "ideaImageCaption": ideaImage.caption,
      locationTitle,
      locationContent,
      "locationImage": locationImage.asset->url,
      "locationImageCaption": locationImage.caption
    },
    gallery {
      sectionTitle,
      "sectionSubtitle": sectionSubtitle
    },
    compoundSection {
      title,
      description,
      "images": images[] {
        "url": asset->url,
        caption
      }
    },
    classroomsSection {
      title,
      description,
      "images": images[] {
        "url": asset->url,
        caption
      }
    },
    activitiesSection {
      title,
      description,
      "images": images[] {
        "url": asset->url,
        caption
      }
    },
    staff {
      sectionTitle,
      "sectionSubtitle": sectionSubtitle,
      "members": members[] {
        name,
        role,
        "image": image.asset->url,
        isGroupPhoto
      }
    },
    communitySupport {
      sectionTitle,
      sectionDescription,
      localTitle,
      localDescription,
      internationalTitle,
      internationalDescription,
      "initiatives": initiatives[] {
        title,
        description,
        initiativeType,
        "images": images[] {
          "url": asset->url,
          caption
        }
      }
    },
    contact {
      sectionTitle,
      sectionDescription,
      address,
      phone,
      email,
      mapEmbedUrl,
      ctaTitle,
      ctaDescription,
      ctaButtonText,
      ctaButtonLink
    }
  }`;

  try {
    const result = await sanityClient.fetch(query);
    if (!result) return null;

    // Hero
    result.hero = normalizeHero(result.hero);
    if (!result.hero?.images?.length) {
      result.hero.images = ['https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600'];
    }

    // Story: 2 main images, no nested arrays
    applyPresetToPaths(result, [
      'story.ideaImage',
      'story.locationImage',
    ], 'sectionBg');

    // Compound / Classrooms / Activities: each has an .images[] of { url, caption }
    for (const section of ['compoundSection', 'classroomsSection', 'activitiesSection']) {
      const arr = result[section]?.images;
      if (Array.isArray(arr)) {
        for (const item of arr) {
          if (item?.url) item.url = optimizeImageUrl(item.url, 'sectionBg');
        }
      }
    }

    // Staff members inside DembiDollo (different schema — has members[].image)
    const members = result.staff?.members;
    if (Array.isArray(members)) {
      for (const m of members) {
        if (m?.image) m.image = optimizeImageUrl(m.image, 'staffAvatar');
      }
    }

    // Community support initiatives have nested .images[] of { url, caption }
    const initiatives = result.communitySupport?.initiatives;
    if (Array.isArray(initiatives)) {
      for (const init of initiatives) {
        if (Array.isArray(init?.images)) {
          for (const item of init.images) {
            if (item?.url) item.url = optimizeImageUrl(item.url, 'gallery');
          }
        }
      }
    }

    return result;
  } catch (error) {
    console.error('[Sanity] Error fetching Dembi Dollo page data:', error);
    return null;
  }
};
