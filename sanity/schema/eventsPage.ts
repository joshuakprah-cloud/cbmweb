import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'eventsPage',
  title: 'Events Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heroTagline',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'seo',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          type: 'string',
        }),
        defineField({
          name: 'metaDescription',
          type: 'text',
        }),
        defineField({
          name: 'ogImage',
          type: 'image',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heroTitle',
    },
  },
});
