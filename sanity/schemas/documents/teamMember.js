import { defineType } from 'sanity'

export default defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Full Name",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name"
      },
      validation: Rule => Rule.required()
    },
    {
      name: "photo",
      title: "Photo",
      type: "image",
      options: {
        hotspot: true
      }
    },
    {
      name: "role",
      title: "Role / Title",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "bio",
      title: "Full Biography",
      type: "portableText"
    },
    {
      name: "shortBio",
      title: "Short Bio (2 lines)",
      type: "text",
      description: "Shown on the leadership card. Keep under 200 characters.",
      validation: Rule => Rule.max(200)
    },
    {
      name: "leadershipCategory",
      title: "Leadership Category",
      type: "string",
      options: {
        list: [
          { title: "Pastoral Team", value: "pastoral-team" },
          { title: "Ministry Leaders", value: "ministry-leaders" },
          { title: "Support Staff", value: "support-staff" }
        ]
      }
    },
    {
      name: "socialTwitter",
      title: "Twitter / X URL",
      type: "url"
    },
    {
      name: "socialInstagram",
      title: "Instagram URL",
      type: "url"
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first. Use to control the order of staff cards."
    }
  ]
})
