
import { SocialPost, GalleryImage } from './types';

export const FALLBACK_FACEBOOK_POSTS: SocialPost[] = [
  {
    id: '1',
    content: 'Our Grade 2 students participated in a Question and Answer competition today! So proud of their confidence and knowledge.',
    images: [
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1427504746383-796b257994c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    date: '1 day ago',
    url: '#'
  },
  {
    id: '2',
    content: 'Delicates from Hiywot Berhan Girls School in AA visited our campus today. Experience sharing and collaboration in education excellence was the prime purpose.',
    images: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    date: '6 days ago',
    url: '#'
  },
  {
    id: '3',
    content: 'Celebrating the culture day! Our students dressed in traditional attire to honor our rich heritage.',
    images: [
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1577896337349-fd3219b66908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    date: '2 weeks ago',
    url: '#'
  },
  {
    id: '4',
    content: 'Science Fair 2025 was a huge success! Our future innovators showcased amazing projects ranging from robotics to sustainable energy solutions.',
    images: [
      'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    date: '3 weeks ago',
    url: '#'
  },
  {
    id: '5',
    content: 'Sports Day highlights! The energy, the teamwork, and the spirit of sportsmanship displayed by our students were truly inspiring.',
    images: [
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    date: '1 month ago',
    url: '#'
  },
  {
    id: '6',
    content: 'Art Exhibition opening ceremony. Our creative studio has produced some breathtaking pieces this semester.',
    images: [
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    date: '1 month ago',
    url: '#'
  },
  {
    id: '7',
    content: 'Community Service: Our High School students participated in a local tree planting initiative. Giving back to nature!',
    images: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588651788324-293c214f169e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    date: '2 months ago',
    url: '#'
  },
  {
    id: '8',
    content: 'Guest Lecture Series: We were honored to host Dr. Sarah for a talk on "The Future of AI in Education".',
    images: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    date: '2 months ago',
    url: '#'
  },
  {
    id: '9',
    content: 'Kindergarten Graduation Ceremony. Watching our little ones take their first big step is always emotional and joyous.',
    images: [
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606092195730-5d7b9af1ef4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    date: '3 months ago',
    url: '#'
  }
];

export const FALLBACK_GALLERY_IMAGES: GalleryImage[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Classroom Learning' },
  { id: '2', url: 'https://images.unsplash.com/photo-1577896337349-fd3219b66908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Playtime' },
  { id: '3', url: 'https://images.unsplash.com/photo-1427504746383-796b257994c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Science Lab' },
  { id: '4', url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Art Class' },
  { id: '5', url: 'https://images.unsplash.com/photo-1544531696-2851e954c09d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Field Trip' },
  { id: '6', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Graduation' },
  { id: '7', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Sports Day' },
  { id: '8', url: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Group Study' },
];

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/p/Makko-Billi-School-100064047512878/',
  telegram: 'https://t.me/makkobillischooloffical',
  tiktok: 'https://www.tiktok.com/@makkobillischool',
  youtube: 'https://www.youtube.com/channel/UC_92I8IImFozJ-LJYMWvfWQ'
};
