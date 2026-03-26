export default {
  name: "ministryProgram",
  title: "Ministry Program",
  type: "object",
  fields: [
    {
      name: "name",
      title: "Program Name",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "description",
      title: "Description",
      type: "text"
    },
    {
      name: "schedule",
      title: "Schedule",
      type: "string",
      description: "e.g. Every Saturday, 10:00 AM"
    },
    {
      name: "ageRange",
      title: "Age Range",
      type: "string"
    }
  ]
}
