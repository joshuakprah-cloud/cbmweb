import { defineType } from 'sanity'

export default defineType({
  name: "campus",
  title: "Campus",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Campus Name",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "address",
      title: "Full Address",
      type: "text",
      validation: Rule => Rule.required()
    },
    {
      name: "phone",
      title: "Phone Number",
      type: "string"
    },
    {
      name: "email",
      title: "Email Address",
      type: "string"
    },
    {
      name: "serviceTimes",
      title: "Campus Service Times",
      type: "array",
      of: [{ type: "serviceTimeEntry" }]
    },
    {
      name: "mapEmbedUrl",
      title: "Google Maps Embed URL",
      type: "url"
    },
    {
      name: "directionsUrl",
      title: "Get Directions URL",
      type: "url"
    },
    {
      name: "photo",
      title: "Campus Photo",
      type: "image",
      options: {
        hotspot: true
      }
    },
    {
      name: "isPrimary",
      title: "Main Campus",
      type: "boolean",
      defaultValue: false,
      description: "Toggle ON for the primary campus. Only one campus should have this enabled."
    }
  ]
})
