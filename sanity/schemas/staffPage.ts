import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'staffPage',
  title: 'Staff Page',
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
          initialValue: 'Our Staff',
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
          initialValue: 'The Pillars of Our Community',
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

    // ==================== SECTION TITLES ====================
    defineField({
      name: 'sectionTitles',
      title: 'Section Titles',
      type: 'object',
      fields: [
        { name: 'foundersTitle', title: 'Founders Section Title', type: 'string', initialValue: 'Our Founders' },
        { name: 'directorsTitle', title: 'Directors Section Title', type: 'string', initialValue: 'Our Directors' },
        { name: 'directorsSubtitle', title: 'Directors Subtitle', type: 'string', initialValue: 'Leading with vision and dedication' },
        { name: 'viceDirectorsTitle', title: 'Vice Directors Title', type: 'string', initialValue: 'Vice Directors' },
        { name: 'viceDirectorsSubtitle', title: 'Vice Directors Subtitle', type: 'string', initialValue: 'Supporting academic and operational excellence' },
        { name: 'departmentsTitle', title: 'Departments Title', type: 'string', initialValue: 'Our Departments' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Staff Page',
        subtitle: 'Staff page settings and hero',
      };
    },
  },
});



