import {defineArrayMember, defineField, defineType} from 'sanity'

export const themePageType = defineType({
  name: 'themePage',
  title: 'Theme Page',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Theme Title',
      type: 'string',
    }),
    defineField({
      name: 'anchorScripture',
      title: 'Anchor Scripture',
      type: 'text',
    }),
    defineField({
      name: 'explanation',
      title: 'Explanation',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
  ],
})
