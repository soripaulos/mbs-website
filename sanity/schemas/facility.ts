import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'facility',
  title: 'Facility',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'Facility ID',
      type: 'slug',
      description: 'Unique identifier (e.g., library, lab, computer-lab, sports-field)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'colSpan',
      title: 'Column Span',
      type: 'number',
      description: 'For grid layout (1, 2, or 3 columns wide)',
      options: {
        list: [
          { title: '1 Column', value: 1 },
          { title: '2 Columns', value: 2 },
          { title: '3 Columns', value: 3 },
        ],
      },
      initialValue: 1,
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Any Lucide icon name (e.g., Book, FlaskConical, Monitor, Trophy, Palette, Music, Stethoscope, Building2, etc.)',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'icon',
      media: 'mainImage',
    },
  },
});
