import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required().min(2).max(50),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'name' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'role',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'bio',
      type: 'text',
    }),
    defineField({
      name: 'photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'isActive',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      name: 'name',
      role: 'role',
    },
  },
});
