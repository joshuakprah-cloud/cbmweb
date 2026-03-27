import { defineType, defineField } from 'sanity'

export const smallGroupType = defineType({
  name: 'smallGroup',
  title: 'Small Group',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Group Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Group Description',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'groupType',
      title: 'Group Type',
      type: 'string',
      options: {
        list: [
          { title: 'Men\'s Group', value: 'mens' },
          { title: 'Women\'s Group', value: 'womens' },
          { title: 'Mixed Group', value: 'mixed' },
          { title: 'Youth Group', value: 'youth' },
          { title: 'Young Adults', value: 'youngAdults' },
          { title: 'Family Group', value: 'family' },
          { title: 'Bible Study', value: 'bibleStudy' },
          { title: 'Support Group', value: 'support' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'leader',
      title: 'Group Leader',
      type: 'reference',
      to: [{ type: 'teamMember' }],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'coLeader',
      title: 'Co-Leader',
      type: 'reference',
      to: [{ type: 'teamMember' }]
    }),
    defineField({
      name: 'meetingSchedule',
      title: 'Meeting Schedule',
      type: 'object',
      fields: [
        defineField({ name: 'dayOfWeek', title: 'Day of Week', type: 'string', validation: Rule => Rule.required() }),
        defineField({ name: 'time', title: 'Time', type: 'string', validation: Rule => Rule.required() }),
        defineField({ name: 'frequency', title: 'Frequency', type: 'string', 
          options: {
            list: [
              { title: 'Weekly', value: 'weekly' },
              { title: 'Bi-weekly', value: 'biweekly' },
              { title: 'Monthly', value: 'monthly' }
            ]
          }
        }),
      ],
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        defineField({ 
          name: 'type', 
          title: 'Location Type', 
          type: 'string',
          options: {
            list: [
              { title: 'In Person', value: 'inperson' },
              { title: 'Online', value: 'online' },
              { title: 'Hybrid', value: 'hybrid' }
            ]
          }
        }),
        defineField({ name: 'address', title: 'Address', type: 'text' }),
        defineField({ name: 'meetingLink', title: 'Meeting Link', type: 'url' }),
      ],
    }),
    defineField({
      name: 'maxMembers',
      title: 'Maximum Members',
      type: 'number'
    }),
    defineField({
      name: 'currentMembers',
      title: 'Current Members',
      type: 'number',
      initialValue: 0
    }),
    defineField({
      name: 'childcare',
      title: 'Childcare Available',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'text'
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({ name: 'email', title: 'Email', type: 'email' }),
        defineField({ name: 'phone', title: 'Phone', type: 'string' }),
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Active Group',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'isFull',
      title: 'Group is Full',
      type: 'boolean',
      initialValue: false
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'groupType',
      media: 'leader.photo'
    }
  }
})
