import { defineType, defineField } from 'sanity'

export const connectPageType = defineType({
  name: 'connectPage',
  title: 'Connect Page',
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
      name: 'connectOptions',
      title: 'Connect Options',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'connectOption',
          title: 'Connect Option',
          fields: [
            defineField({ name: 'title', title: 'Option Title', type: 'string', validation: Rule => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', validation: Rule => Rule.required() }),
            defineField({ name: 'icon', title: 'Icon (Emoji)', type: 'string' }),
            defineField({ name: 'linkText', title: 'Link Text', type: 'string' }),
            defineField({ name: 'linkUrl', title: 'Link URL', type: 'string' }),
            defineField({ name: 'image', title: 'Option Image', type: 'image', options: { hotspot: true } }),
          ],
        },
      ],
    }),
    defineField({
      name: 'smallGroupsSection',
      title: 'Small Groups Section',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Section Title', type: 'string', initialValue: 'Join a Small Group' }),
        defineField({ name: 'description', title: 'Section Description', type: 'text' }),
        defineField({ name: 'linkText', title: 'Link Text', type: 'string', initialValue: 'View All Groups' }),
        defineField({ name: 'linkUrl', title: 'Link URL', type: 'string' }),
      ],
    }),
    defineField({
      name: 'prayerSection',
      title: 'Prayer Section',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Section Title', type: 'string', initialValue: 'Prayer Requests' }),
        defineField({ name: 'description', title: 'Section Description', type: 'text' }),
        defineField({ name: 'linkText', title: 'Link Text', type: 'string', initialValue: 'Submit Prayer Request' }),
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
        title: 'Connect Page',
      }
    }
  }
})
