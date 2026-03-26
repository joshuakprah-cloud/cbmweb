export default {
  name: "officeHour",
  title: "Office Hour",
  type: "object",
  fields: [
    {
      name: "day",
      title: "Day",
      type: "string",
      validation: Rule => Rule.required(),
      description: "e.g. Monday - Friday"
    },
    {
      name: "hours",
      title: "Hours",
      type: "string",
      validation: Rule => Rule.required(),
      description: "e.g. 9:00 AM - 5:00 PM"
    }
  ]
}
