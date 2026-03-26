import {defineField, defineType} from 'sanity'
import {seoType} from './objects/seo'

export const beliefsPageType = defineType({
  name: 'beliefsPage',
  title: 'Beliefs Page',
  type: 'document',
  fields: [
    defineField({
      name: 'introText',
      type: 'portableText',
      title: 'Introduction Text',
    }),
    defineField({
      name: 'beliefs',
      type: 'array',
      title: 'Beliefs',
      of: [
        {
          type: 'reference',
          to: [{ type: 'beliefItem' }],
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
        title: 'Beliefs Page',
        subtitle: 'What we believe',
      }
    },
  },
})
