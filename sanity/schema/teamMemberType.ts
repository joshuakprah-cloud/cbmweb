import { defineType, defineField } from 'sanity'

export const teamMemberType = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'position',
      title: 'Position/Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email'
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string'
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          { title: 'Pastoral', value: 'pastoral' },
          { title: 'Worship', value: 'worship' },
          { title: 'Youth', value: 'youth' },
          { title: 'Children', value: 'children' },
          { title: 'Administration', value: 'administration' },
          { title: 'Outreach', value: 'outreach' }
        ]
      }
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number'
    }),
    defineField({
      name: 'isActive',
      title: 'Active Member',
      type: 'boolean',
      initialValue: true
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'photo'
    }
  }
})
