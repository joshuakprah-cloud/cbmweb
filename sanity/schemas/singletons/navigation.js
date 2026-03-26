export default {
  name: "navigation",
  title: "Navigation",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    {
      name: "navItems",
      title: "Navigation Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Menu Label",
              type: "string",
              validation: Rule => Rule.required()
            },
            {
              name: "link",
              title: "URL Path",
              type: "string"
            },
            {
              name: "hasDropdown",
              title: "Has Dropdown",
              type: "boolean"
            },
            {
              name: "dropdownItems",
              title: "Dropdown Items",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "label",
                      title: "Item Label",
                      type: "string"
                    },
                    {
                      name: "link",
                      title: "Item URL",
                      type: "string"
                    },
                    {
                      name: "description",
                      title: "Short Description",
                      type: "string"
                    }
                  ]
                }
              ],
              hidden: ({ parent }) => !parent?.hasDropdown
            }
          ]
        }
      ]
    },
    {
      name: "watchLiveLabel",
      title: "Watch Live Button Label",
      type: "string",
      defaultValue: "Watch Live"
    },
    {
      name: "giveLabel",
      title: "Give Button Label",
      type: "string",
      defaultValue: "Give"
    }
  ]
}
