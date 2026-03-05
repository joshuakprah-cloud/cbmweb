import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'leadership',
  title: 'Leadership Page',
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
      title: 'Introduction Text',
      type: 'text'
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }]
    }),
    defineField({
      name: 'leadership',
      title: 'Leadership Team',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string'
            }),
            defineField({
              name: 'role',
              title: 'Role',
              type: 'string'
            }),
            defineField({
              name: 'bio',
              title: 'Bio',
              type: 'text'
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
    }),
    defineField({
      name: 'philosophy',
      title: 'Leadership Philosophy',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
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
    })
  ]
})
