import {defineField, defineType} from 'sanity'
import {seoType} from './objects/seo'

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      type: 'string',
      title: 'Hero Title',
    }),
    defineField({
      name: 'heroSubtitle',
      type: 'string',
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
      name: 'historyTitle',
      type: 'string',
      title: 'History Title',
    }),
    defineField({
      name: 'historyBody',
      type: 'portableText',
      title: 'History Body',
    }),
    defineField({
      name: 'missionStatement',
      type: 'text',
      title: 'Mission Statement',
    }),
    defineField({
      name: 'visionStatement',
      type: 'text',
      title: 'Vision Statement',
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
        title: 'About Page',
        subtitle: 'Main about page content',
      }
    },
  },
})
