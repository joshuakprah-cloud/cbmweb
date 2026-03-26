export default {
  name: "serviceTimeEntry",
  title: "Service Time Entry",
  type: "object",
  fields: [
    {
      name: "serviceName",
      title: "Service Name",
      type: "string",
      validation: Rule => Rule.required(),
      description: "e.g. Sunday First Service, Wednesday Bible Study"
    },
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
      validation: Rule => Rule.required(),
      description: "e.g. 7:00 AM"
    },
    {
      name: "timeRange",
      title: "Time Range",
      type: "string",
      description: "e.g. 9:00 AM - 12:00 PM"
    },
    {
      name: "location",
      title: "Location / Hall",
      type: "string"
    }
  ]
}
