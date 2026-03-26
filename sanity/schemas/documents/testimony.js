export default {
  name: "testimony",
  title: "Testimony",
  type: "document",
  fields: [
    {
      name: "memberName",
      title: "Member Name",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "photo",
      title: "Member Photo (optional)",
      type: "image",
      options: {
        hotspot: true
      }
    },
    {
      name: "testimonyText",
      title: "Testimony",
      type: "text",
      validation: Rule => Rule.required()
    },
    {
      name: "isApproved",
      title: "Approved",
      type: "boolean",
      defaultValue: false,
      description: "Toggle ON to show this testimony on the homepage. Only approved testimonies appear."
    },
    {
      name: "order",
      title: "Display Order",
      type: "number"
    }
  ]
}
