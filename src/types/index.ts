// Site Settings
export interface SiteSettings {
  title: string;
  description: string;
  logo?: string;
  logoMobile?: string;
  favicon?: string;
  footerLogo?: string;
  footerDescription?: string;
  footerContact?: {
    phone: string;
    email: string;
    address: string;
  };
  copyright?: string;
  socialLinks: {
    facebook?: string;
    telegram?: string;
    tiktok?: string;
    youtube?: string;
  };
  facebookPageId?: string;
  facebookAccessToken?: string;
}

// Hero Section
export interface HeroSection {
  title: string;
  subtitle: string;
  images: string[];
  overlayColor?: string;
  buttonText?: string;
  buttonLink?: string;
}

// Grand Opening Section
export interface GrandOpeningFeature {
  icon: string;
  title: string;
  description: string;
  bgColor: string;
}

export interface GrandOpeningSection {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  images: string[];
  features: GrandOpeningFeature[];
}

// Pillar Section
export interface Pillar {
  icon: string;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

// About Section
export interface AboutSection {
  title: string;
  content: string;
  backgroundImage?: string;
  buttonText?: string;
  buttonLink?: string;
}

// Latest Updates
export interface LatestUpdates {
  title: string;
  showCount: number;
  buttonText: string;
}

// Student Portal App Section
export interface AppFeature {
  icon: string;
  title: string;
  description: string;
}

export interface StudentPortalApp {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  appImage: string;
  features: AppFeature[];
  downloadLinks: {
    appStore: string;
    playStore: string;
    webPortal: string;
  };
}

// Social Post
export interface SocialPost {
  id: string;
  content: string;
  images: string[];
  date: string;
  url?: string;
  platform: 'manual' | 'facebook' | 'instagram' | 'other';
}

// Stat
export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  order: number;
}

// Facility
export interface Facility {
  id: string;
  title: string;
  description: string;
  mainImage?: string;
  gallery: string[];
  colSpan: number;
  icon: string;
  order: number;
}

// Academic Level
export interface AcademicLevel {
  id: string;
  level: string;
  description: string;
  mainImage?: string;
  features: string[];
  extendedDescription?: string;
  director?: {
    name: string;
    role: string;
    image?: string;
    message?: string;
  };
  gallery: string[];
  order: number;
}

// Service
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconColor?: string;
  order: number;
}

// Branch
export interface Branch {
  id: string;
  name: string;
  location: string;
  description: string;
  image?: string;
  features: string[];
  order: number;
}

// Staff Profile
export interface StaffProfile {
  id: string;
  name: string;
  role: string;
  category: 'founder' | 'director' | 'vice-director';
  image?: string;
  phones: string[];
  email?: string;
  bio?: string;
  order: number;
}

// Department
export interface Department {
  id: string;
  name: string;
  description: string;
  image?: string;
  headerFont?: string;
  order: number;
}

// Gallery Image
export interface GalleryImage {
  id: string;
  image: string;
  caption?: string;
  category: 'campus' | 'events' | 'classroom' | 'sports' | 'arts' | 'science' | 'other';
  date?: string;
  order: number;
}

// Contact Page
export interface ContactInfo {
  hero: HeroSection;
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
  mapLocations: {
    title: string;
    embedUrl: string;
    titleColor?: string;
  }[];
}

// Staff Page
export interface StaffPage {
  hero: HeroSection;
  sectionTitles: {
    foundersTitle: string;
    directorsTitle: string;
    directorsSubtitle: string;
    viceDirectorsTitle: string;
    viceDirectorsSubtitle: string;
    departmentsTitle: string;
  };
}

// Gallery Page
export interface GalleryPage {
  hero: HeroSection;
  settings: {
    showCategories: boolean;
    imagesPerPage: number;
    loadMoreText: string;
  };
}

// About Page
export interface AboutPage {
  hero: HeroSection;
  intro: {
    title: string;
    content: string[];
  };
  stats: string[];
  facilities: string[];
  academics: string[];
  services: string[];
  branches: string[];
}

// Home Page
export interface HomePage {
  hero: HeroSection;
  studentPortalApp: StudentPortalApp;
  grandOpening: GrandOpeningSection;
  pillars: Pillar[];
  aboutSection: AboutSection;
  latestUpdates: LatestUpdates;
}
