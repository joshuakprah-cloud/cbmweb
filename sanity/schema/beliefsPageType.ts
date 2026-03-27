import { defineType, defineField } from 'sanity'

export const beliefsPageType = defineType({
  name: 'beliefsPage',
  title: 'Beliefs Page',
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
      name: 'coreBeliefs',
      title: 'Core Beliefs',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'belief',
          title: 'Belief',
          fields: [
            defineField({ name: 'title', title: 'Belief Title', type: 'string', validation: Rule => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', validation: Rule => Rule.required() }),
            defineField({ name: 'scriptureReference', title: 'Scripture Reference', type: 'string' }),
            defineField({ name: 'icon', title: 'Icon (Emoji)', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'statementOfFaith',
      title: 'Statement of Faith',
      type: 'array',
      of: [{ type: 'block' }]
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
        title: 'Beliefs Page',
      }
    }
  }
})
