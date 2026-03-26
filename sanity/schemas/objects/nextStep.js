export default {
  name: "nextStep",
  title: "Next Step",
  type: "object",
  fields: [
    {
      name: "stepNumber",
      title: "Step Number",
      type: "number",
      validation: Rule => Rule.required()
    },
    {
      name: "title",
      title: "Step Title",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "description",
      title: "Step Description",
      type: "text"
    },
    {
      name: "ctaLabel",
      title: "CTA Label (optional)",
      type: "string"
    },
    {
      name: "ctaUrl",
      title: "CTA URL (optional)",
      type: "string"
    }
  ]
}
