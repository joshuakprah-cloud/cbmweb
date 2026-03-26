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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'speaker',
      title: 'Speaker',
      type: 'reference',
      to: [{type: 'leader'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'scriptureReference',
      title: 'Scripture Reference',
      type: 'string',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g. "45 mins"',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
    }),
    defineField({
      name: 'audioUrl',
      title: 'Audio URL',
      type: 'url',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
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
      name: 'seriesTitle',
      title: 'Series Title',
      type: 'string',
    }),
    defineField({
      name: 'seriesSlug',
      title: 'Series Slug',
      type: 'slug',
      options: {
        source: 'seriesTitle',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'seriesCoverImage',
      title: 'Series Cover Image',
      type: 'image',
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
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  validation: (Rule) => [
    Rule.custom((fields: any) => {
      if (!fields?.videoUrl && !fields?.audioUrl) {
        return 'At least one of video URL or audio URL is required';
      }
      return true;
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'speaker.name',
      date: 'publishedAt',
      media: 'thumbnail',
    },
    prepare(selection) {
      const {title, subtitle, date} = selection
      return {
        title: title || 'Untitled Sermon',
        subtitle: subtitle ? `By ${subtitle}` : 'No speaker',
        date: date ? new Date(date).toLocaleDateString() : 'No date',
      }
    },
  },
})
