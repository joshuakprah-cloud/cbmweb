import { defineType } from 'sanity'

export default defineType({
  name: "sermon",
  title: "Sermon",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Sermon Title",
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
      name: "speaker",
      title: "Speaker",
      type: "reference",
      to: [{ type: "preacher" }],
      validation: Rule => Rule.required()
    },
    {
      name: "series",
      title: "Sermon Series",
      type: "reference",
      to: [{ type: "sermonSeries" }]
    },
    {
      name: "sermonDate",
      title: "Date Preached",
      type: "date",
      validation: Rule => Rule.required()
    },
    {
      name: "youtubeUrl",
      title: "YouTube Video URL",
      type: "url"
    },
    {
      name: "audioFile",
      title: "Audio Download File",
      type: "file"
    },
    {
      name: "thumbnail",
      title: "Thumbnail Image",
      type: "image",
      options: {
        hotspot: true
      }
    },
    {
      name: "description",
      title: "Sermon Description",
      type: "portableText"
    },
    {
      name: "duration",
      title: "Duration",
      type: "string",
      description: "e.g. 45 mins"
    },
    {
      name: "isFeatured",
      title: "Feature This Sermon",
      type: "boolean",
      defaultValue: false,
      description: "Toggle ON to show this sermon in the featured slot on the sermons page."
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }]
    },
    {
      name: "seo",
      title: "SEO Settings",
      type: "pageSeo"
    }
  ]
})
