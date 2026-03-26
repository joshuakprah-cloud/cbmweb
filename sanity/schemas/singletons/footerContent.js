export default {
  name: "footerContent",
  title: "Footer Content",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    {
      name: "tagline",
      title: "Footer Tagline",
      type: "string"
    },
    {
      name: "copyrightText",
      title: "Copyright Text",
      type: "string",
      description: "e.g. © 2025 ThaGospel Church. All rights reserved."
    },
    {
      name: "footerLinks",
      title: "Footer Link Groups",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "groupTitle",
              title: "Group Title",
              type: "string"
            },
            {
              name: "links",
              title: "Links",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "label",
                      title: "Link Label",
                      type: "string"
                    },
                    {
                      name: "url",
                      title: "Link URL",
                      type: "string"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "socialLinks",
      title: "Social Media Links",
      type: "socialLinks"
    },
    {
      name: "footerLogo",
      title: "Footer Logo",
      type: "image",
      options: {
        hotspot: true
      }
    },
    {
      name: "address",
      title: "Church Address",
      type: "text"
    },
    {
      name: "phone",
      title: "Phone Number",
      type: "string"
    },
    {
      name: "email",
      title: "Email Address",
      type: "string"
    }
  ]
}
