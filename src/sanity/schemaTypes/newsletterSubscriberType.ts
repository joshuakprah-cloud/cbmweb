import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'newsletterSubscriber',
  title: 'Newsletter Subscriber',
  type: 'document',
  fields: [
    defineField({
      name: 'subscriberId',
      title: 'Subscriber ID',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'email',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      description: 'Optional subscriber name'
    }),
    defineField({
      name: 'preferences',
      title: 'Subscription Preferences',
      type: 'object',
      fields: [
        defineField({
          name: 'events',
          title: 'Event Notifications',
          type: 'boolean',
          initialValue: true
        }),
        defineField({
          name: 'sermons',
          title: 'New Sermons',
          type: 'boolean',
          initialValue: true
        }),
        defineField({
          name: 'announcements',
          title: 'Church Announcements',
          type: 'boolean',
          initialValue: true
        }),
        defineField({
          name: 'youth',
          title: 'Youth Events',
          type: 'boolean',
          initialValue: false
        }),
        defineField({
          name: 'outreach',
          title: 'Outreach Programs',
          type: 'boolean',
          initialValue: false
        })
      ]
    }),
    defineField({
      name: 'subscriptionDate',
      title: 'Subscription Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'status',
      title: 'Subscription Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Unsubscribed', value: 'unsubscribed' },
          { title: 'Bounced', value: 'bounced' },
          { title: 'Pending Confirmation', value: 'pending' }
        ]
      },
      initialValue: 'active',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'source',
      title: 'Subscription Source',
      type: 'string',
      options: {
        list: [
          { title: 'Events Page', value: 'events-page' },
          { title: 'Homepage', value: 'homepage' },
          { title: 'Contact Form', value: 'contact-form' },
          { title: 'Manual Import', value: 'manual-import' },
          { title: 'Other', value: 'other' }
        ]
      }
    }),
    defineField({
      name: 'unsubscribedDate',
      title: 'Unsubscribed Date',
      type: 'datetime',
      description: 'Date when subscriber unsubscribed'
    }),
    defineField({
      name: 'reactivatedDate',
      title: 'Reactivated Date',
      type: 'datetime',
      description: 'Date when previously unsubscribed user reactivated'
    }),
    defineField({
      name: 'notes',
      title: 'Admin Notes',
      type: 'text',
      description: 'Internal notes about this subscriber',
      rows: 3
    })
  ],
  orderings: [
    {
      title: 'Subscription Date (Newest First)',
      name: 'subscriptionDateDesc',
      by: [{ field: 'subscriptionDate', direction: 'desc' }]
    },
    {
      title: 'Subscription Date (Oldest First)',
      name: 'subscriptionDateAsc',
      by: [{ field: 'subscriptionDate', direction: 'asc' }]
    },
    {
      title: 'Email (A-Z)',
      name: 'emailAsc',
      by: [{ field: 'email', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'name',
      status: 'status',
      subscriptionDate: 'subscriptionDate'
    },
    prepare(selection) {
      const { title, subtitle, status, subscriptionDate } = selection;
      const statusColor = status === 'active' ? '🟢' : status === 'unsubscribed' ? '🔴' : '🟡';
      return {
        title: title,
        subtitle: `${subtitle || 'No name'} ${statusColor} ${new Date(subscriptionDate).toLocaleDateString()}`
      };
    }
  }
});
