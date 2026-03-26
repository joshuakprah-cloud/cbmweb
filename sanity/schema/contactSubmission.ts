import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'contactSubmission',
  title: 'Contact Submission',
  type: 'document',
  fields: [
    defineField({
      name: 'fullName',
      type: 'string',
      validation: Rule => Rule.required().min(2),
    }),
    defineField({
      name: 'phone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      type: 'string',
      validation: Rule => Rule.required().email(),
    }),
    defineField({
      name: 'subject',
      type: 'string',
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
          { title: 'Read', value: 'read' },
          { title: 'Replied', value: 'replied' },
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'isSpam',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      fullName: 'fullName',
      subject: 'subject',
      status: 'status',
    },
    prepare({ fullName, subject, status }) {
      return {
        title: fullName,
        subtitle: `${subject || 'No subject'} • ${status}`,
      };
    },
  },
});
