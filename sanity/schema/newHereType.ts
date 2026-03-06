import { defineType, defineField } from 'sanity'

export const newHereType = defineType({
  name: 'newHere',
  title: 'New Here Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
    }),
    defineField({
      name: 'heroBackgroundImage',
      title: 'Hero Background Image',
      type: 'image',
    }),
    defineField({
      name: 'whatToExpectTitle',
      title: 'What to Expect Title',
      type: 'string',
    }),
    defineField({
      name: 'whatToExpect',
      title: 'What to Expect Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
            defineField({ name: 'icon', title: 'Icon', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'sundayExperienceTitle',
      title: 'Sunday Experience Title',
      type: 'string',
    }),
    defineField({
      name: 'sundayExperience',
      title: 'Sunday Experience Timeline',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'photoGalleryTitle',
      title: 'Photo Gallery Title',
      type: 'string',
    }),
    defineField({
      name: 'photoGallery',
      title: 'Photo Gallery',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'image', title: 'Image', type: 'image' }),
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'connectTitle',
      title: 'How to Get Connected Title',
      type: 'string',
    }),
    defineField({
      name: 'visitInfo',
      title: 'Visit Information',
      type: 'object',
      fields: [
        defineField({ name: 'services', title: 'Services', type: 'string' }),
        defineField({ name: 'location', title: 'Location', type: 'string' }),
        defineField({ name: 'parking', title: 'Parking', type: 'string' }),
        defineField({ name: 'greeters', title: 'Greeters', type: 'string' }),
      ],
    }),
    defineField({
      name: 'connectItems',
      title: 'Connect Items',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'leadersTitle',
      title: 'Leaders Title',
      type: 'string',
    }),
    defineField({
      name: 'prophet',
      title: 'Prophet',
      type: 'object',
      fields: [
        defineField({ name: 'name', title: 'Name', type: 'string' }),
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'image', title: 'Image', type: 'image' }),
      ],
    }),
    defineField({
      name: 'firstLady',
      title: 'First Lady',
      type: 'object',
      fields: [
        defineField({ name: 'name', title: 'Name', type: 'string' }),
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'image', title: 'Image', type: 'image' }),
      ],
    }),
    defineField({
      name: 'leadersMessage',
      title: 'Leaders Welcome Message',
      type: 'text',
    }),
    defineField({
      name: 'faqTitle',
      title: 'FAQ Title',
      type: 'string',
    }),
    defineField({
      name: 'faq',
      title: 'Frequently Asked Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string' }),
            defineField({ name: 'answer', title: 'Answer', type: 'text' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'ctaTitle',
      title: 'CTA Title',
      type: 'string',
    }),
    defineField({
      name: 'ctaSubtitle',
      title: 'CTA Subtitle',
      type: 'text',
    }),
    defineField({
      name: 'ctaButtons',
      title: 'CTA Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'text', title: 'Button Text', type: 'string' }),
            defineField({ name: 'url', title: 'Button URL', type: 'string' }),
            defineField({ name: 'color', title: 'Button Color', type: 'string', options: { list: ['white', 'blue', 'purple'] } }),
          ],
        },
      ],
    }),
  ],
})
