
import { AboutPageData, StaffPageData } from '../types';

// This file acts as a "Headless CMS". 
// You can easily update the content here, or replace the fetch function 
// to call an external API (like Contentful, Strapi, or Firebase).

const ABOUT_PAGE_DATA: AboutPageData = {
  hero: {
    title: "Nurturing Excellence",
    subtitle: "A Legacy of 15 Years in Education",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
  },
  intro: {
    title: "Welcome to Makko Billi School",
    content: [
      "Makko Billi School, established in the vibrant town of Adama in July 2009, stands as a testament to our commitment to educational excellence in Ethiopia. Named in honor of a visionary leader of the Macha Oromos during the 16th century, our school is deeply rooted in the values of character, competence, and creativity.",
      "Our school provides a dynamic and thriving environment for our students to grow and flourish. Over the past 15 years, Makko Billi School has dedicated itself to delivering high-quality education to the local community, nurturing both intellect and integrity."
    ]
  },
  stats: [
    { id: '1', label: "Students Enrolled", value: "3300", suffix: "+" },
    { id: '2', label: "Qualified Teachers", value: "200", suffix: "+" },
    { id: '3', label: "Years of Excellence", value: "16", suffix: "" },
    { id: '4', label: "Graduates", value: "600", suffix: "+" }
  ],
  facilities: [
    {
      id: 'lib',
      title: "Modern Library",
      description: "A sanctuary of knowledge with over 10,000 books and digital resources.",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      colSpan: 2,
      gallery: [
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 'lab',
      title: "Science Laboratories",
      description: "Fully equipped Physics, Chemistry, and Biology labs for hands-on experiments.",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      colSpan: 1,
      gallery: [
        "https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1576319155264-99536e0be1ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 'it',
      title: "IT & Innovation Center",
      description: "State-of-the-art computer labs fostering digital literacy and coding skills.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      colSpan: 1,
      gallery: [
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1504384308090-c54be3852f33?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 'art',
      title: "Creative Art Studio",
      description: "A vibrant space where students explore painting, sculpting, and design.",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      colSpan: 1,
      gallery: [
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1560421683-6856ea585c78?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 'music',
      title: "Music & Performance",
      description: "Dedicated rooms for instrument practice, choir, and dramatic arts.",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      colSpan: 1,
      gallery: [
         "https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         "https://images.unsplash.com/photo-1507838153414-b4b713384ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         "https://images.unsplash.com/photo-1465847899078-b66c53be7905?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 'playground',
      title: "Kids Playground",
      description: "Safe, spacious, and engaging play areas designed for physical activity and social interaction.",
      image: "https://images.unsplash.com/photo-1562818467-2c466065c521?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      colSpan: 2,
      gallery: [
        "https://images.unsplash.com/photo-1585514995684-5895d63c3c55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1570214476695-ca755ca2dd9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1529002789363-842208d15452?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 'av',
      title: "Audiovisual Rooms",
      description: "Interactive media rooms designed for immersive learning experiences.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      colSpan: 2,
      gallery: [
        "https://images.unsplash.com/photo-1596710629172-85bba6e42668?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 'clinic',
      title: "School Clinic",
      description: "Full-time medical staff ensuring the health and safety of all students.",
      image: "https://images.unsplash.com/photo-1516574187841-69301976e499?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      colSpan: 1,
      gallery: [
        "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 'field',
      title: "Sports Complex",
      description: "Expansive football fields, basketball courts, and play areas promoting physical well-being.",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      colSpan: 3,
      gallery: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    }
  ],
  academics: [
    {
      id: 'kg',
      level: "Kindergarten",
      description: "A play-based learning environment where curiosity is ignited and social skills are fostered.",
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Play-based Learning", "Creative Arts", "Basic Literacy"],
      extendedDescription: "Our Kindergarten program is designed to be a home away from home. We focus on the holistic development of the child through sensory activities, storytelling, and imaginative play. The curriculum is tailored to build confidence, emotional intelligence, and a love for exploration.",
      director: {
        name: "Ms. Almaz Tadesse",
        role: "Kindergarten Director",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        message: "Every child is a universe of potential. In our KG, we don't just teach; we sparkle curiosity."
      },
      gallery: [
        "https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1564429238817-393bd4286b2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1560421683-6856ea585c78?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1459356979461-dae1b8dcb702?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      ]
    },
    {
      id: 'pri',
      level: "Primary School",
      description: "Building a strong academic foundation while encouraging critical thinking and collaboration.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Core Academics", "STEM Activities", "Character Building"],
      extendedDescription: "In the Primary years, students transition to structured learning while maintaining their creative spirit. Our curriculum emphasizes core subjects like Mathematics, Sciences, and Languages, integrated with practical STEM activities. We believe in learning by doing.",
      director: {
        name: "Mr. Abebe Kebede",
        role: "Primary School Director",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        message: "Education is not the filling of a pail, but the lighting of a fire. We aim to ignite that fire daily."
      },
      gallery: [
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1577896337349-fd3219b66908?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1427504746383-796b257994c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      ]
    },
    {
      id: 'high',
      level: "High School",
      description: "Preparing students for higher education and future leadership through rigorous coursework.",
      image: "https://images.unsplash.com/photo-1427504746383-796b257994c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Advanced Sciences", "Leadership Programs", "College Prep"],
      extendedDescription: "Our High School program is rigorous and future-oriented. We prepare students for national exams and university life with advanced coursework in Natural and Social Sciences. Beyond grades, we focus on leadership, ethics, and community service.",
      director: {
        name: "Mr. Samuel Girma",
        role: "High School Director",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        message: "We shape the leaders of tomorrow. Excellence is not an act, but a habit we cultivate here."
      },
      gallery: [
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      ]
    }
  ],
  services: [
    {
      id: 'app',
      title: "Modern Parent-Student App",
      description: "Real-time updates on attendance, grades, and assignments delivered directly to your smartphone.",
      icon: 'smartphone'
    },
    {
      id: 'erp',
      title: "ERP & SIMS",
      description: "Integrated system for seamless academic records, grade management, and fee processing.",
      icon: 'database'
    },
    {
      id: 'elearning',
      title: "Digital eLearning Resources",
      description: "Access to a vast library of digital textbooks, video lectures, and interactive quizzes.",
      icon: 'laptop'
    },
    {
      id: 'transport',
      title: "Transport Service",
      description: "Safe and reliable door-to-door bus service covering all major routes in Adama.",
      icon: 'bus'
    }
  ],
  branches: [
    {
      id: 'adama-2',
      name: "Adama Second Branch",
      location: "Adama, Ethiopia",
      description: "Located near the former Adama Kebele 11 Administration Office, this branch focuses on providing accessible quality education to the growing community in Adama. It mirrors the excellence of our main campus with dedicated facilities for KG and Primary levels.",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Primary Focus", "Community Integrated", "Spacious Classrooms"]
    },
    {
      id: 'dembidollo',
      name: "Makko Billi School Dembi Dollo",
      location: "Dembi Dollo, Oromia",
      description: "Extending our legacy beyond Adama, the Dembi Dollo branch brings Makko Billi's standard of holistic education to the West Welega Zone. Providing KG and Elementary (KG-Grade 8) education with modern facilities.",
      image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["KG to Grade 8", "Modern Facilities", "Green Campus"]
    }
  ]
};

export const fetchAboutPageData = async (): Promise<AboutPageData> => {
  // Simulating an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ABOUT_PAGE_DATA);
    }, 100);
  });
};

const STAFF_PAGE_DATA: StaffPageData = {
  founders: [
    {
      id: 'founder',
      name: "Mr. Paulos Gemechu",
      role: "Founder & Managing Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      phones: ["+251 911 000000", "+251 922 000000"],
      email: "paulos.gemechu@makkobillischool.com"
    },
    {
      id: 'co-founder-1',
      name: "Mrs. Genet Arega",
      role: "Co-founder & Deputy Manager",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 'co-founder-2',
      name: "Mr. Daniel Areda",
      role: "Co-founder",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ],
  directors: [
    {
      id: 'high-dir',
      name: "Muktar Abdulkerim",
      role: "High School Director",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      phones: ["+251 911 223344"],
      email: "muktar@makkobillischool.com"
    },
    {
      id: 'elem-dir',
      name: "Abdi Yonas",
      role: "Elementary Director",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      phones: ["+251 911 556677"],
      email: "abdi@makkobillischool.com"
    },
    {
      id: 'kg-dir',
      name: "Eyerusalem Yisfalem",
      role: "Kindergarten Director",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      phones: ["+251 911 889900"],
      email: "eyerusalem@makkobillischool.com"
    },
    {
      id: 'branch2-dir',
      name: "Haji Ketema",
      role: "MBS #2 Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      phones: ["+251 911 112233"],
      email: "haji@makkobillischool.com"
    }
  ],
  viceDirectors: [
    {
      id: 'high-vice',
      name: "Mr. Vice HS",
      role: "High School Vice Director",
      image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      phones: ["+251 922 334455"]
    },
    {
      id: 'elem-vice-1',
      name: "Mr. Vice Elem 1",
      role: "Elementary Vice Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      phones: ["+251 933 445566"]
    },
    {
      id: 'elem-vice-2',
      name: "Mr. Vice Elem 2",
      role: "Elementary Vice Director",
      image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      phones: ["+251 944 556677"]
    },
    {
      id: 'kg-vice',
      name: "Ms. Vice KG",
      role: "Kindergarten Vice Director",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      phones: ["+251 955 667788"]
    }
  ],
  departments: [
    {
      id: 'kg-staff',
      name: "KG Staff",
      description: "Our nurturing kindergarten team dedicated to early childhood development.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 'lang-dept',
      name: "Language Department",
      description: "Fostering communication through English, Amharic, and Afaan Oromo.",
      image: "https://images.unsplash.com/photo-1544531696-2851e954c09d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 'nat-sci',
      name: "Natural Science Department",
      description: "Exploring the wonders of Physics, Chemistry, and Biology.",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 'soc-sci',
      name: "Social Science Department",
      description: "Understanding society through History, Geography, and Civics.",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 'art-pe',
      name: "Art and Physical Education",
      description: "Developing creativity and physical fitness.",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 'ict',
      name: "ICT Department",
      description: "Equipping students with essential digital skills.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 'admin',
      name: "Management and Administration",
      description: "The backbone of our school's daily operations.",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ]
};

export const fetchStaffPageData = async (): Promise<StaffPageData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(STAFF_PAGE_DATA);
    }, 100);
  });
}