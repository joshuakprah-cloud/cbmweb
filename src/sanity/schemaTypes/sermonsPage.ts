import {defineField, defineType} from 'sanity'
import {seoType} from './objects/seo'

export const sermonsPageType = defineType({
  name: 'sermonsPage',
  title: 'Sermons Page',
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
      name: 'heroImage',
      type: 'image',
      title: 'Hero Image',
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
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      description: 'SEO settings for this page',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Sermons Page',
        subtitle: 'Main sermons page content',
      }
    },
  },
})
