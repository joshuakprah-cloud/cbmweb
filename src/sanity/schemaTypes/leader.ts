import {defineField, defineType} from 'sanity'

export const leaderType = defineType({
  name: 'leader',
  title: 'Leader',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      type: 'string',
      title: 'Role',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'department',
      type: 'string',
      title: 'Department',
    }),
    defineField({
      name: 'bio',
      type: 'text',
      title: 'Bio',
      rows: 3,
    }),
    defineField({
      name: 'photo',
      type: 'image',
      title: 'Photo',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ]
    }),
    defineField({
      name: 'isFeaturedPastor',
      type: 'boolean',
      title: 'Featured Pastor',
      description: 'Show in featured pastors section',
      initialValue: false,
    }),
    defineField({
      name: 'isPreacher',
      type: 'boolean',
      title: 'Preacher',
      description: 'This person can preach sermons',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Order',
      description: 'Manual sort control',
    }),
    defineField({
      name: 'isActive',
      type: 'boolean',
      title: 'Active',
      description: 'Show on website',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title || 'Untitled Leader',
        subtitle: subtitle || 'No role specified',
      }
    },
  },
})
