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
                defineField({ name: 'icon', title: 'Icon Name', type: 'string', description: 'Options: map-pin, heart, sparkles, users, calendar, music, book, photo' }),
                defineField({ name: 'number', title: 'Card Number', type: 'string', description: 'Optional: Display number badge (e.g., 01, 02, 03). Auto-generated if empty.' }),
                defineField({ name: 'image', title: 'Card Background Image', type: 'image', description: 'Image displayed as card background (380px height recommended)', options: { hotspot: true } }),
                defineField({ name: 'order', title: 'Display Order', type: 'number' }),
              ],
            },
          ],
        }),
      ],
    }),
    
    // Welcome Section (Meet Our Pastors)
    defineField({
      name: 'welcomeSection',
      title: 'Welcome Section (Meet Our Pastors)',
      type: 'object',
      fields: [
        defineField({
          name: 'sectionLabel',
          title: 'Section Label (Eyebrow)',
          type: 'string',
          initialValue: 'MEET OUR PASTORS'
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Meet our lead pastors'
        }),
        defineField({
          name: 'message',
          title: 'Welcome Message (Legacy)',
          type: 'text',
          description: 'Legacy field - use Intro Text instead'
        }),
        defineField({
          name: 'introText',
          title: 'Intro Text',
          type: 'text',
          description: 'Opening paragraph about the pastors',
          initialValue: 'We are honoured to welcome you to ThaGospel Church. Our lead pastors, Prophet John Prang and Mama Vida Prang are passionate about raising Christ-minded people who impact their world.'
        }),
        // Prophet Fields
        defineField({
          name: 'prophetImage',
          title: 'Prophet Image',
          type: 'image',
          description: 'Portrait of Prophet John (portrait orientation recommended)',
          options: { hotspot: true }
        }),
        defineField({
          name: 'prophetName',
          title: 'Prophet Name',
          type: 'string',
          initialValue: 'Prophet John Prang'
        }),
        defineField({
          name: 'prophetTitle',
          title: 'Prophet Title',
          type: 'string',
          initialValue: 'Lead Pastor'
        }),
        defineField({
          name: 'prophetBio',
          title: 'Prophet Bio',
          type: 'text',
          description: 'Short biography of Prophet John',
          initialValue: 'Prophet John is a visionary leader dedicated to raising a nation of Christ-minded people. He founded ThaGospel Church with a mission to impact communities through the transformative power of God\'s Word.'
        }),
        // First Lady Fields
        defineField({
          name: 'firstLadyImage',
          title: 'First Lady Image',
          type: 'image',
          description: 'Portrait of Mama Vida (portrait orientation recommended)',
          options: { hotspot: true }
        }),
        defineField({
          name: 'firstLadyName',
          title: 'First Lady Name',
          type: 'string',
          initialValue: 'Mama Vida Prang'
        }),
        defineField({
          name: 'firstLadyTitle',
          title: 'First Lady Title',
          type: 'string',
          initialValue: 'Co-Lead Pastor'
        }),
        defineField({
          name: 'firstLadyBio',
          title: 'First Lady Bio',
          type: 'text',
          description: 'Short biography of Mama Vida',
          initialValue: 'Mama Vida is a compassionate leader committed to nurturing faith and empowering believers. She co-leads with a heart for community and a passion for seeing lives transformed.'
        }),
        // Legacy image field (kept for backwards compatibility)
        defineField({
          name: 'image',
          title: 'Legacy Welcome Image',
          type: 'image',
          description: 'Legacy field - use Prophet/FirstLady images instead',
          options: { hotspot: true }
        }),
        defineField({ name: 'ctaText', title: 'CTA Button Text', type: 'string', initialValue: 'About Our Pastors' }),
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
