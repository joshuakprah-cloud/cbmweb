import { defineType, defineField } from 'sanity'

export const footerType = defineType({
  name: 'footerContent',
  title: 'Footer Content',
  type: 'document',
  fields: [
    defineField({
      name: 'copyright',
      title: 'Copyright Text',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'churchName',
      title: 'Church Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({ name: 'phone', title: 'Phone', type: 'string' }),
        defineField({ name: 'email', title: 'Email', type: 'email' }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          title: 'Social Link',
          fields: [
            defineField({ name: 'platform', title: 'Platform', type: 'string' }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
            defineField({ name: 'icon', title: 'Icon (Emoji)', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'quickLinks',
      title: 'Quick Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'quickLink',
          title: 'Quick Link',
          fields: [
            defineField({ name: 'title', title: 'Link Title', type: 'string' }),
            defineField({ name: 'url', title: 'Link URL', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'serviceTimes',
      title: 'Service Times',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'serviceTime',
          title: 'Service Time',
          fields: [
            defineField({ name: 'day', title: 'Day', type: 'string' }),
            defineField({ name: 'time', title: 'Time', type: 'string' }),
            defineField({ name: 'service', title: 'Service Type', type: 'string' }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer Content',
      }
    }
  }
})
