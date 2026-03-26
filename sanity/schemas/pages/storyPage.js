export default {
  name: "storyPage",
  title: "Story Page",
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
      name: "storyBody",
      title: "Our Story",
      type: "portableText"
    },
    {
      name: "historyMilestones",
      title: "History Timeline",
      type: "array",
      of: [{ type: "historyMilestone" }]
    },
    {
      name: "closingCta",
      title: "Closing CTA",
      type: "ctaBlock"
    },
    {
      name: "seo",
      title: "SEO Settings",
      type: "pageSeo"
    }
  ]
}
