import { defineType, defineField } from 'sanity'

export const newHerePageType = defineType({
  name: 'newHerePage',
  title: 'New Here Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text'
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'welcomeMessage',
      title: 'Welcome Message',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'whatToExpect',
      title: 'What to Expect Section',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Section Title', type: 'string', initialValue: 'What to Expect' }),
        defineField({ name: 'description', title: 'Section Description', type: 'text' }),
        defineField({
          name: 'expectations',
          title: 'Expectations List',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'expectation',
              title: 'Expectation',
              fields: [
                defineField({ name: 'title', title: 'Expectation Title', type: 'string' }),
                defineField({ name: 'description', title: 'Description', type: 'text' }),
                defineField({ name: 'icon', title: 'Icon (Emoji)', type: 'string' }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'serviceTimes',
      title: 'Service Times Section',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Section Title', type: 'string', initialValue: 'Service Times' }),
        defineField({ name: 'description', title: 'Section Description', type: 'text' }),
        defineField({
          name: 'services',
          title: 'Services',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'service',
              title: 'Service',
              fields: [
                defineField({ name: 'day', title: 'Day', type: 'string' }),
                defineField({ name: 'time', title: 'Time', type: 'string' }),
                defineField({ name: 'serviceType', title: 'Service Type', type: 'string' }),
                defineField({ name: 'description', title: 'Description', type: 'text' }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'nextSteps',
      title: 'Next Steps Section',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Section Title', type: 'string', initialValue: 'Your Next Steps' }),
        defineField({ name: 'description', title: 'Section Description', type: 'text' }),
        defineField({
          name: 'steps',
          title: 'Steps',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'step',
              title: 'Step',
              fields: [
                defineField({ name: 'title', title: 'Step Title', type: 'string' }),
                defineField({ name: 'description', title: 'Description', type: 'text' }),
                defineField({ name: 'linkText', title: 'Link Text', type: 'string' }),
                defineField({ name: 'linkUrl', title: 'Link URL', type: 'string' }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string' }),
        defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text' }),
        defineField({ name: 'ogImage', title: 'Open Graph Image', type: 'image' }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'New Here Page',
      }
    }
  }
})
