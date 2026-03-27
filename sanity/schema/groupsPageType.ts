import { defineType, defineField } from 'sanity'

export const groupsPageType = defineType({
  name: 'groupsPage',
  title: 'Groups Page',
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
      name: 'groupTypes',
      title: 'Group Types',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'groupType',
          title: 'Group Type',
          fields: [
            defineField({ name: 'title', title: 'Type Title', type: 'string', validation: Rule => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', validation: Rule => Rule.required() }),
            defineField({ name: 'icon', title: 'Icon (Emoji)', type: 'string' }),
            defineField({ name: 'color', title: 'Color', type: 'string', description: 'Hex color code' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'howToJoin',
      title: 'How to Join Section',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Section Title', type: 'string', initialValue: 'How to Join a Group' }),
        defineField({ name: 'description', title: 'Section Description', type: 'text' }),
        defineField({
          name: 'steps',
          title: 'Steps',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'step',
              title: 'Step',
              fields: [
                defineField({ name: 'stepNumber', title: 'Step Number', type: 'number' }),
                defineField({ name: 'title', title: 'Step Title', type: 'string' }),
                defineField({ name: 'description', title: 'Description', type: 'text' }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'leadershipInfo',
      title: 'Leadership Information',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Section Title', type: 'string', initialValue: 'Become a Group Leader' }),
        defineField({ name: 'description', title: 'Section Description', type: 'text' }),
        defineField({ name: 'linkText', title: 'Link Text', type: 'string' }),
        defineField({ name: 'linkUrl', title: 'Link URL', type: 'string' }),
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
        title: 'Groups Page',
      }
    }
  }
})
