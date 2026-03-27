import { defineType, defineField } from 'sanity'

export const homepageType = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    // Hero Gallery Section
    defineField({
      name: 'heroSlides',
      title: 'Hero Gallery Slides',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'heroSlide',
          title: 'Slide',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'subtitle', title: 'Subtitle', type: 'text' }),
            defineField({ name: 'cta', title: 'CTA Button Text', type: 'string' }),
            defineField({ name: 'ctaLink', title: 'CTA Link URL', type: 'string' }),
            defineField({ name: 'image', title: 'Background Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'order', title: 'Order', type: 'number' }),
          ],
        },
      ],
    }),
    
    // What To Expect Section
    defineField({
      name: 'whatToExpectSection',
      title: 'What To Expect Section',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Section Title', type: 'string', initialValue: "First Time Here?" }),
        defineField({ name: 'headline', title: 'Headline', type: 'string', initialValue: "Here's What to Expect." }),
        defineField({ name: 'description', title: 'Description', type: 'text', initialValue: "We've thought about your visit so you don't have to." }),
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
                defineField({ name: 'title', title: 'Title', type: 'string' }),
                defineField({ name: 'description', title: 'Description', type: 'text' }),
                defineField({ name: 'icon', title: 'Icon (Emoji)', type: 'string' }),
                defineField({ name: 'order', title: 'Order', type: 'number' }),
              ],
            },
          ],
        }),
      ],
    }),
    
    // Welcome Section
    defineField({
      name: 'welcomeSection',
      title: 'Welcome Section',
      type: 'object',
      fields: [
        defineField({
          name: 'sectionLabel',
          title: 'Section Label',
          type: 'string',
          initialValue: 'Who We Are'
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'A Warm Welcome Awaits You'
        }),
        defineField({
          name: 'message',
          title: 'Welcome Message',
          type: 'text',
          description: 'The main welcome message text displayed in the left column'
        }),
        defineField({
          name: 'image',
          title: 'Welcome Image',
          type: 'image',
          description: 'Image displayed in the right column (600 x 640px recommended)',
          options: { hotspot: true }
        }),
        defineField({ name: 'ctaText', title: 'CTA Button Text', type: 'string', initialValue: 'OUR STORY' }),
        defineField({ name: 'ctaLink', title: 'CTA Link URL', type: 'string', initialValue: '/about' }),
      ],
    }),
    
    // Service Times Strip (This comes from siteSettings, but adding override option)
    defineField({
      name: 'serviceTimesOverride',
      title: 'Service Times Override',
      type: 'object',
      description: 'Override default service times display',
      fields: [
        defineField({ name: 'enabled', title: 'Enable Override', type: 'boolean', initialValue: false }),
        defineField({ name: 'title', title: 'Custom Title', type: 'string' }),
        defineField({ name: 'message', title: 'Custom Message', type: 'text' }),
      ],
    }),
    
    // Ministries Snapshot Section
    defineField({
      name: 'ministriesSection',
      title: 'Ministries Section',
      type: 'object',
      fields: [
        defineField({
          name: 'sectionLabel',
          title: 'Section Label',
          type: 'string',
          initialValue: 'Get Involved'
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Our Ministries'
        }),
        defineField({
          name: 'description',
          title: 'Section Description',
          type: 'text',
          initialValue: "There's a place for you to belong and serve. Find the ministry that fits your season of life."
        }),
        defineField({
          name: 'featuredMinistries',
          title: 'Featured Ministries',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'ministry' }] }]
        }),
        defineField({ name: 'ctaText', title: 'CTA Button Text', type: 'string', initialValue: 'EXPLORE ALL MINISTRIES' }),
        defineField({ name: 'ctaLink', title: 'CTA Link URL', type: 'string', initialValue: '/ministries' }),
      ],
    }),
    
    // Pastor Teaser Section
    defineField({
      name: 'pastorSection',
      title: 'Pastor Section',
      type: 'object',
      fields: [
        defineField({
          name: 'sectionLabel',
          title: 'Section Label',
          type: 'string',
          initialValue: 'Our Leadership'
        }),
        defineField({
          name: 'pastorName',
          title: 'Pastor Name',
          type: 'string',
          initialValue: 'Prophet Powerman Bekoe'
        }),
        defineField({
          name: 'pastorBio',
          title: 'Pastor Bio',
          type: 'text',
          initialValue: 'The church is not a building, it\'s the people. We\'re called to be a beacon of hope, love, and transformation in our community and beyond. Join us in this incredible journey of faith.'
        }),
        defineField({
          name: 'pastorImage',
          title: 'Pastor Image',
          type: 'image',
          description: 'Pastor portrait image (480 x 480px recommended)',
          options: { hotspot: true }
        }),
        defineField({ name: 'primaryCtaText', title: 'Primary CTA Text', type: 'string', initialValue: 'Meet Prophet Bekoe' }),
        defineField({ name: 'primaryCtaLink', title: 'Primary CTA Link', type: 'string', initialValue: '/about/leadership' }),
        defineField({ name: 'secondaryCtaText', title: 'Secondary CTA Text', type: 'string', initialValue: 'Meet Our Team' }),
        defineField({ name: 'secondaryCtaLink', title: 'Secondary CTA Link', type: 'string', initialValue: '/about/leadership' }),
      ],
    }),
    
    // Latest Sermon Section
    defineField({
      name: 'latestSermonSection',
      title: 'Latest Sermon Section',
      type: 'object',
      fields: [
        defineField({ name: 'enabled', title: 'Enable Section', type: 'boolean', initialValue: true }),
        defineField({ name: 'title', title: 'Section Title', type: 'string', initialValue: 'Latest Sermon' }),
        defineField({ name: 'description', title: 'Section Description', type: 'text' }),
        defineField({ name: 'featuredSermon', title: 'Featured Sermon', type: 'reference', to: [{ type: 'sermon' }] }),
        defineField({ name: 'ctaText', title: 'CTA Button Text', type: 'string', initialValue: 'View All Sermons' }),
        defineField({ name: 'ctaLink', title: 'CTA Link URL', type: 'string', initialValue: '/sermons' }),
      ],
    }),
    
    // Upcoming Events Section
    defineField({
      name: 'upcomingEventsSection',
      title: 'Upcoming Events Section',
      type: 'object',
      fields: [
        defineField({ name: 'enabled', title: 'Enable Section', type: 'boolean', initialValue: true }),
        defineField({ name: 'title', title: 'Section Title', type: 'string', initialValue: 'Upcoming Events' }),
        defineField({ name: 'description', title: 'Section Description', type: 'text' }),
        defineField({
          name: 'featuredEvents',
          title: 'Featured Events',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'event' }] }]
        }),
        defineField({ name: 'ctaText', title: 'CTA Button Text', type: 'string', initialValue: 'View All Events' }),
        defineField({ name: 'ctaLink', title: 'CTA Link URL', type: 'string', initialValue: '/events' }),
      ],
    }),
    
    // Testimony Section
    defineField({
      name: 'testimonySection',
      title: 'Testimony Section',
      type: 'object',
      fields: [
        defineField({ name: 'enabled', title: 'Enable Section', type: 'boolean', initialValue: true }),
        defineField({ name: 'title', title: 'Section Title', type: 'string', initialValue: 'Member Stories' }),
        defineField({ name: 'description', title: 'Section Description', type: 'text' }),
        defineField({
          name: 'featuredTestimonies',
          title: 'Featured Testimonies',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'testimony' }] }]
        }),
        defineField({ name: 'ctaText', title: 'CTA Button Text', type: 'string' }),
        defineField({ name: 'ctaLink', title: 'CTA Link URL', type: 'string' }),
      ],
    }),
    
    // Closing CTA Section
    defineField({
      name: 'closingCTASection',
      title: 'Closing CTA Section',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'CTA Title', type: 'string', initialValue: 'Ready to join us?' }),
        defineField({ name: 'description', title: 'CTA Description', type: 'text', initialValue: "We'd love to meet you. Come as you are." }),
        defineField({ name: 'primaryCtaText', title: 'Primary CTA Text', type: 'string', initialValue: 'Get Connected' }),
        defineField({ name: 'primaryCtaLink', title: 'Primary CTA Link', type: 'string', initialValue: '/connect' }),
        defineField({ name: 'secondaryCtaText', title: 'Secondary CTA Text', type: 'string', initialValue: 'Learn More About Us' }),
        defineField({ name: 'secondaryCtaLink', title: 'Secondary CTA Link', type: 'string', initialValue: '/about/story' }),
        defineField({ name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } }),
      ],
    }),
    
    // SEO Fields
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string' }),
        defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text' }),
        defineField({ name: 'ogImage', title: 'Open Graph Image', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'noIndex', title: 'No Index', type: 'boolean' }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Homepage',
      }
    }
  }
})
