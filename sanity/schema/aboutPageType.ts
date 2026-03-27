import { defineType, defineField } from 'sanity'

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'About Page',
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
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'section',
          title: 'Section',
          fields: [
            defineField({ name: 'title', title: 'Section Title', type: 'string' }),
            defineField({ name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] }),
            defineField({ name: 'image', title: 'Section Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'layout', title: 'Layout', type: 'string', 
              options: {
                list: [
                  { title: 'Image Left', value: 'imageLeft' },
                  { title: 'Image Right', value: 'imageRight' },
                  { title: 'Full Width', value: 'fullWidth' }
                ]
              }
            }),
          ],
        },
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
        title: 'About Page',
      }
    }
  }
})
