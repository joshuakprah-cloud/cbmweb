import {defineField, defineType} from 'sanity'
import {seoType} from './objects/seo'

export const themePageType = defineType({
  name: 'themePage',
  title: 'Theme Page',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      type: 'string',
      title: 'Year',
    }),
    defineField({
      name: 'themeTitle',
      type: 'string',
      title: 'Theme Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'themeSubtitle',
      type: 'text',
      title: 'Theme Subtitle',
    }),
    defineField({
      name: 'scriptureReference',
      type: 'string',
      title: 'Scripture Reference',
    }),
    defineField({
      name: 'scriptureText',
      type: 'text',
      title: 'Scripture Text',
    }),
    defineField({
      name: 'pillars',
      type: 'array',
      title: 'Theme Pillars',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'number',
              type: 'string',
              title: 'Number',
            }),
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
    select: {
      title: 'themeTitle',
      year: 'year',
    },
    prepare(selection) {
      const {title, year} = selection
      return {
        title: title || 'Theme Page',
        subtitle: year ? `Theme for ${year}` : 'Annual theme',
      }
    },
  },
})
