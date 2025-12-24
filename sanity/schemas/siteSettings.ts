import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General' },
    { name: 'branding', title: 'Branding' },
    { name: 'social', title: 'Social Media' },
  ],
  fields: [
    // ==================== GENERAL ====================
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      group: 'general',
    }),

    // ==================== BRANDING ====================
    defineField({
      name: 'logo',
      title: 'Main Logo',
      type: 'image',
      group: 'branding',
      description: 'Primary logo displayed in header (will NOT be framed/circular)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'logoMobile',
      title: 'Mobile Logo (optional)',
      type: 'image',
      group: 'branding',
      description: 'Optional smaller logo for mobile devices',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      group: 'branding',
      description: 'Small icon shown in browser tabs (recommended: square PNG, 32x32 or 64x64)',
      options: {
        hotspot: false,
      },
    }),
    defineField({
      name: 'footerLogo',
      title: 'Footer Logo (optional)',
      type: 'image',
      group: 'branding',
      description: 'Logo for the footer section',
      options: {
        hotspot: true,
      },
    }),

    // ==================== SOCIAL MEDIA ====================
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      group: 'social',
      fields: [
        { name: 'facebook', title: 'Facebook URL', type: 'url' },
        { name: 'telegram', title: 'Telegram URL', type: 'url' },
        { name: 'tiktok', title: 'TikTok URL', type: 'url' },
        { name: 'youtube', title: 'YouTube URL', type: 'url' },
      ],
    }),
    defineField({
      name: 'facebookPageId',
      title: 'Facebook Page ID',
      type: 'string',
      group: 'social',
      description: 'For fetching Facebook posts',
    }),
    defineField({
      name: 'facebookAccessToken',
      title: 'Facebook Access Token',
      type: 'string',
      group: 'social',
      description: 'For accessing Facebook Graph API',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'Branding, logos, and social links',
      };
    },
  },
});

