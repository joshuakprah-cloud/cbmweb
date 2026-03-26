import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'ministry',
  title: 'Ministry',
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
      name: 'label',
      type: 'string',
      validation: Rule => Rule.required().min(2).max(10),
    }),
    defineField({
      name: 'tagline',
      type: 'string',
      validation: Rule => Rule.required().max(100),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      type: 'portableText',
    }),
    defineField({
      name: 'heroImage',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'color',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'meetingDay',
      type: 'string',
    }),
    defineField({
      name: 'meetingTime',
      type: 'string',
    }),
    defineField({
      name: 'ageRange',
      type: 'string',
    }),
    defineField({
      name: 'order',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    }),
    defineField({
      name: 'isPublished',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'stats',
      type: 'array',
      of: [
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
    }),
    defineField({
      name: 'expectations',
      type: 'array',
      of: [
        defineField({
          name: 'title',
          type: 'string',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'description',
          type: 'text',
          validation: Rule => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'leaders',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'leader' }] }],
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      of: [
        defineField({
          name: 'image',
          type: 'image',
          options: { hotspot: true },
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'caption',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'events',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'event' }] }],
    }),
    defineField({
      name: 'relatedMinistries',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'ministry' }] }],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tagline',
      published: 'isPublished',
    },
    prepare({ title, subtitle, published }) {
      return {
        title,
        subtitle: `${subtitle} ${published ? '✓' : '○'}`,
      };
    },
  },
});
