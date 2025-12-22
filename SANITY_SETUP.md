# Sanity CMS Setup Guide for Makko Billi School

This guide will help you set up Sanity CMS for your school website.

## 📋 Overview

Your site now has a comprehensive Sanity CMS schema that manages ALL content including:
- **Home Page**: Hero carousel, Grand Opening section, Pillars, About section
- **About Page**: Hero, Introduction, Stats, Facilities, Academic Levels, Services, Branches
- **Staff Page**: Founders, Directors, Vice Directors, Departments
- **Gallery**: All gallery images
- **Social Posts**: Manual posts (as backup for Facebook API)
- **Contact Info**: Phone numbers, emails, addresses
- **Site Settings**: Logo, social links, Facebook API credentials

## 🚀 Quick Start

### Step 1: Create a Sanity Account

1. Go to [sanity.io](https://www.sanity.io/)
2. Sign up with your email or GitHub account (FREE)
3. Create a new project named "Makko Billi School"
4. Choose dataset name: `production`
5. Note down your **Project ID**

### Step 2: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```

2. Update `.env` with your Sanity Project ID:
   ```
   VITE_SANITY_PROJECT_ID=your-project-id-from-sanity
   VITE_SANITY_DATASET=production
   ```

### Step 3: Initialize Sanity Studio

Run these commands in your terminal:

```bash
# Install Sanity CLI globally
npm install -g sanity@latest

# Login to Sanity
sanity login

# Initialize studio in your project
sanity init --project your-project-id --dataset production

# Deploy the studio
sanity deploy
```

### Step 4: Update Configuration

Update `sanity.config.ts` with your actual project ID (replace `'your-project-id'`).

### Step 5: Access Your Studio

Your Sanity Studio will be available at:
- **Local**: `http://localhost:3333` (when running `sanity dev`)
- **Cloud**: `https://your-project-name.sanity.studio`

## 📊 Content Schema Structure

### Site Settings (`siteSettings`)
- Site title, description
- Logo
- Social media links (Facebook, Telegram, TikTok, YouTube)
- Facebook API credentials

### Home Page (`homePage`)
**Hero Section:**
- Title, subtitle
- Multiple carousel images
- Call-to-action button

**Grand Opening Section:**
- Badge, title, subtitle
- Multiple carousel images
- 3 features (Location, Infrastructure, Curriculum)

**Three Pillars:**
- Quality Education
- Character Building
- Skill Development

**About Section:**
- Title, content
- Background image

### About Page (`aboutPage`)
**Statistics** (4 cards):
- Students Enrolled: 3300+
- Qualified Teachers: 200+
- Years of Excellence: 16
- Graduates: 600+

**Facilities** (galleries):
- Modern Library
- Science Laboratories
- IT & Innovation Center
- Creative Art Studio
- Music & Performance
- Kids Playground

**Academic Levels:**
- KG, Primary, High School
- Each with director, features, gallery

**Services:**
- Transportation
- Smart School System
- Secure Database
- E-Learning Platform

**Branches:**
- Multiple school branches with features

### Staff Page
**Founders** (3 profiles):
- Name, role, image
- Contact information

**Directors** (multiple):
- Name, role, image
- Phone, email

**Vice Directors** (multiple):
- Similar to directors

**Departments**:
- Department name, description, image

### Gallery (`galleryImage`)
- Images with captions
- Categories: Campus, Events, Classroom, Sports, Arts, Science
- Display order

### Social Posts (`socialPost`)
- Manual posts as backup for Facebook
- Content, images, date
- Platform indicator

### Contact Info (`contactInfo`)
- Main phone numbers
- Department-specific phones
- Emails
- Physical address
- Location details

## 🔄 Integration with Your Site

The site is configured to fetch from two sources:

1. **Sanity CMS** (Primary): `services/sanity.ts`
2. **Facebook API** (Fallback): `services/api.ts`

### To Use Sanity Data:

Update your page components to use Sanity services:

```typescript
import { fetchAboutPageData } from '../services/sanity';
import { fetchAboutPageData as fetchFallback } from '../services/cms';

// In your component:
try {
  const data = await fetchAboutPageData(); // From Sanity
} catch (error) {
  const data = await fetchFallback(); // Fallback to local
}
```

## 📝 Content Management Workflow

### Adding New Content:

1. Go to your Sanity Studio
2. Select the content type (e.g., "Staff Profile")
3. Click "Create"
4. Fill in the fields
5. Upload images
6. Click "Publish"
7. Changes appear on your site immediately!

### Managing Images:

- All images are automatically optimized
- Support for hotspot/crop
- Multiple images in arrays (carousels, galleries)

### Ordering Content:

Most content types have an "order" field:
- Lower numbers appear first
- Update orders to rearrange

## 🎨 Features

✅ **Visual Editor**: Edit content with real-time preview  
✅ **Image Management**: Upload, crop, and optimize images  
✅ **Drafts**: Save work without publishing  
✅ **Revisions**: View and restore previous versions  
✅ **Roles**: Control who can edit what  
✅ **API**: Instant updates via CDN  
✅ **Free Tier**: 3 users, 500K documents, unlimited API calls

## 🛠️ Development

### Run Sanity Studio Locally:
```bash
sanity dev
```
Studio runs on `http://localhost:3333`

### Deploy Studio Updates:
```bash
sanity deploy
```

### Run Your Site:
```bash
npm run dev
```
Site runs on `http://localhost:3000`

## 📱 Access Control

### Add Team Members:
1. Go to [manage.sanity.io](https://manage.sanity.io)
2. Select your project
3. Go to "Team" tab
4. Invite members by email
5. Assign roles (Admin, Editor, Viewer)

## 🔐 Security

- Never commit `.env` file
- Keep your `VITE_SANITY_TOKEN` secret
- Use read-only tokens for public sites
- Use write tokens only in admin areas

## 💡 Next Steps

1. **Migrate Existing Data**: Copy data from `services/cms.ts` into Sanity Studio
2. **Upload Images**: Replace placeholder URLs with real school photos
3. **Test Integration**: Verify all pages load correctly
4. **Train Staff**: Show team how to edit content
5. **Go Live**: Update pages to use Sanity as primary source

## 📚 Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Image URLs](https://www.sanity.io/docs/image-url)
- [React Integration](https://www.sanity.io/guides/sanity-nextjs-site-builder)

## 🆘 Support

- **Sanity Community**: [slack.sanity.io](https://slack.sanity.io)
- **Documentation**: [sanity.io/docs](https://www.sanity.io/docs)
- **GitHub Issues**: Report bugs in your repo

---

**Your CMS is ready! 🎉** Start by creating your first document in Sanity Studio.

