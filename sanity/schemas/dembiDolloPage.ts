import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'dembiDolloPage',
  title: 'Dembi Dollo Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Document Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Hero Title', type: 'string' },
        { name: 'subtitle', title: 'Subtitle', type: 'string' },
        {
          name: 'images',
          title: 'Background Slideshow Images',
          type: 'array',
          of: [{ type: 'image', options: { hotspot: true } }],
        },
        { name: 'overlayColor', title: 'Overlay Color Class', type: 'string' },
      ],
    }),
    defineField({
      name: 'compoundSection',
      title: 'Compound Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string' },
        { name: 'description', title: 'Section Description', type: 'text' },
        {
          name: 'images',
          title: 'Compound Images',
          type: 'array',
          of: [{ type: 'image', fields: [{ name: 'caption', title: 'Caption', type: 'string' }], options: { hotspot: true } }],
        },
      ],
    }),
    defineField({
      name: 'classroomsSection',
      title: 'Classrooms Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string' },
        { name: 'description', title: 'Section Description', type: 'text' },
        {
          name: 'images',
          title: 'Classroom Images',
          type: 'array',
          of: [{ type: 'image', fields: [{ name: 'caption', title: 'Caption', type: 'string' }], options: { hotspot: true } }],
        },
      ],
    }),
    defineField({
      name: 'activitiesSection',
      title: 'Activities Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string' },
        { name: 'description', title: 'Section Description', type: 'text' },
        {
          name: 'images',
          title: 'Activity Images',
          type: 'array',
          of: [{ type: 'image', fields: [{ name: 'caption', title: 'Caption', type: 'string' }], options: { hotspot: true } }],
        },
      ],
    }),
    defineField({
      name: 'story',
      title: 'Our Story Section',
      type: 'object',
      fields: [
        { name: 'sectionTitle', title: 'Main Title', type: 'string' },
        { name: 'ideaTitle', title: 'Idea Title', type: 'string' },
        { name: 'ideaContent', title: 'Idea Content', type: 'text' },
        { name: 'ideaImage', title: 'Idea Image', type: 'image', options: { hotspot: true } },
        { name: 'locationTitle', title: 'Location Title', type: 'string' },
        { name: 'locationContent', title: 'Location Content', type: 'text' },
        { name: 'locationImage', title: 'Location Image', type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'communitySupport',
      title: 'Community Support Section',
      type: 'object',
      fields: [
        { name: 'sectionTitle', title: 'Section Title', type: 'string' },
        { name: 'sectionDescription', title: 'Section Description', type: 'text' },
        {
          name: 'initiatives',
          title: 'Support Initiatives',
          type: 'array',
          of: [
            {
              type: 'object',
              title: 'Initiative',
              fields: [
                { name: 'title', title: 'Initiative Title', type: 'string' },
                { name: 'description', title: 'Initiative Description', type: 'text' },
                {
                  name: 'images',
                  title: 'Initiative Images',
                  type: 'array',
                  of: [{ type: 'image', fields: [{ name: 'caption', title: 'Caption', type: 'string' }], options: { hotspot: true } }],
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'staff',
      title: 'Staff Section',
      type: 'object',
      fields: [
        { name: 'sectionTitle', title: 'Section Title', type: 'string' },
        { name: 'sectionSubtitle', title: 'Subtitle', type: 'string' },
        {
          name: 'members',
          title: 'Staff Members',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'name', title: 'Name', type: 'string' },
                { name: 'role', title: 'Role', type: 'string' },
                { name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } },
                { name: 'phones', title: 'Phone Numbers', type: 'array', of: [{ type: 'string' }] },
                { name: 'email', title: 'Email', type: 'string' },
                { name: 'bio', title: 'Short Bio', type: 'text' },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Contact Section',
      type: 'object',
      fields: [
        { name: 'sectionTitle', title: 'Section Title', type: 'string' },
        { name: 'sectionDescription', title: 'Section Description', type: 'text' },
        { name: 'phone', title: 'Phone', type: 'string' },
        { name: 'email', title: 'Email', type: 'string' },
        { name: 'address', title: 'Address', type: 'string' },
        { name: 'mapEmbedUrl', title: 'Google Maps Embed URL', type: 'url' },
        { name: 'ctaTitle', title: 'CTA Title', type: 'string' },
        { name: 'ctaDescription', title: 'CTA Description', type: 'text' },
        { name: 'ctaButtonText', title: 'CTA Button Text', type: 'string' },
        { name: 'ctaButtonLink', title: 'CTA Button Link', type: 'url' },
      ],
    }),
  ],
  preview: { select: { title: 'title' } },
})
