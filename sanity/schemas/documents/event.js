import { defineType } from 'sanity'

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Event Title",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title"
      },
      validation: Rule => Rule.required()
    },
    {
      name: "bannerImage",
      title: "Banner Image",
      type: "image",
      options: {
        hotspot: true
      }
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "eventCategory" }]
    },
    {
      name: "startDate",
      title: "Start Date & Time",
      type: "datetime",
      validation: Rule => Rule.required()
    },
    {
      name: "endDate",
      title: "End Date & Time",
      type: "datetime"
    },
    {
      name: "venue",
      title: "Venue",
      type: "reference",
      to: [{ type: "venue" }]
    },
    {
      name: "description",
      title: "Event Description",
      type: "array",
      of: [{ type: "block" }]
    },
    {
      name: "price",
      title: "Ticket Price",
      type: "number",
      description: "Leave blank or set to 0 for free events."
    },
    {
      name: "registrationStatus",
      title: "Registration Status",
      type: "string",
      options: {
        list: [
          { title: "Open", value: "open" },
          { title: "Limited", value: "limited" },
          { title: "Sold Out", value: "soldout" }
        ]
      },
      defaultValue: "open"
    },
    {
      name: "registrationUrl",
      title: "External Registration URL",
      type: "url",
      description: "If provided, a button will link here instead of showing the inline registration form."
    },
    {
      name: "isFeatured",
      title: "Feature This Event",
      type: "boolean",
      defaultValue: false,
      description: "Toggle ON to show in the featured event slot on the events page."
    },
    {
      name: "relatedMinistry",
      title: "Related Ministry (optional)",
      type: "reference",
      to: [{ type: "ministry" }],
      description: "Links this event to a ministry page for filtered event lists."
    },
    {
      name: "seo",
      title: "SEO Settings",
      type: "pageSeo"
    }
  ]
})
