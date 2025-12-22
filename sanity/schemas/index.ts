// Import all schema files
import hero from './hero';
import stat from './stat';
import facility from './facility';
import academicLevel from './academicLevel';
import service from './service';
import branch from './branch';
import staffProfile from './staffProfile';
import department from './department';
import socialPost from './socialPost';
import galleryImage from './galleryImage';
import siteSettings from './siteSettings';
import homePage from './homePage';
import aboutPage from './aboutPage';
import galleryPage from './galleryPage';
import staffPage from './staffPage';
import contactPage from './contactPage';
import contactInfo from './contactInfo';

export const schemaTypes = [
  // Pages
  homePage,
  aboutPage,
  galleryPage,
  staffPage,
  contactPage,
  
  // Components
  hero,
  stat,
  facility,
  academicLevel,
  service,
  branch,
  staffProfile,
  department,
  socialPost,
  galleryImage,
  contactInfo,
  
  // Settings
  siteSettings,
];

