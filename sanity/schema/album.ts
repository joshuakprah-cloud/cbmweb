import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'album',
  title: 'Album',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required().min(3).max(50),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'eventDate',
      type: 'date',
    }),
    defineField({
      name: 'isPublished',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      eventDate: 'eventDate',
      media: 'coverImage',
    },
  },
});
