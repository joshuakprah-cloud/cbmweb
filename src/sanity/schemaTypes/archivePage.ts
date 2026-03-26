import {defineField, defineType} from 'sanity'
import {seoType} from './objects/seo'

export const archivePageType = defineType({
  name: 'archivePage',
  title: 'Archive Page',
  type: 'document',
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
      name: 'contactEmail',
      type: 'string',
      title: 'Contact Email',
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
        title: 'Archive Page',
        subtitle: 'Sermons archive page content',
      }
    },
  },
})
