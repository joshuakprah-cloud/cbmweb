import {defineField, defineType} from 'sanity'

export const locationType = defineType({
  name: 'location',
  title: 'Location',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      type: 'text',
      title: 'Address',
    }),
    defineField({
      name: 'city',
      type: 'string',
      title: 'City',
    }),
    defineField({
      name: 'phone',
      type: 'string',
      title: 'Phone',
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email',
    }),
    defineField({
      name: 'mapLink',
      type: 'url',
      title: 'Map Link',
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
      name: 'isMainCampus',
      type: 'boolean',
      title: 'Main Campus',
      description: 'Primary campus location',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'city',
      media: 'photo',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title || 'Untitled Location',
        subtitle: subtitle || 'No city specified',
      }
    },
  },
})
