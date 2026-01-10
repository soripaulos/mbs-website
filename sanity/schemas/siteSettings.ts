import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General' },
    { name: 'branding', title: 'Branding & Logos' },
    { name: 'footer', title: 'Footer' },
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
      initialValue: 'Makko Billi School',
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      group: 'general',
      description: 'Brief description of the school for SEO',
    }),

    // ==================== BRANDING ====================
    defineField({
      name: 'logo',
      title: 'Header Logo',
      type: 'image',
      group: 'branding',
      description: 'Primary logo displayed in the navigation header (not circular/framed)',
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

    // ==================== FOOTER ====================
    defineField({
      name: 'footerLogo',
      title: 'Footer Logo',
      type: 'image',
      group: 'footer',
      description: 'Logo displayed in the footer section',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'footerDescription',
      title: 'Footer Description',
      type: 'text',
      group: 'footer',
      description: 'Brief text shown in the footer about the school',
      initialValue: 'Nurturing minds, building character, and fostering a love for learning since 2009.',
    }),
    defineField({
      name: 'footerContact',
      title: 'Footer Contact Info',
      type: 'object',
      group: 'footer',
      fields: [
        { name: 'phone', title: 'Phone', type: 'string', initialValue: '+251-221-120620' },
        { name: 'email', title: 'Email', type: 'string', initialValue: 'info@makkobillischool.com' },
        { name: 'address', title: 'Address', type: 'string', initialValue: 'Adama, Ethiopia' },
      ],
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright Text',
      type: 'string',
      group: 'footer',
      initialValue: 'COPYRIGHT © 2025 MAKKO BILLI SCHOOL',
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
      description: 'For fetching Facebook posts (get from Graph API Explorer)',
    }),
    defineField({
      name: 'facebookAccessToken',
      title: 'Facebook Access Token',
      type: 'string',
      group: 'social',
      description: 'Page Access Token for Facebook Graph API',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'Branding, logos, footer, and social links',
      };
    },
  },
});
