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
      description: 'The title displayed at the top of the welcome section'
    }),
    defineField({
      name: 'welcomeMessage',
      title: 'Welcome Message',
      type: 'text',
      description: 'The main welcome message text displayed in the left column'
    }),
    defineField({
      name: 'malePastorName',
      title: 'Male Pastor Name',
      type: 'string',
      description: 'Name of male pastor displayed under the first image'
    }),
    defineField({
      name: 'pastorImage1',
      title: 'Pastor Image 1',
      type: 'image',
      description: 'First pastor portrait image for the right column'
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
            defineField({ name: 'image', title: 'Image', type: 'image' }),
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
    
    
  ],
})
