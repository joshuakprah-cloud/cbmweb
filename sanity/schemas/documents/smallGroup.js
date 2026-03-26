export default {
  name: "smallGroup",
  title: "Small Group",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Group Name",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "day",
      title: "Meeting Day",
      type: "string"
    },
    {
      name: "time",
      title: "Meeting Time",
      type: "string"
    },
    {
      name: "locationType",
      title: "Location Type",
      type: "string",
      options: {
        list: [
          { title: "In Person", value: "in-person" },
          { title: "Online", value: "online" },
          { title: "Hybrid", value: "hybrid" }
        ]
      }
    },
    {
      name: "location",
      title: "Location Details",
      type: "string"
    },
    {
      name: "ageRange",
      title: "Age Range",
      type: "string",
      description: "e.g. 18-25, All Ages, Families"
    },
    {
      name: "leaderName",
      title: "Group Leader Name",
      type: "string"
    },
    {
      name: "isActive",
      title: "Group Is Active",
      type: "boolean",
      defaultValue: true,
      description: "Toggle OFF to hide this group without deleting it."
    }
  ]
}
