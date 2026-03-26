export default {
  name: "notFoundPage",
  title: "404 Page",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    {
      name: "heading",
      title: "Heading",
      type: "string",
      defaultValue: "Page Not Found"
    },
    {
      name: "message",
      title: "Message",
      type: "text",
      description: "Friendly message shown on the 404 page"
    },
    {
      name: "ctaPrimary",
      title: "Primary Button",
      type: "ctaBlock"
    },
    {
      name: "ctaSecondary",
      title: "Secondary Button",
      type: "ctaBlock"
    },
    {
      name: "image",
      title: "Illustration Image (optional)",
      type: "image",
      options: {
        hotspot: true
      }
    }
  ]
}
