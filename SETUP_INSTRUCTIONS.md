# 🎓 Makko Billi School Website - Complete Setup Guide

## 🚀 Quick Start (5 Minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Sanity CMS (FREE)

#### A. Create Sanity Account
1. Visit [sanity.io](https://www.sanity.io/)
2. Sign up (FREE - no credit card required)
3. Create a new project: "Makko Billi School"
4. Choose dataset: `production`
5. Copy your **Project ID**

#### B. Configure Environment
1. Create `.env.local` file:
```bash
copy .env.local.example .env.local
```

2. Add your Sanity Project ID to `.env.local`:
```
VITE_SANITY_PROJECT_ID=abc123xyz  # Your actual project ID
VITE_SANITY_DATASET=production
```

#### C. Initialize Sanity Studio
```bash
# Login to Sanity
npx sanity@latest login

# Initialize in your project
npx sanity@latest init

# When prompted:
# - Select: Use existing project
# - Choose: Your project from the list
# - Dataset: production
# - Output path: Just press Enter (uses current directory)

# Deploy your studio
npx sanity@latest deploy
```

### 3. Run Your Site
```bash
npm run dev
```

Site opens at: `http://localhost:3000`

### 4. Access Sanity Studio

Two ways to access:
- **Online**: `https://your-project.sanity.studio`
- **Local**: Run `npm run sanity` then go to `http://localhost:3333`

---

## 📋 What's Been Set Up

### ✅ Complete Headless CMS Schema

Your site now has a professional CMS managing:

#### **Home Page Content**
- Hero section with carousel (multiple images)
- Grand Opening section with carousel
- Three Pillars (Quality Education, Character Building, Skill Development)
- About section

#### **About Page Content**
- Hero with background image
- Introduction text (multiple paragraphs)
- Statistics (3300+ students, 200+ teachers, 16 years, 600+ graduates)
- Facilities (Library, Labs, IT Center, Art Studio, Music, Playground)
- Academic Levels (KG, Primary, High School - each with director & gallery)
- Services (Transportation, Smart System, Database, E-Learning)
- Branches (Multiple campus locations)

#### **Staff Page Content**
- Founders (3 profiles with contact info)
- Directors (multiple with hover cards)
- Vice Directors (multiple with hover cards)
- Departments (with images & descriptions)

#### **Gallery**
- Categorized images (Campus, Events, Classroom, Sports, Arts, Science)
- Captions and dates
- Order control

#### **Social Posts**
- Manual post creation (backup for Facebook)
- Multiple images per post
- Platform tagging

#### **Contact Information**
- Main phone numbers
- Department-specific phones
- Email addresses
- Physical address
- Location details

#### **Site Settings**
- Logo
- Social media links (Facebook, Telegram, TikTok, YouTube)
- Facebook API credentials

---

## 🎨 Using Sanity Studio

### Adding New Content

1. **Go to Studio**: Open your studio URL
2. **Choose Content Type**: Click on what you want to add (e.g., "Staff Profile")
3. **Fill Fields**: Enter information
4. **Upload Images**: Drag & drop or browse
5. **Publish**: Click "Publish" button
6. **See Changes**: Refresh your website - changes appear instantly!

### Editing Existing Content

1. Find the item in Studio
2. Make your changes
3. Click "Publish"
4. Done! No code deployment needed

### Managing Images

- **Upload**: Drag images into any image field
- **Crop**: Click "Edit" on image to adjust hotspot
- **Replace**: Click on image and choose "Replace"
- **Multiple**: For carousels, click "+ Add item" for each image

---

## 🔄 Integration Architecture

### Data Flow

```
Sanity CMS → API → Your Site
     ↓
  (Real-time updates)
```

### Services Structure

```
services/
├── sanity.ts       # Fetches from Sanity CMS (PRIMARY)
├── cms.ts          # Local fallback data
└── api.ts          # Facebook API integration
```

### Current Setup

- **Primary Source**: Local data (`services/cms.ts`)
- **After Setup**: Sanity CMS becomes primary
- **Facebook API**: Still works for latest posts

---

## 📝 Content Management Best Practices

### Images
- **Size**: Upload high-quality images (1920x1080 recommended)
- **Format**: JPG or PNG
- **Naming**: Use descriptive names
- **Optimization**: Sanity handles this automatically

### Text Content
- **Titles**: Keep concise (under 60 characters)
- **Descriptions**: 2-3 sentences ideal
- **Formatting**: Use line breaks for readability

### Order Fields
- Use order fields to arrange content
- Lower numbers appear first
- Leave gaps (10, 20, 30) for easy reordering

---

## 🛠️ Development Workflow

### Local Development

```bash
# Terminal 1: Run your website
npm run dev

# Terminal 2: Run Sanity Studio (if needed)
npm run sanity
```

### Deploying Studio

After making schema changes:

```bash
npm run sanity:deploy
```

### Building for Production

```bash
npm run build
npm run preview  # Test production build
```

---

## 🔐 Security & Access

### Environment Variables
- **Never commit** `.env.local` to git
- Keep tokens secret
- Use read-only tokens for public sites

### Team Access
1. Go to [manage.sanity.io](https://manage.sanity.io)
2. Select your project
3. Click "Team" tab
4. Invite members by email
5. Assign roles:
   - **Admin**: Full access
   - **Editor**: Can create/edit content
   - **Viewer**: Read-only

---

## 📦 What's Included

### Schemas (15 types)
- ✅ Homepage
- ✅ About Page
- ✅ Hero Sections
- ✅ Statistics
- ✅ Facilities
- ✅ Academic Levels
- ✅ Services
- ✅ Branches
- ✅ Staff Profiles
- ✅ Departments
- ✅ Social Posts
- ✅ Gallery Images
- ✅ Contact Info
- ✅ Site Settings

### Features
- ✅ Image uploads & optimization
- ✅ Draft/publish workflow
- ✅ Content versioning
- ✅ Real-time preview
- ✅ Role-based access
- ✅ API endpoints
- ✅ TypeScript support

---

## 💰 Pricing

### Sanity Free Tier Includes:
- ✅ 3 users
- ✅ 500,000 documents
- ✅ Unlimited API calls
- ✅ Unlimited bandwidth
- ✅ Image transformations
- ✅ Community support

**Perfect for your school website!**

---

## 🆘 Troubleshooting

### "Project ID not found"
- Check `.env.local` has correct `VITE_SANITY_PROJECT_ID`
- Restart dev server after changing env vars

### "Cannot connect to Sanity"
- Run `npx sanity@latest login`
- Check internet connection

### "Schema errors"
- Check `sanity.config.ts` has correct project ID
- Run `npm run sanity` to see errors

### Images not loading
- Check images are uploaded in Studio
- Verify image fields are not empty
- Check browser console for errors

---

## 📚 Next Steps

### Immediate (Required):
1. ✅ Create Sanity account
2. ✅ Add Project ID to `.env.local`
3. ✅ Initialize Sanity
4. ✅ Deploy studio
5. ✅ Start adding content

### Content Population (1-2 hours):
1. Upload school logo
2. Add hero carousel images (3-5 images)
3. Add Grand Opening images (4-6 images)
4. Create staff profiles with photos
5. Add facility images
6. Upload gallery photos (20-50 images)
7. Add department information
8. Update contact details

### Optional Enhancements:
- Connect Facebook API for auto-posting
- Add more academic levels
- Create more facility galleries
- Add student testimonials
- Set up automated backups

---

## 📖 Documentation Links

- **Sanity Docs**: [sanity.io/docs](https://www.sanity.io/docs)
- **GROQ Queries**: [sanity.io/docs/groq](https://www.sanity.io/docs/groq)
- **Image API**: [sanity.io/docs/image-url](https://www.sanity.io/docs/image-url)
- **React Guide**: [sanity.io/guides/react](https://www.sanity.io/guides/react)

---

## 🎉 You're All Set!

Your school website now has:
- ✅ Professional CMS
- ✅ Easy content management
- ✅ Image optimization
- ✅ Real-time updates
- ✅ Team collaboration
- ✅ Scalable architecture

**Start by adding your first piece of content in Sanity Studio!**

Questions? Check `SANITY_SETUP.md` for detailed CMS documentation.

