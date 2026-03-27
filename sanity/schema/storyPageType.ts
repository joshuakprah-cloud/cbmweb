import { defineType, defineField } from 'sanity'

export const storyPageType = defineType({
  name: 'storyPage',
  title: 'Story Page',
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
      name: 'storyTimeline',
      title: 'Story Timeline',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'timelineEvent',
          title: 'Timeline Event',
          fields: [
            defineField({ name: 'year', title: 'Year', type: 'string' }),
            defineField({ name: 'title', title: 'Event Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
            defineField({ name: 'image', title: 'Event Image', type: 'image', options: { hotspot: true } }),
          ],
        },
      ],
    }),
    defineField({
      name: 'missionStatement',
      title: 'Mission Statement',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'visionStatement',
      title: 'Vision Statement',
      type: 'text',
      validation: Rule => Rule.required()
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
        title: 'Story Page',
      }
    }
  }
})
