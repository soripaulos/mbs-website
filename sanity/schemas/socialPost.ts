import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'socialPost',
  title: 'Social Media Post',
  type: 'document',
  fields: [
    defineField({
      name: 'content',
      title: 'Post Content',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'date',
      title: 'Post Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'External URL',
      type: 'url',
      description: 'Link to original post on Facebook/Instagram',
    }),
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'Facebook', value: 'facebook' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'Manual', value: 'manual' },
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on homepage',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'content',
      subtitle: 'date',
      media: 'images.0',
    },
  },
});

