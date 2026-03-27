import { defineType, defineField } from 'sanity'

export const serviceTimesType = defineType({
  name: 'serviceTimes',
  title: 'Service Times',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Service Times'
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text'
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'service',
          title: 'Service',
          fields: [
            defineField({ name: 'day', title: 'Day', type: 'string', validation: Rule => Rule.required() }),
            defineField({ name: 'time', title: 'Time', type: 'string', validation: Rule => Rule.required() }),
            defineField({ name: 'serviceType', title: 'Service Type', type: 'string', validation: Rule => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
            defineField({ name: 'location', title: 'Location', type: 'string' }),
            defineField({ name: 'campus', title: 'Campus', type: 'reference', to: [{ type: 'campus' }] }),
            defineField({ name: 'isMainService', title: 'Main Service', type: 'boolean', initialValue: false }),
            defineField({ name: 'order', title: 'Display Order', type: 'number' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'specialServices',
      title: 'Special Services',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'specialService',
          title: 'Special Service',
          fields: [
            defineField({ name: 'title', title: 'Service Title', type: 'string' }),
            defineField({ name: 'date', title: 'Date', type: 'date' }),
            defineField({ name: 'time', title: 'Time', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
            defineField({ name: 'isRecurring', title: 'Recurring Service', type: 'boolean' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'additionalInfo',
      title: 'Additional Information',
      type: 'text',
      description: 'Any additional information about service times (e.g., holiday schedules, special events)'
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Service Times',
      }
    }
  }
})
