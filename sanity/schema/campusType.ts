import { defineType, defineField } from 'sanity'

export const campusType = defineType({
  name: 'campus',
  title: 'Campus',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Campus Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'zipCode',
      title: 'Zip Code',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text'
    }),
    defineField({
      name: 'pastor',
      title: 'Campus Pastor',
      type: 'reference',
      to: [{ type: 'teamMember' }]
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({ name: 'phone', title: 'Phone', type: 'string' }),
        defineField({ name: 'email', title: 'Email', type: 'email' }),
      ],
    }),
    defineField({
      name: 'serviceTimes',
      title: 'Service Times',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'serviceTime',
          title: 'Service Time',
          fields: [
            defineField({ name: 'day', title: 'Day', type: 'string' }),
            defineField({ name: 'time', title: 'Time', type: 'string' }),
            defineField({ name: 'serviceType', title: 'Service Type', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Campus Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'mapUrl',
      title: 'Map URL',
      type: 'url'
    }),
    defineField({
      name: 'isActive',
      title: 'Active Campus',
      type: 'boolean',
      initialValue: true
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'city',
      media: 'image'
    }
  }
})
