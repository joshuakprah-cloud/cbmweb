import { defineType } from 'sanity'

export default defineType({
  name: "pageSeo",
  title: "Page SEO",
  type: "object",
  fields: [
    {
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "Shown in browser tab and search results. Keep under 60 characters.",
      validation: Rule => Rule.max(60)
    },
    {
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      description: "Shown in search results. Keep under 160 characters.",
      validation: Rule => Rule.max(160)
    },
    {
      name: "ogImage",
      title: "Social Share Image",
      type: "image",
      options: {
        hotspot: true
      },
      description: "Shown when shared on Facebook, WhatsApp etc. Recommended size: 1200x630px."
    }
  ]
})
