import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'newsletterSubscriber',
  title: 'Newsletter Subscriber',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      type: 'string',
      validation: Rule => Rule.required().email(),
    }),
    defineField({
      name: 'subscribedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'preferences',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Events', value: 'Events' },
          { title: 'Sermons', value: 'Sermons' },
          { title: 'Announcements', value: 'Announcements' },
        ],
      },
      initialValue: ['Events'],
    }),
    defineField({
      name: 'isActive',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      email: 'email',
      subscribedAt: 'subscribedAt',
    },
    prepare({ email, subscribedAt }) {
      return {
        title: email,
        subtitle: new Date(subscribedAt).toLocaleDateString(),
      };
    },
  },
});
