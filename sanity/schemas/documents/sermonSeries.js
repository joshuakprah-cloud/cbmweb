export default {
  name: "sermonSeries",
  title: "Sermon Series",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Series Title",
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
      name: "artwork",
      title: "Series Artwork",
      type: "image",
      options: {
        hotspot: true
      }
    },
    {
      name: "description",
      title: "Series Description",
      type: "text"
    },
    {
      name: "startDate",
      title: "Series Start Date",
      type: "date"
    },
    {
      name: "endDate",
      title: "Series End Date",
      type: "date"
    },
    {
      name: "seo",
      title: "SEO Settings",
      type: "pageSeo"
    }
  ]
}
