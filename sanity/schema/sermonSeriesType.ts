import { defineType, defineField } from 'sanity'

export const sermonSeriesType = defineType({
  name: 'sermonSeries',
  title: 'Sermon Series',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Series Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Series Description',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'coverImage',
      title: 'Series Cover Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'startDate',
      title: 'Series Start Date',
      type: 'date'
    }),
    defineField({
      name: 'endDate',
      title: 'Series End Date',
      type: 'date'
    }),
    defineField({
      name: 'speaker',
      title: 'Primary Speaker',
      type: 'reference',
      to: [{ type: 'preacher' }]
    }),
    defineField({
      name: 'sermons',
      title: 'Sermons in Series',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'sermon' }]
        }
      ]
    }),
    defineField({
      name: 'color',
      title: 'Series Color',
      type: 'string',
      description: 'Hex color code for branding'
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Series',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number'
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'coverImage'
    }
  }
})
