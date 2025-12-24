import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'galleryPage',
  title: 'Gallery Page',
  type: 'document',
  fields: [
    // ==================== HERO SECTION ====================
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Gallery',
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
          initialValue: 'Capturing Moments',
        },
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

    // ==================== GALLERY SETTINGS ====================
    defineField({
      name: 'settings',
      title: 'Gallery Settings',
      type: 'object',
      fields: [
        {
          name: 'showCategories',
          title: 'Show Category Filter',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'imagesPerPage',
          title: 'Images Per Page',
          type: 'number',
          initialValue: 12,
        },
        {
          name: 'loadMoreText',
          title: 'Load More Button Text',
          type: 'string',
          initialValue: 'Load more',
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Gallery Page',
        subtitle: 'Gallery page settings and hero',
      };
    },
  },
});



