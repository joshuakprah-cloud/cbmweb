import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'leader',
  title: 'Leader',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required().min(2).max(50),
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
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
});
