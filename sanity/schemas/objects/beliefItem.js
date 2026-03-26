export default {
  name: "beliefItem",
  title: "Belief Item",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Belief Title",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "scriptureReference",
      title: "Scripture Reference",
      type: "string",
      description: "e.g. John 3:16, Romans 8:1-4"
    },
    {
      name: "description",
      title: "Full Description",
      type: "portableText"
    }
  ]
}
