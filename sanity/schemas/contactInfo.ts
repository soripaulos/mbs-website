import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'contactInfo',
  title: 'Contact Information',
  type: 'document',
  fields: [
    defineField({
      name: 'mainPhones',
      title: 'Main Phone Numbers',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'departmentPhones',
      title: 'Department Phones',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'department', title: 'Department', type: 'string' },
          { name: 'phone', title: 'Phone', type: 'string' },
        ],
      }],
    }),
    defineField({
      name: 'emails',
      title: 'Email Addresses',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'address',
      title: 'Physical Address',
      type: 'text',
    }),
    defineField({
      name: 'location',
      title: 'Location Details',
      type: 'object',
      fields: [
        { name: 'city', title: 'City', type: 'string' },
        { name: 'region', title: 'Region', type: 'string' },
        { name: 'country', title: 'Country', type: 'string' },
      ],
    }),
  ],
});

