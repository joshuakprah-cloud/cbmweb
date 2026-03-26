export default {
  name: "homepage",
  title: "Homepage",
  type: "document",
  __experimental_actions: ["update", "publish"],
  groups: [
    {
      name: "hero",
      title: "Hero Section"
    },
    {
      name: "content",
      title: "Content Sections"
    },
    {
      name: "featured",
      title: "Featured Content"
    },
    {
      name: "cta",
      title: "Call to Action"
    },
    {
      name: "seo",
      title: "SEO"
    }
  ],
  fields: [
    {
      name: "heroSlides",
      title: "Hero Slides",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "slideType",
              title: "Slide Type",
              type: "string",
              options: {
                list: [
                  { title: "Image", value: "image" },
                  { title: "Video", value: "video" }
                ]
              }
            },
            {
              name: "image",
              title: "Slide Image",
              type: "image",
              options: {
                hotspot: true
              },
              hidden: ({ parent }) => parent?.slideType !== "image"
            },
            {
              name: "videoUrl",
              title: "Video URL (CDN only)",
              type: "url",
              hidden: ({ parent }) => parent?.slideType !== "video"
            },
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
              name: "ctaLabel",
              title: "Button Label",
              type: "string"
            },
            {
              name: "ctaLink",
              title: "Button URL",
              type: "string"
            }
          ]
        }
      ],
      group: "hero"
    },
    {
      name: "welcomeHeading",
      title: "Welcome Section Heading",
      type: "string",
      group: "content"
    },
    {
      name: "welcomeBody",
      title: "Welcome Message",
      type: "portableText",
      group: "content"
    },
    {
      name: "whatToExpectHeading",
      title: "What To Expect Heading",
      type: "string",
      group: "content"
    },
    {
      name: "whatToExpectItems",
      title: "Expect Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Icon",
              type: "string"
            },
            {
              name: "title",
              title: "Title",
              type: "string"
            },
            {
              name: "description",
              title: "Description",
              type: "text"
            }
          ]
        }
      ],
      group: "content"
    },
    {
      name: "featuredSermon",
      title: "Featured Sermon",
      type: "reference",
      to: [{ type: "sermon" }],
      group: "featured"
    },
    {
      name: "featuredEvents",
      title: "Upcoming Events (max 6)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "event" }] }],
      validation: Rule => Rule.max(6),
      group: "featured"
    },
    {
      name: "ministriesSnapshot",
      title: "Ministries Snapshot (max 6)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "ministry" }] }],
      validation: Rule => Rule.max(6),
      group: "featured"
    },
    {
      name: "pastorTeaserHeading",
      title: "Pastor Section Heading",
      type: "string",
      group: "featured"
    },
    {
      name: "pastorRef",
      title: "Featured Pastor",
      type: "reference",
      to: [{ type: "teamMember" }],
      group: "featured"
    },
    {
      name: "testimonies",
      title: "Testimonies (max 6)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "testimony" }] }],
      validation: Rule => Rule.max(6),
      group: "featured"
    },
    {
      name: "closingCtaHeading",
      title: "Closing CTA Heading",
      type: "string",
      group: "cta"
    },
    {
      name: "closingCtaBody",
      title: "Closing CTA Message",
      type: "text",
      group: "cta"
    },
    {
      name: "closingCtaPrimary",
      title: "Primary CTA Button",
      type: "ctaBlock",
      group: "cta"
    },
    {
      name: "closingCtaSecondary",
      title: "Secondary CTA Button",
      type: "ctaBlock",
      group: "cta"
    },
    {
      name: "seo",
      title: "SEO Settings",
      type: "pageSeo",
      group: "seo"
    }
  ]
}
