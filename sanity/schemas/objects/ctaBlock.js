export default {
  name: "ctaBlock",
  title: "CTA Block",
  type: "object",
  fields: [
    {
      name: "label",
      title: "Button Label",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "url",
      title: "Button URL",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "variant",
      title: "Button Style",
      type: "string",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
          { title: "Outline", value: "outline" }
        ]
      }
    },
    {
      name: "openInNewTab",
      title: "Open in New Tab",
      type: "boolean",
      defaultValue: false
    }
  ]
}
