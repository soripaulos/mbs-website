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
          name: 'carouselImages',
          title: 'Hero Carousel Images',
          type: 'array',
          of: [{ type: 'image', options: { hotspot: true } }],
          description: 'Background images that rotate in the hero section',
          validation: (Rule) => Rule.min(1).max(10),
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
          name: 'carouselImages',
          title: 'Carousel Images',
          type: 'array',
          of: [{ type: 'image', options: { hotspot: true } }],
          description: 'Images for the grand opening carousel',
          validation: (Rule) => Rule.min(1).max(10),
        },
        {
          name: 'features',
          title: 'Features',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'icon', title: 'Icon Name', type: 'string', description: 'Lucide icon name: MapPin, Star, BookOpen, etc.' },
              { name: 'title', title: 'Title', type: 'string' },
              { name: 'description', title: 'Description', type: 'text' },
              { 
                name: 'bgColor', 
                title: 'Background Color', 
                type: 'string', 
                description: 'Tailwind class: bg-school-dark-blue, bg-school-yellow, bg-school-pink',
                options: {
                  list: [
                    { title: 'Dark Blue', value: 'bg-school-dark-blue' },
                    { title: 'Yellow', value: 'bg-school-yellow' },
                    { title: 'Pink', value: 'bg-school-pink' },
                    { title: 'Brand Blue', value: 'bg-school-brand' },
                  ]
                }
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
          { name: 'icon', title: 'Icon Name', type: 'string', description: 'Lucide icon name: Lightbulb, Users, BookOpen' },
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
          { 
            name: 'bgColor', 
            title: 'Icon Background Color', 
            type: 'string',
            options: {
              list: [
                { title: 'Blue', value: 'bg-blue-100' },
                { title: 'Yellow', value: 'bg-yellow-100' },
                { title: 'Pink', value: 'bg-pink-100' },
                { title: 'Green', value: 'bg-green-100' },
              ]
            }
          },
          { 
            name: 'iconColor', 
            title: 'Icon Color', 
            type: 'string',
            options: {
              list: [
                { title: 'Dark Blue', value: 'text-school-dark-blue' },
                { title: 'Yellow', value: 'text-school-yellow' },
                { title: 'Pink', value: 'text-school-pink' },
              ]
            }
          },
        ],
        preview: {
          select: { title: 'title' },
        },
      }],
      validation: (Rule) => Rule.length(3),
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
