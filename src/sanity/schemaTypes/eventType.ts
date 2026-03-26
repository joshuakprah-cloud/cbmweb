import {CalendarIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Event Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      title: 'Event Excerpt',
      description: 'Brief description of the event (used in listings and previews)',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      title: 'Event Details',
      description: 'Full description of the event with rich text formatting',
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Event Category',
      options: {
        list: [
          {title: 'Sunday Service', value: 'Sunday Service'},
          {title: 'Youth Event', value: 'Youth Event'},
          {title: 'Conference', value: 'Conference'},
          {title: 'Outreach', value: 'Outreach'},
          {title: 'Special Service', value: 'Special Service'},
          {title: 'General', value: 'General'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      type: 'datetime',
      title: 'Event Start Date & Time',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      type: 'datetime',
      title: 'Event End Date & Time',
      description: 'Optional - for multi-day events',
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Event Location',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      type: 'text',
      title: 'Full Address',
      description: 'Complete address for the event location',
    }),
    defineField({
      name: 'isFree',
      type: 'boolean',
      title: 'Free Event',
      description: 'Check if this event is free to attend',
      initialValue: true,
    }),
    defineField({
      name: 'ticketPrice',
      type: 'number',
      title: 'Ticket Price (GHS)',
      description: 'Price in Ghana Cedis (leave empty for free events)',
      hidden: ({document}: any) => document?.isFree,
    }),
    defineField({
      name: 'ticketLink',
      type: 'url',
      title: 'Ticket Purchase Link',
      description: 'External link for ticket purchases (if applicable)',
    }),
    defineField({
      name: 'registrationRequired',
      type: 'boolean',
      title: 'Registration Required',
      description: 'Check if attendees must register for this event',
      initialValue: false,
    }),
    defineField({
      name: 'capacity',
      type: 'number',
      title: 'Event Capacity',
      description: 'Maximum number of attendees',
    }),
    defineField({
      name: 'registeredCount',
      type: 'number',
      title: 'Current Registration Count',
      description: 'Number of people already registered (auto-updated)',
      readOnly: true,
      initialValue: 0,
    }),
    defineField({
      name: 'organizer',
      type: 'string',
      title: 'Event Organizer',
      initialValue: 'ThaGospel Church',
    }),
    defineField({
      name: 'contactEmail',
      type: 'email',
      title: 'Contact Email',
      initialValue: 'events@thagospel.com',
    }),
    defineField({
      name: 'contactPhone',
      type: 'string',
      title: 'Contact Phone',
      initialValue: '+233 24 123 4567',
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      title: 'Event Cover Image',
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
      name: 'gallery',
      type: 'array',
      title: 'Event Gallery',
      description: 'Additional images for the event',
      of: [
        defineArrayMember({
          type: 'image',
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
        })
      ],
    }),
    defineField({
      name: 'speakers',
      type: 'array',
      title: 'Event Speakers',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              type: 'string',
              title: 'Speaker Name',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              type: 'string',
              title: 'Speaker Title/Role',
            }),
            defineField({
              name: 'image',
              type: 'image',
              title: 'Speaker Photo',
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
          ],
        }),
      ],
    }),
    defineField({
      name: 'schedule',
      type: 'array',
      title: 'Event Schedule',
      description: 'Timeline of event activities',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'time',
              type: 'string',
              title: 'Time',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              type: 'string',
              title: 'Activity Title',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              type: 'text',
              title: 'Activity Description',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'isFeatured',
      type: 'boolean',
      title: 'Featured Event',
      description: 'Check to feature this event prominently on the events page',
      initialValue: false,
    }),
    defineField({
      name: 'isActive',
      type: 'boolean',
      title: 'Active Event',
      description: 'Uncheck to hide this event from the website',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      category: 'category',
      media: 'coverImage',
    },
    prepare(selection) {
      const {date, category} = selection
      const dateFormatted = date ? new Date(date).toLocaleDateString() : 'No date'
      return {...selection, subtitle: `${category} • ${dateFormatted}`}
    },
  },
})
