import { defineType, defineField } from 'sanity'

export const notFoundPageType = defineType({
  name: 'notFoundPage',
  title: '404 Not Found Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Page Not Found'
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      initialValue: 'Oops! Page Not Found'
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      initialValue: 'The page you\'re looking for doesn\'t exist or has been moved.'
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'actions',
      title: 'Action Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'action',
          title: 'Action',
          fields: [
            defineField({ name: 'text', title: 'Button Text', type: 'string' }),
            defineField({ name: 'url', title: 'Button URL', type: 'string' }),
            defineField({ name: 'isPrimary', title: 'Primary Button', type: 'boolean', initialValue: false }),
          ],
        },
      ],
    }),
    defineField({
      name: 'searchEnabled',
      title: 'Enable Search',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'searchPlaceholder',
      title: 'Search Placeholder',
      type: 'string',
      initialValue: 'Search for what you\'re looking for...'
    }),
    defineField({
      name: 'helpfulLinks',
      title: 'Helpful Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'link',
          title: 'Link',
          fields: [
            defineField({ name: 'title', title: 'Link Title', type: 'string' }),
            defineField({ name: 'url', title: 'Link URL', type: 'string' }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: '404 Page',
      }
    }
  }
})
