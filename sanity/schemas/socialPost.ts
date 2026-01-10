import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'socialPost',
  title: 'Social Media Post',
  type: 'document',
  description: 'Manual posts that appear alongside Facebook posts in the Latest Updates section',
  fields: [
    defineField({
      name: 'content',
      title: 'Post Content',
      type: 'text',
      description: 'The text content of your post/announcement',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Add one or more images for this post',
    }),
    defineField({
      name: 'date',
      title: 'Post Date',
      type: 'datetime',
      description: 'When this post was created',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'url',
      title: 'Link URL (optional)',
      type: 'url',
      description: 'External link for "Read More" button',
    }),
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'Manual/Announcement', value: 'manual' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'Other', value: 'other' },
        ],
      },
      initialValue: 'manual',
    }),
  ],
  preview: {
    select: {
      title: 'content',
      media: 'images.0',
      date: 'date',
    },
    prepare({ title, media, date }) {
      return {
        title: title ? (title.length > 50 ? title.substring(0, 50) + '...' : title) : 'Untitled Post',
        subtitle: date ? new Date(date).toLocaleDateString() : 'No date',
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Date, Newest',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
});

