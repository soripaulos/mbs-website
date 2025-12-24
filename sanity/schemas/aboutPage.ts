import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'subtitle', title: 'Subtitle', type: 'string' },
        { 
          name: 'images', 
          title: 'Hero Images (Slideshow)', 
          type: 'array', 
          of: [{ type: 'image', options: { hotspot: true } }],
          description: 'Add multiple images for hero slideshow. First image shows by default.',
          validation: (Rule) => Rule.min(1).max(10),
        },
        {
          name: 'overlayColor',
          title: 'Overlay Color',
          type: 'string',
          options: {
            list: [
              { title: 'Brand Blue', value: 'bg-school-brand/80' },
              { title: 'Dark Blue', value: 'bg-school-dark-blue/80' },
              { title: 'Pink', value: 'bg-school-pink/80' },
            ],
          },
          initialValue: 'bg-school-brand/80',
        },
      ],
    }),
    defineField({
      name: 'intro',
      title: 'Introduction',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { 
          name: 'content', 
          title: 'Content Paragraphs', 
          type: 'array', 
          of: [{ type: 'text' }],
        },
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'stat' }] }],
    }),
    defineField({
      name: 'facilities',
      title: 'Facilities',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'facility' }] }],
    }),
    defineField({
      name: 'academics',
      title: 'Academic Levels',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'academicLevel' }] }],
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
    }),
    defineField({
      name: 'branches',
      title: 'Branches',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'branch' }] }],
    }),
  ],
});

