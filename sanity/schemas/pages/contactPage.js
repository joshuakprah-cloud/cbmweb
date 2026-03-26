export default {
  name: "contactPage",
  title: "Contact Page",
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
      type: "text"
    },
    {
      name: "officeHours",
      title: "Office Hours",
      type: "array",
      of: [{ type: "officeHour" }]
    },
    {
      name: "mapEmbedUrl",
      title: "Google Maps Embed URL",
      type: "url",
      description: "Paste the embed URL from Google Maps. Go to Google Maps > Share > Embed a map > copy the src URL only."
    },
    {
      name: "subjectOptions",
      title: "Contact Form Subjects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "contactSubject" }] }]
    },
    {
      name: "seo",
      title: "SEO Settings",
      type: "pageSeo"
    }
  ]
}
