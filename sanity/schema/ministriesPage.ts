import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'ministriesPage',
  title: 'Ministries Page',
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
      name: 'stats',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'stat',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'value',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'closingCtaTitle',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'closingCtaSubtitle',
      type: 'text',
      validation: Rule => Rule.required(),
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
