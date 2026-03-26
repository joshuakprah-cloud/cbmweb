import { defineType } from 'sanity'

export default defineType({
  name: "gallery",
  title: "Gallery",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Gallery Title",
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
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true
      }
    },
    {
      name: "eventName",
      title: "Event Name",
      type: "string"
    },
    {
      name: "eventDate",
      title: "Event Date",
      type: "date"
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Sunday Service", value: "sunday-service" },
          { title: "Events", value: "events" },
          { title: "Outreach", value: "outreach" },
          { title: "Youth", value: "youth" },
          { title: "Special", value: "special" }
        ]
      }
    },
    {
      name: "photos",
      title: "Photos",
      type: "array",
      of: [{ type: "galleryPhoto" }]
    },
    {
      name: "downloadUrl",
      title: "Download ZIP URL",
      type: "url",
      description: "Optional. Upload a ZIP of full resolution photos and paste the URL here."
    },
    {
      name: "seo",
      title: "SEO Settings",
      type: "pageSeo"
    }
  ]
})
