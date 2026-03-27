import { defineType, defineField } from 'sanity'

export const blogPageType = defineType({
  name: 'blogPage',
  title: 'Blog Page',
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
      name: 'featuredPostsTitle',
      title: 'Featured Posts Section Title',
      type: 'string',
      initialValue: 'Featured Posts'
    }),
    defineField({
      name: 'recentPostsTitle',
      title: 'Recent Posts Section Title',
      type: 'string',
      initialValue: 'Recent Posts'
    }),
    defineField({
      name: 'categoriesTitle',
      title: 'Categories Section Title',
      type: 'string',
      initialValue: 'Categories'
    }),
    defineField({
      name: 'postsPerPage',
      title: 'Posts Per Page',
      type: 'number',
      initialValue: 12
    }),
    defineField({
      name: 'showAuthorInfo',
      title: 'Show Author Information',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'showPublishDate',
      title: 'Show Publish Date',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'showReadingTime',
      title: 'Show Reading Time',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'enableComments',
      title: 'Enable Comments',
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
        title: 'Blog Page',
      }
    }
  }
})
