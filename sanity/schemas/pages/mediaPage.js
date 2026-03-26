export default {
  name: "mediaPage",
  title: "Media Page",
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
      name: "featuredPost",
      title: "Featured Blog Post",
      type: "reference",
      to: [{ type: "post" }]
    },
    {
      name: "seo",
      title: "SEO Settings",
      type: "pageSeo"
    }
  ]
}
