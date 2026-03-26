export default {
  name: "registrationSubmission",
  title: "Registration Submission",
  type: "document",
  fields: [
    {
      name: "event",
      title: "Event",
      type: "reference",
      to: [{ type: "event" }],
      validation: Rule => Rule.required()
    },
    {
      name: "fullName",
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
      name: "attendees",
      title: "Number of Attendees",
      type: "number",
      validation: Rule => Rule.required()
    },
    {
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime"
    },
    {
      name: "notes",
      title: "Additional Notes",
      type: "text"
    }
  ],
  options: {
    __experimental_actions: ["create", "update", "publish", "delete"],
    __experimental_searchEnabled: false
  }
}
