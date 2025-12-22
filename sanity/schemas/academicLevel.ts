import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'academicLevel',
  title: 'Academic Level',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'ID',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      description: 'e.g., kg, primary, high-school',
    }),
    defineField({
      name: 'level',
      title: 'Level Name',
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
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'extendedDescription',
      title: 'Extended Description',
      type: 'text',
    }),
    defineField({
      name: 'director',
      title: 'Director',
      type: 'object',
      fields: [
        { name: 'name', title: 'Name', type: 'string' },
        { name: 'role', title: 'Role', type: 'string' },
        { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
        { name: 'message', title: 'Message', type: 'text' },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'level',
      media: 'mainImage',
    },
  },
});

