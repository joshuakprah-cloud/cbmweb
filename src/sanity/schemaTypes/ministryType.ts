import { defineType, defineField } from 'sanity'

export const ministryType = defineType({
  name: 'ministry',
  title: 'Ministry',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'leaderName',
      title: 'Leader Name',
      type: 'string',
    }),
    defineField({
      name: 'leaderPhoto',
      title: 'Leader Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'meetingDay',
      title: 'Meeting Day',
      type: 'string',
    }),
    defineField({
      name: 'meetingTime',
      title: 'Meeting Time',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'branch',
      title: 'Branch',
      type: 'string',
    }),
  ],
})
