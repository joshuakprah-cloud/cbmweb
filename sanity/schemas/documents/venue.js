export default {
  name: "venue",
  title: "Venue",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Venue Name",
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
      name: "mapEmbedUrl",
      title: "Google Maps Embed URL",
      type: "url"
    },
    {
      name: "directionsUrl",
      title: "Google Maps Directions URL",
      type: "url"
    }
  ]
}
