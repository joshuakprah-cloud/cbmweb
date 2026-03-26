export default {
  name: "podcastPage",
  title: "Podcast Page",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    {
      name: "isLaunched",
      title: "Podcast Launched",
      type: "boolean",
      defaultValue: false,
      description: "Toggle ON when the podcast is live to enable the Podcast card in the Media hub."
    },
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
      name: "podcastUrl",
      title: "Podcast Feed URL",
      type: "url"
    },
    {
      name: "platforms",
      title: "Listen On Platforms",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platformName",
              title: "Platform Name",
              type: "string"
            },
            {
              name: "platformUrl",
              title: "Platform URL",
              type: "url"
            },
            {
              name: "platformIcon",
              title: "Platform Icon",
              type: "string"
            }
          ]
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
