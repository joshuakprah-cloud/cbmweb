import { defineType, defineField } from 'sanity'

export const announcementBannerType = defineType({
  name: 'announcementBanner',
  title: 'Announcement Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enable Banner',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'message',
      title: 'Announcement Message',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'type',
      title: 'Banner Type',
      type: 'string',
      options: {
        list: [
          { title: 'Info', value: 'info' },
          { title: 'Warning', value: 'warning' },
          { title: 'Success', value: 'success' },
          { title: 'Urgent', value: 'urgent' }
        ]
      },
      initialValue: 'info'
    }),
    defineField({
      name: 'link',
      title: 'Link (Optional)',
      type: 'object',
      fields: [
        defineField({ name: 'text', title: 'Link Text', type: 'string' }),
        defineField({ name: 'url', title: 'Link URL', type: 'url' }),
      ],
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'CSS color value (e.g., #000000, blue, rgb(0,0,0))'
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      description: 'CSS color value (e.g., #ffffff, white, rgb(255,255,255))'
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Announcement Banner',
      }
    }
  }
})
