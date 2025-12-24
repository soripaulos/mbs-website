
export interface SocialPost {
  id: string;
  content: string;
  images: string[];
  date: string;
  url?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
}

export interface NavItem {
  label: string;
  path: string;
}

// CMS Types
export interface Facility {
  id: string;
  title: string;
  description: string;
  image: string;
  icon?: string; // Lucide icon name
  colSpan?: number; // For bento grid layout (1, 2, or 3)
  gallery: string[]; // Images to show in expanded view
}

export interface Stat {
  id: string;
  label: string;
  value: string;
  suffix: string;
}

export interface DirectorProfile {
  name: string;
  role: string;
  image: string;
  message: string;
}

export interface AcademicLevel {
  id: string;
  level: string;
  description: string;
  image: string;
  features: string[];
  // Extended content for interaction
  extendedDescription: string;
  director: DirectorProfile;
  gallery: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // identifying string for icon component
}

export interface Branch {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  features: string[];
}

export interface AboutPageData {
  hero: {
    title: string;
    subtitle: string;
    images: string[];
    overlayColor?: string;
  };
  intro: {
    title: string;
    content: string[];
  };
  stats: Stat[];
  facilities: Facility[];
  academics: AcademicLevel[];
  services: Service[];
  branches: Branch[];
}

// Staff Types
export interface StaffProfile {
  id: string;
  name: string;
  role: string;
  image: string;
  phones?: string[];
  email?: string;
}

export interface StaffDepartment {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface StaffPageData {
  pageData?: {
    hero?: {
      title: string;
      subtitle: string;
      images?: string[];
      overlayColor?: string;
    };
    sectionTitles?: {
      foundersTitle: string;
      directorsTitle: string;
      directorsSubtitle: string;
      viceDirectorsTitle: string;
      viceDirectorsSubtitle: string;
      departmentsTitle: string;
    };
  };
  founders: StaffProfile[];
  directors: StaffProfile[];
  viceDirectors: StaffProfile[];
  departments: StaffDepartment[];
}

// Home Page Types
export interface HomePageData {
  hero?: {
    title: string;
    subtitle: string;
    carouselImages: string[];
    buttonText: string;
    buttonLink: string;
  };
  grandOpening?: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    carouselImages: string[];
    features: {
      icon: string;
      title: string;
      description: string;
      bgColor: string;
    }[];
  };
  pillars?: {
    icon: string;
    title: string;
    description: string;
    bgColor: string;
    iconColor: string;
  }[];
  aboutSection?: {
    title: string;
    content: string;
    backgroundImage: string;
    buttonText: string;
    buttonLink: string;
  };
  latestUpdates?: {
    title: string;
    showCount: number;
    buttonText: string;
  };
}

// Gallery Page Types
export interface GalleryPageData {
  hero: {
    title: string;
    subtitle: string;
    images: string[];
    overlayColor: string;
  };
  settings: {
    showCategories: boolean;
    imagesPerPage: number;
    loadMoreText: string;
  };
}

// Contact Page Types
export interface ContactPageData {
  hero: {
    title: string;
    subtitle: string;
    images: string[];
    overlayColor: string;
  };
  sectionTitle: string;
  phones: {
    mainPhones: string[];
    departmentPhones: { department: string; phone: string }[];
  };
  emails: { department: string; email: string }[];
  addresses: { name: string; address: string; city: string }[];
  form: {
    enabled: boolean;
    nameLabel: string;
    emailLabel: string;
    subjectLabel: string;
    messageLabel: string;
    submitText: string;
  };
  mapLocations: { title: string; embedUrl: string; titleColor: string }[];
}

// Site Settings Types
export interface SiteSettings {
  title: string;
  description: string;
  logo?: string;
  logoMobile?: string;
  favicon?: string;
  footerLogo?: string;
  socialLinks?: {
    facebook?: string;
    telegram?: string;
    tiktok?: string;
    youtube?: string;
  };
}