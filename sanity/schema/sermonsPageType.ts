import { defineType, defineField } from 'sanity'

export const sermonsPageType = defineType({
  name: 'sermonsPage',
  title: 'Sermons Page',
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
      name: 'latestSermonsTitle',
      title: 'Latest Sermons Section Title',
      type: 'string',
      initialValue: 'Latest Sermons'
    }),
    defineField({
      name: 'sermonSeriesTitle',
      title: 'Sermon Series Section Title',
      type: 'string',
      initialValue: 'Sermon Series'
    }),
    defineField({
      name: 'featuredSeries',
      title: 'Featured Series',
      type: 'reference',
      to: [{ type: 'sermonSeries' }]
    }),
    defineField({
      name: 'filterOptions',
      title: 'Filter Options',
      type: 'object',
      fields: [
        defineField({ 
          name: 'showSpeakers', 
          title: 'Show Speaker Filter', 
          type: 'boolean', 
          initialValue: true 
        }),
        defineField({ 
          name: 'showSeries', 
          title: 'Show Series Filter', 
          type: 'boolean', 
          initialValue: true 
        }),
        defineField({ 
          name: 'showTopics', 
          title: 'Show Topics Filter', 
          type: 'boolean', 
          initialValue: true 
        }),
      ],
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
        title: 'Sermons Page',
      }
    }
  }
})
