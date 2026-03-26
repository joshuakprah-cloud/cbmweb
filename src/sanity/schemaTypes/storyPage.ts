import {defineField, defineType} from 'sanity'
import {seoType} from './objects/seo'

export const storyPageType = defineType({
  name: 'storyPage',
  title: 'Story Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'body',
      type: 'portableText',
      title: 'Story Body',
    }),
    defineField({
      name: 'foundingYear',
      type: 'string',
      title: 'Founding Year',
    }),
    defineField({
      name: 'founderName',
      type: 'string',
      title: 'Founder Name',
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
    select: {
      title: 'title',
      founderName: 'founderName',
    },
    prepare(selection) {
      const {title, founderName} = selection
      return {
        title: title || 'Our Story',
        subtitle: founderName ? `Founded by ${founderName}` : 'Church history',
      }
    },
  },
})
