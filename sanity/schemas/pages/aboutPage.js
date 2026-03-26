export default {
  name: "aboutPage",
  title: "About Page",
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
      name: "introText",
      title: "Introduction",
      type: "portableText"
    },
    {
      name: "mission",
      title: "Mission Statement",
      type: "text"
    },
    {
      name: "vision",
      title: "Vision Statement",
      type: "text"
    },
    {
      name: "campuses",
      title: "Campuses",
      type: "array",
      of: [{ type: "reference", to: [{ type: "campus" }] }]
    },
    {
      name: "seo",
      title: "SEO Settings",
      type: "pageSeo"
    }
  ]
}
