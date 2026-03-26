export default {
  name: "sermonsArchivePage",
  title: "Sermons Archive Page",
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
      name: "seo",
      title: "SEO Settings",
      type: "pageSeo"
    }
  ]
}
