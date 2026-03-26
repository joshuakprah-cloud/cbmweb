import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'mediaPage',
  title: 'Media Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      type: 'string',
      validation: Rule => Rule.required().min(5).max(100),
    }),
    defineField({
      name: 'heroSubtitle',
      type: 'text',
    }),
    defineField({
      name: 'seo',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          type: 'string',
          title: 'Meta Title',
          description: 'The title displayed in search results and browser tabs',
        }),
        defineField({
          name: 'metaDescription',
          type: 'text',
          title: 'Meta Description',
          description: 'The description displayed in search results and social media previews',
        }),
        defineField({
          name: 'ogImage',
          type: 'image',
          title: 'OG Image',
          description: 'The image displayed when sharing on social media platforms',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      heroTitle: 'heroTitle',
      heroSubtitle: 'heroSubtitle',
    },
  },
});
