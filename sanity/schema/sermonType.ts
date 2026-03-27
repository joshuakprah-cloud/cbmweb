import { defineType, defineField } from 'sanity'

export const sermonType = defineType({
  name: 'sermon',
  title: 'Sermon',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Sermon Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'speaker',
      title: 'Speaker',
      type: 'reference',
      to: [{ type: 'preacher' }],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'date',
      title: 'Sermon Date',
      type: 'date',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'series',
      title: 'Sermon Series',
      type: 'reference',
      to: [{ type: 'sermonSeries' }]
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'scriptureReference',
      title: 'Scripture Reference',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'audioFile',
      title: 'Audio File',
      type: 'file',
      options: {
        accept: 'audio/*'
      }
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url'
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'Format: MM:SS or HH:MM:SS'
    }),
    defineField({
      name: 'transcript',
      title: 'Transcript',
      type: 'array',
      of: [{ type: 'block' }]
    }),
    defineField({
      name: 'topics',
      title: 'Topics/Tags',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Sermon',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'speaker.name',
      media: 'coverImage'
    }
  }
})
