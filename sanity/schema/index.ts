import { defineType, Rule } from 'sanity'
import { homepageType } from './homepageType'
import aboutType from './aboutType'
import beliefsType from './beliefsType'
import leadershipType from './leadershipType'
import themeType from './themeType'
import visitPage from './visitPage'
import prayerPage from './prayerPage'
import contactPage from './contactPage'
import givePage from './givePage'
import eventsPage from './eventsPage'

export const pastor = defineType({
  name: 'pastor',
  title: 'Pastor',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
    },
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
    },
    {
      name: 'branch',
      title: 'Branch',
      type: 'string',
      options: {
        list: [
          { title: 'Ghana HQ', value: 'ghana' },
          { title: 'Zimbabwe', value: 'zimbabwe' },
          { title: 'UK', value: 'uk' },
          { title: 'Germany', value: 'germany' }
        ]
      },
      initialValue: 'ghana'
    },
  ],
})

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'day',
      title: 'Day',
      type: 'string',
    },
    {
      name: 'time',
      title: 'Time',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
    {
      name: 'branch',
      title: 'Branch',
      type: 'string',
      options: {
        list: [
          { title: 'Ghana HQ', value: 'ghana' },
          { title: 'Zimbabwe', value: 'zimbabwe' },
          { title: 'UK', value: 'uk' },
          { title: 'Germany', value: 'germany' }
        ]
      },
      initialValue: 'ghana'
    },
  ],
})

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
    {
      name: 'branch',
      title: 'Branch',
      type: 'string',
      options: {
        list: [
          { title: 'Ghana HQ', value: 'ghana' },
          { title: 'Zimbabwe', value: 'zimbabwe' },
          { title: 'UK', value: 'uk' },
          { title: 'Germany', value: 'germany' }
        ]
      },
      initialValue: 'ghana'
    },
  ],
})

export const testimony = defineType({
  name: 'testimony',
  title: 'Testimony',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
    },
    {
      name: 'branch',
      title: 'Branch',
      type: 'string',
      options: {
        list: [
          { title: 'Ghana HQ', value: 'ghana' },
          { title: 'Zimbabwe', value: 'zimbabwe' },
          { title: 'UK', value: 'uk' },
          { title: 'Germany', value: 'germany' }
        ]
      },
      initialValue: 'ghana'
    },
  ],
})

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
    {
      name: 'branch',
      title: 'Branch',
      type: 'string',
      options: {
        list: [
          { title: 'Ghana HQ', value: 'ghana' },
          { title: 'Zimbabwe', value: 'zimbabwe' },
          { title: 'UK', value: 'uk' },
          { title: 'Germany', value: 'germany' }
        ]
      },
      initialValue: 'ghana'
    },
  ],
})

export const sermon = defineType({
  name: 'sermon',
  title: 'Sermon',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'preacher',
      title: 'Preacher',
      type: 'reference',
      to: [{ type: 'pastor' }],
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
    },
    {
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
    },
    {
      name: 'audioUrl',
      title: 'Audio URL',
      type: 'url',
    },
    {
      name: 'series',
      title: 'Series',
      type: 'string',
    },
    {
      name: 'scriptureReferences',
      title: 'Scripture References',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'keyPoints',
      title: 'Key Points',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'notesUrl',
      title: 'Notes URL (PDF)',
      type: 'url',
    },
    {
      name: 'branch',
      title: 'Branch',
      type: 'string',
      options: {
        list: [
          { title: 'Ghana HQ', value: 'ghana' },
          { title: 'Zimbabwe', value: 'zimbabwe' },
          { title: 'UK', value: 'uk' },
          { title: 'Germany', value: 'germany' }
        ]
      },
      initialValue: 'ghana'
    },
  ],
})

export const prayerRequest = defineType({
  name: 'prayerRequest',
  title: 'Prayer Request',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.email(),
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: Rule => Rule.optional(),
    },
    {
      name: 'requestType',
      title: 'Request Type',
      type: 'string',
      options: {
        list: [
          { title: 'Public', value: 'public' },
          { title: 'Private', value: 'private' },
        ],
      },
    },
    {
      name: 'followUpRequested',
      title: 'Follow Up Requested',
      type: 'boolean',
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
})

export const visitorRegistration = defineType({
  name: 'visitorRegistration',
  title: 'Visitor Registration',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.email(),
    },
    {
      name: 'service',
      title: 'Service Attending',
      type: 'string',
    },
    {
      name: 'bringingChildren',
      title: 'Bringing Children',
      type: 'boolean',
    },
    {
      name: 'notes',
      title: 'Notes',
      type: 'text',
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
})

export const contact = defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    {
      name: 'firstName',
      title: 'First Name',
      type: 'string',
    },
    {
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.email(),
    },
    {
      name: 'subject',
      title: 'Subject',
      type: 'string',
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
})

export const schemaTypes = [homepageType, aboutType, beliefsType, leadershipType, themeType, visitPage, prayerPage, contactPage, givePage, eventsPage, pastor, service, event, testimony, post, sermon, prayerRequest, visitorRegistration, contact]
