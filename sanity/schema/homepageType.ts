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
            defineField({ name: 'image', title: 'Background Image', type: 'image' }),
            defineField({ name: 'order', title: 'Order', type: 'number' }),
          ],
        },
      ],
    }),
    
    // Welcome Section
    defineField({
      name: 'welcomeTitle',
      title: 'Welcome Section Title',
      type: 'string',
    }),
    defineField({
      name: 'welcomeMessage',
      title: 'Welcome Message',
      type: 'text',
    }),
    defineField({
      name: 'welcomeImage',
      title: 'Welcome Section Image',
      type: 'image',
    }),
    
    // Spiritual Leaders Information
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
    
    // Quick Access Ministry Links
    defineField({
      name: 'ministryLinks',
      title: 'Quick Access Ministry Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'ministryLink',
          title: 'Ministry Link',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'href', title: 'Link URL', type: 'string' }),
            defineField({ name: 'icon', title: 'Icon (Emoji)', type: 'string' }),
            defineField({ name: 'imageUrl', title: 'Image URL', type: 'string' }),
            defineField({ name: 'order', title: 'Order', type: 'number' }),
          ],
        },
      ],
    }),
    
    // Latest Sermon
    defineField({
      name: 'latestSermon',
      title: 'Latest Sermon',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Sermon Title', type: 'string' }),
        defineField({ name: 'speaker', title: 'Speaker Name', type: 'string' }),
        defineField({ name: 'date', title: 'Sermon Date', type: 'date' }),
        defineField({ name: 'duration', title: 'Duration (e.g., 45:23)', type: 'string' }),
        defineField({ name: 'audioUrl', title: 'Audio URL', type: 'url' }),
        defineField({ name: 'coverImage', title: 'Sermon Cover Image', type: 'image' }),
      ],
    }),
    
    // Upcoming Events
    defineField({
      name: 'upcomingEvents',
      title: 'Upcoming Events',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'upcomingEvent',
          title: 'Event',
          fields: [
            defineField({ name: 'title', title: 'Event Title', type: 'string' }),
            defineField({ name: 'date', title: 'Event Date', type: 'string' }),
            defineField({ name: 'time', title: 'Event Time', type: 'string' }),
            defineField({ name: 'venue', title: 'Event Venue', type: 'string' }),
            defineField({ name: 'flyerImage', title: 'Event Flyer Image', type: 'image' }),
            defineField({ name: 'description', title: 'Event Description', type: 'text' }),
          ],
        },
      ],
    }),
    
    // Prayer Section
    defineField({
      name: 'prayerSection',
      title: 'Prayer Request Section',
      type: 'object',
      fields: [
        defineField({ name: 'backgroundImage', title: 'Background Image', type: 'image' }),
        defineField({ name: 'title', title: 'Section Title', type: 'string' }),
        defineField({ name: 'submitButtonText', title: 'Submit Button Text', type: 'string' }),
      ],
    }),
    
    // Footer Information
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
  ],
})
