import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'ministryForm',
  title: 'Ministry Form',
  type: 'document',
  fields: [
    defineField({
      name: 'ministry',
      type: 'reference',
      to: [{ type: 'ministry' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'fullName',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'email',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'phone',
      type: 'string',
    }),
    defineField({
      name: 'ageGroup',
      type: 'string',
    }),
    defineField({
      name: 'message',
      type: 'text',
    }),
    defineField({
      name: 'submittedAt',
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'fullName',
      ministry: 'ministry.name',
      submittedAt: 'submittedAt',
    },
    prepare({ title, ministry, submittedAt }) {
      return {
        title: `${title} - ${ministry}`,
        subtitle: new Date(submittedAt).toLocaleDateString(),
      };
    },
  },
});
