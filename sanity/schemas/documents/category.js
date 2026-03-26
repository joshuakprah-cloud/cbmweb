import { defineType } from 'sanity'

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Category Name",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title"
      },
      validation: Rule => Rule.required()
    },
    {
      name: "color",
      title: "Badge Color",
      type: "string",
      description: "Tailwind color class e.g. bg-teal-500"
    }
  ]
})
