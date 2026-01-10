import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'socialPost',
  title: 'Social Media Post',
  type: 'document',
  description: 'Manual posts to display alongside Facebook posts',
  fields: [
    defineField({
      name: 'content',
      title: 'Post Content',
      type: 'text',
      description: 'The text content of the post',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Post Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Images for this post (can add multiple)',
      validation: (Rule) => Rule.min(1).max(10),
    }),
    defineField({
      name: 'date',
      title: 'Post Date',
      type: 'datetime',
      description: 'Date and time of the post',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'url',
      title: 'External Link',
      type: 'url',
      description: 'Optional link to external post (e.g., Facebook, Instagram)',
    }),
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      description: 'Source platform for this post',
      options: {
        list: [
          { title: 'Manual', value: 'manual' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'Twitter/X', value: 'twitter' },
          { title: 'Other', value: 'other' },
        ],
      },
      initialValue: 'manual',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'Feature this post at the top',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Date (newest first)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Date (oldest first)',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'content',
      date: 'date',
      media: 'images.0',
      platform: 'platform',
    },
    prepare({ title, date, media, platform }) {
      const dateStr = date ? new Date(date).toLocaleDateString() : '';
      return {
        title: title ? title.substring(0, 60) + (title.length > 60 ? '...' : '') : 'No content',
        subtitle: `${platform || 'manual'} • ${dateStr}`,
        media,
      };
    },
  },
});

