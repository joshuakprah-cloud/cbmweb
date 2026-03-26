export default {
  name: "groupsPage",
  title: "Groups Page",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    {
      name: "hero",
      title: "Hero Section",
      type: "object",
      fields: [
        {
          name: "heading",
          title: "Heading",
          type: "string"
        },
        {
          name: "subheading",
          title: "Subheading",
          type: "string"
        },
        {
          name: "backgroundImage",
          title: "Background Image",
          type: "image",
          options: {
            hotspot: true
          }
        }
      ]
    },
    {
      name: "welcomeMessage",
      title: "Welcome Message",
      type: "portableText"
    },
    {
      name: "welcomeImage",
      title: "Welcome Photo",
      type: "image",
      options: {
        hotspot: true
      }
    },
    {
      name: "nextSteps",
      title: "Next Steps",
      type: "array",
      of: [{ type: "nextStep" }]
    },
    {
      name: "seo",
      title: "SEO Settings",
      type: "pageSeo"
    }
  ]
}
