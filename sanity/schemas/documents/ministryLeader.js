export default {
  name: "ministryLeader",
  title: "Ministry Leader",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Full Name",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "role",
      title: "Role / Title",
      type: "string",
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
      name: "ministry",
      title: "Ministry",
      type: "reference",
      to: [{ type: "ministry" }]
    }
  ]
}
