# 🎓 Makko Billi School - Sanity CMS Integration

## 🎯 Overview

Your school website is now powered by **Sanity CMS** - a professional, easy-to-use headless CMS that lets you manage all website content without touching code.

## ✨ What's Been Set Up

### 📊 Complete Content Schema

Every aspect of your website can now be managed through Sanity:

| Content Type | What It Manages | Count |
|-------------|-----------------|-------|
| **Home Page** | Hero carousel, Grand Opening, Pillars, About | 1 page |
| **About Page** | Stats, Facilities, Academics, Services, Branches | 1 page |
| **Staff** | Founders, Directors, Vice Directors | 15+ profiles |
| **Departments** | Department info & images | 10+ departments |
| **Facilities** | Library, Labs, Studios with galleries | 8 facilities |
| **Gallery** | School photos by category | Unlimited |
| **Social Posts** | News & updates | Unlimited |
| **Contact** | Phones, emails, address | 1 document |
| **Settings** | Logo, social links, API keys | 1 document |

### 🎨 Features You Get

✅ **Visual Editor** - Edit content with instant preview  
✅ **Image Management** - Upload, crop, optimize images automatically  
✅ **Drafts** - Save work without publishing  
✅ **Version History** - Restore previous versions  
✅ **Team Access** - Multiple users with role control  
✅ **Real-time Updates** - Changes appear instantly  
✅ **Mobile Friendly** - Manage content from any device  
✅ **No Code Required** - User-friendly interface

---

## 🚀 Quick Start Guide

### Step 1: Create Sanity Account (2 minutes)

1. Go to **[sanity.io](https://www.sanity.io/)**
2. Click "Get Started"
3. Sign up with email or GitHub (FREE)
4. Create project: "Makko Billi School"
5. Dataset: `production`
6. Copy your **Project ID** (looks like: `abc123xyz`)

### Step 2: Configure Your Site (1 minute)

1. Open project folder
2. Create `.env.local` file:

```bash
VITE_SANITY_PROJECT_ID=your-project-id-here
VITE_SANITY_DATASET=production
```

3. Replace `your-project-id-here` with your actual ID
4. Save the file

### Step 3: Initialize Sanity (2 minutes)

Open terminal and run:

```bash
# Login to Sanity
npx sanity@latest login

# Initialize Sanity in your project
npx sanity@latest init

# When prompted:
# → Use existing project: YES
# → Select your project
# → Dataset: production
# → Path: Press ENTER (default)

# Deploy your Studio
npx sanity@latest deploy
```

### Step 4: Start Creating Content!

**Option A - Online Studio:**
- Go to `https://your-project.sanity.studio`
- Start adding content

**Option B - Local Studio:**
```bash
npm run sanity
# Opens at http://localhost:3333
```

**Your Website:**
```bash
npm run dev
# Opens at http://localhost:3000
```

---

## 📝 Content Management Guide

### Adding a New Staff Member

1. Open Sanity Studio
2. Click **"Staff Profile"** → **"Create"**
3. Fill in:
   - Name: `John Doe`
   - Role: `Mathematics Teacher`
   - Category: Choose (Founder/Director/Vice Director)
   - Upload photo
   - Add phone & email
4. Click **"Publish"**
5. Done! Appears on website instantly

### Updating Home Page Hero

1. Open Sanity Studio
2. Click **"Home Page"**
3. Go to **"Hero Section"**
4. Edit title/subtitle
5. Add/remove carousel images
6. Click **"Publish"**

### Adding Gallery Images

1. Open Sanity Studio
2. Click **"Gallery Image"** → **"Create"**
3. Upload image
4. Add caption
5. Select category (Campus/Events/Classroom/etc.)
6. Set display order
7. Click **"Publish"**

### Managing Facilities

1. Open Sanity Studio
2. Click **"Facility"** → Select facility (e.g., Library)
3. Edit description
4. Add more gallery images
5. Update icon if needed
6. Click **"Publish"**

---

## 🎨 Schema Structure

### Page Documents

#### Home Page (`homePage`)
```
hero:
  - title
  - subtitle
  - carouselImages[] (array of images)
  - buttonText
  - buttonLink

grandOpening:
  - badge
  - title
  - subtitle
  - description
  - carouselImages[] (array of images)
  - features[] (Location, Infrastructure, Curriculum)

pillars[] (3 items):
  - icon
  - title
  - description

aboutSection:
  - title
  - content
  - backgroundImage
```

#### About Page (`aboutPage`)
```
hero:
  - title
  - subtitle
  - image

intro:
  - title
  - content[] (paragraphs)

stats[] → references to Stat documents
facilities[] → references to Facility documents
academics[] → references to Academic Level documents
services[] → references to Service documents
branches[] → references to Branch documents
```

### Component Documents

#### Stat
- label (e.g., "Students Enrolled")
- value (e.g., "3300")
- suffix (e.g., "+")
- order (for sorting)

#### Staff Profile
- name
- role
- category (founder/director/vice-director)
- image
- phones[]
- email
- bio
- order

#### Facility
- title
- description
- mainImage
- gallery[] (multiple images)
- icon (lucide icon name)
- colSpan (1 or 2 for grid)
- order

#### Gallery Image
- image
- caption
- category
- date
- order

### Settings Documents

#### Site Settings (`siteSettings`)
- Site title & description
- Logo
- Social media links (Facebook, Telegram, TikTok, YouTube)
- Facebook API credentials

#### Contact Info (`contactInfo`)
- Main phone numbers
- Department phones
- Emails
- Physical address
- Location (city, region, country)

---

## 🔄 How It Works

### Data Flow

```
┌─────────────────┐
│  Sanity Studio  │ ← You edit content here
│   (Online/Local)│
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│   Sanity API    │ ← Content stored in cloud
│   (Automatic)   │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Your Website   │ ← Fetches & displays content
│ (React/TypeScript)│
└─────────────────┘
```

### Files & Structure

```
your-project/
├── sanity/
│   ├── schemas/           # All content types defined here
│   │   ├── homePage.ts
│   │   ├── aboutPage.ts
│   │   ├── staffProfile.ts
│   │   ├── facility.ts
│   │   └── ... (15 schemas total)
│   ├── client.ts          # Sanity connection
│   └── migrate.ts         # Initial data migration
│
├── services/
│   ├── sanity.ts         # Fetch functions for Sanity
│   ├── cms.ts            # Fallback/local data
│   └── api.ts            # Facebook API
│
├── sanity.config.ts      # Sanity configuration
├── .env.local            # Your credentials (secret!)
└── .env.local.example    # Template for env vars
```

---

## 🎯 Common Tasks

### Updating Statistics

1. Go to **"Statistic"** documents
2. Edit values:
   - Students Enrolled: `3300+`
   - Qualified Teachers: `200+`
   - Years of Excellence: `16`
   - Graduates: `600+`
3. Publish changes

### Changing Hero Images

1. **Home Page**: Edit `homePage` → `hero` → `carouselImages`
2. **Grand Opening**: Edit `homePage` → `grandOpening` → `carouselImages`
3. **About Page**: Edit `aboutPage` → `hero` → `image`

### Adding a Department

1. Create new **"Department"** document
2. Fill name & description
3. Upload representative image
4. Set display order
5. Publish

### Reordering Content

Most content has an `order` field:
- Lower numbers appear first
- Use increments of 10 (10, 20, 30) for easy insertion
- Example: To insert between 10 and 20, use 15

---

## 🔐 Security Best Practices

### Environment Variables
- ✅ Never commit `.env.local` to Git
- ✅ Keep tokens secret
- ✅ Use different tokens for dev/production
- ✅ Regenerate tokens if exposed

### Team Access
1. Go to [manage.sanity.io](https://manage.sanity.io)
2. Select your project
3. Add team members
4. Assign appropriate roles:
   - **Admin**: Full access (give to 1-2 people)
   - **Editor**: Can create/edit content (teachers/staff)
   - **Viewer**: Read-only (for review)

---

## 💰 Pricing (It's FREE!)

### Sanity Free Tier:
- ✅ **3 users** - Perfect for small team
- ✅ **500,000 documents** - Way more than you need
- ✅ **Unlimited API calls** - No throttling
- ✅ **Unlimited bandwidth** - Serve any traffic
- ✅ **10GB assets** - Store all your images
- ✅ **Image transformations** - Auto-optimize
- ✅ **Community support** - Active Slack channel

**No credit card required. No surprise charges. Perfect for your school!**

### If You Grow (Optional Paid Plans):
- **Growth**: $199/month (10 users, more storage)
- **Enterprise**: Custom pricing (unlimited everything)

---

## 🆘 Troubleshooting

### Problem: "Cannot connect to Sanity"
**Solution:**
```bash
npx sanity@latest login
# Re-authenticate and try again
```

### Problem: Images not loading
**Check:**
1. Images uploaded in Sanity Studio?
2. `.env.local` has correct Project ID?
3. Restarted dev server after env changes?

### Problem: Content not updating
**Try:**
1. Hard refresh browser (Ctrl+Shift+R)
2. Check Sanity Studio - is content published?
3. Check browser console for errors

### Problem: Schema errors
**Solution:**
```bash
# Check for typos in schema files
# Restart Sanity dev server:
npm run sanity
```

---

## 📚 Learning Resources

### Official Documentation
- [Sanity Docs](https://www.sanity.io/docs) - Complete reference
- [GROQ Tutorial](https://www.sanity.io/docs/groq) - Query language
- [Schema Guide](https://www.sanity.io/docs/schema-types) - Content modeling

### Video Tutorials
- [Sanity YouTube](https://www.youtube.com/c/Sanity-io) - Official channel
- [Getting Started](https://www.sanity.io/guides) - Step-by-step guides

### Community
- [Sanity Slack](https://slack.sanity.io) - Join 10,000+ developers
- [GitHub Discussions](https://github.com/sanity-io/sanity/discussions) - Ask questions

---

## 🎉 What You've Accomplished

✅ **Professional CMS** - Industry-standard content management  
✅ **Easy Updates** - No code required for content changes  
✅ **Team Collaboration** - Multiple people can edit  
✅ **Image Optimization** - Automatic resizing & compression  
✅ **Real-time Publishing** - Changes appear instantly  
✅ **Version Control** - Never lose content  
✅ **Scalable** - Grows with your school  
✅ **Free Forever** - No ongoing costs

---

## 📞 Support

### Need Help?
1. Check this guide first
2. Read `SETUP_INSTRUCTIONS.md`
3. Check `SANITY_SETUP.md` for detailed schema info
4. Join [Sanity Slack](https://slack.sanity.io)
5. Post in [GitHub Discussions](https://github.com/sanity-io/sanity/discussions)

### Quick Links
- **Studio**: `https://your-project.sanity.studio`
- **Manage**: `https://manage.sanity.io`
- **Docs**: `https://www.sanity.io/docs`

---

## 🚀 Next Steps

### Immediate (Do Now):
1. ✅ Create Sanity account
2. ✅ Configure `.env.local`
3. ✅ Initialize & deploy studio
4. ✅ Access studio and look around

### Content Population (This Week):
1. Upload school logo
2. Add 3-5 hero images
3. Create staff profiles (start with founders)
4. Upload facility photos
5. Add 20-30 gallery images
6. Update contact information

### Ongoing:
- Add new staff as they join
- Update gallery with event photos
- Publish news/updates as social posts
- Keep statistics current

---

**Your school website is now powered by world-class content management! 🎓✨**

Start adding content in Sanity Studio and watch your website come to life!

