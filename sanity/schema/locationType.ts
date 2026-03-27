import { defineType, defineField } from 'sanity'

export const locationType = defineType({
  name: 'location',
  title: 'Location',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Location Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'address',
      title: 'Street Address',
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
      title: 'State/Region',
      type: 'string'
    }),
    defineField({
      name: 'zipCode',
      title: 'Zip/Postal Code',
      type: 'string'
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      initialValue: 'Ghana'
    }),
    defineField({
      name: 'coordinates',
      title: 'GPS Coordinates',
      type: 'geopoint',
      description: 'Latitude and longitude for maps'
    }),
    defineField({
      name: 'digitalAddress',
      title: 'Digital Address',
      type: 'string',
      description: 'Ghana Post Digital Address'
    }),
    defineField({
      name: 'directions',
      title: 'Directions',
      type: 'text',
      description: 'Detailed directions to the location'
    }),
    defineField({
      name: 'parkingInfo',
      title: 'Parking Information',
      type: 'text',
      description: 'Details about parking availability and options'
    }),
    defineField({
      name: 'publicTransport',
      title: 'Public Transport Information',
      type: 'text',
      description: 'Information about public transport access'
    }),
    defineField({
      name: 'mapEmbedUrl',
      title: 'Map Embed URL',
      type: 'url',
      description: 'Google Maps embed URL'
    }),
    defineField({
      name: 'images',
      title: 'Location Images',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'locationImage',
          title: 'Location Image',
          fields: [
            defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({ name: 'phone', title: 'Phone', type: 'string' }),
        defineField({ name: 'email', title: 'Email', type: 'email' }),
        defineField({ name: 'website', title: 'Website', type: 'url' }),
      ],
    }),
    defineField({
      name: 'operatingHours',
      title: 'Operating Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'operatingHour',
          title: 'Operating Hour',
          fields: [
            defineField({ name: 'day', title: 'Day', type: 'string' }),
            defineField({ name: 'openTime', title: 'Open Time', type: 'string' }),
            defineField({ name: 'closeTime', title: 'Close Time', type: 'string' }),
            defineField({ name: 'isClosed', title: 'Closed', type: 'boolean', initialValue: false }),
          ],
        },
      ],
    }),
    defineField({
      name: 'accessibility',
      title: 'Accessibility Information',
      type: 'object',
      fields: [
        defineField({ name: 'wheelchairAccessible', title: 'Wheelchair Accessible', type: 'boolean', initialValue: false }),
        defineField({ name: 'accessibleParking', title: 'Accessible Parking', type: 'boolean', initialValue: false }),
        defineField({ name: 'accessibleRestrooms', title: 'Accessible Restrooms', type: 'boolean', initialValue: false }),
        defineField({ name: 'accessibilityNotes', title: 'Accessibility Notes', type: 'text' }),
      ],
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'amenity',
          title: 'Amenity',
          fields: [
            defineField({ name: 'name', title: 'Amenity Name', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
            defineField({ name: 'icon', title: 'Icon (Emoji)', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'isMainCampus',
      title: 'Main Campus',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'isActive',
      title: 'Active Location',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity',
      type: 'number',
      description: 'Maximum capacity for events'
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'city',
      media: 'images.0.image'
    }
  }
})
