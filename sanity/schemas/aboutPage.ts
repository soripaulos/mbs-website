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
        { name: 'image', title: 'Background Image', type: 'image', options: { hotspot: true } },
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

