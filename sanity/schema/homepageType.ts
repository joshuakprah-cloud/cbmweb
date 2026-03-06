import { defineType, defineField } from 'sanity'

export const homepageType = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
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
      name: 'heroBackgroundImage',
      title: 'Hero Background Image',
      type: 'image',
    }),
    defineField({
      name: 'heroBackgroundImageAlt',
      title: 'Hero Background Image Alt',
      type: 'string',
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
      name: 'quickActions',
      title: 'Quick Actions',
      type: 'array',
      of: [
        defineField({
          name: 'action',
          title: 'Action',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
            defineField({ name: 'link', title: 'Link', type: 'string' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'aboutHeadline',
      title: 'About Headline',
      type: 'string',
    }),
    defineField({
      name: 'aboutContent',
      title: 'About Content',
      type: 'text',
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
    defineField({
      name: 'servicesHeadline',
      title: 'Services Headline',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
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
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'midweekService',
      title: 'Midweek Service',
      type: 'string',
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
        defineField({
          name: 'ministry',
          title: 'Ministry',
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
            defineField({ name: 'image', title: 'Image', type: 'image' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'ministriesButton',
      title: 'Ministries Button Text',
      type: 'string',
    }),
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
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'array',
      of: [
        defineField({
          name: 'platform',
          title: 'Platform',
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
            defineField({ name: 'icon', title: 'Icon', type: 'string' }),
          ],
        }),
      ],
    }),
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
    defineField({
      name: 'footerColumns',
      title: 'Footer Columns',
      type: 'array',
      of: [
        defineField({
          name: 'column',
          title: 'Column',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'links', title: 'Links', type: 'array', of: [{ type: 'string' }] }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'footerContact',
      title: 'Footer Contact',
      type: 'object',
      fields: [
        defineField({ name: 'phone', title: 'Phone', type: 'string' }),
        defineField({ name: 'email', title: 'Email', type: 'string' }),
        defineField({ name: 'address', title: 'Address', type: 'text' }),
      ],
    }),
    defineField({
      name: 'footerBottomText',
      title: 'Footer Bottom Text',
      type: 'string',
    }),
    defineField({
      name: 'prophetName',
      title: 'Prophet Name',
      type: 'string',
    }),
    defineField({
      name: 'prophetTitle',
      title: 'Prophet Title',
      type: 'string',
    }),
    defineField({
      name: 'prophetImage',
      title: 'Prophet Image',
      type: 'image',
    }),
    defineField({
      name: 'firstLadyName',
      title: 'First Lady Name',
      type: 'string',
    }),
    defineField({
      name: 'firstLadyTitle',
      title: 'First Lady Title',
      type: 'string',
    }),
    defineField({
      name: 'firstLadyImage',
      title: 'First Lady Image',
      type: 'image',
    }),
    defineField({
      name: 'leadersWelcomeMessage',
      title: 'Leaders Welcome Message',
      type: 'text',
    }),
    defineField({
      name: 'whatToExpectTitle',
      title: 'What To Expect Title',
      type: 'string',
    }),
    defineField({
      name: 'whatToExpectItems',
      title: 'What To Expect Items',
      type: 'array',
      of: [
        defineField({
          name: 'item',
          title: 'Item',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
            defineField({ name: 'icon', title: 'Icon', type: 'string' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'globalCountries',
      title: 'Global Countries',
      type: 'array',
      of: [
        defineField({
          name: 'country',
          title: 'Country',
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'flagImage', title: 'Flag Image', type: 'image' }),
            defineField({ name: 'link', title: 'Link', type: 'string' }),
          ],
        }),
      ],
    }),
  ],
})
