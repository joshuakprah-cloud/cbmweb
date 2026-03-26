import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'prayerRequest',
  title: 'Prayer Request',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
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
      name: 'requestType',
      type: 'string',
      options: {
        list: [
          { title: 'Public - share with congregation', value: 'public' },
          { title: 'Private - keep confidential', value: 'private' },
        ],
      },
      initialValue: 'private',
    }),
    defineField({
      name: 'needsFollowUp',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'message',
      type: 'text',
      validation: Rule => Rule.required().min(10),
    }),
    defineField({
      name: 'submittedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Praying', value: 'praying' },
          { title: 'Completed', value: 'completed' },
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'isConfidential',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      name: 'name',
      requestType: 'requestType',
      status: 'status',
    },
    prepare({ name, requestType, status }) {
      return {
        title: name,
        subtitle: `${requestType} • ${status}`,
      };
    },
  },
});
