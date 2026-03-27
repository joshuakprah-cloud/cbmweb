import { defineType, defineField } from 'sanity'

export const givePageType = defineType({
  name: 'givePage',
  title: 'Give Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Give'
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      initialValue: 'Support the Mission'
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text',
      initialValue: 'Your generosity enables us to spread the Gospel and serve our community.'
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
      name: 'introduction',
      title: 'Introduction',
      type: 'text',
      description: 'Introduction text explaining the importance of giving'
    }),
    defineField({
      name: 'givingTypesTitle',
      title: 'Giving Types Section Title',
      type: 'string',
      initialValue: 'Choose How to Give'
    }),
    defineField({
      name: 'donationFormTitle',
      title: 'Donation Form Title',
      type: 'string',
      initialValue: 'Make Your Donation'
    }),
    defineField({
      name: 'donationInstructions',
      title: 'Donation Instructions',
      type: 'text',
      description: 'Instructions for the donation process'
    }),
    defineField({
      name: 'paymentMethods',
      title: 'Available Payment Methods',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Paystack', value: 'paystack' },
          { title: 'Stripe', value: 'stripe' },
          { title: 'Bank Transfer', value: 'bank' },
          { title: 'Mobile Money', value: 'mobile' }
        ]
      }
    }),
    defineField({
      name: 'testimonials',
      title: 'Giving Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'testimonial',
          title: 'Testimonial',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'message', title: 'Testimonial Message', type: 'text' }),
            defineField({ name: 'amount', title: 'Donation Amount', type: 'string' }),
            defineField({ name: 'givingType', title: 'Giving Type', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'faqSection',
      title: 'FAQ Section',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Section Title', type: 'string', initialValue: 'Frequently Asked Questions' }),
        defineField({ name: 'description', title: 'Section Description', type: 'text' }),
        defineField({
          name: 'faqs',
          title: 'FAQs',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'faq' }] }]
        }),
      ],
    }),
    defineField({
      name: 'securityInfo',
      title: 'Security Information',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Section Title', type: 'string', initialValue: 'Secure Giving' }),
        defineField({ name: 'description', title: 'Security Description', type: 'text' }),
        defineField({
          name: 'securityFeatures',
          title: 'Security Features',
          type: 'array',
          of: [{ type: 'string' }]
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
        title: 'Give Page',
      }
    }
  }
})
