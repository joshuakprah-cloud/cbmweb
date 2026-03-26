export default {
  name: "safetyPolicy",
  title: "Safety Policy",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Policy Title",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "description",
      title: "Policy Details",
      type: "portableText"
    }
  ]
}
