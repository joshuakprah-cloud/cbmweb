export default {
  name: "preacher",
  title: "Preacher",
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
      title: "Photo",
      type: "image",
      options: {
        hotspot: true
      }
    },
    {
      name: "role",
      title: "Role / Title",
      type: "string",
      description: "e.g. Lead Pastor, Guest Speaker"
    },
    {
      name: "bio",
      title: "Biography",
      type: "text"
    },
    {
      name: "seo",
      title: "SEO Settings",
      type: "pageSeo"
    }
  ]
}
