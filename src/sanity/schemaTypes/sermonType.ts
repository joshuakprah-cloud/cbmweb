import {defineField, defineType} from 'sanity'

export const sermonType = defineType({
  name: 'sermon',
  title: 'Sermon',
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
      },
    }),
    defineField({
      name: 'preacher',
      title: 'Preacher',
      type: 'reference',
      to: {type: 'preacher'},
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'string',
    }),
    defineField({
      name: 'audioUrl',
      title: 'Audio URL',
      type: 'string',
    }),
    defineField({
      name: 'series',
      title: 'Series',
      type: 'string',
    }),
    defineField({
      name: 'scripture',
      title: 'Scripture',
      type: 'string',
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'branch',
      title: 'Branch',
      type: 'string',
    }),
  ],
})
