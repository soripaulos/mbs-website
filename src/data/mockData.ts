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

export const siteSettings: SiteSettings = {
  title: "Makko Billi School",
  description: "Nurturing minds, building character, and fostering a love for learning since 2009.",
  footerDescription: "Nurturing minds, building character, and fostering a love for learning since 2009.",
  footerContact: {
    phone: "+251-221-120620",
    email: "info@makkobillischool.com",
    address: "Adama, Ethiopia"
  },
  copyright: "COPYRIGHT © 2025 MAKKO BILLI SCHOOL",
  socialLinks: {
    facebook: "https://facebook.com",
    telegram: "https://telegram.org",
    tiktok: "https://tiktok.com",
    youtube: "https://youtube.com"
  }
};

export const homePageData: HomePage = {
  hero: {
    title: "Welcome to Makko Billi School",
    subtitle: "Where knowledge, values, and skills converge to prepare leaders of tomorrow.",
    images: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&q=80",
      "https://images.unsplash.com/photo-1427504740700-1e5a1d21ab81?w=1920&q=80"
    ],
    overlayColor: "rgba(37, 55, 107, 0.6)",
    buttonText: "Discover Our Story",
    buttonLink: "/about"
  },
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
  },
  grandOpening: {
    badge: "NEW CAMPUS",
    title: "Grand Opening",
    subtitle: "Makko Billi School Dembi Dollo",
    description: "KG and Elementary (KG-Grade 8)",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80"
    ],
    features: [
      {
        icon: "MapPin",
        title: "Location",
        description: "Located in the heart of Dembi Dollo, bringing world-class education closer to the West Welega community.",
        bgColor: "#e0e7ff"
      },
      {
        icon: "Building2",
        title: "Modern Infrastructure",
        description: "State-of-the-art laboratories, smart classrooms, and extensive sports facilities designed for holistic development.",
        bgColor: "#fef3c7"
      },
      {
        icon: "BookOpen",
        title: "Comprehensive Curriculum",
        description: "Offering KG to Grade 8 education with a focus on academic excellence, character building, and digital literacy.",
        bgColor: "#fce7f3"
      }
    ]
  },
  pillars: [
    {
      icon: "Lightbulb",
      title: "Quality Education",
      description: "Nurturing curious minds with rigorous academics, innovative teaching, and a passion for lifelong learning.",
      bgColor: "#e0e7ff",
      iconColor: "#2d4289"
    },
    {
      icon: "Users",
      title: "Character Building",
      description: "Instilling values, empathy, and integrity to shape compassionate and responsible global citizens.",
      bgColor: "#fef3c7",
      iconColor: "#f59e0b"
    },
    {
      icon: "BookOpen",
      title: "Skill Development",
      description: "Equipping students with practical skills, critical thinking, and adaptability for a dynamic world.",
      bgColor: "#fce7f3",
      iconColor: "#f179aa"
    }
  ],
  aboutSection: {
    title: "A Little About Us",
    content: "Makko Billi School, a private institution founded in July 2009 in Adama, Ethiopia, takes its name from a visionary leader of the Macha Oromos during the 16th century. The school boasts exceptional facilities, including modern classrooms, a fully equipped library, and advanced laboratories.",
    backgroundImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80",
    buttonText: "Learn More",
    buttonLink: "/about"
  },
  latestUpdates: {
    title: "Latest Updates",
    showCount: 6,
    buttonText: "See More"
  }
};

export const aboutPageData: AboutPage = {
  hero: {
    title: "Nurturing Excellence",
    subtitle: "A Legacy of 17 Years in Education",
    images: [
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&q=80"
    ],
    overlayColor: "rgba(37, 55, 107, 0.7)"
  },
  intro: {
    title: "Welcome to Makko Billi School",
    content: [
      "Makko Billi School, a private institution founded in July 2009 in Adama, Ethiopia, takes its name from a visionary leader of the Macha Oromos during the 16th century.",
      "The school boasts exceptional facilities, including modern classrooms, a fully equipped library, and advanced laboratories.",
      "With a commitment to holistic education, we provide quality learning experiences from Kindergarten to Grade 12, preparing students for success in an ever-changing world."
    ]
  },
  stats: [],
  facilities: [],
  academics: [],
  services: [],
  branches: []
};

export const statsData: Stat[] = [
  { id: "1", label: "YEARS OF EXCELLENCE", value: 17, suffix: "+", order: 1 },
  { id: "2", label: "STUDENTS", value: 3300, suffix: "+", order: 2 },
  { id: "3", label: "TEACHING STAFF", value: 120, suffix: "+", order: 3 },
  { id: "4", label: "GRADUATES", value: 600, suffix: "+", order: 4 }
];

export const facilitiesData: Facility[] = [
  {
    id: "1",
    title: "Library",
    description: "A vast collection of books and digital resources for comprehensive learning.",
    mainImage: "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&q=80",
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80"
    ],
    colSpan: 1,
    icon: "BookOpen",
    order: 1
  },
  {
    id: "2",
    title: "Science Laboratory",
    description: "Modern labs equipped for physics, chemistry, and biology experiments.",
    mainImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80",
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&q=80",
      "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=400&q=80"
    ],
    colSpan: 1,
    icon: "FlaskConical",
    order: 2
  },
  {
    id: "3",
    title: "Computer Lab",
    description: "State-of-the-art computing facilities with high-speed internet access.",
    mainImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1537498425277-c283d32ef9db?w=400&q=80",
      "https://images.unsplash.com/photo-1544256718-3bcf237f3974?w=400&q=80",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80"
    ],
    colSpan: 1,
    icon: "Monitor",
    order: 3
  },
  {
    id: "4",
    title: "Sports Field",
    description: "Extensive outdoor facilities for football, athletics, and various sports.",
    mainImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1461896836934- voices-6e8f0f0e0e0e?w=400&q=80",
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&q=80",
      "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=400&q=80"
    ],
    colSpan: 2,
    icon: "Trophy",
    order: 4
  },
  {
    id: "5",
    title: "Art Studio",
    description: "Creative space for visual arts, crafts, and artistic expression.",
    mainImage: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&q=80",
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=80"
    ],
    colSpan: 1,
    icon: "Palette",
    order: 5
  },
  {
    id: "6",
    title: "Music Room",
    description: "Dedicated space for music education and practice.",
    mainImage: "https://images.unsplash.com/photo-1514117445516-2ecfc9c4ec90?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&q=80"
    ],
    colSpan: 1,
    icon: "Music",
    order: 6
  }
];

export const academicLevelsData: AcademicLevel[] = [
  {
    id: "kg",
    level: "Kindergarten (KG)",
    description: "Building foundations through play-based learning",
    mainImage: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
    features: ["Play-based learning", "Social development", "Basic numeracy & literacy", "Creative arts"],
    extendedDescription: "Our kindergarten program focuses on nurturing young minds through engaging, play-based activities that develop social skills, creativity, and foundational learning abilities.",
    director: {
      name: "Chaltu Debebe",
      role: "KG Director",
      message: "Every child is a unique learner. We celebrate their curiosity."
    },
    gallery: [
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&q=80",
      "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=400&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80",
      "https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=400&q=80"
    ],
    order: 1
  },
  {
    id: "primary",
    level: "Primary School (1-8)",
    description: "Core subjects with emphasis on critical thinking",
    mainImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80",
    features: ["Core curriculum", "Critical thinking", "Character education", "Extracurricular activities"],
    extendedDescription: "Our primary program builds strong academic foundations while fostering creativity, critical thinking, and character development.",
    director: {
      name: "Abdi Yonas",
      role: "Elementary Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      message: "Building strong foundations for lifelong learning."
    },
    gallery: [
      "https://images.unsplash.com/photo-1427504740700-1e5a1d21ab81?w=400&q=80",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&q=80"
    ],
    order: 2
  },
  {
    id: "secondary",
    level: "Secondary School (9-12)",
    description: "Preparing for university and beyond",
    mainImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    features: ["Advanced subjects", "College preparation", "Leadership programs", "Career guidance"],
    extendedDescription: "Our secondary program prepares students for higher education and successful careers through rigorous academics and comprehensive support.",
    director: {
      name: "Mukhtar Abdulkarim",
      role: "High School Director",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
      message: "Preparing tomorrow's leaders today."
    },
    gallery: [
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80",
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&q=80"
    ],
    order: 3
  }
];

export const servicesData: Service[] = [
  { id: "1", title: "Modern Parent-Student App", description: "Real-time updates on attendance, grades, and assignments delivered directly to your smartphone.", icon: "Smartphone", iconColor: "#2d4289", order: 1 },
  { id: "2", title: "School Transport", description: "Safe and comfortable transportation for students across Adama and surrounding areas.", icon: "Bus", iconColor: "#fed250", order: 2 },
  { id: "3", title: "ERP & SIMS", description: "Integrated system for seamless academic records, grade management, and fee processing.", icon: "Database", iconColor: "#f179aa", order: 3 },
  { id: "4", title: "Parent Portal", description: "Real-time updates for parents on attendance, grades, and school activities.", icon: "Users", iconColor: "#10b981", order: 4 },
  { id: "5", title: "E-Learning System", description: "Comprehensive digital platform for assignments, resources, and online learning.", icon: "Laptop", iconColor: "#3b82f6", order: 5 },
  { id: "6", title: "Digital Learning Resources", description: "Access to a vast library of digital textbooks, video lectures, and interactive quizzes.", icon: "BookOpen", iconColor: "#8b5cf6", order: 6 },
  { id: "7", title: "After-School Programs", description: "Extra academic support and enrichment programs after regular school hours.", icon: "Clock", iconColor: "#f97316", order: 7 },
  { id: "8", title: "Transport Service", description: "Safe and reliable door-to-door bus service covering all major routes in Adama.", icon: "MapPin", iconColor: "#ef4444", order: 8 }
];

export const branchesData: Branch[] = [
  {
    id: "1",
    name: "Main Campus",
    location: "ADAMA, GORO",
    description: "Our flagship campus established in 2009, featuring comprehensive facilities from kindergarten through grade 12. Located in the heart of Adama near Silassie Church.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    features: ["KG to Grade 12", "Modern Library", "Science Labs", "Sports Complex", "Computer Labs", "Auditorium"],
    order: 1
  },
  {
    id: "2",
    name: "Adama Second Branch",
    location: "ADAMA, ETHIOPIA",
    description: "Located near the former Adama Kebele 11 Administration Office, this branch focuses on providing accessible quality education to the growing community in Adama.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    features: ["Primary Focus", "Community Integrated", "Spacious Classrooms"],
    order: 2
  },
  {
    id: "3",
    name: "Makko Billi School Dembi Dollo",
    location: "DEMBI DOLLO, OROMIA",
    description: "Extending our legacy beyond Adama, the Dembi Dollo branch brings Makko Billi's standard of holistic education to the West Welega Zone. Providing KG and Elementary (KG-Grade 8) education.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    features: ["KG to Grade 8", "Modern Facilities", "Green Campus"],
    order: 3
  }
];

export const staffPageData: StaffPage = {
  hero: {
    title: "Our Leadership & Staff",
    subtitle: "Meet the Dedicated Team Behind Our Success",
    images: [
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80"
    ],
    overlayColor: "rgba(37, 55, 107, 0.7)"
  },
  sectionTitles: {
    foundersTitle: "Our Founders",
    directorsTitle: "School Directors",
    directorsSubtitle: "Leading with Vision and Experience",
    viceDirectorsTitle: "Vice Directors",
    viceDirectorsSubtitle: "Supporting Excellence in Education",
    departmentsTitle: "Academic Departments"
  }
};

export const staffProfilesData: StaffProfile[] = [
  {
    id: "1",
    name: "Mr. Paulos Gemechu",
    role: "Founder & Managing Director",
    category: "founder",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    phones: ["+251 911 491373", "+251 221 120620"],
    email: "principal@makkobillischool.com",
    bio: "Visionary leader with over 20 years of experience in education.",
    order: 1
  },
  {
    id: "2",
    name: "Mrs. Genet Arega",
    role: "Co-founder & Deputy Manager",
    category: "founder",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    phones: [],
    bio: "Dedicated to educational excellence and student development.",
    order: 2
  },
  {
    id: "3",
    name: "Mr. Daniel Areda",
    role: "Co-founder",
    category: "founder",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    phones: [],
    bio: "Passionate about creating quality education opportunities.",
    order: 3
  },
  {
    id: "4",
    name: "Mukhtar Abdulkarim",
    role: "High School Director",
    category: "director",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
    phones: ["+251 222 119848"],
    email: "secondary@makkobillischool.com",
    order: 1
  },
  {
    id: "5",
    name: "Abdi Yonas",
    role: "Elementary Director",
    category: "director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    phones: ["+251 222 125803"],
    email: "primary@makkobillischool.com",
    order: 2
  },
  {
    id: "6",
    name: "Eyervalem Yisfalem",
    role: "Kindergarten Director",
    category: "director",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    phones: ["+251 222 116031"],
    email: "kinder@makkobillischool.com",
    order: 3
  },
  {
    id: "7",
    name: "Girma",
    role: "MBS #2 Director",
    category: "director",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&q=80",
    phones: ["+251 222 121984"],
    email: "branch2@makkobillischool.com",
    order: 4
  },
  {
    id: "8",
    name: "Mr. Vice HS",
    role: "High School Vice Director",
    category: "vice-director",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
    phones: ["+251 222 119849"],
    email: "vice.hs@makkobillischool.com",
    order: 1
  },
  {
    id: "9",
    name: "Engida",
    role: "Elementary Vice Director",
    category: "vice-director",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80",
    phones: ["+251 222 125804"],
    email: "vice.elem@makkobillischool.com",
    order: 2
  },
  {
    id: "10",
    name: "Mr. Vice Elem 2",
    role: "Elementary Vice Director",
    category: "vice-director",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&q=80",
    phones: ["+251 222 125805"],
    email: "vice.elem2@makkobillischool.com",
    order: 3
  },
  {
    id: "11",
    name: "Ms. Vice KG",
    role: "Kindergarten Vice Director",
    category: "vice-director",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    phones: ["+251 222 116032"],
    email: "vice.kg@makkobillischool.com",
    order: 4
  }
];

export const departmentsData: Department[] = [
  {
    id: "1",
    name: "KG Staff",
    description: "Our nurturing kindergarten team dedicated to early childhood development.",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
    headerFont: "'Fredoka', sans-serif",
    order: 1
  },
  {
    id: "2",
    name: "Language Department",
    description: "Fostering communication through English, Amharic, and Afaan Oromo.",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
    headerFont: "'Nunito', sans-serif",
    order: 2
  },
  {
    id: "3",
    name: "Natural Science Department",
    description: "Exploring the wonders of Physics, Chemistry, and Biology.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
    headerFont: "'Patrick Hand', cursive",
    order: 3
  },
  {
    id: "4",
    name: "ICT Department",
    description: "Leading digital literacy and technology education.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    headerFont: "'Fredoka', sans-serif",
    order: 4
  }
];

export const galleryPageData: GalleryPage = {
  hero: {
    title: "School Gallery",
    subtitle: "Capturing Moments, Memories & Milestones",
    images: [
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80"
    ],
    overlayColor: "rgba(37, 55, 107, 0.7)"
  },
  settings: {
    showCategories: true,
    imagesPerPage: 12,
    loadMoreText: "Load More Photos"
  }
};

export const galleryImagesData: GalleryImage[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    caption: "Students in classroom",
    category: "classroom",
    order: 1
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    caption: "Graduation ceremony",
    category: "events",
    order: 2
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    caption: "Sports day",
    category: "sports",
    order: 3
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
    caption: "Art exhibition",
    category: "arts",
    order: 4
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    caption: "Campus view",
    category: "campus",
    order: 5
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
    caption: "Science fair",
    category: "science",
    order: 6
  },
  {
    id: "7",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80",
    caption: "Library time",
    category: "classroom",
    order: 7
  },
  {
    id: "8",
    image: "https://images.unsplash.com/photo-1427504740700-1e5a1d21ab81?w=800&q=80",
    caption: "Outdoor learning",
    category: "campus",
    order: 8
  }
];

export const contactPageData: ContactInfo = {
  hero: {
    title: "Contact Us",
    subtitle: "Get in Touch with Us",
    images: [
      "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80"
    ],
    overlayColor: "rgba(241, 121, 170, 0.7)"
  },
  sectionTitle: "Our Address & Contact Details",
  phones: {
    mainPhones: ["+251 221 120620", "+251 221 120621"],
    departmentPhones: [
      { department: "Kindergarten", phone: "+251 222 116031" },
      { department: "Primary School", phone: "+251 222 125803" },
      { department: "High School", phone: "+251 222 119848" },
      { department: "Second Branch", phone: "+251 222 121 984" }
    ]
  },
  emails: [
    { department: "Kindergarten", email: "kinder@makkobillischool.com" },
    { department: "Primary School", email: "primary@makkobillischool.com" },
    { department: "High School", email: "secondary@makkobillischool.com" }
  ],
  addresses: [
    { name: "Main Branch", address: "Goro, Near Silassie Church", city: "Adama, Ethiopia" },
    { name: "Second Branch", address: "Near former Adama Kebele 11 Administration Office", city: "Adama, Ethiopia" }
  ],
  form: {
    enabled: true,
    nameLabel: "Name*",
    emailLabel: "Email*",
    subjectLabel: "Subject*",
    messageLabel: "Your Message*",
    submitText: "Send Message"
  },
  mapLocations: [
    {
      title: "Main Branch Location",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.7!2d39.27!3d8.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMzMnMDAuMCJOIDM5wrAxNicxMi4wIkU!5e0!3m2!1sen!2set!4v1",
      titleColor: "#2d4289"
    },
    {
      title: "Second Branch Location",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.7!2d39.27!3d8.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMzMnMDAuMCJOIDM5wrAxNicxMi4wIkU!5e0!3m2!1sen!2set!4v1",
      titleColor: "#f179aa"
    }
  ]
};

export const socialPostsData: SocialPost[] = [
  {
    id: "1",
    content: "Exciting news! Our new campus in Dembi Dollo is now open for admissions. Join us in providing quality education to the West Welega community.",
    images: ["https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80"],
    date: "2025-02-20",
    platform: "manual"
  },
  {
    id: "2",
    content: "Congratulations to our Grade 12 students on their excellent performance in the national exams! We're proud of your achievements.",
    images: ["https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80"],
    date: "2025-02-15",
    platform: "manual"
  },
  {
    id: "3",
    content: "Our annual sports day was a huge success! Students showcased their athletic talents and team spirit. Check out the highlights!",
    images: ["https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80"],
    date: "2025-02-10",
    platform: "manual"
  }
];
