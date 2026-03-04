import { defineType, defineField } from 'sanity'

export const givingType = defineType({
  name: 'givingType',
  title: 'Giving Type',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'suggestedAmounts',
      title: 'Suggested Amounts',
      type: 'array',
      of: [{ type: 'number' }],
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'branch',
      title: 'Branch',
      type: 'string',
    }),
  ],
})
