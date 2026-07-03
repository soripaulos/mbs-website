import { getSingle, getList, resolveImageUrl, resolveImageUrls, splitLines } from '../frappe/client';
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

// Helper: build a HeroSection-shaped object from the flat hero_* fields Frappe returns
function buildHero(doc: any): { images: string[]; title: string; subtitle: string; overlayColor?: string; buttonText?: string; buttonLink?: string } {
  if (!doc) return { images: [], title: '', subtitle: '', overlayColor: '' };
  const images = resolveImageUrls((doc.hero_images || []).map((row: any) => row.image));
  return {
    images,
    title: doc.hero_title || '',
    subtitle: doc.hero_subtitle || '',
    overlayColor: doc.hero_overlay_color || '',
    ...(doc.hero_button_text !== undefined ? { buttonText: doc.hero_button_text } : {}),
    ...(doc.hero_button_link !== undefined ? { buttonLink: doc.hero_button_link } : {}),
  };
}

function captionedImages(rows: any[] | undefined): { url: string; caption?: string }[] {
  if (!rows) return [];
  return rows
    .filter((row) => row?.image)
    .map((row) => ({ url: resolveImageUrl(row.image) as string, caption: row.caption || undefined }));
}

// Fetch Site Settings (logo, social links, description, footer)
export const fetchSiteSettings = async (): Promise<SiteSettings | null> => {
  const doc = await getSingle<any>('MBS Site Settings');
  if (!doc) return null;
  return {
    title: doc.title,
    description: doc.description,
    logo: resolveImageUrl(doc.logo, { width: 200 }),
    logoMobile: resolveImageUrl(doc.logo_mobile, { width: 120 }),
    favicon: resolveImageUrl(doc.favicon),
    footerLogo: resolveImageUrl(doc.footer_logo, { width: 150 }),
    footerDescription: doc.footer_description,
    footerContact: {
      phone: doc.footer_contact_phone,
      email: doc.footer_contact_email,
      address: doc.footer_contact_address,
    },
    copyright: doc.copyright,
    socialLinks: {
      facebook: doc.social_facebook,
      telegram: doc.social_telegram,
      tiktok: doc.social_tiktok,
      youtube: doc.social_youtube,
    },
    facebookPageId: doc.facebook_page_id,
    facebookAccessToken: doc.facebook_access_token,
    studentPortalUrl: doc.student_portal_url,
  };
};

// Fetch Contact Page Data
export const fetchContactPageData = async (): Promise<ContactInfo | null> => {
  const doc = await getSingle<any>('MBS Contact Page');
  if (!doc) return null;
  return {
    hero: buildHero(doc),
    sectionTitle: doc.section_title,
    phones: {
      mainPhones: splitLines(doc.main_phones),
      departmentPhones: (doc.department_phones || []).map((row: any) => ({
        department: row.department,
        phone: row.phone,
      })),
    },
    emails: (doc.emails || []).map((row: any) => ({ department: row.department, email: row.email })),
    addresses: (doc.addresses || []).map((row: any) => ({
      name: row.location_name,
      address: row.address,
      city: row.city,
    })),
    form: {
      enabled: !!doc.form_enabled,
      nameLabel: doc.form_name_label,
      emailLabel: doc.form_email_label,
      subjectLabel: doc.form_subject_label,
      messageLabel: doc.form_message_label,
      submitText: doc.form_submit_text,
    },
    mapLocations: (doc.map_locations || []).map((row: any) => ({
      title: row.title,
      embedUrl: row.embed_url,
      titleColor: row.title_color,
    })),
  };
};

// Fetch Staff Page Data (hero + section titles only — staff profiles are a separate list)
export const fetchStaffPageData = async (): Promise<StaffPage | null> => {
  const doc = await getSingle<any>('MBS Staff Page');
  if (!doc) return null;
  return {
    hero: buildHero(doc),
    sectionTitles: {
      foundersTitle: doc.founders_title,
      directorsTitle: doc.directors_title,
      directorsSubtitle: doc.directors_subtitle,
      viceDirectorsTitle: doc.vice_directors_title,
      viceDirectorsSubtitle: doc.vice_directors_subtitle,
      departmentsTitle: doc.departments_title,
    },
  };
};

// Fetch Gallery Page Data (hero + settings)
export const fetchGalleryPageData = async (): Promise<GalleryPage | null> => {
  const doc = await getSingle<any>('MBS Gallery Page');
  if (!doc) return null;
  return {
    hero: buildHero(doc),
    settings: {
      showCategories: !!doc.show_categories,
      imagesPerPage: doc.images_per_page,
      loadMoreText: doc.load_more_text,
    },
  };
};

// Fetch Gallery Images
export const fetchGalleryImages = async (): Promise<GalleryImage[]> => {
  const rows = await getList<any>('MBS Gallery Image', 'order asc');
  return rows.map((row) => ({
    id: row.name,
    image: resolveImageUrl(row.image) as string,
    caption: row.caption,
    category: row.category,
    date: row.date,
    order: row.order,
  }));
};

// Fetch Staff Profiles
export const fetchStaffProfiles = async (): Promise<StaffProfile[]> => {
  const rows = await getList<any>('MBS Staff Profile', 'order asc');
  return rows.map((row) => ({
    id: row.name,
    name: row.staff_name,
    role: row.role,
    category: row.category,
    image: resolveImageUrl(row.image),
    phones: splitLines(row.phones),
    email: row.email,
    bio: row.bio,
    order: row.order,
  }));
};

// Fetch Departments
export const fetchDepartments = async (): Promise<Department[]> => {
  const rows = await getList<any>('MBS Department', 'order asc');
  return rows.map((row) => ({
    id: row.name,
    name: row.department_name,
    description: row.description,
    image: resolveImageUrl(row.image),
    headerFont: row.header_font,
    order: row.order,
  }));
};

// Fetch Home Page Data
export const fetchHomePageData = async (): Promise<HomePage | null> => {
  const doc = await getSingle<any>('MBS Home Page');
  if (!doc) return null;
  return {
    hero: buildHero(doc),
    studentPortalApp: undefined as any,
    grandOpening: {
      badge: doc.grand_opening_badge,
      title: doc.grand_opening_title,
      subtitle: doc.grand_opening_subtitle,
      description: doc.grand_opening_description,
      images: resolveImageUrls((doc.grand_opening_images || []).map((row: any) => row.image)),
      features: (doc.grand_opening_features || []).map((row: any) => ({
        icon: row.icon,
        title: row.title,
        description: row.description,
        bgColor: row.bg_color,
      })),
    },
    pillars: (doc.pillars || []).map((row: any) => ({
      icon: row.icon,
      title: row.title,
      description: row.description,
      bgColor: row.bg_color,
      iconColor: row.icon_color,
    })),
    aboutSection: {
      title: doc.about_title,
      content: doc.about_content,
      backgroundImage: resolveImageUrl(doc.about_background_image),
      buttonText: doc.about_button_text,
      buttonLink: doc.about_button_link,
    },
    latestUpdates: {
      title: doc.latest_updates_title,
      showCount: doc.latest_updates_show_count,
      buttonText: doc.latest_updates_button_text,
    },
  };
};

// Fetch About Page Data
export const fetchAboutPageData = async (): Promise<AboutPage | null> => {
  const doc = await getSingle<any>('MBS About Page');
  if (!doc) return null;
  return {
    hero: buildHero(doc),
    intro: {
      title: doc.intro_title,
      content: (doc.intro_content || '').split('\n\n').map((p: string) => p.trim()).filter(Boolean),
    },
  } as AboutPage;
};

// Fetch Student Portal App Section Data (lives on the Home Page single doc)
export const fetchStudentPortalApp = async (): Promise<any> => {
  const doc = await getSingle<any>('MBS Home Page');
  if (!doc) return null;
  return {
    badge: doc.student_portal_badge,
    title: doc.student_portal_title,
    subtitle: doc.student_portal_subtitle,
    description: doc.student_portal_description,
    appImage: resolveImageUrl(doc.student_portal_app_image),
    features: (doc.student_portal_features || []).map((row: any) => ({
      icon: row.icon,
      title: row.title,
      description: row.description,
    })),
    downloadLinks: {
      appStore: doc.student_portal_appstore_link,
      playStore: doc.student_portal_playstore_link,
      webPortal: doc.student_portal_webportal_link,
    },
  };
};

// Fetch Stats
export const fetchStats = async (): Promise<Stat[]> => {
  const rows = await getList<any>('MBS Stat', 'order asc');
  return rows.map((row) => ({
    id: row.name,
    label: row.label,
    value: row.value,
    suffix: row.suffix,
    order: row.order,
  }));
};

// Fetch Facilities
export const fetchFacilities = async (): Promise<Facility[]> => {
  const rows = await getList<any>('MBS Facility', 'order asc', true);
  return rows.map((row) => ({
    id: row.name,
    title: row.title,
    description: row.description,
    mainImage: resolveImageUrl(row.main_image),
    gallery: resolveImageUrls((row.gallery || []).map((r: any) => r.image)),
    colSpan: row.col_span,
    icon: row.icon,
    order: row.order,
  }));
};

// Fetch Academic Levels
export const fetchAcademicLevels = async (): Promise<AcademicLevel[]> => {
  const rows = await getList<any>('MBS Academic Level', 'order asc', true);
  return rows.map((row) => ({
    id: row.name,
    level: row.level,
    description: row.description,
    mainImage: resolveImageUrl(row.main_image),
    features: splitLines(row.features),
    extendedDescription: row.extended_description,
    director: row.director_name
      ? {
          name: row.director_name,
          role: row.director_role,
          image: resolveImageUrl(row.director_image),
          message: row.director_message,
        }
      : undefined,
    gallery: resolveImageUrls((row.gallery || []).map((r: any) => r.image)),
    order: row.order,
  }));
};

// Fetch Services
export const fetchServices = async (): Promise<Service[]> => {
  const rows = await getList<any>('MBS Service', 'order asc');
  return rows.map((row) => ({
    id: row.name,
    title: row.title,
    description: row.description,
    icon: row.icon,
    iconColor: row.icon_color,
    order: row.order,
  }));
};

// Fetch Branches (Campuses)
export const fetchBranches = async (): Promise<Branch[]> => {
  const rows = await getList<any>('MBS Campus', 'order asc');
  return rows.map((row) => ({
    id: row.name,
    name: row.campus_name,
    location: row.location,
    description: row.description,
    image: resolveImageUrl(row.image),
    features: splitLines(row.features),
    order: row.order,
  }));
};

// Fetch Social Posts
export const fetchSocialPosts = async (): Promise<SocialPost[]> => {
  const rows = await getList<any>('MBS Social Post', 'date desc', true);
  return rows.map((row) => ({
    id: row.name,
    content: row.content,
    images: resolveImageUrls((row.images || []).map((r: any) => r.image)),
    date: row.date,
    url: row.url,
    platform: row.platform || 'manual',
  }));
};

// Fetch Dembi Dollo Page Data
export const fetchDembiDolloPage = async (): Promise<DembiDolloPage | null> => {
  const doc = await getSingle<any>('MBS Dembi Dollo Page');
  if (!doc) return null;

  const hero = buildHero(doc);
  if (!hero.images.length) {
    hero.images = ['https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600'];
  }

  return {
    title: doc.title,
    hero,
    story: {
      sectionTitle: doc.story_section_title,
      ideaTitle: doc.story_idea_title,
      ideaContent: doc.story_idea_content,
      ideaImage: resolveImageUrl(doc.story_idea_image) as string,
      ideaImageCaption: doc.story_idea_image_caption,
      locationTitle: doc.story_location_title,
      locationContent: doc.story_location_content,
      locationImage: resolveImageUrl(doc.story_location_image) as string,
      locationImageCaption: doc.story_location_image_caption,
    },
    gallery: {
      sectionTitle: doc.gallery_section_title,
      sectionSubtitle: doc.gallery_section_subtitle,
    },
    compoundSection: {
      title: doc.compound_title,
      description: doc.compound_description,
      images: captionedImages(doc.compound_images),
    },
    classroomsSection: {
      title: doc.classrooms_title,
      description: doc.classrooms_description,
      images: captionedImages(doc.classrooms_images),
    },
    activitiesSection: {
      title: doc.activities_title,
      description: doc.activities_description,
      images: captionedImages(doc.activities_images),
    },
    staff: {
      sectionTitle: doc.staff_section_title,
      sectionSubtitle: doc.staff_section_subtitle,
      members: (doc.staff_members || []).map((row: any) => ({
        name: row.staff_name,
        role: row.role,
        image: resolveImageUrl(row.image) as string,
        isGroupPhoto: !!row.is_group_photo,
      })),
    },
    communitySupport: {
      sectionTitle: doc.community_section_title,
      sectionDescription: doc.community_section_description,
      localTitle: doc.community_local_title,
      localDescription: doc.community_local_description,
      internationalTitle: doc.community_international_title,
      internationalDescription: doc.community_international_description,
      initiatives: (doc.community_initiatives || []).map((row: any) => ({
        title: row.title,
        description: row.description,
        initiativeType: row.initiative_type,
        images: captionedImages(row.images),
      })),
    },
    contact: {
      sectionTitle: doc.contact_section_title,
      sectionDescription: doc.contact_section_description,
      address: doc.contact_address,
      phone: doc.contact_phone,
      email: doc.contact_email,
      mapEmbedUrl: doc.contact_map_embed_url,
      ctaTitle: doc.contact_cta_title,
      ctaDescription: doc.contact_cta_description,
      ctaButtonText: doc.contact_cta_button_text,
      ctaButtonLink: doc.contact_cta_button_link,
    },
  };
};
