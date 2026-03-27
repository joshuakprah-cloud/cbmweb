import { defineType, defineField } from 'sanity'

export const testimonyType = defineType({
  name: 'testimony',
  title: 'Testimony',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Testimony Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'personName',
      title: 'Person Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'content',
      title: 'Testimony Content',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Testimony Category',
      type: 'string',
      options: {
        list: [
          { title: 'Salvation', value: 'salvation' },
          { title: 'Healing', value: 'healing' },
          { title: 'Family', value: 'family' },
          { title: 'Career', value: 'career' },
          { title: 'Provision', value: 'provision' },
          { title: 'Breakthrough', value: 'breakthrough' },
          { title: 'Restoration', value: 'restoration' },
          { title: 'Other', value: 'other' }
        ]
      }
    }),
    defineField({
      name: 'photo',
      title: 'Person Photo',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video Testimony URL',
      type: 'url'
    }),
    defineField({
      name: 'audioUrl',
      title: 'Audio Testimony URL',
      type: 'url'
    }),
    defineField({
      name: 'date',
      title: 'Testimony Date',
      type: 'date',
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Testimony',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'isApproved',
      title: 'Approved for Display',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({ name: 'email', title: 'Email', type: 'email' }),
        defineField({ name: 'phone', title: 'Phone', type: 'string' }),
      ],
    }),
    defineField({
      name: 'allowContact',
      title: 'Allow Others to Contact',
      type: 'boolean',
      initialValue: false
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'personName',
      media: 'photo'
    }
  }
})
