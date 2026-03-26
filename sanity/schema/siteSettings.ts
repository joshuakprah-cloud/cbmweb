import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'churchName',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'churchAddress',
      type: 'text',
    }),
    defineField({
      name: 'churchPhone',
      type: 'string',
    }),
    defineField({
      name: 'churchEmail',
      type: 'string',
      validation: Rule => Rule.email(),
    }),
    defineField({
      name: 'serviceTimes',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'serviceTime',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'day',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'timeRange',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'location',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'socialMedia',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialMediaItem',
          fields: [
            defineField({
              name: 'platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'YouTube', value: 'youtube' },
                ],
              },
            }),
            defineField({
              name: 'url',
              type: 'url',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'navbar',
      type: 'object',
      fields: [
        defineField({
          name: 'watchLiveUrl',
          type: 'url',
        }),
        defineField({
          name: 'watchLiveLabel',
          type: 'string',
          initialValue: 'Watch Live',
        }),
        defineField({
          name: 'giveUrl',
          type: 'url',
        }),
        defineField({
          name: 'giveLabel',
          type: 'string',
          initialValue: 'Give',
        }),
        defineField({
          name: 'planYourVisitLabel',
          type: 'string',
          initialValue: 'Plan Your Visit',
        }),
        defineField({
          name: 'announcementBar',
          type: 'object',
          fields: [
            defineField({
              name: 'isActive',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'message',
              type: 'string',
            }),
            defineField({
              name: 'linkLabel',
              type: 'string',
            }),
            defineField({
              name: 'linkUrl',
              type: 'url',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'churchName',
    },
  },
});
