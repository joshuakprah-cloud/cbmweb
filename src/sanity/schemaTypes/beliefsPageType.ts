import {defineArrayMember, defineField, defineType} from 'sanity'

export const beliefsPageType = defineType({
  name: 'beliefsPage',
  title: 'Beliefs Page',
  type: 'document',
  fields: [
    defineField({
      name: 'intro',
      title: 'Introduction',
      type: 'text',
    }),
    defineField({
      name: 'beliefs',
      title: 'Beliefs',
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
              type: 'array',
              of: [defineArrayMember({type: 'block'})],
            }),
          ],
        }),
      ],
    }),
  ],
})
