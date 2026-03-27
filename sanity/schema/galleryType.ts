import { defineType, defineField } from 'sanity'

export const galleryType = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Gallery Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Gallery Description',
      type: 'text'
    }),
    defineField({
      name: 'coverImage',
      title: 'Gallery Cover Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'category',
      title: 'Gallery Category',
      type: 'string',
      options: {
        list: [
          { title: 'Events', value: 'events' },
          { title: 'Services', value: 'services' },
          { title: 'Community', value: 'community' },
          { title: 'Outreach', value: 'outreach' },
          { title: 'Youth', value: 'youth' },
          { title: 'Children', value: 'children' },
          { title: 'Worship', value: 'worship' },
          { title: 'Facilities', value: 'facilities' },
          { title: 'Other', value: 'other' }
        ]
      }
    }),
    defineField({
      name: 'event',
      title: 'Related Event',
      type: 'reference',
      to: [{ type: 'event' }]
    }),
    defineField({
      name: 'date',
      title: 'Gallery Date',
      type: 'date'
    }),
    defineField({
      name: 'photographer',
      title: 'Photographer',
      type: 'string'
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'galleryImage',
          title: 'Gallery Image',
          fields: [
            defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'caption', title: 'Image Caption', type: 'text' }),
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
            defineField({ name: 'order', title: 'Display Order', type: 'number' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'isPrivate',
      title: 'Private Gallery',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'password',
      title: 'Gallery Password',
      type: 'string',
      hidden: ({ document }) => {
        return !document || !('isPrivate' in document) || !document.isPrivate
      }
    }),
    defineField({
      name: 'allowDownloads',
      title: 'Allow Downloads',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime'
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage'
    }
  }
})
