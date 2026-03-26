export default {
  name: "prayerRequestCategory",
  title: "Prayer Request Category",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Category Name",
      type: "string",
      validation: Rule => Rule.required(),
      description: "e.g. Personal, Family, Health, Financial, Relationships, Work, Salvation, Other"
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name"
      },
      validation: Rule => Rule.required()
    }
  ]
}
