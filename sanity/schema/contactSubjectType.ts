import { defineType, defineField } from 'sanity'

export const contactSubjectType = defineType({
  name: 'contactSubject',
  title: 'Contact Subject',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Subject Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Subject Description',
      type: 'text'
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Pastoral Care', value: 'pastoral' },
          { title: 'Prayer', value: 'prayer' },
          { title: 'Events', value: 'events' },
          { title: 'Small Groups', value: 'groups' },
          { title: 'Youth', value: 'youth' },
          { title: 'Children', value: 'children' },
          { title: 'Worship', value: 'worship' },
          { title: 'Technical', value: 'technical' },
          { title: 'Facilities', value: 'facilities' }
        ]
      }
    }),
    defineField({
      name: 'recipientEmail',
      title: 'Recipient Email',
      type: 'email',
      description: 'Email address where inquiries for this subject should be sent'
    }),
    defineField({
      name: 'autoReplyMessage',
      title: 'Auto-Reply Message',
      type: 'text',
      description: 'Message sent automatically when someone submits this contact form'
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number'
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'department'
    }
  }
})
