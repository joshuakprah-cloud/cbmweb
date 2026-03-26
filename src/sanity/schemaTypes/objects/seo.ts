import {defineField, defineType} from 'sanity'

export const seoType = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      type: 'string',
      title: 'Meta Title',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'metaDescription',
      type: 'text',
      title: 'Meta Description',
      rows: 3,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'ogImage',
      type: 'image',
      title: 'Open Graph Image',
      description: 'Image shown when sharing on social media',
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
      name: 'noIndex',
      type: 'boolean',
      title: 'No Index',
      description: 'Prevent search engines from indexing this page',
      initialValue: false,
    }),
  ],
})
