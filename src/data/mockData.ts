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
  DembiDolloPage
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

export const dembiDolloPageData: DembiDolloPage = {
  hero: {
    title: "Makko Billi Dembi Dollo Branch",
    subtitle: "Extending excellence to Western Oromia",
    images: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80",
    ],
    overlayColor: "bg-school-brand/60"
  },
  compoundSection: {
    title: "Our Compound",
    description: "A spacious, green, and secure environment designed for learning, recreation, and growth. Our compound provides the perfect backdrop for student life.",
    images: [
      { image: "https://images.unsplash.com/photo-1541829070764-84a14138e646?w=600&q=80", caption: "Main Building" },
      { image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80", caption: "Green Spaces" }
    ]
  },
  classroomsSection: {
    title: "Modern Classrooms",
    description: "Equipped with modern facilities, our classrooms provide an engaging and comfortable atmosphere for focused academic development.",
    images: [
      { image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80", caption: "Primary Classroom" },
      { image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80", caption: "Science Lab" }
    ]
  },
  activitiesSection: {
    title: "Student Activities",
    description: "We strongly believe in extracurricular engagement. From sports to creative arts, our students remain active and well-rounded.",
    images: [
      { image: "https://images.unsplash.com/photo-1526676037777-05a232554f77?w=600&q=80", caption: "Sports Day" },
      { image: "https://images.unsplash.com/photo-1511649475669-e288648b2339?w=600&q=80", caption: "Art Class" }
    ]
  },
  story: {
    sectionTitle: "Our Story",
    ideaTitle: "The Vision",
    ideaContent: "Expanding our legacy of quality education to the Dembi Dollo community.",
    locationTitle: "The Location",
    locationContent: "Situated in a peaceful environment perfect for dedicated study."
  },
  communitySupport: {
    sectionTitle: "Community Support",
    sectionDescription: "This branch was made possible through the generous contributions of both local and international communities. Here is how people have supported our mission.",
    initiatives: [
      {
        title: "Book Donations",
        description: "Alumni and international partners have generously donated hundreds of books, establishing a comprehensive library to support student literacy and research.",
        images: [
          { image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&q=80", caption: "New Library Collection" }
        ]
      },
      {
        title: "Computer Donations",
        description: "Equipping our students for the digital age, local businesses and supporters provided state-of-the-art computers for our new ICT center.",
        images: [
          { image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80", caption: "ICT Lab Setup" }
        ]
      },
      {
        title: "Financial Contributions",
        description: "Significant local community fundraising efforts helped expedite the construction and renovation of the Dembi Dollo branch buildings.",
        images: [
          { image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80", caption: "Community Fundraising Event" }
        ]
      }
    ]
  },
  staff: {
    sectionTitle: "Our Team",
    sectionSubtitle: "Meet the dedicated educators at Dembi Dollo.",
    members: []
  },
  contact: {
    sectionTitle: "Get in Touch",
    sectionDescription: "We welcome you to visit us.",
    phone: "+251917045795",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15764.50508534827!2d34.80164!3d8.530379!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x16543b003a6bfbc3%3A0x6007ec25ba1160a2!2sMakko%20Billi%20School%20(%20Dambi%20Doollo%20Branch)!5e0!3m2!1sen!2set!4v1711200000000!5m2!1sen!2set",
    ctaTitle: "Support the Branch",
    ctaDescription: "Help us grow this new branch.",
    ctaButtonText: "Donate Now"
  }
};
