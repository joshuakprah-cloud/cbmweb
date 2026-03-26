import {defineField, defineType} from 'sanity'

export const beliefItemType = defineType({
  name: 'beliefItem',
  title: 'Belief Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'text',
      title: 'Body',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Order',
    }),
    defineField({
      name: 'isActive',
      type: 'boolean',
      title: 'Active',
      description: 'Show on website',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: title || 'Untitled Belief',
      }
    },
  },
})
