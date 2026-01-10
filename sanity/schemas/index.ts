// Import all schema files
import stat from './stat';
import facility from './facility';
import academicLevel from './academicLevel';
import service from './service';
import branch from './branch';
import staffProfile from './staffProfile';
import department from './department';
import galleryImage from './galleryImage';
import socialPost from './socialPost';
import siteSettings from './siteSettings';
import homePage from './homePage';
import aboutPage from './aboutPage';
import galleryPage from './galleryPage';
import staffPage from './staffPage';
import contactPage from './contactPage';

export const schemaTypes = [
  // Pages
  homePage,
  aboutPage,
  galleryPage,
  staffPage,
  contactPage,
  
  // Content
  stat,
  facility,
  academicLevel,
  service,
  branch,
  staffProfile,
  department,
  galleryImage,
  socialPost,
  
  // Settings
  siteSettings,
];

