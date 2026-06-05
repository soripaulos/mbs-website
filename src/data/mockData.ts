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
  SocialPost,
  DembiDolloPage,
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

// Dembi Dollo Page Mock Data
export const dembiDolloPageData: DembiDolloPage = {
  title: 'Makko Billi School Dembi Dollo',
  hero: {
    title: 'Makko Billi School — Dembi Dollo',
    subtitle: 'Bringing Quality Education to Western Ethiopia',
    images: [
      'https://cdn.sanity.io/images/yqwhfc1k/production/ace1d753d5fe46b2bcd206b4850dca8f6a06aaea-2560x1394.jpg',
    ],
    overlayColor: 'rgba(37, 55, 107, 0.6)',
  },
  story: {
    sectionTitle: 'Our Story',
    ideaTitle: 'The Idea',
    ideaContent: 'Makko Billi School Dembi Dollo was born from a vision to extend quality education to one of Ethiopia\'s most underserved regions. Recognizing the critical need for modern educational facilities in Western Ethiopia, the founders embarked on a mission to create a learning environment that nurtures young minds and empowers communities.',
    ideaImage: '',
    ideaImageCaption: '',
    locationTitle: 'The Location',
    locationContent: 'Nestled in the heart of Dembi Dollo, a historic town in the Kellem Wollega Zone of the Oromia Region, our campus is strategically located to serve the local community. Dembi Dollo, rich in cultural heritage and natural beauty, provides an inspiring backdrop for learning and growth.',
    locationImage: '',
    locationImageCaption: '',
  },
  gallery: {
    sectionTitle: 'Our Campus',
    sectionSubtitle: 'Take a visual tour of our beautiful campus in Dembi Dollo',
  },
  compoundSection: {
    title: 'School Compound',
    description: 'Our expansive campus features modern facilities, school buses, and beautiful outdoor spaces for students.',
    images: [],
  },
  classroomsSection: {
    title: 'Classrooms',
    description: 'Our well-equipped classrooms provide a conducive learning environment for students.',
    images: [],
  },
  activitiesSection: {
    title: 'Student Activities',
    description: 'A look at student life at our Dembi Dollo campus',
    images: [],
  },
  staff: {
    sectionTitle: 'Our Team',
    sectionSubtitle: 'Meet the dedicated educators and staff who make our Dembi Dollo branch exceptional',
    members: [],
  },
  communitySupport: {
    sectionTitle: 'Community Support',
    sectionDescription: 'Our school thrives thanks to the generous support of both local and international communities who believe in the power of education.',
    localTitle: 'Local Community Support',
    localDescription: 'The people of Dembi Dollo have embraced our school with open arms, contributing time, resources, and unwavering support to help build a brighter future for their children.',
    internationalTitle: 'International Community Support',
    internationalDescription: 'Partners from around the world have joined our mission, providing resources, expertise, and funding to ensure every child in Dembi Dollo has access to quality education.',
    initiatives: [],
  },
  contact: {
    sectionTitle: 'Visit & Support Us',
    sectionDescription: 'We welcome visitors, volunteers, and supporters who share our passion for education. Come see the impact of your support firsthand.',
    address: 'Dembi Dollo, Kellem Wollega Zone, Oromia, Ethiopia',
    phone: '+251917045795',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.8510095737493!2d34.81179780000001!3d8.5138433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17aabf681232aac5%3A0x6fe18ad28d57c9fb!2sMakko%20Billi%20School%20%2C%20Dembi%20Dollo!5e0!3m2!1sen!2set!4v1775741807834!5m2!1sen!2set',
    ctaTitle: 'Get Involved',
    ctaDescription: 'Interested in supporting our Dembi Dollo students? Whether you\'re a parent, alumnus, or community member, we\'d love to hear from you. Reach out to learn how you can make a difference.',
    ctaButtonText: 'Get Involved',
    ctaButtonLink: 'mailto:saratesfaye5@gmail.com',
  },
} as DembiDolloPage;