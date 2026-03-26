import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'eventRegistration',
  title: 'Event Registration',
  type: 'document',
  fields: [
    defineField({
      name: 'event',
      type: 'reference',
      to: [{ type: 'event' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'fullName',
      type: 'string',
      validation: Rule => Rule.required().min(2),
    }),
    defineField({
      name: 'email',
      type: 'string',
      validation: Rule => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      type: 'string',
    }),
    defineField({
      name: 'numberOfAttendees',
      type: 'number',
      initialValue: 1,
      validation: Rule => Rule.required().min(1).max(10),
    }),
    defineField({
      name: 'message',
      type: 'text',
    }),
    defineField({
      name: 'registeredAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      initialValue: 'pending',
    }),
  ],
  preview: {
    select: {
      fullName: 'fullName',
      event: 'event.title',
      status: 'status',
    },
    prepare({ fullName, event, status }) {
      return {
        title: fullName,
        subtitle: `${event} • ${status}`,
      };
    },
  },
});
