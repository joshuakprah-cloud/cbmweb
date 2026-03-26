export default {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    {
      name: "siteName",
      title: "Site Name",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "tagline",
      title: "Site Tagline",
      type: "string"
    },
    {
      name: "logo",
      title: "Site Logo",
      type: "image",
      options: {
        hotspot: true
      }
    },
    {
      name: "favicon",
      title: "Favicon",
      type: "image"
    },
    {
      name: "givingUrl",
      title: "Online Giving URL",
      type: "url",
      description: "Link to your external giving platform e.g. tithe.ly"
    },
    {
      name: "streamUrl",
      title: "Live Stream URL",
      type: "url",
      description: "YouTube or Facebook live stream link"
    },
    {
      name: "isLive",
      title: "Stream Is Live",
      type: "boolean",
      defaultValue: false,
      description: "Toggle ON when you go live. The Watch Live button will show a red pulse indicator."
    },
    {
      name: "socialLinks",
      title: "Social Media Links",
      type: "socialLinks"
    },
    {
      name: "seo",
      title: "Default SEO Settings",
      type: "pageSeo"
    }
  ]
}
