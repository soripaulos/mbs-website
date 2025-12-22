# cPanel Deployment Guide for Makko Billi School Website

## ✅ Pre-deployment Checklist (COMPLETED)

- [x] Sanity CMS connected (Project: yqwhfc1k)
- [x] Schemas deployed to Sanity Cloud
- [x] Initial content created (Stats, Staff, Services, Departments, Branches)
- [x] Pages wired to fetch from Sanity with fallback
- [x] CORS configured for localhost:3000
- [x] Production build tested successfully

---

## 🚀 Deployment Steps

### Step 1: Add Your Production Domain to Sanity CORS

Before deploying, you MUST add your production domain to Sanity CORS origins:

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select project "Makko Billi School Website" (yqwhfc1k)
3. Go to **API** → **CORS origins**
4. Click **Add CORS origin**
5. Add your domain: `https://yourdomain.com` (replace with actual domain)
6. Check "Allow credentials" if hosting a Studio
7. Save

### Step 2: Build for Production

Run in your terminal:
```bash
npm run build
```

This creates a `dist/` folder with:
- `index.html` - Main entry point
- `assets/` - JavaScript, CSS, and other assets

### Step 3: Upload to cPanel

1. Log in to your cPanel
2. Open **File Manager**
3. Navigate to `public_html/` (or your subdomain folder)
4. **Delete** existing files (backup first if needed)
5. **Upload** all contents of the `dist/` folder:
   - `index.html`
   - `assets/` folder (with all files inside)
6. Ensure `index.html` is at the root level

### Step 4: Verify Deployment

1. Visit your domain
2. Check that all pages load (Home, About, Staff, Gallery, Contact)
3. Verify Sanity data appears (Staff names, contact info, etc.)

---

## 📊 Sanity Studio Access

Your Sanity Studio is available at:
- **URL**: https://makkobillischool.sanity.studio

To manage content:
1. Log in with your Sanity account
2. Edit Staff, Departments, Stats, etc.
3. Click **Publish** to make changes live
4. Changes appear on website instantly (no rebuild needed!)

---

## 🔧 Environment Variables (Already Configured)

The site is pre-configured with:
- **Project ID**: `yqwhfc1k`
- **Dataset**: `production`

These are baked into the build. If you change projects, update `sanity/client.ts` and rebuild.

---

## 📱 Content Management

### To update Staff:
1. Go to Sanity Studio → Staff Profile
2. Edit name, role, contact info
3. Upload new photo
4. Publish

### To update Statistics:
1. Go to Sanity Studio → Statistic
2. Change value, label, or suffix
3. Publish

### To add Gallery Images:
1. Go to Sanity Studio → Gallery Image
2. Upload image, add caption
3. Publish

---

## ⚠️ Important Notes

1. **HashRouter**: The site uses `/#/` routing (e.g., `yourdomain.com/#/about`)
   - This works on cPanel without server configuration
   - No `.htaccess` changes needed

2. **Image Fallbacks**: If Sanity images aren't uploaded, placeholder images show
   - Upload real photos in Sanity Studio for best results

3. **Facebook Token**: The hardcoded Facebook token in `services/api.ts` may expire
   - For long-term, move social posts to Sanity
   - Or create a server-side proxy

4. **SSL**: Ensure your domain has HTTPS enabled
   - Required for Sanity API calls to work

---

## 🆘 Troubleshooting

### Page shows loading spinner forever
- Check browser console for errors
- Verify CORS is configured for your domain in Sanity

### Content not updating
- Make sure documents are **Published** (not just saved as draft)
- Clear browser cache
- Check Sanity Studio for the latest content

### Images not loading
- Upload images in Sanity Studio
- Verify image URLs are accessible

---

## 📞 Support Resources

- **Sanity Docs**: https://www.sanity.io/docs
- **Sanity Studio**: https://makkobillischool.sanity.studio
- **Sanity Community**: https://slack.sanity.io

---

**Deployment ready! 🎉**



