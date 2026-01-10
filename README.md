<div align="center">
<img width="1200" height="475" alt="Makko Billi School" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Makko Billi School Website

A modern, dynamic school website powered by React, Sanity CMS, and deployed on Cloudflare Pages.

## 🌐 Access Links

- **Website**: Your Cloudflare Pages URL
- **Sanity Studio**: https://makko-billi-school.sanity.studio/
- **GitHub**: https://github.com/soripaulos/mbs-website

## 🎨 Content Management

### Sanity Studio (Web-Based)
Access your content management system from anywhere:

**URL**: https://makko-billi-school.sanity.studio/

**Features**:
- ✅ 17 Content Schemas
- ✅ All Pages (Home, About, Staff, Gallery, Contact)
- ✅ Site Settings (Logos, Favicon, Footer, Social)
- ✅ Dynamic Content (Posts, Gallery, Stats, Facilities)
- ✅ Auto-Updates Enabled

See [STUDIO_ACCESS.md](STUDIO_ACCESS.md) for detailed instructions.

## 🚀 Development

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
# Frontend (Vite)
npm run dev

# Sanity Studio (Local - Optional)
npm run sanity
```

### Build for Production
```bash
npm run build
```

### Deploy Studio
```bash
npm run sanity:deploy
```

## 📦 Tech Stack

### Frontend
- **React** v19.2.0
- **React Router DOM** v7.9.6
- **Vite** v6.4.1
- **TypeScript** v5.8.2
- **Lucide React** (Icons)
- **Styled Components** v6.1.19

### CMS
- **Sanity** v5.2.0 (Latest)
- **@sanity/client** v7.14.0
- **@sanity/image-url** v2.0.2
- **@sanity/vision** v5.2.0

### Hosting
- **Cloudflare Pages** (Frontend)
- **Cloudflare Functions** (API Proxy)
- **Sanity Cloud** (Studio & Content)

## 📁 Project Structure

```
makko-billi-school-clone/
├── src/
│   ├── components/      # React components
│   ├── pages/          # Page components
│   ├── services/       # API services (Sanity, Facebook)
│   └── App.tsx         # Main app component
├── sanity/
│   ├── schemas/        # Content schemas
│   └── schemas/index.ts
├── functions/
│   └── api/           # Cloudflare Functions
├── public/            # Static assets
├── sanity.config.ts   # Studio configuration
├── sanity.cli.ts      # CLI configuration
└── vite.config.ts     # Vite configuration
```

## 🔧 Environment Variables

### Frontend (.env or Cloudflare Pages)
```env
VITE_SANITY_PROJECT_ID=yqwhfc1k
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
VITE_FB_PAGE_URL=https://www.facebook.com/your-page
```

### Cloudflare Functions (Cloudflare Pages Settings)
```env
FB_PAGE_ID=your-page-id
FB_ACCESS_TOKEN=your-page-access-token
```

## 📝 Content Schemas

### Pages (Singletons)
- **Home Page** - Hero carousel, Grand Opening, Pillars, About section
- **About Page** - Hero, Stats, Facilities, Academics, Services, Branches
- **Staff Page** - Hero, Staff profiles, Departments
- **Gallery Page** - Hero, Gallery images with categories
- **Contact Page** - Hero, Contact info, Form, Map locations

### Content Types
- **Site Settings** - Branding, Footer, Social links
- **Social Posts** - Manual announcements
- **Gallery Images** - Categorized images
- **Statistics** - Achievement numbers
- **Facilities** - School facilities with images
- **Academic Levels** - KG, Primary, High School
- **Services** - School services
- **Branches** - School locations
- **Staff Profiles** - Founders, Directors, Staff
- **Departments** - Department information

See [SANITY_SCHEMA_REFERENCE.md](SANITY_SCHEMA_REFERENCE.md) for complete schema documentation.

## 🎯 Key Features

### Dynamic Content Management
- All page content managed through Sanity CMS
- Unlimited hero image slideshows on all pages
- Custom CSS colors (rgba, hex) for overlays and backgrounds
- Dynamic Lucide icons by name
- Google Maps integration with custom embed URLs

### Responsive Design
- Mobile-first approach
- Optimized images with Sanity Image URLs
- Smooth animations and transitions

### Facebook Integration
- Real-time Facebook posts via Graph API
- Server-side proxy to bypass tracking prevention
- Manual posts/announcements via Sanity
- Image carousels with lightbox

### Performance
- Vite for lightning-fast builds
- CDN-hosted static assets (Cloudflare Pages)
- Optimized image delivery (Sanity CDN)
- Lazy loading for images

## 🔄 Deployment

### Automatic Deployment
Pushing to the `master` branch automatically deploys to Cloudflare Pages via Git integration.

### Manual Deployment
```bash
# Build the project
npm run build

# Deploy is automatic via Cloudflare Pages Git integration
```

### Studio Deployment
```bash
# Deploy to Sanity Cloud
npm run sanity:deploy
```

## 📚 Documentation

- [Studio Access Guide](STUDIO_ACCESS.md) - How to use the web studio
- [Studio v5 Upgrade](STUDIO_V5_UPGRADE.md) - Latest upgrade details
- [Schema Reference](SANITY_SCHEMA_REFERENCE.md) - Complete schema documentation

## 🆘 Support

For issues or questions:
1. Check the documentation files above
2. Review Sanity docs: https://www.sanity.io/docs
3. Check Cloudflare Pages docs: https://developers.cloudflare.com/pages

## 📄 License

This project is proprietary to Makko Billi School.

---

**Last Updated**: January 10, 2026  
**Version**: 5.0 (Sanity Studio v5.2.0)
