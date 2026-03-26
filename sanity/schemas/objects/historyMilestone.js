export default {
  name: "historyMilestone",
  title: "History Milestone",
  type: "object",
  fields: [
    {
      name: "year",
      title: "Year",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "title",
      title: "Milestone Title",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "description",
      title: "Description",
      type: "text"
    }
  ]
}
