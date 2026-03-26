import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'photo',
  title: 'Photo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required().min(3).max(100),
    }),
    defineField({
      name: 'image',
      type: 'image',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'caption',
      type: 'text',
    }),
    defineField({
      name: 'event',
      type: 'string',
    }),
    defineField({
      name: 'dateTaken',
      type: 'date',
    }),
    defineField({
      name: 'album',
      type: 'reference',
      to: [{ type: 'album' }],
    }),
    defineField({
      name: 'isPublished',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      event: 'event',
      media: 'image',
    },
  },
});
