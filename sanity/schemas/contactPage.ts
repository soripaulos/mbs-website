import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'contact', title: 'Contact Info' },
    { name: 'form', title: 'Contact Form' },
    { name: 'maps', title: 'Map Locations' },
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
          initialValue: 'Contact Us',
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
          initialValue: 'Get in Touch with Us',
        },
        {
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: { hotspot: true },
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
          initialValue: 'bg-school-pink/80',
        },
      ],
    }),

    // ==================== SECTION TITLE ====================
    defineField({
      name: 'sectionTitle',
      title: 'Contact Section Title',
      type: 'string',
      group: 'contact',
      initialValue: 'Our Address & Contact Details',
    }),

    // ==================== PHONE NUMBERS ====================
    defineField({
      name: 'phones',
      title: 'Phone Numbers',
      type: 'object',
      group: 'contact',
      fields: [
        {
          name: 'mainPhones',
          title: 'Main Phone Numbers',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'departmentPhones',
          title: 'Department Phone Numbers',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'department', title: 'Department Name', type: 'string' },
              { name: 'phone', title: 'Phone Number', type: 'string' },
            ],
            preview: {
              select: { title: 'department', subtitle: 'phone' },
            },
          }],
        },
      ],
    }),

    // ==================== EMAIL ADDRESSES ====================
    defineField({
      name: 'emails',
      title: 'Email Addresses',
      type: 'array',
      group: 'contact',
      of: [{
        type: 'object',
        fields: [
          { name: 'department', title: 'Department', type: 'string' },
          { name: 'email', title: 'Email', type: 'string' },
        ],
        preview: {
          select: { title: 'department', subtitle: 'email' },
        },
      }],
    }),

    // ==================== ADDRESSES ====================
    defineField({
      name: 'addresses',
      title: 'Physical Addresses',
      type: 'array',
      group: 'contact',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Branch Name', type: 'string' },
          { name: 'address', title: 'Address', type: 'string' },
          { name: 'city', title: 'City', type: 'string' },
        ],
        preview: {
          select: { title: 'name', subtitle: 'address' },
        },
      }],
    }),

    // ==================== CONTACT FORM ====================
    defineField({
      name: 'form',
      title: 'Contact Form Settings',
      type: 'object',
      group: 'form',
      fields: [
        { name: 'enabled', title: 'Show Contact Form', type: 'boolean', initialValue: true },
        { name: 'nameLabel', title: 'Name Field Label', type: 'string', initialValue: 'Name*' },
        { name: 'emailLabel', title: 'Email Field Label', type: 'string', initialValue: 'Email*' },
        { name: 'subjectLabel', title: 'Subject Field Label', type: 'string', initialValue: 'Subject*' },
        { name: 'messageLabel', title: 'Message Field Label', type: 'string', initialValue: 'Your Message*' },
        { name: 'submitText', title: 'Submit Button Text', type: 'string', initialValue: 'Send Message' },
      ],
    }),

    // ==================== MAP LOCATIONS ====================
    defineField({
      name: 'mapLocations',
      title: 'Map Locations',
      type: 'array',
      group: 'maps',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Location Title', type: 'string' },
          { name: 'embedUrl', title: 'Google Maps Embed URL', type: 'url', description: 'Get embed URL from Google Maps' },
          { 
            name: 'titleColor', 
            title: 'Title Color', 
            type: 'string',
            options: {
              list: [
                { title: 'Brand Blue', value: 'text-school-brand' },
                { title: 'Pink', value: 'text-school-pink' },
              ],
            },
          },
        ],
        preview: {
          select: { title: 'title' },
        },
      }],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Page',
        subtitle: 'Contact information and form settings',
      };
    },
  },
});



