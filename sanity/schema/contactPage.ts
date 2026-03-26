import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
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
      name: 'address',
      type: 'text',
    }),
    defineField({
      name: 'phone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      type: 'string',
    }),
    defineField({
      name: 'officeHours',
      type: 'array',
      of: [
        defineField({
          name: 'days',
          type: 'string',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'hours',
          type: 'string',
          validation: Rule => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      type: 'array',
      of: [
        defineField({
          name: 'platform',
          type: 'string',
          options: {
            list: [
              { title: 'Facebook', value: 'Facebook' },
              { title: 'Twitter', value: 'Twitter' },
              { title: 'YouTube', value: 'YouTube' },
              { title: 'Instagram', value: 'Instagram' },
            ],
          },
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'url',
          type: 'url',
          validation: Rule => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'scriptureReference',
      type: 'string',
    }),
    defineField({
      name: 'scriptureText',
      type: 'text',
    }),
    defineField({
      name: 'closingCtaTitle',
      type: 'string',
    }),
    defineField({
      name: 'closingCtaSubtitle',
      type: 'text',
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
