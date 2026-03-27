import { defineType, defineField } from 'sanity'

export const podcastPageType = defineType({
  name: 'podcastPage',
  title: 'Podcast Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text'
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'podcastTitle',
      title: 'Podcast Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'podcastDescription',
      title: 'Podcast Description',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'podcastCover',
      title: 'Podcast Cover Art',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'itunesUrl',
      title: 'Apple Podcasts URL',
      type: 'url'
    }),
    defineField({
      name: 'spotifyUrl',
      title: 'Spotify URL',
      type: 'url'
    }),
    defineField({
      name: 'googlePlayUrl',
      title: 'Google Play URL',
      type: 'url'
    }),
    defineField({
      name: 'rssFeedUrl',
      title: 'RSS Feed URL',
      type: 'url'
    }),
    defineField({
      name: 'episodesTitle',
      title: 'Episodes Section Title',
      type: 'string',
      initialValue: 'Recent Episodes'
    }),
    defineField({
      name: 'episodesPerPage',
      title: 'Episodes Per Page',
      type: 'number',
      initialValue: 10
    }),
    defineField({
      name: 'showTranscripts',
      title: 'Show Episode Transcripts',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'enableDownloads',
      title: 'Enable Episode Downloads',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string' }),
        defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text' }),
        defineField({ name: 'ogImage', title: 'Open Graph Image', type: 'image' }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Podcast Page',
      }
    }
  }
})
