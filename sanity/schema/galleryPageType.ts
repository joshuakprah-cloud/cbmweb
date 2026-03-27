import { defineType, defineField } from 'sanity'

export const galleryPageType = defineType({
  name: 'galleryPage',
  title: 'Gallery Page',
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
      name: 'galleriesTitle',
      title: 'Galleries Section Title',
      type: 'string',
      initialValue: 'Photo Galleries'
    }),
    defineField({
      name: 'featuredGallery',
      title: 'Featured Gallery',
      type: 'reference',
      to: [{ type: 'gallery' }]
    }),
    defineField({
      name: 'itemsPerPage',
      title: 'Gallery Items Per Page',
      type: 'number',
      initialValue: 12
    }),
    defineField({
      name: 'enableDownload',
      title: 'Enable Image Download',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'enableSharing',
      title: 'Enable Social Sharing',
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
        title: 'Gallery Page',
      }
    }
  }
})
