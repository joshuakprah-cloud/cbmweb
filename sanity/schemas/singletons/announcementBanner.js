export default {
  name: "announcementBanner",
  title: "Announcement Banner",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    {
      name: "isActive",
      title: "Show Banner",
      type: "boolean",
      defaultValue: false,
      description: "Toggle ON to display the announcement bar across the entire site."
    },
    {
      name: "message",
      title: "Announcement Message",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "linkLabel",
      title: "Link Button Label",
      type: "string"
    },
    {
      name: "linkUrl",
      title: "Link URL",
      type: "string"
    },
    {
      name: "variant",
      title: "Banner Style",
      type: "string",
      options: {
        list: [
          { title: "Info", value: "info" },
          { title: "Warning", value: "warning" },
          { title: "Urgent", value: "urgent" }
        ]
      },
      description: "Info = teal, Warning = amber, Urgent = red"
    },
    {
      name: "expiresAt",
      title: "Auto-Hide After",
      type: "datetime",
      description: "Banner will automatically stop showing after this date and time."
    }
  ]
}
