import { defineType, defineField } from 'sanity'

export const leadershipPageType = defineType({
  name: 'leadershipPage',
  title: 'Leadership Page',
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
      name: 'introduction',
      title: 'Introduction',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'pastoralTeamTitle',
      title: 'Pastoral Team Section Title',
      type: 'string',
      initialValue: 'Pastoral Team'
    }),
    defineField({
      name: 'leadershipLevels',
      title: 'Leadership Levels',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'leadershipLevel',
          title: 'Leadership Level',
          fields: [
            defineField({ name: 'title', title: 'Level Title', type: 'string', validation: Rule => Rule.required() }),
            defineField({ name: 'description', title: 'Level Description', type: 'text' }),
            defineField({ name: 'members', title: 'Team Members', type: 'array', 
              of: [{ type: 'reference', to: [{ type: 'teamMember' }] }]
            }),
          ],
        },
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
        title: 'Leadership Page',
      }
    }
  }
})
