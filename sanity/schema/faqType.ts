import { defineType, defineField } from 'sanity'

export const faqType = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Services', value: 'services' },
          { title: 'Giving', value: 'giving' },
          { title: 'Events', value: 'events' },
          { title: 'Ministries', value: 'ministries' },
          { title: 'New Visitors', value: 'new-visitors' },
          { title: 'Technology', value: 'technology' },
          { title: 'Facilities', value: 'facilities' },
          { title: 'Children', value: 'children' },
          { title: 'Youth', value: 'youth' }
        ]
      }
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Tags for better searchability'
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number'
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured FAQ',
      type: 'boolean',
      initialValue: false,
      description: 'Show this FAQ prominently'
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'relatedPages',
      title: 'Related Pages',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Pages where this FAQ is most relevant'
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category'
    }
  }
})
