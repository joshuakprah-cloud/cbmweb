import { defineType } from 'sanity'

export default defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Full Name",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name"
      },
      validation: Rule => Rule.required()
    },
    {
      name: "photo",
      title: "Author Photo",
      type: "image",
      options: {
        hotspot: true
      }
    },
    {
      name: "role",
      title: "Role / Title",
      type: "string"
    },
    {
      name: "bio",
      title: "Short Bio",
      type: "text"
    }
  ]
})
