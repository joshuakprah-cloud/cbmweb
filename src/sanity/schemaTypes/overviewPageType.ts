import {defineArrayMember, defineField, defineType} from 'sanity'

export const overviewPageType = defineType({
  name: 'overviewPage',
  title: 'Overview Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'story',
      title: 'Our Story',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'mission',
      title: 'Mission',
      type: 'text',
    }),
    defineField({
      name: 'vision',
      title: 'Vision',
      type: 'text',
    }),
    defineField({
      name: 'coreValues',
      title: 'Core Values',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
          ],
        }),
      ],
    }),
  ],
})
