import {defineArrayMember, defineField, defineType} from 'sanity'
import {seoType} from './objects/seo'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'serviceTimes',
      type: 'array',
      title: 'Service Times',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              title: 'Service Label',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'day',
              type: 'string',
              title: 'Day',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'timeRange',
              type: 'string',
              title: 'Time Range',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'location',
              type: 'string',
              title: 'Location',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              label: 'label',
              day: 'day',
            },
            prepare(selection) {
              const {label, day} = selection
              return {
                title: label || 'Untitled Service',
                subtitle: day || 'No day specified',
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'Default SEO Settings',
      description: 'Default SEO settings for the site',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'Global site configuration',
      }
    },
  },
})
