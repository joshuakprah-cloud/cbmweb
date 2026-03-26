import { defineType } from 'sanity'

export default defineType({
  name: "ministry",
  title: "Ministry",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Ministry Name",
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
      name: "tagline",
      title: "Tagline",
      type: "string"
    },
    {
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true
      }
    },
    {
      name: "category",
      title: "Ministry Category",
      type: "string",
      options: {
        list: [
          { title: "People", value: "people" },
          { title: "Serve", value: "serve" }
        ]
      },
      validation: Rule => Rule.required(),
      description: "People = Kids, Youth, Women, Men. Serve = Outreach, Tech & Media."
    },
    {
      name: "body",
      title: "About This Ministry",
      type: "array",
      of: [{ type: "block" }]
    },
    {
      name: "leaders",
      title: "Ministry Leaders",
      type: "array",
      of: [{ type: "reference", to: [{ type: "ministryLeader" }] }]
    },
    {
      name: "programs",
      title: "Programs",
      type: "array",
      of: [{ type: "ministryProgram" }]
    },
    {
      name: "schedule",
      title: "Schedule",
      type: "array",
      of: [{ type: "scheduleEntry" }]
    },
    {
      name: "ageGroups",
      title: "Age Groups (Kids Ministry only)",
      type: "array",
      of: [{ type: "ageGroup" }]
    },
    {
      name: "policies",
      title: "Safety Policies (Kids Ministry only)",
      type: "array",
      of: [{ type: "safetyPolicy" }]
    },
    {
      name: "checkInInfo",
      title: "Check-In Info (Kids Ministry only)",
      type: "portableText"
    },
    {
      name: "serviceAreas",
      title: "Service Areas (Tech & Media only)",
      type: "array",
      of: [{ type: "serviceArea" }]
    },
    {
      name: "equipmentList",
      title: "Equipment & Tools (Tech & Media only)",
      type: "array",
      of: [{ type: "string" }]
    },
    {
      name: "initiatives",
      title: "Initiatives (Outreach only)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "outreachInitiative" }] }]
    },
    {
      name: "statsBar",
      title: "Stats Bar (Outreach only)",
      type: "reference",
      to: [{ type: "statsBar" }]
    },
    {
      name: "getInvolvedCta",
      title: "Get Involved CTA",
      type: "ctaBlock"
    },
    {
      name: "seo",
      title: "SEO Settings",
      type: "pageSeo"
    }
  ]
})
