export default {
  name: "scheduleEntry",
  title: "Schedule Entry",
  type: "object",
  fields: [
    {
      name: "day",
      title: "Day",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "time",
      title: "Time",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "location",
      title: "Location",
      type: "string"
    },
    {
      name: "notes",
      title: "Notes (optional)",
      type: "string"
    }
  ]
}
