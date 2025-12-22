// Migration script to populate Sanity with existing data
// Run this after setting up your Sanity project

import { sanityClient } from './client';

// This data is from your existing cms.ts file
const initialData = {
  // Home Page
  homePage: {
    _type: 'homePage',
    _id: 'homePage',
    hero: {
      title: '15 Years of Fellowship at Makko Billi',
      subtitle: '"Our first batch of graduates who stayed with our school since nursery"',
      buttonText: 'Discover Our Story',
      buttonLink: '/about',
      // Note: You'll need to upload carousel images manually in Sanity Studio
    },
    grandOpening: {
      badge: 'New Campus',
      title: 'Grand Opening',
      subtitle: 'Makko Billi School Dembi Dollo',
      description: 'KG and Elementary (KG-Grade 8)',
      features: [
        {
          icon: 'MapPin',
          title: 'Prime Location',
          description: 'Located in the heart of Dembi Dollo, bringing world-class education closer to the West Welega community.',
          color: 'bg-school-dark-blue'
        },
        {
          icon: 'Star',
          title: 'Modern Infrastructure',
          description: 'State-of-the-art laboratories, smart classrooms, and extensive sports facilities designed for holistic development.',
          color: 'bg-school-yellow'
        },
        {
          icon: 'BookOpen',
          title: 'Comprehensive Curriculum',
          description: 'Offering KG to Grade 8 education with a focus on academic excellence, character building, and digital literacy.',
          color: 'bg-school-pink'
        }
      ]
    },
    pillars: [
      {
        icon: 'Lightbulb',
        title: 'Quality Education',
        description: 'Nurturing curious minds with rigorous academics, innovative teaching, and a passion for lifelong learning.',
        bgColor: 'bg-blue-100'
      },
      {
        icon: 'Users',
        title: 'Character Building',
        description: 'Instilling values, empathy, and integrity to shape compassionate and responsible global citizens.',
        bgColor: 'bg-yellow-100'
      },
      {
        icon: 'BookOpen',
        title: 'Skill Development',
        description: 'Equipping students with practical skills, critical thinking, and adaptability for a dynamic world.',
        bgColor: 'bg-pink-100'
      }
    ],
    aboutSection: {
      title: 'A Little About Us',
      content: 'Makko Billi School, a private institution founded in July 2009 in Adama, Ethiopia, takes its name from a visionary leader of the Macha Oromos during the 16th century. The school boasts exceptional facilities, including modern classrooms, a fully equipped library, and advanced laboratories.'
    }
  },

  // Stats
  stats: [
    { _type: 'stat', label: 'Students Enrolled', value: '3300', suffix: '+', order: 0 },
    { _type: 'stat', label: 'Qualified Teachers', value: '200', suffix: '+', order: 1 },
    { _type: 'stat', label: 'Years of Excellence', value: '16', suffix: '', order: 2 },
    { _type: 'stat', label: 'Graduates', value: '600', suffix: '+', order: 3 }
  ],

  // Site Settings
  siteSettings: {
    _type: 'siteSettings',
    _id: 'siteSettings',
    title: 'Makko Billi School',
    description: 'A premier educational institution in Ethiopia committed to excellence',
    socialLinks: {
      facebook: 'https://www.facebook.com/p/Makko-Billi-School-100064047512878/',
      telegram: 'https://t.me/makkobillischooloffical',
      tiktok: 'https://www.tiktok.com/@makkobillischool',
      youtube: 'https://www.youtube.com/channel/UC_92I8IImFozJ-LJYMWvfWQ'
    },
    facebookPageId: '489218120645675',
    facebookAccessToken: 'EAAG88PhMfCsBP3pduhYqoyX6lIadrudtWOMqYFoqAHS69DTZCEZB7fk3aUTrfMQE1y6NeMrQUTYWpwoKRxL6vNNBMYbGi3OFP1mPlzNu7edgZAvAm0XlOHPJZAJO30LMJmZBZBoogkkNc2jych5kPKwUOk7y02dHhcAZAnZBE3wsCPKMWmkbGzjjQvF5iATVHdSQ0JXuJKyMjdqQjE0bKOonRkX2mZCpO78fFxgZDZD'
  }
};

// Function to migrate data
export async function migrateData() {
  try {
    console.log('Starting data migration...');

    // Create or update home page
    await sanityClient.createOrReplace(initialData.homePage);
    console.log('✅ Home page created');

    // Create stats
    for (const stat of initialData.stats) {
      await sanityClient.create(stat);
    }
    console.log('✅ Stats created');

    // Create or update site settings
    await sanityClient.createOrReplace(initialData.siteSettings);
    console.log('✅ Site settings created');

    console.log('Migration complete! 🎉');
    console.log('Next steps:');
    console.log('1. Upload images in Sanity Studio');
    console.log('2. Create other content (facilities, staff, etc.)');
    console.log('3. Update pages to fetch from Sanity');

  } catch (error) {
    console.error('Migration error:', error);
  }
}

// Uncomment to run migration
// migrateData();

export default migrateData;

