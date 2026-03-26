import {defineField, defineType} from 'sanity'

export const coreValueType = defineType({
  name: 'coreValue',
  title: 'Core Value',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      title: 'Label',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'icon',
      type: 'string',
      title: 'Icon',
      description: 'Emoji or icon identifier',
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Order',
    }),
  ],
  preview: {
    select: {
      title: 'label',
      icon: 'icon',
    },
    prepare(selection) {
      const {title, icon} = selection
      return {
        title: `${icon || '📋'} ${title || 'Untitled Value'}`,
      }
    },
  },
})
