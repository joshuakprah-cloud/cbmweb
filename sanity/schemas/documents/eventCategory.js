export default {
  name: "eventCategory",
  title: "Event Category",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Category Name",
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
      name: "color",
      title: "Badge Color",
      type: "string",
      description: "Tailwind color class e.g. bg-teal-500"
    }
  ]
}
