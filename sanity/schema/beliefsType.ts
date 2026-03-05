import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'beliefsPage',
  title: 'Beliefs Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string'
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text'
    }),
    defineField({
      name: 'intro',
      title: 'Intro Text',
      type: 'text'
    }),
    defineField({
      name: 'beliefs',
      title: 'Beliefs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Belief Title',
              type: 'string'
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'text'
            })
          ]
        }
      ]
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    })
  ]
})
