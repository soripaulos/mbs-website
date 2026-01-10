import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'intro', title: 'Introduction' },
    { name: 'content', title: 'Content Sections' },
  ],
  fields: [
    // ==================== HERO SECTION ====================
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      group: 'hero',
      fields: [
        { name: 'title', title: 'Title', type: 'string', initialValue: 'Nurturing Excellence' },
        { name: 'subtitle', title: 'Subtitle', type: 'string', initialValue: 'A Legacy of 15 Years in Education' },
        { 
          name: 'images', 
          title: 'Hero Images (Slideshow)', 
          type: 'array', 
          of: [{ type: 'image', options: { hotspot: true } }],
          description: 'Add multiple images for hero slideshow (unlimited). First image shows by default.',
        },
        {
          name: 'overlayColor',
          title: 'Overlay Color',
          type: 'string',
          description: 'CSS color value (e.g., rgba(37, 55, 107, 0.8), #25376B80)',
          initialValue: 'rgba(37, 55, 107, 0.8)',
        },
      ],
    }),

    // ==================== INTRODUCTION ====================
    defineField({
      name: 'intro',
      title: 'Introduction',
      type: 'object',
      group: 'intro',
      fields: [
        { name: 'title', title: 'Title', type: 'string', initialValue: 'Welcome to Makko Billi School' },
        { 
          name: 'content', 
          title: 'Content Paragraphs', 
          type: 'array', 
          of: [{ type: 'text' }],
          description: 'Each item is a separate paragraph',
        },
      ],
    }),

    // ==================== CONTENT REFERENCES ====================
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'stat' }] }],
      description: 'Select statistics to display',
    }),
    defineField({
      name: 'facilities',
      title: 'Facilities',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'facility' }] }],
      description: 'Select facilities to display',
    }),
    defineField({
      name: 'academics',
      title: 'Academic Levels',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'academicLevel' }] }],
      description: 'Select academic levels to display',
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      description: 'Select services to display',
    }),
    defineField({
      name: 'branches',
      title: 'Branches',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'branch' }] }],
      description: 'Select branches to display',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About Page',
        subtitle: 'About page content and hero',
      };
    },
  },
});
