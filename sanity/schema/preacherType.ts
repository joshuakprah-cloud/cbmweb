import { defineType, defineField } from 'sanity'

export const preacherType = defineType({
  name: 'preacher',
  title: 'Preacher/Speaker',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'title',
      title: 'Title/Position',
      type: 'string'
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text'
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email'
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          title: 'Social Link',
          fields: [
            defineField({ name: 'platform', title: 'Platform', type: 'string' }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
            defineField({ name: 'icon', title: 'Icon (Emoji)', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'isGuestSpeaker',
      title: 'Guest Speaker',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'isActive',
      title: 'Active Speaker',
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
      title: 'name',
      subtitle: 'title',
      media: 'photo'
    }
  }
})
