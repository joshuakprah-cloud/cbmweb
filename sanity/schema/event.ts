import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  orderings: [
    {
      title: 'Date (Ascending)',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }]
    },
    {
      title: 'Date (Descending)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }]
    }
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'date',
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      type: 'datetime',
    }),
    defineField({
      name: 'location',
      type: 'string',
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      validation: Rule => Rule.required().max(200),
    }),
    defineField({
      name: 'body',
      type: 'portableText',
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: [
          { title: 'Sunday Services', value: 'Sunday Services' },
          { title: 'Youth Events', value: 'Youth Events' },
          { title: 'Conferences', value: 'Conferences' },
          { title: 'Outreach', value: 'Outreach' },
          { title: 'Special Services', value: 'Special Services' },
          { title: 'General', value: 'General' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isPublished',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isPast',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isFree',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'ticketPrice',
      type: 'string',
    }),
    defineField({
      name: 'ticketLink',
      type: 'url',
    }),
    defineField({
      name: 'requiresRegistration',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'capacity',
      type: 'number',
      validation: Rule => Rule.min(1),
    }),
    defineField({
      name: 'registrationDeadline',
      type: 'datetime',
    }),
    defineField({
      name: 'speakers',
      type: 'array',
      of: [
        defineField({
          name: 'name',
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
      ],
    }),
    defineField({
      name: 'schedule',
      type: 'array',
      of: [
        defineField({
          name: 'time',
          type: 'string',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'activity',
          type: 'string',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'description',
          type: 'text',
        }),
      ],
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
      name: 'relatedEvents',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'event' }] }],
    }),
    defineField({
      name: 'recapUrl',
      type: 'url',
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
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
      title: 'title',
      date: 'date',
      category: 'category',
      featured: 'isFeatured',
    },
    prepare({ title, date, category, featured }) {
      return {
        title,
        subtitle: `${new Date(date).toLocaleDateString()} • ${category} ${featured ? '⭐' : ''}`,
      };
    },
  },
});
