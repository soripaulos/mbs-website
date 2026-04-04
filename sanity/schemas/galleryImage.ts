import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Campus', value: 'campus' },
          { title: 'Events', value: 'events' },
          { title: 'Classroom', value: 'classroom' },
          { title: 'Sports', value: 'sports' },
          { title: 'Arts', value: 'arts' },
          { title: 'Science', value: 'science' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'caption',
      subtitle: 'category',
      media: 'image',
    },
  },
});

