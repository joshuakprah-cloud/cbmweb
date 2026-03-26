import {defineField, defineType} from 'sanity'
import {seoType} from './objects/seo'

export const overviewPageType = defineType({
  name: 'overviewPage',
  title: 'Overview Page',
  type: 'document',
  fields: [
    defineField({
      name: 'featuredImage',
      type: 'image',
      title: 'Featured Image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ]
    }),
    defineField({
      name: 'coreValues',
      type: 'array',
      title: 'Core Values',
      of: [
        {
          type: 'reference',
          to: [{ type: 'coreValue' }],
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
        title: 'Overview Page',
        subtitle: 'Church overview and values',
      }
    },
  },
})
