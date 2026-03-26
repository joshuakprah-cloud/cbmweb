import {defineField, defineType} from 'sanity'

export const testimonyType = defineType({
  name: 'testimony',
  title: 'Testimony',
  type: 'document',
  fields: [
    defineField({
      name: 'memberName',
      type: 'string',
      title: 'Member Name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      type: 'string',
      title: 'Role/Title',
    }),
    defineField({
      name: 'quote',
      type: 'text',
      title: 'Testimony Quote',
      rows: 3,
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: 'photo',
      type: 'image',
      title: 'Member Photo',
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
      name: 'isActive',
      type: 'boolean',
      title: 'Active',
      description: 'Uncheck to hide this testimony from the website',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'memberName',
      subtitle: 'role',
      media: 'photo',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title || 'Untitled Testimony',
        subtitle: subtitle || 'No role specified',
      }
    },
  },
})
