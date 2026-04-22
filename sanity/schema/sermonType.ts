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
      name: 'preacher',
      title: 'Preacher/Speaker',
      type: 'reference',
      to: [{ type: 'preacher' }],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'publishedAt',
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
      name: 'thumbnail',
      title: 'Cover Image/Thumbnail',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'videoSource',
      title: 'Video Source',
      type: 'string',
      options: {
        list: [
          { title: 'YouTube', value: 'youtube' },
          { title: 'Upload Video File', value: 'upload' },
          { title: 'External URL', value: 'external' }
        ],
        layout: 'radio'
      },
      initialValue: 'youtube'
    }),
    defineField({
      name: 'videoUrl',
      title: 'YouTube URL',
      type: 'url',
      description: 'Full YouTube video URL (e.g., https://youtube.com/watch?v=...)',
      hidden: ({ document }) => document?.videoSource !== 'youtube'
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      description: 'Upload MP4, MOV, or WebM video file directly',
      options: {
        accept: 'video/*'
      },
      hidden: ({ document }) => document?.videoSource !== 'upload'
    }),
    defineField({
      name: 'externalVideoUrl',
      title: 'External Video URL',
      type: 'url',
      description: 'Vimeo, Facebook, or other video platform URL',
      hidden: ({ document }) => document?.videoSource !== 'external'
    }),
    defineField({
      name: 'audioFile',
      title: 'Audio File (Optional)',
      type: 'file',
      description: 'Optional audio-only version for download/podcast',
      options: {
        accept: 'audio/*'
      }
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
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
      description: 'Make this sermon visible on the website'
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
      subtitle: 'preacher.name',
      media: 'thumbnail'
    }
  }
})
