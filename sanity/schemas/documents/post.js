import { defineType } from 'sanity'

export default defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Post Title",
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
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: Rule => Rule.required()
    },
    {
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: {
        hotspot: true
      }
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }]
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      description: "Short summary shown in blog cards and meta descriptions. Max 160 characters.",
      validation: Rule => Rule.max(160)
    },
    {
      name: "body",
      title: "Post Body",
      type: "array",
      of: [{ type: "block" }]
    },
    {
      name: "publishedAt",
      title: "Publish Date",
      type: "datetime",
      validation: Rule => Rule.required()
    },
    {
      name: "readTime",
      title: "Read Time (minutes)",
      type: "number",
      description: "Leave blank to auto-calculate from word count."
    },
    {
      name: "isFeatured",
      title: "Feature This Post",
      type: "boolean",
      defaultValue: false
    },
    {
      name: "seo",
      title: "SEO Settings",
      type: "pageSeo"
    }
  ]
})
