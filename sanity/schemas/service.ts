import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
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
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Any Lucide icon name (e.g., Bus, Smartphone, Database, Laptop, BookOpen, Users, GraduationCap, etc.)',
    }),
    defineField({
      name: 'iconColor',
      title: 'Icon Color',
      type: 'string',
      description: 'CSS color (e.g., #25376B, rgba(37, 55, 107, 1))',
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
    },
  },
});
