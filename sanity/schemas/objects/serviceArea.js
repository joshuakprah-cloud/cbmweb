export default {
  name: "serviceArea",
  title: "Service Area",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Service Area",
      type: "string",
      validation: Rule => Rule.required(),
      description: "e.g. Live Production, Photography, Social Media"
    },
    {
      name: "icon",
      title: "Icon Name",
      type: "string",
      description: "Lucide icon name e.g. video, camera, wifi. See lucide.dev for names."
    },
    {
      name: "description",
      title: "Description",
      type: "text"
    }
  ]
}
