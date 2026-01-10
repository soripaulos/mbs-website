# Sanity CMS Schema Reference - Makko Billi School

**Project ID:** yqwhfc1k  
**Dataset:** production  
**Workspace:** makko-billi-school  
**Last Updated:** January 10, 2026

---

## ✅ Complete Schema Deployment

All 17 schemas have been thoroughly deployed and verified:

### 📄 **Page Documents**

#### 1. `siteSettings` (12 fields)
- **Logo & Branding**: logo, logoMobile, favicon, footerLogo
- **Footer Content**: footerDescription, footerContact (phone/email/address), copyright
- **Social Links**: facebook, telegram, tiktok, youtube
- **Facebook API**: facebookPageId, facebookAccessToken

#### 2. `homePage` (5 fields)
- **hero**: images[], overlayColor (CSS), title, subtitle, buttonText, buttonLink
- **grandOpening**: images[], badge, title, subtitle, description, features[] (icon, title, description, bgColor)
- **pillars[]**: icon, title, description, bgColor, iconColor
- **aboutSection**: title, content, backgroundImage, buttonText, buttonLink
- **latestUpdates**: title, showCount, buttonText

#### 3. `aboutPage` (7 fields)
- **hero**: images[], overlayColor (CSS), title, subtitle
- **intro**: title, content[] (paragraphs)
- **References**: stats[], facilities[], academics[], services[], branches[]

#### 4. `staffPage` (2 fields)
- **hero**: images[], overlayColor (CSS), title, subtitle
- **sectionTitles**: foundersTitle, directorsTitle/Subtitle, viceDirectorsTitle/Subtitle, departmentsTitle

#### 5. `galleryPage` (2 fields)
- **hero**: images[], overlayColor (CSS), title, subtitle
- **settings**: showCategories, imagesPerPage, loadMoreText

#### 6. `contactPage` (7 fields)
- **hero**: images[], overlayColor (CSS), title, subtitle
- **Contact Info**: sectionTitle, phones (mainPhones[], departmentPhones[]), emails[], addresses[]
- **form**: enabled, nameLabel, emailLabel, subjectLabel, messageLabel, submitText
- **mapLocations[]**: title, embedUrl, titleColor (CSS)

---

### 📝 **Content Documents**

#### 7. `socialPost` (5 fields)
Manual announcements that merge with Facebook posts
- content (text, required)
- images[] (unlimited)
- date (datetime, required)
- url (optional link)
- platform (manual/facebook/instagram/other)

#### 8. `galleryImage` (5 fields)
- image (required)
- caption
- category (events/facilities/students/staff/activities/other)
- date
- order

#### 9. `stat` (4 fields)
- label (required)
- value (required)
- suffix (e.g., +, Years)
- order

#### 10. `facility` (8 fields)
- id (slug, required)
- title (required)
- description
- mainImage
- gallery[]
- colSpan (1-3)
- icon (any Lucide icon name)
- order

#### 11. `service` (5 fields)
- title (required)
- description
- icon (any Lucide icon name)
- iconColor (CSS color)
- order

#### 12. `branch` (6 fields)
- name (required)
- location
- description
- image
- features[] (string array)
- order

#### 13. `academicLevel` (9 fields)
- id (slug, required)
- level (required)
- description
- mainImage
- features[]
- extendedDescription
- director (object: name, role, image, message)
- gallery[]
- order

#### 14. `staffProfile` (8 fields)
- name (required)
- role
- category (founder/director/vice-director/teacher/staff, required)
- image
- email
- phones[]
- bio
- order

#### 15. `department` (4 fields)
- name (required)
- description
- image
- order

---

## 🎨 **Key Features**

### ✅ Unlimited Hero Images
All page hero sections support unlimited images in a slideshow:
- `homePage.hero.images[]`
- `aboutPage.hero.images[]`
- `staffPage.hero.images[]`
- `galleryPage.hero.images[]`
- `contactPage.hero.images[]`
- `homePage.grandOpening.images[]`

### ✅ Any Lucide Icon
All icon fields accept **any Lucide icon name** (free text):
- Examples: `MapPin`, `Star`, `BookOpen`, `Lightbulb`, `Users`, `Heart`, `Award`, `GraduationCap`, `Building2`, `FlaskConical`, `Monitor`, `Trophy`, `Palette`, `Music`, `Stethoscope`, `Bus`, `Smartphone`, `Database`, `Laptop`

### ✅ CSS Color Values
All color fields accept CSS color strings:
- **RGB/RGBA**: `rgba(37, 55, 107, 0.8)`, `rgb(255, 195, 75)`
- **Hex**: `#25376B`, `#25376BCC` (with alpha)
- **Named**: `blue`, `red` (not recommended)

Fields:
- `homePage.hero.overlayColor`
- `homePage.grandOpening.features[].bgColor`
- `homePage.pillars[].bgColor`, `pillars[].iconColor`
- `service.iconColor`
- `contactPage.mapLocations[].titleColor`
- All page hero `overlayColor` fields

### ✅ Backwards Compatibility
GROQ queries support both old and new field names:
- `coalesce(images[], carouselImages[])` - works with both

---

## 📋 **What to Fill in Sanity Studio**

Visit: **https://yqwhfc1k.sanity.studio/studio**

### Priority 1: Site Settings
1. Upload **logo** (header, not circular)
2. Upload **favicon** (32x32 or 64x64 PNG)
3. Upload **footerLogo**
4. Add **footerDescription** text
5. Fill **footerContact** (phone, email, address)
6. Set **copyright** text
7. Verify **socialLinks** (facebook, telegram, tiktok, youtube)

### Priority 2: Page Hero Images
Add images arrays to all pages:
1. `aboutPage` → hero → images
2. `staffPage` → hero → images
3. `galleryPage` → hero → images
4. `contactPage` → hero → images

### Priority 3: Colors
Update all color fields from Tailwind classes to CSS:
- Old: `bg-school-brand/80`
- New: `rgba(37, 55, 107, 0.8)`

### Optional: Manual Posts
Create `socialPost` documents for announcements that appear with Facebook posts.

---

## 🔗 **Integration Status**

| Component | Status | Notes |
|-----------|--------|-------|
| Navbar Logo | ✅ Dynamic | Pulls from `siteSettings.logo` |
| Footer | ✅ Dynamic | Uses `siteSettings` for all content |
| Hero Slideshows | ✅ Dynamic | All pages use `HeroSlideshow` component |
| Icons | ✅ Dynamic | `DynamicIcon` component loads any Lucide icon |
| Colors | ✅ Dynamic | CSS strings passed directly to styles |
| Facebook Posts | ✅ Merged | Manual `socialPost` + API posts |
| Contact Maps | ✅ Dynamic | `embedUrl` and `titleColor` from Sanity |

---

## 🚀 **Deployment**

All changes pushed to GitHub: **58d2c4b**  
Cloudflare Pages will auto-rebuild on push.

---

## 📌 **Notes**

1. **Legacy schemas**: `hero` and `contactInfo` documents still exist but are unused (can be ignored)
2. **Color format**: Always use CSS strings, not Tailwind classes
3. **Image arrays**: No limits - add as many as needed
4. **Icon names**: Must match Lucide React icon names exactly (case-sensitive)

