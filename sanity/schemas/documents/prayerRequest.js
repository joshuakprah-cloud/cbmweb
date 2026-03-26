export default {
  name: "prayerRequest",
  title: "Prayer Request",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Full Name",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "email",
      title: "Email Address",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "phone",
      title: "Phone Number",
      type: "string"
    },
    {
      name: "prayerType",
      title: "Prayer Type",
      type: "reference",
      to: [{ type: "prayerRequestCategory" }]
    },
    {
      name: "request",
      title: "Prayer Request",
      type: "text",
      validation: Rule => Rule.required()
    },
    {
      name: "isUrgent",
      title: "Urgent Request",
      type: "boolean",
      defaultValue: false
    },
    {
      name: "consentGiven",
      title: "Consent Given",
      type: "boolean",
      validation: Rule => Rule.required()
    },
    {
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime"
    },
    {
      name: "isResolved",
      title: "Marked as Prayed",
      type: "boolean",
      defaultValue: false,
      description: "Toggle ON once the pastoral team has prayed over this request."
    }
  ],
  options: {
    __experimental_actions: ["create", "update", "publish", "delete"],
    __experimental_searchEnabled: false
  }
}
