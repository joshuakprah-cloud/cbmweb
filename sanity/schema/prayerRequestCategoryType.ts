import { defineType, defineField } from 'sanity'

export const prayerRequestCategoryType = defineType({
  name: 'prayerRequestCategory',
  title: 'Prayer Request Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Category Description',
      type: 'text'
    }),
    defineField({
      name: 'color',
      title: 'Category Color',
      type: 'string',
      description: 'Hex color code for visual identification'
    }),
    defineField({
      name: 'icon',
      title: 'Icon (Emoji)',
      type: 'string'
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number'
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description'
    }
  }
})
