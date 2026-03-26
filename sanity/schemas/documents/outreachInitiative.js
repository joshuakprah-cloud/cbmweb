export default {
  name: "outreachInitiative",
  title: "Outreach Initiative",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Initiative Title",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "description",
      title: "Description",
      type: "text"
    },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Upcoming", value: "upcoming" },
          { title: "Completed", value: "completed" }
        ]
      }
    },
    {
      name: "ctaLabel",
      title: "CTA Button Label",
      type: "string"
    },
    {
      name: "ctaUrl",
      title: "CTA Button URL",
      type: "string"
    }
  ]
}
