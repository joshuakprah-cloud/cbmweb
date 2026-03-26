import {defineField, defineType} from 'sanity'
import {seoType} from './objects/seo'

export const connectedPageType = defineType({
  name: 'connectedPage',
  title: 'Connected Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      type: 'string',
      title: 'Hero Title',
    }),
    defineField({
      name: 'heroSubtitle',
      type: 'text',
      title: 'Hero Subtitle',
    }),
    defineField({
      name: 'pathways',
      type: 'array',
      title: 'Connection Pathways',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Title',
            }),
            defineField({
              name: 'description',
              type: 'text',
              title: 'Description',
            }),
            defineField({
              name: 'ctaLabel',
              type: 'string',
              title: 'CTA Label',
            }),
            defineField({
              name: 'ctaLink',
              type: 'url',
              title: 'CTA Link',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      description: 'SEO settings for this page',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Connected Page',
        subtitle: 'Get connected pathways',
      }
    },
  },
})
