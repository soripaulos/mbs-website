import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'staffPage',
  title: 'Staff Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'sections', title: 'Section Titles' },
  ],
  fields: [
    // ==================== HERO SECTION ====================
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      group: 'hero',
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
          description: 'Add multiple images for hero slideshow (unlimited). First image shows by default.',
        },
        {
          name: 'overlayColor',
          title: 'Overlay Color',
          type: 'string',
          description: 'CSS color value (e.g., rgba(37, 55, 107, 0.8), #25376B80)',
          initialValue: 'rgba(37, 55, 107, 0.8)',
        },
      ],
    }),

    // ==================== SECTION TITLES ====================
    defineField({
      name: 'sectionTitles',
      title: 'Section Titles',
      type: 'object',
      group: 'sections',
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
