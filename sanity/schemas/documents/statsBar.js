export default {
  name: "statsBar",
  title: "Stats Bar",
  type: "document",
  fields: [
    {
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Stat Label",
              type: "string",
              validation: Rule => Rule.required(),
              description: "e.g. Active Members, Volunteers"
            },
            {
              name: "value",
              title: "Stat Value",
              type: "string",
              description: "e.g. 500+, 12. Leave blank to show — instead of 0."
            }
          ]
        }
      ]
    },
    {
      name: "disclaimer",
      title: "Disclaimer Text",
      type: "string",
      description: "e.g. Figures are approximate and updated periodically."
    }
  ]
}
