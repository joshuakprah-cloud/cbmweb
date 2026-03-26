import {defineArrayMember, defineField, defineType} from 'sanity'
import {seoType} from './objects/seo'

export const homepageType = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    // Hero Section
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heroPrimaryButton',
      title: 'Hero Primary Button Text',
      type: 'string',
    }),
    defineField({
      name: 'heroSecondaryButton',
      title: 'Hero Secondary Button Text',
      type: 'string',
    }),
    defineField({
      name: 'heroSmallLine',
      title: 'Hero Small Line',
      type: 'string',
    }),
    defineField({
      name: 'heroBackgroundImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heroBackgroundImageAlt',
      title: 'Hero Background Image Alt Text',
      type: 'string',
    }),
    // Quick Action Strip
    defineField({
      name: 'quickActions',
      title: 'Quick Actions',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string', // e.g., emoji or class
            }),
          ],
        }),
      ],
    }),
    // About Preview
    defineField({
      name: 'aboutHeadline',
      title: 'About Headline',
      type: 'string',
    }),
    defineField({
      name: 'aboutContent',
      title: 'About Content',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'pastorMessage',
      title: 'Pastor Message',
      type: 'text',
    }),
    defineField({
      name: 'aboutButton',
      title: 'About Button Text',
      type: 'string',
    }),
    // Service Times
    defineField({
      name: 'servicesHeadline',
      title: 'Services Headline',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location Address',
      type: 'string',
    }),
    defineField({
      name: 'locationLat',
      title: 'Location Latitude',
      type: 'number',
    }),
    defineField({
      name: 'locationLng',
      title: 'Location Longitude',
      type: 'number',
    }),
    defineField({
      name: 'serviceTimes',
      title: 'Service Times',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'service',
              title: 'Service Name',
              type: 'string',
            }),
            defineField({
              name: 'time',
              title: 'Time',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'midweekService',
      title: 'Midweek Service',
      type: 'object',
      fields: [
        defineField({
          name: 'day',
          title: 'Day',
          type: 'string',
        }),
        defineField({
          name: 'time',
          title: 'Time',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'servicesButton',
      title: 'Services Button Text',
      type: 'string',
    }),
    defineField({
      name: 'servicesSmallLine',
      title: 'Services Small Line',
      type: 'string',
    }),
    // Featured Sermon
    defineField({
      name: 'sermonHeadline',
      title: 'Sermon Headline',
      type: 'string',
    }),
    defineField({
      name: 'sermonIntro',
      title: 'Sermon Intro',
      type: 'text',
    }),
    defineField({
      name: 'sermonButton',
      title: 'Sermon Button Text',
      type: 'string',
    }),
    defineField({
      name: 'sermonSecondaryButton',
      title: 'Sermon Secondary Button Text',
      type: 'string',
    }),
    // Ministries Preview
    defineField({
      name: 'ministriesHeadline',
      title: 'Ministries Headline',
      type: 'string',
    }),
    defineField({
      name: 'ministriesIntro',
      title: 'Ministries Intro',
      type: 'text',
    }),
    defineField({
      name: 'ministries',
      title: 'Ministries',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'ministriesButton',
      title: 'Ministries Button Text',
      type: 'string',
    }),
    // Testimonials
    defineField({
      name: 'testimonialsHeadline',
      title: 'Testimonials Headline',
      type: 'string',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'message',
              title: 'Message',
              type: 'text',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'testimonialsButton',
      title: 'Testimonials Button Text',
      type: 'string',
    }),
    // Global Presence
    defineField({
      name: 'globalHeadline',
      title: 'Global Headline',
      type: 'string',
    }),
    defineField({
      name: 'globalContent',
      title: 'Global Content',
      type: 'text',
    }),
    defineField({
      name: 'globalButton',
      title: 'Global Button Text',
      type: 'string',
    }),
    // Social Media
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
            }),
          ],
        }),
      ],
    }),
    // Final CTA
    defineField({
      name: 'ctaHeadline',
      title: 'CTA Headline',
      type: 'string',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'text',
    }),
    defineField({
      name: 'ctaPrimaryButton',
      title: 'CTA Primary Button Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaSecondaryButton',
      title: 'CTA Secondary Button Text',
      type: 'string',
    }),
    // Footer
    defineField({
      name: 'footerColumns',
      title: 'Footer Columns',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Column Title',
              type: 'string',
            }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'text',
                      title: 'Link Text',
                      type: 'string',
                    }),
                    defineField({
                      name: 'url',
                      title: 'URL',
                      type: 'string',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'footerContact',
      title: 'Footer Contact',
      type: 'object',
      fields: [
        defineField({
          name: 'churchName',
          title: 'Church Name',
          type: 'string',
        }),
        defineField({
          name: 'address',
          title: 'Address',
          type: 'string',
        }),
        defineField({
          name: 'phone',
          title: 'Phone',
          type: 'string',
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
        }),
        defineField({
          name: 'serviceTimes',
          title: 'Service Times',
          type: 'array',
          of: [defineArrayMember({type: 'string'})],
        }),
      ],
    }),
    defineField({
      name: 'footerBottomText',
      title: 'Footer Bottom Text',
      type: 'text',
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO Settings',
      description: 'SEO settings for the homepage',
    }),
  ],
})
