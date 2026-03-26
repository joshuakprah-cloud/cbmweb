import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'eventRegistration',
  title: 'Event Registration',
  type: 'document',
  fields: [
    defineField({
      name: 'registrationId',
      title: 'Registration ID',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'event',
      title: 'Event',
      type: 'reference',
      to: [{ type: 'event' }],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required().min(2).max(100)
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'email',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Optional phone number for contact'
    }),
    defineField({
      name: 'specialRequests',
      title: 'Special Requests',
      type: 'text',
      description: 'Any special requirements or accommodations needed',
      rows: 3
    }),
    defineField({
      name: 'registrationDate',
      title: 'Registration Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'status',
      title: 'Registration Status',
      type: 'string',
      options: {
        list: [
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'Pending', value: 'pending' },
          { title: 'Cancelled', value: 'cancelled' },
          { title: 'Waitlisted', value: 'waitlisted' }
        ]
      },
      initialValue: 'confirmed',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'paymentStatus',
      title: 'Payment Status',
      type: 'string',
      options: {
        list: [
          { title: 'Not Required', value: 'not_required' },
          { title: 'Pending', value: 'pending' },
          { title: 'Paid', value: 'paid' },
          { title: 'Failed', value: 'failed' },
          { title: 'Refunded', value: 'refunded' }
        ]
      },
      initialValue: 'not_required',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'notes',
      title: 'Admin Notes',
      type: 'text',
      description: 'Internal notes for event organizers',
      rows: 3
    })
  ],
  orderings: [
    {
      title: 'Registration Date (Newest First)',
      name: 'registrationDateDesc',
      by: [{ field: 'registrationDate', direction: 'desc' }]
    },
    {
      title: 'Registration Date (Oldest First)',
      name: 'registrationDateAsc',
      by: [{ field: 'registrationDate', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      eventTitle: 'event.title',
      registrationDate: 'registrationDate'
    },
    prepare(selection) {
      const { title, subtitle, eventTitle, registrationDate } = selection;
      return {
        title: `${title} - ${eventTitle}`,
        subtitle: `${subtitle} • ${new Date(registrationDate).toLocaleDateString()}`
      };
    }
  }
});
