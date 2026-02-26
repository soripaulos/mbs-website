import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'grandOpening', title: 'Grand Opening' },
    { name: 'pillars', title: 'Three Pillars' },
    { name: 'about', title: 'About Section' },
    { name: 'studentPortalApp', title: 'Student Portal App Section' },
  ],
  fields: [
    // ==================== HERO SECTION ====================
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      group: 'hero',
      fields: [
        {
          name: 'title',
          title: 'Main Title',
          type: 'string',
          description: 'The main headline text',
          initialValue: '15 Years of Fellowship at Makko Billi',
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
          description: 'Text below the main title',
          initialValue: '"Our first batch of graduates who stayed with our school since nursery"',
        },
        {
          name: 'images',
          title: 'Hero Carousel Images',
          type: 'array',
          of: [{ type: 'image', options: { hotspot: true } }],
          description: 'Background images that rotate in the hero section (unlimited)',
        },
        {
          name: 'overlayColor',
          title: 'Overlay Color',
          type: 'string',
          description: 'CSS color value (e.g., rgba(37, 55, 107, 0.8), #25376B, or hex with alpha)',
          initialValue: 'rgba(37, 55, 107, 0.8)',
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Discover Our Story',
        },
        {
          name: 'buttonLink',
          title: 'Button Link',
          type: 'string',
          initialValue: '/about',
        },
      ],
    }),

    // ==================== GRAND OPENING SECTION ====================
    defineField({
      name: 'grandOpening',
      title: 'Grand Opening Section',
      type: 'object',
      group: 'grandOpening',
      fields: [
        { name: 'badge', title: 'Badge Text', type: 'string', initialValue: 'New Campus' },
        { name: 'title', title: 'Title', type: 'string', initialValue: 'Grand Opening' },
        { name: 'subtitle', title: 'Subtitle', type: 'string', initialValue: 'Makko Billi School Dembi Dollo' },
        { name: 'description', title: 'Description', type: 'string', initialValue: 'KG and Elementary (KG-Grade 8)' },
        {
          name: 'images',
          title: 'Carousel Images',
          type: 'array',
          of: [{ type: 'image', options: { hotspot: true } }],
          description: 'Images for the grand opening carousel (unlimited)',
        },
        {
          name: 'features',
          title: 'Features',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { 
                name: 'icon', 
                title: 'Icon Name', 
                type: 'string', 
                description: 'Any Lucide icon name (e.g., MapPin, Star, BookOpen, Users, Lightbulb, Heart, Award, GraduationCap, Building2, etc.)',
              },
              { name: 'title', title: 'Title', type: 'string' },
              { name: 'description', title: 'Description', type: 'text' },
              { 
                name: 'bgColor', 
                title: 'Background Color', 
                type: 'string',
                description: 'CSS color (e.g., rgba(37, 55, 107, 1), #25376B, rgb(255,195,75))',
              },
            ],
            preview: {
              select: { title: 'title', subtitle: 'icon' },
            },
          }],
        },
      ],
    }),

    // ==================== THREE PILLARS SECTION ====================
    defineField({
      name: 'pillars',
      title: 'Three Pillars Section',
      type: 'array',
      group: 'pillars',
      of: [{
        type: 'object',
        fields: [
          { 
            name: 'icon', 
            title: 'Icon Name', 
            type: 'string', 
            description: 'Any Lucide icon name (e.g., Lightbulb, Users, BookOpen, Heart, Award, Target, etc.)',
          },
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
          { 
            name: 'bgColor', 
            title: 'Icon Background Color', 
            type: 'string',
            description: 'CSS color (e.g., rgba(219, 234, 254, 1), #dbeafe)',
          },
          { 
            name: 'iconColor', 
            title: 'Icon Color', 
            type: 'string',
            description: 'CSS color (e.g., rgba(37, 55, 107, 1), #25376B)',
          },
        ],
        preview: {
          select: { title: 'title' },
        },
      }],
    }),

    // ==================== ABOUT SECTION ====================
    defineField({
      name: 'aboutSection',
      title: 'About Section',
      type: 'object',
      group: 'about',
      fields: [
        { name: 'title', title: 'Title', type: 'string', initialValue: 'A Little About Us' },
        { name: 'content', title: 'Content', type: 'text', description: 'Brief description about the school' },
        { name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } },
        { name: 'buttonText', title: 'Button Text', type: 'string', initialValue: 'Read More' },
        { name: 'buttonLink', title: 'Button Link', type: 'string', initialValue: '/about' },
      ],
    }),

    // ==================== STUDENT PORTAL APP SECTION ====================
    defineField({
      name: 'studentPortalApp',
      title: 'Student Portal App Section',
      type: 'object',
      group: 'studentPortalApp',
      fields: [
        { name: 'badge', title: 'Badge Text', type: 'string', initialValue: 'NEW' },
        { name: 'title', title: 'Title', type: 'string', initialValue: 'Makko Billi Student Portal App' },
        { name: 'subtitle', title: 'Subtitle', type: 'string', initialValue: 'Stay Connected, Stay Informed' },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          initialValue: "Access everything you need for your child's education right from your smartphone. Track attendance, view grades, communicate with teachers, and stay updated with school announcements.",
        },
        {
          name: 'appImage',
          title: 'App Image',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'features',
          title: 'Features',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'icon',
                  title: 'Icon Name',
                  type: 'string',
                  description: 'Lucide icon name (e.g., Calendar, GraduationCap, MessageCircle, Bell)',
                },
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'description', title: 'Description', type: 'string' },
              ],
              preview: {
                select: { title: 'title', subtitle: 'description' },
              },
            },
          ],
        },
        {
          name: 'downloadLinks',
          title: 'Download Links',
          type: 'object',
          fields: [
            { name: 'appStore', title: 'App Store URL', type: 'url' },
            { name: 'playStore', title: 'Play Store URL', type: 'url' },
            { name: 'webPortal', title: 'Web Portal URL', type: 'url' },
          ],
        },
      ],
    }),

    // ==================== LATEST UPDATES SECTION ====================
    defineField({
      name: 'latestUpdates',
      title: 'Latest Updates Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string', initialValue: 'Latest Updates' },
        { name: 'showCount', title: 'Number of Posts to Show', type: 'number', initialValue: 3 },
        { name: 'buttonText', title: 'Button Text', type: 'string', initialValue: 'See More' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page',
        subtitle: 'Main landing page content',
      };
    },
  },
});
