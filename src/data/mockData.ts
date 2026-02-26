import type {
  SiteSettings,
  HomePage,
  AboutPage,
  StaffPage,
  GalleryPage,
  ContactInfo,
  Stat,
  Facility,
  AcademicLevel,
  Service,
  Branch,
  StaffProfile,
  Department,
  GalleryImage,
  SocialPost
} from '@/types';

export const siteSettings: SiteSettings = {} as SiteSettings;

export const homePageData: HomePage = {
  studentPortalApp: {
    badge: "NEW",
    title: "Makko Billi Student Portal App",
    subtitle: "Stay Connected, Stay Informed",
    description: "Access everything you need for your child's education right from your smartphone. Track attendance, view grades, communicate with teachers, and stay updated with school announcements.",
    appImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80",
    features: [
      { icon: "Calendar", title: "Attendance Tracking", description: "Real-time attendance updates" },
      { icon: "GraduationCap", title: "Grade Reports", description: "View academic performance instantly" },
      { icon: "MessageCircle", title: "Direct Messaging", description: "Chat with teachers & staff" },
      { icon: "Bell", title: "Notifications", description: "Never miss important announcements" }
    ],
    downloadLinks: {
      appStore: "#",
      playStore: "#",
      webPortal: "#"
    }
  }
} as HomePage;

export const aboutPageData: AboutPage = {} as AboutPage;

export const statsData: Stat[] = [];
export const facilitiesData: Facility[] = [];
export const academicLevelsData: AcademicLevel[] = [];
export const servicesData: Service[] = [];
export const branchesData: Branch[] = [];

export const staffPageData: StaffPage = {} as StaffPage;
export const staffProfilesData: StaffProfile[] = [];
export const departmentsData: Department[] = [];

export const galleryPageData: GalleryPage = {} as GalleryPage;
export const galleryImagesData: GalleryImage[] = [];

export const contactPageData: ContactInfo = {} as ContactInfo;

export const socialPostsData: SocialPost[] = [];
