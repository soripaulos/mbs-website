# Sanity Studio v5 Upgrade - Complete Rebuild

## Overview
The Sanity Studio has been completely rebuilt from scratch using the latest version (v5.2.0) with an enhanced configuration and all schemas redeployed.

## What's New

### 1. **Latest Sanity Version**
- **Sanity Core**: Upgraded from v4.17.0 → **v5.2.0**
- **@sanity/client**: v7.14.0
- **@sanity/image-url**: v2.0.2
- **@sanity/vision**: v5.2.0

### 2. **Enhanced Studio Configuration**
The new `sanity.config.ts` includes:

#### **Organized Navigation Structure**
- Pages Group (Home, About, Staff, Gallery, Contact)
- Site Settings (singleton)
- Posts & Media (Social Posts, Gallery Images)
- About Content (Stats, Facilities, Academic Levels, Services, Branches)
- Staff & Departments (Staff Profiles, Departments)

#### **Singleton Protection**
Pages like Home Page, About Page, etc. are now true singletons:
- Cannot create duplicates
- Cannot delete the main document
- Cannot duplicate the document

#### **Better UX**
- Logical grouping of related content
- Dividers for visual separation
- Clear labels and descriptions

### 3. **Complete Schema Deployment**

All 17 schemas have been deployed to the `makko-billi-school` workspace:

#### **Page Schemas (Singletons)**
1. **homePage** - Hero, Grand Opening, Pillars, About Section
2. **aboutPage** - Hero, Intro, Stats, Facilities, Academics, Services, Branches
3. **staffPage** - Hero, Section Titles
4. **galleryPage** - Hero, Gallery Settings
5. **contactPage** - Hero, Contact Info, Form Settings, Map Locations

#### **Content Schemas**
6. **siteSettings** - Branding (logo, favicon, footerLogo), Footer, Social
7. **socialPost** - Manual posts/announcements
8. **galleryImage** - Gallery images with categories
9. **stat** - Statistics display
10. **facility** - School facilities
11. **academicLevel** - KG, Primary, High School levels
12. **service** - School services
13. **branch** - School branches
14. **staffProfile** - Founders, Directors, Vice Directors
15. **department** - Departments

#### **Schema Features**
✅ **Hero Sections**: All pages support unlimited slideshow images
✅ **Custom Colors**: CSS color strings (rgba, hex) for overlays, icons, backgrounds
✅ **Dynamic Icons**: Any Lucide icon name as free text input
✅ **Map Locations**: Google Maps embed URLs with custom title colors
✅ **Organized Groups**: Fields organized into logical groups/tabs
✅ **Rich Descriptions**: Helpful hints for content editors

## How to Access the Studio

### Local Development
```bash
npm run sanity
```
The studio will be available at: `http://localhost:3333/studio`

### Production
The studio is deployed at your Sanity project URL:
- Project: `yqwhfc1k`
- Dataset: `production`
- Workspace: `makko-billi-school`

## Key Improvements

### 1. **Better Content Management**
- Grouped navigation makes finding content easier
- Singleton pages prevent accidental duplication
- Clear field descriptions guide content editors

### 2. **Enhanced Flexibility**
- **Unlimited hero images** on any page (not limited to 5)
- **Any CSS color** for overlays, backgrounds, icons
- **Any Lucide icon** by name (not limited to predefined list)
- **Multiple map locations** on contact page

### 3. **Cleaner Structure**
- All related content grouped together
- Visual separators between sections
- Consistent naming and organization

## Schema Details

### Site Settings (Branding)
```
✓ Header Logo (not circular/framed)
✓ Mobile Logo (optional)
✓ Favicon (square PNG recommended)
✓ Footer Logo
✓ Footer Description
✓ Footer Contact (phone, email, address)
✓ Copyright Text
✓ Social Links (Facebook, Telegram, TikTok, YouTube)
✓ Facebook Page ID & Access Token
```

### Page Hero Sections
All page schemas include:
```
✓ Title
✓ Subtitle
✓ Images array (unlimited slideshow)
✓ Overlay Color (CSS string)
```

### Home Page
```
✓ Hero Section (images, title, subtitle, overlay, button)
✓ Grand Opening (badge, images, features with icons)
✓ Three Pillars (icon, colors, description)
✓ About Section (title, content, background image)
✓ Latest Updates (show count, button text)
```

### Contact Page
```
✓ Hero Section
✓ Phone Numbers (main + department-specific)
✓ Email Addresses (by department)
✓ Physical Addresses (by branch)
✓ Contact Form Settings
✓ Map Locations (unlimited, with embed URLs)
```

## Migration Notes

### What Changed
1. Package versions updated to latest
2. Studio config completely rewritten with better structure
3. All schemas redeployed to `makko-billi-school` workspace
4. Color fields now accept any CSS color string
5. Icon fields now accept any Lucide icon name
6. Hero images now unlimited (no 5-image limit)

### What Stayed the Same
- All schema field names (backward compatible)
- All document types and IDs
- Sanity project ID and dataset
- Integration with frontend code

### Breaking Changes
- None! All changes are backward compatible

## Next Steps

1. **Access the Studio**: `npm run sanity` or visit your Sanity project URL
2. **Populate Content**: 
   - Add logos in Site Settings → Branding
   - Add hero images for each page
   - Set colors and icons as needed
   - Configure map locations on Contact Page
3. **Test**: Verify all content appears correctly on your website
4. **Deploy**: Push changes will auto-deploy to Cloudflare Pages

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify all environment variables are set in Cloudflare Pages
3. Ensure Sanity project credentials are correct
4. Check that documents are published (not just drafts)

## Studio Features

### Content Organization
- **Pages**: Single documents for each page (Home, About, Staff, Gallery, Contact)
- **Site Settings**: Global site configuration
- **Posts & Media**: Social posts and gallery images
- **About Content**: Reusable components for the About page
- **Staff & Departments**: Staff profiles and department info

### Editing Features
- Rich text editor for long-form content
- Image upload with hotspot selection
- Reference picker for linking content
- Array fields for multiple items
- Object fields for grouped data
- Color strings for custom styling
- Icon names for dynamic icons

### Publishing Workflow
- Create drafts
- Preview changes
- Publish when ready
- Unpublish if needed
- Version history

---

**Studio Version**: v5.2.0  
**Deployed**: January 2026  
**Workspace**: makko-billi-school  
**Total Schemas**: 17

