export default {
  name: "ageGroup",
  title: "Age Group",
  type: "object",
  fields: [
    {
      name: "ageRange",
      title: "Age Range",
      type: "string",
      validation: Rule => Rule.required(),
      description: "e.g. 0-2 years, 3-5 years, 6-9 years"
    },
    {
      name: "programName",
      title: "Program Name",
      type: "string",
      validation: Rule => Rule.required(),
      description: "e.g. Nursery, Little Stars, Kingdom Kids"
    },
    {
      name: "description",
      title: "Description",
      type: "text"
    }
  ]
}
